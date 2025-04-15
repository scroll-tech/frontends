import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const AssistantMessage = props => {
  const { children } = props
  return <ReactMarkdown children={children as string} remarkPlugins={[remarkGfm]} className="assistant-message" />
}

export default AssistantMessage
