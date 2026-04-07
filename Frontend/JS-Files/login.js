// 1. Grab the form from your HTML
const loginForm = document.getElementById('loginForm');

// 2. Listen for the user clicking "Login"
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // 3. Grab the typed text
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        // 4. Send the data to your login API
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // 5. Handle the response
        if (response.ok) {
            // SUCCESS: Put the JWT token into the browser's "wallet"
            localStorage.setItem('token', data.token);
            
            alert('Login successful! Welcome to ShadowMap.');
            // Redirect to your main dashboard page (update this if your home page has a different name)
            window.location.href = 'dashboard.html'; 
        } else {
            // FAILED: Show the error (e.g., "Invalid credentials")
            alert('Error: ' + data.message);
        }

    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Could not connect to the server.');
    }
});