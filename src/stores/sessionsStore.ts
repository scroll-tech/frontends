import { create } from "zustand"

interface SessionsStore {
  hasSignedTerms: boolean
  signatureRequestVisible: boolean
  changeHasSignedTerms: (hasSignedTerms: boolean) => void
  changeSignatureRequestVisible: (signatureRequestVisible: boolean) => void
}

const useSessionsStore = create<SessionsStore>()((set, get) => ({
  hasSignedTerms: false,
  signatureRequestVisible: false,
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
}))

export default useSessionsStore
