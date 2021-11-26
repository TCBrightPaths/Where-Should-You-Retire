const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/cities`

const locationsCallback = ({ data: locations }) => displayLocations(locations)
const errCallback = err => console.log(err)

const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback)
const retireIncome = body => axios.post(baseURL, body).then(locationsCallback).catch(errCallback)


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
    
      
        <p class="location-cost">$${location.cost}</p>
   
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

