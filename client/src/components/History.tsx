import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../App"

export default function History({ isLoading, urls }: HistoryProps) {
    if (isLoading)
        return <> Loading</>
    return <>
        {urls.map((_: any) => <HistoryItem id={_._id} key={_._id} short={_.short} favicon={_.favicon} url={_.url} clicks={_.clicks} />)}
    </>
}

export function HistoryItem({ url, favicon, short, clicks, id }: HistoryItemProps) {
    const { BASE_URL } = useContext(GlobalContext)
    const shortURL = `${BASE_URL}/${short}`
    return <div className="md:m-5 m-6 md:p-5 p-3 rounded-xl max-w-[800px] md:mx-auto bg-secondary ">
        <div className="flex items-center">
            <img src={favicon} alt="favicon" className="w-6 h-6 mr-2" />
            <h1 className=" underline overflow-x-hidden whitespace-nowrap text-ellipsis">{url}</h1>
        </div>
        <div className="flex py-1">
            <ClipboardIcon shortURL={shortURL} />
            <a className="text-primary font-bold ml-3" href={shortURL}>{shortURL}</a>
        </div>
        <div className="flex align-middle items-center">
            <p><span className=" font-bold">Clicks{" : "}</span>{clicks}</p>
            <Link to={`/url/${id}`}>

                <p className="p-2 rounded-md font-semibold m-2 hover:bg-primary border-primary border-2">Analytics</p>
            </Link>
        </div>

    </div>

}

function ClipboardIcon({ shortURL }: ClipboardIconProps) {

    const { setNotification } = useContext(GlobalContext)

    return <svg xmlns="http://www.w3.org/2000/svg"
        className="hover:text-primary cursor-pointer text-white h-5 w-5"
        onClick={() => {
            navigator.clipboard.writeText(shortURL)
            setNotification("Copied to clipboard")
            setTimeout(() => {
                setNotification("")
            }, 1500);
        }}
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
}

interface HistoryProps {
    isLoading: boolean
    urls: []
}

interface HistoryItemProps {
    url: string
    short: string
    favicon: string
    clicks: string
    id: string
}

interface ClipboardIconProps {
    shortURL: string
}
