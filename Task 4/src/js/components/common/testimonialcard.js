export function testimonialCard(review) {
    const stars = review.rating
        ? `
              <i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>
              `.repeat(Math.floor(review.rating)) +
          `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
              5 - Math.floor(review.rating),
          )
        : ``;

    return `
    <div class="col-span-12 sm:col-span-6 md:col-span-4 bg-white rounded-lg p-4 lg:p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 ease-in-out">
            <img src="../src/assets/icons/testimonialdecore.svg" alt="testimonial decore" class="w-[32px] h-[26px]"/>
          <p class="text-sm leading-[150%] font-normal text-gray-700">${review.comment}</p>
          <div class="w-full flex flex-col lg:flex-row justify-between items-centre gap-1">
            <div class="flex gap-3">
              <span class="size-10 lg:size-[56px] rounded-full overflow-hidden">
                <img src=${review.profileURL} alt="User : ${review.profileURL}" class="w-full h-full object-cover object-center "/>
              </span>
              <span class="flex flex-col">
                <span class="font-medium text-base leading-[150%]">${review.customer_name}</span>
                <span class="font-normal text-sm leading-[150%] text-gray-400">Customer</span>
              </span>
            </div>
            <div class="flex items-center">${stars}</div>
          </div>
        </div>
    `;
}
