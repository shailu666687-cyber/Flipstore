// router.js (100% Complete with Auth & Protection)

const Router = {
    init: () => {
        // Jab bhi URL ka hash change ho, router chalega
        window.addEventListener('hashchange', Router.handleRoute);
    },

    handleRoute: () => {
        const hash = window.location.hash || '#home';
        const routerView = document.getElementById('router-view');
        const user = Store.getUser(); // Logged-in user check karo
        
        // 1. Hide Top/Bottom Navbars on Login & Signup pages
        const isAuthPage = hash === '#login' || hash === '#signup';
        const topNav = document.querySelector('.top-nav');
        const bottomNav = document.querySelector('.bottom-nav');
        
        if (topNav) topNav.style.display = isAuthPage ? 'none' : 'flex';
        if (bottomNav) bottomNav.style.display = isAuthPage ? 'none' : 'flex';

        // 2. Route Protection: Agar user logged in nahi hai, toh in pages par mat jane do
        const protectedRoutes = ['#cart', '#account', '#orders', '#wishlist', '#checkout'];
        const isProtected = protectedRoutes.some(route => hash.startsWith(route));
        
        if (!user && isProtected) {
            window.location.hash = '#login';
            Utils.showToast("Please login first", "info");
            return; // Execution yahin rok do
        }

        // 3. Bottom Nav ka Active State Update karo
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[href="${hash.split('?')[0]}"]`);
        if(activeNav) activeNav.classList.add('active');

        // =========================================
        // 4. PAGE RENDER LOGIC
        // =========================================
        
        if (hash === '#login') {
            routerView.innerHTML = Views.renderLogin();
            Views.bindAuthEvents();
        } 
        else if (hash === '#signup') {
            routerView.innerHTML = Views.renderSignup();
            Views.bindAuthEvents();
        } 
        else if (hash === '#home') {
            routerView.innerHTML = Views.renderHome();
        } 
        else if (hash === '#categories') {
            routerView.innerHTML = Views.renderCategories();
        } 
        else if (hash.startsWith('#category?id=')) {
            const catId = new URLSearchParams(hash.split('?')[1]).get('id');
            routerView.innerHTML = Views.renderCategoryProducts(catId);
        } 
        else if (hash === '#cart') {
            routerView.innerHTML = Views.renderCart();
        } 
        else if (hash === '#account') {
            routerView.innerHTML = Views.renderAccount();
        } 
        else if (hash === '#orders') {
            routerView.innerHTML = Views.renderOrders();
        } 
        else if (hash === '#wishlist') {
            routerView.innerHTML = Views.renderWishlist();
        } 
        else if (['#rewards', '#help', '#addresses', '#giftcards', '#privacy'].includes(hash)) {
            const titles = {
                '#rewards': 'My Rewards', 
                '#help': 'Help Center', 
                '#addresses': 'Saved Addresses', 
                '#giftcards': 'Gift Cards', 
                '#privacy': 'Privacy Policy'
            };
            routerView.innerHTML = Views.renderGenericPage(titles[hash]);
        } 
        else if (hash.startsWith('#checkout')) {
            const mode = new URLSearchParams(hash.split('?')[1]).get('mode') || 'cart';
            routerView.innerHTML = Views.renderCheckout(mode);
            
            if (document.getElementById('checkout-form')) {
                let items = mode === 'buynow' ? Store.getBuyNowItem() : Store.getCart();
                let subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0); 
                let delivery = subtotal > 499 ? 0 : 40;
                
                Views.bindCheckoutEvents(mode, items, subtotal + delivery, delivery);

                // BONUS: Pre-fill user details dynamically from local storage
                if (user) {
                    const fnameInput = document.getElementById('fname');
                    const mobileInput = document.getElementById('mobile');
                    if (fnameInput) fnameInput.value = user.name || '';
                    if (mobileInput) mobileInput.value = user.phone || '';
                }
            }
        }

        // 5. Page load hone par screen ko smoothly top par scroll kardo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
