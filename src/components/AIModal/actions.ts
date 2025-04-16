"use server"

import OpenAI from "openai"

import { AI_PROMPT } from "@/constants"

const openai = new OpenAI({
  apiKey: process.env.AI_KEY as string,
})

type InputMessage = {
  role: "developer" | "user" | "assistant"
  content: string
}

export const chatWithAI = async ({ message, prevId }: { message: string; prevId?: string }) => {
  console.log(prevId, "prevId")
  const input = [...(prevId ? [] : [{ role: "developer", content: AI_PROMPT }]), { role: "user", content: message }]

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search_preview" }],
    input: input as InputMessage[],
    previous_response_id: prevId ?? null,
    stream: true,
  })

  return response.toReadableStream()
}
