const nodemailer = require(`nodemailer`);

module.exports = async (email, subject, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.SENDER,
        pass: process.env.SENDER_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: subject,
      html: template,
    });
    console.log(`email sent successfully`);
  } catch (error) {
    console.log(`email not sent`);
    console.log(error);
  }
};
