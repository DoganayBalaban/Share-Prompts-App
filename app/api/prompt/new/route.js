import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = req.body;

  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
