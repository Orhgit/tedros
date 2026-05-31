export function loader() {
  return new Response("google-site-verification: google2279d081ccbfa4c2.html", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
