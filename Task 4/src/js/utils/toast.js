export function toastMessage(message, status) {
    const toastContainer = document.createElement('div');
    toastContainer.className =
        'toastAnimation fixed z-50 bottom-5 max-w-120 w-fit min-h-20 px-2 py-1 right-5 flex gap-2 items-center';

    toastContainer.innerHTML = `
        <div class="spinner">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="text-gray-500">
                <path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16"
                stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <p class="text-base text-white font-medium">${message}</p>
    `;

    document.body.appendChild(toastContainer);

    toastStatus(status, toastContainer);

    void toastContainer.offsetHeight;

    toastContainer.classList.add('active');

    setTimeout(() => {
        toastContainer.classList.remove('active');
        setTimeout(() => toastContainer.remove(), 200);
    }, 3000);
}

function toastStatus(status, toastContainer) {
    switch (status) {
        case 'success':
            toastContainer.classList.add('bg-green-500/90');
            break;

        case 'error':
            toastContainer.classList.add('bg-red-500/90');
            break;

        case 'warning':
            toastContainer.classList.add('bg-yellow-500/90');
            break;

        default:
            break;
    }
}
