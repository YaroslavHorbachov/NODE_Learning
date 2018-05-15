const PdfPrinter = require('pdfmake');
const path = require('path')
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
}
const printer = new PdfPrinter(fonts);
const fs = require('fs');

const generatePDFController = (req, res) => {

    const docDefinition = {content: 'This is an sample PDF printed with pdfMake'};

    var doc = printer.createPdfKitDocument(docDefinition);

    var chunks = [];
    var result;

    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        result = Buffer.concat(chunks);
        // const str = 'data:application/pdf;base64,' + result.toString('base64');
        // res.contentType('application/pdf');
        res.send(result)
    });
    doc.end();
    // res.send({test:'test'})
}


/*

function actor (req) {
    const docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    return pdfmake.createPdf(docDefinition)
}
*/

module.exports = generatePDFController;
