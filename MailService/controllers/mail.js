const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

const testMail = async (req, res) => {
  let testaccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testaccount.user,
      pass: testaccount.pass,
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Successfully Register with us.", // plain text body
    html: "<b>Successfully Register with us.</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devwardule@gmail.com",
      pass: "nphrpxgtcttrwdvn",
    },
  });

  let mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: req.body.reg_id,
      intro: "Your booking is done!!",
      table: {
        data: [
          {
            item: req.body.itemName,
            quantity: req.body.quantity,
          },
        ],
      },
      outro: "Thank you for booking",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: "devwardule@gmail.com",
    to: req.body.email,
    subject: "Your booking at PICT Sports Department.",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  testMail,
  sendMail,
};
