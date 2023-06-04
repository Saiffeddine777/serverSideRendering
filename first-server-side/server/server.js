import express from "express";
import fs from "fs";
import path from "path";
import React from "react"; 
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const port = 4000;
const app = express();



app.use("*", (req, res) => {
  fs.readFile(
    path.resolve("G:/js Projects/serverSideRendering/first-server-side/build/index.html"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
          <App/> 
        </StaticRouter>
      );
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      );
    }
  );
});

app.listen(port, () => {
  console.log(`App live on ${port}`);
});

 