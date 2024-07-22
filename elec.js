document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('poll-form');
    const resultsDiv = document.getElementById('results');

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
