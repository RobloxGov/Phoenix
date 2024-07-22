document.addEventListener('DOMContentLoaded', () => {
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminLoginForm = document.getElementById('admin-login');
    const adminLogin = document.getElementById('admin-login-form');
    const adminMessage = document.getElementById('admin-message');
    const resetVotesButton = document.getElementById('reset-votes');

    adminLoginButton.addEventListener('click', () => {
        adminLogin.classList.toggle('hidden');
    });

    adminLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = adminLogin.username.value;
        const password = adminLogin.password.value;
        authenticateAdmin(username, password);
    });

    resetVotesButton.addEventListener('click', () => {
        resetVotes();
    });

    function authenticateAdmin(username, password) {
        fetch('admin.json')
            .then(response => response.json())
            .then(admins => {
                const admin = admins.find(admin => admin.username === username && admin.password === password);
                if (admin) {
                    adminMessage.textContent = 'Login successful';
                    resetVotesButton.classList.remove('hidden');
                } else {
                    adminMessage.textContent = 'Invalid username or password';
                }
            });
    }

    function resetVotes() {
        localStorage.removeItem('votes');
        displayResults();
    }
});
