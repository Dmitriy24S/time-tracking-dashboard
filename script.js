const menuLinks = document.querySelectorAll(".user-card__menu-item");
const container = document.querySelector(".cards-container");

let data = {};

let timeframe = "weekly"; // default value

const timeframeText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

menuLinks.forEach((link) => {
  link.addEventListener("click", highlightMenuOnClick);
});

// --------- Functions

function highlightMenuOnClick(event) {
  menuLinks.forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");
  timeframe = event.target.innerText.toLowerCase();
  // update cards text on click
  updateCards(timeframe);
}

function highlightActiveMenu() {
  menuLinks.forEach((link) => {
    if (link.innerHTML.toLowerCase() === timeframe) {
      link.classList.add("active");
    }
  });
}

function createCard(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];

  return `
  <section class="card ${title.toLowerCase().replace(/\s/g, "-")}">
          <div class="card__info">
            <div class="card__top-row">
              <h2 class='card__category-title'>${title}</h2>
              <span>
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fill-rule="evenodd"
                    class="ellipsis"
                  />
                </svg>
              </span>
            </div>
            <div class="card__bottom-row">
              <h1 class='card__current-time'>${current}hrs</h1>
              <p class='card__previous-time'>${timeframeText[timeframe]} - ${previous}hrs</p>
            </div>
          </div>
        </section>`;
}

function updateCards(timeframe) {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const categoryTitle = card.querySelector(".card__category-title").innerText;
    const currentTimeElement = card.querySelector(".card__current-time");
    const previousTimeElement = card.querySelector(".card__previous-time");
    // get values from fetched data
    const currentTime = data[categoryTitle][timeframe]["current"];
    const previousTime = data[categoryTitle][timeframe]["previous"];
    // update text in cards:
    currentTimeElement.innerText = `${currentTime}hrs`;
    previousTimeElement.innerText = `${timeframeText[timeframe]} - ${previousTime}hrs`;
  });
}

const fetchData = async () => {
  const response = await fetch("./data.json");
  const jsonData = await response.json();
  //create cards on page load:
  jsonData.forEach((element) => {
    container.insertAdjacentHTML("beforeend", createCard(element, timeframe));
  });
  //convert array to dictionary
  jsonData.forEach((element) => {
    data[element.title] = element.timeframes;
  });
  highlightActiveMenu(); // highlight default selected menu on page load
};

fetchData(); // fetch data to load cards on page load
