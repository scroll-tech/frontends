import BuildingStory from "./BuildingStory"
import Header from "./Header"
import Initail from "./Initail"
import JoinTeam from "./JoinTeam"
import TeamMembers from "./TeamMembers"
import TechPrinciple from "./TechPrinciple"
import Value from "./Value"

const OurStory = () => {
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Header></Header>
      <Initail></Initail>
      <Value></Value>
      <TechPrinciple></TechPrinciple>
      <TeamMembers></TeamMembers>
      <BuildingStory></BuildingStory>
      <JoinTeam></JoinTeam>
    </div>
  )
}

export default OurStory
