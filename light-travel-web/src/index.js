import express from 'express'
import travelRouter from './routes/travel.js'

import 'dotenv/config'


const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('111!')
})

// 创建一个中间件
app.use('/api/travel',travelRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})