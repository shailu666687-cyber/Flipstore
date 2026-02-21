document.addEventListener('DOMContentLoaded', () => {
    // 1. Cart ka badge update karo localstorage se
    Store.updateCartBadge();

    // 2. Router Start karo
    Router.init();

    // 3. First time app khulne par pehla page load karo
    // (Lekin thoda delay denge taaki splash screen pehle smoothly dikh jaye)
    setTimeout(() => {
        Router.handleRoute();
    }, 100);
});
