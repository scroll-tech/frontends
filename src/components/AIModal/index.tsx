"use client"

import { AnimatePresence, motion } from "motion/react"
import { nanoid } from "nanoid"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { Box, Card, IconButton, Stack, Typography } from "@mui/material"

import AIBot from "@/assets/images/common/ai-bot.png"
import CloseSvg from "@/assets/svgs/header/close.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
import useGlobalStore from "@/stores/globalStore"
import { lockBodyScroll } from "@/utils"

import AIInput from "./AIInput"
import FeedbackAlert from "./FeedbackAlert"
import InitialPanel from "./InitialPanel"
import MessagePanel from "./MessagePanel"
import { chatWithAI } from "./actions"

const MotionCard = motion(Card)

interface Message {
  id: string
  type: "input_text" | "output_text" | "output_text_error"
  text: string
  feedback?: "good" | "bad"
}

type LoadingStatus = "none" | "fetching" | "streaming"

const AIModal = () => {
  const { aiModalVisible, changeAIModalVisible } = useGlobalStore()

  const { isMobile } = useCheckViewport()

  const [searchText, setSearchText] = useState("")
  const [feedbackAlertVisible, setFeedbackAlertVisible] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])

  const [responseId, setResponseId] = useState<string>()

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("none")

  useEffect(() => {
    if (aiModalVisible) {
      lockBodyScroll(true)
    } else {
      setResponseId(undefined)
      setSearchText("")
      setMessages([])
      setLoadingStatus("none")
      lockBodyScroll(false)
    }
  }, [aiModalVisible])

  const handleChangeSearchText = e => {
    setSearchText(e.target.value)
  }

  const handleSendMessage = async userMessage => {
    setMessages(preValue => {
      return preValue.concat({
        id: nanoid(),
        type: "input_text",
        text: userMessage,
      })
    })
    setSearchText("")
    chatWithScrollAI(userMessage)
  }

  const handleReSendMessage = async (id: string) => {
    const messageIndex = messages.findIndex(message => message.id === id)
    const reservedMessage = messages.slice(0, messageIndex)
    setMessages(reservedMessage)
    chatWithScrollAI(reservedMessage[messageIndex - 1].text)
  }

  const chatWithScrollAI = async (message: string) => {
    setLoadingStatus("fetching")

    let stream
    try {
      stream = await chatWithAI({
        message,
        prevId: responseId,
      })
    } catch (error) {
      setMessages(preValue => {
        return preValue.concat({
          id: nanoid(),
          type: "output_text_error",
          text: "Network error, please try again.",
        })
      })
      setLoadingStatus("none")
      return
    }

    const reader = stream.getReader()
    const decoder = new TextDecoder("utf-8")

    let currentResponseId = nanoid()
    try {
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }
        if (value) {
          decodeValue(value, decoder, currentResponseId)
        }
      }
    } catch (error) {
      setMessages(preValue => {
        return preValue.concat({
          id: nanoid(),
          type: "output_text_error",
          text: error.message,
        })
      })
      await reader.cancel()
    } finally {
      setLoadingStatus("none")
      reader.releaseLock()
    }
  }

  const decodeValue = async (value, decoder, currentResponseId) => {
    const chunk = decoder.decode(value, { stream: true })

    const lines = chunk.split("\n").filter(line => line.trim())

    for (const line of lines) {
      const event = JSON.parse(line)

      if (event.type === "response.created") {
        currentResponseId = event.response.id
        setResponseId(currentResponseId)

        setMessages(preValue => {
          return preValue.concat({
            id: currentResponseId,
            type: "output_text",
            text: "",
          })
        })
      } else if (event.type === "response.failed") {
        throw new Error("Failed to generate AI response, please try again.")
      } else if (event.type === "response.output_text.delta") {
        setLoadingStatus("streaming")
        setMessages(preValue => {
          const lastMessage = preValue[preValue.length - 1]
          const newMessage = {
            id: lastMessage.id,
            type: "output_text",
            text: lastMessage.text + event.delta,
          } as Message
          return [...preValue.slice(0, -1), newMessage]
        })
      } else if (event.type === "response.completed") {
        setLoadingStatus("none")
      } else if (event.type === "error") {
        throw new Error("Connection error, please try again.")
      }
    }
  }

  const handleUpdateData = ({ id, feedback }) => {
    // only feedback update the messages
    setFeedbackAlertVisible(true)
    setMessages(preValue => {
      return preValue.map(message => {
        if (message.id === id) {
          return {
            ...message,
            feedback: feedback,
          }
        }
        return message
      })
    })
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
              pl: ["2rem", "1.6rem"],
              pr: "0.8rem",
              gap: "1.6rem",
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
            <MessagePanel
              data={messages}
              fetching={loadingStatus === "fetching"}
              streaming={loadingStatus === "streaming"}
              onUpdateData={handleUpdateData}
              onRetry={handleReSendMessage}
            ></MessagePanel>
          ) : (
            <InitialPanel onChat={handleSendMessage}></InitialPanel>
          )}
          <Box sx={{ p: ["0 2rem 2.4rem", "0 1.6rem 2.4rem"] }}>
            <AIInput
              value={searchText}
              disabled={loadingStatus !== "none" || !searchText.trim()}
              onChange={handleChangeSearchText}
              onChat={handleSendMessage}
            ></AIInput>
          </Box>
          <Box sx={{ position: "absolute", top: "8rem", left: "50%", transform: "translateX(-50%)" }}>
            <FeedbackAlert open={feedbackAlertVisible} duration={5e3} onClose={() => setFeedbackAlertVisible(false)}>
              Thanks for your feedback!
            </FeedbackAlert>
          </Box>
        </MotionCard>
      ) : null}
    </AnimatePresence>
  )
}

export default AIModal
