export const DEVELOPER_NFT_END_DATE = new Date("2023-09-08T12:00:00Z") // UTC

export const DEVELOPER_NFT_STEPS = [
  { label: "Annoucement", date: new Date("2023-09-08T13:41:00Z"), title: "" },
  { label: "Start", date: new Date("2023-09-08T13:43:00Z"), title: "Genesis Block" },
  { label: "End", date: new Date("2023-09-10T14:00:00Z"), title: "Program Ends" },
]

export const DEVELOPER_NFT_PHRASES = Object.fromEntries(DEVELOPER_NFT_STEPS.map(item => [item.label, item.date.valueOf()]))
