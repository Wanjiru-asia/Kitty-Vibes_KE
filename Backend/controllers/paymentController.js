const axios = require('axios');

// STEP 1 - Get access token from Safaricom
const getAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
            headers: {
                Authorization: `Basic ${auth}`
            }
        }
    );

    return response.data.access_token;
};

// STEP 2 - Send STK push to customer phone
const stkPush = async (req, res) => {
    try {
        const { phone, amount, orderId } = req.body;

        const token = await getAccessToken();
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString('base64');

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: process.env.MPESA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: `Order_${orderId}`,
                TransactionDesc: 'KittyVibes Payment'
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// STEP 3 - Safaricom calls this after payment
const mpesaCallback = async (req, res) => {
    try {
        const callbackData = req.body?.Body?.stkCallback;

        if (!callbackData) {
            return res.status(400).json({ error: 'Invalid callback payload' });
        }

        if (callbackData.ResultCode !== 0) {
            return res.status(200).json({ message: 'Payment failed or cancelled' });
        }

        const metadataItems = callbackData.CallbackMetadata?.Item || [];
        const amount = metadataItems.find((item) => item.Name === 'Amount')?.Value;
        const mpesaReceiptNumber = metadataItems.find((item) => item.Name === 'MpesaReceiptNumber')?.Value;
        const phone = metadataItems.find((item) => item.Name === 'PhoneNumber')?.Value;

        console.log(`Payment received - Receipt: ${mpesaReceiptNumber}, Amount: ${amount}, Phone: ${phone}`);

        res.status(200).json({ message: 'Payment confirmed' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { stkPush, mpesaCallback };
