const fetch = require('node-fetch');
require('dotenv').config();
const Donation = require('../Models/DonationModel')

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = 'https://api.paypal.com';// Cambiar a 'https://api.paypal.com' para producción y "https://api-m.sandbox.paypal.com" para desarrollo

//Función encargada de obtener un token de acceso de PayPal. Se utiliza para autenticar las solicitudes a la API de PayPal.
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate Access Token:', error);
  }
};

//Función encargada de crear una orden de donación en PayPal
const createOrder = async (donationAmount) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",//Podemos cambiar la moneda 
          value: donationAmount.toString(),
        },
      },
    ],
  };
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  
  return handleResponse(response);
};

// const captureOrder = async (orderID) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
  
//   return handleResponse(response);
// };
  
//se utiliza para procesar la respuesta de las solicitudes a PayPal
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
  
//Controlador para procesar la solicitud post
const postDonation = async (req, res) => {
  
  console.log('Solicitud POST a /donate recibida');
  try {
    const {  total,createDate,name, email,status,address,id } = req.body; // El monto de la donación enviado desde el frontend
    const newDonation = new Donation({
      userId: "asdasfsdfñklnlnasdasd123123sda",
      amount: total,
      createDate: createDate,
      name: name,
      email: email,
      status:status,
      address: address,
      id: id
    });
    await newDonation.save();

    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Failed to process donation:', error);
    res.status(500).json({ error: 'Failed to process donation.' });
  }
};

///Visualizar donaciones de un usuario
const viewDonations = async (req, res) => {
  const userId = req.params.userId;
  try{
    const donations = await Donation.find({ userId});
    res.status(200).json(donations);
  }catch(error){
    console.error('Failed to retrieve donations:', error);
    res.status(500).json({ error: 'No se pudo obtenr las donaciones.' });
  }
};

//visualizar todas las donaciones 
const getAllDonations = async (req, res) => {
  try{
    const donations = await Donation.find();
    res.status(200).json(donations);
  }catch (error){
    res.status(500).json({error: "No se pudieron objetenr las donaciones "});
  }
}

module.exports = { postDonation, viewDonations, getAllDonations };