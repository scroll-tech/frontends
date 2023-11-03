import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

export const SCROLL_ORIGINS_NFT = "Scroll Origins NFT"

dayjs.extend(utc)
// UTC
// const StartDate = new Date("2023-10-10T06:00:00Z") // mainnet
// export const StartDate = dayjs("2023-10-10T06:00:00Z") // mainnet

// export const Stage2StartDate = dayjs("2023-11-09T23:00:00Z")

// export const Stage3StartDate = dayjs("2023-11-24T23:00:00Z")

// export const EndDate = dayjs("2023-12-09T23:00:00Z").subtract(1, "ms")

// export const MintableDate = dayjs("2023-12-14T23:00:00Z")

export const StartDate = dayjs("2023-09-02T06:00:00Z") // mainnet

export const Stage2StartDate = dayjs("2023-10-09T23:00:00Z")

export const Stage3StartDate = dayjs("2023-10-24T23:00:00Z")

export const EndDate = dayjs("2023-11-01T23:00:00Z").subtract(1, "ms")

export const MintableDate = dayjs("2023-11-14T23:00:00Z")

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
        key: "A",
        title: "Win a hackathon in Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
      {
        key: "B",
        title: "Continue building great products at Scroll",
        explaination:
          "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
    ],
    answer: "B",
  },
  {
    subject: "What’s the best way to get sponsored at Scroll?",
    options: [
      {
        key: "A",
        title: "Win a hackathon in Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
      {
        key: "B",
        title: "Continue building great products at Scroll",
        explaination:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      },
    ],
    answer: "A",
  },
]
