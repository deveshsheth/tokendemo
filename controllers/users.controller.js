const responses = require('../utils/responses')
const pg = require('../pgdb')
const jwt = require("jsonwebtoken")

const createUsers = (req, res) => {
    const { name,email,password,gender } = req.body

    pg.query('INSERT INTO users (name,email,password,gender) VALUES ($1,$2,$3,$4)', [name,email,password,gender], (error) => {
        if (error) {
            throw error
        }
        //   response.status(201).send(`Role added with ID:  ${result.roleid}`)
        return responses.successfullyCreatedResponse(
            res,
            res.data,
            //res.json({ rolename : rolename }),
             createUsers,           
        )
    })
}

const loginUsers = (req, res) => {
    const { name,password } = req.body
    pg.query('SELECT * FROM users WHERE name=$1 and password=$2', [name,password], (error) => {
        if (error) {
            throw error
        }
        //   response.status(201).send(`Role added with ID:  ${result.roleid}`)
        return responses.successfullyCreatedResponse(
            res,
            res.data,
            //res.json({ rolename : rolename }),
            loginUsers,           
        )
    })
    const accessToken=jwt.sign({name,password},process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken : accessToken})

}

module.exports = {
    createUsers,
    loginUsers
}