import { create } from "zustand"

import { DEVELOPER_NFT_PHRASES, MintableDate } from "@/constants"

type Phrase = "" | "in-progress" | "waiting" | "end"
type Eligible = -1 | 0 | 1

interface NFTStore {
  phrase: Phrase
  isEligible: Eligible
  isMinting: boolean
  checkPhrase: () => void
  changePhrase: (phrase: Phrase) => void
  changeIsEligible: (isEligible: Eligible) => void
  changeIsMinting: (isMinting: boolean) => void
}

const useNFTStore = create<NFTStore>()((set, get) => ({
  phrase: "",
  isEligible: 0,
  isMinting: false,
  changePhrase: value => {
    set({
      phrase: value,
    })
  },

  checkPhrase: () => {
    const current = Date.now()
    if (current < DEVELOPER_NFT_PHRASES.Starts) {
      set({
        phrase: "",
      })
    } else if (current > DEVELOPER_NFT_PHRASES.Starts && current <= DEVELOPER_NFT_PHRASES.Ends) {
      set({
        phrase: "in-progress",
      })
    } else if (current > DEVELOPER_NFT_PHRASES.Ends && current < MintableDate) {
      set({
        phrase: "waiting",
      })
    } else {
      set({
        phrase: "end",
      })
    }
  },

  changeIsEligible: isEligible => {
    set({
      isEligible,
    })
  },

  changeIsMinting: isMinting => {
    set({
      isMinting,
    })
  },
}))

export default useNFTStore
