const Views = {
    renderHome: () => {
        let html = `<div class="home-page" style="padding: 10px;">
                        <img src="https://via.placeholder.com/600x200/2874f0/ffffff?text=Big+Billion+Sale" alt="Sale" style="width:100%; border-radius:8px; margin-bottom:15px;">
                        <h2 style="margin-bottom: 15px;">Trending Offers</h2>
                        <div class="product-grid">`;
        PRODUCTS.forEach(p => html += Components.renderProductCard(p));
        return html += `</div></div>`;
    },
    // views.js mein ye naye views add karein:

    // =========================================
    // AUTHENTICATION PAGES
    // =========================================
    renderLogin: () => {
        return `
        <div style="height: 100vh; background: var(--primary-color); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px;">
            <div style="background: white; width: 100%; max-width: 400px; padding: 30px 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <i class='bx bx-shopping-bag' style="font-size: 50px; color: var(--primary-color);"></i>
                    <h2 style="color: var(--text-dark); margin-top: 10px;">FlipStore</h2>
                    <p style="color: gray; font-size: 14px;">Login to your account</p>
                </div>
                <form id="login-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <input type="tel" id="login-phone" placeholder="Phone Number" required pattern="[0-9]{10}" class="form-input">
                    <input type="password" id="login-password" placeholder="Password" required class="form-input">
                    <button type="submit" class="btn-buy-now" style="width: 100%; padding: 12px; font-size: 16px; border-radius: 4px;">Login</button>
                </form>
                <p style="text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-dark);">
                    New here? <span onclick="window.location.hash='#signup'" style="color: var(--primary-color); font-weight: bold; cursor: pointer;">Create an account</span>
                </p>
            </div>
        </div>`;
    },

    renderSignup: () => {
        return `
        <div style="height: 100vh; background: var(--primary-color); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px;">
            <div style="background: white; width: 100%; max-width: 400px; padding: 30px 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: var(--text-dark);">Sign Up</h2>
                    <p style="color: gray; font-size: 14px;">Join FlipStore today</p>
                </div>
                <form id="signup-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <input type="text" id="signup-name" placeholder="Full Name" required class="form-input">
                    <input type="tel" id="signup-phone" placeholder="Phone Number" required pattern="[0-9]{10}" class="form-input">
                    <input type="password" id="signup-password" placeholder="Create Password" required class="form-input">
                    <button type="submit" class="btn-buy-now" style="width: 100%; padding: 12px; font-size: 16px; border-radius: 4px;">Sign Up</button>
                </form>
                <p style="text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-dark);">
                    Already have an account? <span onclick="window.location.hash='#login'" style="color: var(--primary-color); font-weight: bold; cursor: pointer;">Login here</span>
                </p>
            </div>
        </div>`;
    },

    bindAuthEvents: () => {
        if(document.getElementById('login-form')) {
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const phone = document.getElementById('login-phone').value;
                const pass = document.getElementById('login-password').value;
                if(Store.login(phone, pass)) {
                    Utils.showToast("Welcome back!", "success");
                    window.location.hash = '#home';
                } else {
                    Utils.showToast("Invalid Phone or Password", "error");
                }
            });
        }
        if(document.getElementById('signup-form')) {
            document.getElementById('signup-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signup-name').value;
                const phone = document.getElementById('signup-phone').value;
                const pass = document.getElementById('signup-password').value;
                if(Store.signup(name, phone, pass)) {
                    Utils.showToast("Account created successfully!", "success");
                    window.location.hash = '#home';
                } else {
                    Utils.showToast("Phone number already registered", "error");
                }
            });
        }
    },

    // Account render function ko update karein taaki user ka naam dikhe:
    renderAccount: () => {
        const user = Store.getUser() || { name: "Guest" };
        return `
        <div style="padding: 15px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <div><h2>Hey, ${user.name}!</h2><p style="color:gray; font-size:12px;">Explore your FlipStore features</p></div>
                <i class='bx bx-user-circle' style="font-size:50px; color:#2874f0;"></i>
            </div>
            <div style="background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <div class="menu-item" style="color:red;" onclick="Store.logout();"><i class='bx bx-log-out'></i> Logout</div>
            </div>
        </div>`;
    }


    renderCategories: () => {
        let html = `<div style="padding: 15px;"><h2 style="margin-bottom: 20px;">All Categories</h2><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">`;
        CATEGORIES.forEach(cat => {
            html += `<a href="#category?id=${cat.id}" style="text-decoration: none; color: #212121; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center; display: block;">
                        <img src="${cat.image}" alt="${cat.name}" style="width: 100%; height: 120px; object-fit: cover;">
                        <h3 style="padding: 10px; font-size: 14px;">${cat.name}</h3>
                    </a>`;
        });
        return html += `</div></div>`;
    },

    renderCategoryProducts: (categoryId) => {
        const category = CATEGORIES.find(c => c.id === categoryId);
        const catProducts = PRODUCTS.filter(p => p.categoryId === categoryId);
        let html = `<div style="padding: 15px;">
                        <div style="display:flex; align-items:center; margin-bottom: 15px;">
                            <a href="#categories" style="font-size: 24px; color: #212121; margin-right: 10px; text-decoration: none;"><i class='bx bx-arrow-back'></i></a>
                            <h2>${category ? category.name : 'Products'}</h2>
                        </div>
                        <div class="product-grid">`;
        if(catProducts.length === 0) html += `<p>No products found.</p>`;
        else catProducts.forEach(p => html += Components.renderProductCard(p));
        return html += `</div></div>`;
    },

    renderCart: () => {
        const cartItems = Store.getCart();
        if (cartItems.length === 0) return `<div class="empty-state"><img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty"><h3 style="margin-top:20px;">Your cart is empty!</h3><button onclick="window.location.hash='#home'" class="btn-primary" style="margin-top:15px; padding:10px 20px; background:#2874f0; color:#fff; border:none; border-radius:4px;">Shop Now</button></div>`;

        let html = `<div style="padding: 10px; padding-bottom: 80px;">`;
        let subtotal = 0;
        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            html += `<div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            ${item.size ? `<p style="font-size:12px; color:gray;">Size: ${item.size}</p>` : ''}
                            <div style="margin-top:5px;"><span style="font-weight:bold; font-size:16px;">${CONFIG.CURRENCY}${item.price}</span> <span style="text-decoration:line-through; color:gray; font-size:12px;">${CONFIG.CURRENCY}${item.originalPrice}</span></div>
                            <div class="qty-controls">
                                <button onclick="Views.updateQty(${index}, -1)">-</button><span>${item.quantity}</span><button onclick="Views.updateQty(${index}, 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" onclick="Views.removeItem(${index})"><i class='bx bx-trash'></i></button>
                    </div>`;
        });
        const deliveryCharge = subtotal > 499 ? 0 : 40;
        const totalAmount = subtotal + deliveryCharge;

        html += `<div style="background:#fff; padding:15px; border-radius:8px; margin-top:15px; box-shadow:0 1px 4px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">Price Details</h3>
                    <p style="display:flex; justify-content:space-between; margin-bottom:8px;">Price (${cartItems.length} items) <span>${CONFIG.CURRENCY}${subtotal}</span></p>
                    <p style="display:flex; justify-content:space-between; margin-bottom:8px;">Delivery <span>${deliveryCharge === 0 ? '<span style="color:#388e3c;">FREE</span>' : CONFIG.CURRENCY + deliveryCharge}</span></p>
                    <h3 style="display:flex; justify-content:space-between; border-top:1px dashed #ccc; padding-top:10px; margin-top:10px;">Total Amount <span>${CONFIG.CURRENCY}${totalAmount}</span></h3>
                </div>
                <div class="bottom-checkout-bar">
                    <div style="font-size: 18px; font-weight: bold;">${CONFIG.CURRENCY}${totalAmount}</div>
                    <button onclick="window.location.hash='#checkout?mode=cart'" class="btn-buy-now" style="width: auto; padding: 10px 30px;">Place Order</button>
                </div></div>`;
        return html;
    },

    updateQty: (index, change) => { let cart = Store.getCart(); cart[index].quantity += change; if(cart[index].quantity <= 0) cart.splice(index, 1); Store.saveCart(cart); Router.handleRoute(); },
    removeItem: (index) => { let cart = Store.getCart(); cart.splice(index, 1); Store.saveCart(cart); Router.handleRoute(); },

    renderAccount: () => {
        return `<div style="padding: 15px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <div><h2>Hey, User!</h2><p style="color:gray; font-size:12px;">Explore your FlipStore features</p></div>
                <i class='bx bx-user-circle' style="font-size:50px; color:#2874f0;"></i>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
                <a href="#orders" class="account-card"><i class='bx bx-package' style="color:#2874f0;"></i> Orders</a>
                <a href="#wishlist" class="account-card"><i class='bx bx-heart' style="color:#ff4343;"></i> Wishlist</a>
                <a href="#rewards" class="account-card"><i class='bx bx-gift' style="color:#ff9f00;"></i> Rewards</a>
                <a href="#help" class="account-card"><i class='bx bx-headphone' style="color:#388e3c;"></i> Help Center</a>
            </div>
            <div style="background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <a href="#addresses" class="menu-item"><i class='bx bx-map'></i> Saved Addresses <i class='bx bx-chevron-right' style="margin-left:auto;"></i></a>
                <a href="#giftcards" class="menu-item"><i class='bx bx-wallet'></i> Gift Cards <i class='bx bx-chevron-right' style="margin-left:auto;"></i></a>
                <a href="#privacy" class="menu-item"><i class='bx bx-check-shield'></i> Privacy Policy <i class='bx bx-chevron-right' style="margin-left:auto;"></i></a>
                <div class="menu-item" style="color:red;" onclick="Utils.showToast('Logged out successfully'); window.location.hash='#home';"><i class='bx bx-log-out'></i> Logout</div>
            </div>
        </div>`;
    },

    renderOrders: () => {
        const orders = Store.getOrders();
        let html = `<div style="padding: 15px;"><div style="display:flex; align-items:center; margin-bottom: 15px;"><a href="#account" style="font-size:24px; color:#212121; margin-right:10px; text-decoration:none;"><i class='bx bx-arrow-back'></i></a><h2>My Orders</h2></div>`;
        if (orders.length === 0) html += `<div class="empty-state"><i class='bx bx-package' style="font-size:60px; color:#ccc;"></i><p>No orders yet.</p></div>`;
        else orders.forEach(o => {
            html += `<div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;"><strong>#${o.orderId}</strong><span style="color:#388e3c; font-weight:bold;">${o.status}</span></div>
                        <p style="font-size:12px; color:gray; margin-bottom:10px;">Date: ${new Date(o.date).toLocaleDateString()}</p>
                        <div style="margin-bottom:10px; font-size:14px;">${o.items.map(i => `• ${i.name} x${i.quantity}`).join('<br>')}</div>
                        <div style="display:flex; justify-content:space-between; font-weight:bold; border-top:1px dashed #eee; padding-top:10px;"><span>Total:</span><span>${CONFIG.CURRENCY}${o.totalAmount}</span></div>
                    </div>`;
        });
        return html += `</div>`;
    },

    renderWishlist: () => {
        const wl = Store.getWishlist(); const prods = PRODUCTS.filter(p => wl.includes(p.id));
        let html = `<div style="padding: 15px;"><div style="display:flex; align-items:center; margin-bottom: 15px;"><a href="#account" style="font-size:24px; color:#212121; margin-right:10px; text-decoration:none;"><i class='bx bx-arrow-back'></i></a><h2>My Wishlist</h2></div><div class="product-grid">`;
        if (prods.length === 0) html += `<div class="empty-state" style="grid-column: span 2;"><i class='bx bx-heart' style="font-size:60px; color:#ccc;"></i><p>Wishlist is empty.</p></div>`;
        else prods.forEach(p => html += Components.renderProductCard(p));
        return html += `</div></div>`;
    },

    renderGenericPage: (title) => {
        return `<div style="padding:15px; text-align:center;"><div style="display:flex; align-items:center; margin-bottom:30px;"><a href="#account" style="font-size:24px; color:#212121; margin-right:10px; text-decoration:none;"><i class='bx bx-arrow-back'></i></a><h2>${title}</h2></div><i class='bx bx-time-five' style="font-size:60px; color:#2874f0; margin-bottom:15px;"></i><h3>Coming Soon</h3><p style="color:gray;">This feature is under development.</p></div>`;
    },

    renderCheckout: (mode) => {
        let items = mode === 'buynow' ? Store.getBuyNowItem() : Store.getCart();
        if (!items || items.length === 0) { window.location.hash = '#home'; return ''; }
        const sub = items.reduce((sum, i) => sum + (i.price * i.quantity), 0); const del = sub > 499 ? 0 : 40; const tot = sub + del;
        return `<div style="padding:15px;">
            <div style="display:flex; align-items:center; margin-bottom: 15px;"><a href="javascript:history.back()" style="font-size:24px; color:#212121; margin-right:10px; text-decoration:none;"><i class='bx bx-arrow-back'></i></a><h2>Checkout</h2></div>
            <form id="checkout-form" style="display:flex; flex-direction:column; gap:10px;">
                <input type="text" id="fname" placeholder="Full Name" required class="form-input">
                <input type="tel" id="mobile" placeholder="Mobile Number" required pattern="[0-9]{10}" class="form-input">
                <input type="text" id="pincode" placeholder="Pincode" required class="form-input">
                <textarea id="address" placeholder="Full Address" required class="form-input" style="height:80px; resize:none;"></textarea>
                <div style="display:flex; gap:10px;"><input type="text" id="city" placeholder="City" required class="form-input" style="flex:1;"><input type="text" id="state" placeholder="State" required class="form-input" style="flex:1;"></div>
                <div style="border:2px solid #2874f0; padding:15px; border-radius:4px; background:#f1f5ff; margin-top:10px;"><i class='bx bx-money'></i> Cash on Delivery (COD)<br><small style="color:gray;">Pay on delivery</small></div>
                <div style="background:#fff; padding:15px; border-radius:4px; margin-top:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1);"><p style="display:flex; justify-content:space-between;">Subtotal <span>${CONFIG.CURRENCY}${sub}</span></p><p style="display:flex; justify-content:space-between;">Delivery <span>${del === 0 ? '<span style="color:#388e3c;">FREE</span>' : CONFIG.CURRENCY + del}</span></p><h3 style="display:flex; justify-content:space-between; border-top:1px dashed #ccc; padding-top:10px; margin-top:10px;">Total <span>${CONFIG.CURRENCY}${tot}</span></h3></div>
                <button type="submit" class="btn-buy-now" style="width:100%; padding:15px; font-size:16px; margin-top:10px;">Confirm Order</button>
            </form></div>`;
    },

    bindCheckoutEvents: (mode, items, totalAmount, deliveryCharge) => {
        document.getElementById('checkout-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button'); btn.innerText = "Processing..."; btn.disabled = true;
            const orderDetails = {
                orderId: Utils.generateOrderID(), name: document.getElementById('fname').value, phone: document.getElementById('mobile').value,
                pincode: document.getElementById('pincode').value, address: document.getElementById('address').value, city: document.getElementById('city').value,
                state: document.getElementById('state').value, items: items, totalAmount: totalAmount, deliveryCharge: deliveryCharge, status: "Placed", date: new Date().toISOString()
            };
            const isSuccess = await TelegramAPI.sendOrder(orderDetails);
            if (isSuccess) {
                Store.saveOrder(orderDetails);
                if (mode === 'buynow') Store.clearBuyNowItem(); else Store.saveCart([]);
                Utils.showToast("Order Placed Successfully!", "success"); window.location.hash = '#orders';
            } else { Utils.showToast("Failed to place order.", "error"); btn.innerText = "Confirm Order"; btn.disabled = false; }
        });
    }
};
