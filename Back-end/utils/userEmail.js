const nodemailer = require("nodemailer");

const sendEmail = async (userEmail, ProductArray) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const productDetails = ProductArray.map((product, index) =>
    `${index+1}. Name: ${product.name}. Price: ${product.price}. Quantity: ${product.quantity}`
);


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Payment Successful",
            text: `Thank you for your payment! \n\n 
                    Your order has been received. \n\n
                    Here are the details of your order:\n\n 
                    ${productDetails.join("\n")}\n\n 
                    We will notify you once your order is shipped.\n\n 
                    Thank you for shopping with us!`,
        };

        try{
            await transporter.sendMail(mailOptions);
            console.log("Email server is ready to send emails");
        }
        catch (error) {
            console.error("Error verifying email server:", error);
            throw new Error("Email server verification failed");
        }
}

module.exports = { sendEmail };