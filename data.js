const CATEGORIES = [
    { id: "cat_fashion", name: "Fashion", image: "https://via.placeholder.com/300x300/ff9f00/fff?text=Fashion" },
    { id: "cat_electronics", name: "Electronics", image: "https://via.placeholder.com/300x300/2874f0/fff?text=Electronics" },
    { id: "cat_shoes", name: "Footwear", image: "https://via.placeholder.com/300x300/388e3c/fff?text=Shoes" },
    { id: "cat_watches", name: "Watches", image: "https://via.placeholder.com/300x300/e91e63/fff?text=Watches" }
];

const PRODUCTS = [
    { id: "p1", categoryId: "cat_fashion", name: "Men's Solid Black T-Shirt", image: "https://via.placeholder.com/300x400/212121/ffffff?text=Black+T-Shirt", price: 499, originalPrice: 999, discount: 50, rating: 4.3, requireSize: true, sizes: ["S", "M", "L", "XL", "XXL"], stock: { S: 5, M: 0, L: 12, XL: 2, XXL: 8 } },
    { id: "p2", categoryId: "cat_electronics", name: "Wireless Bluetooth Earbuds PRO", image: "https://via.placeholder.com/300x400/2874f0/ffffff?text=Earbuds", price: 1299, originalPrice: 2999, discount: 56, rating: 4.5, requireSize: false },
    { id: "p3", categoryId: "cat_fashion", name: "Women's Denim Jacket", image: "https://via.placeholder.com/300x400/3f51b5/ffffff?text=Denim+Jacket", price: 1499, originalPrice: 2499, discount: 40, rating: 4.7, requireSize: true, sizes: ["S", "M", "L"], stock: { S: 2, M: 5, L: 0 } },
    { id: "p4", categoryId: "cat_shoes", name: "Running Sneakers Mens", image: "https://via.placeholder.com/300x400/ff5722/ffffff?text=Sneakers", price: 1899, originalPrice: 3999, discount: 52, rating: 4.2, requireSize: true, sizes: ["7", "8", "9", "10"], stock: { "7": 4, "8": 10, "9": 3, "10": 0 } },
    { id: "p5", categoryId: "cat_watches", name: "Premium Analog Watch", image: "https://via.placeholder.com/300x400/607d8b/ffffff?text=Watch", price: 899, originalPrice: 1999, discount: 55, rating: 4.1, requireSize: false },
    { id: "p6", categoryId: "cat_electronics", name: "Fast Charging Power Bank 20000mAh", image: "https://via.placeholder.com/300x400/009688/ffffff?text=Power+Bank", price: 999, originalPrice: 1599, discount: 37, rating: 4.6, requireSize: false }
];
