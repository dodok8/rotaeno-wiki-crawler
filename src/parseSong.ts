import type { Song } from './@types'
import type { fetchWikiPage } from './fetchWikiPage'

export function parseSong(
  document: Awaited<ReturnType<typeof fetchWikiPage>>
): Song {
  // H1: Parse title
  const title = document.querySelector('h1.title')?.textContent || ''

  // First Table: Parse imageUrl, pack, composer, chartDesigner, artwork, ver

  const firstTable = document.querySelector(
    '#content > div.nobr > div.h-scrollable:nth-child(1) > table > tbody'
  )

  const composer =
    firstTable?.querySelector('tr:nth-child(1) > td:nth-child(2)')
      ?.textContent || ''
  const artwork =
    firstTable?.querySelector('tr:nth-child(1) > td:nth-child(4)')
      ?.textContent || ''

  const chartDesigner =
    firstTable?.querySelector('tr:nth-child(2) > td:nth-child(2)')
      ?.textContent || ''

  const rawImageUrl = firstTable?.querySelector('img')?.getAttribute('src')
  const imageUrl = rawImageUrl
    ? new URL(rawImageUrl).origin + new URL(rawImageUrl).pathname
    : ''

  const pack =
    firstTable?.querySelector('tr:nth-child(8) > td:nth-child(2)')
      ?.textContent || ''

  const rawVer =
    firstTable?.querySelector('tr:nth-child(9) > td:nth-child(2)')
      ?.textContent || ''
  const verMatch = rawVer.match(/(\d+\.\d+\.\d+)/)
  const ver = (verMatch ? verMatch[1] : '') as string

  // Make id

  const id = `${title}-${composer}`

  // Third Table: Parse const

  const thirdTable = document.querySelector(
    '#content > div.nobr > div.h-scrollable:nth-child(5)'
  )
  const constCells = thirdTable?.querySelectorAll('td') || []

  const difficulties = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅳ-α'] as const

  const charts = Array.from(constCells).map((cell, idx) => ({
    difficulty: difficulties[idx],
    const: Number(cell.textContent),
  })) as Song['charts']

  return {
    id,
    title,
    artwork,
    chartDesigner,
    composer,
    imageUrl,
    charts,
    pack,
    ver,
  }
}

// #content > div.nobr > div.h-scrollable:nth-child(1) 첫 번째 표
// #content > div.nobr > div.h-scrollable:nth-child(1) img 이미지 태그
// #content > div.nobr > div.h-scrollable:nth-child(5) 세 번 째 표
