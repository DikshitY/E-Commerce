const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendResetPasswordMail = (email, _id, token) => {
    sgMail.send({
        to: email,
        from: 'dikshit20022003@outlook.com',
        subject: 'Reset Password Link',
        text: `http://localhost:5173/resetpassword/${_id}/${token}`
    })
}

module.exports = {sendResetPasswordMail}