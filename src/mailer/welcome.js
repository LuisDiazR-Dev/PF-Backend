const transporter = require('../mailer/mailer')

const welcome = async (email) => {
	console.log(email + ' console de email welcome')
	try {
		await transporter.sendMail({
			from: 'ForDevs 👾',
			to: email,
			subject: 'Welcome to ForDevs! 👾',
			text: 'Welcome to ForDevs! We are excited to have you join our community.',
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
                    <h1>Welcome to ForDevs!</h1>
                </div>
                <div class="content">
                    <h2>Hello and Welcome!</h2>
                    <p>👋 Thank you for joining <strong>ForDevs</strong>! We are excited to have you as part of our community. Here's what you can do as a member:</p>
                    <ul>
                        <li>🔥 Explore our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">tutorials</a> to learn new skills.</li>
                        <li>💬 Join our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">community forums</a> and connect with other developers.</li>
                        <li>📚 Access our <a href="https://pf-fordevs.vercel.app/" style="color: #db046c;">resources</a> to enhance your learning experience.</li>
                    </ul>
                    <p>If you have any questions or need assistance, please reach out to our support team at <a href="mailto:support@example.com" style="color: #007BFF;">support@example.com</a>.</p>
                    <p>Happy coding! 💻 </p>
                    <p>Best regards,<br>The ForDevs Team 🥸</p>
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

module.exports = welcome
