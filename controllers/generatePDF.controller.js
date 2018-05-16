const PdfPrinter = require('pdfmake');
const {transporter, createMessage} = require('../core/nodemailer')
const path = require('path');
const moment = require('moment');
const fs = require('fs');

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
}

class ResponseJSON {
    constructor({type, options, data}) {
        this.type = type;
        this.options = options;
        this.data = data
    }
}

const printer = new PdfPrinter(fonts);


const TypeForm = (reqData, res) => {
    const {options: {orientation: pageOrientation, receiver}, data: {main, user}} = {...reqData}

    const docDefinition = content(main, pageOrientation);
    const doc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        sendMessage(receiver, Buffer.concat(chunks), res)
    });
    doc.end();

}

const sendMessage = (receiver, attachments, res) => {
    transporter
        .sendMail(createMessage({
            to: 'fandaste3@gmail.com',
            subject: 'GENERATED PDF',
            attachments: [{
                filename:'pdf.pdf',
                content: attachments
            }]
        }))
        .then(info => {
            console.log('Message to Receiver', info.messageId)
            res.send({type:'test'})
        })
        .catch(err => console.log('When send mail error', err))
}

const TypeGenerate = (reqData, res) => {
    const {options: {orientation: pageOrientation, receiver}, data: {main, user}} = {...reqData}
    const docDefinition = content(main, pageOrientation)

    console.log('Doc ', docDefinition);

    const doc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        res.contentType('application/pdf');
        res.send(Buffer.concat(chunks))
    });
    doc.end();
}

const generateWithEmployee = (user, columns) => {
    const messages = user.employees
        .map(({date, employee, message}) => [date, employee, message]);
    const table = {
        style: 'tableExample',
        table: {
            body: [columns, ...messages]
        }
    };
    return renderData = [
        {text: `Lead ${user.name} ${user.surname} `, pageBreak: 'before', style: 'subheader'},
        `${user.employees.length} p.`,
        {...table}
    ]

}
const generateWithoutEmployee = (user, columns) => {
    return renderData = [
        {text: `Lead ${user.name} ${user.surname} `, pageBreak: 'before', style: 'subheader'},
        'Sorry, but this lead not have yet employees'
    ]
};

const content = (data, pageOrientation) => {
    const head = {text: 'Report ', style: 'header'};
    const header = {
        header: function (currentPage, pageCount, pageSize) {
            return [
                {text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right'},
                {canvas: [{type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40}]}
            ]
        }
    }
    const columnsTable = ['date', 'employee', 'message'];

    const leadsWithEmployees = data.filter(lead => lead.employees.length);
    const leadsWithoutEmployees = data.filter(lead => !lead.employees.length);
    const fullLeads = leadsWithEmployees.map(user => generateWithEmployee(user, columnsTable));
    const lessLeads = leadsWithoutEmployees.map(user => generateWithoutEmployee(user, columnsTable));
    return {
        header: {
                    text: `${moment().format('MMMM Do YYYY, HH:mm')}`,
                    alignment: 'right',
                    margin: [10, 5, 10, 20]
                },
        footer: function (currentPage, pageCount) {
            return [{
                text: `${currentPage.toString()}  of  ${pageCount}`,
                alignment: 'left',
                margin: [10, 5, 10, 20]

            }]
        },
        pageOrientation,
        content: [head, fullLeads, lessLeads]
    }

}

const generatePDFController = (req, res) => {
    const reqData = new ResponseJSON({...req.body});
    reqData.type === 'form' ? TypeForm(reqData, res) : TypeGenerate(reqData, res);
}


module.exports = generatePDFController;
