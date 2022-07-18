import { useQuery } from "react-query";
import { useHistory } from "../utils/query";
import History from "./History";

export default function Stats() {
    const { isLoading, data } = useHistory()
    return <History urls={data} isLoading={isLoading} />
}