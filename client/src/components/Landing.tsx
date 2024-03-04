import { useEffect, useRef, useState } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";

const authUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/auth/google"
    : "/auth/google";

export default function Landing() {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      window.innerWidth > 750 &&
        setVantaEffect(
          GLOBE({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xe94560,
            size: 1.3,
            backgroundColor: 0x1a1a2e,
          }),
        );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <>
      <div className="flex flex-col min-h-full justify-start">
        <header>
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  👆 Minify
                </span>
              </a>
              <div className="flex items-center lg:order-2">
                <a
                  href={authUrl}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Sign Up for free trial
                </a>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              ></div>
            </div>
          </nav>
        </header>

        <section className="bg-transparent">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                Modern URL shortner for Enterprise
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Comes with Tracking and Advance analytics
              </p>
              <a
                href={authUrl}
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Continue with Google
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="mailto:volcanowritingcode@gmail.com"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Speak to Sales
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              {window.innerWidth > 750 && (
                <div
                  id="bg-globe"
                  className="absolute top-0 right-0 bottom-0 left-0 h-full overflow-hidden  w-full m-auto -z-10"
                  ref={myRef}
                ></div>
              )}
            </div>
          </div>
        </section>

        <section className="md:m-4">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-white sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                Why you should choose us ?
              </h2>
              <ul className="font-semibold">
                <li className="mb-4 ">- Generous free tier</li>
                <li className="mb-4 ">- Excellent customer support</li>
                <li className="mb-4 ">
                  - Important analytics for your business
                </li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
          <div className="mx-auto max-w-screen-xl">
            <div className="md:flex md:justify-between">
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li className="mb-4">
                      <a href="https://github.com/Harshkumar77/" className="hover:underline ">
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/harsh-kumar-77v/" className="hover:underline">
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li className="mb-4">
                      <a href="/tnc" className="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/tnc" className="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © {`${new Date().getFullYear()} `}
                <a href="/" className="hover:underline">Minify</a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0"></div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function About() {
  return (
    <div className="sm:bg-opacity-100 bg-opacity-20 backdrop-blur-md max-w-[800px] md:mx-auto bg-secondary p-10 rounded-xl m-10">
      <p className="text-2xl md:text-4xl text-white">
        The enterprise ready{" "}
        <span className="font-bold text-primary">url shortner</span>
      </p>
      <br />
      <p className="text-4xl text-white">
        Comes with <span className="font-bold text-primary">Tracking </span>
        and <span className="font-bold text-primary">Advance analytics </span>
      </p>
    </div>
  );
}

function AbouMe() {
  return (
    <div className="sm:bg-opacity-100 bg-opacity-20 backdrop-blur-md max-w-[800px] md:mx-auto bg-secondary px-10 py-5 rounded-xl mx-10 mx-100">
      <p className="text-sm md:text-md text-white">
        Made by{" "}
        <a
          className="font-bold text-primary underline"
          href="https://github.com/Harshkumar77"
        >
          Harsh Kumar
        </a>
        . By signing up you are agreeing up to{" "}
        <a className="font-bold text-primary underline" href="/tnc">
          terms and condition
        </a>
      </p>
    </div>
  );
}
