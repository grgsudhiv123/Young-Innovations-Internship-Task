export const PreventScroll = (() => {
    function preventScroll() {
        document.body.style.overflow = 'hidden';
    }

    function allowScroll() {
        document.body.style.overflow = '';
    }

    return {
        preventScroll,
        allowScroll,
    };
})();
