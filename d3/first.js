function cp(data){
    console.log(data);

    var width = 500;
    var height = 400;

    var x = d3.scaleLinear().domain([0,300]).range([0, 300]);
    var y = d3.scaleLinear().domain([0, height]).range([height, 0]);

    // var eg = d3.scaleLinear().domain([0, d3.max(data)]).range([0,200]);

    var xScale = d3.scaleLinear().domain([]).range([0, 300]);
    var yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([200, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(6);

    var canvas = d3.select("#first").append("svg").attr("class","percentage")
    .attr("width",width)
    .attr("height", height)
    .attr("transform","translate(50,0)")

    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 70)
        .attr("height", function(d){ return d*5; })
        .attr("x",function(d,i){ return i*100; })
        .attr("fill","#4285f4")
        .attr("y", function(d) {return y(d*5);})
        .attr("transform","translate(100,-100)");

    canvas.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){ return d+"%";})
            .attr("x",function(d,i){ return (i*100)+40/2; })
            .attr("y",function(d) {return y((d*2)/3);})
            .attr("font-size","20px")
            .attr("fill","white")
            .attr("transform","translate(100,-150)");

            var xLabel = ["Active >1 Day","Active 1 day","Inactive"]

            canvas.selectAll("#xLabel")
                .data(xLabel)
                .enter()
                .append("text")
                .attr("class","xLabel")
                .text(function(d){ return d })
                .attr("fill","black")
                .attr("class","text2")
                .attr("y",200)
                .attr("x",function(d,i){ return (i*100)+40/2})
                .attr("transform","translate(85,120)")
                .attr("fill","#A9A9A9")
                .attr("font-size",12)

            var xName = ["Activity"];
            var yName = ["Percentage of users"]

            canvas.selectAll("#xName")
                .data(xName)
                .enter()
                .append("text")
                .text(function(d){ return d })
                .attr("fill","black")
                .attr("class","xName")
                .attr("y",340)
                .attr("x",200)
                .attr("fill","#A9A9A9")
                .attr("font-size",12)

            canvas.selectAll("#yName")
                .data(yName)
                .enter()
                .append("text")
                .text(function(d){ return d })
                .attr("fill","black")
                .attr("class","yName")
                .attr("y",100)
                .attr("x",50)
                .attr("transform","translate(-50,300)rotate(-90)")
                .attr("fill","#A9A9A9")
                .attr("font-size",12)

            
            canvas.append("g").call(xAxis).attr("transform","translate(100,300)");
            canvas.append("g").call(yAxis).attr("transform","translate(100,100)");
}

function cn(data){
    var width = 500;
    var height = 400;

    var x = d3.scaleLinear().domain([0,300]).range([0, 300]);
    var y = d3.scaleLinear().domain([0, height]).range([height, 0]);

    var xScale = d3.scaleLinear().domain([]).range([0, 300]);
    var yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([250, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(6);

    var canvas = d3.select("#first").append("svg").attr("class","frequency")
    .attr("width",width)
    .attr("height", height)
    .attr("transform","translate(100,0)")

    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 70)
        .attr("height", function(d){ return d * 5; })
        .attr("x",function(d,i){ return i*100; })
        .attr("fill","#4285f4")
        .attr("y", function(d) {return y(d*5);})
        .attr("transform","translate(100,-100)");

    canvas.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){ return d;})
            .attr("x",function(d,i){ return (i*100)+40/2; })
            .attr("y",function(d) {return y(d*2);})
            .attr("font-size","20px")
            .attr("fill","white")
            .attr("transform","translate(100,-100)");

    var xLabel = ["Active >1 Day","Active 1 day","Inactive"]

    canvas.selectAll("#xLabel")
        .data(xLabel)
        .enter()
        .append("text")
        .attr("class","xLabel")
        .text(function(d){ return d })
        .attr("fill","black")
        .attr("class","text2")
        .attr("y",200)
        .attr("x",function(d,i){ return (i*100)+40/2})
        .attr("transform","translate(85,120)")
        .attr("fill","#A9A9A9")
        .attr("font-size",12)

            var xName = ["Activity"];
            var yName = ["Number of users"]

            canvas.selectAll("#xName")
                .data(xName)
                .enter()
                .append("text")
                .text(function(d){ return d })
                .attr("fill","black")
                .attr("class","xName")
                .attr("y",340)
                .attr("x",200)
                .attr("fill","#A9A9A9")
                .attr("font-size",12)

            canvas.selectAll("#yName")
                .data(yName)
                .enter()
                .append("text")
                .text(function(d){ return d })
                .attr("fill","black")
                .attr("class","yName")
                .attr("y",100)
                .attr("x",100)
                .attr("transform","translate(-50,350)rotate(-90)")
                .attr("fill","#A9A9A9")
                .attr("font-size",12)

            
            canvas.append("g").call(xAxis).attr("transform","translate(100,300)");
            canvas.append("g").call(yAxis).attr("transform","translate(100,50)");
                
}



d3.json("./first.json").then(
    function(data){
        
        d3.select("#selected-dropdown").text("All");
        var text = d3.select("option").text();
        if(text == "All" || text == "Schools"){
            var chars = data["All"];
            d3.select("#myDate").text("Till Date");
            var date = d3.select("#date-dropdown").select("option").text();
            // console.log(date);
            if( date == "Till Date"){
                var testDate = chars["Till Date"];
                // console.log(testDate);
                        var testChars = testDate["Percentage"];
                        // console.log(testChars);
                        var array1 = [];
                        for(a in testChars){
                            // console.log(testChars[a]);
                            array1.push(testChars[a]);
                            // console.log(array1);
                        }
                    
                    // d3.select("#first").data(array1).enter().call(function(d){ console.log(d);cp(d); })
                    cp(array1);
                        
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }

                    // d3.select("#first").data(array1).enter().call(function(d){ console.log(d);cn(d); })
                    cn(array2);
                    
            }
            d3.select("#myDate").text("Till Date");
            d3.select("#date-dropdown")
            .on("change",function(d){
                d3.select("#first").selectAll("svg").remove();
                var selectedDate = d3.select("#date-dropdown").node().value;
                // console.log(selectedDate);
                var testDate = chars[selectedDate];
                // console.log(testDate);
                var testChars = testDate["Percentage"];
                // console.log(testChars);
                var array1 = [];
                for(a in testChars){
                    // console.log(testChars[a]);
                    array1.push(testChars[a]);
                }
                // d3.select("#first").data(array1).enter().call(function(d){ cp(d); })
                cp(array1);

                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("#first").data(array1).enter().call(function(d){ cn(d); })
                    cn(array2);
                })
        }
        d3.select("#selected-dropdown").text("All");
        d3.select("select")
        .on("change",function(d){
            d3.select("#first").selectAll("svg").remove();
            var selected = d3.select("#d3-dropdown").node().value;
            // console.log( selected );
            d3.select("#selected-dropdown").text(selected);
                    var chars = data[selected];
                    // console.log(chars);
                    d3.select("#myDate").text("Till Date");
                    var date = d3.select("#date-dropdown").select("option").text();
                    // console.log(date);
                    if( date == "Till Date"){
                    var testDate = chars["Till Date"];
                    // console.log(testDate);
                        var testChars = testDate["Percentage"];
                        // console.log(testChars);
                        array1 = [];
                        for(a in testChars){
                            // console.log(testChars[a]);
                            array1.push(testChars[a]);
                        }
                        // d3.select("#first").data(array1).enter().call(function(d){ cp(d); })
                        cp(array1);
                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("#first").data(array1).enter().call(function(d){ cn(d); })
                    cn(array2);
            }
            d3.select("#myDate").text("Till Date");
            d3.select("selectedDate")
            .on("change",function(d){
                d3.select("#first").selectAll("svg").remove();
                // console.log(d);
                var selectedDate = d3.select("#date-dropdown").node().value;
                var testDate = chars[selectedDate];
                // console.log(testDate);
                        var testChars = testDate["Percentage"];
                        // console.log(testChars);
                        var array1 = [];
                        for(a in testChars){
                            // console.log(testChars[a]);
                            array1.push(testChars[a]);
                        }
                        
                        // d3.select("#first").data(array1).enter().call(function(d){ cp(d); })
                        cp(array1);
                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("#first").data(array1).enter().call(function(d){ cn(d); })
                    cn(array2);
                })
            })

            
        });