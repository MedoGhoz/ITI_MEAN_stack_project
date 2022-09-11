export interface Ibook{
    ISBN: number,
    title: string,
    summary: string,
    category: string,
    image: string,
    author: string,
    price: number,
  	saleCount: number,
    rating: {count: number, average: number}
}