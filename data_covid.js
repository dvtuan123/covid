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
    // var data = {
    //     'BN1': [2,4,2,2,7,5,4,11,7,5,8,8,5,7,1,3,3,9,2,3,4,7,2,5,7,2,3,0,0,0], 
    //     'BN2': [2,1,2,6,2,0,3,0,2,3,4,2,2,1,0,1,3,3,0,4,2,0,2,4,3,2,1,0,0,0], 
    //     'GB': [6,9,11,9,4,8,5,6,9,6,11,9,3,10,9,6,8,5,4,0,7,3,5,9,4,6,5,0,0,0], 
    //     'LT1': [3,5,4,5,4,2,6,8,5,6,6,3,3,6,2,7,4,1,4,1,1,2,0,8,8,12,2,0,0,0], 
    //     'LT2': [9,7,6,3,9,2,9,13,13,10,10,16,7,10,11,4,16,6,13,9,8,4,12,10,13,8,6,0,0,0]
    // }

    var data = {
        'BN1': [2, 6, 8, 10, 17, 22, 26, 37, 44, 49, 57, 65, 70, 77, 78, 81, 84, 93, 95, 98, 102, 109, 111, 116, 123, 125, 128, 128, 128, 128], 
        'BN2': [2, 3, 5, 11, 13, 13, 16, 16, 18, 21, 25, 27, 29, 30, 30, 31, 34, 37, 37, 41, 43, 43, 45, 49, 52, 54, 55, 55, 55, 55], 
        'GB': [6, 15, 26, 35, 39, 47, 52, 58, 67, 73, 84, 93, 96, 106, 115, 121, 129, 134, 138, 138, 145, 148, 153, 162, 166, 172, 177, 177, 177, 177], 
        'LT1': [3, 8, 12, 17, 21, 23, 29, 37, 42, 48, 54, 57, 60, 66, 68, 75, 79, 80, 84, 85, 86, 88, 88, 96, 104, 116, 118, 118, 118, 118], 
        'LT2': [9, 16, 22, 25, 34, 36, 45, 58, 71, 81, 91, 107, 114, 124, 135, 139, 155, 161, 174, 183, 191, 195, 207, 217, 230, 238, 244, 244, 244, 244]
    }

    // for (let [key, value] of Object.entries(data)) {
    //     console.log(key)
    //     console.log(value[2])
        for(var i = 1; i <= 30; i++) {
            all['2020-6-' + i] = []

            for (let [key, value] of Object.entries(data)) {
                all['2020-6-' + i].push({network: key, samari: value[i-1]})
            }
        }
    // }

    return all

    // for(var n = 0; n < network.length; n++) {

    // }

    // for(var i = 1; i <= 30; i++) {
    //     var date_item = data['Afghanistan'][i].date
    //     all[date_item] = []
    //     for (let [key, value] of Object.entries(data)) {
    //         all[date_item].push({network: key, confirmed: value[i].confirmed, deaths: value[i].deaths, recovered: value[i].recovered})
    //     }

    //     if(i == data['Afghanistan'].length -1 ) {
    //         return all
    //     }
    // }
}

/**
 * BN1  = [2,4,2,2,7,5,4,11,7,5,8,8,5,7,1,3,3,9,2,3,4,7,2,5,7,2,3,0,0,0]
 * BN2  = [2,1,2,6,2,0,3,0,2,3,4,2,2,1,0,1,3,3,0,4,2,0,2,4,3,2,1,0,0,0]
 * GB   = [6,9,11,9,4,8,5,6,9,6,11,9,3,10,9,6,8,5,4,0,7,3,5,9,4,6,5,0,0,0]
 * LT1  = [3,5,4,5,4,2,6,8,5,6,6,3,3,6,2,7,4,1,4,1,1,2,0,8,8,12,2,0,0,0]
 * LT2  = [9,7,6,3,9,2,9,13,13,10,10,16,7,10,11,4,16,6,13,9,8,4,12,10,13,8,6,0,0,0]
 */

// Check data example
// var demo = {
//     2020-6-1:[
//         {
//             network: BN1,
//             samari: 2
//         },
//         {
//             network: BN2,
//             samari: 2
//         },
//         {
//             network: GB,
//             samari: 2
//         },
//         {
//             network: LT1,
//             samari: 2
//         },
//         {
//             network: LT2,
//             samari: 2
//         }
//     ]
// }

function getData() {
    all_data = converData()

    console.log(all_data)
    chart(all_data)
}

getData()

function selectType(typeS) { // ,confirmed, deaths, recovered
    document.getElementById("text").innerHTML = typeS
    chart(all_data, typeS)
}
