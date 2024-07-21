
        const adminUsername = 'Bank150992567';
        const adminPassword = 'Krutor2567';

        let previousValue = parseFloat(localStorage.getItem('previousValue')) || 100.00;

        function getRandomValue() {
            // Generate a random value with 50% chance to increase and 50% chance to decrease
            const randomFactor = Math.random();
            let changeAmount;
            if (randomFactor < 0.5) {
                // Increase value
                changeAmount = (Math.random() * 10); // increase up to 10 units
            } else {
                // Decrease value
                changeAmount = -(Math.random() * 10); // decrease up to 10 units
            }
            return previousValue + changeAmount;
        }

        function updateValue() {
            const valueElement = document.getElementById('value');
            const changeElement = document.getElementById('change');
            const historyBodyElement = document.getElementById('history-body');
            const newValue = parseFloat(getRandomValue().toFixed(2));
            const newValueText = `$${newValue.toFixed(2)}`;
            
            valueElement.textContent = newValueText;

            const change = newValue - previousValue;
            let changeText = '';
            if (change > 0) {
                changeText = `<span class="icon">🔼</span> +${change.toFixed(2)}`;
                changeElement.className = 'change up';
            } else if (change < 0) {
                changeText = `<span class="icon">🔽</span> ${change.toFixed(2)}`;
                changeElement.className = 'change down';
            } else {
                changeText = `${change.toFixed(2)}`;
                changeElement.className = 'change';
            }
            
            changeElement.innerHTML = changeText;

            // Save history and previous value to local storage
            const history = JSON.parse(localStorage.getItem('history')) || [];
            history.push({ value: newValue, change: change });
            localStorage.setItem('history', JSON.stringify(history));
            localStorage.setItem('previousValue', newValue);

            // Update history display
            historyBodyElement.innerHTML = '';
            history.forEach((item, index) => {
                const historyRow = document.createElement('tr');
                historyRow.innerHTML = `<td>${index + 1}</td><td>${item.value.toFixed(2)}</td><td>${item.change > 0 ? `<span class="icon">🔼</span> +${item.change.toFixed(2)}` : item.change < 0 ? `<span class="icon">🔽</span> ${item.change.toFixed(2)}` : item.change.toFixed(2)}</td>`;
                historyBodyElement.appendChild(historyRow);
            });

            previousValue = newValue;
        }

        function handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === adminUsername && password === adminPassword) {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('reset-money').style.display = 'block';
            } else {
                alert('Invalid login credentials');
            }
        }

        function resetMoney() {
            previousValue = 100.00;
            localStorage.setItem('previousValue', previousValue);
            localStorage.removeItem('history');
            updateValue();
        }

        document.getElementById('login-btn').addEventListener('click', () => {
            document.getElementById('login-form').style.display = 'block';
        });

        document.getElementById('close-btn').addEventListener('click', () => {
            document.getElementById('login-form').style.display = 'none';
        });

        document.getElementById('submit-login').addEventListener('click', handleLogin);

        document.getElementById('reset-money').addEventListener('click', resetMoney);

        // Load history from local storage
        window.onload = () => {
            const valueElement = document.getElementById('value');
            valueElement.textContent = `$${previousValue.toFixed(2)}`;

            const history = JSON.parse(localStorage.getItem('history')) || [];
            const historyBodyElement = document.getElementById('history-body');
            history.forEach((item, index) => {
                const historyRow = document.createElement('tr');
                historyRow.innerHTML = `<td>${index + 1}</td><td>${item.value.toFixed(2)}</td><td>${item.change > 0 ? `<span class="icon">🔼</span> +${item.change.toFixed(2)}` : item.change < 0 ? `<span class="icon">🔽</span> ${item.change.toFixed(2)}` : item.change.toFixed(2)}</td>`;
                historyBodyElement.appendChild(historyRow);
            });
        }

        // Update the value every 1 minute (60000 milliseconds)
        setInterval(updateValue, 60000);

        // Initial update
        updateValue();
