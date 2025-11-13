const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchFilter = document.querySelector(".search-filter input");
const clearFilter = document.querySelector(".clear-filter");

window.onload = document.body.style.visibility = "unset";

const fields = ["name", "flags", "population", "capital", "region"];
const url = `https://restcountries.com/v3.1/all?fields=${fields.join(",")}`; //fields limit is 10

fetch(url)
    .then(res => res.json())
    .then(countries => {
        renderCountries(countries);

        filterByRegion.addEventListener("change", function (e) {
            const filteredCountries = countries.filter(country =>
                country.region.toLowerCase() === e.target.value
            );
            renderCountries(filteredCountries);
            filterByRegion.blur();
            if (searchFilter.value) searchFilter.value = "";
            clearFilter.classList.add("active");
        });

        searchFilter.addEventListener("input", function (e) {
            const searchedCountries = countries.filter(country =>
                country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
            );
            renderCountries(searchedCountries);
        });

        clearFilter.addEventListener("click", function () {
            clearFilter.classList.remove("active");
            filterByRegion.value = "Filter by Region";
            filterByRegion.blur();
            if (searchFilter.value) searchFilter.value = "";
            renderCountries(countries);
        });
    })
    .catch(err => console.log(err));

function renderCountries(countries) {
    countriesContainer.innerHTML = "";

    if (!countries.length) {
        countriesContainer.innerHTML = "Not found!";
        return;
    }

    countries.forEach(country => {
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`;

        const cardHTML = `
                <div class="img-container"><img src="${country.flags.svg}" alt="${country.name.common}"></div>
                <div class="card-text">
                    <h3 class="country-name">${country.name.common}</h3>
                    <p class="population"><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                    <p class="region"><b>Region:</b> ${country.region}</p>
                    <p class="capital"><b>Capital:</b> ${country.capital?.[0]}</p>
                </div>`;
        countryCard.innerHTML = cardHTML;
        countriesContainer.append(countryCard);
    });
}