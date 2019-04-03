var columnDefs = [
    {field: "athlete", width: 150, enableRowGroup: true},
    {field: "age"},
    {field: "country", enableRowGroup: true},
    {field: "year", enableRowGroup: true},
    {field: "sport", enableRowGroup: true},
    {field: "date"},
    {field: "gold", enableValue: true, editable: true},
    {field: "silver", enableValue: true, editable: true},
    {field: "bronze", enableValue: true, editable: true},
    {field: "total", enableValue: true, editable: true}
];

var gridOptions = {
    defaultColDef: {
        width: 100,
        resizable: true,
        sortable: true
    },
    columnDefs: columnDefs,
    enableRangeSelection: true,
    enableCharts: true,
    onFirstDataRendered: onFirstDataRendered
};

function onFirstDataRendered() {
    let eContainer1 = document.querySelector('#chart1');
    let cellRangeParams1 = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['total']
    };
    gridOptions.api.chartRange(cellRangeParams1, 'groupedBar', eContainer1);


    let eContainer2 = document.querySelector('#chart2');
    let cellRangeParams2 = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['total']
    };
    gridOptions.api.chartRange(cellRangeParams2, 'pie', eContainer2);


    let eContainer3 = document.querySelector('#chart3');
    let cellRangeParams3 = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['total']
    };
    gridOptions.api.chartRange(cellRangeParams3, 'line', eContainer3);

}


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/wideSpreadOfSports.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});