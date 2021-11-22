//Destructuring elements from the DOM for first feature
let calcBtn = document.querySelector('#calcBtn')
let form = document.querySelector('.calc-form')
//Write a function that processes the values taken from the dom
let calculate = (event) => {
    event.preventDefault();
    let s0 = document.querySelector('#current-savings').value
    let aug = document.querySelector('#monthly-aug').value    
    let percent = document.querySelector('#roi').value
    let years = document.querySelector('#years').value
    let yearlyGrowth = []
    percent = percent/100 + 1
    s0 = (s0 + (aug * 12)) * percent
    while (yearlyGrowth.length < years) {
        yearlyGrowth.push(s0)
    }
    let n = yearlyGrowth[yearlyGrowth.length-1]
    let result = document.createElement('h2')
    result.textContent = `In ${years} years you can expect to have a total of $${n} saved for retirement!`
    form.appendChild(result)
}
//Write a function that takes in four parameters(the current savings, the monthly contribution, the expected savings rate, and the time to retirement)

//let retirementCalc = (s0, aug, percent, years) => {
    //s0 = 
    //create an array to hold yearlyGrowth
    //given a starting s0= currentSavings
    //given a percent = percent/100 + 1
    //given an aug = 50
    //let p0 += (p0*percent) + aug
    //push that number to an array
    //keep adding to p0 until p0 <= p, then stop

    //let n = the last index of the array with the number of years needed to get a population greater or equal to p
    //console.log(n)
    //return the total amount saved after years
//}

calcBtn.addEventListener('click', calculate)