import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
export default function Landing() {
    axios.get('/auth/user').then(_ => console.log(_.data))
    const { isError, isLoading, data } =
        useQuery<{ id: string }>('user', () => axios.get('/auth/user').then(_ => _.data))
    if (isLoading)
        return <>Loading</>
    if (data)
        return <>{data.id}</>
    return <a
        href={'http://localhost:8080/auth/google'}
    >
        <button className="bg-orange-500">Signup with google</button>
    </a>
}