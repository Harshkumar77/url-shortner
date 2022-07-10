import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import request from "../utils/axios"
import { useUrlHistory } from "../utils/qurey"
import History from "./History"

const base_url = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : new URL(window.location.href).origin

export default function () {

  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState("")
  const [generatingUrl, setGeneratingUrl] = useState(false)

  const { data, isLoading, isError, refetch } = useUrlHistory()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <div className="md:m-10 m-6 md:p-10 p-6 text-center rounded-xl max-w-[800px] md:mx-auto generator-gradient">
        <h1 className="text-2xl font-semibold m-2">Short the url</h1>
        <input
          className="w-full mx-auto p-4 rounded-xl font-thin text-filler outline-none border-none"
          type={'url'}
          spellCheck='false'
          placeholder="Enter url here"
          value={url}
          onChange={({ currentTarget }) => setUrl(currentTarget.value)}
        />
        <button className=" disabled:bg-gray-400 disabled:outline-none hover:bg-primary hover:outline-none outline outline-primary p-3 rounded-lg m-4 font-semibold font-2xl"
          onClick={() => {
            if (url === "") {
              setNotification("No empty url")
              setTimeout(() => {
                setNotification("")
              }, 1500);
              return
            }
            setNotification("Generating...")
            setGeneratingUrl(true)
            request.post("/api/generate", {
              url
            }).then(_ => {
              navigator.clipboard.writeText(`${base_url}/${_.data.short}`)
              setNotification("Copied to clipboard")
              setGeneratingUrl(false)
              setTimeout(() => {
                setNotification("")
              }, 1500);
              refetch()
            }).catch(e => {
              console.log(e);

            })
          }}
          disabled={generatingUrl}
        >Short it</button>
      </div>
      <History setNotification={setNotification} urls={data || []} isLoading={isLoading} />
      {!isLoading && <More />}
      <Notification>{notification}</Notification>
    </>
  )
}

interface NotificationProps {
  children?: string
}

function Notification({ children }: NotificationProps) {
  return <>
    {
      children && <h1 className="bg-filler outline outline-1 p-2 inline rounded fixed top-0 right-0 m-8 outline-primary w-[18ch]">{children}</h1>
    }
  </>

}

function More() {
  return <Link to={'/stats'}>
    <div
      className="bg-primary p-3 text-center font-bold max-w-[10ch] mx-auto mb-2 rounded-xl hover:bg-filler cursor-pointer">
      Full stats</div>
  </Link >
}