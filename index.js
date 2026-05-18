/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Current game object
        const game = games[i];

        // Create a new div element and add the class game-card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // Step 4: Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }

}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal with a dollar sign and local formatting
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container
// Step 1: Use filter or reduce to sum the number of unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Format totalRaised with commas using toLocaleString()
const formattedTotal = totalPledged.toLocaleString();

// Step 3: Create template string with ternary operator for correct grammar
const totalGames = GAMES_JSON.length;
const displayStr = `A total of $${formattedTotal} has been raised for ${totalGames} games. Currently, ${unfundedCount} game${unfundedCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund these amazing games!`;

// Step 4: Append the new paragraph to descriptionContainer
// descriptionContainer is already defined above
if (descriptionContainer) {
    const paragraph = document.createElement("p");
    paragraph.textContent = displayStr;
    descriptionContainer.appendChild(paragraph);
}

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Step 1 & 2: Calculate and display the top 2 most funded games

// First, sort the games by pledged amount (highest to lowest)
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Use destructuring + spread to grab first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Step 2: Display the top funded game in firstGameContainer
if (firstGameContainer) {
    const gameElement = document.createElement("p");
    gameElement.textContent = firstGame.name;
    firstGameContainer.appendChild(gameElement);
}

// Display the second most funded game in secondGameContainer
if (secondGameContainer) {
    const gameElement = document.createElement("p");
    gameElement.textContent = secondGame.name;
    secondGameContainer.appendChild(gameElement);
}

// Search functionality
function searchGames() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filtered = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));
    deleteChildElements(gamesContainer);
    addGamesToPage(filtered);
}

// Add event listener to search button
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
    searchBtn.addEventListener("click", searchGames);
}