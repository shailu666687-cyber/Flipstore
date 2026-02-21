const Views = {
    renderCheckout: (mode) => {
        // Determine items based on mode (Cart vs Buy Now)
        let itemsToCheckout = [];
        if (mode === 'buynow') {
            itemsToCheckout = Store.getBuyNowItem();
            if (!itemsToCheckout) {
                window.location.hash = '#home'; // Redirect if empty
                return;
            }
        } else {
            itemsToCheckout = Store.getCart();
            if (itemsToCheckout.length === 0) {
                Utils.showToast("Your cart is empty");
                window.location.hash = '#cart';
                return;
            }
        }

        const subtotal = itemsToCheckout.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryCharge = subtotal > 499 ? 0 : 40; // Free delivery above 499
        const totalAmount = subtotal + deliveryCharge;

        return `
        <div class="checkout-page">
            <h2>Delivery Address</h2>
            <form id="checkout-form">
                <input type="text" id="fname" placeholder="Full Name" required>
                <input type="tel" id="mobile" placeholder="Mobile Number" required pattern="[0-9]{10}">
                <input type="text" id="pincode" placeholder="Pincode" required>
                <textarea id="address" placeholder="Full Address (House No, Building, Street)" required></textarea>
                <div class="flex-inputs">
                    <input type="text" id="city" placeholder="City" required>
                    <input type="text" id="state" placeholder="State" required>
                </div>
                <input type="text" id="landmark" placeholder="Landmark (Optional)">
                
                <div class="payment-section">
                    <h3>Payment Method</h3>
                    <div class="cod-box selected">
                        <i class='bx bx-money'></i> Cash on Delivery (COD)
                        <p class="small-text">Pay when you receive the order</p>
                    </div>
                </div>

                <div class="price-details">
                    <p>Subtotal: ${CONFIG.CURRENCY}${subtotal}</p>
                    <p>Delivery: ${deliveryCharge === 0 ? '<span class="free">FREE</span>' : CONFIG.CURRENCY + deliveryCharge}</p>
                    <h3>Total to Pay: ${CONFIG.CURRENCY}${totalAmount}</h3>
                </div>

                <button type="submit" class="place-order-btn">Place Order</button>
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
                window.location.hash = '#account'; // Redirect to track order
            } else {
                Utils.showToast("Failed to place order. Try again.", "error");
                btn.innerText = "Place Order";
                btn.disabled = false;
            }
        });
    }
};
