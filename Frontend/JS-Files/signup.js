// 1. Grab the form from your HTML
const signupForm = document.getElementById('signupForm');

// 2. Listen for the user clicking "Submit"
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stops the page from instantly refreshing

    // 3. Grab the text the user typed into the inputs
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        // 4. Send the data to your backend API
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }) // Converting data to JSON
        });

        const data = await response.json();

        // 5. Handle the response
        if (response.ok) {
            alert('Account created successfully! You can now log in.');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert('Error: ' + data.message); // Show the error (e.g., "Email already exists")
        }

    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Could not connect to the server. Is your backend running?');
    }
});