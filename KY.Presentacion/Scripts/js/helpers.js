//elementos
function __elem(str_elem) { return document.querySelector(str_elem); }
function __elems(str_elem) { return document.querySelectorAll(str_elem); }
function __arr_elems(elems) { return Array.prototype.slice.apply(elems); }

function listener(str_elem, event, callback) {
    __elem(str_elem).addEventListener(event, function (e) {
        callback(e);
    })
}

function noNullValue(val, out = '-') { return (val == null || val.toString().trim().length == 0 ? out : val) }
function noNullValueId(val, out = '-') { return (val == null || val == 0 || val.toString().trim().length == 0 ? out : val) }

//meses y dias
var arr_meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var arr_meses_short = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
var arr_dias_semana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
var arr_dias_semana_tipo = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

Array.prototype.unique = function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


function getParameterByName(name) {
    var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//config choices

var configMultiple = {
    removeItemButton: true,
    maxItemCount: 20,
    itemSelectText: '',
    noResultsText: 'No hay resultados',
    noChoicesText: 'No hay para seleccionar',
    maxItemText: function (maxItemCount) {
        return String(maxItemCount) + ' seleccionados como máximo';
    },
}

var configSingle = {
    removeItemButton: true,
    itemSelectText: '',
    searchPlaceholderValue: 'Buscar aqui...',
    noResultsText: 'No hay resultados'
}

//fechas
function __str_date_reverse(str_date, str_split, str_split_convert) {
    if (str_date.length == 0) return '';

    var valor_split = str_date.split(str_split);
    return `${valor_split[2]}${str_split_convert}${valor_split[1]}${str_split_convert}${valor_split[0]}`;
}

function __str_date_no_dias_reverse(str_date, str_split, str_split_convert) {
    if (str_date.length == 0) return '';

    var valor_split = str_date.split(str_split);
    return `${valor_split[1]}${str_split_convert}${valor_split[0]}`;
}

function __str_date_no_dias(str_date, str_split, str_split_convert) {
    if (str_date.length == 0) return '';

    var valor_split = str_date.split(str_split);
    return `${valor_split[0]}${str_split_convert}${valor_split[1]}`;
}


function weekOfMonth(input = moment()) {
    var firstDayOfMonth = input.clone().startOf('month');
    var firstDayOfWeek = firstDayOfMonth.clone().startOf('week');
    var offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');
    return Math.ceil((input.date() + offset) / 7);
} 

//numbers
var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol, decimal) {
        var val_num = parseFloat( num || 0);
        this.simbol = (simbol == 'S/.' ? 'S/' : simbol ) || '';
        return this.formatear(val_num.toFixed(decimal));
    }
}

function convertFormatNumber(num = 0, simbol = 'S/.', decimal = 2) {
    return formatNumber.new(num, simbol, decimal);
}


//select pure
function eliminarDatosLista(elem, str_html ='') {
    if (elem != null) {
        //elem.innerHTML = '<div class="select-pure__select"></>';
        elem.innerHTML = str_html;
    }
} 

function selectPureVacio(str_elemento, text_label=" ") {
    eliminarDatosLista(__elem(str_elemento), `<div class="select-pure__select">${text_label}</div>`);

    //return (new SelectPure(str_elemento, {
    //    options: [{ label: text_label, value: " ", disabled: true }]
    //}));
}

function getAllSelectedSelecPure(str_elem) {
    var arr_resultado = [];
    var arr_elems = __arr_elems(__elems(str_elem));

    arr_elems.map(function (item){
        arr_resultado.push(item.dataset.value);
    });

    return arr_resultado;
}

function getSelectedSelecPure(str_elem) {
    var elem = __elem(str_elem);
    return (elem == undefined ? '' : elem.dataset.value);
}

function removeAllSelectedSelecPure(str_elem, elem) {
    var arr_resultado = [];

    elem._options.map(function (item) {
        item._node.classList.remove('select-pure__option--selected');
    });

    elem._config.value = [];

    __elem(`${str_elem} .select-pure__select .select-pure__label`).innerHTML = '';

    //comboFiltroClientes._options[0]._node

    //var arr_elems = __arr_elems(__elems(str_elem));

    //arr_elems.map(function (item) {
    //    arr_resultado.push(item.dataset.value);
    //});

    return elem;
}



//fechas dias

function getTotalDays(currentYear, month) {
    if (month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {

        return isLeap(currentYear) ? 29 : 28;
    }
}

function isLeap(currentYear) {
    return currentYear % 100 !== 0 && currentYear % 4 === 0 || currentYear % 400 === 0;
}

function startDay(currentYear, monthNumber) {
    var start = new Date(currentYear, monthNumber, 1);
    return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

function semanasMes(year, mes) {
    var primerdia = ((new Date(year, mes, 1).getDay() - 1) % 7 + 7) % 7;
    var dias = new Date(year, mes + 1, 0).getDate() - 7 + primerdia;
    return Math.ceil(dias / 7) + 1;
}

function obtenerDiasdeMes(year, month) {
    var total_dias = getTotalDays(year, month);
    var semanas_mes = semanasMes(year, month);

    var arr_dias = [];

    for (let i = startDay(year, month); i > 0; i--) {
        var day = getTotalDays(year, month - 1) - (i - 1);
        arr_dias.push(day);
    }

    for (let i = 1; i <= total_dias; i++) {
        arr_dias.push(i);
    }

    return arr_dias;
}



//numeros

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode;
    return ((key >= 48 && key <= 57) || (key == 8));
}


function inputMax(e) {
    if (e.target.value.length > e.target.maxLength.toFixed(2)) e.target.value = e.target.value.slice(0, e.target.maxLength);
}

function inputMaxValue(e) {
    if (e.target.value.length == 0) {
        e.target.value = e.target.min;
        return;
    }
    if (parseInt(e.target.value) > parseInt(e.target.max)) e.target.value = e.target.max;
}

function inputMaxValueWithDecimal(e) {
    var valor = e.target.value.toString().replace(',', '');
    if (valor.length == 0) {
        e.target.value = parseFloat(e.target.min).toFixed(2);
        return;
    }

    if (parseFloat(parseFloat(valor).toFixed(2)) > parseFloat(parseFloat(e.target.max).toFixed(2))) { 
        e.target.value= convertFormatNumber(e.target.max, '', 2);
    }

    else {
        //var valor = parseFloat(e.target.value).toFixed(2);
        //e.target.value = (valor.toString().length == 1 ? valor.toString() + ".00" : (valor.toString().length == 3 ? valor.toString() + "0" : valor.toString()));

        e.target.value = convertFormatNumber(valor,'', 2);
    }
}

function inputMaxValueWithDecimal(e, callback = function () { }) {
    var valor = e.target.value.toString().replace(',', '');
    if (valor.length == 0) {
        e.target.value = parseFloat(e.target.min).toFixed(2);
        return;
    }

    if (parseFloat(parseFloat(valor).toFixed(2)) > parseFloat(parseFloat(e.target.max).toFixed(2))) {
        e.target.value = convertFormatNumber(e.target.max, '', 2);
    }

    else {
        //var valor = parseFloat(e.target.value).toFixed(2);
        //e.target.value = (valor.toString().length == 1 ? valor.toString() + ".00" : (valor.toString().length == 3 ? valor.toString() + "0" : valor.toString()));

        e.target.value = convertFormatNumber(valor, '', 2);
    }

    callback(e.target.value);
}

function setTwoNumberDecimal(e) {
    e.target.value = parseFloat(e.target.value).toFixed(2);
}

function inputNumberNoVacio(e) {
    if (e.target.value.length == 0) {
        e.target.value = e.target.min;
        return;
    }
}

function validarFechasIniFin(str_elem_fechaIni, str_elem_fechaFin) {
    var FechaVigIni = __elem(str_elem_fechaIni).value;
    var FechaVigFin = __elem(str_elem_fechaFin).value;

    var valor_split_FechaVigIni = FechaVigIni.split('/');
    var str_fecha_valor_split_FechaVigIni = `${valor_split_FechaVigIni[2]}-${valor_split_FechaVigIni[1]}-${valor_split_FechaVigIni[0]}`;

    var valor_split_FechaVigFin = FechaVigFin.split('/');
    var str_fecha_valor_split_FechaVigFin = `${valor_split_FechaVigFin[2]}-${valor_split_FechaVigFin[1]}-${valor_split_FechaVigFin[0]}`;

    var result = moment(str_fecha_valor_split_FechaVigIni).isBefore(moment(str_fecha_valor_split_FechaVigFin));
    return result;
}

function validarFechaAnteriorHoy(str_elem_fechaIni) {
    var FechaVigIni = __elem(str_elem_fechaIni).value;

    var valor_split_FechaVigIni = FechaVigIni.split('/');
    var str_fecha_valor_split_FechaVigIni = `${valor_split_FechaVigIni[2]}-${valor_split_FechaVigIni[1]}-${valor_split_FechaVigIni[0]}`;

    var result = moment(moment(str_fecha_valor_split_FechaVigIni)).isBefore(moment().format('YYYY-MM-DD'));
    return result;
}


function validarFechaMayorIgual(str_fecha_fin, str_fecha_ini) {
    return moment(str_fecha_fin).diff(moment(str_fecha_ini), 'days', true)
}

function validarFechaNoDiasMayorIgual(str_fecha_fin, str_fecha_ini) {
    return moment(str_fecha_fin, 'YYYY-MM').diff(moment(str_fecha_ini, 'YYYY-MM'), 'months', true)
}

//json
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}



//export excel


//var tableToExcel = (function () {
//    var uri = 'data:application/vnd.ms-excel;base64,'
//        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
//        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
//    return function (table, name) {
//        if (!table.nodeType) table = document.getElementById(table)
//        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
//        window.location.href = uri + base64(format(template, ctx))
//    }
//})()

function brToNewLine(str) {
    return str.replace(/<br ?\/?>/g, `<br style="mso-data-placement:same-cell;" />`);
}

var tableToExcel = (function () {

    var style_excel = `

        body, table{
           font-size: 12px;
        }

        table {
           border-spacing: 0px;
        }

        table {
          empty-cells: hide;
        }
    `;


    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><style>'+ style_excel +'</style><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        //if (!table.nodeType) table = document.getElementById(table)

        var html_table = (!table.nodeType ? table : table.innerHTML);
        var ctx = { worksheet: name || 'Worksheet', table: `${html_table}`  }
        var blob = new Blob([format(template, ctx)]);
        var blobURL = window.URL.createObjectURL(blob);

        if (ifIE()) {
            csvData = table.innerHTML;
            if (window.navigator.msSaveBlob) {
                var blob = new Blob([format(template, ctx)], {
                    type: "text/html"
                });
                navigator.msSaveBlob(blob, '' + name + '.xls');
            }
        }
        else {
            var dt = new Date();
            var day = dt.getDate();
            var month = dt.getMonth() + 1;
            var year = dt.getFullYear();
            var hour = dt.getHours();
            var mins = dt.getMinutes();
            var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;

            var a = document.createElement('a');
            a.href = uri + base64(format(template, ctx));
            //setting the file name
            a.download = 'exported_' + postfix + '.xls';
            //triggering the function
            a.click();

            //window.location.href = uri + base64(format(template, ctx));
        }
    }
})()

function ifIE() {
    var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
    var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
    return isIE11orLess;
}


function exportExcel(table, nameFile= "mi_excel") {

    var html = `
        <html>
            <head>
                <meta charset="UTF-8">

                <style>   
                    body, table{
                       font-size: 10px;
                    }

                    .tbl-lineas th{
                       border: thin solid #40AE49;
                       color: #40AE49;
                    }

                    .tbl-lineas tr:nth-child(odd) td {
                        background-color: #d8e0dc;
                    }

                    .tbl-lineas tr:nth-child(even) td {
                        background-color: #fff;
                    }

                    .tbl-lineas tr.verde-claro{
                        background-color: #d8e0dc;
                    }

                    .tbl-lineas tr.verde-claro td{
                        background-color: #d8e0dc;
                    }
                </style>
            </head>
            <body>${table}</body>
        </html>`;

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var is_edge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;
    if (is_edge === true) {
        sa = true;
        var blob = new Blob([html], { type: "text/html" });
        // Works for Internet Explorer and Microsoft Edge
        //window.navigator.msSaveOrOpenBlob(blob, "output.xls");
        window.navigator.msSaveOrOpenBlob(blob, nameFile + ".xls");
    } else
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(html);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "DataExport.xls");
        } else {               //other browser not tested on IE 11
            //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
            ////sa = window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(html)); 

            var source = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(html);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = nameFile + '.xls';
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    //return (sa);
}

function exportPDF(table, lanscape= true) {

    //width: ${ lanscape ? `297mm` : `210mm` };
    //height: ${ lanscape ? `210mm` : `297mm` };

    //@media print {
    //    html, body {
    //        width: ${ lanscape ? `297mm` : `210mm` };
    //        height: ${ lanscape ? `210mm` : `297mm` };
    //    }
    //}

    var html = `
        <html>
            <head>
                <meta charset="UTF-8">

                <style>
                                           
                    @page {
                        size: A4 ${ lanscape ? `landscape`: `` };
                        margin: 24px;
                    }

                    body{
                        -webkit-print-color-adjust: exact;
                        font-family: Arial, sans-serif;
                    }
                    
                    body, table{
                       font-size: 10px;
                    }

                    table{
                       border-collapse: collapse;
                    }

                    .tbl-cabecera{
                        width: 100%;
                    }

                    .tbl-lineas th{
                       border: thin solid #40AE49;
                       color: #40AE49;
                    }
                    
                    .tbl-linea th, .tbl-linea td{
                        width: auto;
                    }

                    .tbl-lineas tr.verde-claro{
                        background-color: #d8e0dc;
                    }

                    .tbl-lineas tr.verde-claro td{
                        background-color: #d8e0dc;
                    }

                    @media all {
                       div.saltopagina{
                          display: none;
                       }
                    }
   
                    @media print{
                       div.saltopagina{
                          display:block;
                          page-break-before:always;
                       }
                    }

                </style>
            </head>
            <body>${table}</body>
        </html>`;


    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write(html);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    //ventana.close();

    setTimeout(function () {
        //ventana.focus();
        //ventana.print();
        ventana.close();
    }, 1000);

    return true;
}


function exportWord(html, nameFile = "mi_word") {
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + html + footer;

    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = nameFile + '.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}


function filterFloat(evt,input){
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;    
    var chark = String.fromCharCode(key);
    var tempValue = input.value+chark;
    if(key >= 48 && key <= 57){
        if(filter(tempValue)=== false){
            return false;
        }else{       
            return true;
        }
    }else{
          if(key == 8 || key == 13 || key == 0) {     
              return true;              
          }else if(key == 46){
                if(filter(tempValue)=== false){
                    return false;
                }else{       
                    return true;
                }
          }else{
              return false;
          }
    }
}

function filter(__val__){
    var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
    if(preg.test(__val__) === true){
        return true;
    }else{
       return false;
    }
}

function NumCheck(e, field) {
    if ((e.charCode < 48 || e.charCode > 57) && (e.charCode != 46) && (e.charCode != 8)) {
        return false;
    } else {
        var len = field.value.length;
        var index = field.value.indexOf('.');

        if (index > 0 && e.charCode == 46) {
            return false;
        }
    }

    return true;
}

function soloNumerosConDecimales(input) {
    input.value = maskDinero(unmaskDinero(input.value));
}

function unmaskDinero(numeroString) {
    return +(numeroString.replace(/[^0-9.-]+/g, ""));
}
function maskDinero(numeroInt) {
    return parseFloat(numeroInt).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function cloneJSON(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object') {
        return obj
    }
    // array deep copy
    if (obj instanceof Array) {
        var cloneA = [];
        for (var i = 0; i < obj.length; ++i) {
            cloneA[i] = cloneJSON(obj[i]);
        }
        return cloneA;
    }
    // object deep copy
    var cloneO = {};
    for (var i in obj) {
        cloneO[i] = cloneJSON(obj[i]);
    }
    return cloneO;
}

function removeItemJSON(arr, key, val) {
    var new_arr = [];
    arr.map(function (item) {
        if (item[key] != val) new_arr.push(item);
    });

    return new_arr;
}

function removeItemsJSON(arr, key, arr_val) {
    var new_arr = [];

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        var existe = false;
        for (var c = 0; c < arr_val.length; c++) {
            if (item[key] == arr_val[c]) {
                existe = true;
                break;
            }
        }

        if (!existe) new_arr.push(item);
    }

    return new_arr;
}

//function array_move(arr, old_index, new_index) {
//    while (old_index < 0) {
//        old_index += arr.length;
//    }
//    while (new_index < 0) {
//        new_index += arr.length;
//    }
//    if (new_index >= arr.length) {
//        var k = new_index - arr.length + 1;
//        while (k--) {
//            arr.push(undefined);
//        }
//    }
//    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//    return arr; // for testing purposes
//};

function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

//swal
function swalConfirm(title, callback = function () { }, callback2 = function () { }) {
    swal({
        text: title,
        icon: 'warning',
        buttons: ["No", "Sí, continuar"],
    }).then((value) => {
        if (value) {

            swal({
                text: 'Espere...',
                buttons: false,
                closeOnClickOutside: false,
                closeOnEsc: false,
                closeEnterKey: false,
                onOpen: () => {
                    swal.showLoading();
                }
            });
            callback(value);
        } else {
            callback2(value);
        } 
    });
}

function ajax(type, url, dataJSON= null, callback = function () { }) {
    $.ajax({
        type: type,
        dataType: "json",
        url: url,
        data: (dataJSON== null ? null : JSON.stringify(dataJSON)),
        success: function (response) {
            //console.log(response);
            callback(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    });
}

function ajaxJSON(type, url, dataJSON = null, callback = function () { }) {
    $.ajax({
        type: type,
        //contentType: 'application/json',
        dataType: "json",
        url: url,
        data: (dataJSON == null ? null : dataJSON),
        success: function (response) {
            //console.log(response);
            callback(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    });
}

function ajaxDataJSON(type, url, dataJSON = null, callback = function () { }) {
    $.ajax({
        type: type,
        contentType: 'application/json',
        dataType: "json",
        url: url,
        data: (dataJSON == null ? null : dataJSON),
        success: function (response) {
            //console.log(response);
            callback(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    });
}


function choucesGetValueMultiple(choice) {
    return choice.getValue(true);
}

function choucesGetValueSingle(choice, nodata = 0) {
    return (choice.getValue(true) == undefined ? nodata : choice.getValue(true));
}


function formatoCeldaPorcentaje(params) {
    return (params.value == undefined || params.value == null || params.value.toString().trim().length == 0 ? 'N/A' : convertFormatNumber((params.value > 100 ? 100 : params.value), '') + " %");
}


//modal bootstrap
function loadModal(title, html_body, html_footer, text_close = 'Cerrar', big_modal = false, callback = function () { }) {
    var elem_modal = __elem('#modalGeneral');

    if (big_modal) elem_modal.querySelector('.modal-dialog').classList.add('big-modal');

    elem_modal.querySelector('.modal-header .modal-title').innerHTML = title;
    elem_modal.querySelector('.modal-body').innerHTML = html_body;
    elem_modal.querySelector('.modal-footer').innerHTML =
        `<button type="button" class="btn btn-success" data-dismiss="modal">${text_close}</button>
        ${html_footer}`;

    callback();

    $('#modalGeneral').modal('show');
}

function loadModalCustom(title, html_body, html_footer, text_close = 'Cerrar', size_modal = 2, callback = function () { }) {
    var elem_modal = __elem('#modalGeneral');

    if (size_modal == 0) {
        elem_modal.querySelector('.modal-dialog').classList.add('very-small-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('big-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('very-big-modal');
    }

    if (size_modal == 1) {
        elem_modal.querySelector('.modal-dialog').classList.remove('very-small-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('big-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('very-big-modal');
    }
    else if (size_modal == 2) {
        elem_modal.querySelector('.modal-dialog').classList.add('big-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('very-small-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('very-big-modal');
    }
    else if (size_modal == 3) {
        elem_modal.querySelector('.modal-dialog').classList.add('very-big-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('very-small-modal');
        elem_modal.querySelector('.modal-dialog').classList.remove('big-modal');
    }

    elem_modal.querySelector('.modal-header .modal-title').innerHTML = title;
    elem_modal.querySelector('.modal-body').innerHTML = html_body;
    elem_modal.querySelector('.modal-footer').innerHTML =
        `<button type="button" class="btn btn-success" data-dismiss="modal">${text_close}</button>
        ${html_footer}`;

    callback();

    $('#modalGeneral').modal('show');
}

function hideModal() {
    $('#modalGeneral').modal('hide');
}


//select pure
function loadCombo(str_elem, default_valor = null, data = [], callback = function () { }, textDefault = "--Seleccione--", textDefaultDisabled = true , str_description = 'strDescripccion', str_value = 'intValor', autocomplete = false, multiple = false) {
    var comboSingular = null;

    if (data.length > 0) {
        var strut = [];
        eliminarDatosLista(__elem(str_elem));

        strut.push({ label: textDefault, value: "0", disabled: textDefaultDisabled });

        //for (var i = 0; i <= data.length - 1; i++) {
        //    strut.push({ label: "" + data[i].strDescripccion + "", value: "" + data[i].intValor + "" });
        //}

        data.map(function (item) {
            strut.push({
                label: item[str_description].toString().trim(),
                value: item[str_value].toString().trim()
            });
        })

        comboSingular = new SelectPure(str_elem, {
            options: strut,
            value: (default_valor == null ? (!multiple ? "0" : []) : default_valor.toString().trim()),
            autocomplete: autocomplete,
            multiple: multiple,
            icon: (multiple ? "fa fa-times" : ""),
            onChange: value => {
                console.log("value combo: ", value.trim());

                callback(value.trim());
            },
        });

        if (default_valor) {
            comboSingular._setValue(default_valor.toString().trim());
        }

    }

    return comboSingular;
}



function getStrTimeHour(timeHour) {
    var hora = parseInt(timeHour.Hours);
    var minutes = parseInt(timeHour.Minutes);

    var str = `${(hora.toString().length > 1 ? hora : `0${hora}`)}:${(minutes.toString().length > 1 ? minutes : `0${minutes}`)}`;
    return str;
}


//number cell editor - porcentaje

function getCharCodeFromEvent(event) {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);

}

// function to act as a class
function NumericCellEditorPorcentaje() {
}

// gets called once before the renderer is used
NumericCellEditorPorcentaje.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = isCharNumeric(params.charPress) ? params.charPress : (params.value ? params.value : '');

    var that = this;
    this.eInput.addEventListener('keyup', function (event) {
        if (!isKeyPressedNumeric(event) && !NumCheck(event, event.target)) {
            that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
        } else {

            var valor = event.target.value;
            if (parseFloat(valor) > 100) {
                event.target.value = 100;
                event.preventDefault();
            }
        }
    });

    this.eInput.addEventListener('keypress', function (event) {
        if (!isKeyPressedNumeric(event) && !NumCheck(event, event.target)) {
            that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
        } else {

            var valor = event.target.value;
            if (parseFloat(valor) > 100) {
                event.target.value = 100;
                event.preventDefault();
            }
        }
    });

    // only start edit if key pressed is a number, not a letter
    var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
};

// gets called once when grid ready to insert the element
NumericCellEditorPorcentaje.prototype.getGui = function () {
    return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditorPorcentaje.prototype.afterGuiAttached = function () {
    this.eInput.focus();
};

// returns the new value after editing
NumericCellEditorPorcentaje.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditorPorcentaje.prototype.isCancelAfterEnd = function () {
    var value = this.getValue();
    return value.indexOf('007') >= 0;
};

// returns the new value after editing
NumericCellEditorPorcentaje.prototype.getValue = function () {
    return this.eInput.value;
};

// any cleanup we need to be done here
NumericCellEditorPorcentaje.prototype.destroy = function () {
    // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup 
NumericCellEditorPorcentaje.prototype.isPopup = function () {
    // and we could leave this method out also, false is the default
    return false;
};



function copiarAlPortapapeles(elem) {
  var aux = document.createElement("input");
    aux.setAttribute("value", elem.innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}