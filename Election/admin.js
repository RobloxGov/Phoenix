document.addEventListener('DOMContentLoaded', () => {
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModal = document.getElementById('close-admin-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginMessage = document.getElementById('admin-login-message');
    const adminOptions = document.getElementById('admin-options');
    const resetVotesButton = document.getElementById('reset-votes');

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
            adminOptions.classList.remove('hidden');
            adminModal.style.display = 'none';
        } else {
            adminLoginMessage.textContent = 'Invalid admin credentials';
        }
    }

    resetVotesButton.addEventListener('click', () => {
        resetVotes();
    });

    function resetVotes() {
        localStorage.removeItem('votes');
        displayResults();
    }

    function displayResults() {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<h2>Results:</h2>';
        for (const [option, count] of Object.entries(votes)) {
            resultsDiv.innerHTML += `<p>${option}: ${count} vote(s)</p>`;
        }
    }

    // Display results on page load
    displayResults();
});
