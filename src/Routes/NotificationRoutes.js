const express = require('express');
const router = express.Router();
const mailController = require('../Controllers/MailController');
// const pushController = require('../Controllers/pushController');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
//const webpush = require('web-push');

//router.post("/subscribe",  pushController.sendSubscriptionNotification);
router.post("/movie-release",  mailController.sendMovieReleaseNotification);
router.post("/password-change",  mailController.sendPasswordChangeNotification);
router.post("/account-validation", mailController.sendAccountValidationNotification);
router.post("/validation", mailController.sendSubscriptionConfirmation)
router.post("/account-blocked", mailController.sendAccountBlockedNotification);
router.post("/device-login", mailController.sendDeviceLoginNotification);
router.post("/password-reset-success", mailController.sendPasswordResetSuccessNotification);
router.post("/account-deletion", mailController.sendAccountDeletionNotification);
router.post("/donation", mailController.sendDonationNotification);



//const CLIENT_ID = "711196659668-4226pmq6cvsi7r02updpsrq7un4dd03d.apps.googleusercontent.com"
//const CLIENT_SECRET = "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"
//const REDIRECT_URI ="https://developers.google.com/oauthplayground"
//const REFRESH_TOKEN = "1//04qp_3DLraWmvCgYIARAAGAQSNwF-L9IraSVwxT1JSwiaISiysDIOHHbRxboKHOB48LIV7QNIU10qFpx1USMukhq8ihM5LTRKYkI"

//const oAuth2Client=new google.auth.OAuth2(
  //  CLIENT_ID, 
   // CLIENT_SECRET, 
   // REDIRECT_URI);

   // oAuth2Client.setCredentials({
    //    refresh_token: REFRESH_TOKEN
  //  });

   // async function sendMail(req, res) {
   //    try {
    //    const accessToken = await oAuth2Client.getAccessToken()
    //   const transporter = nodemailer.createTransport({
    //    service: "gmail",
    //    auth:{ 
      //      type: "OAuth2",
        //    user: "pfmovieshenry@gmail.com",
         //   clientId: CLIENT_ID,
        //    clientSecret: CLIENT_SECRET,
         //   accessToken: accessToken,
     //   },
       
  //  })
    //const mailOptions = {
     //   from: "mailto:pfmovieshenry@gmail.com",
      //  to: "pfmovieshenry@gmail.com",
     //   subject: "Nodemailerprueba",
      //  text: "prueba envio mail"
  //  };
   // const result = await transporter.sendMail(mailOptions);
   // return result;
    //   } catch (error) {
     //   console.log(error);
        
    //   }};

     //  sendMail()
    //   .then(result => res.status(200).send("enviado"))
     //  .catch((error) => console.log(error.message));

module.exports = router;


