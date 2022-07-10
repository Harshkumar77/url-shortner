import { useQuery } from "react-query"
import request from "./axios"

const recentUrls = () => request.get("/api/urls/recent").then((_) => _.data)

const historyUrls = () => request.get("/api/urls").then((_) => _.data)

export const useRecent = () =>
  useQuery("recent", recentUrls, {
    enabled: false,
    refetchOnMount: true,
  })

export const useHistory = () => useQuery("historyUrls", historyUrls)
