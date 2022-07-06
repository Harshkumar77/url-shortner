import { useQuery } from 'react-query'
import request from '../utils/axios'

export default function Landing() {
    const { isError, isLoading, data } =
        useQuery<{ id: string }>('user', () => request.get('/auth/user').then(_ => _.data))
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