const baseUrl = import.meta.env.BASE_URL;

export function assetPath(path) {
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}
