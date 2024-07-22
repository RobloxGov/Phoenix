document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        authenticateUser(username, password);
    });

    function authenticateUser(username, password) {
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'index.html'; // Redirect to poll page
                } else {
                    loginMessage.textContent = 'Invalid username or password';
                }
            });
    }
});
