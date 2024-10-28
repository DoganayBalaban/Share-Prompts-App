import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

function normalizeUsername(name) {
  return name
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-zA-Z0-9]/g, "") // Geçersiz karakterleri kaldır
    .toLowerCase(); // Küçük harfe dönüştür
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // Kullanıcı veritabanında yoksa yeni bir kullanıcı oluştur
        const user = await User.findOne({ email: profile.email });
        if (!user) {
          await User.create({
            email: profile.email,
            username: normalizeUsername(
              profile.name.replace(" ", "").toLowerCase()
            ),
            image: profile.picture,
          });
        }
        return true; // Sign-in başarılı
      } catch (error) {
        console.error("Sign-in hatası:", error);
        return false; // Sign-in başarısız
      }
    },
  },
});

export { handler as GET, handler as POST };
