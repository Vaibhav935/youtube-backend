import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema.create(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionModel = model("subscription", subscriptionSchema);
