// ==========================================
// 🚀 PREMIUM ENGINE (Modular Logic)
// ==========================================

const App = {
    init: () => {
        App.renderProducts();
    },

    // 1. UI RENDERERS
    renderProducts: () => {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = PRODUCT_CATALOG.map(p => `
            <div class="product-card bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col relative">
                ${p.tag ? `<div class="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-lg z-10 shadow-sm">${p.tag}</div>` : ''}
                
                <div class="h-36 w-full bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-3 p-2 relative overflow-hidden group">
                    <img src="${p.image}" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">
                    <div class="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                        ${p.rating} <i class="fas fa-star text-yellow-400 text-[10px]"></i>
                    </div>
                </div>
                
                <h3 class="text-xs text-gray-800 line-clamp-2 min-h-[32px] font-semibold leading-tight">${p.brand} ${p.title}</h3>
                
                <div class="flex items-center gap-1.5 mt-2">
                    <span class="font-extrabold text-sm text-gray-900">${APP_CONFIG.CURRENCY}${p.price}</span>
                    <span class="text-[10px] text-gray-400 line-through">${APP_CONFIG.CURRENCY}${p.mrp}</span>
                    <span class="text-[10px] text-green-600 font-bold tracking-tight">${p.discount}</span>
                </div>
                
                <div class="bg-green-50 border border-green-100 rounded-lg p-1.5 mt-2 flex justify-between items-center">
                    <span class="text-[9px] font-bold text-green-700 uppercase tracking-wider">Your Margin</span>
                    <span class="text-xs font-black text-green-700">${APP_CONFIG.CURRENCY}${p.commission}</span>
                </div>
                
                <div class="flex gap-2 mt-3">
                    <button onclick="App.openCheckout('${p.id}')" class="flex-1 bg-gray-900 active:bg-black text-white py-2.5 rounded-xl text-xs font-bold shadow-md transition-all">Buy Now</button>
                    <button onclick="App.shareWhatsApp('${p.id}')" class="bg-[#25D366] text-white px-3 py-2.5 rounded-xl text-sm shadow-md active:scale-95 transition-transform"><i class="fab fa-whatsapp"></i></button>
                </div>
            </div>
        `).join('');
    },

    // 2. WHATSAPP SHARING
    shareWhatsApp: (id) => {
        const p = PRODUCT_CATALOG.find(x => x.id === id);
        const text = `✨ *PREMIUM DEAL UNLOCKED* ✨\n\n*${p.brand} ${p.title}*\n\n💰 *Special Price: ${APP_CONFIG.CURRENCY}${p.price}*\n❌ ~Original MRP: ${APP_CONFIG.CURRENCY}${p.mrp}~\n\n🚚 ${p.delivery}\n✅ Cash on Delivery Available\n\n👇 *Reply YES to order now!*`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    },

    // 3. BOTTOM SHEET CHECKOUT LOGIC
    openCheckout: (id) => {
        const p = PRODUCT_CATALOG.find(x => x.id === id);
        activeCheckoutProduct = p;

        // Populate Product Details in Checkout
        document.getElementById('chkProductDetails').innerHTML = `
            <img src="${p.image}" class="w-20 h-20 object-contain bg-gray-50 rounded-xl p-1 border border-gray-100">
            <div class="flex-1">
                <h3 class="text-sm text-gray-900 font-bold line-clamp-2 leading-tight mb-1">${p.brand} ${p.title}</h3>
                <p class="text-xs text-gray-500 mb-2"><i class="fas fa-truck text-blue-500 mr-1"></i> ${p.delivery}</p>
                <div class="font-extrabold text-lg text-gray-900">${APP_CONFIG.CURRENCY}${p.price}</div>
            </div>
        `;

        // Populate Price Breakdown
        document.getElementById('chkPrice').textContent = `${APP_CONFIG.CURRENCY}${p.price}`;
        document.getElementById('chkMargin').textContent = `+ ${APP_CONFIG.CURRENCY}${p.commission}`;
        document.getElementById('chkTotal').textContent = `${APP_CONFIG.CURRENCY}${p.price}`;
        document.getElementById('chkBottomTotal').textContent = `${APP_CONFIG.CURRENCY}${p.price}`;

        // Try to auto-fill address if saved previously
        const savedAd = localStorage.getItem('fs_saved_address');
        if(savedAd) {
            const ad = JSON.parse(savedAd);
            document.getElementById('custName').value = ad.name;
            document.getElementById('custPhone').value = ad.phone;
            document.getElementById('custPin').value = ad.pin;
            document.getElementById('custCity').value = ad.city;
            document.getElementById('custAddress').value = ad.full;
        }

        // Open Animations
        document.getElementById('overlayBackdrop').classList.remove('hidden');
        setTimeout(() => document.getElementById('checkoutSheet').classList.add('sheet-open'), 10);
    },

    closeCheckout: () => {
        document.getElementById('checkoutSheet').classList.remove('sheet-open');
        setTimeout(() => document.getElementById('overlayBackdrop').classList.add('hidden'), 300);
    },

    closeAllModals: () => {
        App.closeCheckout();
    },

    // 4. ORDER PLACEMENT & TELEGRAM API
    placeOrder: async () => {
        // Form Validation
        const form = document.getElementById('addressForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const btn = document.getElementById('btnPlaceOrder');
        btn.innerHTML = `<i class="fas fa-circle-notch fa-spin text-lg"></i> Processing...`;
        btn.disabled = true;

        const p = activeCheckoutProduct;
        
        // Save address for future use
        const customerData = {
            name: document.getElementById('custName').value.trim(),
            phone: document.getElementById('custPhone').value.trim(),
            pin: document.getElementById('custPin').value.trim(),
            city: document.getElementById('custCity').value.trim(),
            full: document.getElementById('custAddress').value.trim()
        };
        localStorage.setItem('fs_saved_address', JSON.stringify(customerData));

        // Telegram Message Formatting
        const message = `
🔔 *NEW PREMIUM ORDER*
──────────────────
*🛍️ Product Details:*
ID: \`${p.id}\`
Name: ${p.brand} ${p.title}
Selling Price: ${APP_CONFIG.CURRENCY}${p.price}
*Margin Earned: ${APP_CONFIG.CURRENCY}${p.commission}*

*📍 Customer Delivery Details:*
Name: ${customerData.name}
Phone: ${customerData.phone}
Pincode: ${customerData.pin}
City: ${customerData.city}
Address: ${customerData.full}

_Powered by Flipstore Premium Hub_
`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${APP_CONFIG.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: APP_CONFIG.CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                App.showToast("🎉 Order Placed Successfully!");
                App.closeCheckout();
            } else {
                throw new Error("Bot API Failed");
            }
        } catch (error) {
            App.showToast("Connection Error! Please check Bot Details.", "error");
        } finally {
            btn.innerHTML = `Place Order`;
            btn.disabled = false;
        }
    },

    // 5. CUSTOM TOAST NOTIFICATION
    showToast: (msg, type = 'success') => {
        const box = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const bgColor = type === 'error' ? 'bg-red-500' : 'bg-gray-900';
        const icon = type === 'error' ? 'fa-exclamation-triangle text-white' : 'fa-check-circle text-green-400';
        
        toast.className = `${bgColor} text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold toast-enter border border-white/10 w-full`;
        toast.innerHTML = `<i class="fas ${icon} text-lg"></i> <span>${msg}</span>`;
        
        box.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.replace('toast-enter', 'toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Start the Application
document.addEventListener('DOMContentLoaded', App.init);

