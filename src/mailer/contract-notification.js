const transporter = require('../mailer/mailer')

const sendContractNotification = async (senderEmail, receiverEmail, contractData) => {
	const { projectDescription, budget, currency, availableTime } = contractData

	const emailOptions = {
		from: 'ForDevs 👾',
		to: receiverEmail,
		subject: 'New Contract Request on ForDevs! 👾',
		text: 'You have received a new contract request on ForDevs.',
		html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Lexend', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fac5df;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #B30056;
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                color: #B30056;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                font-size: 12px;
                color: #454545;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h1>New Contract Request</h1>
            </div>
            <div class="content">
                <h2>Hello!</h2>
                <p>👋 You have received a new contract request from <strong>${senderEmail}</strong>.</p>
                <p><strong>Project Description:</strong> ${projectDescription}</p>
                <p><strong>Budget:</strong> ${budget} ${currency}</p>
                <p><strong>Available Time:</strong> ${availableTime}</p>
                <p>Please log in to your account to accept or reject the contract.</p>
                <p>Best regards,<br>The ForDevs Team 🥸</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ForDevs. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>
        `,
	}

	try {
		await transporter.sendMail(emailOptions)
		console.log('Contract notification sent to:', receiverEmail)
	} catch (error) {
		console.error('Error sending contract notification email:', error)
		throw new Error('Error sending contract notification email')
	}
}

module.exports = sendContractNotification
