// views.js (100% Complete Version)
const Views = {
    // =========================================
    // 1. HOME PAGE VIEW
    // =========================================
    renderHome: () => {
        let html = `<div class="home-page">
                        <div class="banner-slider">
                            <img src="https://via.placeholder.com/600x200/2874f0/ffffff?text=Big+Billion+Sale" alt="Sale Banner" style="width:100%; border-radius:8px; margin-bottom:15px;">
                        </div>
                        <h2 class="section-title">Trending Offers</h2>
                        <div class="product-grid">`;
        
        PRODUCTS.forEach(product => {
            html += Components.renderProductCard(product); // components.js se product card aayega
        });
        
        html += `</div></div>`;
        return html;
    },

    // =========================================
    // 2. CART PAGE VIEW
    // =========================================
    renderCart: () => {
        const cartItems = Store.getCart();
        
        if (cartItems.length === 0) {
            return `
            <div class="empty-cart">
                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" style="width: 150px; margin-bottom: 20px;">
                <h3>Your cart is empty!</h3>
                <p>Add items to it now.</p>
                <button onclick="window.location.hash='#home'" class="btn-primary" style="margin-top: 15px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 4px;">Shop Now</button>
            </div>`;
        }

        let html = `<div class="cart-page">`;
        let subtotal = 0;

        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    ${item.size ? `<p class="item-size">Size: ${item.size}</p>` : ''}
                    <div class="price-wrap">
                        <span class="current-price">${CONFIG.CURRENCY}${item.price}</span>
                        <span class="original-price">${CONFIG.CURRENCY}${item.originalPrice}</span>
                    </div>
                    <div class="qty-controls">
                        <button onclick="Views.updateQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Views.updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="Views.removeItem(${index})"><i class='bx bx-trash'></i></button>
            </div>`;
        });

        const deliveryCharge = subtotal > 499 ? 0 : 40;
        const totalAmount = subtotal + deliveryCharge;

        html += `
            <div class="price-details-card">
                <h3>Price Details</h3>
                <div class="price-row"><span>Price (${cartItems.length} items)</span> <span>${CONFIG.CURRENCY}${subtotal}</span></div>
                <div class="price-row"><span>Delivery Charges</span> <span>${deliveryCharge === 0 ? '<span class="free" style="color: var(--success);">FREE</span>' : CONFIG.CURRENCY + deliveryCharge}</span></div>
                <div class="price-row total-row" style="font-weight: bold; border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px;"><span>Total Amount</span> <span>${CONFIG.CURRENCY}${totalAmount}</span></div>
            </div>
            <div class="bottom-checkout-bar" style="position: fixed; bottom: 60px; left: 0; width: 100%; background: white; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);">
                <div class="total-price" style="font-size: 18px; font-weight: bold;">${CONFIG.CURRENCY}${totalAmount}</div>
                <button onclick="window.location.hash='#checkout?mode=cart'" class="btn-place-order" style="background: var(--accent); color: white; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold;">Place Order</button>
            </div>
        </div>`;
        
        return html;
    },

    updateQty: (index, change) => {
        let cart = Store.getCart();
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        Store.saveCart(cart);
        Router.handleRoute(); // Refresh UI
    },

    removeItem: (index) => {
        let cart = Store.getCart();
        cart.splice(index, 1);
        Store.saveCart(cart);
        Router.handleRoute(); // Refresh UI
    },

    // =========================================
    // 3. ACCOUNT DASHBOARD VIEW
    // =========================================
    renderAccount: () => {
        return `
        <div class="account-page" style="padding: 15px;">
            <div class="profile-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div class="profile-info">
                    <h2>Hey, User!</h2>
                    <p style="color: var(--text-light); font-size: 12px;">Explore your FlipStore Plus features</p>
                </div>
                <div class="profile-avatar"><i class='bx bx-user-circle' style="font-size: 50px; color: var(--primary-color);"></i></div>
            </div>
            
            <div class="account-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <a href="#orders" class="account-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-decoration: none; color: var(--text-dark); display: flex; align-items: center; gap: 10px;"><i class='bx bx-package text-blue'></i> Orders</a>
                <a href="#wishlist" class="account-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-decoration: none; color: var(--text-dark); display: flex; align-items: center; gap: 10px;"><i class='bx bx-heart text-red'></i> Wishlist</a>
                <a href="#rewards" class="account-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-decoration: none; color: var(--text-dark); display: flex; align-items: center; gap: 10px;"><i class='bx bx-gift text-orange'></i> Rewards</a>
                <a href="#help" class="account-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-decoration: none; color: var(--text-dark); display: flex; align-items: center; gap: 10px;"><i class='bx bx-headphone text-green'></i> Help Center</a>
            </div>

            <div class="account-menu" style="background: white; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">
                <div class="menu-item" style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;"><span><i class='bx bx-map'></i> Saved Addresses</span> <i class='bx bx-chevron-right'></i></div>
                <div class="menu-item" style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;"><span><i class='bx bx-wallet'></i> Gift Cards</span> <i class='bx bx-chevron-right'></i></div>
                <div class="menu-item" style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;"><span><i class='bx bx-check-shield'></i> Privacy Policy</span> <i class='bx bx-chevron-right'></i></div>
                <div class="menu-item logout-btn" style="padding: 15px; display: flex; justify-content: space-between; color: red;"><span><i class='bx bx-log-out'></i> Logout</span></div>
            </div>
        </div>
        `;
    },

    // =========================================
    // 4. CHECKOUT PAGE VIEW
    // =========================================
    renderCheckout: (mode) => {
        let itemsToCheckout = [];
        if (mode === 'buynow') {
            itemsToCheckout = Store.getBuyNowItem();
            if (!itemsToCheckout || itemsToCheckout.length === 0) {
                window.location.hash = '#home';
                return '';
            }
        } else {
            itemsToCheckout = Store.getCart();
            if (itemsToCheckout.length === 0) {
                Utils.showToast("Your cart is empty");
                window.location.hash = '#cart';
                return '';
            }
        }

        const subtotal = itemsToCheckout.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryCharge = subtotal > 499 ? 0 : 40;
        const totalAmount = subtotal + deliveryCharge;

        return `
        <div class="checkout-page" style="padding: 15px;">
            <h2 style="margin-bottom: 15px; font-size: 18px;">Delivery Address</h2>
            <form id="checkout-form" style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="fname" placeholder="Full Name" required style="padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
                <input type="tel" id="mobile" placeholder="Mobile Number" required pattern="[0-9]{10}" style="padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
                <input type="text" id="pincode" placeholder="Pincode" required style="padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
                <textarea id="address" placeholder="Full Address (House No, Building, Street)" required style="padding: 12px; border: 1px solid #ddd; border-radius: 4px; resize: none; height: 80px;"></textarea>
                <div class="flex-inputs" style="display: flex; gap: 10px;">
                    <input type="text" id="city" placeholder="City" required style="padding: 12px; border: 1px solid #ddd; border-radius: 4px; flex: 1;">
                    <input type="text" id="state" placeholder="State" required style="padding: 12px; border: 1px solid #ddd; border-radius: 4px; flex: 1;">
                </div>
                <input type="text" id="landmark" placeholder="Landmark (Optional)" style="padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
                
                <div class="payment-section" style="margin-top: 15px;">
                    <h3 style="margin-bottom: 10px; font-size: 16px;">Payment Method</h3>
                    <div class="cod-box selected" style="border: 2px solid var(--primary-color); padding: 15px; border-radius: 4px; background: #f1f5ff;">
                        <i class='bx bx-money'></i> Cash on Delivery (COD)
                        <p class="small-text" style="font-size: 12px; color: var(--text-light); margin-top: 5px;">Pay when you receive the order</p>
                    </div>
                </div>

                <div class="price-details" style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin-top: 15px;">
                    <p style="display: flex; justify-content: space-between; margin-bottom: 8px;">Subtotal: <span>${CONFIG.CURRENCY}${subtotal}</span></p>
                    <p style="display: flex; justify-content: space-between; margin-bottom: 8px;">Delivery: <span>${deliveryCharge === 0 ? '<span class="free" style="color: var(--success);">FREE</span>' : CONFIG.CURRENCY + deliveryCharge}</span></p>
                    <h3 style="display: flex; justify-content: space-between; border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px;">Total to Pay: <span>${CONFIG.CURRENCY}${totalAmount}</span></h3>
                </div>

                <button type="submit" class="place-order-btn" style="background: var(--accent); color: white; padding: 15px; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; margin-top: 15px;">Place Order</button>
            </form>
        </div>
        `;
    },

    bindCheckoutEvents: (mode, itemsToCheckout, totalAmount, deliveryCharge) => {
        document.getElementById('checkout-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = e.target.querySelector('.place-order-btn');
            btn.innerText = "Processing...";
            btn.disabled = true;

            const orderDetails = {
                orderId: Utils.generateOrderID(),
                name: document.getElementById('fname').value,
                phone: document.getElementById('mobile').value,
                pincode: document.getElementById('pincode').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                landmark: document.getElementById('landmark').value,
                items: itemsToCheckout,
                totalAmount: totalAmount,
                deliveryCharge: deliveryCharge,
                status: "Placed",
                date: new Date().toISOString()
            };

            // Send to Telegram (function from api.js)
            const isSuccess = await TelegramAPI.sendOrder(orderDetails);

            if (isSuccess) {
                Store.saveOrder(orderDetails);
                
                // Clear data based on mode
                if (mode === 'buynow') {
                    Store.clearBuyNowItem();
                } else {
                    Store.saveCart([]); // Clear Cart
                }

                Utils.showToast("Order Placed Successfully!", "success");
                window.location.hash = '#account'; // Redirect to account/orders
            } else {
                Utils.showToast("Failed to place order. Try again.", "error");
                btn.innerText = "Place Order";
                btn.disabled = false;
            }
        });
    }
};
