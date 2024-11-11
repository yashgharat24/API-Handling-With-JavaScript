const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  console.log(filterByRegion.value);
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => {
      return res.json();
    })
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
            <img src=${country.flags.svg} alt="flag" />
            <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>
        `;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

document.addEventListener("DOMContentLoaded", (event) => {
  const themeChanger = document.querySelector(".theme-changer");
  const body = document.body;

  themeChanger.addEventListener("click", () => {
    if (body.classList.contains("white")) {
      body.classList.remove("white");
      body.classList.add("dark");
      themeChanger.innerHTML =
        '<i class="fa-regular fa-sun">&nbsp;&nbsp;</i>White Mode';
    } else {
      body.classList.remove("dark");
      body.classList.add("white");
      themeChanger.innerHTML =
        '<i class="fa-regular fa-moon">&nbsp;&nbsp;</i>Dark Mode';
    }
  });
});
