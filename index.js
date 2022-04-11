const sgmail = require('@sendgrid/mail')
const sgmailSendGrid = require('./src/emailSendGrid/email.SendGrid')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handler')

const routerApi = require('./src/routes')
const app = express()

// TWILIO
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.TWILIO_AUTH_TOKEN
const twilio_client = require('twilio')(accountSID, authtoken)

twilio_client.messages
  .create({
    body: 'Prueba de twilio. Programacion III Universidad de Caldas',
    from: "+12295980814",
    to: "+573113974978"
  }).then(message => console.log(message.sid))

// SENDGRID
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/api/v1/sendGird', async (req, res, next) => {
  try {
    res.json(await sgmailSendGrid.sendOrderSerie(req.body))
  } catch (error) {
    next(error)
  }
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({message:err.message})
  return
})

app.listen(port, () => console.log("Active port", port))

mongoose
     .connect(process.env.MONGODB_CONNETION_STRING)
   .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error))


app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

routerApi(app)
