// Import the necessary modules here
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL, // Your email
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD, // App password
      },
    });

    const logoUrl = `${process.env.APP_URL}/logo1-32230.png`; // APP_URL is your backend URL

    const emailContent = `
    <div style="max-width: 600px; margin: 0 auto; text-align: center; font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${logoUrl}" alt="Storefleet Logo" width="120" style="margin-bottom: 20px;" />
      <h2 style="color: #4A148C; font-size: 24px;">Welcome to Storefleet</h2>
      <p style="font-size: 16px; color: #333;">Hello, <strong>${user.name}</strong></p>
      <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
        Thank you for registering with Storefleet. We're excited to have you as a new member of our community.
      </p>
      <a href="${process.env.APP_URL}/get-started" style="display: inline-block; background-color: #4A148C; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Get Started
      </a>
      <br /><br />
      <p style="font-size: 12px; color: #777;">Best Regards,</p>
      <p style="font-size: 14px; font-weight: bold; color: #333;">Storefleet Team</p>
    </div>
  `;

    const mailOptions = {
      from: process.env.STORFLEET_SMPT_MAIL,
      to: user.email,
      subject: "Welcome to Our Platform!",
      html: emailContent,
    };
    console.log('send email' , user.email);
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

