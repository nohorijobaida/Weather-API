// Name: Nohori Jobaida
// Id: 1931154

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const countryContainer = document.getElementById('countryContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

searchBtn.addEventListener('click', () => {
    const countryName = searchInput.value;
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
        renderCountry(data);
    })
    .catch(error => console.log(error));
});

function renderCountry(countryData) {
    countryContainer.innerHTML = '';
    countryData.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital}</p>
            <button class="details-btn" data-country="${country.name.common}">More details</button>
        `;
        countryContainer.appendChild(countryCard);
    });

    const detailsBtns = document.querySelectorAll('.details-btn');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const countryName = btn.dataset.country;
            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(countryData => {
                const country = countryData[0];
                fetch(`https://api.weatherapi.com/v1/current.json?key=58e3bc21acef4cdbb7c152326243103&q=${country.capital}`)

                .then(response => response.json())
                .then(weatherData => {
                    displayDetailsModal(country, weatherData);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        });
    });
}

function displayDetailsModal(country, weatherData) {
    modalContent.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <img src="${country.flags.png}" alt="${country.name.common} Flag" width="100">
        <h3>Weather</h3>
        <p>Temperature: ${weatherData.current.temp_c} °C</p>
        <p>Weather Condition: ${weatherData.current.condition.text}</p>
        <!-- Add other weather data here -->
    `;
    modal.style.display = 'block';
}

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
