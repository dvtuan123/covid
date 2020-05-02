// var typeChart = "confirmed"
// var date = "2020-1-22";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    return [year, month, day].join('-');
}

// function sortArr(arr) {
//     return arr.sort((a, b) => {
//         var keyA = a.confirmed,
//             keyB = b.confirmed;
//         // Compare the 2 dates
//         if (keyA > keyB) return -1;
//         if (keyA < keyB) return 1;
//         return 0;
//     });
// }

function chart(allData, typeChart = "confirmed") {
    var date = "2020-1-22";
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [
        { "number": 1e+3, "suffix": "K" },
        { "number": 1e+6, "suffix": "M" },
        { "number": 1e+9, "suffix": "B" }
    ];

    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;

    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function(event) {
        if (event.target.isActive) {
            play();
        }
        else {
            stop();
        }
    })

    var stepDuration = 500;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = typeChart;// "confirmed"
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.')}";
    // labelBullet.label.textAlign = "right";
    labelBullet.label.dx = 10;
    labelBullet.label.hideOversized = false;
    labelBullet.label.truncate = false;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
        return chart.colors.getIndex(target.dataItem.index);
    });


    label.text = date;

    var interval;

    function play() {
        nextYear();

        interval = setInterval(function(){
        nextYear();
        }, stepDuration)
    }

    function stop() {
        if (interval) {
        clearInterval(interval);
        }
    }

    function nextYear() {
        date = formatDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)))

        // var newData = sortArr(allData[date]);
        var newData = allData[date];

        var itemsWithNonZero = 0;
        if(newData) {
            for (var i = 0; i < chart.data.length; i++) {
                // console.log('i' + i)
                chart.data[i][typeChart] = newData[i][typeChart];
                if (chart.data[i][typeChart] > 0) {
                    itemsWithNonZero++;
                }
            }

            series.interpolationDuration = stepDuration;
            valueAxis.rangeChangeDuration = stepDuration;

            chart.invalidateRawData();
            label.text = date;

            var end = itemsWithNonZero / categoryAxis.dataItems.length
            if(end > 0.06) {
                end = 0.06;
            }
            categoryAxis.zoom({ start: 0, end: end });
        } else {
            stop()
        }
    }


    categoryAxis.sortBySeries = series;

    chart.data = JSON.parse(JSON.stringify(allData[date]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    series.events.on("inited", function() {
        setTimeout(function() {
        playButton.isActive = true; // this starts interval
        }, 2000)
    })

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "top";

    chart.exporting.menu.items = [{
        "label": "...   ",
        "menu": [
          { "type": "png", "label": "PNG", "options": { "quality": 1 } },
          { "type": "json", "label": "JSON", "options": { "indent": 2, "useTimestamps": true } },
          { "type": "gif", "label": "Gif", "options": { "quality": 1 } },
          { "label": "Print", "type": "print" }
        ]
    }];

}; // end am4core.ready()

function savePDF() {
    chart.exporting.getImage("png")
    // Promise.all([
    //   chart.exporting.pdfmake,
    //   chart.exporting.getImage("png"),
    // ], function(res) {
    //     console.log(res)
    //    // pdfmake and chart snapshots are ready
    //    // res[0] contains pdfmake instance
    //    // res[1] contains shapshot of chart 1
    //    // etc.
    //    let pdfMake = res[0];
    // });
}