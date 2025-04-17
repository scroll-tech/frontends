import { sampleSize } from "lodash"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Stack, Typography } from "@mui/material"

import ScrollyCool from "@/assets/images/common/scrolly-cool.png"
import EnterSvg from "@/assets/svgs/header/enter.svg"
import { AI_QUESTION_LIST } from "@/constants"
import useGlobalStore from "@/stores/globalStore"

const InitialPanel = props => {
  const { onChat } = props
  const [initialQuestionList, setInitialQuestionList] = useState<string[]>([])
  const { aiModalVisible } = useGlobalStore()

  useEffect(() => {
    if (aiModalVisible) {
      setInitialQuestionList(sampleSize(AI_QUESTION_LIST, 5))
    }
  }, [aiModalVisible])

  return (
    <Stack
      direction="column"
      sx={{
        alignItems: "center",
        p: ["0 2rem", "0 2.4rem"],
        flex: 1,
        overflowY: "auto",
        scrollbarColor: "#ececec transparent",
        scrollbarWidth: "thin",
      }}
    >
      <Image src={ScrollyCool} alt="Scrolly" className="w-[72px] h-[72px]"></Image>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500, lineHeight: "2.4rem", my: "3.2rem" }}>Welcome, Scroll AI is here to help!</Typography>
      {initialQuestionList.map((item, index) => (
        <Stack
          component="button"
          key={index}
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            p: "0.8rem 1.6rem",
            bgcolor: "#1010100D",
            borderRadius: "4.4rem",
            mb: "1.6rem",
            cursor: "pointer",
          }}
          onClick={() => onChat(item)}
        >
          <EnterSvg></EnterSvg>
          <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", flex: 1, cursor: "inherit", textAlign: "left" }}>{item}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default InitialPanel
