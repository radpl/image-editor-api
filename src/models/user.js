const mongoose = require("mongoose");
const EditorImage = require("../models/image");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("images", {
  ref: "Image",
  localField: "_id",
  foreignField: "owner"
});

//Delete user images when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await EditorImage.deleteMany({
    owner: user._id
  });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
