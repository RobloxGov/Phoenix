document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('poll-form');
    const message = document.getElementById('message');
    const loginBtn = document.getElementById('login-btn');

    let hasVoted = false;

    // Check if the user has already voted
    if (localStorage.getItem('hasVoted') === 'true') {
        hasVoted = true;
        form.style.display = 'none';
        message.textContent = 'คุณได้ลงคะแนนแล้ว';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (hasVoted) {
            message.textContent = 'คุณได้ลงคะแนนแล้ว';
            return;
        }

        const formData = new FormData(form);
        const vote = formData.get('vote');

        try {
            await fetch('elec.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vote }),
            });

            localStorage.setItem('hasVoted', 'true');
            hasVoted = true;
            form.style.display = 'none';
            message.textContent = 'ขอบคุณที่ลงคะแนน';
        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'เกิดข้อผิดพลาด';
        }
    });

    loginBtn.addEventListener('click', () => {
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');
        if (username === 'Bank150992567' && password === 'Krutor2567') {
            window.location.href = 'admin.html'; // Admin page link
        } else {
            alert('Invalid credentials');
        }
    });
});
