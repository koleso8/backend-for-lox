import { model, Schema } from 'mongoose';

const announcementsSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 400,
    },
    type: {
      type: String,
      required: true,
      enum: ['lawyer', 'client'],
    },
    comment: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AnnouncementsCollection = model(
  'announcements',
  announcementsSchema
);
