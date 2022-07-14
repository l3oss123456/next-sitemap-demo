import React from "react";
import * as fs from "fs";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "http://localhost:3000";

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "_app.js",
        "_document.js",
        "404.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

  const products = [
    {
      id: 2123,
      name: "Fantastic Product1",
      price: 12.4,
    },
    {
      id: 2124,
      name: "Fantastic Product2",
      price: 22.4,
    },
    {
      id: 2125,
      name: "Fantastic Product3",
      price: 32.4,
    },
    {
      id: 2126,
      name: "Fantastic Product4",
      price: 42.4,
    },
  ];

  // const products = await getAllProducts() // some remote API call maybe!

  const dynamicPaths = products.map((singleProduct) => {
    return `${BASE_URL}/product/${singleProduct.id}`;
  });

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths
      .map((url) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>always</changefreq>
            <priority>0.5</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
