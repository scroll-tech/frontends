import { Paper } from "@mui/material"

const SectionTitle = (props: any) => {
  return (
    <Paper
      className="overflow-hidden mt-[40px] sm:rounded-lg max-w-[880px] mx-auto"
      sx={{
        boxShadow: theme => theme.boxShadows.tile,
        ...(props.sx || {}),
      }}
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-tight font-medium text-gray-900">{props.title}</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>{props.children}</dl>
      </div>
    </Paper>
  )
}

export default SectionTitle
