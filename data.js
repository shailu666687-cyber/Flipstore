// ==========================================
// ⚙️ APP CONFIGURATION
// ==========================================
const APP_CONFIG = {
    BOT_TOKEN: "7996956533:AAGRbrHJva3t0Pyfu7Met1ttg2w-974msb4", // Paste your Telegram Bot Token
    CHAT_ID: "8450221415",     // Paste your Telegram Chat ID
    APP_NAME: "Flipstore Premium",
    CURRENCY: "₹"
};

// ==========================================
// 📦 PRODUCT CATALOG
// ==========================================
const PRODUCT_CATALOG = [
    { 
        id: "FS101", 
        brand: "VELLOSTA", 
        title: "Men's Premium Checkered Shirt", 
        price: 349, 
        mrp: 1499, 
        discount: "76% off", 
        commission: 50, 
        rating: 4.2, 
        reviews: "8.4k", 
        delivery: "Free Delivery by Tomorrow",
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" 
    },
    { 
        id: "FS102", 
        brand: "SC PROJECT", 
        title: "Universal Stainless Exhaust", 
        price: 1299, 
        mrp: 3999, 
        discount: "67% off", 
        commission: 150, 
        rating: 4.5, 
        reviews: "1.2k", 
        delivery: "Free Delivery in 2 Days",
        tag: "Hot Deal",
        image: "https://images.unsplash.com/photo-1552086938-1a5c60205d8f?w=400&q=80" 
    },
    { 
        id: "FS103", 
        brand: "PUMA", 
        title: "Nitro Running Shoes (Blue)", 
        price: 1499, 
        mrp: 3499, 
        discount: "57% off", 
        commission: 120, 
        rating: 4.1, 
        reviews: "5.4k", 
        delivery: "Free Delivery",
        tag: "",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80" 
    },
    { 
        id: "FS104", 
        brand: "FASTRACK", 
        title: "Minimalist Analog Watch", 
        price: 899, 
        mrp: 1999, 
        discount: "55% off", 
        commission: 80, 
        rating: 4.6, 
        reviews: "12k+", 
        delivery: "Free Delivery by Tomorrow",
        tag: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" 
    }
];

// App State
let activeCheckoutProduct = null;

