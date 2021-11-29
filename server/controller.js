const locations = require('./db.json')
const destinations = require('./list.json')
let globalId = 1

module.exports = {

    getLocations: (req, res) => res.status(200).send(locations),
    calcRetireIncome: (req, res) => {
        let { principal, contribution, rate, years } = req.body;
        rate -= 3
        let compoundOneYear = Math.floor(principal + (principal * (Math.E ** (rate/100))))
        let yearlyGrowth = []
        while (yearlyGrowth.length < years) {
        yearlyGrowth.push(compoundOneYear)
        }
        let n = yearlyGrowth.pop()
        let drawdown = Math.floor(n * 0.04)
        let annualIncome = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(drawdown)
       
        res.status(200).send(annualIncome)
        
    },
    updateItinerary: (req, res) => {
        let { name } = req.body 
        let newDestination = {
            id: globalId,
            name
        }
        destinations.push(newDestination)
        res.send(destinations);
        globalId++
    },
    deleteItinerary: (req, res) => {
        let index = destinations.findIndex(elem => elem.id === +req.params.id)
        destinations.splice(index, 1)
        res.status(400).send(destinations)
    }
}