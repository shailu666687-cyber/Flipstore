const Views = {
    Home: () => `
        <div class="p-4 fade-in pb-24">
            <div class="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-2">
                ${DB.categories.map(cat => `<button class="shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 bg-white">${cat}</button>`).join('')}
            </div>
            <div class="grid grid-cols-2 gap-3">${DB.products.map(p => Components.ProductCard(p)).join('')}</div>
        </div>
    `,
    Cart: () => {
        const cart = Store.getCart();
        const totals = Store.getTotals();
        const cust = Store.get('customer', {name:'', phone:'', address:'', pin:''});
        
        if(cart.length === 0) return `<div class="p-10 text-center text-gray-500 fade-in mt-10">Your cart is empty</div>`;

        return `
        <div class="fade-in pb-32">
            <div class="bg-white p-4 border-b mb-2 shadow-sm">
                <h3 class="font-bold text-sm mb-3 text-blue-600">Customer Delivery Details</h3>
                <form id="custForm" class="space-y-3" oninput="Main.saveCustomer()">
                    <input type="text" id="cName" value="${cust.name}" placeholder="Customer Name" class="w-full bg-gray-50 border p-2 rounded text-sm">
                    <input type="tel" id="cPhone" value="${cust.phone}" placeholder="Customer Phone" class="w-full bg-gray-50 border p-2 rounded text-sm">
                    <div class="grid grid-cols-2 gap-2">
                        <input type="text" id="cPin" value="${cust.pin}" placeholder="Pincode" class="w-full bg-gray-50 border p-2 rounded text-sm">
                        <input type="text" id="cAddr" value="${cust.address}" placeholder="City/State" class="w-full bg-gray-50 border p-2 rounded text-sm">
                    </div>
                </form>
            </div>

            <div class="bg-white border-y shadow-sm">
                ${cart.map(item => `
                    <div class="p-3 border-b flex gap-3">
                        <img src="${item.image}" class="w-16 h-16 object-contain bg-gray-50 p-1 border rounded">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium line-clamp-1">${item.name}</h3>
                            <div class="text-sm font-bold mt-1">Selling Price: ₹${item.price + item.margin}</div>
                            <div class="text-xs text-green-600 font-bold">Your Margin: ₹${item.margin}</div>
                        </div>
                        <button onclick="Main.handleRemove('${item.id}')" class="text-red-500"><i class="fas fa-trash"></i></button>
                    </div>
                `).join('')}
            </div>

            <div class="bg-white p-4 border-y mt-2 shadow-sm">
                <div class="flex justify-between text-sm mb-2"><span>Base Price</span><span>₹${totals.basePrice}</span></div>
                <div class="flex justify-between text-sm mb-2 text-green-600 font-bold bg-green-50 p-1 rounded"><span>Total Margin</span><span>+ ₹${totals.totalMargin}</span></div>
                <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Customer Pays</span><span>₹${totals.customerPays}</span></div>
            </div>

            <div class="fixed bottom-[55px] left-0 right-0 bg-white border-t p-3 flex justify-between items-center z-40">
                <div class="font-black text-xl text-gray-800">₹${totals.customerPays}</div>
                <button onclick="API.placeOrder()" id="btn-checkout" class="bg-[#fb641b] text-white font-bold px-10 py-3 rounded shadow w-48">Place Order</button>
            </div>
        </div>`;
    },
    Earnings: () => `
        <div class="fade-in p-4 pb-24">
            <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center shadow-lg mb-6">
                <p class="text-sm opacity-90 font-medium">Total Lifetime Earnings</p>
                <h1 class="text-4xl font-black mt-1 tracking-tight">${Utils.formatMoney(Store.get('earnings', 0))}</h1>
                <button class="mt-4 bg-white text-green-600 px-6 py-2 rounded-full text-xs font-bold shadow">Withdraw to Bank</button>
            </div>
            <h3 class="font-bold text-gray-700 mb-3">How to earn more?</h3>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3 items-center">
                <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><i class="fab fa-whatsapp text-xl"></i></div>
                <p class="text-sm text-gray-600 font-medium leading-tight">Share catalogs daily on WhatsApp status and groups.</p>
            </div>
        </div>
    `,
    Profile: () => {
        const u = Store.get('user', {name:'', phone:''});
        return `
        <div class="fade-in p-4 bg-white min-h-screen">
            <h2 class="font-bold text-xl mb-6">Reseller Setup</h2>
            <form onsubmit="Main.saveProfile(event)" class="space-y-4">
                <input type="text" id="uName" value="${u.name}" required placeholder="Your Shop/Full Name" class="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded text-sm outline-none focus:border-blue-500">
                <input type="tel" id="uPhone" value="${u.phone}" required placeholder="Your Mobile Number" class="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded text-sm outline-none focus:border-blue-500">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3.5 rounded shadow">Save Profile</button>
            </form>
        </div>`;
    }
};

