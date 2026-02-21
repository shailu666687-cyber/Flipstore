const Router = {
    init: () => {
        // Jab bhi URL me hash change ho, page update karo
        window.addEventListener('hashchange', Router.handleRoute);
    },

    handleRoute: () => {
        const hash = window.location.hash || '#home';
        const routerView = document.getElementById('router-view');
        
        // 1. Bottom Nav ka Active State Update karo
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[href="${hash.split('?')[0]}"]`);
        if(activeNav) activeNav.classList.add('active');

        // 2. Page Render Logic
        if (hash === '#home') {
            routerView.innerHTML = Views.renderHome();
        } 
        else if (hash === '#cart') {
            routerView.innerHTML = Views.renderCart();
        } 
        else if (hash === '#account') {
            routerView.innerHTML = Views.renderAccount();
        } 
        else if (hash === '#categories') {
            routerView.innerHTML = `<div style="text-align:center; padding: 50px;"><i class='bx bx-grid-alt' style="font-size: 50px; color: var(--primary-color);"></i><h2>Categories</h2><p>Coming soon...</p></div>`;
        } 
        else if (hash.startsWith('#checkout')) {
            // Checkout URL check karo: mode=buynow hai ya mode=cart
            const urlParams = new URLSearchParams(hash.split('?')[1]);
            const mode = urlParams.get('mode') || 'cart';
            
            routerView.innerHTML = Views.renderCheckout(mode);
            
            // Render hone ke baad Form submit events active karo
            if(document.getElementById('checkout-form')){
                // Calculate again for binding
                let items = mode === 'buynow' ? Store.getBuyNowItem() : Store.getCart();
                let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                let delivery = subtotal > 499 ? 0 : 40;
                Views.bindCheckoutEvents(mode, items, subtotal + delivery, delivery);
            }
        }

        // Page load hone par screen ko top par scroll kardo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
