function bookmarkTime(data)
{
    var date = d3.select("#date-dropdown").node().value;
    if(date == "Time Period" || date == "Weekly")
    {
        drawAccuracy(data);
        drawNumber(data);
        drawDuration(data);
    }
    d3.select("#date-dropdown")
    .on("change",function()
    {
        var date = d3.select("#date-dropdown").node().value;
        if(date == "Time Period" || date == "Weekly")
        {
            d3.select("#trend").selectAll("svg").remove();
            drawAccuracy(data);
            drawNumber(data);
            drawDuration(data);
        }else if(date == "Monthly")
        {
            d3.select("#trend").selectAll("svg").remove();
            monthAccuracy(data);
            monthNumber(data);
            monthDuration(data);
        }
        else if(date == "Quarterly")
        {
            d3.select("#trend").selectAll("svg").remove();
            quarterAccuracy(data);
            quarterNumber(data);
            quarterDuration(data);
        }

    })
}

function drawAccuracy(data)
{       
        var xScale = d3.scaleLinear().domain([0,11]).range([0,650]);
        var yScale = d3.scaleLinear().domain([0,100]).range([200,0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        var date = d3.select("#date-dropdown").select("option").text();
        // console.log(date);

        var lineFunction = d3.line()
                            .x(function(d) { return xScale(d.Week); })
                            .y(function(d) { return yScale(d.Accuracy); })
                            .curve(d3.curveLinear)
                            

        var canvas = d3.select("#trend").append("svg").attr("class","accuracy")
        .attr("width",750)
        .attr("height",400)
        .attr("transform","translate(0,0)");

        var subject = d3.select("#subject-dropdown").node().value;
        if(subject == "Reading"){
            canvas.selectAll("#textAccuracy")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){ return (d.Accuracy); })
                .attr("x",function(d) { return xScale(d.Week); })
                .attr("y",function(d) { return yScale((d.Accuracy)+2); })
                .attr("id","textAccuracy")
                .attr("transform","translate(80,60)")
                .attr("fill","rgb(66, 133, 244)") 
                .attr("font-size",12);
        }

        canvas.selectAll("#textAccuracy")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){ return (d.Accuracy)+"%"; })
                .attr("x",function(d) { return xScale(d.Week); })
                .attr("y",function(d) { return yScale((d.Accuracy)+2); })
                .attr("id","textAccuracy")
                .attr("transform","translate(80,60)")
                .attr("fill","rgb(66, 133, 244)") 
                .attr("font-size",12);
        
        canvas.selectAll("#xText")
                .data(data).enter()
                .append("text")
                .text(function(d){ return d.Date; })
                .attr("x",function(d,i){ return xScale(i) })
                .attr("y",300)
                .attr("transform","translate(0,30)")
                .attr("id","xText")
                .attr("fill","#A9A9A9") 
                .attr("font-size",10)
                .attr("transform","translate(90,-10)");        

        canvas.selectAll("#xLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Weeks")
                .attr("x",50+"%")
                .attr("y",310)
                .attr("id","xLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15);

        canvas.selectAll("#yLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Accuracy Score")
                .attr("x",50)
                .attr("y",200)
                .attr("id","yLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15)
                .attr("transform","translate(-150,250)rotate(-90)");

        canvas.append("text").text("Accuracy Score Trendline")
        .attr("transform","translate(0,40)")
        .attr("font-size",20)
        .attr("class","header")
        .attr("fill","#A9A9A9");

        canvas.append("g").call(xAxis).attr("transform","translate(80,260)");
        canvas.append("g").call(yAxis).attr("transform","translate(80,60)");

        var lineGraph = canvas.append("path").attr("class","line")
                        .attr("d", lineFunction(data))
                        .attr("stroke", "blue")
                        .attr("stroke-width", 2)
                        .attr("fill", "none")
                        .attr("transform","translate(90,60)");

}

function drawNumber(data)
{

          var date = d3.select("#date-dropdown").select("option").text();
        //   console.log(date);

          var xScale = d3.scaleLinear().domain([0,11]).range([0,650]);
            var yScale = d3.scaleLinear().domain([0,200]).range([200,0]);
        
            var xAxis = d3.axisBottom(xScale);
            var yAxis = d3.axisLeft(yScale);
        
            var canvas = d3.select("#trend").append("svg").attr("class","activitiesNumber")
                                .attr("width",750)
                                .attr("height",400)
                                .attr("x",0)
                                .attr("y",0)
                                .attr("transform","translate(0,0)")

            canvas.append("text").text("Number Of Activities")
            .attr("transform","translate(0,40)")
            .attr("font-size",20)
            .attr("class","header")
            .attr("fill","#A9A9A9");
        
            canvas.selectAll("rect")
                  .data(data)
                  .enter()
                  .append("rect")
                  .attr("width",30)
                  .attr("height",function(d){return d.ActivitiesNumber*1.5 })
                  .attr("x",function(d,i){ return xScale(i) })
                  .attr("y", function(d) {return yScale(d.ActivitiesNumber*1.5);})
                  .attr("fill","#4285f4")
                  .attr("transform","translate(90,60)")
        
            canvas.selectAll("#textActivities")
                  .data(data)
                  .enter()
                  .append("text")
                  .text(function(d){return d.ActivitiesNumber })
                  .attr("x",function(d,i){ return xScale(i) })
                  .attr("y", function(d) {return yScale((d.ActivitiesNumber*1.5)/2);})
                  .attr("transform","translate(90,60)");
                
            canvas.selectAll("#xText").data(data).enter()
                  .append("text")
                  .text(function(d){ return d.Date; })
                  .attr("x",function(d,i){ return xScale(i) })
                  .attr("y",300)
                  .attr("transform","translate(0,30)")
                  .attr("id","xText")
                  .attr("fill","#A9A9A9") 
                  .attr("font-size",10)
                  .attr("transform","translate(90,-10)");

            canvas.selectAll("#xLabel")
                  .data(data)
                  .enter()
                  .append("text")
                  .text("Weeks")
                  .attr("x",50+"%")
                .attr("y",310)
                  .attr("id","xLabel")
                  .attr("fill","#A9A9A9") 
                  .attr("font-size",15);
  
            canvas.selectAll("#yLabel")
                  .data(data)
                  .enter()
                  .append("text")
                  .text("Number of activities")
                  .attr("x",0)
                  .attr("y",200)
                  .attr("id","yLabel")
                  .attr("fill","#A9A9A9") 
                  .attr("font-size",15)
                  .attr("transform","translate(-170,250)rotate(-90)");
        
                  canvas.append("g").call(xAxis).attr("transform","translate(60,260)");
                  canvas.append("g").call(yAxis).attr("transform","translate(60,60)");
}

function drawDuration(data)
{
    var date = d3.select("#date-dropdown").select("option").text();
        //   console.log(date);

          var xScale = d3.scaleLinear().domain([0,11]).range([0,650]);
            var yScale = d3.scaleLinear().domain([0,200]).range([200,0]);
        
            var xAxis = d3.axisBottom(xScale);
            var yAxis = d3.axisLeft(yScale);

            var canvas = d3.select("#trend").append("svg").attr("class","activityTime")
            .attr("width",750)
            .attr("height",400)
            .attr("x",0)
            .attr("y",0)
            .attr("transform","translate(0,0)")

            canvas.append("text").text("Minutes Spent On Activities")
            .attr("transform","translate(0,40)")
            .attr("font-size",20)
            .attr("class","header")
            .attr("fill","#A9A9A9");

            canvas.selectAll("#xText").data(data).enter()
                .append("text")
                .text(function(d){ return d.Date; })
                .attr("x",function(d,i){ return xScale(i) })
                .attr("y",300)
                .attr("transform","translate(0,30)")
                .attr("id","xText")
                .attr("fill","#A9A9A9") 
                .attr("font-size",10)
                .attr("transform","translate(90,-10)");

            canvas.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("width",30)
                .attr("height",function(d){return d.ActivitiesNumber*1.5 })
                .attr("x",function(d,i){ return xScale(i) })
                .attr("y", function(d) {return yScale(d.ActivitiesNumber*1.5);})
                .attr("fill","#4285f4")
                .attr("transform","translate(90,60)")

            canvas.selectAll("#textActivities")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){return d.ActivitiesNumber })
                .attr("x",function(d,i){ return xScale(i) })
                .attr("y", function(d) {return yScale((d.ActivitiesNumber*1.5)/2);})
                .attr("transform","translate(90,60)")

            canvas.selectAll("#xLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Weeks")
                .attr("x",50+"%")
                .attr("y",310)
                .attr("id","xLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15);

            canvas.selectAll("#yLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Minutes spent")
                .attr("x",0)
                .attr("y",200)
                .attr("id","yLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15)
                .attr("transform","translate(-170,250)rotate(-90)");

                canvas.append("g").call(xAxis).attr("transform","translate(60,260)");
                canvas.append("g").call(yAxis).attr("transform","translate(60,60)");    
}

function monthAccuracy(data)
{

    var canvas = d3.select("#trend").append("svg").attr("class","accuracy")
        .attr("width",750)
        .attr("height",400)
        .attr("x",0)
        .attr("y",50)

    var yScale = d3.scaleLinear().domain([0,100]).range([200,0]);

    var subject = d3.select("#subject-dropdown").node().value;
    if(subject == "Reading")
    {
        var month = d3.nest()
                    .key(function(d){ return d.Month; })
                    .rollup(function(v){ return d3.sum(v, function(d) { return d.Accuracy; }); })
                    .entries(data);
        
        console.log(month);

        canvas.selectAll("#textAccuracy")
        .data(month)
        .enter()
        .append("text")
        .text(function(d){ return d.value; })
        .attr("x",function(d) { return d.key*25; })
        .attr("y",function(d) { return yScale(d.value/3); })
        .attr("id","textAccuracy")
        .attr("transform","translate(90,60)")
        .attr("fill","rgb(66, 133, 244)") 
        .attr("font-size",12);
    }

    var month = d3.nest()
                    .key(function(d){ return d.Month; })
                    .rollup(function(v){ return d3.mean(v, function(d) { return yScale(d.Accuracy); }); })
                    .entries(data);

    var array1 = [];

    month.forEach(element => {
        array1.push(element.key);
    });

    var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,300]);


    var xAxis = d3.axisBottom(xScale).ticks(array1.length);
    var yAxis = d3.axisLeft(yScale);

    // console.log(month);

    var lineFunction = d3.line()
    .x(function(d) { return d.key*25; })
    .y(function(d) { return d.value; })
    .curve(d3.curveLinear);


    canvas.selectAll("#textAccuracy")
        .data(month)
        .enter()
        .append("text")
        .text(function(d){ return d.value+"%"; })
        .attr("x",function(d) { return d.key*25; })
        .attr("y",function(d) { return d.value+2; })
        .attr("id","textAccuracy")
        .attr("transform","translate(90,60)")
        .attr("fill","rgb(66, 133, 244)") 
        .attr("font-size",12);

    canvas.selectAll("#xLabel")
        .data(data)
        .enter()
        .append("text")
        .text("Months")
        .attr("x",180)
        .attr("y",300)
        .attr("id","xLabel")
        .attr("fill","#A9A9A9") 
        .attr("font-size",15);

        canvas.selectAll("#yLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Accuracy Score")
                .attr("x",50)
                .attr("y",200)
                .attr("id","yLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15)
                .attr("transform","translate(-150,250)rotate(-90)");

        canvas.append("text").text("Accuracy Score Trendline")
        .attr("transform","translate(0,40)")
        .attr("font-size",20)
        .attr("class","header")
        .attr("fill","#A9A9A9");
            
        var lineGraph = canvas.append("path")
        .attr("d", lineFunction(month))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("transform","translate(90,60)");

            
        canvas.append("g").call(xAxis).attr("transform","translate(80,260)");
        canvas.append("g").call(yAxis).attr("transform","translate(80,60)");
}

function quarterAccuracy(data){

    var canvas = d3.select("#trend").append("svg").attr("class","accuracy")
    .attr("width",750)
    .attr("height",400)
    .attr("x",0)
    .attr("y",50)

        var yScale = d3.scaleLinear().domain([0,100]).range([200,0]);

        var subject = d3.select("#subject-dropdown").node().value;
        if(subject == "Reading")
        {
            var quarter = d3.nest()
                    .key(function(d){ return d.Quarter; })
                    .rollup(function(v){ return d3.sum(v, function(d) { return d.Accuracy; }); })
                    .entries(data);

            canvas.selectAll("#textAccuracy")
            .data(quarter)
            .enter()
            .append("text")
            .text(function(d){ return d.value; })
            .attr("x",function(d) { return d.key*25; })
            .attr("y",function(d) { return d.value+2; })
            .attr("id","textAccuracy")
            .attr("transform","translate(90,60)")
            .attr("fill","rgb(66, 133, 244)") 
            .attr("font-size",12);
        }

        var quarter = d3.nest()
                        .key(function(d){ return d.Quarter; })
                        .rollup(function(v){ return d3.mean(v, function(d) { return d.Accuracy; }); })
                        .entries(data);

        var array1 = [];

        quarter.forEach(element => {
            array1.push(element.key);
        });

        var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,300]);


        var xAxis = d3.axisBottom(xScale).ticks(array1.length);
        var yAxis = d3.axisLeft(yScale);

        // console.log(month);

            var lineFunction = d3.line()
            .x(function(d) { return d.key*25; })
            .y(function(d) { return d.value; })
            .curve(d3.curveLinear);
             
            canvas.selectAll("#textAccuracy")
                .data(quarter)
                .enter()
                .append("text")
                .text(function(d){ return d.value+"%"; })
                .attr("x",function(d) { return d.key*25; })
                .attr("y",function(d) { return yScale((d.value)+2); })
                .attr("id","textAccuracy")
                .attr("transform","translate(90,60)")
                .attr("fill","rgb(66, 133, 244)") 
                .attr("font-size",12);

            canvas.selectAll("#xLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Quarter")
                .attr("x",180)
                .attr("y",300)
                .attr("id","xLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15);

            canvas.selectAll("#yLabel")
                .data(data)
                .enter()
                .append("text")
                .text("Accuracy Score")
                .attr("x",50)
                .attr("y",200)
                .attr("id","yLabel")
                .attr("fill","#A9A9A9") 
                .attr("font-size",15)
                .attr("transform","translate(-150,250)rotate(-90)");

        canvas.append("text").text("Accuracy Score Trendline")
        .attr("transform","translate(0,40)")
        .attr("font-size",20)
        .attr("class","header")
        .attr("fill","#A9A9A9");
            
        var lineGraph = canvas.append("path")
            .attr("d", lineFunction(quarter))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("transform","translate(90,60)");

        
            canvas.append("g").call(xAxis).attr("transform","translate(80,260)");
            canvas.append("g").call(yAxis).attr("transform","translate(80,60)");
}

function monthNumber(data)
{

                var monthActivity = d3.nest()
                                  .key(function(d){ return d.Month; })
                                  .rollup(function(v){ return d3.sum(v, function(d) { return d.ActivitiesNumber; }); })
                                  .entries(data);
  
                var array1 = [];  
                var array2 = [];
  
                monthActivity.forEach(element => {
                    array1.push(element.key);
                    array2.push(element.value);
                });

                var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,200]);   
                var xAxis = d3.axisBottom(xScale).ticks((array1.length));

                var yScale = d3.scaleLinear().domain([0,d3.max(array2)]).range([235,0]);
                var yAxis = d3.axisLeft(yScale);

                var canvas = d3.select("#trend").append("svg").attr("class","activitiesNumber")
                                    .attr("width",750)
                                    .attr("height",400)
                                    .attr("x",0)
                                    .attr("y",0)
                                    .attr("transform","translate(0,0)")

                canvas.append("text").text("Number of activities")
                    .attr("transform","translate(0,20)")
                    .attr("font-size",20)
                    .attr("class","header")
                    .attr("fill","#A9A9A9");
            
                canvas.selectAll("rect")
                    .data(monthActivity)
                    .enter()
                    .append("rect")
                    .attr("width",30)
                    .attr("height",function(d){return d.value/1.5; })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return yScale(d.value);})
                    .attr("fill","#4285f4")
                    .attr("transform","translate(110,37)")
            
                canvas.selectAll("#textActivities")
                    .data(monthActivity)
                    .enter()
                    .append("text")
                    .text(function(d){return d.value; })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return yScale((d.value)/2);})
                    .attr("transform","translate(110,37)")
  
              canvas.selectAll("#xLabel")
                    .data(data)
                    .enter()
                    .append("text")
                    .text("Months")
                    .attr("x",150)
                    .attr("y",300)
                    .attr("id","xLabel")
                    .attr("fill","#A9A9A9") 
                    .attr("font-size",15);
    
              canvas.selectAll("#yLabel")
                    .data(data)
                    .enter()
                    .append("text")
                    .text("Number of activities")
                    .attr("x",0)
                    .attr("y",200)
                    .attr("id","yLabel")
                    .attr("fill","#A9A9A9") 
                    .attr("font-size",15)
                    .attr("transform","translate(-170,250)rotate(-90)");
            
                    canvas.append("g").call(xAxis).attr("transform","translate(80,270)");
                    canvas.append("g").call(yAxis).attr("transform","translate(80,35)");
}

function quarterNumber(data)
{
            
        var quarterNumber = d3.nest()
                            .key(function(d){ return d.Quarter; })
                            .rollup(function(v){ return d3.sum(v, function(d) { return d.ActivitiesNumber; }); })
                            .entries(data);

        var array1 = [];  
        var array2 = [];

        quarterNumber.forEach(element => {
            array1.push(element.key);
            array2.push(element.value);
        });

        var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,300]);   
        var xAxis = d3.axisBottom(xScale).ticks((array1.length));

        var yScale = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2)/3,0]);
        var yAxis = d3.axisLeft(yScale);

        var y = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2),0]);

        var canvas = d3.select("#trend").append("svg").attr("class","activitiesNumber")
                            .attr("width",750)
                            .attr("height",500)
                            .attr("x",0)
                            .attr("y",50)

        canvas.append("text").text("Number of activities")
            .attr("transform","translate(0,20)")
            .attr("font-size",20)
            .attr("class","header")
            .attr("fill","#A9A9A9");
    
        canvas.selectAll("rect")
            .data(quarterNumber)
            .enter()
            .append("rect")
            .attr("width",30)
            .attr("height",function(d){return d.value/3 })
            .attr("x",function(d,i){ return i*45 })
            .attr("y", function(d) {return y(d.value/3);})
            .attr("fill","#4285f4")
            .attr("transform","translate(160,-410)")
    
        canvas.selectAll("#textActivities")
            .data(quarterNumber)
            .enter()
            .append("text")
            .text(function(d){return d.value; })
            .attr("x",function(d,i){ return i*45 })
            .attr("y", function(d) {return y((d.value*1.5)/2);})
            .attr("transform","translate(160,50)")

        canvas.selectAll("#xLabel")
            .data(data)
            .enter()
            .append("text")
            .text("Quarter")
            .attr("x",150)
            .attr("y",400)
            .attr("id","xLabel")
            .attr("fill","#A9A9A9") 
            .attr("font-size",15);

        canvas.selectAll("#yLabel")
            .data(data)
            .enter()
            .append("text")
            .text("Number of activities")
            .attr("x",100)
            .attr("y",300)
            .attr("id","yLabel")
            .attr("fill","#A9A9A9") 
            .attr("font-size",15)
            .attr("transform","translate(-170,250)rotate(-90)");
    
            canvas.append("g").call(xAxis).attr("transform","translate(130,380)");
            canvas.append("g").call(yAxis).attr("transform","translate(130,115)");
}

function monthDuration(data)
{
            
                  var monthTime = d3.nest()
                                  .key(function(d){ return d.Month; })
                                  .rollup(function(v){ return d3.sum(v, function(d) { return d.Time; }); })
                                  .entries(data);
  
                var array1 = [];  
                var array2 = [];
  
                monthTime.forEach(element => {
                    array1.push(element.key);
                    array2.push(element.value);
                });

                var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,200]);   
                var xAxis = d3.axisBottom(xScale).ticks((array1.length));

                var yScale = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2)/1.5,0]);
                var yAxis = d3.axisLeft(yScale);

                var y = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2),0]);
  
  
                //   console.log(monthTime);

                var canvas = d3.select("#trend").append("svg").attr("class","activitiesNumber")
                                    .attr("width",750)
                                    .attr("height",400)
                                    .attr("x",0)
                                    .attr("y",0)
                                    .attr("transform","translate(0,0)")

                canvas.append("text").text("Minutes spent on activities")
                    .attr("transform","translate(0,20)")
                    .attr("font-size",20)
                    .attr("class","header")
                    .attr("fill","#A9A9A9");
            
                canvas.selectAll("rect")
                    .data(monthTime)
                    .enter()
                    .append("rect")
                    .attr("width",30)
                    .attr("height",function(d){return d.value/1.5 })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return y(d.value/1.5);})
                    .attr("fill","#4285f4")
                    .attr("transform","translate(110,-90)")
            
                canvas.selectAll("#textActivities")
                    .data(monthTime)
                    .enter()
                    .append("text")
                    .text(function(d){return d.value; })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return y((d.value*1.5)/2);})
                    .attr("transform","translate(110,0)")
  
              canvas.selectAll("#xLabel")
                    .data(data)
                    .enter()
                    .append("text")
                    .text("Months")
                    .attr("x",150)
                    .attr("y",330)
                    .attr("id","xLabel")
                    .attr("fill","#A9A9A9") 
                    .attr("font-size",15);
    
              canvas.selectAll("#yLabel")
                    .data(data)
                    .enter()
                    .append("text")
                    .text("Minutes spent")
                    .attr("x",0)
                    .attr("y",200)
                    .attr("id","yLabel")
                    .attr("fill","#A9A9A9") 
                    .attr("font-size",15)
                    .attr("transform","translate(-170,250)rotate(-90)");
            
                    canvas.append("g").call(xAxis).attr("transform","translate(80,300)");
                    canvas.append("g").call(yAxis).attr("transform","translate(80,35)");
}

function quarterDuration(data)
{
            
                var quarterTime = d3.nest()
                                  .key(function(d){ return d.Quarter; })
                                  .rollup(function(v){ return d3.sum(v, function(d) { return d.Time; }); })
                                  .entries(data);
  
                var array1 = [];  
                var array2 = [];
  
                quarterTime.forEach(element => {
                    array1.push(element.key);
                    array2.push(element.value);
                });

                var xScale = d3.scaleLinear().domain([0,d3.max(array1)]).range([0,300]);   
                var xAxis = d3.axisBottom(xScale).ticks((array1.length));

                var yScale = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2)/3,0]);
                var yAxis = d3.axisLeft(yScale);

                var y = d3.scaleLinear().domain([0,d3.max(array2)]).range([d3.max(array2),0]);
  
  
                //   console.log(quarterTime);

                var canvas = d3.select("#trend").append("svg").attr("class","activityTime")
                                    .attr("width",750)
                                    .attr("height",400)
                                    .attr("x",0)
                                    .attr("y",50)
                
                canvas.append("text").text("Minutes Spent On Activities")
                .attr("transform","translate(0,40)")
                .attr("font-size",20)
                .attr("class","header")
                .attr("fill","#A9A9A9");
            
                canvas.selectAll("rect")
                    .data(quarterTime)
                    .enter()
                    .append("rect")
                    .attr("width",30)
                    .attr("height",function(d){return d.value/3 })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return y(d.value/3);})
                    .attr("fill","#4285f4")
                    .attr("transform","translate(60,-645)")
            
                canvas.selectAll("#textActivities")
                    .data(quarterTime)
                    .enter()
                    .append("text")
                    .text(function(d){return d.value; })
                    .attr("x",function(d,i){ return i*45 })
                    .attr("y", function(d) {return y((d.value*1.5)/2);})
                    .attr("transform","translate(60,-50)")
            
                    canvas.append("g").call(xAxis).attr("transform","translate(30,345)");
                    canvas.append("g").call(yAxis).attr("transform","translate(30,15)");
}

function timeFilter(data)
{   
    var date = d3.selectAll("#date-dropdown").select("option").text();
    if( date == "Time Period" || date == "Weekly")
    {
        drawAccuracy(data);
        drawNumber(data);
        drawDuration(data);
        filter();
    }
    d3.select("#date-dropdown")
    .on("change", function()
    {
        d3.select("#trend").select("#trend").selectAll("svg").remove();
        var newDate = d3.select("#date-dropdown").node().value;
        if( newDate == "Weekly" || newDate == "Time Period")
        {
            d3.select("#trend").selectAll("svg").remove();
            drawAccuracy(data);
            drawNumber(data);
            drawDuration(data);
            filter();
        } 
        else if( newDate == "Monthly")
        {
            d3.select("#trend").selectAll("svg").remove();
            monthAccuracy(data);
            monthNumber(data);
            monthDuration(data);
            filter();
        }
        else if(newDate == "Quarterly" )
        {
            d3.select("#trend").selectAll("svg").remove();
            console.log(data);
            quarterAccuracy(data);
            quarterNumber(data);
            quarterDuration(data);
            filter();
        }
    })

function filter()
{
    var schoolValue = d3.select("#d3-dropdown").node().value;
    if(schoolValue == "Schools")
    {
        schoolValue = "All Schools";
    }

    var subjectValue = d3.select("#subject-dropdown").node().value;
    if(subjectValue == "Subject")
        {
            subjectValue = "Grammar";
        }
    var dateValue = d3.select("#date-dropdown").node().value;
    if(dateValue == "Time Period")
        {
            dateValue = "Weekly";
        }

    var array = [schoolValue,subjectValue,dateValue];

        d3.select("#trend").selectAll("svg").selectAll("#info")
                    .data(array)
                    .enter()
                    .append("text")
                    .text(function(d){ return d })
                    .attr("x",0)
                    .attr("y", function(d,i){ return i*15; })
                    .attr("id","info")
                    .attr("fill","#A9A9A9")
                    .attr("transform","translate(20,350)");
            }
}


d3.json("./trend.json").then(
    function(data){
        var text = d3.select("#d3-dropdown").node().value;

        if(text == "All" || text == "Schools")
        {
            var chars = data["All"];
            var subject = d3.select("#subject-dropdown").node().value;
            if( subject == "Subject" || subject == "Grammar")
            {
                var myData = chars["Grammar"];
                timeFilter(myData);
            }
            else if(subject == "Reading"){
                var myData = chars["Bookmarks"];
                bookmarkTime(myData);
        

            }
        d3.select("#subject-dropdown")
            .on("change",function()
            {
                d3.select("#trend").selectAll("svg").remove();
                var chars = data["All"];
                var newSubject = d3.select("#subject-dropdown").node().value;
                    if( newSubject == "Subject" || subject == "Grammar")
                    {
                        var myData = chars["Grammar"];
                        timeFilter(myData);
                    }
                    else if(newSubject == "Reading"){
                        var myData = chars["Bookmarks"];
                        bookmarkTime(myData);
                

                    }else{
                        var myData = chars[newSubject];
                        timeFilter(myData);
                    }

                })
            }
            d3.select("#selected-dropdown").text("All");
            d3.select("select")
            .on("change",function()
            {

                d3.select("#trend").selectAll("svg").remove();
                var selected = d3.select("#d3-dropdown").node().value;
                var chars = data[selected];
                var subject = d3.select("#subject-dropdown").select("option").text();
                    if( subject == "Subject" || subject == "Grammar")
                    {
                        var myData = chars["Grammar"];
                        timeFilter(myData);
                    }
                    else if(subject == "Reading"){
                        var myData = chars["Bookmarks"];
                        bookmarkTime(myData);
                

                    }
                d3.select("#subject-dropdown")
                .on("change",function()
                {
                    d3.select("#trend").selectAll("svg").remove();
                    var selected = d3.select("#d3-dropdown").node().value;
                    var chars = data[selected];
                    var newSubject = d3.select("#subject-dropdown").node().value;
                        if( newSubject == "Subject" || subject == "Grammar")
                        {
                            var myData = chars["Grammar"];
                            timeFilter(myData);
                        }
                        else if(newSubject == "Reading"){
                            var myData = chars["Bookmarks"];
                            bookmarkTime(myData);
                    

                        }else{
                            var myData = chars[newSubject];
                            timeFilter(myData);
                        }
                })
        })
    }
);