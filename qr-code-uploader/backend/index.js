const express = require("express");
const bodyParser = require("body-parser");
const escpos = require("escpos");
escpos.USB = require("escpos-usb");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/print", (req, res) => {
  const { content } = req.body;

  try {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);

    device.open(() => {
      printer
        .font("a")
        .align("ct")
        .style("bu")
        .size(1, 1)
        .text(content)
        .cut()
        .close();
    });

    res.status(200).send("Printed successfully!");
  } catch (error) {
    console.error("Error printing:", error);
    res.status(500).send("Failed to print.");
  }
});

app.listen(port, () => {
  console.log(`Print server running at http://localhost:${port}`);
});
