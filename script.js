
        const STORAGE_KEY = 'dollarPhoenix';
        const INTERVAL = 60000; // 1 minute in milliseconds
        const ADMIN_USERNAME = 'Bank150992567';
        const ADMIN_PASSWORD = 'Krutor2567';
        const CHANNEL_NAME = 'dollarPhoenixChannel';
        const channel = new BroadcastChannel(CHANNEL_NAME);

        function getCurrentTimestamp() {
            return Math.floor(Date.now() / INTERVAL) * INTERVAL;
        }

        function initialize() {
            const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            const now = getCurrentTimestamp();

            if (!storedData.lastUpdate || storedData.lastUpdate < now) {
                // Update if it's time
                storedData.previousValue = storedData.previousValue || 100.00;
                updateValue(storedData);
                storedData.lastUpdate = now;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
                channel.postMessage(storedData); // Broadcast the update
            }

            // Load value and history from local storage
            document.getElementById('value').textContent = `$${storedData.previousValue.toFixed(2)}`;
            updateHistory(storedData.history || []);
        }

        function getRandomValue(previousValue) {
            // Generate a random value with 50% chance to increase and 50% chance to decrease
            const randomFactor = Math.random();
            const changeAmount = randomFactor < 0.5 ? (Math.random() * 10) : -(Math.random() * 10);
            return previousValue + changeAmount;
        }

        function updateValue(storedData) {
            const newValue = parseFloat(getRandomValue(storedData.previousValue).toFixed(2));
            const change = newValue - storedData.previousValue;
            const changeType = change > 0 ? 'up' : change < 0 ? 'down' : 'no-change';
            const changeText = changeType === 'no-change' ? `${change.toFixed(2)}` : (changeType === 'up' ? `<span class="icon">🔼</span> +${change.toFixed(2)}` : `<span class="icon">🔽</span> ${change.toFixed(2)}`);

            document.getElementById('value').textContent = `$${newValue.toFixed(2)}`;
            document.getElementById('change').innerHTML = changeText;
            document.getElementById('change').className = `change ${changeType}`;

            // Update stored data
            storedData.previousValue = newValue;
            storedData.history = storedData.history || [];
            storedData.history.push({ value: newValue, change: change });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
            channel.postMessage(storedData); // Broadcast the update
            updateHistory(storedData.history);
        }

        function updateHistory(history) {
            const historyBodyElement = document.getElementById('history-body');
            historyBodyElement.innerHTML = '';
            history.forEach((item, index) => {
                const historyRow = document.createElement('tr');
                historyRow.innerHTML = `<td>${index + 1}</td><td>${item.value.toFixed(2)}</td><td>${item.change > 0 ? `<span class="icon">🔼</span> +${item.change.toFixed(2)}` : item.change < 0 ? `<span class="icon">🔽</span> ${item.change.toFixed(2)}` : item.change.toFixed(2)}</td>`;
                historyBodyElement.appendChild(historyRow);
            });
        }

        function setupInterval() {
            setInterval(() => {
                const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                const now = getCurrentTimestamp();

                if (!storedData.lastUpdate || storedData.lastUpdate < now) {
                    updateValue(storedData);
                    storedData.lastUpdate = now;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
                    channel.postMessage(storedData); // Broadcast the update
                }
            }, INTERVAL);
        }

        function toggleLogin() {
            const loginContainer = document.getElementById('login-container');
            loginContainer.style.display = loginContainer.style.display === 'block' ? 'none' : 'block';
        }

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('login-message');

            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                // Reset to default values
                const defaultData = {
                    previousValue: 100.00,
                    history: []
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
                channel.postMessage(defaultData); // Broadcast the reset
                initialize(); // Reload values
                message.textContent = 'Logged in successfully. The system has been reset.';
            } else {
                message.textContent = 'Invalid username or password.';
            }
        }

        // Handle messages from other tabs
        channel.onmessage = (event) => {
            const storedData = event.data;
            document.getElementById('value').textContent = `$${storedData.previousValue.toFixed(2)}`;
            updateHistory(storedData.history || []);
        };

        // Initialize and set up the interval
        window.onload = () => {
            initialize();
            setupInterval();
        };
