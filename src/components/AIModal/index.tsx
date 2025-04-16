"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import { nanoid } from "nanoid"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { Box, Card, IconButton, Stack, Typography } from "@mui/material"

import AIBot from "@/assets/images/common/ai-bot.png"
import CloseSvg from "@/assets/svgs/header/close.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
import useGlobalStore from "@/stores/globalStore"

import AIInput from "./AIInput"
import InitialPanel from "./InitialPanel"
import MessagePanel from "./MessagePanel"
import { chatWithAI } from "./actions"

const MotionCard = motion(Card)

const AIModal = () => {
  const { aiModalVisible, changeAIModalVisible } = useGlobalStore()

  const { isMobile } = useCheckViewport()

  const [searchText, setSearchText] = useState("")

  const [responseId, setResponseId] = useState<string>()

  useEffect(() => {
    if (aiModalVisible) {
      queryClient.setQueryData(["messages"], [])
      window.document.body.classList.add("disable-body-scroll")
    } else {
      setResponseId(undefined)
      setSearchText("")
      queryClient.removeQueries({ queryKey: ["messages"] })
      window.document.body.classList.remove("disable-body-scroll")
    }
  }, [aiModalVisible])

  const queryClient = useQueryClient()

  const messages = queryClient.getQueryData(["messages"]) as any[]

  const { mutateAsync: sendMessageAsync, isPending } = useMutation({
    mutationFn: chatWithAI,
    onError: error => {
      queryClient.setQueryData(["messages"], (preMessages: any[]) => {
        return preMessages.concat({
          id: nanoid(),
          type: "output_text_error",
          text: "Something went wrong, please try again.",
        })
      })
    },
  })

  // const {
  //   data: messages,
  //   isFetching,
  //   refetch: refetchMessages,
  // } = useQuery({
  //   queryKey: ["messages"],
  //   queryFn: async () => {
  //     const response = await scrollRequest(`${AI_CHAT_URL}/${responseId}`)
  //     return response
  //   },
  //   enabled: !!responseId,
  //   initialData: [],
  // })

  // console.log(messages, "messages")

  const handleChangeSearchText = e => {
    setSearchText(e.target.value)
  }

  const handleSendMessage = async userMessage => {
    queryClient.setQueryData(["messages"], (preMessages: any[]) => {
      return preMessages.concat({
        id: nanoid(),
        type: "input_text",
        text: userMessage,
      })
    })
    setSearchText("")

    const response = await sendMessageAsync({
      message: userMessage,
      prevId: responseId,
    })

    // const msgResponse = response.output.find(item => item.type === "message")
    queryClient.setQueryData(["messages"], (preMessages: any[]) => {
      return preMessages.concat({
        id: response.msgId,
        type: "output_text",
        text: response.message,
      })
    })
    setResponseId(response.id)
  }

  return (
    <AnimatePresence>
      {aiModalVisible ? (
        <MotionCard
          sx={{
            position: "fixed",
            zIndex: "var(--mui-zIndex-modal)",
            right: [0, "2.5rem"],
            top: [0, "7.5rem"],

            width: ["100%", "46.8rem"],
            height: ["100%", "calc(100svh - 7.5rem - 10rem)"],
            borderRadius: [0, "1.6rem"],

            display: "flex",
            flexDirection: "column",

            "*": {
              fontFamily: "var(--font-inter) !important",
            },
          }}
          initial={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: 100 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
          exit={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.2, mass: 0.2, stiffness: 100 }}
        >
          <Stack
            direction="row"
            sx={{
              height: "5.6rem",
              alignItems: "center",
              justifyContent: "space-between",
              pl: "1.6rem",
              pr: "0.8rem",
              gap: "1.4rem",
              borderBottom: messages?.length ? "1px solid #1010101A" : "none",
            }}
          >
            {!!messages?.length ? (
              <>
                <Image src={AIBot} alt="AI bot" className="w-[28px] h-[28px]"></Image>
                <Typography sx={{ fontSize: "1.8rem", fontWeight: 500, flex: 1 }}>Scroll AI</Typography>
              </>
            ) : (
              <span></span>
            )}

            <IconButton onClick={() => changeAIModalVisible(false)}>
              <CloseSvg></CloseSvg>
            </IconButton>
          </Stack>
          {messages?.length ? (
            <MessagePanel data={messages} loading={isPending}></MessagePanel>
          ) : (
            <InitialPanel onChat={handleSendMessage}></InitialPanel>
          )}
          <Box sx={{ p: "0 1.6rem 2.4rem" }}>
            <AIInput value={searchText} disabled={isPending} onChange={handleChangeSearchText} onChat={handleSendMessage}></AIInput>
          </Box>
        </MotionCard>
      ) : null}
    </AnimatePresence>
  )
}

export default AIModal
