export function NewsCard(newsData) {
    const date = new Date(newsData.date);
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `
    <div class="col-span-6 md:col-span-4 border border-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-200 ease-in-out">
            <div class="aspect-424/324 overflow-hidden relative">
              <img src=${newsData.imgURL[0]} alt="news img ${newsData.title}" class="w-full h-full object-cover object-center"/>
              <span class="absolute size-9 md:size-11 lg:size-[56px] bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 flex flex-col items-center justify-center bg-gray-100/80 group-hover:bg-white rounded-sm transition-all duration-200 ease-in-out">
                <span class="text-sm md:text-lg lg:text-xl leading-[150%] font-medium">${day}</span>
                <span class="text-[8px] md:text-xs uppercase tracking-[3%] leading-[100%] text-gray-500">${month}</span>
              </span>
            </div>
            <div class="p-2 lg:p-4 xl:p-6 space-y-2 md:space-y-5">
                <div class="space-y-2">
                  <div class="flex flex-row gap-2 xl:gap-4">
                    <span class="flex gap-1 items-center">
                      <i class="fa-solid fa-tag text-xs sm:text-sm xl:text-xl text-gray-300"></i>
                      <span class="text-[8px] sm:text-xs lg:text-sm font-normal text-gray-700 leading-[100%] xl:leading-[150%]">${newsData.tag}</span>
                    </span>
                    <span class="flex gap-1 items-center">
                      <i class="fa-regular fa-user text-xs sm:text-sm xl:text-xl text-gray-300"></i>
                      <span class="text-[8px] sm:text-xs lg:text-sm font-normal text-gray-700 leading-[100%] xl:leading-[150%]">${newsData.user}</span>
                    </span>
                    <span class="flex gap-1 items-center">
                      <i class="fa-regular fa-message text-xs sm:text-sm xl:text-xl text-gray-300"></i>    
                      <span class="text-[8px] sm:text-xs lg:text-sm font-normal text-gray-700 leading-[100%] xl:leading-[150%]">${newsData.comment} comments </span>                
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm lg:text-lg font-medium leading-[120%] xl:leading-[150%] group-hover:text-(--success-dark) transition-all duration-200 ease-in-out">${newsData.desc}</p>
                </div>
                <a href="/view all" class="text-(--light-green) flex flex-row gap-1 md:gap-3 items-center">
                <span class="font-semibold capitalize text-xs sm:text-sm xl:text-base leading-[100%] lg:leading-[120%]">Read More</span>
                 <i
                    class="fa-solid fa-arrow-right animate-pulse duration-500 ease-linear text-xs sm:text-base"
                  ></i>
              </a>
            </div>
          </div>
    `
}


