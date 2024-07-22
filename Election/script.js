document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            authenticateUser(username, password);
        });
    }

    // Handle registration
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = registerForm.username.value;
            const id = registerForm.id.value;
            const password = registerForm.password.value;
            registerUser(username, id, password);
        });
    }

    // Function to authenticate user
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

    // Function to register user
    function registerUser(username, id, password) {
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const userExists = users.some(user => user.username === username || user.id === id);
                if (userExists) {
                    registerMessage.textContent = 'Username or ID already exists';
                    return;
                }

                const newUser = { username, id, password };
                users.push(newUser);

                // Save updated users.json (this is a simplified approach; in a real app, this should be done on the server)
                fetch('save-users.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(users)
                }).then(() => {
                    registerMessage.textContent = 'Registration successful';
                });
            });
    }
});
