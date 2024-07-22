document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const pollContainer = document.getElementById('poll-container');
    const loginForm = document.getElementById('login-form');
    const pollForm = document.getElementById('poll-form');
    const resultsDiv = document.getElementById('results');

    const validUsername = 'user';
    const validPassword = 'password';

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            loginContainer.style.display = 'none';
            pollContainer.style.display = 'block';
        } else {
            alert('Invalid username or password');
        }
    });

    pollForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(pollForm);
        const selectedOption = formData.get('option');

        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }

        // Save the selected option to localStorage
        saveVote(selectedOption);

        // Display results
        displayResults();
    });

    // Function to save vote to localStorage
    function saveVote(option) {
        let votes = JSON.parse(localStorage.getItem('votes')) || {};
        if (votes[option]) {
            votes[option]++;
        } else {
            votes[option] = 1;
        }
        localStorage.setItem('votes', JSON.stringify(votes));
    }

    // Function to display results
    function displayResults() {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        resultsDiv.innerHTML = '<h2>Results:</h2>';
        for (const [option, count] of Object.entries(votes)) {
            resultsDiv.innerHTML += `<p>${option}: ${count} vote(s)</p>`;
        }
    }

    // Display results on page load
    displayResults();
});
