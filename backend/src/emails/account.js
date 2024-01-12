const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dikshit20022003@outlook.com',
        subject: 'Thanks for joining.',
        text: `Welcome to the app ${name}`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dikshit20022003@outlook.com',
        subject: 'Deleting your account',
        text: `${name}, your account has been deleted.`
    })
}

module.exports = {sendWelcomeEmail, sendCancelEmail}