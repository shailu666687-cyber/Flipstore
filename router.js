// router.js
const Router = {
    init: () => window.addEventListener('hashchange', Router.handleRoute),
    handleRoute: () => {
        const hash = window.location.hash || '#home';
        const routerView = document.getElementById('router-view');
        
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[href="${hash.split('?')[0]}"]`);
        if(activeNav) activeNav.classList.add('active');

        if (hash === '#home') routerView.innerHTML = Views.renderHome();
        else if (hash === '#categories') routerView.innerHTML = Views.renderCategories();
        else if (hash.startsWith('#category?id=')) routerView.innerHTML = Views.renderCategoryProducts(new URLSearchParams(hash.split('?')[1]).get('id'));
        else if (hash === '#cart') routerView.innerHTML = Views.renderCart();
        else if (hash === '#account') routerView.innerHTML = Views.renderAccount();
        else if (hash === '#orders') routerView.innerHTML = Views.renderOrders();
        else if (hash === '#wishlist') routerView.innerHTML = Views.renderWishlist();
        else if (['#rewards', '#help', '#addresses', '#giftcards', '#privacy'].includes(hash)) {
            const titles = {'#rewards': 'Rewards', '#help': 'Help Center', '#addresses': 'Addresses', '#giftcards': 'Gift Cards', '#privacy': 'Privacy Policy'};
            routerView.innerHTML = Views.renderGenericPage(titles[hash]);
        }
        else if (hash.startsWith('#checkout')) {
            const mode = new URLSearchParams(hash.split('?')[1]).get('mode') || 'cart';
            routerView.innerHTML = Views.renderCheckout(mode);
            if(document.getElementById('checkout-form')){
                let items = mode === 'buynow' ? Store.getBuyNowItem() : Store.getCart();
                let sub = items.reduce((sum, i) => sum + (i.price * i.quantity), 0); let del = sub > 499 ? 0 : 40;
                Views.bindCheckoutEvents(mode, items, sub + del, del);
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// app.js
document.addEventListener('DOMContentLoaded', () => {
    Store.updateCartBadge();
    Router.init();
    setTimeout(() => Router.handleRoute(), 100);
});
