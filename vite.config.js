import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Public address of the site, used for the WhatsApp/social preview image (it must be an absolute URL).
// On GitHub Actions it is worked out from the repository name automatically.
function siteUrl() {
  if (process.env.VITE_SITE_URL)
    return process.env.VITE_SITE_URL.replace(/\/$/, "");
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");
  if (!owner || !repo) return "";
  const name = repo.toLowerCase();
  return name.endsWith(".github.io")
    ? `https://${name}`
    : `https://${owner.toLowerCase()}.github.io/${repo}`;
}
const SITE = siteUrl();

// base './' makes the build work on GitHub Pages under any repository name.
export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", SITE),
    },
  ],
  base: "./",
});
