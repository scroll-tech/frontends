import { readItem, writeItem } from "squirrel-gill/lib/storage"

import { CANVAS_PERKS } from "@/constants/storageKey"
import { type Perk } from "@/stores/perksStore"

export const notifyPerks = (perkList: Perk[]) => {
  let firstSeePerks = false
  let newPerksIds: string[] = []
  const prePerksIdList = readItem(localStorage, CANVAS_PERKS)
  if (prePerksIdList) {
    const prePerksIdSet = new Set(prePerksIdList)
    newPerksIds = perkList.map(perk => perk.id).filter(id => !prePerksIdSet.has(id))
  } else {
    firstSeePerks = true
    writeItem(
      localStorage,
      CANVAS_PERKS,
      perkList.map(perk => perk.id),
    )
  }
  return {
    firstSeePerks,
    newPerksIds,
  }
}

export const persistPerks = (perksIds: string[], append: boolean = false) => {
  if (append) {
    // perksIds includes new perks
    const prePerksIds = readItem(localStorage, CANVAS_PERKS, [])
    writeItem(localStorage, CANVAS_PERKS, [...prePerksIds, ...perksIds])
  } else {
    // perksIds includes all perks
    writeItem(localStorage, CANVAS_PERKS, perksIds)
  }
}
