import { Schema, model } from "mongoose";

const playlistSchema = new Schema(
  {
    playlistName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PlaylistModel = model("Playlist", playlistSchema);
