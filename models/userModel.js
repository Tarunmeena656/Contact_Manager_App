const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.checkPassword = async function(password) {
    return  bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
