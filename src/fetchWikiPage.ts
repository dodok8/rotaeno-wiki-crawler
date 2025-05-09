import ky from 'ky'
import { JSDOM } from 'jsdom'

export async function fetchWikiPage(pageName: string) {
  const baseUrl = 'https://wikiwiki.jp/rotaeno'
  const requestUrl =
    pageName === 'LINK x LIN#S'
      ? `${baseUrl}/${pageName}`
      : `${baseUrl}/${encodeURIComponent(pageName)}`

  try {
    const response = await ky.get(requestUrl)
    const text = await response.text()

    const dom = new JSDOM(text)
    const document = dom.window.document

    return document
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${pageName} fetch Error: ${error.message}`)
    } else {
      throw new Error(`${pageName} fetch Error: ${String(error)}`)
    }
  }
}
