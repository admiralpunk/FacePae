import React from "react";
import QRCodeUpload from "./QRCodeUpload.js";
import PrintReceipt from "./print.js";

function App() {
  return (
    <div className="App">
      <QRCodeUpload />
      <PrintReceipt/>
    </div>
  );
}

export default App;
