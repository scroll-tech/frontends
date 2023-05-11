const SectionTitle = (props: any) => {
  return (
    <div className="bg-white shadow-[2px_2px_10px_rgba(131,131,131,0.4)] overflow-hidden mt-[40px] sm:rounded-lg max-w-[880px] mx-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-tight font-medium text-gray-900">{props.title}</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>{props.children}</dl>
      </div>
    </div>
  )
}

export default SectionTitle
