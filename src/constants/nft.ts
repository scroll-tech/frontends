import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

export const SCROLL_ORIGINS_NFT = "Scroll Origins NFT"

dayjs.extend(utc)
// UTC
// const StartDate = new Date("2023-10-10T06:00:00Z") // mainnet
export const StartDate = dayjs("2023-10-10T06:00:00Z") // mainnet

export const Stage2StartDate = StartDate.add(30, "day")

export const Stage3StartDate = Stage2StartDate.add(15, "day")

export const EndDate = Stage3StartDate.add(15, "day").subtract(1, "ms")

export const MintableDate = Stage3StartDate.add(21, "day")

export const DEVELOPER_NFT_STEPS = [
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
