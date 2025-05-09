import type { fetchWikiPage } from './fetchWikiPage'

const titleMappings = new Map<string, string>([
  ['^/7(Ll?[_(L+#<>+&l^(o)', 'Nyarlathotep'],
  ['LostPuppet', 'Lost Puppet'],
])

export function ParseSongList(
  document: Awaited<ReturnType<typeof fetchWikiPage>>
): string[] {
  const rows = Array.from(document.querySelectorAll('tr'))
  const result = []

  for (const row of rows) {
    const rawTitle = row.querySelector('td:nth-child(1) > a')?.textContent || ''

    // 소챕터 구별을 제외하는 로직
    if (rawTitle === '') {
      continue
    }

    // 만우절 제외
    const verInfo = row.querySelector('td:nth-child(3)')?.textContent || ''

    if (verInfo.includes('04/01')) {
      continue
    }

    const mappedTitle = titleMappings.get(rawTitle)
    const title = mappedTitle !== undefined ? mappedTitle : rawTitle

    result.push(title)
  }

  return result
}
