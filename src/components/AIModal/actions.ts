"use server"

import OpenAI from "openai"

import prompt from "@/constants/prompt"

const openai = new OpenAI({
  apiKey: process.env.AI_KEY as string,
})

type InputMessage = {
  role: "developer" | "user" | "assistant"
  content: string
}

export const chatWithAI = async ({ message, prevId }: { message: string; prevId?: string }) => {
  const input = [...(prevId ? [] : [{ role: "developer", content: prompt }]), { role: "user", content: message }]

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search_preview" }],
    input: input as InputMessage[],
    previous_response_id: prevId ?? null,
  })
  return {
    id: response.id,
    msgId: response.output.find(item => item.type === "message")?.id,
    status: response.status,
    error: response.error,
    message: response.output_text,
  }
}
