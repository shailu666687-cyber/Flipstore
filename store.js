const Store = {
    get: (key, fallback) => JSON.parse(localStorage.getItem(`shopsy_${key}`)) || fallback,
    set: (key, data) => localStorage.setItem(`shopsy_${key}`, JSON.stringify(data)),
    
    getCart: () => Store.get('cart', []),
    addToCart: (product) => {
        let cart = Store.getCart();
        if(!cart.find(item => item.id === product.id)) {
            cart.push(product);
            Store.set('cart', cart);
            return true;
        }
        return false;
    },
    removeFromCart: (id) => {
        let cart = Store.getCart().filter(i => i.id !== id);
        Store.set('cart', cart);
    },
    clearCart: () => Store.set('cart', []),
    getTotals: () => {
        const cart = Store.getCart();
        return cart.reduce((acc, item) => {
            acc.basePrice += item.price;
            acc.totalMargin += item.margin;
            acc.customerPays += (item.price + item.margin);
            return acc;
        }, { basePrice: 0, totalMargin: 0, customerPays: 0, count: cart.length });
    }
};

