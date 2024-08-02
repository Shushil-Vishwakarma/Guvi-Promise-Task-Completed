document.addEventListener('DOMContentLoaded', () => {
    const weatherElement = document.getElementById('weather-info');
    const newsListElement = document.getElementById('news-list');
    const jokeElement = document.getElementById('joke-text');
    const newJokeButton = document.getElementById('new-joke');

    const weatherApiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherApiKey}`;

    const newsApiKey = 'YOUR_NEWSAPI_KEY';
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

    const jokeUrl = 'https://official-joke-api.appspot.com/random_joke';

    // Fetch and display weather data
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            weatherElement.textContent = `Weather: ${weatherDescription}, Temperature: ${temperature}K`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherElement.textContent = 'Error loading weather data.';
        });

    // Fetch and display news data
    fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            newsListElement.innerHTML = '';
            articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.textContent = article.title;
                newsListElement.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
            newsListElement.innerHTML = '<li>Error loading news data.</li>';
        });

    // Fetch and display joke data
    function fetchJoke() {
        fetch(jokeUrl)
            .then(response => response.json())
            .then(data => {
                jokeElement.textContent = `${data.setup} - ${data.punchline}`;
            })
            .catch(error => {
                console.error('Error fetching joke data:', error);
                jokeElement.textContent = 'Error loading joke.';
            });
    }

    // Fetch an initial joke
    fetchJoke();

    // Add event listener to get a new joke
    newJokeButton.addEventListener('click', fetchJoke);
});
