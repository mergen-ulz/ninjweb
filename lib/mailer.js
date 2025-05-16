import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async ({ to, name, programTitle, startDate, endDate }) => {
  const formattedStart = new Date(startDate).toLocaleDateString("en-CA");
  const formattedEnd = new Date(endDate).toLocaleDateString("en-CA");
  const cancelUrl = `https://ninj-web.vercel.app//cancel/${registrationId}`;


  await transporter.sendMail({
    from: `"Ninj Retreat Center" <${process.env.EMAIL_USER}>`,
    to,
    subject: `You're Registered for ${programTitle}! 🧘`,
    html: `
    <div style="font-family: sans-serif; background: #f7f5f2; padding: 32px; border-radius: 8px; max-width: 600px; margin: auto;">
      
      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://ninj-web.vercel.app/images/logo.png" alt="Ninj Retreat Center" style="height: 60px;" />
      </div>
  
      <!-- Header Banner -->
      <div style="background-color: #152C5B; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">Амжилттай бүртгэгдлээ!</h2>
        <p style="margin: 0; font-size: 16px;">Нинж Оюун Сувилахуйн Төвийг сонгосонд баярлалаа</p>
      </div>
  
      <!-- Message -->
      <div style="padding: 24px 12px;">
        <p style="font-size: 16px;">Сайн байна уу, <strong>${name}</strong>,</p>
        <p style="font-size: 15px;">
          <strong>${programTitle}</strong> хөтөлбөрт амжилттай бүртгүүлсэнд баяр хүргэе.
        </p>
        <p style="font-size: 15px;">📅 <strong>${formattedStart}</strong> -с <strong>${formattedEnd}</strong> хүртэл</p>
  
        <p style="margin-top: 24px; font-size: 15px;">
          Манай баг тун удахгүй тантай холбогдох болно. Асуух зүйл байвал бидэнтэй холбогдоно уу.
        </p>
      </div>
  
      <!-- Cancel Link -->
<p style="text-align:center; margin-top: 16px;">
  <a href="${cancelUrl}" style="color: #BB2D3B; text-decoration: underline;">
    Бүртгэлээ цуцлах
  </a>
</p>

  
      <!-- Contact Button -->
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://ninj-web.vercel.app/contact" style="background-color: #107FBB; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Холбогдох
        </a>
      </div>
  
      <!-- Footer -->
      <hr style="margin-top: 24px;" />
      <p style="font-size: 13px; color: #999; text-align: center;">
        Нинж Бясалгалын Төв · Улаанбаатар, Монгол · +976-12345678
      </p>
    </div>
  `

  });
};
