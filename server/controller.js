const locations = require('./db.json')
const destinations = require('./list.json')
let globalId = 1

module.exports = {

    getLocations: (req, res) => res.status(200).send(locations),
    calcRetireIncome: (req, res) => {
        let { principal, contribution, rate, years } = req.body;
        let futureValue = (principal * (Math.pow(1 + rate/12/100, 12*years))) + ((contribution*Math.pow(1+rate/12/100, 12*years)-1)/(rate/12))
        let drawdown = Math.floor(futureValue * 0.04)
        let annualIncome = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(drawdown)
       
        res.status(200).send(annualIncome)
        
    },
    updateItinerary: (req, res) => {
        let {name} = req.body 
        let newDestination = {
            id: globalId,
            name
        }
        destinations.push(newDestination)
        res.send(destinations);
        globalId++
    },
    deleteItinerary: (req, res) => {
        let {id} = req.params
        let index = destinations.findIndex(elem => elem.id === +id)
        destinations.splice(index, 1)
        res.status(200).send(destinations)
    }
}