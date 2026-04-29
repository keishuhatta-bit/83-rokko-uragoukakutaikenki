const fs = require("fs");
const path = require("path");

const BASE_URL =
  "https://keishuhatta-bit.github.io/83-rokko-uragoukakutaikenki";

const ROOT = process.cwd();

function getHtmlFiles(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (
      file === "node_modules" ||
      file === ".git" ||
      file === "components"
    ) {
      continue;
    }

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  }

  return results;
}

const htmlFiles = getHtmlFiles(ROOT);

const urls = htmlFiles.map((file) => {
  let relative = path.relative(ROOT, file);

  relative = relative.replace(/\\/g, "/");

  if (relative === "index.html") {
    relative = "";
  }

  relative = relative.replace(/index\.html$/, "");

  const priority =
    relative === ""
      ? "1.0"
      : relative.startsWith("taikenki/")
      ? "0.9"
      : "0.7";

  return `
  <url>
    <loc>${BASE_URL}/${relative}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);

console.log("sitemap.xml generated");