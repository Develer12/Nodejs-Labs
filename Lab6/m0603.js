const sendmail = require('nodemailer');

async function Send()
{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await sendmail.createTestAccount();

    let transporter = sendmail.createTransport(
    {
        service: 'mail.ru',
        auth: {
            user: 'E-mail', // generated ethereal user
            pass: "Password" // generated ethereal password
        }
    });

    let info = await transporter.sendMail(
    {
        from: '"Im"<cenia-v@mail.ru>', // sender address
        to: 'armagedondeveler@gmail.com', // list of receivers
        subject: 'Smelove', // Subject line
        text: 'Smelove))', // plain text body
        html: '<b>Hello, Smelove?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', sendmail.getTestMessageUrl(info));
}
Send().catch(console.error);

module.exports.Send = sendmail;
