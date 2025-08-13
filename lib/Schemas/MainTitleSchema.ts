import { Schema, model, models } from "mongoose";

const MainTitleSchema = new Schema(
  {
    title: { type: String, required: true },
    contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  },
  { timestamps: true }
);

const MainTitle = models.MainTitle || model("MainTitle", MainTitleSchema);
export default MainTitle;
