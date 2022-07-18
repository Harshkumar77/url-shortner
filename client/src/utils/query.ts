import { QueryFunction, useQuery } from "react-query"
import request from "./axios"

const recentUrls = () => request.get("/api/urls/recent").then((_) => _.data)

const historyUrls = () => request.get("/api/urls").then((_) => _.data)

const urlInfo: QueryFunction = ({ queryKey }) => {
  const [_, id] = queryKey
  return request.get(`/api/url/${id}`).then((_) => _.data)
}

export const useRecent = () =>
  useQuery("recent", recentUrls, {
    enabled: false,
    refetchOnMount: true,
  })

export const useHistory = () => useQuery("historyUrls", historyUrls)

export const useUrlInfo = (id: string) =>
  useQuery(["url", id], urlInfo, {
    retry: 0,
  })
