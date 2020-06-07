const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
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
    logos: {},
    texts: {},
    thumbnail: {
      type: Buffer
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

imageSchema.set('toObject', { virtuals: true });
imageSchema.set('toJSON', { virtuals: true });

imageSchema.virtual("logo", {
  ref: "Logo",
  localField: "_id",
  foreignField: "image",
  justOne: false
});

// Define a model
const EditorImage = mongoose.model("Image", imageSchema);


module.exports = EditorImage;