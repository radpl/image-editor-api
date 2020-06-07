const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    logos: {
      type: [Buffer]
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Image"
    }
  },
  {
    timestamps: true
  }
);
// Define a model
const LogoImage = mongoose.model("Logo", logoSchema);


module.exports = LogoImage;