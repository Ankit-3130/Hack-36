import React from "react";
import pdfval from "../../assets/result.pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Pdfopener = (prop) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(pdfval);
  const loadsuccess = () => {
    setNumPages(numPages);
  };
  return (
    <div>
      <Document file={file} onLoadSuccess={loadsuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default Pdfopener;
