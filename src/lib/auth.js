import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login!");
  }
};

// Function to generate a username from the email (replace with your logic)
function generateUsernameFromEmail(email) {
  // Example: using the part before '@' as the username
  return email.split('@')[0];
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            // If the username is missing in the Google profile, generate one based on the email
            const username = profile.login || generateUsernameFromEmail(profile.email);

            const newUser = new User({
              username: username,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.error(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
