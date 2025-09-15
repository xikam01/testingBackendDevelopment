const { PrismaClient, prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return Jwt.sign({ user }, process.env.Jwt_Sec, {
    expiresIn: "4d",
  });
};

const Registertionuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username, !email, !password)) {
      returnres.status(400).json({
        Message: "plePlease Provide Datasas",
        isSuccess: false,
      });
    }
    //cheking email repiting
    const chekingEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (chekingEmail) {
      return res.status(400).json({ Message: "email is alredy using" });
    }

    //  secret passwword

    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(password, salt);

    const usercreate = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
    });
    res.json({
      user: { ...usercreate, Message: "Success" },
    });
  } catch (error) {
    console.log();
  }
};




//====================================================<<login>==========(⊙_⊙;)
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ Message: "provide information" });
    }

    const sameEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!sameEmail) {
      return res.status(400).json({ Message: " worng credentailsC" });
    }

    const unhiddenpassword = bcrypt.compareSync(password, user.password);

    if (unhiddenpassword) {
      const Token = generateToken(user.id);

      const result = {
        ID: user.id,
        USERNAME: user.username,
        EMAIL: user.email,
        Token,
      };

      res.json.status(200).json({
        Message: "You are login",
        result: { ...result },
      });
    }
  } catch (error) {}
};






module.exports = {
  Registertionuser,
  userLogin,
};
