document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('poll-form');
    const resultsDiv = document.getElementById('results');
    const adminPanel = document.getElementById('admin-panel');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const viewResultsBtn = document.getElementById('view-results-btn');
    const resetVotesBtn = document.getElementById('reset-votes-btn');
    const adminResultsDiv = document.getElementById('admin-results');

    // Check if user is logged in
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }

    // Show or hide admin panel
    if (localStorage.getItem('currentAdmin')) {
        adminPanel.classList.remove('hidden');
    } else {
        adminPanel.classList.add('hidden');
    }

    adminLoginBtn.addEventListener('click', () => {
        window.location.href = 'admin.html'; // Redirect to admin login page
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const selectedOption = formData.get('option');

        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }

        saveVote(selectedOption);
        displayResults();
    });

    viewResultsBtn.addEventListener('click', () => {
        displayAdminResults();
    });

    resetVotesBtn.addEventListener('click', () => {
        localStorage.removeItem('votes');
        displayResults();
        adminResultsDiv.innerHTML = '<p>Votes have been reset.</p>';
    });

    function saveVote(option) {
        let votes = JSON.parse(localStorage.getItem('votes')) || {};
        if (votes[option]) {
            votes[option]++;
        } else {
            votes[option] = 1;
        }
        localStorage.setItem('votes', JSON.stringify(votes));
    }

    function displayResults() {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        resultsDiv.innerHTML = '<h2>Results:</h2>';
        for (const [option, count] of Object.entries(votes)) {
            resultsDiv.innerHTML += `<p>${option}: ${count} vote(s)</p>`;
        }
    }

    function displayAdminResults() {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        adminResultsDiv.innerHTML = '<h2>Admin Results:</h2>';
        for (const [option, count] of Object.entries(votes)) {
            adminResultsDiv.innerHTML += `<p>${option}: ${count} vote(s)</p>`;
        }
    }

    // Display results on page load
    displayResults();
});
