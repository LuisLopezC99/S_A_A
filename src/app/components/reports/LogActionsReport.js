import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";
import { getRequest } from "@/app/requests/getRequests";

const loadData = async (url) => {
    const data = await getRequest(url);
    return data;
};

const Report = async ({ userId }) => {
  const userActions = await loadData(`logActions?userId=${userId}`)

  // Constants for image dimensions and margin
  const imgWidth = 15;
  const imgHeight = 17;
  const margin = 5;


  // Constant for the PDF document
  const doc = new jsPDF();

  // Function to add a header to the PDF document
  const addHeader = () => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("bold");
    doc.text(`Reporte de Usuario`, doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });
  };

  // Function to add a logo and title to the PDF document
  const addLogoAndTitle = () => {
    const img = new Image();
    img.src = "/logo-min.png";
    doc.addImage(img, "PNG", margin, margin, imgWidth, imgHeight);
    doc.setFontSize(8);
    doc.setTextColor(98, 190, 31);
    doc.setFont("normal");
    doc.text(
      "Sistema de Control de Acuerdos y Actas",
      margin + imgWidth + 5,
      margin + 8,
      {
        align: "left",
      }
    );
    doc.setTextColor(3, 85, 229);
    doc.text("Municipalidad de Tibas", margin + imgWidth + 5, margin + 12, {
      align: "left",
    });
  };

  // Function to add a table with data to the PDF document
  const addTable = () => {
    const modifiedRows = userActions.map((userAction) => {
            const operationName = userAction.operation.name
            return [
              userAction.timestamp,
              operationName,
              userAction.description
            ];
          });
    console.log(modifiedRows)
    doc.autoTable({
      head: [['Tiempo', 'Accion de Sistema', 'Descripcion']],
      body: modifiedRows,
      startY: 55,
      styles: { lineColor: [0, 0, 0], lineWidth: 0.5 },
    });
  };

  // Function to download the PDF document
  const downloadPDF = async () => {
    addHeader();
    addLogoAndTitle();
    addTable();
    const pdfBytes = doc.output("arraybuffer");
    const compressedPdfBytes = await PDFDocument.load(pdfBytes);
    const compressedPdf = await compressedPdfBytes.save();
    const file = new Blob([compressedPdf], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    let tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.download = "Reporte de Usuario";
    tempLink.click();
    tempLink.remove();
  };
  downloadPDF();
  
};

export default Report;
