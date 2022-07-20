package ato

import "github.com/vmihailenco/msgpack/v5"

type language struct {
	Name     string `msgpack:"name"`
	Image    string `msgpack:"image"`
	Version  string `msgpack:"version"`
	Url      string `msgpack:"url"`
	Sbcs     bool   `msgpack:"sbcs"`
	SE_class string `msgpack:"SE_class"`
}

var serialisedLanguages []byte

func init() {
	b, err := msgpack.Marshal(Languages)
	if err != nil {
		panic(err)
	}
	serialisedLanguages = b
}

var Languages = map[string]language{
	"dyalog_apl": {
		Name:    "APL (Dyalog APL)",
		Image:   "dyalog/dyalog",
		Version: "Latest",
		Url:     "https://www.dyalog.com/products.htm",
		Sbcs:    false,
	},
}
