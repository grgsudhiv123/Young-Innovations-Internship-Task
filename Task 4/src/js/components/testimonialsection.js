import { FetchApi } from "../fetchApi.js";
import { testimonialCard } from "./common/testimonialcard.js";

export async function TestimonialSection() {
    try {
        const testimonialData = await FetchApi("products", "");
        const review = testimonialData.map((review) => review.reviews);
        const flatenArray = review.reduce((acc, cur) => acc.concat(cur), []);

        const filteredReview = flatenArray.filter((review) => review.rating >= 4);
        const sortedReview = filteredReview.sort((a, b) => 
        b.comment.length - a.comment.length
        ).slice(0,3);
        const testimonialContainer = document.getElementById("testimonial-container");
        testimonialContainer.innerHTML = sortedReview.map((review)=>testimonialCard(review)).join("");
    } catch (error) {
        console.log(error);
        return error;
    }
}