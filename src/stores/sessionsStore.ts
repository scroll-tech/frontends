import { create } from "zustand"

interface SessionsStore {
  hasSignedTerms: boolean
  signatureRequestVisible: boolean
  selectedSection: string
  changeHasSignedTerms: (hasSignedTerms: boolean) => void
  changeSignatureRequestVisible: (signatureRequestVisible: boolean) => void
  changeSelectedSection: (selectedSection: string) => void
}

const useSessionsStore = create<SessionsStore>()((set, get) => ({
  hasSignedTerms: false,
  signatureRequestVisible: false,
  selectedSection: "session-1-dex",
  changeHasSignedTerms: hasSignedTerms => {
    set({
      hasSignedTerms,
    })
  },
  changeSignatureRequestVisible: signatureRequestVisible => {
    set({
      signatureRequestVisible,
    })
  },
  changeSelectedSection: selectedSection => {
    set({
      selectedSection,
    })
  },
}))

export default useSessionsStore
