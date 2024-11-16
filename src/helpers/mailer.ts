import nodemailer from "nodemailer";
import User from "@/models/useModel";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log("The email type is", emailType);

    if (emailType === "VERIFY") {
      // await User.findByIdAndUpdate(userId, {
      //   verifyToken: hashedToken,
      //   verifyTokenExpiry: Date.now() + 3600000,
      // });
      await prisma.user.update({
        where: { userId },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      // await User.findByIdAndUpdate(userId, {
      //   forgotPasswordToken: hashedToken,
      //   forgotPasswordTokenExpiry: Date.now() + 3600000,
      // });
      await prisma.user.update({
        where: { userId },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    console.log("The enail is", email);

    const mailOptions1 = {
      from: "parthatharv2606@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyEmail?token=${hashedToken}
            </p>`,
    };

    const mailOptions2 = {
      from: "parthatharv2606@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/forgotPassword?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/forgotPassword?token=${hashedToken}
            </p>`,
    };

    let mailresponse;
    if (emailType === "VERIFY") {
      mailresponse = await transport.sendMail(mailOptions1);
    } else if (emailType === "RESET") {
      mailresponse = await transport.sendMail(mailOptions2);
    }
    return mailresponse;
  } catch (error: any) {
    console.log("caught error: ", error);
    throw new Error(error.message);
  }
};
