const Store = {
    // --- CART SYSTEM ---
    getCart: () => JSON.parse(localStorage.getItem('flipstore_cart')) || [],
    
    saveCart: (cart) => {
        localStorage.setItem('flipstore_cart', JSON.stringify(cart));
        Store.updateCartBadge();
    },

    addToCart: (product, size = null) => {
        let cart = Store.getCart();
        // Check if same product with same size already exists
        let existingItem = cart.find(item => item.id === product.id && item.size === size);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, size, quantity: 1 });
        }
        
        Store.saveCart(cart);
        Utils.showToast("Item added to cart", "success");
    },

    updateCartBadge: () => {
        const cart = Store.getCart();
        const badge = document.getElementById('cart-badge');
        if(badge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.innerText = totalItems;
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        }
    },

    // --- BUY NOW SYSTEM (Temporary Storage) ---
    setBuyNowItem: (product, size = null) => {
        const buyNowData = { ...product, size, quantity: 1 };
        localStorage.setItem('flipstore_buynow', JSON.stringify([buyNowData])); // Saved as array to match checkout loop
    },

    getBuyNowItem: () => JSON.parse(localStorage.getItem('flipstore_buynow')),

    clearBuyNowItem: () => localStorage.removeItem('flipstore_buynow'),

    // --- ORDER TRACKING ---
    saveOrder: (orderData) => {
        let orders = JSON.parse(localStorage.getItem('flipstore_orders')) || [];
        orders.unshift(orderData); // Add new order at the top
        localStorage.setItem('flipstore_orders', JSON.stringify(orders));
    }
};
