import { ArrowLeftIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import useSystemThemePreference from 'lib/useSystemThemePreference';
import Footer from 'components/footer';
import ResizeableText from 'components/resizeableText';

const BIG_TEXT_BOXES_EXPLANATION: Record<string, string> = {
  false: 'Demo of small text box (always minimum possible height)',
  true: 'Demo of big text box (always at least 3 lines high)',
};

export default function Preferences() {
  const router = useRouter();
  const dispatch = useDispatch();
  const systemThemePreference = useSystemThemePreference();
  const theme = useSelector((state: any) => state.theme);
  const handleThemeChange = async (event: any) => {
    dispatch({ type: 'setTheme', theme: event.target.value });
  };
  const fontLigaturesEnabled = useSelector((state: any) => state.fontLigaturesEnabled);
  const handleFontLigaturesChange = async (event: any) => {
    dispatch({ type: 'setFontLigaturesEnabled', fontLigaturesEnabled: event.target.checked });
  };
  const fullWidthMode = useSelector((state: any) => state.fullWidthMode);
  const handleFullWidthModeChange = async (event: any) => {
    dispatch({ type: 'setFullWidthMode', fullWidthMode: event.target.checked });
  };
  const bigTextBoxes = useSelector((state: any) => state.bigTextBoxes);
  const handleBigTextBoxesChange = async (event: any) => {
    dispatch({ type: 'setBigTextBoxes', bigTextBoxes: event.target.checked });
  };
  const tabBehaviour = useSelector((state: any) => state.tabBehaviour);
  const handleTabBehaviourChange = (event: any) => {
    dispatch({ type: 'setTabBehaviour', tabBehaviour: event.target.value });
  };
  return (
    <>
      <Head>
        <title>Prefences &ndash; Run Dyalog APL</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white pt-8 relative flex flex-col">
        <main
          // only included here to provide instant feedback when changing full width mode
          className={`mb-3 px-4 grow${fullWidthMode ? '' : ' md:container md:mx-auto'}`}
        >
          <header className="flex -mt-4 md:mt-0 mb-4 relative">
            <button className="absolute top-2 transition hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full" type="button" onClick={() => router.back()}>
              <ArrowLeftIcon className="m-2 w-6 h-6 inline" />
            </button>
            <h1 className="grow my-auto text-4xl text-center font-bold">
              Preferences
            </h1>
          </header>
          <p>
            Run Dyalog APL stores your preferences locally in your browser, and they are never
            shared with anyone.
          </p>
          <fieldset className="mt-3 border border-gray-400 dark:border-gray-700 rounded pt-2 pb-4 px-4">
            <legend className="px-2">Appearance</legend>
            <div className="flex">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="themeSelector" className="my-auto mr-2">Theme:</label>
              <select
                id="themeSelector"
                className="appearance-none p-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition cursor-pointer ATO_select focus:outline-none focus:ring"
                value={theme}
                onChange={handleThemeChange}
              >
                { systemThemePreference !== null && (
                <option value="system">
                  System default (
                  {systemThemePreference}
                  )
                </option>
                ) }
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="flex flex-wrap mt-3">
              <label className="flex">
                <input type="checkbox" className="mr-2" checked={fontLigaturesEnabled} onChange={handleFontLigaturesChange} />
                Font Ligatures
              </label>
              <span className="mx-1">
                (demo:
              </span>
              <span>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-px rounded">{'<-> </> :: ||> #! ++ /* */ 0xFF != www'}</code>
                )
              </span>
            </div>
            <div className="mt-3">
              <label className="flex">
                <input type="checkbox" className="mr-2" checked={bigTextBoxes} onChange={handleBigTextBoxesChange} />
                Big text boxes
              </label>
              <div className="md:mx-6">
                <ResizeableText
                  dummy={{ current: null }}
                  id="demo"
                  value={BIG_TEXT_BOXES_EXPLANATION[bigTextBoxes]}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="flex mt-3">
              <label className="flex">
                <input type="checkbox" className="mr-2" checked={fullWidthMode} onChange={handleFullWidthModeChange} />
                Full-width mode (enabled anyway on small screens)
              </label>
            </div>
          </fieldset>
          <fieldset className="mt-3 border border-gray-400 dark:border-gray-700 rounded pt-2 pb-4 px-4">
            <legend className="px-2">Accessibility</legend>
            <label htmlFor="tabBehaviour" className="my-auto mr-2">Tab key:</label>
            <select
              id="tabBehaviour"
              className="appearance-none p-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition cursor-pointer ATO_select focus:outline-none focus:ring"
              value={tabBehaviour}
              onChange={handleTabBehaviourChange}
            >
              <option value="insert">Inserts a tab character</option>
              <option value="focus">Cycles element focus</option>
            </select>
          </fieldset>
        </main>
        <Footer />
      </div>
    </>
  );
}
