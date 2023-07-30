import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.SANITY_PRODUCTION_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-07-20',
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(url: SanityImageSource) {
  return builder.image(url).width(800).url();
}

let today = new Date();
today.toISOString().split('T')[0];

export const assetsURL = `https://${process.env.SANITY_PRODUCTION_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`;
