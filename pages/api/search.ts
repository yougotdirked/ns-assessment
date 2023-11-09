import { IRequestBody, toQueryString } from '@/src/models/requestBody';
import { NextApiRequest, NextApiResponse} from 'next';

const baseUrl = process.env.GITHUB_API_URL;

export default async function handler(request: NextApiRequest, result: NextApiResponse) {
  if (!baseUrl) {
    result.status(500).statusMessage = "No api url provided"
  }
  const queryString = toQueryString(request.body as IRequestBody);

  if (request.method === 'POST') {
    try {
      const response = await fetch(`${baseUrl}/search/repositories${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/vnd.github+json"
        }
      }
    );
    if (response.status !== 200) {
      console.error(response.status, response.statusText);
      result.status(response.status).json(response.status + ": " + response.statusText);
    }
    else {
      result.status(200).json(await response.json());
    }
  } catch (e) {
    result.status(400)
    }
  }
}