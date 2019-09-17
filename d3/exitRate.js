function drawExit(data)
{
        // console.log(data);

        for(a in data){
            var chars = data[a];
            var domain = d3.keys(chars);
            var array = [];
            // console.log(a);
            for(b in data[a])
            {
                // console.log(b);
                array.push(data[a][b]);
                // console.log(array);
            }

            var xScale = d3.scaleLinear().domain([0,d3.max(data)]).range([0, 200]);
            var yScaleBar = d3.scaleLinear().domain([0,250]).range([250, 0]);
            
            var container = d3.select("#exit").append("svg").attr("width",120).attr("height",250)
                            .attr("transform","translate(100,0)");

            var colors = d3.scaleOrdinal().domain([])
            .range(["#4285f4","#db4437"]);

            container.selectAll("rect")
                .data(array)
                .enter()
                .append("rect")
                .attr("width", 30+"%")
                .attr("height", function(d){ return d*4; })
                .attr("x",function(d,i){ return i*35; })
                .attr("y",function(d){ return yScaleBar(d*4); })
                .attr("fill",function(d,i){ return colors(i); });

            container.selectAll("#myText")
                .data(array)
                .enter()
                .append('text')
                .text(function(d){ return d+"%"; })
                .attr('x',function(d,i){ return (i*35)+10 })
                .attr('y',function(d) {return yScaleBar((d*4)/2);})
                .attr('fill',"Black")
                .attr("font-size",10);

            
        }

        var xScale = d3.scaleLinear().domain([]).range([0, 710]);
        var yScale = d3.scaleLinear().domain([0,d3.max(d3.values(chars))]).range([250, 0]);

        var x = d3.scaleLinear().domain([0,d3.keys(data).length]).range([0, 710]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
                
        var xContainer = d3.select("#exit").append("svg").attr("width",710).attr("height",50)
                .attr("x",0)
                .attr("y",210)
                .attr("transform","translate(100,-225)");
        
        var yContainer = d3.select("#exit").append("svg").attr("width",35).attr("height",270)
                            .attr("transform","translate(-625,-255)");

        xContainer.append("g").call(xAxis);
        yContainer.append("g").call(yAxis).attr("transform","translate(15,0)");

        var xLabel = d3.keys(data);

        xContainer.selectAll("#xlabel").data(xLabel).enter()
                    .append("text")
                    .text(function(d){ return d })
                    .attr("x",function(d,i){ return x(i); })
                    .attr("transform","translate(0,30)")
                    .attr("id","xLabel")
                    .attr("fill","#A9A9A9")
                    .attr("font-size",12)

        var legend = d3.select("#exit").append("svg").attr("width",150).attr("height",100)
        .attr("transform","translate(100,-400)");

        var key = d3.keys(chars);

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
        .attr("fill","#A9A9A9");

        var legendColor = d3.scaleOrdinal()
            .domain(key)
            .range(["#4285f4","#db4437"]);


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

d3.json("./exitRate.json").then(
    function(data){
        
        drawExit(data);
    }
);
