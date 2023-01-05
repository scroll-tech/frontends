import create from "zustand"

interface RollupStore {
  errorMessage: string
  emptyBatch: boolean
  batchLoading: boolean
  searchLoading: boolean
  changeBatchLoading: (value) => void
  changeSearchLoading: (value) => void
  changeErrorMessage: (value) => void
  changeEmptyBatch: (value) => void
}

const useRollupStore = create<RollupStore>()((set, get) => ({
  errorMessage: "",
  emptyBatch: false,
  batchLoading: false,
  searchLoading: false,
  changeBatchLoading: value => {
    set({
      batchLoading: value,
    })
  },

  changeSearchLoading: value => {
    set({
      searchLoading: value,
    })
  },

  changeErrorMessage: value => {
    set({
      errorMessage: value,
    })
  },

  changeEmptyBatch: value => {
    set({
      emptyBatch: value,
    })
  },
}))

export default useRollupStore
