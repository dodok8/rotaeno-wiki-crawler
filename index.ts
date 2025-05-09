import * as semver from 'semver'
import { fetchWikiPage } from './src/fetchWikiPage'
import { parseSong } from './src/parseSong'
import { ParseSongList } from './src/parseSongList'
import { write } from 'bun'
import { sleep } from './src/sleep'
import type { Song } from './src/@types'

const songListDom = await fetchWikiPage('楽曲一覧')
const songList = ParseSongList(songListDom)

console.log(songList.length)

const songInfo: Song[] = []
const chunkSize = 1

for (let i = 0; i < songList.length; i += chunkSize) {
  const chunk = songList.slice(i, i + chunkSize)

  const chunkPromises = chunk.map(async (songName) => {
    try {
      console.log(`Parse ${songName}`)
      const songDom = await fetchWikiPage(songName)
      return parseSong(songDom)
    } catch (error) {
      console.error(`Error processing song ${songName}:`, error)
      return null // Return null or a specific error object for failed songs
    }
  })

  const chunkResults = await Promise.all(chunkPromises)
  songInfo.push(...chunkResults.filter((song): song is Song => song !== null))

  if (i + chunkSize < songList.length) {
    await sleep(900) // Wait for 1 second
  }
}

const sortedSongs = songInfo.sort((a, b) => {
  if (!a.ver || !b.ver) return 0
  return semver.compare(a.ver, b.ver)
})

await write('songs.json', JSON.stringify(sortedSongs, null, 2))
