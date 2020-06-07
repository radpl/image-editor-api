const mongoose = require("mongoose");

const backgroundSchema = new mongoose.Schema(
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
    backgrounds: {
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
const BackgroundImage = mongoose.model("Background", backgroundSchema);


module.exports = BackgroundImage;