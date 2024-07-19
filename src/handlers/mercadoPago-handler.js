const createPreference = require('../controllers/mercadoPago-controller')
const { getUserByIdController } = require('../controllers/users-controller')
const { User, Plan } = require('../db')

const transporter = require('../mailer')

const mercadoPagoPreference = async (req, res) => {
	const { title, quantity, unit_price, id } = req.body

	try {
		const loggedUser = await getUserByIdController(id)
		const userId = loggedUser.id
		if (!userId) {
			return res.status(400).json({ message: 'User not found ' })
		}
		const response = await createPreference(title, quantity, unit_price, userId)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
const mercadoPagoNotification = async (req, res) => {
	try {
		const payment = req.body
		console.log(payment)
		if (payment.type === 'payment' && payment.data.status === 'approved') {
			const userId = payment.data.external_reference
			const user = await User.findByPk(userId)
			const premiumPlan = await Plan.findOne({ where: { planName: 'Premium' } })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			user.planName = premiumPlan.planName
			await user.save()

			try {
				await transporter.sendMail({
					from: '"ForDevs 👾  " <max.smp17@gmail.com>',
					to: 'ibarra.gl.2017@gmail.com, max.smp17@gmail.com, mikaiha888@gmail.com',
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
                    background-color: #ffffff;
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
                    color: #007BFF;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #999999;
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
                        <li>🔥 Explore our <a href="https://pf-fordevs.vercel.app/" style="color: #007BFF;">premium tutorials</a> to master new skills.</li>
                        <li>💬 Engage in our <a href="https://pf-fordevs.vercel.app/" style="color: #007BFF;">premium community forums</a> and connect with other experts.</li>
                        <li>📚 Utilize our <a href="https://pf-fordevs.vercel.app/" style="color: #007BFF;">premium resources</a> tailored for advanced learning.</li>
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
    `, // html body
				})

				console.log('Message sent: %s')
			} catch (error) {
				console.log(error)
			}

			res.status(200).json({ message: 'User updated to premium' })
		} else {
			res.status(200).json({ message: 'Payment not approved or not a payment type' })
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	mercadoPagoPreference,
	mercadoPagoNotification,
}
