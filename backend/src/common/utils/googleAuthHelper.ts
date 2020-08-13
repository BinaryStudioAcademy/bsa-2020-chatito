import { OAuth2Client } from 'google-auth-library';
import { env } from '../../env';

export const getGoogleUserPayload = async (token: string) => {
  const client = new OAuth2Client(env.googleAuth.clientId);
  const googleUser = await client.verifyIdToken({
    idToken: token,
    audience: env.googleAuth.clientId
  });

  return googleUser.getPayload();
};
