import { FetchApi } from "../fetchApi.js";
import { NewsCard } from "./common/newsCard.js";

export async function LatestNewsSection() {
    try {
        const newsData = await FetchApi("news","_limit=3");
        const latestNewsContainer = document.getElementById("latest-news-container");
        latestNewsContainer.innerHTML = newsData.map((news)=>NewsCard(news)).join("");
    } catch (error) {
        console.log(error);
        return error;
    }
}



 