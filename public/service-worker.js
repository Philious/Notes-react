/*
const CACHE_NAME = "data-cache-v1";
const STATIC_ASSETS = ["/index.html", "/main.js"];
const DATA_URL = "http://localhost:3000";
const TOKEN_CACHE_NAME = "token-cache";
const TOKEN_KEY = "auth-token";
const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

// Utility: Save token to Cache Storage
async function saveToken(token) {
  const cache = await caches.open(CACHE_NAME);
  const expiration = Date.now() + EXPIRATION_TIME;
  const tokenData = new Response(JSON.stringify({ token, expiration }));
  await cache.put(TOKEN_KEY, tokenData);
  console.log("[Service Worker] Token saved:", { token, expiration });
}

// Utility: Fetch token from Cache Storage
async function fetchToken() {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(TOKEN_KEY);
  if (response) {
    const { token, expiration } = await response.json();
    if (Date.now() < expiration) {
      console.log("[Service Worker] Token is valid:", token);
      return token;
    } else {
      console.log("[Service Worker] Token has expired. Removing...");
      await cache.delete(TOKEN_KEY);
    }
  }
  console.log("[Service Worker] No valid token found.");
  return null;
}

// Utility: Remove token from Cache Storage
async function removeToken() {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(TOKEN_KEY);
  console.log("[Service Worker] Token removed.");
}

// Handle messages from the React app
self.addEventListener("message", async (event) => {
  const { action, token } = event.data;

  switch (action) {
    case "save-token":
      await saveToken(token);
      break;

    case "fetch-token":
      const fetchedToken = await fetchToken();
      event.ports[0].postMessage({ token: fetchedToken });
      break;

    case "remove-token":
      await removeToken();
      break;

    default:
      console.error("[Service Worker] Unknown action:", action);
  }
});
*/
