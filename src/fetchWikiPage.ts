import ky from 'ky'
import { Window } from 'happy-dom'

export async function fetchWikiPage(pageName: string) {
  const baseUrl = 'https://wikiwiki.jp/rotaeno'
  const requestUrl = `${baseUrl}/${encodeURIComponent(pageName)}`

  try {
    const response = await ky.get(requestUrl).text()

    const window = new Window()
    const document = window.document
    document.documentElement.innerHTML = response

    return document
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${pageName} fetch Error: ${error.message}`)
    } else {
      throw new Error(`${pageName} fetch Error: ${String(error)}`)
    }
  }
}
