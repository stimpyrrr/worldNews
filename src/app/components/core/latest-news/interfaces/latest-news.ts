export interface LatestNews {
    status: string,
    news: News[],
    page: number
}

export interface News{
    id: string,
    title: string,
    description: string,
    url: string,
    author: string,
    image: string,
    language: string,
    category: string[],
    published: string
}