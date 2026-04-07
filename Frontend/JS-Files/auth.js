/**
 * auth.js
 * Contains shared authentication and authorization logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Identify the logout button(s)
    const logoutButtons = document.querySelectorAll('.logout');

    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 2. Remove the authentication token from localStorage
            localStorage.removeItem('token');
            
            // 3. Clear any other user-related data if stored
            // localStorage.clear(); // Use with caution if you have other persistent data

            // 4. Redirect to the root URL (index.html)
            window.location.href = 'index.html';
        });
    });

    // 5. Basic session check (optional but recommended)
    // If we're on a protected page and there's no token, redirect to login
    const protectedPages = ['dashboard.html', 'image-intelligence.html', 'username-recon.html', 'settings.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !localStorage.getItem('token')) {
        // Redirect if not authenticated
        // window.location.href = 'login.html'; 
    }
});
