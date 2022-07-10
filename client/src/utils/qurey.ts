import { useQuery } from "react-query"
import request from "./axios"

const urlHistory = () => request.get("/api/urls/recent").then((_) => _.data)

export const useUrlHistory = () =>
  useQuery("urls", urlHistory, {
    enabled: false,
    refetchOnMount: true,
  })
