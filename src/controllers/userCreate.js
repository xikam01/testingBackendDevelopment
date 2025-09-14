const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Registertionuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username, !email, !password)) {
      returnres.status(400).json({
        Message: "plePlease Provide Datasas",
        isSuccess: false,
      });
    }

const chekingEmail = await prisma.user.findFirst({
  where: {
    email: email,
  },
});

  if(chekingEmail) {
    return res.status(400).json({ Message: "email is alredy using" });
  }

  const usercreate = await prisma.user.create({
    data:{
        username:username,
        email:email,
        password:password
    }
  })
  res.json({
    user: { ...usercreate, Message:"Success"},
  });

  } catch (error) {
    console.log()
  }
};






module.exports={
    Registertionuser
}