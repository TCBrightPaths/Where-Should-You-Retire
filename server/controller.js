
const locations = require('./db.json');

module.exports = {
    getHouses: (req, res) => res.status(200).send(locations),
    calcRetireIncome: (req, res) => {
        let { principal, contribution, rate, years } = req.body;
        let compoundOneYear = Math.floor(principal * (Math.E ** (rate/100))) + contribution
        let yearlyGrowth = []
        while (yearlyGrowth.length < years) {
        yearlyGrowth.push(compoundOneYear)
        }
        let n = yearlyGrowth[yearlyGrowth-1]
        let drawdown = Math.floor(n * 0.04)
        // sequelize.query('
        //     SELECT * FROM locations
        //     WHERE cost_living <= ${drawdown}
        // ').
        res.send(houses);
    }    
}