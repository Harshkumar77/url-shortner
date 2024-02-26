import { useEffect, useRef, useState } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";

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
      {window.innerWidth > 750 && (
        <div
          id="bg-globe"
          className="absolute top-0 right-0 bottom-0 left-0 h-full overflow-hidden  w-full m-auto -z-10"
          ref={myRef}
        ></div>
      )}
      <div className="flex flex-col min-h-full justify-start">
        <About />
        <GoogleButton />
        <AbouMe />
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

function GoogleButton() {
  const authUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/auth/google"
      : "/auth/google";
  return (
    <a href={authUrl}>
      <div
        className="flex bg-secondary rounded-xl justify-center p-4 
            max-w-[800px] md:mx-auto items-center m-10 hover:outline outline-primary cursor-pointer"
      >
        <img
          className="w-10 aspect-square mr-2"
          src="/assets/google_icon.png"
        />
        <p className="text-white inline font-semibold">Continue with Google</p>
      </div>
    </a>
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
        . By signing up you are agreeing up to {" "} 
        <a
          className="font-bold text-primary underline"
          href="/tnc"
        >terms and condition</a>
      </p>
    </div>
  );
}
