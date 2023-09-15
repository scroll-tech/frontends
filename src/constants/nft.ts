import dayjs from "dayjs"

// test

// const AnnoucementDate = new Date()
const AnnoucementDate = new Date("2023-09-11T13:41:00Z")

const StartDate = dayjs(AnnoucementDate).add("1", "d")

const EndDate = dayjs(AnnoucementDate).add("10", "d")

// UTC
// const AnnoucementDate = new Date("2023-09-08T13:41:00Z")

// const StartDate = new Date("2023-10-03T00:00:00Z") // mainnet

// const EndDate = dayjs(StartDate).add("45", "day")

export const DEVELOPER_NFT_STEPS = [
  { label: "Announces", date: AnnoucementDate, title: "" },
  { label: "Starts", date: StartDate, title: "Genesis Block" },
  { label: "Ends", date: EndDate, title: "Program Ends" },
]

export const DEVELOPER_NFT_PHRASES = Object.fromEntries(DEVELOPER_NFT_STEPS.map(item => [item.label, item.date.valueOf()]))

export const FLOW_QUESTIONS = [
  {
    subject: "What’s the best way to get sponsored at Scroll?",
    options: [
      {
        title: "Win a hackathon in Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
      {
        title: "Continue building great products at Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
    ],
    answer: 1,
  },
  {
    subject: "What’s the best way to get sponsored at Scroll?",
    options: [
      {
        title: "Win a hackathon in Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
      {
        title: "Continue building great products at Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
    ],
    answer: 0,
  },
]
