const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config()
app.use(express.json())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

 const userRoutes = require('./routes/user.routes');

 app.use('/user',userRoutes);
 
 app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.name === req.user.name)) // doutfull
})

 function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.get('/', (req, res) => {
    res.json({ info: 'Node.js,Express, and Postgres API'})
})

app.listen(port,()=>{
    console.log('App running on port 3000')
})