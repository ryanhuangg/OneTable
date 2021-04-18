"use strict";

function TableGenerator() {
	this.data = [
        ["Name", "Age", "School"],
        ["Ryan", 23, "UofT"],
        ["Nicole", 21, "UofT"],
        ["Kyle", 21, "UofT"],
        ["John", 19, "Uwaterloo"]
    ]
  	this.tablediv = document.createElement('div');
    this.table = document.createElement('table');
  	this.tablediv.append(this.table)
}


TableGenerator.prototype = {

	makeTable: function(parent) {
        var i = 0;
        var j = 0;
        for (i = 0; i < this.data.length; i++) {
            const row = document.createElement("tr");
            for (j = 0; j < this.data[0].length; j++) {
                const item = document.createElement("td");
                item.innerHTML = this.data[i][j];
                if (this.data[i][j] == undefined) {
                    item.innerHTML = "";
                }
                row.append(item);
            }
            this.table.append(row);
        }

        this.table.rows[0].style = "background-color: #4287f5";
		this.tablediv.style = 'width: 95%; height: 400px; margin: 10px; background-color: White; max-height: 100%;'
      	this.table.style = 'width: 100%; max-height: 100%; overflow-y: scroll;'

		parent.append(this.tablediv)
	},

    styleTable: function(headercolour, contentcolour, headerfont, contentfont) {
        this.table.rows[0].style.backgroundColor = headercolour;
        
        let rows = this.table.rows;
        let i = 0;
        for (i=0; i<this.data.length; i++) {
            if (i != 0 && i % 2 == 0) {
                rows[i].style.backgroundColor = contentcolour;
            }
            rows[i].style.color = contentfont;
        }
        this.table.rows[0].style.color = headerfont;
    },

    changeFont: function(font, size) {
        this.table.style.fontFamily = font;
        this.table.style.fontSize = size;
    },

    addRow: function(data) {
      	const row = document.createElement("tr");
        let j = 0;
      	for (j = 0; j < this.data[0].length; j++) {
            const item = document.createElement("td");
            item.innerHTML = data[j];
            row.append(item);
        }
      	this.table.append(row)
        this.data.push(data)
    },

    addColumn: function(attribute) {
        var i = 0;
        var cells = this.table.getElementsByTagName('tr');
        const firstrow = document.createElement("td");
        firstrow.innerHTML = attribute;
        cells[0].append(firstrow);
        this.data[0].push(attribute);
        for (i = 1; i < this.data.length; i++) {
            const item = document.createElement("td");
            item.innerHTML = "";
            cells[i].append(item);
            this.data[i].push("");
        }
    },

    removeColumn: function(attribute) {
        if (parseInt(attribute) < this.data[0].length){
            var i = 0;
            var rows = this.table.rows;
            for (i = 0; i < this.data.length; i++) {
                rows[i].deleteCell(attribute);
                this.data[i].splice(attribute, 1);
            }
        }
        else {
            let att = this.data[0].indexOf(attribute);
            if (att != -1) {
                var i = 0;
                var rows = this.table.rows;
                for (i = 0; i < this.data.length; i++) {
                    rows[i].deleteCell(att);
                    this.data[i].splice(att, 1);
                }
            }
            
        }
        
    },


	getRow: function(rownum){
    	var cells = this.table.getElementsByTagName('tr');
        var selected = cells[rownum];
        var original = cells[rownum].style.backgroundColor;
        console.log(original);
        cells[rownum].style = 'background-color: Yellow'
        setTimeout(function () {
            cells[rownum].style.backgroundColor = original;
        }, 3000);
        return selected;
    },

  	removeRow: function(rownum) {
      	this.table.deleteRow(rownum);
        this.data.splice(rownum, 1);
    },

    changeAlign: function(alignment) {
        this.table.style.textAlign = alignment;
    },

    exportCSV: function() {
        let csv = "data:text/csv;charset=utf-8,";

        this.data.forEach(function(rowArr) {
            let r = rowArr.join(",");
            csv += r + "\r\n";
        })
        var encoded = encodeURI(csv);
        var link = document.createElement("a");
        link.setAttribute("href", encoded);
        link.setAttribute("download", "table.csv");
        document.body.appendChild(link);
        link.click();
    },

    sortCol: function(colIndex, order){
        if (colIndex < this.data[0].length) {
            console.log(order);
            if (order == "ascending"){
                var dat = this.data.slice(1).sort(sortFunction)
            }
            else {
                var dat = this.data.slice(1).sort(sortDescending)
            }
            function sortFunction(a, b) {
                a = a[colIndex]
                b = b[colIndex]
                if (!isNaN(a) && !isNaN(b)) {
                    a = parseInt(a);
                    b = parseInt(b);
                }
                return (a === b) ? 0 : (a < b) ? -1 : 1
            }

            function sortDescending(a, b) {
                a = a[colIndex]
                b = b[colIndex]
                if (!isNaN(a) && !isNaN(b)) {
                    a = parseInt(a);
                    b = parseInt(b);
                }
                return (a === b) ? 0 : (a > b) ? -1 : 1
            }
            var header = this.data[0]
            this.data = [];
            this.data.push(header);
            for (var i=0; i<dat.length; i++) {
                this.data.push(dat[i]);
            }
            this.table.innerHTML = "";
            this.makeTable($(table).parent());
        }
        else {
            alert("Exceeded highest column index");
        }
    },

    changeElement: function(row, col, val) {
        if (row > 0 && row < this.data.length && col < this.data[0].length) {
            this.data[row][col] = val;
            this.table.innerHTML = "";
            this.makeTable($(table).parent());
        }
        console.log(this.data)
    },

    sumColumn: function(col) {
        var total = 0;
        for (var i=1; i<this.data.length; i++) {
            var par = parseInt(this.data[i][col]);
            if (par == NaN) {
                return;
            }
            else {
                total += par;
            }
        }
        return total;
    },

    avgColumn: function(col) {
        console.log(this.sumColumn(col)/(this.data.length - 1));
        return this.sumColumn(col)/(this.data.length - 1);
    },

    
    csvToTable: function(res) {
        console.log(res);
        var rows = res.split("\n");
        for (var i=0; i<rows.length; i++) {
            rows[i] = rows[i].split(',');
        }
        if (rows[rows.length - 1][0] == "") {
            rows.pop();
        }
        console.log(rows);
        console.log(this.data);
        this.data = rows;
        console.log(this.data[0].length);
        this.table.innerHTML = "";
        this.makeTable($(table).parent());
    }


}