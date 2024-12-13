const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { name, phone, email, subject, message } = JSON.parse(event.body);

    const msg = {
        to: ['prathampatel0440@gmail.com', 'adam.kunz+inft@durhamcollege.ca'],
        from: 'prathampatel0440@gmail.com',
        subject: `[Contact Form] ${subject}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: 'Email sent successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Failed to send email',
        };
    }
};
