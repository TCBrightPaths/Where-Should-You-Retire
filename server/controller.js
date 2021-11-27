const locations = require('./db.json')

module.exports = {

    getLocations: (req, res) => res.status(200).send(locations),
    calcRetireIncome: (req, res) => {
        let { principal, contribution, rate, years } = req.body;
        let compoundOneYear = Math.floor(principal * (Math.E ** (rate/100))) + contribution
        let yearlyGrowth = []
        while (yearlyGrowth.length < years) {
        yearlyGrowth.push(compoundOneYear)
        }
        let n = yearlyGrowth[yearlyGrowth-1]
        let drawdown = Math.floor(n * 0.04)
       
        res.send(locations)
        // res.send(locations.filter( (locations) => {
        //     let retirementLocations = []
        
        //     for (let i in locations) {
        //         let {costLiving} = locations
        //         if(drawdown < costLiving) {
        //             alert(`You haven't saved enough for retirement! Consider saving at least 5% of your annual income in your 401k or IRA for a healthly income in retirment.`)
        //         } else if(drawdown >= costLiving) {
        //             retirementLocations.push(locations[i])
        //         }
        //     }
            
        //     return retirementLocations
        // }))        
    }
        

  
}