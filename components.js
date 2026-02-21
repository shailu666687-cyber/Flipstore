const Components = {
    renderProductCard: (product) => {
        return `
        <div class="product-card">
            <div class="wishlist-icon"><i class='bx bx-heart'></i></div>
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="rating-badge">${product.rating} <i class='bx bxs-star'></i></div>
                <div class="price-container">
                    <span class="current-price">${CONFIG.CURRENCY}${product.price}</span>
                    <span class="original-price">${CONFIG.CURRENCY}${product.originalPrice}</span>
                    <span class="discount">${product.discount}% off</span>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn-add-cart" onclick="Components.handleAction('${product.id}', 'cart')">Add to Cart</button>
                <button class="btn-buy-now" onclick="Components.handleAction('${product.id}', 'buy')">Buy Now</button>
            </div>
        </div>
        `;
    },

    handleAction: (productId, actionType) => {
        const product = PRODUCTS.find(p => p.id === productId);
        
        if (product.requireSize) {
            Components.openSizeModal(product, actionType);
        } else {
            Components.executeAction(product, null, actionType);
        }
    },

    openSizeModal: (product, actionType) => {
        // Create dynamic modal for size selection
        const modalHtml = `
            <div id="size-modal" class="modal-overlay">
                <div class="modal-content slide-up">
                    <div class="modal-header">
                        <h3>Select Size</h3>
                        <i class='bx bx-x close-modal' onclick="document.getElementById('size-modal').remove()"></i>
                    </div>
                    <div class="size-options">
                        ${product.sizes.map(size => {
                            const isOOS = product.stock[size] === 0;
                            const stockBadge = product.stock[size] > 0 && product.stock[size] <= 3 
                                ? `<span class="few-left">Only ${product.stock[size]} left</span>` : '';
                            
                            return `
                            <div class="size-box ${isOOS ? 'disabled' : ''}" 
                                 onclick="${isOOS ? '' : `Components.executeActionAndClose('${product.id}', '${size}', '${actionType}')`}">
                                ${size}
                                ${stockBadge}
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    executeActionAndClose: (productId, size, actionType) => {
        const product = PRODUCTS.find(p => p.id === productId);
        document.getElementById('size-modal').remove();
        Components.executeAction(product, size, actionType);
    },

    executeAction: (product, size, actionType) => {
        if (actionType === 'cart') {
            Store.addToCart(product, size);
        } else if (actionType === 'buy') {
            Store.setBuyNowItem(product, size);
            // Navigate to checkout with 'buyNow' mode
            window.location.hash = '#checkout?mode=buynow'; 
        }
    }
};
