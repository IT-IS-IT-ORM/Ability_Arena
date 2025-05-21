// Type-Def
import type { I_BasePlayer } from "@/type-def/Player";

// Utils
import { localStorage } from "@/utils/localStorage";

export async function fetchInstance(url: string, options: RequestInit) {
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

  // 添加 Authorization 头
  const player = localStorage.get<I_BasePlayer, null>("player", null);

  if (player && defaultOptions.headers) {
    (defaultOptions.headers as Record<string, string>)["Authorization"] =
      player._id;
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response || response.status >= 400) {
      const errorData = await response.json().catch(() => null);
      throw errorData || response;
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}
