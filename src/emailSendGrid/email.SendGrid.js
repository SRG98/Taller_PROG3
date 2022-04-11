const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmation(customerName, orderNroSerie) {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
    <style>
      .responsive {
        width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <img src="https://hbomax-images.warnermediacdn.com/images/GXdRsewUPO5uAuwEAABEI/tileburnedin?size=1280x720&partner=hbomaxcom&v=022d83f970fc15c48e7ed6397989de11&language=es-419&host=art-gallery.api.hbo.com&w=Infinity"
    class="responsive"
    alt="">
  </body>
  </html>`
}

function getMessage(emailParams) {
  return {
    to: emailParams.toEmail,
    from: 'santiago.1701713773@ucaldas.edu.co',
    subject: 'Confirmacion pedido Serie Numero Serie',
    text: `Esta es la serie ${emailParams.customerName} y se muestra el poster y el numero de la serie ${emailParams.orderNroSerie}`,
    html: sendEmailConfirmationHTML(
      emailParams.customerName,
      emailParams.orderNroSerie
    )
  }
}

async function sendOrderSerie(emailParams) {
  try {
    await sgmail.send(getMessage(emailParams))
    return { message: 'Confirmacion del pedido recibido' }
  } catch (err) {
    const message = "No se pudo enviar la orden"
    console.error(message)
    console.error(err)
    if (err.response) console.error(err.response.body)
    return { message }
  }
}

(async () => {
  console.log('Se ha enviado el correo electronico')
  await sendOrderSerie()
})
module.exports = { sendOrderSerie }
