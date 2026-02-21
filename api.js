const API = {
    placeOrder: async () => {
        const cart = Store.getCart();
        const totals = Store.getTotals();
        const customer = Store.get('customer', null);
        const reseller = Store.get('user', null);

        if(!customer || !reseller) return Utils.showToast("Profile/Address incomplete!", "error");

        const items = cart.map((i, idx) => `${idx+1}. ${i.name} (Base: ₹${i.price} | Margin: ₹${i.margin})`).join('\n');
        
        const text = `
🛒 *NEW SHOPSY ORDER*
──────────────────
*📦 Items:*
${items}

💰 *Collect from Customer:* ₹${totals.customerPays}
🟢 *Reseller Profit:* ₹${totals.totalMargin}

*📍 Deliver To (Customer):*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}, ${customer.pin}

*👔 Reseller Info:*
Name: ${reseller.name}
Phone: ${reseller.phone}
`;

        try {
            const res = await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ chat_id: CONFIG.TELEGRAM_CHAT_ID, text: text, parse_mode: 'Markdown' })
            });
            if(!res.ok) throw new Error("API Failed");
            
            // Add margin to lifetime earnings
            const earnings = Store.get('earnings', 0) + totals.totalMargin;
            Store.set('earnings', earnings);
            
            Store.clearCart();
            Utils.showToast("Order Placed Successfully!");
            Router.navigate('earnings');
        } catch (e) {
            Utils.showToast("Failed to connect to Bot", "error");
        }
    }
};

