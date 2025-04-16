import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const AssistantMessage = props => {
  const { children } = props
  return (
    <ReactMarkdown
      children={children as string}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
      }}
      className="assistant-message"
    />
  )
}

export default AssistantMessage
