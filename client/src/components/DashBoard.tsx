import axios from "axios"
import exp from "constants"
import { ReactNode, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../App"
import request from "../utils/axios"
import { useRecent } from "../utils/query"
import History from "./History"
import { useAutoAnimate } from '@formkit/auto-animate/react'


export default function DashBoard() {

  const [url, setUrl] = useState("")
  const { setNotification } = useContext(GlobalContext)
  const [generatingUrl, setGeneratingUrl] = useState(false)
  const [advanceOptions, setAdvanceOptions] = useState(false)

  const [expirationDate, setExpirationDate] = useState({
    enabled: false,
    inputFormat: (new Date()).toDateString()
  })
  const [limit, setLimit] = useState(0)

  const { data, isLoading, isError, refetch } = useRecent()

  const { BASE_URL } = useContext(GlobalContext)

  const [advanceOptionsRef] = useAutoAnimate<HTMLDivElement>()

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

        <button className="disabled:bg-gray-400 disabled:outline-none hover:bg-primary hover:outline-none outline outline-primary p-3 rounded-lg m-4 font-semibold font-2xl"
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
            const body = advanceOptions ? { url, expiringAt: expirationDate.inputFormat, limit } : { url }
            request.post("/api/generate", body).then(_ => {
              navigator.clipboard.writeText(`${BASE_URL}/${_.data.short}`)
              setNotification("Copied to clipboard")
              setGeneratingUrl(false)
              setTimeout(() => {
                setNotification("")
              }, 1500);
              refetch()
            }).catch(e => {
              setNotification("Please enter valid url")
              setGeneratingUrl(false)
              setTimeout(() => {
                setNotification("")
              }, 1500);
            })
          }}
          disabled={generatingUrl}
        >Short it</button>
        <label className="pr-2" >Advance options</label>
        <input type="checkbox" className="" checked={advanceOptions} onChange={({ currentTarget }) => {
          setAdvanceOptions(currentTarget.checked)
        }} />
        <div ref={advanceOptionsRef}>
          {advanceOptions &&
            <>
              <div>
                <label className="pr-2">Expiration Date (UTC)</label>
                <input min={new Date().toISOString().split("T")[0]} type="date" value={expirationDate.inputFormat} onChange={({ target }) => {
                  setExpirationDate({ enabled: true, inputFormat: target.value })
                }} className="bg-primary p-2 rounded font-bold outline-none" />
              </div>
              <div className="p-2">
                <label>Limit (0 for no-limit)</label>
                <input type="number" min={0} value={limit} onChange={({ currentTarget }) => setLimit(currentTarget.valueAsNumber)} className="outline-none text-center ml-2 bg-primary p-2 rounded font-bold" />
              </div>
            </>
          }
        </div>
      </div>
      <History urls={data || []} isLoading={isLoading} />
      {!isLoading && <More />}
    </>
  )
}

function More() {
  return <Link to={'/stats'}>
    <div
      className="bg-primary p-3 text-center font-bold max-w-[10ch] mx-auto mb-2 rounded-xl hover:bg-secondary hover:outline hover:outline-4 hover:outline-primary cursor-pointer">
      Full stats</div>
  </Link >
}