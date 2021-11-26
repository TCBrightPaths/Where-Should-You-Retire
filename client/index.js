const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/houses`

const locationsCallback = ({ data: locations }) => displayLocations(locations)
const errCallback = err => console.log(err)

const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback)
const retireIncome = body => axios.post(baseURL, body).then(locationsCallback).catch(errCallback)
//const deleteHouse = id => axios.delete(`${baseURL}/${id}`).then(housesCallback).catch(errCallback)
//const updateHouse = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(housesCallback).catch(errCallback)

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
    <p class="city">${location.city}</p>
    <div class="btns-container">
        <button onclick="updateHouse(${location.id}, 'minus')">-</button>
        <p class="house-price">$${location.cost}</p>
        <button onclick="updateHouse(${location.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteHouse(${house.id})">delete</button>
    `


    locationsContainer.appendChild(locationCard)
}

function displayLocations(arr) {
    locationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLocationCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllLocations()