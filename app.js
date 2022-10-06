const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("./model/db");


// swagger config

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Create thumbnail project",
      version: "1.0.0",
      description: "A simple create thumbnail project to generate thumbnail from image",
    },

    servers: [
      {
        url: "http://localhost:8080/api"
        // url: "https://faro-coding-task.vercel.app",
      },
    ],
  },
  apis: ["./router/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(cors());
app.use(express.json({ limit: "4.5mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api",require("./router/uploadImage"));
app.use("/api",require("./router/thumbnail"));

app.listen(port, (req, res) => {
  console.log("Server connected");
});
