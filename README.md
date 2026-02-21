# Flipstore# 🛒 Flipstore Premium - Reseller Web App

A professional, frontend-focused e-commerce web application designed specifically for affiliate marketers and resellers. Inspired by top e-commerce platforms like Flipkart, this app features a premium UI, seamless "Buy Now" flows, and a serverless backend using the Telegram API.

## ✨ Key Features

* **📱 Premium UI/UX:** Built with Tailwind CSS for a highly responsive, app-like mobile experience.
* **🚀 1-Click Buy Now:** Bypasses complex cart systems for faster reseller checkouts.
* **💬 WhatsApp Integration:** Direct product sharing to WhatsApp with pre-formatted promotional messages and prices.
* **🤖 Serverless Backend (Telegram):** Uses Telegram Bot API to instantly receive new orders, customer details, and commission tracking directly on your phone.
* **💰 Margin/Commission Tracking:** Displays clearly how much profit the reseller makes per order.
* **💾 Local Session Management:** Uses Browser `localStorage` to save user login states and customer addresses securely.

## 🛠️ Tech Stack

* **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
* **Icons & Assets:** FontAwesome 6
* **Backend/Database:** Telegram Bot API (for order processing), LocalStorage (for session data)

## 📂 File Structure (Modular Design)

The project is divided into 4 core files for clean architecture:
1.  `index.html` - The core layout, modals, and structure.
2.  `style.css` - Custom animations, shimmer effects, and scrollbar hiding.
3.  `data.js` - Mock database for products and configuration settings.
4.  `app.js` - The main engine handling auth, UI switching, and API calls.

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/flipstore-premium.git](https://github.com/yourusername/flipstore-premium.git)
