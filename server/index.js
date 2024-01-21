import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'


dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json())


const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "butcher.voughtprime@gmail.com",
      pass: "omyy fkvp kuep wtmi",
    },
  });



const PORT = process.env.PORT;


mongoose.connect(process.env.MONGOURL)
.then((res) => app.listen(PORT, () => {console.log("App running at", PORT)}))
.catch((err) => console.log(err))

app.post("/send", async (req, res) => {
    
    const data = req.body;
    console.log(data.email)
    const mailOptions = {
        from: {
            name:"William Butcher",
            address: "butcher.voughtprime@gmail.com"
        },
        to: data.email,
        subject: "Hello MF",
        html: "<h2>Oi Cunt</h2>",
        // attachments: [
        //     {
        //         filename: 'test.pdf',
        //         path: path.join(__dirname, 'test.pdf'),
        //         contentType: 'application/pdf'
        //     }
        // ]
    }

    try {
        await sendMail(transporter, mailOptions);
        res.status(200).json("Email Send Successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})

const sendMail =  async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (error) {
        console.log(error)
    }
}

// sendMail(transporter, mailOptions)