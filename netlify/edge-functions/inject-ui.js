export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("text/html")) return response;

  let html = await response.text();

  // Fetch Navbar & Footer
  const [navRes, footRes] = await Promise.all([
    fetch(new URL("/navbar.html", request.url)),
    fetch(new URL("/footer.html", request.url))
  ]);

  const navbar = await navRes.text();
  const footer = await footRes.text();

  // Replace Placeholders
  html = html.replace('<div id="navbar-placeholder"></div>', navbar);
  html = html.replace('<div id="footer-placeholder"></div>', footer);

  return new Response(html, response);
};
export const config = { path: "/*" };