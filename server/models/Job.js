import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

export const JobSchema = new Schema(
  {
    jobTitle: { type: String, required: true, maxlength: 100 },
    company: { type: String, required: true, maxlength: 100 },
    hours: { type: Number, required: true, max: 100 },
    rate: { type: Number, required: false, min: 12 },
    description: { type: String, required: false },

    sellerId: {
      type: ObjectId,
      required: true,
      ref: "Account",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

JobSchema.virtual("seller", {
  localField: "sellerId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

// constructor(data) {
//     this.id = data._id;
//     this.job = data.jobTitle;
//     this.company = data.company;
//     this.hours = data.hours;
//     this.rate = data.rate;
//     this.description = data.description;
//   }
