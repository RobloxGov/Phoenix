document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('poll-form');
    const resultsDiv = document.getElementById('results');
    
    // Check if user is logged in
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
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

    // Display results on page load
    displayResults();
});
