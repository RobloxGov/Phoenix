document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    const logoutBtn = document.getElementById('logout-btn');

    // Load the votes
    fetch('elec.json')
        .then(response => response.json())
        .then(data => {
            results.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'elec.html';
    });
});
