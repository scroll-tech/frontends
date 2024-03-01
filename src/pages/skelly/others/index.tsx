import { useParams } from "react-router-dom"

import Dashboard from "../Dashboard"

const OthersSkelly = () => {
  const { address } = useParams()
  return <Dashboard address={address}></Dashboard>
}

export default OthersSkelly
