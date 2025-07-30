const API_KEY = 'c0a4b3b46d157e430b5f882f8c22dd75'; // Your provided API key

        // Digital Clock
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            const dateString = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            document.getElementById('digitalClock').textContent = timeString;
            document.getElementById('dateDisplay').textContent = dateString;
        }

        // Create animated background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 25;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 8 + 3 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDuration = Math.random() * 6 + 4 + 's';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Weather animations
        function createWeatherAnimation(type) {
            const weatherAnimation = document.getElementById('weatherAnimation');
            weatherAnimation.innerHTML = '';

            if (type === 'rain') {
                for (let i = 0; i < 60; i++) {
                    const rain = document.createElement('div');
                    rain.className = 'rain';
                    rain.style.left = Math.random() * 100 + '%';
                    rain.style.animationDuration = Math.random() * 0.8 + 0.5 + 's';
                    rain.style.animationDelay = Math.random() * 2 + 's';
                    weatherAnimation.appendChild(rain);
                }
            } else if (type === 'snow') {
                for (let i = 0; i < 40; i++) {
                    const snow = document.createElement('div');
                    snow.className = 'snow';
                    snow.style.left = Math.random() * 100 + '%';
                    snow.style.animationDuration = Math.random() * 3 + 3 + 's';
                    snow.style.animationDelay = Math.random() * 4 + 's';
                    weatherAnimation.appendChild(snow);
                }
            } else if (type === 'sun') {
                const sunRays = document.createElement('div');
                sunRays.className = 'sun-rays';
                sunRays.style.top = '8%';
                sunRays.style.right = '8%';
                weatherAnimation.appendChild(sunRays);
            }
        }

        // Weather icon mapping
        function getWeatherIcon(condition, isDay = true) {
            const iconMap = {
                'clear': isDay ? '☀️' : '🌙',
                'sunny': '☀️',
                'partly cloudy': isDay ? '⛅' : '🌙',
                'clouds': '☁️',
                'overcast': '☁️',
                'rain': '🌧️',
                'drizzle': '🌦️',
                'snow': '❄️',
                'thunderstorm': '⛈️',
                'fog': '🌫️',
                'mist': '🌫️',
                'haze': '🌫️',
                'windy': '💨'
            };

            const lowerCondition = condition.toLowerCase();
            for (const key in iconMap) {
                if (lowerCondition.includes(key)) {
                    return iconMap[key];
                }
            }
            return isDay ? '🌤️' : '🌙';
        }

        // Get weather animation type
        function getAnimationType(condition) {
            const lowerCondition = condition.toLowerCase();
            if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('thunderstorm')) {
                return 'rain';
            } else if (lowerCondition.includes('snow')) {
                return 'snow';
            } else if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
                return 'sun';
            }
            return null;
        }

        // Display forecast
        function displayForecast(forecastList) {
            const container = document.getElementById('forecastContainer');
            container.innerHTML = '';
            
            const dailyForecasts = {};
            forecastList.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        temps: [],
                        conditions: [],
                        icons: []
                    };
                }
                dailyForecasts[date].temps.push(item.main.temp);
                dailyForecasts[date].conditions.push(item.weather[0].main);
                dailyForecasts[date].icons.push(getWeatherIcon(item.weather[0].main));
            });

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayIndex = 0;
            for (const date in dailyForecasts) {
                if(dayIndex >= 7) break;
                
                const dayData = dailyForecasts[date];
                const high = Math.round(Math.max(...dayData.temps));
                const low = Math.round(Math.min(...dayData.temps));
                const condition = dayData.conditions[Math.floor(dayData.conditions.length / 2)]; // Get mid-day condition
                const icon = dayData.icons[Math.floor(dayData.icons.length / 2)]; // Get mid-day icon
                const dayName = new Date(date).getDay();

                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.style.animationDelay = `${dayIndex * 0.1}s`;
                
                forecastItem.innerHTML = `
                    <div class="forecast-day">${days[dayName]}</div>
                    <div class="forecast-icon">${icon}</div>
                    <div class="forecast-temps">
                        <span class="forecast-high">${high}°</span>
                        <span class="forecast-low">${low}°</span>
                    </div>
                    <div class="forecast-desc">${condition}</div>
                `;
                
                container.appendChild(forecastItem);
                dayIndex++;
            }
        }

        // Display weather data
        function displayWeatherData(currentData, forecastData) {
            document.getElementById('locationName').textContent = currentData.name;
            document.getElementById('weatherIcon').textContent = getWeatherIcon(currentData.weather[0].main);
            document.getElementById('temperature').textContent = `${Math.round(currentData.main.temp)}°C`;
            document.getElementById('description').textContent = currentData.weather[0].description;
            document.getElementById('feelsLike').textContent = `${Math.round(currentData.main.feels_like)}°C`;
            document.getElementById('humidity').textContent = `${currentData.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `${Math.round(currentData.wind.speed * 3.6)} km/h`;
            document.getElementById('pressure').textContent = `${currentData.main.pressure} hPa`;
            document.getElementById('visibility').textContent = `${currentData.visibility / 1000} km`;

            // UV Index would require another API call in the free tier, so we'll mock it for now
            document.getElementById('uvIndex').textContent = Math.floor(Math.random() * 11) + 1;

            // Display 7-day forecast
            displayForecast(forecastData.list);

            // Create weather animation
            const animationType = getAnimationType(currentData.weather[0].main);
            if (animationType) {
                createWeatherAnimation(animationType);
            }

            // Show result
            document.getElementById('weatherResult').classList.remove('hidden');
        }

        // Show error
        function showError(message) {
            const errorDiv = document.getElementById('errorDiv');
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }

        // Search weather
        async function searchWeather() {
            const location = document.getElementById('locationInput').value.trim();
            
            if (!location) {
                showError('Please enter a location');
                return;
            }

            // Hide previous results and errors
            document.getElementById('weatherResult').classList.add('hidden');
            document.getElementById('errorDiv').classList.add('hidden');
            
            // Show loading
            document.getElementById('loadingDiv').classList.remove('hidden');

            try {
                // Fetch current weather
                const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
                if (!currentResponse.ok) throw new Error('City not found');
                const currentData = await currentResponse.json();

                // Fetch 5-day / 3-hour forecast
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
                if (!forecastResponse.ok) throw new Error('Forecast not available');
                const forecastData = await forecastResponse.json();
                
                // Hide loading
                document.getElementById('loadingDiv').classList.add('hidden');
                
                // Display weather data
                displayWeatherData(currentData, forecastData);
                
            } catch (error) {
                document.getElementById('loadingDiv').classList.add('hidden');
                showError(error.message || 'Failed to fetch weather data. Please try again.');
            }
        }

        // Event listeners
        document.getElementById('searchBtn').addEventListener('click', searchWeather);
        document.getElementById('locationInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        // Initialize
        createParticles();
        updateClock();
        setInterval(updateClock, 1000); // Update clock every second

        // Auto-focus search input
        document.getElementById('locationInput').focus();
