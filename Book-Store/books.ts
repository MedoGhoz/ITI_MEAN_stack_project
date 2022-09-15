export interface Ibook{
    ISBN: number,
    title: string,
    summary: string,
    author: string,
    image: string,
    category: string,
    price: number,
  	sellCount: number,
    discount: number,
    rating: {average: number, count: number}
}