const Store = {
    getCart: () => JSON.parse(localStorage.getItem('flipstore_cart')) || [],
    saveCart: (cart) => {
        localStorage.setItem('flipstore_cart', JSON.stringify(cart));
        Store.updateCartBadge();
    },
    addToCart: (product, size = null) => {
        let cart = Store.getCart();
        let existingItem = cart.find(item => item.id === product.id && item.size === size);
        if (existingItem) existingItem.quantity += 1;
        else cart.push({ ...product, size, quantity: 1 });
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
    // store.js mein in naye functions ko add karein

    // --- AUTHENTICATION SYSTEM ---
    getUser: () => JSON.parse(localStorage.getItem('flipstore_user')),
    
    login: (phone, password) => {
        const users = JSON.parse(localStorage.getItem('flipstore_users')) || [];
        const user = users.find(u => u.phone === phone && u.password === password);
        if (user) {
            localStorage.setItem('flipstore_user', JSON.stringify(user));
            return true;
        }
        return false;
    },

    signup: (name, phone, password) => {
        const users = JSON.parse(localStorage.getItem('flipstore_users')) || [];
        if (users.find(u => u.phone === phone)) return false; // Number already exists
        
        const newUser = { name, phone, password };
        users.push(newUser);
        localStorage.setItem('flipstore_users', JSON.stringify(users));
        localStorage.setItem('flipstore_user', JSON.stringify(newUser)); // Auto login after signup
        return true;
    },

    logout: () => {
        localStorage.removeItem('flipstore_user');
        window.location.hash = '#login';
        Utils.showToast("Logged out successfully");
    }

    setBuyNowItem: (product, size = null) => {
        localStorage.setItem('flipstore_buynow', JSON.stringify([{ ...product, size, quantity: 1 }]));
    },
    getBuyNowItem: () => JSON.parse(localStorage.getItem('flipstore_buynow')),
    clearBuyNowItem: () => localStorage.removeItem('flipstore_buynow'),
    
    getOrders: () => JSON.parse(localStorage.getItem('flipstore_orders')) || [],
    saveOrder: (orderData) => {
        let orders = Store.getOrders();
        orders.unshift(orderData);
        localStorage.setItem('flipstore_orders', JSON.stringify(orders));
    },

    getWishlist: () => JSON.parse(localStorage.getItem('flipstore_wishlist')) || [],
    toggleWishlist: (productId) => {
        let wishlist = Store.getWishlist();
        const index = wishlist.indexOf(productId);
        if (index > -1) {
            wishlist.splice(index, 1);
            Utils.showToast("Removed from Wishlist");
        } else {
            wishlist.push(productId);
            Utils.showToast("Added to Wishlist", "success");
        }
        localStorage.setItem('flipstore_wishlist', JSON.stringify(wishlist));
        Router.handleRoute(); // Refresh UI to update heart icon
    }
};
