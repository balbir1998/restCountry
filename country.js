const flagImg = document.querySelector(".country-details img");
const countryTitle = document.querySelector(".country-title");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries-name");
const darkModeBtn = document.querySelector(".dark-mode");

window.onload = document.body.style.visibility = "unset";

const countryName = new URLSearchParams(location.search).get("name");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => renderCountryDetails(country))
    .catch(err => console.log(err));

function renderCountryDetails(country) {
    flagImg.src = country.flags.svg;
    flagImg.setAttribute("alt", country.name.common);
    countryTitle.innerText = country.name.common;
    population.innerText = country.population.toLocaleString('en-IN');
    region.innerText = country.region;
    subRegion.innerText = country.subregion || "unknown";
    capital.innerText = country.capital?.join(", ") || "unknown";
    domain.innerText = country.tld.join(", ");

    if (country.name.nativeName) {
        nativeName.innerText = country.name.nativeName[Object.keys(country.name.nativeName)[0]].common;;
    } else {
        nativeName.innerText = country.name.common;

    }

    if (country.currencies) {
        currency.innerText = Object.entries(country.currencies).map(el => el[1].name).join(", ");
    } else {
        currency.innerText = "unkown";
    }

    if (country.languages) {
        languages.innerText = Object.values(country.languages).join(", ");
    } else {
        languages.innerText = "unknown";
    }

    if (country.borders) {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders?.join(",")}`)
            .then(res => res.json())
            .then(countriesList => {
                countriesList.forEach(country => {
                    const a = document.createElement("a");
                    a.innerText = country.name.common;
                    a.href = `/country.html?name=${country.name.common}`;
                    borderCountries.appendChild(a);
                });
            })
            .catch(err => console.log(err));
    } else {
        const span = document.createElement("span")
        span.innerText = "unknown";
        borderCountries.appendChild(span);
    }
}

