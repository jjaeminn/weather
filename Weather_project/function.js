
        // OpenWeatherMap API 키 (실제 사용 시 자신의 API 키로 교체해야 합니다)
        const apiKey = '4646ef1bb54e90827463f1f30a14b0ce';
        
        async function getWeather(city) {
            // 로딩 화면 표시
            document.getElementById('loading').style.display = 'block';
            document.getElementById('error').style.display = 'none';
            document.getElementById('weatherContainer').style.display = 'none';
            
            try {
                // API 요청
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${apiKey}&units=metric&lang=kr`);
                
                if (!response.ok) {
                    throw new Error('날씨 정보를 가져올 수 없습니다.');
                }
                
                const data = await response.json();
                
                // 가져온 날씨 데이터로 UI 업데이트
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
                document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
                
                // 날씨 아이콘 설정
                const iconCode = data.weather[0].icon;
                document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                
                // 날씨 컨테이너 표시
                document.getElementById('weatherContainer').style.display = 'block';
            } catch (error) {
                console.error('날씨 정보 요청 오류:', error);
                document.getElementById('error').style.display = 'block';
            } finally {
                // 로딩 화면 숨기기
                document.getElementById('loading').style.display = 'none';
            }
        }
   