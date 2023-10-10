import { isProduction } from "@/utils"

import Explorer from "./Explorer"
import FeaturedProjects from "./FeaturedProjects"
import Header from "./Header"
import Protocols from "./Protocols"

const Ecosystem = () => {
  return (
    <>
      <Header></Header>
      {!isProduction && <FeaturedProjects></FeaturedProjects>}
      <Protocols></Protocols>
      <Explorer></Explorer>
    </>
  )
}

export default Ecosystem
