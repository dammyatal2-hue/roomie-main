const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

const sendBookingRequestEmail = async (ownerEmail, ownerName, guestName, guestEmail, propertyTitle, checkIn, checkOut) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@roomieapp.com',
    to: ownerEmail,
    subject: `New Booking Request for ${propertyTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FE456A;">New Booking Request!</h2>
        <p>Hi ${ownerName},</p>
        <p>You have received a new booking request for your property:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${propertyTitle}</h3>
          <p><strong>Guest Name:</strong> ${guestName}</p>
          <p><strong>Guest Email:</strong> ${guestEmail}</p>
          <p><strong>Check-in:</strong> ${checkIn}</p>
          <p><strong>Check-out:</strong> ${checkOut}</p>
        </div>
        
        <p>Please log in to your Roomie App account to review and respond to this booking request.</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated email from Roomie App.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking request email sent to:', ownerEmail);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendBookingRequestEmail };
