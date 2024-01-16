import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDb();
    const posts = await Post.find();

    // Return JSON response
    return new Response(JSON.stringify(posts), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch posts: ${err.message}`);
  }
};


