const Router = {
    currentRoute: 'home',
    navigate: (route) => {
        Router.currentRoute = route;
        const root = document.getElementById('app-root');
        
        // Render Shell
        root.innerHTML = Components.Header();
        
        // Render View
        const viewContainer = document.createElement('div');
        switch(route) {
            case 'home': viewContainer.innerHTML = Views.Home(); break;
            case 'cart': viewContainer.innerHTML = Views.Cart(); break;
            case 'earnings': viewContainer.innerHTML = Views.Earnings(); break;
            case 'profile': viewContainer.innerHTML = Views.Profile(); break;
        }
        root.appendChild(viewContainer);
        
        // Render Bottom Nav
        root.innerHTML += Components.BottomNav(route);
        window.scrollTo(0,0);
    }
};

const Main = {
    init: () => {
        Router.navigate('home');
    },
    handleAddToCart: (id) => {
        const p = DB.products.find(x => x.id === id);
        if(Store.addToCart(p)) {
            Utils.showToast("Added to Cart!");
            Router.navigate(Router.currentRoute); // Refresh UI
        } else {
            Utils.showToast("Already in cart", "error");
        }
    },
    handleRemove: (id) => {
        Store.removeFromCart(id);
        Router.navigate('cart');
    },
    saveCustomer: () => {
        Store.set('customer', {
            name: document.getElementById('cName').value,
            phone: document.getElementById('cPhone').value,
            pin: document.getElementById('cPin').value,
            address: document.getElementById('cAddr').value
        });
    },
    saveProfile: (e) => {
        e.preventDefault();
        Store.set('user', {
            name: document.getElementById('uName').value,
            phone: document.getElementById('uPhone').value
        });
        Utils.showToast("Profile Saved!");
        Router.navigate('home');
    }
};

// Ignite the App
document.addEventListener('DOMContentLoaded', Main.init);

