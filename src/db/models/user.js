import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String },
    exp: { type: Number },
    stream: { type: String },
    tel: { type: String, required: true },
    type: { type: String, required: true, enum: ['client', 'lawyer'] },
    announcements: { type: Array },
  },
  { timestamps: true, versionKey: false }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', usersSchema);
