const accountSid = 'AC82ebc58f432c7644889fdf2962f3624b';
const authToken = 'd1c3724d94977f235211b7a591f54d1f';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         twiml: '<Response><Say>Ahoy, World!</Say></Response>',
         to: '+923101041372',
         from: '+13123136678'
       })
      .then(call => console.log(call.sid));