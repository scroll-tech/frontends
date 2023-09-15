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
    if (current > DEVELOPER_NFT_PHRASES.Announces && current < DEVELOPER_NFT_PHRASES.Starts) {
      set({
        phrase: "warm-up",
      })
    } else if (current > DEVELOPER_NFT_PHRASES.Starts && current < DEVELOPER_NFT_PHRASES.Ends) {
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
