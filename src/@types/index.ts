export type Song = {
  title: string
  id: string
  imageUrl: string
  pack: string
  composer: string
  chartDesigner: string
  artwork: string
  ver: string
  charts: {
    difficulty: 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ' | 'Ⅳ-α'
    const: number
  }[]
}
