/**
 * Get the correct path for assets in the public folder.
 * Handles GitHub Pages base path automatically via Vite's import.meta.env.BASE_URL
 */
export function getAssetPath(path) {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
