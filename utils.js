const Utils = {
    showToast: (message, type = 'info') => {
        const toastHtml = `
            <div class="toast-notification toast-${type}">
                ${message}
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHtml);
        const toastElement = document.body.lastElementChild;
        
        setTimeout(() => {
            toastElement.classList.add('fade-out');
            setTimeout(() => toastElement.remove(), 300);
        }, 2000);
    },

    generateOrderID: () => {
        return 'FS' + Math.floor(10000000 + Math.random() * 90000000); // e.g., FS12345678
    }
};
