import React from "react";
import { useRecoilValue } from 'recoil'
import { playlistState } from '../../recoilAtoms/playlistAtom'
import Song from './Song/Song'

export const Songs: React.FC = () => {
  const playlist = useRecoilValue(playlistState);

  const playlistBlock = playlist?.tracks.items.map((trackItem, index) => {
    return (
      <Song key={trackItem.track.id} track={trackItem.track} order={index + 1}/>
    )
  })

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white overflow-scroll'>
      {playlistBlock}
    </div>
  )
}
