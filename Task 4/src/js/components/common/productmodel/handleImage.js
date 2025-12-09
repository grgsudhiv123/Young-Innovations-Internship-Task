export const handleImage = (productDetail) => {
    const productSlideImgContainer = document.getElementById(
        'model-sliderimg-container',
    );
    productDetail.imgURL.forEach((img) => {
        const slideImgDiv = document.createElement('div');
        slideImgDiv.id = `sliderImg-${productDetail.id}-${img}`;
        slideImgDiv.classList.add('product-img-div');
        const slideImg = document.createElement('img');
        slideImg.classList.add('img-styling');
        slideImg.src = img;
        slideImg.alt = productDetail.name + img;
        slideImgDiv.appendChild(slideImg);
        productSlideImgContainer.appendChild(slideImgDiv);
    });

    // hero img
    const productMainImgContainer = document.getElementById(
        'model-mainimg-container',
    );
    const productMainImg = document.createElement('img');
    productMainImg.classList.add('img-styling');
    productMainImg.src = productDetail.imgURL[0];
    productMainImg.alt = productDetail.name + productDetail.imgURL[0];
    productMainImgContainer.appendChild(productMainImg);

    // handle slider img btn
    const slidePrevBtn = document.getElementById('model-slideimgbtn-prev');
    const slideNextBtn = document.getElementById('model-slideimgbtn-next');
    let imgCount = 0;
    slidePrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (imgCount > 0) {
            imgCount = imgCount - 1;
        }
        productMainImg.src = productDetail.imgURL[imgCount];
        productMainImg.alt =
            productDetail.name + productDetail.imgURL[imgCount];
    });
    slideNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (imgCount < productDetail.imgURL.length - 1) {
            imgCount = imgCount + 1;
        }
        productMainImg.src = productDetail.imgURL[imgCount];
        productMainImg.alt =
            productDetail.name + productDetail.imgURL[imgCount];
    });
};
