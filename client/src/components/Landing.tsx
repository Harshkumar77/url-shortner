import { useQuery } from "react-query"
import request from "../utils/axios"

export default function Landing() {
    return (
        <>
            <About />
            <GoogleButton />
        </>
    )
}

function About() {
    return <div className="max-w-[800px] md:mx-auto bg-secondary p-10 rounded-xl m-10">
        <p className="text-2xl md:text-4xl text-white">
            The enterprise ready{" "}
            <span className="font-bold text-primary">url shortner</span>
        </p>
        <br />
        <p className="text-4xl text-white">
            Comes with{" "}
            <span className="font-bold text-primary">
                Tracking{" "}
            </span>
            and{" "}
            <span className="font-bold text-primary">
                Advance analytics{" "}
            </span>
        </p>
    </div>
}

function GoogleButton() {
    return <div className="flex bg-secondary rounded-xl justify-center p-4 
            max-w-[800px] md:mx-auto items-center m-10 hover:outline outline-primary cursor-pointer">
        <img className="w-10 aspect-square mr-2" src="/assets/google_icon.png" />
        <a href={
            process.env.NODE_ENV === 'development' ? 'http://localhost:8080/auth/google' : '/auth/google'
        } className="text-white inline font-semibold">Continue with Google</a>
    </div>
}
