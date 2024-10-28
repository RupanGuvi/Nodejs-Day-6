import Booking from "../Models/bookingModel.js";
import sendEmail from "../Utils/mailer.js";

export const bookService = async (req, res) => {
  try {
    const { service, date } = req.body;

   const booking = new Booking({ user: req.user._id, service, date });
    await booking.save();

    //send mail notification
    const userEmail = req.user.email; // getting email from the user collection
    await sendEmail(
      userEmail,
      "Service Booking Confirmation",
      `Your booking for service Id ${service} is confirmed for ${date}`
    );
    res.status(200).json({ message: "Booking Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
