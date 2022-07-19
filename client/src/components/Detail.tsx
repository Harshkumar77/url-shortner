import { Link, useParams } from "react-router-dom"
import { useUrlInfo } from "../utils/query"
import Loader from "./Loader"
import Notfound from "./Notfound"
import { Legend, Tooltip, BarChart, Bar, LineChart, XAxis, CartesianGrid, Line, YAxis, Pie, PieChart } from 'recharts'
import { ClipboardIcon } from "./History"
import { useContext } from "react"
import { GlobalContext } from "../App"

export default function Detail() {
    const { id } = useParams()
    const { isLoading, isError, data } = useUrlInfo(id!)
    if (isLoading)
        return <Loader />
    if (isError)
        return <Notfound />

    const { url, favicon, short, clicks, countries, limit, expiringAt } = data as any

    return <>
        <MiniCard id={id!} url={url} favicon={favicon} short={short} clicks={clicks} limit={limit} expiringAt={expiringAt} />
        <div className="md:m-5 m-6 md:p-5 p-3 rounded-xl max-w-[800px] md:mx-auto bg-secondary text-center ">
            <p className="font-semibold text-2xl p-1 ">Clicks by countries</p>
            <BarChart
                width={window.innerWidth > 750 ? 750 : 300}
                height={window.innerWidth > 750 ? 300 : 150}
                data={countries as any[]}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emoji" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#8884d8" /> </BarChart>
        </div>
        {limit !== 0 && <div className="md:m-5 m-6 md:p-5 p-3 rounded-xl max-w-[800px] md:mx-auto bg-secondary text-center ">
            <p className="font-semibold text-2xl p-1 ">Limit Used</p>
            <PieChart
                width={window.innerWidth > 750 ? 750 : 300}
                height={window.innerWidth > 750 ? 500 : 350}
            >
                <Pie data={[
                    {
                        "name": "Used Limit",
                        "value": clicks,
                        "fill": "#8884d8"
                    },
                    {
                        "name": "Remaining Clicks",
                        "value": limit - clicks,
                        "fill": "#E94560"
                    },
                ]} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#8884d8" />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
            </PieChart>
        </div>}
    </>
}


function MiniCard({ url, favicon, short, clicks, id, limit, expiringAt }: MiniCardProps) {
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
        <div className="flex flex-col md:flex-row align-middle items-center">
            <p><span className=" font-bold">Clicks{" : "}</span>{clicks}</p>
            {limit !== 0 &&
                <p><span className="ml-2 font-bold">Limit{" : "}</span>{limit}</p>
            }
            {expiringAt &&
                <p><span className="ml-2 font-bold">Expiring At{" : "}</span>{expiringAt.split("T")[0]}</p>
            }
        </div>
    </div>

}

interface MiniCardProps {
    url: string
    short: string
    favicon: string
    clicks: string
    id: string
    limit: number
    expiringAt: string | null
}