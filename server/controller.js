require('dotenv').config()
const { CONNECTION_STRING } = process.env

const Sequelize = require('sequelize')

let sequelize = new Sequelize (CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
}) 

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists locations;

            CREATE TABLE locations (
                city_id SERIAL PRIMARY KEY,
                city_name VARCHAR(255),
                country_name VARCHAR(255),
                cost_living INTEGER,
                
            );

            INSERT INTO locations (city_name, country_name, cost_living)
            VALUES ('Buenos Aires','Argentina', 24000),
            ('Sydney','Australia', 82000),
            ('Santiago','Chile', 30000),
            ('Hangzhou','China', 34000),
            ('Bogota','Colombia', 21000),
            ('Munich','Germany',42000),            
            ('Bali','Indonesia', 25000),
            ('Dublin','Ireland', 45000),
            ('Tokyo','Japan', 51000),
            ('Mexico City','Mexico', 22000),
            ('Lisbon','Portugal', 38000),
            ('Belgrade','Serbia', 20000),
            ('Dakar','Senegal', 30000),
            ('Singapore','Singapore', 60000),
            ('Chiang Mai','Thailand', 22000),
            ('London','United Kingdom', 50000),
            ('Lafayette,LA','United States', 65000),
            ('Montevideo','Uruguay', 28000),
            ('Hanoi','Vietnam', 20000),
            
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
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
        // sequelize.query('
        //     SELECT * FROM locations
        //     WHERE cost_living <= ${drawdown}
        // ').
        res.send(locations);
    }    
}