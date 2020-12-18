export interface LatestNews {
    "status": string,
    "news": [  {
        "id": string,
        "title": string,
        "description": string,
        "url": string,
        "author": string,
        "image": string,
        "language": string,
        "category": [
            string
        ],
        "published": Date
    }, ]
}
