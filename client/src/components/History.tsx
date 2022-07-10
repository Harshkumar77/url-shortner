export default function History({ isLoading, urls, setNotification }: HistoryProps) {
    if (isLoading)
        return <> Loading</>
    return <>
        {urls.map((_: any) => <HistoryItem setNotification={setNotification} key={_.id} short={_.short} favicon={_.favicon} url={_.url} clicks={_.clicks} />)}
    </>
}

const base_url = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : new URL(window.location.href).origin

function HistoryItem({ url, favicon, short, clicks, setNotification }: HistoryItemProps) {
    return <div className="md:m-5 m-6 md:p-5 p-3 rounded-xl max-w-[800px] md:mx-auto bg-secondary ">
        <div className="flex items-center">
            <img src={favicon} alt="favicon" className="w-6 h-6 mr-2" />
            <h1 className=" underline overflow-x-hidden whitespace-nowrap text-ellipsis">{url}</h1>
        </div>
        <div className="flex py-1">
            <ClipboardIcon setNotification={setNotification} />
            <a className="text-primary font-bold ml-3" href={`${base_url}/${short}`}>{`${base_url}/${short}`}</a>
        </div>
        <p><span className=" font-bold">Clicks{" : "}</span>{clicks}</p>
    </div>

}

function ClipboardIcon({ setNotification }: ClipboardIconProps) {

    return <svg xmlns="http://www.w3.org/2000/svg"
        className="hover:text-primary cursor-pointer text-white h-5 w-5"
        onClick={() => {
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
    setNotification: React.Dispatch<React.SetStateAction<string>>
}

interface HistoryItemProps {
    url: string
    short: string
    favicon: string
    clicks: string
    setNotification: React.Dispatch<React.SetStateAction<string>>
}

interface ClipboardIconProps {
    setNotification: React.Dispatch<React.SetStateAction<string>>
}
