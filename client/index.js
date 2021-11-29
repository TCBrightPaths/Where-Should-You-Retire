const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')
const res = document.querySelector('.res')
const listContainer = document.querySelector('#listContainer')

const baseURL = `http://localhost:4000/api/locations`
const otherURL = `http://localhost:4000/api/destinations`

const locationsCallback = ({ data: locations }) => displayLocations(locations)
const destinationCallback = ({ data: destinations }) => displayList(destinations)
//const errCallback = err => console.log(err)

const getAllLocations = () => axios.get(baseURL).then(locationsCallback)//.catch(errCallback)
const retireIncome = (body) => axios.post(baseURL, body).then(displayIncome)//.catch(errCallback)
const updateItinerary = (cityName) => axios.post(otherURL, {name: cityName}).then(destinationCallback)//.catch(errCallback)
const deleteDestination = (id) => axios.delete(`http://localhost:4000/api/destinations/${id}`).then(destinationCallback)

function submitHandler(e) {
    e.preventDefault()

    let principal = document.querySelector('#principal')
    let contribution = document.querySelector('#contribution')
    let rate = document.querySelector('#rate')
    let years = document.querySelector('#years')

    let bodyObj = {
        principal: principal.value,
        contribution: contribution.value, 
        rate: rate.value,
        years: years.value
    }

   retireIncome(bodyObj)

    principal.value = ''
    contribution.value = ''
    rate.value = ''
    years.value = ''
}

function createLocationCard(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    locationCard.innerHTML = `<img alt='location cover image' src=${location.imageURL} class="location-cover-image"/>
    <p class="city">${location.cityName}</p>
    <p class="location-cost">~$${location.costLiving}/yr annual income required for a family of four.</p>
    <button onclick='updateItinerary("${location.cityName}");'>Add to List</button>
    `


    locationsContainer.appendChild(locationCard)
}

function displayLocations(arr) {
    locationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLocationCard(arr[i])
    }
}

function displayList(arr) {
    listContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        addList(arr[i])
    }
}

function displayIncome ({data: annualIncome}) {
    let result = document.createElement("h2")
    result.classList.add('income-display')
    let income = document.createElement('span')
    income.textContent = annualIncome
    result.appendChild(income)
    result.textContent = `Based on your savings rate, target retirement date, and a 4% safe withdrawal rate: You can expect an annual income of ${income.textContent}.`
    res.appendChild(result)
}

function addList (destination) {
    let trip = document.createElement('li');
    let destinationName = document.createElement('span');
    destinationName.textContent = destination.name;
    trip.appendChild(destinationName);
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => 
    deleteDestination(destination.id)
    );
    trip.appendChild(deleteBtn);
    listContainer.appendChild(trip);
}

getAllLocations()
form.addEventListener('submit', submitHandler)

