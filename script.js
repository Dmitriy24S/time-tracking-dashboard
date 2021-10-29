const menuLinks = document.querySelectorAll(".user-card__menu-item");
const container = document.querySelector(".cards-container");

let timeframe = "weekly"; // default value

const timeframeText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

menuLinks.forEach((link) => {
  link.addEventListener("click", menuOnClick);
});

// --------- Functions

// highlight active menu link on click
function menuOnClick(event) {
  menuLinks.forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");
  timeframe = event.target.innerText.toLowerCase();
}

// highlight active menu link on page load
function highlightActiveMenu() {
  menuLinks.forEach((link) => {
    if (link.innerHTML.toLocaleLowerCase() === timeframe) {
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
              <h2>${title}</h2>
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
              <h1>${current}hrs</h1>
              <p>${timeframeText[timeframe]} - ${previous}</p>
            </div>
          </div>
        </section>
  `;
}

const fetchData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  //create cards
  data.forEach((element) => {
    container.insertAdjacentHTML("beforeend", createCard(element, timeframe));
  });
  highlightActiveMenu();
};

fetchData();
