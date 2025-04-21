"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchSession2PerProtocolMarksURL } from "@/apis/sessions"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSessionsStore from "@/stores/sessionsStore"
import { scrollRequest } from "@/utils/request"

import Card from "../components/StepCard"
import ProtocolSection from "./ProtocolSection"
import PROTOCOL_LIST from "./protocolList"
import { type ProtocolMarksMap } from "./protocolList"

const Protocols = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { hasSignedTerms } = useSessionsStore()

  useQuery({
    queryKey: ["perProtocolMarks", walletCurrentAddress],
    queryFn: async (): Promise<ProtocolMarksMap> => {
      const data = await scrollRequest(fetchSession2PerProtocolMarksURL(walletCurrentAddress))
      if (data.status !== "1") {
        return Promise.reject(new Error("Something went wrong, please try again later."))
      }
      return Object.fromEntries(data.result.map(({ project, marks }) => [project, marks]))
    },
    initialData: {} as ProtocolMarksMap,
    enabled: !!walletCurrentAddress && hasSignedTerms,
  })

  return (
    <Card title="Step 2: Utilize assets across protocols">
      {PROTOCOL_LIST.map(({ title, description, data, tag, tagTooltip }) => (
        <ProtocolSection key={title} title={title} description={description} data={data} tag={tag} tagTooltip={tagTooltip}></ProtocolSection>
      ))}
    </Card>
  )
}

export default Protocols
