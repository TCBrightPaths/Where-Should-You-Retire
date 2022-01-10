//pulling off the DOM
const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')
const res = document.querySelector('.res')
const listContainer = document.querySelector('#listContainer')

//endpoints
const baseURL = `http://localhost:4000/api/locations`
const otherURL = `http://localhost:4000/api/destinations`

//handling response
const locationsCallback = ({ data: locations }) => displayLocations(locations)
const destinationCallback = ({ data: destinations }) => displayList(destinations)
const errCallback = err => console.log(err)

//API calls
const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback)
const retireIncome = (body) => axios.post(baseURL, body).then(displayIncome).catch(errCallback)
const updateItinerary = (cityName) => axios.post(otherURL, {name: cityName}).then(destinationCallback).catch(errCallback)
const deleteDestination = (id) => axios.delete(`http://localhost:4000/api/destinations/${id}`).then(destinationCallback)

function submitHandler(e) {
    e.preventDefault()

    res.innerHTML = ``

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
    
   retireIncome(bodyObj) //calling create request for calculator feature

    principal.value = ''
    contribution.value = ''
    rate.value = ''
    years.value = ''
}

function createLocationCard(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    let {costLiving} = location
    costLiving = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(costLiving)
    
    //calling the create request for the list
    locationCard.innerHTML = `<img alt='location cover image' src=${location.imageURL} class="location-cover-image"/>
    <p class="city">${location.cityName}</p>
    <p class="location-cost">~${costLiving}/yr annual income required</p>
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
    income.classList.add('income')
    income.textContent = `You can expect an annual income of ${annualIncome} in retirement`
    result.appendChild(income)
    result.textContent = `Based on your savings rate, target retirement date, and a 4% safe withdrawal rate: ${income.textContent}.`
    res.appendChild(result)
}

function addList (destination) {
    let trip = document.createElement('li');
    let destinationName = document.createElement('span');
    destinationName.textContent = destination.name;
    trip.appendChild(destinationName);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => 
    //calling the delete request
    deleteDestination(destination.id)
    );
    trip.appendChild(deleteBtn);
    listContainer.appendChild(trip);
}

//calling the get request for the location tiles
getAllLocations()
form.addEventListener('submit', submitHandler)

