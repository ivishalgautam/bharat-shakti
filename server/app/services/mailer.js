import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import ejs from "ejs";

// Create transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "8fdb80001@smtp-brevo.com",
    pass: "8Z4HVdNgtwshnb9v",
  },
});

// Function to send a simple email
async function sendSimpleEmail() {
  try {
    const mailOptions = {
      from: '"Bharat Shakti Tenders" <no-reply@bharatshaktitenders.com>',
      to: "vishal.gautam.5812@gmail.com",
      subject: "Hello from Brevo + Nodemailer",
      text: "This is a plain text email sent via Brevo SMTP!",
      html: "<p>This is an <b>HTML email</b> sent via Brevo SMTP!</p>",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    // throw error;
  }
}

// Function to send email with attachments
async function sendEmailWithAttachment() {
  try {
    const mailOptions = {
      from: '"Your App Name" <your-email@domain.com>',
      to: "recipient@example.com",
      subject: "Email with Attachment",
      html: `
        <h2>Hello!</h2>
        <p>This email contains an attachment.</p>
        <p>Best regards,<br>Your Team</p>
      `,
      attachments: [
        {
          filename: "document.pdf",
          path: "./files/document.pdf", // file path
        },
        {
          filename: "image.png",
          content: Buffer.from("base64-encoded-content", "base64"),
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email with attachment sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending email with attachment:", error);
    // throw error;
  }
}

// Function to send bulk emails
async function sendBulkEmails(recipients) {
  const promises = recipients.map(async (recipient) => {
    const mailOptions = {
      from: '"Your App Name" <your-email@domain.com>',
      to: recipient.email,
      subject: `Hello ${recipient.name}!`,
      html: `
        <h2>Hi ${recipient.name}!</h2>
        <p>This is a personalized email sent to you.</p>
        <p>Thank you for being our valued customer!</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient.email}`);
      return {
        success: true,
        email: recipient.email,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error(
        `Failed to send email to ${recipient.email}:`,
        error.message
      );
      return { success: false, email: recipient.email, error: error.message };
    }
  });

  return await Promise.allSettled(promises);
}

// Function to send transactional email (e.g., welcome email)
async function sendWelcomeEmail(userEmail, fullname) {
  try {
    const templatePath = path.join(process.cwd(), "views", "welcome.ejs");
    const welcomeTemplate = fs.readFileSync(templatePath, "utf-8");

    const template = ejs.render(welcomeTemplate, {
      fullname: fullname,
    });

    const mailOptions = {
      from: '"Bharat Shakti Tenders" <no-reply@bharatshaktitenders.com>',
      to: userEmail,
      subject:
        "Welcome to BharatShaktiTenders.com – Your Gateway to Government Tenders",
      html: template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // throw error;
  }
}

async function sendTenderReminderEmail({ userEmail, fullname, tenders = [] }) {
  try {
    const temapletePath = fs.readFileSync(
      path.join(process.cwd(), "views", "tender-reminder.ejs"),
      "utf-8"
    );

    const template = ejs.render(temapletePath, {
      fullname: fullname,
      tenders: tenders,
    });

    const mailOptions = {
      from: '"Bharat Shakti Tenders" <no-reply@bharatshaktitenders.com>',
      to: userEmail,
      subject: "⏰ Hurry! Your Favourite Tender is Closing in 5 Days",
      html: template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Tender reminder mail sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // throw error;
  }
}

const sendApplicationStatusUpdateEmail = async ({
  email,
  fullname,
  application_id,
  bid_number,
  status,
}) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "views",
      "application-status-update.ejs"
    );
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    const html = ejs.render(templateContent, {
      fullname,
      application_id,
      bid_number,
      status,
    });
    const mailOptions = {
      from: `"Bharat Shakti Tenders" <no-reply@bharatshaktitenders.com>`,
      to: email,
      subject: "Your Application Status Has Been Updated",
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Application status change mail sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending application status change email:", error);
  }
};

const sendInquiryEmail = async (toEmail, data) => {
  try {
    const templatePath = path.join(process.cwd(), "views", "inquiry.ejs");
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    const html = ejs.render(templateContent, {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      inquiry_type: data.inquiry_type,
      message: data.message,
    });
    const mailOptions = {
      from: `"Bharat Shakti Tenders" <no-reply@bharatshaktitenders.com>`,
      to: toEmail,
      subject: `New Inquiry Received from ${data.name}`,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Inquiry mail sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending inquiry mail:", error);
  }
};

export const Brevo = {
  transporter: transporter,
  sendSimpleEmail: sendSimpleEmail,
  sendEmailWithAttachment: sendEmailWithAttachment,
  sendBulkEmails: sendBulkEmails,
  sendWelcomeEmail: sendWelcomeEmail,
  sendTenderReminderEmail: sendTenderReminderEmail,
  sendApplicationStatusUpdateEmail: sendApplicationStatusUpdateEmail,
  sendInquiryEmail: sendInquiryEmail,
};
