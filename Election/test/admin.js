document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    const logoutBtn = document.getElementById('logout-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Load the votes
    const loadVotes = () => {
        fetch('elec.json')
            .then(response => response.json())
            .then(data => {
                results.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error:', error));
    };

    loadVotes(); // Initial load

    // Reset votes
    resetBtn.addEventListener('click', () => {
        fetch('elec.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                votes: {
                    "Option1": 0,
                    "Option2": 0,
                    "Option3": 0
                }
            })
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('hasVoted'); // Remove voting status
                loadVotes(); // Reload votes
            } else {
                throw new Error('Failed to reset votes');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Logout button functionality
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'elec.html';
    });
});
