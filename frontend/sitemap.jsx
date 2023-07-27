import React from 'react';

import GenerateSitemap from "react-router-sitemap-maker";
import App from "./App";
import fs from "fs";
import "dotenv/config";

const buildSitemap = async () => {
    const sitemapData = await GenerateSitemap((new App({})).MainRoutes(), {
        baseUrl: process.env.WEB_ADDRESS,
        hashrouting: false,
        changeFrequency: "monthly"
    });

    await sitemapData.toFile("./dist/sitemap.xml");
    const robots =  "User-agent: *\n" +
                    "Disallow:\n\n" +
                    "Sitemap: " + process.env.WEB_ADDRESS + "/sitemap.xml"

    fs.writeFileSync('./dist/robots.txt', robots);
}

await buildSitemap()