const PRODUCTS = [
    {
        id: "p1",
        name: "Men's Solid Black T-Shirt",
        image: "https://via.placeholder.com/300x400/2874f0/ffffff?text=T-Shirt",
        price: 499,
        originalPrice: 999,
        discount: 50,
        rating: 4.3,
        reviews: 1240,
        requireSize: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: { S: 5, M: 0, L: 12, XL: 2, XXL: 8 } // M is Out of Stock
    },
    {
        id: "p2",
        name: "Wireless Bluetooth Earbuds PRO",
        image: "https://via.placeholder.com/300x400/ff9f00/ffffff?text=Earbuds",
        price: 1299,
        originalPrice: 2999,
        discount: 56,
        rating: 4.5,
        reviews: 342,
        requireSize: false
    }
];
