const nodemailer = require("nodemailer");
require('dotenv').config();
const dotenv = require("dotenv");
dotenv.conf
const { google } = require("googleapis");
const { CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN } = process.env;
// const CLIENT_ID =
//   "711196659668-4226pmq6cvsi7r02updpsrq7un4dd03d.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04ZkNhBSK1hh9CgYIARAAGAQSNwF-L9IrniFm0rM5d8OysTnq-C6sRNOLXmqx5H4tR4br27WNEf9tEH9Mb9cwMwwHAkYWD6aTcsg";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "pfmovieshenry@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: "ya29.a0AfB_byApZI1Mg0wRSXbwsgVsSBLaSi5XrWBx5gXGEuMPG7LSHhdzDGEw_QMMCyLwFhTfmvLFxKrUEVKxQ8jbTByiwd_rkq0-h_HHEModN-2qStzHLRPknJgxJ5PZiX0-NYX34R2C7vu_RgiIFk-R-wdeGkoqWAQ8vZ_daCgYKAXgSARASFQGOcNnC8MnBgyIPyyyEasgT--Q_VQ0171", // Puedes establecer esto en null por ahora
  },
});

async function sendMail(mailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessTok
    transporter.options.auth.accessToken = accessToken; // Establece el accessToken aquí
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
}

//async function sendMail (mailOptions) {
  //try {
    //const accessToken = await oAuth2Client.getAccessTok
    //const transporter = nodemailer.createTransport({
      //service: "gmail",
      //auth: {
        //type: "OAuth2",
        //user: "pfmovieshenry@gmail.com",
        //clientId: CLIENT_ID,
        //clientSecret: CLIENT_SECRET,
        //refreshToken: REFRESH_TOKEN,
        //accessToken: accessToken,
      //},
    //});
    //const result = await transporter.sendMail(mailOptions);
    //return result;
  //} catch (error) {
    //console.log(error);
//  }
//}

//sendMail()
  //.then((result) => res.status(200).send("enviado"))
  //.catch((error) => console.log(error.message));

//// modificacion

//const transporter = nodemailer.createTransport({
//service: 'gmail',
//secure: true,
//auth: {
//user: 'pfmovieshenry@gmail.com',
//pass: '4713347henry'
//}
//});

const sendSubscriptionConfirmation = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Confirmación de suscripción",
    text: "Gracias por suscribirte a nuestra web",
  };

  try {
    const respuesta = await sendMail(mailOptions); 
    res
      .status(200)
      .json({ message: "Correo de suscripción enviado correctamente" , respuesta});
    
  } catch (error) {
    console.error("Error al enviar el correo de suscripción", error);
    res.status(500).json({ error: "Error al enviar el correo de suscripción" });
  }
};


const sendMovieReleaseNotification = async (req, res, ) => {
  const { email, movieName } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "¡Nueva película en cartelera!",
    text: `La película ${movieName} acaba de estrenarse. ¡No te la pierdas!`,
  };

  try {
    const respuesta = await sendMail(mailOptions);
    res.status(200).json({
      message: "Notificación de estreno de película enviada correctamente",
      respuesta,
    });
  } catch (error) {
    console.error(
      "Error al enviar la notificación de estreno de película",
      error
    );
    res.status(500).json({
      error: "Error al enviar la notificación de estreno de película",
    });
  }
};

const sendPasswordChangeNotification = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Confirmación de cambio de contraseña",
    text: "Su contraseña ha sido cambiada recientemente. Si no realizó este cambio, comuníquese con nosotros.",
  };

  try {
   const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message: "Notificación de cambio de contraseña enviada correctamente", respuesta
      });
    
  } catch (error) {
    console.error(
      "Error al enviar la notificación de cambio de contraseña", 
      error
    );
    res
      .status(500)
      .json({
        error: "Error al enviar la notificación de cambio de contraseña",
      });
  }
};

const sendAccountValidationNotification = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Validación de cuenta de usuario",
    text: "Se requiere la validación de tu cuenta de Gmail para crear un usuario en nuestro sistema. Por favor, sigue las instrucciones para completar el proceso de validación.",
  };

  try {
    const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message: "Notificación de validación de cuenta enviada correctamente", respuesta
      });
    
  } catch (error) {
    console.error(
      "Error al enviar la notificación de validación de cuenta",
      error
    );
    res
      .status(500)
      .json({
        error: "Error al enviar la notificación de validación de cuenta",
      });
  }
};


const sendAccountBlockedNotification = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Cuenta bloqueada debido a intentos fallidos",
    text: "Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión. Por favor, restablece tu contraseña o ponte en contacto con el servicio de atención al cliente.",
  };

  try {
    const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message: "Notificación de cuenta bloqueada enviada correctamente", respuesta
      });
    
  } catch (error) {
    console.error("Error al enviar la notificación de cuenta bloqueada", error);
    res
      .status(500)
      .json({ error: "Error al enviar la notificación de cuenta bloqueada" });
  }
};

const sendDeviceLoginNotification = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Inicio de sesión detectado desde un dispositivo desconocido",
    text: "Se ha detectado un inicio de sesión en tu cuenta desde un dispositivo desconocido. Si no reconoces esta actividad, por favor cambia tu contraseña de inmediato.",
  };

  try {
    const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message:
          "Notificación de inicio de sesión desde otro dispositivo enviada correctamente",
      });
    
  } catch (error) {
    console.error(
      "Error al enviar la notificación de inicio de sesión desde otro dispositivo",
      error
    );
    res
      .status(500)
      .json({
        error:
          "Error al enviar la notificación de inicio de sesión desde otro dispositivo",
      });
  }
};

const sendPasswordResetSuccessNotification = async (req, res, ) => {
  const { email } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Restablecimiento de contraseña exitoso",
    text: "Tu contraseña ha sido restablecida con éxito. Si no realizaste este cambio, por favor contáctanos de inmediato.",
  };

  try {
    const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message:
          "Notificación de restablecimiento de contraseña enviada correctamente", respuesta
      });

  } catch (error) {
    console.error(
      "Error al enviar la notificación de restablecimiento de contraseña",
      error
    );
    res
      .status(500)
      .json({
        error:
          "Error al enviar la notificación de restablecimiento de contraseña",
      });
  }
};

const sendAccountDeletionNotification = async (req, res, ) => {
  const { email, reason } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Cuenta eliminada",
    text: `Tu cuenta ha sido eliminada. Razón: ${reason}. Si tienes alguna pregunta, no dudes en contactarnos.`,
  };

  try {
   const respuesta = await sendMail(mailOptions);
    res
      .status(200)
      .json({
        message: "Notificación de eliminación de cuenta enviada correctamente", respuesta
      });
    
  } catch (error) {
    console.error(
      "Error al enviar la notificación de eliminación de cuenta",
      error
    );
    res
      .status(500)
      .json({
        error: "Error al enviar la notificación de eliminación de cuenta",
      });
  }
};

const sendDonationNotification = async (req, res, ) => {
  const { email, amount } = req.body;
  const mailOptions = {
    from: "pfmovieshenry@gmail.com",
    to: email,
    subject: "Confirmación de donación realizada",
    text: `Gracias por tu donación de ${amount} dólares. Tu apoyo es invaluable para nosotros.`,
  };

  try {
  const respuesta =  await sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Notificación de donación enviada correctamente" , respuesta });

  } catch (error) {
    console.error("Error al enviar la notificación de donación", error);
    res
      .status(500)
      .json({ error: "Error al enviar la notificación de donación" });
  }
}; 

module.exports = {
  sendSubscriptionConfirmation,
  sendMovieReleaseNotification,
  sendPasswordChangeNotification,
  sendAccountValidationNotification,
  sendAccountBlockedNotification,
  sendDeviceLoginNotification,
  sendPasswordResetSuccessNotification,
  sendAccountDeletionNotification,
  sendDonationNotification,
};

