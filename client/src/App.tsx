import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
import Landing from './components/Landing'
import { createContext, useState } from 'react'
import request from './utils/axios'
import Loader from './components/Loader'
import DashBoard from './components/DashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stats from './components/Stats'
import Notfound from './components/Notfound'
import Detail from './components/Detail'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Temp />
    </BrowserRouter>
  </QueryClientProvider>


}

function Temp() {
  const { isLoading, data, error, isError } = useQuery("user", () => request.get('/auth/user').then(_ => _.data), {
    retry: 0
  })
  if (isLoading) return <Loader />
  if (isError)
    return <Landing />
  return <Routes>
    <Route path="/stats" element={<Stats />} />
    <Route path="/url/:id" element={<Detail />} />
    <Route path="/" element={<DashBoard />} />
    <Route path='*' element={<Notfound />} />
  </Routes>
}

export default App

