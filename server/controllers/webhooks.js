const { Webhook } = require("svix");
const User = require("../models/user");
// api controller function to manage clerk user with database

const clerkWebhooks = async (req, res) => {
  try {
    //CREATE  a svix ib=nstance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //verifying headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //getting data from request body
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        // Use findOneAndUpdate with upsert to make this operation idempotent.
        await User.findOneAndUpdate({ _id: data.id }, userData, {
          upsert: true,
        });

        console.log("User created or updated:", data.id);
        res
          .status(200)
          .json({ success: true, message: "User created or updated" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated:", data.id);
        res.status(200).json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        res.status(200).json({ success: true, message: "User deleted" });
        break;
      }
      default:
        res.status(200).json({ success: true, message: "Webhook received" });
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { clerkWebhooks };
