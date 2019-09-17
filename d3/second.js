function drawP(data)
{
    var xScale = d3.scaleLinear().domain([0,d3.max(data)]).range([0, 200]);
    var yScale = d3.scaleLinear().domain([0,250]).range([250, 0]);
    
    var container = d3.select("#second").append("svg").attr("width",120).attr("height",300)
                    .attr("transform","translate(100,0)");

    var colors = d3.scaleOrdinal().domain([]).range(["#4285f4","#db4437","#f4b400"]);

    container.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", 30+"%")
    .attr("height", function(d){ console.log(d);return d*4; })
    .attr("x",function(d,i){ return i*35; })
    .attr("y",function(d){ return yScale(d*4); })
    .attr("fill",function(d,i){ return colors(i); });

    container.selectAll("#myText")
                .data(data)
                .enter()
                .append('text')
                .text(function(d){ return d+"%"; })
                .attr('x',function(d,i){ return (i*35)+10 })
                .attr('y',function(d) {return yScale((d*4)/2);})
                .attr('fill',"Black")
                .attr("font-size",10);

}

function canvas(data)
{
    for(a in data)
    {
        for(b in data[a])
        {    
            var bars = d3.values(data[a][b]["Percentage"]);
            console.log(bars);
        }
    }

    var xScale = d3.scaleLinear().domain([]).range([0, 710]);
    var yScale = d3.scaleLinear().domain([0,d3.max(bars)]).range([200, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
        
    var xContainer = d3.select("#second").append("svg").attr("width",710).attr("height",100)
            .attr("x",0)
            .attr("y",210)
            .attr("transform","translate(-500,50)");

    var yContainer = d3.select("#second").append("svg").attr("width",35).attr("height",270)
                        .attr("x",0)
                        .attr("y",0)
                        .attr("transform","translate(75,-315)");

    xContainer.append("g").call(xAxis)
    yContainer.append("g").call(yAxis).attr("transform","translate(25,60)");

    var xLabel = d3.keys(data);

    xContainer.selectAll("#xlabel").data(xLabel).enter()
                .append("text")
                .text(function(d){ return d })
                .attr("x",function(d,i){ return i*120 })
                .attr("transform","translate(0,30)")
                .attr("fill","#A9A9A9")
                .attr("font-size","12");

}

function legend()
{
        var legend = d3.select("#second").append("svg").attr("width",150).attr("height",100)
                    .attr("transform","translate(700,-400)");

        var key = ["Active >1 day","Active 1 day", "Inactive"];

        var size = 20

        legend.selectAll("text")
            .data(key)
            .enter()
            .append('text')
            .text(function(d){ return d;})
            .attr("class","text1")
            .attr("x", 25 )
            .attr("y", function(d,i){ return i*(size+5)}) 
            .attr("width", size)
            .attr("height", size)
            .attr("transform","translate(0,15)")
            .attr("fill","#A9A9A9")
            .attr("font-size","12");;

        var legendColor = d3.scaleOrdinal()
        .domain(key)
        .range(["#4285f4","#db4437","#f4b400"]);


        legend.selectAll(".legendCoverage")
        .data(key)
        .enter()
        .append("rect")
        .attr("x",0)
        .attr("y", function(d,i){ return i*(size+5)}) 
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return legendColor(d)})
        
}


d3.json("./second.json").then(
    
    function(data)
    {
        d3.select("#second").attr("transform","translate(100,0)");

        for(a in data)
        {
            var school = data[a];
            
            for(b in school)
            {
                var time = school[b];
                var percentage = d3.values(time["Percentage"]);
                var frequency = d3.values(time["Frequency"]);

            }
            
            var dateDropdown = d3.select("#dropdown").select("option").text();
            if(dateDropdown == "Till Date")
                {
                    percentage = d3.values(school["Till Date"]["Percentage"]);
                    frequency = d3.values(school["Till Date"]["Frequency"]);
                    console.log(percentage);
                    console.log(frequency);

                    drawP(percentage);
                    // drawF(frequency);

                }
                d3.select("#dropdown")
                .on("change",function()
                {
                    d3.select("#second").selectAll("svg").remove();
            
                        dateDropdown = d3.select("#dropdown").node().value;
        
                            for(a in data)
                            {
                                percentage = d3.values(data[a][dateDropdown]["Percentage"]);
                                frequency = d3.values(data[a][dateDropdown]["Frequency"]);
                                console.log(percentage);
                                console.log(frequency);
                                console.log(dateDropdown);
                                drawP(percentage);
                            }

                    canvas(data);
                    legend();
                    
                })

        }
        canvas(data);
        legend();
    })