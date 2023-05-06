import { create } from "zustand"

interface RollupStore {
  data: any[]
  total: number
  errorMessage: string
  emptyBatch: boolean
  batchLoading: boolean
  searchLoading: boolean
  currentClickedBatch: number
  changeData: (value) => void
  changeTotal: (value) => void
  changeCurrentClickedBatch: (value) => void
  changeBatchLoading: (value) => void
  changeSearchLoading: (value) => void
  changeErrorMessage: (value) => void
  changeEmptyBatch: (value) => void
}

const useRollupStore = create<RollupStore>()((set, get) => ({
  data: [],
  total: 0,
  currentClickedBatch: -1,
  errorMessage: "",
  emptyBatch: false,
  batchLoading: false,
  searchLoading: false,
  changeData: value => {
    set({
      data: value,
    })
  },
  changeTotal: value => {
    set({
      total: value,
    })
  },
  changeCurrentClickedBatch: value => {
    set({
      currentClickedBatch: value,
    })
  },
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
