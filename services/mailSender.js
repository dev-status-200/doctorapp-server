const Sib = require('sib-api-v3-sdk');
const key = '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';

const sendMail = (reciever, sub, content) => {
  const client = Sib.ApiClient.instance
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = key;
  const transEmailApi = new Sib.TransactionalEmailsApi();

  const sender = { email:'support@ticketsvalley.com', name:'Tickets Valley' }
  const recievers = [ { email:reciever, }, ];
  console.log(recievers)
  transEmailApi.sendTransacEmail({
    sender,
    to: recievers,
    subject:sub,
    htmlContent:content,
  }).then((x)=>console.log(x))
  .catch((e)=>console.log(e));
}

module.exports = sendMail;