const transporter = require('../mailer/mailer')

const youArePremium = async (payment) => {
    const email = payment || payment.data.emailUser
    console.log(payment)
	try {
		await transporter.sendMail({
			from: "ForDevs 👾",
			to: email,
			subject: 'Thank You for Subscribing to ForDevs Premium! 👾 ',
			text: 'Thank you for subscribing to ForDevs Premium. You now have access to all our premium features.',
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
            <h1>Welcome to ForDevs Premium!</h1>
        </div>
        <div class="content">
            <h2>Hi there!</h2>
            <p>👋 Thank you for subscribing to <strong>ForDevs Premium</strong>! We are thrilled to have you on board as a premium member. You now have access to all our exclusive premium features designed to boost your development skills.</p>
            <p>Here's what you can do next:</p>
            <ul>
                <li>🔥 Explore our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">premium tutorials</a> to master new skills.</li>
                <li>💬 Engage in our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">premium community forums</a> and connect with other experts.</li>
                <li>📚 Utilize our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">premium resources</a> tailored for advanced learning.</li>
            </ul>
            <p>If you have any questions or need assistance, please reach out to our support team at <a href="mailto:support@example.com" style="color: #007BFF;">support@example.com</a>.</p>
            <p>Happy coding! 💻 </p>
            <p>Best regards,<br>The ForDevs Team 🥸 </p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ForDevs. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>
    `,
		})

		console.log('Message sent:')
	} catch (error) {
		console.log(error)
	}
}

module.exports = youArePremium
