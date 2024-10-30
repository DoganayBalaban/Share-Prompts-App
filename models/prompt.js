import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tag: {
    type: String,
    required: [true, "Please provide a tag"],
  },
});
const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
export default Prompt;
