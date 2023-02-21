//use query selector to grab all elements so that we can manipulate them
//Thank you DOM!
const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// event listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners

//Allows you to click on different categories and through the use of other methods, you can hide specific head/body components and show the one you really want to look at
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

//When submitted, get the value of what was typed and pass it through fetchAllSuperHero
const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);

// my api key => 2574992789309660
const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/2574992789309660/search/${searchText}`;
    try{
        //fetch the request, if it's successful, then show the list. 
        const response = await fetch(url);
        allDataTest = await response.json();
        if(allDataTest.response === 'success'){
            allData = allDataTest;
            // console.log(allData);
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

//go through the data and find the image and name to display in the search area
const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

// When the key is pressed up, it will do another search. This makes it so that the user can start typing and, as they type, new solutions come up. I believe we can get the same effect if we useState from react since it re-renders every time it changes. 
searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

// Lets the user click on one of the choices that pop up when typing a name
searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    console.log(allData);
    try{
        let singleData = allData.results.filter(singleData => {
            return searchId === singleData.id;
        })
        console.log(singleData);
        showSuperheroDetails(singleData);
        searchList.innerHTML = "";
    }
    catch(err){
        console.log(err);
    }
    
    
});



const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;

    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `;

    document.querySelector('.connections').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    <li>
        <span>relatives</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    `;
}