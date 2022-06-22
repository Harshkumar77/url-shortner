import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    axios.get("/api").then((_) => console.log(_.data))
    return () => {}
  }, [])

  return <h1 className="text-5xl">Hello Starter</h1>
}

export default App
