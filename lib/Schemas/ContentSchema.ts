import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema(
  {
    title: { type: String, required: true },
    mainTitle: { type: Schema.Types.ObjectId, ref: "MainTitle" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Content = models.Content || model("Content", ContentSchema);
export default Content;
