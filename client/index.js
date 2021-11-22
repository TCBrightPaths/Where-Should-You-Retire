//Destructuring elements from the DOM for first feature
let calcForm = document.querySelector('.calc-form')
let calculator = document.querySelector('#calculator')
let currentSavings = document.querySelector('#current-savings')

//Write a function that takes in four parameters(the current savings, the monthly contribution, the expected savings rate, and the time to retirement)

let retirementCalc = (s0, aug, percent, years) => {
    let s0 = currentSavings.textContent
    console.log(s0)
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
}

