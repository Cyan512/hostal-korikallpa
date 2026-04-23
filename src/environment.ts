const protocol = process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_STRAPI_PORT;

const environment = {
  strapi: {
    apiEndpoint: port
      ? `${protocol}://${host}:${port}`
      : `${protocol}://${host}`,
  },
};

export default environment;
