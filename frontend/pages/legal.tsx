import Head from 'next/head';

import Footer from 'components/footer';
import Navbar from 'components/navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Legal &ndash; Run Dyalog APL</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white relative flex flex-col">
        <Navbar />
        <main className="my-3 px-8 md:container md:mx-auto grow pb-2">
          <article id="Preamble">
            <h1 className="mb-4 text-4xl font-bold">Preamble</h1>
            <aside className="text-justify italic mb-3">
              <a href="https://github.com/Dyalog/dyalog.run/commits/main/frontend/pages/legal.tsx" className="underline text-blue-500">
                Last Updated: September 9th 2022
              </a>
            </aside>
            <p className="text-justify mb-3">
              dyalog.run is a
              <a href="https://en.wikipedia.org/wiki/Fork_(software_development)">fork</a>
              of
              <a href="https://ato.pxeger.com/">Attempt This Online</a>
              (<a href="https://github.com/attempt-this-online/attempt-this-online">GitHub</a>)
              which is
              <a href="https://github.com/attempt-this-online/attempt-this-online#licence">
              © 2022 Patrick Reader and contributor
              </a>.
              The software is used in accordance with its licence, which is
              <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">
              GNU Affero General Public License 3.0
              </a>,
              and is provided without warranty. dyalog.run is hosted by
              <a href="https://www.dyalog.com/">Dyalog Ltd</a>
              at
              <a href="https://dyalog.run">https://dyalog.run</a>
              and its instance of the software repository is hosted at
              <a href="https://github.com/Dyalog/dyalog.run">https://github.com/Dyalog/dyalog.run</a>.
            </p>
            <p className="text-justify mb-3">
              The principal purpose of dyalog.run is to support other websites hosted by Dyalog Ltd.
              In order to access dyalog.run directly you must agree to the
              <a href="#terms-of-use">Terms of Use</a>.
            </p>
          </article>
          <article id="privacy-policy">
            <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
            <p className="text-justify mb-3">
              When you visit the dyalog.run, the following information is collected:
            </p>
            <ul className="list-disc ml-6 my-2">
              <li>
                Your IP address. This is used to implement rate-limiting to prevent exhaustion of resources.
                A hashed version of your IP address may be stored for up to 1 month, and is never associated
                with any data except the amount of resources you use. Your IP address in an unhashed form
                may be stored for up to 1 year for security reasons.
              </li>
              <li>
                Any data you submit in the Run form (code, input, etc.). These are only used to process your
                code execution request, and immediately deleted after execution has completed.
              </li>
            </ul>
            <p className="text-justify mb-3">
              Any information you save on the Preferences page is stored locally in your browser and never
              shared with anyone
            </p>
            <p className="text-justify mb-3">
              See also the general Dyalog
              <a href="https://www.dyalog.com/index.php?page=privacy-policy">
                Privacy Policy
              </a>.
            </p>
          </article>
          <hr className="border-gray-400 dark:border-gray-700 my-4" />
          <article id="terms-of-use">
            <h1 className="mb-4 text-4xl font-bold">Terms of Use</h1>
            <p className="text-justify mb-3">
            <strong>"The Service"</strong> refers to the website at
            <a href="https://dyalog.run">https://dyalog.run</a>
            and all services provided at that URL. This does not include the Software itself, but only the
            instance of the Software made available at
            <a href="https://dyalog.run">https://dyalog.run</a>.
            </p>
            <p className="text-justify mb-3">
              Unless Dyalog Ltd grants you explicit written or electronic permission, you must not use
              <strong>the Service</strong>, except directly through the web page and as a result of your
              manual user interaction with it.
            </p>
            <p className="text-justify mb-3">
              The Software includes an "API", which is a programmatic interface for interacting with
              <strong>the Service</strong>, but this is for use only by
              <strong>the Service</strong> internally, and by other websites hosted by Dyalog Ltd.
              You are not permitted to use the API otherwise.
            </p>
          </article>
        </main>
        <Footer noLegalLink />
      </div>
    </>
  );
}
