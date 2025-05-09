import { expect, test, describe } from 'bun:test'
import { fetchWikiPage } from '../src/fetchWikiPage'
import { parseSong } from '../src/parseSong'

describe('Parse Rotaeno Song Page', () => {
  test('심장병', async () => {
    const document = await fetchWikiPage('심장병')
    const result = parseSong(document)

    expect(result).toEqual({
      title: '심장병',
      id: '심장병-HyuN feat. HUBOG',
      imageUrl:
        'https://cdn.wikiwiki.jp/to/w/rotaeno/%EC%8B%AC%EC%9E%A5%EB%B3%91/::ref/sinz.png.webp',
      pack: '基本曲',
      composer: 'HyuN feat. HUBOG',
      chartDesigner: 'TangScend',
      artwork: 'Juice Black',
      ver: '1.0.3',
      charts: [
        {
          difficulty: 'Ⅰ',
          const: 1.0,
        },
        {
          difficulty: 'Ⅱ',
          const: 3.0,
        },
        {
          difficulty: 'Ⅲ',
          const: 8.2,
        },
        {
          difficulty: 'Ⅳ',
          const: 9.5,
        },
      ],
    })
  })
})
