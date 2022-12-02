export function validateUrl(url: any) {
  let urls = ["/explore", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}
