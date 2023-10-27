const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.conf
const { google } = require("googleapis");



const CLIENT_ID =
  "711196659668-4226pmq6cvsi7r02updpsrq7un4dd03d.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04ZkNhBSK1hh9CgYIARAAGAQSNwF-L9IrniFm0rM5d8OysTnq-C6sRNOLXmqx5H4tR4br27WNEf9tEH9Mb9cwMwwHAkYWD6aTcsg";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

async function sendMail(mailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'pfmovieshenry@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      }
    });
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const sendSuggestion = async (req, res) => {
  const { email, suggestion } = req.body;

 
  const mailOptions = {
    from: email,
    to: "pfmovieshenry@gmail.com", // Reemplaza con la dirección de correo electrónico a la que deseas enviar las sugerencias
    subject: 'Sugerencias para la aplicación',
    text: suggestion
  };

  try {
    const result = await sendMail(mailOptions);
    res.status(200).json({ message: 'Sugerencia enviada correctamente', result  });
  } catch (error) {
    console.error('Error al enviar la sugerencia', error);
    res.status(500).json({ error: 'Error al enviar la sugerencia' });
  }
};

module.exports = {
  sendSuggestion
};