package ato

import (
	"bytes"
	"flag"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/vmihailenco/msgpack/v5"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(_ *http.Request) bool { return true },
}

func closeConnection(conn *websocket.Conn, code int, message string) {
	// ignore all errors
	conn.WriteControl(
		websocket.CloseMessage,
		websocket.FormatCloseMessage(code, message),
		time.Now().Add(1*time.Second), // timeout
	)
	conn.Close()
}

func checkArgs(args [][]byte, conn *websocket.Conn) {
	for _, arg := range args {
		if bytes.IndexByte(arg, 0) != -1 {
			log.Println("argument contains null byte")
			closeConnection(conn, websocket.ClosePolicyViolation, "argument contains null byte")
		}
	}
}

const maxRequestBytes int64 = 1 << 18

func handleWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	var invocation invocation
	msgtype, reader, err := conn.NextReader()
	if msgtype != websocket.BinaryMessage {
		log.Println("unexpected message type:", msgtype)
		closeConnection(conn, websocket.CloseUnsupportedData, "unexpected message type")
		return
	}
	if err != nil {
		if _, isClosed := err.(*websocket.CloseError); isClosed {
			// ignore error
			return
		}
		log.Println("error while getting reader:", err)
		closeConnection(conn, websocket.CloseInternalServerErr, "internal error")
		return
	}
	limitedReader := io.LimitReader(reader, maxRequestBytes)
	b, err := io.ReadAll(limitedReader)
	if err != nil {
		log.Println("error while reading:", err)
		closeConnection(conn, websocket.CloseInternalServerErr, "internal error")
		return
	}
	if limitedReader.(*io.LimitedReader).N <= 0 {
		log.Println("request too large")
		closeConnection(conn, websocket.CloseMessageTooBig, "request too large")
		return
	}

	if err = msgpack.Unmarshal(b /* write to */, &invocation); err != nil {
		log.Println("error while unmarshalling:", err)
		closeConnection(conn, websocket.ClosePolicyViolation, "bad request: "+err.Error())
		return
	}

	checkArgs(invocation.Arguments, conn)
	checkArgs(invocation.Options, conn)

	if _, exists := Languages[invocation.Language]; !exists {
		log.Println("no such language:", invocation.Language)
		closeConnection(conn, websocket.ClosePolicyViolation, "no such language")
		return
	}

	if invocation.Timeout <= 0 || invocation.Timeout > 60 {
		log.Println("unacceptable timeout:", invocation.Timeout)
		closeConnection(conn, websocket.ClosePolicyViolation, "timeout not in range (0, 60]")
		return
	}

	if result, err := invocation.invoke(); err != nil {
		log.Println("invocation error:", err)
		closeConnection(conn, websocket.CloseInternalServerErr, "internal error")
	} else {
		marshalled, err := msgpack.Marshal(result)
		if err != nil {
			// result should always be valid
			panic(err)
		}
		conn.WriteMessage(websocket.BinaryMessage, marshalled)
		log.Println("successful invocation!")
		closeConnection(conn, websocket.CloseNormalClosure, "success")
	}
}

const trustProxyHeader = true

func getMetadata(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write(serialisedLanguages)
}

var addr = flag.String("addr", "127.0.0.1:4568", "http service address")

func ServerMain() {
	flag.Parse()
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v0/ws/execute", handleWs)
	mux.HandleFunc("/api/v0/metadata", getMetadata)
	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	}).Handler(mux)
	go log.Println("listening on", *addr)
	err := http.ListenAndServe(*addr, handler)
	// in an ideal case, ListenAndServe would run forever and never terminate
	// if it returns, something must have gone wrong
	log.Fatal(err)
}
