const { Webhook } = require("svix");
const User = require("../models/user"); // Make sure this matches your actual file name

// api controller function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    // CREATE a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get the body as string for verification
    const body = req.body;
    const bodyString = Buffer.isBuffer(body)
      ? body.toString()
      : JSON.stringify(body);

    // verifying headers
    await whook.verify(bodyString, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse the body if it's a buffer
    const payload = Buffer.isBuffer(body) ? JSON.parse(body.toString()) : body;

    // getting data from request body
    const { data, type } = payload;

    console.log("Webhook received:", { type, userId: data?.id });

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        console.log("User created:", userData); // Add logging
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, // Fixed: removed extra 's'
          name: data.first_name + " " + data.last_name, // Fixed: 'forst_name' to 'first_name'
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated:", userData); // Add logging
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id); // Add logging
        res.json({ success: true });
        break;
      }
      default:
        console.log("Unhandled webhook type:", type);
        res.json({ success: true });
        break;
    }
  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { clerkWebhooks };
