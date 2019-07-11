const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotsSchema = new Schema(
  {
    name: { type: String, required: true },
    address: String,
    destination: { type: String, required: true },
    visitDate: { type: Date, default: Date.now },
    status: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: String
    },
    comment: String,
    image: String,
    ranking: { type: String },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Spots = mongoose.model("Spots", spotsSchema);
module.exports = Spots;
