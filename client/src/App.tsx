import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
import Landing from './components/Landing'

const queryClient = new QueryClient()
function App() {
  return <QueryClientProvider client={queryClient}>
    <Landing />
  </QueryClientProvider>


}

export default App
