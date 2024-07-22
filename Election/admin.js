document.addEventListener('DOMContentLoaded', () => {
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModal = document.getElementById('close-admin-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginMessage = document.getElementById('admin-login-message');
    const resetVotesModalButton = document.getElementById('reset-votes-modal');
    const adminResults = document.getElementById('admin-results');

    adminLoginButton.addEventListener('click', () => {
        adminModal.style.display = 'block';
    });

    closeAdminModal.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    adminLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = adminLoginForm.username.value;
        const password = adminLoginForm.password.value;
        authenticateAdmin(username, password);
    });

    function authenticateAdmin(username, password) {
        const adminUsername = 'Bank150992567';
        const adminPassword = 'Krutor2567';

        if (username === adminUsername && password === adminPassword) {
            adminResults.classList.remove('hidden');
            resetVotesModalButton.classList.remove('hidden');
            adminModal.style.display = 'none';
            displayResults();
        } else {
            adminLoginMessage.textContent = 'Invalid admin credentials';
        }
    }

    resetVotesModalButton.addEventListener('click', () => {
        resetVotes();
    });

    function resetVotes() {
        localStorage.removeItem('votes');
        displayResults();
    }

    function displayResults() {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        document.getElementById('votes-candidate-1').textContent = votes['Candidate 1'] || 0;
        document.getElementById('votes-candidate-2').textContent = votes['Candidate 2'] || 0;
        document.getElementById('votes-candidate-3').textContent = votes['Candidate 3'] || 0;
    }
});
