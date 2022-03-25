import { atom } from 'recoil'

export const currentTrackIdState = atom({
  key: 'currentTrackStateAtom',
  default: null as unknown as string,
})

export const isPlayingState = atom({
  key: 'isPlayingStateAtom',
  default: false,
})
