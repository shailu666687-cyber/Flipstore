const Components = {
    Header: () => `
        <header class="bg-white sticky top-0 z-40 px-4 py-3 shadow-sm flex justify-between items-center">
            <h1 class="font-black text-xl text-blue-600 italic tracking-tight">ShopStore</h1>
            <div class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200" onclick="Router.navigate('earnings')">
                <i class="fas fa-wallet"></i> ${Utils.formatMoney(Store.get('earnings', 0))}
            </div>
        </header>
    `,
    BottomNav: (activeRoute) => {
        const count = Store.getCart().length;
        const badge = count > 0 ? `<span class="absolute top-1 right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">${count}</span>` : '';
        
        const navItem = (route, icon, label) => `
            <button onclick="Router.navigate('${route}')" class="flex flex-col items-center gap-1 p-2 w-16 transition-colors ${activeRoute === route ? 'nav-active' : 'text-gray-400'} relative">
                <i class="${icon} text-xl"></i><span class="text-[10px] font-medium">${label}</span>
                ${route === 'cart' ? badge : ''}
            </button>
        `;
        return `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center pb-2 pt-2 z-50 bottom-sheet">
                ${navItem('home', 'fas fa-home', 'Home')}
                ${navItem('earnings', 'fas fa-chart-line', 'Earnings')}
                ${navItem('cart', 'fas fa-shopping-cart', 'Cart')}
                ${navItem('profile', 'far fa-user', 'Profile')}
            </nav>
        `;
    },
    ProductCard: (p) => `
        <div class="bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex flex-col relative">
            <div class="absolute top-2 left-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-r">Margin: ${Utils.formatMoney(p.margin)}</div>
            <div class="h-36 w-full bg-gray-50 rounded-lg flex items-center justify-center p-2 mb-2 relative"><img src="${p.image}" class="h-full object-contain mix-blend-multiply"></div>
            <h3 class="text-xs text-gray-800 line-clamp-2 font-medium">${p.name}</h3>
            <div class="flex items-center gap-1 mt-1 mb-2">
                <span class="font-bold text-sm text-gray-900">${Utils.formatMoney(p.price)}</span>
                <span class="text-[10px] text-gray-400 line-through">${Utils.formatMoney(p.mrp)}</span>
            </div>
            <div class="mt-auto grid grid-cols-2 gap-2">
                <button onclick="Utils.shareWhatsApp('${p.id}')" class="bg-green-50 text-green-600 border border-green-200 py-1.5 rounded text-xs font-bold"><i class="fab fa-whatsapp"></i> Share</button>
                <button onclick="Main.handleAddToCart('${p.id}')" class="bg-blue-50 text-blue-600 border border-blue-200 py-1.5 rounded text-xs font-bold">Add</button>
            </div>
        </div>
    `
};

