var pdf = {
    nombre : 'david',
    apellido : 'enzo',
    lista : [{
        nombreLista : 'Desratizacion',
        listaDeLista : [{
            nombreCampo : 'Campo 1',
            estadoCampo : 'RP'},
            {
                nombreCampo : 'Campo 2',
                estadoCampo : 'MD'}
        ]
    },
    {
        nombreLista : 'Desnutricion',
        listaDeLista : [{
            nombreCampo : 'Campo 3',
            estadoCampo : 'RP'},
            {
                nombreCampo : 'Campo 4',
                estadoCampo : 'MD'}
        ]
    }]
}

var fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

const longLista = pdf.lista.length;

var dd = {
	content: [
        {
			stack: [
				'This header has both top and bottom margins defined',
				{text: 'This is a subheader', style: 'subheader'},
			],
			style: 'header'
		}	
    ],
    styles: {
		header: {
			fontSize: 18,
			bold: true,
			alignment: 'right',
			margin: [0, 20, 0, 20]
		},
		subheader: {
			fontSize: 14
		},
		superMargin: {
			margin: [20, 0, 40, 0],
			fontSize: 15
		}
	}
}

for( i = 0; i < longLista ; i++){
    dd.content.push({
        margin: [0, 20, 0, 0],
        text : pdf.lista[i].nombreLista,
    })
    var table = {
        body : []
    };
    console.log(pdf.lista[i].listaDeLista.length)
    for(j = 0 ; j < pdf.lista[i].listaDeLista.length; j++){
        table.body.push([pdf.lista[i].listaDeLista[j].nombreCampo,pdf.lista[i].listaDeLista[j].estadoCampo])
        //console.log(table);
    }
    dd.content.push({
        table
    });
    console.log(table);
}
  
  
var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('./public/document.pdf'));
pdfDoc.end();