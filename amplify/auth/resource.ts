import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
     externalProviders: {
      oidc: [
        {
          name: 'AmazonFederate',
          clientId: secret('AMAZON_FEDERATE_CLIENT_ID'),
          clientSecret: secret('AMAZON_FEDERATE_CLIENT_SECRET'),
          issuerUrl: 'https://idp-integ.federate.amazon.com',
          scopes: ['openid', 'email', 'profile'],
          attributeMapping: {
            email: 'email',
          },
        },
      ],
      logoutUrls: ['https://main.d2ut9vyl1de7gq.amplifyapp.com/', 'http://localhost:5173/'],
      callbackUrls: [
        'https://main.d2ut9vyl1de7gq.amplifyapp.com/', 'http://localhost:5173/'
      ],
    },
  },
});