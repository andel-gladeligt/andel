const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    inspirations: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
    // spots: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Spot"
    //   }
    // ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
