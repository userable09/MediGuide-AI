/**
 * Safe fetch wrapper that handles non-JSON responses (e.g., Vercel 404 HTML, 500 error pages)
 * gracefully with clear, human-readable error messages instead of SyntaxErrors.
 */
export async function apiFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, options);
  } catch (err: any) {
    throw new Error(`Network Error: Unable to reach the server. ${err.message || ''}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const responseText = await response.text();

  let data: any = null;
  if (contentType.includes('application/json') || responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    if (data && data.error) {
      throw new Error(data.error);
    }
    if (response.status === 404) {
      throw new Error(
        'API endpoint not found (404). If on Vercel, please make sure serverless routing is active and you have REDEPLOYED your project after adding GROQ_API_KEY.'
      );
    }
    if (response.status === 500) {
      throw new Error(
        `Server configuration error (500). If on Vercel, REDEPLOY. Otherwise, check backend logs. Details: ${responseText.substring(0, 100)}`
      );
    }
    throw new Error(`Server returned status ${response.status}. Please check backend logs.`);
  }

  if (!data) {
    throw new Error(
      'API returned HTML instead of JSON. If hosted on Vercel, please ensure GROQ_API_KEY or GEMINI_API_KEY environment variables are added in Vercel Project Settings.'
    );
  }

  return data as T;
}
