const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotsSchema = new Schema(
  {
    name: { type: String, required: true },
    address: String,
    destination: { type: String, required: true },
    visitDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["visited", "in-planning"]
    },
    category: {
      type: String,
      enum: ["food", "art", "sleep", "gems"]
    },
    price: {
      type: String,
      enum: ["budget", "standard", "spendy"]
    },
    comment: String,
    image: String,
    ranking: { type: String, enum: ["*", "**", "***"] },
    author: Schema.Types.ObjectId
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
