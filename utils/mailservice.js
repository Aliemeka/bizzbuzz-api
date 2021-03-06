const sendgridMail = require("@sendgrid/mail");
const { SENDGRID_KEY, TEMPLATE_ID } = require("./config");

sendgridMail.setApiKey(SENDGRID_KEY);
const templateId = TEMPLATE_ID;

const sendMail = async (email, message, action, url) => {
  const msg = {
    to: email,
    from: "emekaallison4@gmail.com",
    templateId,
    dynamic_template_data: {
      message,
      action,
      url,
    },
    hideWarnings: true,
  };

  // sendgridMail.send(msg, (error, result) => {
  //   if (error) {
  //     console.log("Sending failed");
  //   } else {
  //     if (result) console.log("Email sent!");
  //   }
  // });

  try{
    const result = await sendgridMail.send(msg);
    if(result){
      console.log("Email sent!")
    }
  }
  catch(error){
    console.log("Sending failed!")
  }
};

module.exports = sendMail;
