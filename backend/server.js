const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())

let users = [{ id: 1, name: 'Juan', email: 'juan@test.com' }]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body }
  users.push(newUser)
  res.json(newUser)
})

app.delete('/api/users/:id', (req, res) => {
  users = users.filter((u) => u.id != req.params.id)
  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
