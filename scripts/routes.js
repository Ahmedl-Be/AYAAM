
import AdminDashboard from '../pages/AdminDashboard.js';
import Home from '../pages/Home.js';
import Cart from '../pages/Cart.js';
import Catalog from '../pages/Catalog.js';
import SellerDashboard from '../pages/SellerDashboard.js';
import { getData } from './data-init.js';
import NotFound from '../pages/NotFound.js';

// Route configuration
const routes = {
    '#/404': NotFound,
    '#/': Home,
    '#/home': Home,
    '#/catalog': Catalog,
    '#/cart': Cart,
    '#/admin': AdminDashboard,
    '#/seller': SellerDashboard
};

/* ========= Navigation Functions ============= */

// Helper function to navigate programmatically
// _path: one of the available routes
export function navigate(_path) {
    window.location.hash = _path;
}


/* ========= Initial Routing ========= */
export function initRouter() {
    const loggedUser = getData('loggedUser')||{};
    const role = loggedUser.role || 'guest';

    // Handle route buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('router')) {
            e.preventDefault();
            const route = e.target.getAttribute('href');
            window.location.hash = route;
        }
    });

    // Handle initial load and hash changes
    window.addEventListener('load', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial route
    handleHashChange();
}

function handleHashChange() {
    const hash = window.location.hash || '#/';
    const path = Object.keys(routes).find(route => route === hash) || '#/404';
    
    // Update active button
    document.querySelectorAll('.router').forEach(_anchor => {
        const _route = _anchor.getAttribute('href');
        console.log(_route)
        _anchor.classList.toggle('active', `${_route}` === path);
    });
    
    // Render the component
    const component = routes[path] || NotFound;
    document.getElementById('app').innerHTML = component();
}

