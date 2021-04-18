const table = new TableGenerator();
table.makeTable(document.getElementById("demo"));

const rowadd = document.getElementById("rowadd");
rowadd.addEventListener('click', ()=>{
  table.addRow([document.getElementById("name").value, document.getElementById("age").value, document.getElementById("school").value]);
})

const rowremove = document.getElementById("rowremove");
rowremove.addEventListener('click', ()=>{
    table.removeRow(document.getElementById("rownum").value);
})

const getrow = document.getElementById("getrow");
getrow.addEventListener('click', ()=>{
    table.getRow(document.getElementById("rownum").value);
})

const columnadd = document.getElementById("columnadd");
columnadd.addEventListener('click', ()=>{
    table.addColumn(document.getElementById("column").value);
})

const columndelete = document.getElementById("columndelete");
columndelete.addEventListener('click', ()=>{
    table.removeColumn(document.getElementById("column").value);
})

const tablefont = document.getElementById("tablefont");
tablefont.addEventListener('click', ()=>{
    table.styleTable(document.getElementById("headerback").value, document.getElementById("contentback").value, document.getElementById("headertext").value,
                document.getElementById("contenttext").value);
})

const changefonts = document.getElementById("changefonts");
changefonts.addEventListener('click', ()=>{
    table.changeFont(document.getElementById("fontfam").value, document.getElementById("fontsize").value);
})

const changealign = document.getElementById("changealign");
changealign.addEventListener('click', ()=>{
    table.changeAlign(document.getElementById("alignment").value);
})

const download = document.getElementById("downloadLink");
download.addEventListener('click', ()=>{
    table.exportCSV();
})

const sort = document.getElementById("sort");
sort.addEventListener('click', ()=>{
    table.sortCol(document.getElementById("sortby").value, document.getElementById("order").value);
})

const changeVal = document.getElementById("changeval");
changeVal.addEventListener('click', ()=>{
    table.changeElement(document.getElementById("changerow").value, document.getElementById("changecol").value, document.getElementById("changevalue").value);
})

const sum = document.getElementById("sumbutton");
sum.addEventListener('click', ()=>{
    alert("The sum of column " + document.getElementById("sum").value + " is " + table.sumColumn(document.getElementById("sum").value));
})

const average = document.getElementById("average");
average.addEventListener('click', ()=>{
    alert("The average for column " + document.getElementById("avrg").value + " is " + table.avgColumn(document.getElementById("avrg").value));

})

const importCSV = document.getElementById("importCSV");
importCSV.addEventListener('change', ()=>{
    var reader = new FileReader();
    reader.onload = function(e) {
        let res = reader.result;
        console.log(res);
        res.writable = true;
        table.csvToTable(res);
    }
    reader.readAsText(document.getElementById("importCSV").files[0]);
})