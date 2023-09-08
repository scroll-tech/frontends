import { create } from "zustand"

import { DEVELOPER_NFT_PHRASES } from "@/constants"

type Phrase = "warm-up" | "in-progress" | "end"

interface NFTStore {
  phrase: Phrase
  checkPhrase: () => void
  changePhrase: (phrase: Phrase) => void
}

const useNFTStore = create<NFTStore>()((set, get) => ({
  phrase: "warm-up",

  changePhrase: value => {
    set({
      phrase: value,
    })
  },

  checkPhrase: () => {
    const current = Date.now()
    if (current > DEVELOPER_NFT_PHRASES.Annoucement && current < DEVELOPER_NFT_PHRASES.Start) {
      set({
        phrase: "warm-up",
      })
    } else if (current > DEVELOPER_NFT_PHRASES.Start && current < DEVELOPER_NFT_PHRASES.End) {
      set({
        phrase: "in-progress",
      })
    } else {
      set({
        phrase: "end",
      })
    }
  },
}))

export default useNFTStore
