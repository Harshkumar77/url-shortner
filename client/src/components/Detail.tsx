import { useParams } from "react-router-dom"
import { useUrlInfo } from "../utils/query"
import { HistoryItem } from "./History"
import Loader from "./Loader"
import Notfound from "./Notfound"
import { Legend, Tooltip, BarChart, Bar, LineChart, XAxis, CartesianGrid, Line, YAxis } from 'recharts'

export default function Detail() {
    const { id } = useParams()
    const { isLoading, isError, data } = useUrlInfo(id!)
    if (isLoading)
        return <Loader />
    if (isError)
        return <Notfound />

    const { url, favicon, short, clicks, countries } = data as any

    return <>
        <HistoryItem id={id!} url={url} favicon={favicon} short={short} clicks={clicks} />
        <BarChart
            width={500}
            height={300}
            data={countries as any[]}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emoji" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill="#8884d8" />
        </BarChart>
    </>
}
