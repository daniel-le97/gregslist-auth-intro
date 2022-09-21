import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

export const HomeSchema = new Schema(
  {
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    levels: { type: Number },
    price: { type: Number, required: true },
    imgUrl: { type: String },
    year: { type: Number, min: 1800 },
    description: { type: String, required: true },
    creatorId: { type: ObjectId, ref: "Account", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

HomeSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

//  this.id = data._id;
//  this.bedrooms = data.bedrooms;
//  this.bathrooms = data.bathrooms;
//  this.levels = data.levels;
//  this.imgUrl = data.imgUrl;
//  this.description = data.description;
//  this.price = data.price;
//  this.year = data.year;
