/**
 * Admin Utilities: utility functions used across admin modules
 */



//..........................(for product description).....................
/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} - Truncated text with ellipsis 
 */
export function truncateText(text, maxLength = 50) {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}



// /**
//  * Validate email format
//  * @param {string} email - Email to validate
//  * @returns {boolean} - True if valid email format
//  */
// export function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }


/**
 * Check if user has admin permissions
 * @param {Object} user - User object
 * @returns {boolean} - True if user is admin
 */
export function isAdmin(user) {
    return user && (user.role === 'Admin' || user.role === 'admin');
}

/**
 * Check if user has seller permissions
 * @param {Object} user - User object
 * @returns {boolean} - True if user is seller
 */
export function isSeller(user) {
    return user && (user.role === 'Seller' || user.role === 'seller');
}

