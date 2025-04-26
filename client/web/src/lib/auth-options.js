import config from "@/config";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import auth from "@/services/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.google_client_id,
      clientSecret: config.google_client_secret,
    }),
    GithubProvider({
      clientId: config.github_client_id,
      clientSecret: config.github_client_secret,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      const payload = {
        email: profile.email,
        username: profile.email,
        first_name: profile.given_name,
        last_name: profile.family_name,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
      };

      console.log({ payload });
      try {
        const resp = await auth.login(payload);
        console.log({ resp });
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
};
