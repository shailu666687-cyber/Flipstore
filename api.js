const TelegramAPI = {
    async sendOrder(orderDetails) {
        const text = `
🛒 *NEW ORDER RECEIVED - FlipStore* 🛒
        
*Order ID:* #${orderDetails.orderId}
*Date:* ${new Date().toLocaleString('en-IN')}

👤 *Customer Details:*
Name: ${orderDetails.name}
Phone: ${orderDetails.phone}
Address: ${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}
Landmark: ${orderDetails.landmark || 'N/A'}

📦 *Order Items:*
${orderDetails.items.map(item => `- ${item.name} (Size: ${item.size || 'N/A'}) x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

💰 *Payment Mode:* Cash on Delivery (COD)
🚚 *Delivery Charge:* ₹${orderDetails.deliveryCharge}
💵 *Total Amount:* ₹${orderDetails.totalAmount}
        `;

        const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CONFIG.TELEGRAM.CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (!response.ok) throw new Error('Telegram API Error');
            return true;
        } catch (error) {
            console.error('Order sending failed:', error);
            return false;
        }
    }
};
