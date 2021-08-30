import express from 'express'


const app = express()
app.listen(3333, ()=> {
  console.log('server on')
})


app.get('/', (req, res) => {
  return res.json({message: 'server on'})
})
