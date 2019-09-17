function draw(data)
{
    var margin = {top:20,right:20,bottom:30,left:40}
    
    var width = 500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var x = d3.scaleLinear().domain([0,300]).range([0, width]);
    var y = d3.scaleLinear().domain([0, height]).range([height+margin.bottom, 0]);

    var xScale = d3.scaleLinear().domain([]).range([0, width ]);
    var yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([d3.max(data)*5, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(6);

    var canvas = d3.select("body").append("svg").attr("class","percentage")
    .attr("width",500)
    .attr("height", 400)


    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 70)
        .attr("height", function(d){ return y(d); })
        .attr("x",function(d,i){ return (i*100)+margin.left; })
        .attr("fill","#4285f4")
        .attr("y", function(d) {return y(d);})
        // .attr("transform", "translate( 0 ,"+height+")")


    canvas.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){ return d+"%";})
            .attr("x",function(d,i){ return ((i*100)+40/2)+margin.left; })
            .attr("y",function(d) {return y(((d*5))-margin.bottom);})
            .attr("font-size","20px")
            .attr("fill","white")

            var xLabel = ["Active >1 Day","Active 1 day","Inactive"];

            var eg = d3.max(data)+margin.top+margin.bottom;
            
            canvas.append("g").call(xAxis).attr("transform", "translate(" + margin.top + ","+height+")");
            canvas.append("g").call(yAxis).attr("transform", "translate(" + margin.left + ","+eg+")");
}

d3.json("./first.json").then(function(data)
{
    d3.select("#selected-dropdown").text("All");
        var text = d3.select("option").text();
        if(text == "All" || text == "Schools")
        {
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
                    
                    // d3.select("body").data(array1).enter().call(function(d){ console.log(d);cp(d); })
                    draw(array1);
                        
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }

                    // d3.select("body").data(array1).enter().call(function(d){ console.log(d);cn(d); })
                    draw(array2);
                    
            }
            d3.select("#myDate").text("Till Date");
            d3.select("#date-dropdown")
            .on("change",function(d){
                d3.select("body").selectAll("svg").remove();
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
                // d3.select("body").data(array1).enter().call(function(d){ cp(d); })
                draw(array1);

                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("body").data(array1).enter().call(function(d){ cn(d); })
                    draw(array2);
                })
        }
        d3.select("#selected-dropdown").text("All");
        d3.select("select")
        .on("change",function(d){
            d3.select("body").selectAll("svg").remove();
            var selected = d3.select("#d3-dropdown").node().value;

            if( selected == "Schools" || selected == "All")
            {
                d3.select("body").selectAll("svg").remove();
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
                    
                    // d3.select("body").data(array1).enter().call(function(d){ console.log(d);cp(d); })
                    draw(array1);
                        
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }

                    // d3.select("body").data(array1).enter().call(function(d){ console.log(d);cn(d); })
                    draw(array2);
                    
            }
            d3.select("#myDate").text("Till Date");
            d3.select("#date-dropdown")
            .on("change",function(d){
                d3.select("body").selectAll("svg").remove();
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
                // d3.select("body").data(array1).enter().call(function(d){ cp(d); })
                draw(array1);

                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("body").data(array1).enter().call(function(d){ cn(d); })
                    draw(array2);
                })
            }
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
                        // d3.select("body").data(array1).enter().call(function(d){ cp(d); })
                        draw(array1);
                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("body").data(array1).enter().call(function(d){ cn(d); })
                    draw(array2);
            }
            d3.select("#myDate").text("Till Date");
            d3.select("selectedDate")
            .on("change",function(d){
                d3.select("body").selectAll("svg").remove();
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
                        
                        // d3.select("body").data(array1).enter().call(function(d){ cp(d); })
                        draw(array1);
                
                    testChars = testDate["Frequency"];
                    // console.log(testChars);
                    var array2 = [];
                    for(a in testChars){
                        // console.log(testChars[a]);
                        array2.push(testChars[a]);
                    }
                    // d3.select("body").data(array1).enter().call(function(d){ cn(d); })
                    draw(array2);
                })
            })
})