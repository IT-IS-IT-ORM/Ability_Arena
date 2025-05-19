export function fetchInstance(url: string, options: RequestInit) {
  const protocol = window.location.protocol;
  let host = window.location.host;

  host = host.replace("localhost", "127.0.0.1");
  host = host.replace("2333", "3332");

  const baseUrl = `${protocol}//${host}/api`;
  url = `${baseUrl}${url}`;

  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
}
