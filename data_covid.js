var all_data
// Get data
function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
}

function converData(data) {
    var all = []
    for(var i = 0; i < data['Afghanistan'].length; i++) {
        var date_item = data['Afghanistan'][i].date
        all[date_item] = []
        for (let [key, value] of Object.entries(data)) {
            all[date_item].push({network: key, confirmed: value[i].confirmed, deaths: value[i].deaths, recovered: value[i].recovered})
        }

        if(i == data['Afghanistan'].length -1 ) {
            return all
        }
    }
}

function getData() {
    var request = makeHttpObject(), data;
    request.open("GET", "https://pomber.github.io/covid19/timeseries.json", true);
    request.send(null);
    request.onreadystatechange = function() {
    if (request.readyState == 4)
        data = request.responseText

        if(data) {
            if (typeof(Storage) !== "undefined") {
                localStorage.covid = data;
                var d = new Date();
                localStorage.da = d.getTime();
            }

            data = JSON.parse(data);
            all_data = converData(data)
            chart(all_data)
        }
    };
}

if(typeof(Storage) !== "undefined" && localStorage.covid) {
    var data = JSON.parse(localStorage.covid)
    var d = new Date().getTime();
    var com = d - localStorage.da
    if(com > 60*60*1*1000) {
        getData()
    } else {
        all_data = converData(data)
        chart(all_data)
    }
    
} else {
    getData()
}

function selectType(typeS) { // ,confirmed, deaths, recovered
    document.getElementById("text").innerHTML = typeS
    chart(all_data, typeS)
}