export function validateUrl(url: any) {
  console.log(url);
  let urls = ["/explore", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}
