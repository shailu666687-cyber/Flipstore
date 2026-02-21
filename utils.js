const Utils = {
    formatMoney: (amount) => `${CONFIG.CURRENCY}${amount}`,
    
    showToast: (msg, type = 'success') => {
        const root = document.getElementById('toast-root');
        const toast = document.createElement('div');
        const bg = type === 'error' ? 'bg-red-600' : 'bg-green-600';
        toast.className = `${bg} text-white px-4 py-3 rounded-lg shadow-xl text-sm font-bold flex items-center gap-2 toast-anim`;
        toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${msg}`;
        root.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    shareWhatsApp: (id) => {
        const p = DB.products.find(x => x.id === id);
        const user = Store.get('user', { name: "A Verified Reseller" });
        const finalPrice = p.price + p.margin;
        const text = `💥 *FESTIVE DEAL* 💥\n\n*${p.name}*\n💰 *Only: ${Utils.formatMoney(finalPrice)}*\n❌ ~MRP: ${Utils.formatMoney(p.mrp)}~\n\n✅ 100% Quality\n✅ Free Delivery\n✅ Cash on Delivery\n\n👉 *Reply YES to order!*\n\n_Shared by: ${user.name}_`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
};

