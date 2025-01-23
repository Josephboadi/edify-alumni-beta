const apiUrl = process.env.API_URL!;

export const createUrl = (endpoint: string | URL) =>
  new URL(endpoint, apiUrl).href;
