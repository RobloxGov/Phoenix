document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');
    const loginMessage = document.getElementById('admin-login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        authenticateAdmin(username, password);
    });

    function authenticateAdmin(username, password) {
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const admin = users.find(user => user.username === username && user.password === password && user.role === 'admin');
                if (admin) {
                    localStorage.setItem('currentAdmin', JSON.stringify(admin));
                    window.location.href = 'index.html'; // Redirect to poll page
                } else {
                    loginMessage.textContent = 'Invalid username or password';
                }
            });
    }
});
