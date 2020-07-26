import React from "react";
import * as d3 from "d3";

const BarChart = () => {
    // Margin convention
    const margin = {
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0
    },
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#root")
        .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    const div = d3.select("#root")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then(function(data) {
    
    // X axis
    const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { 
            return d.Country; 
        }))
        .padding(0.2);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 13000])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { 
            return x(d.Country); 
        })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", function(d) { 
            return height - y(0); 
        }) // always equal to 0
        .attr("y", function(d) { 
            return y(0); 
        })

        // Animation
        svg.selectAll("rect")
            .transition()
            .duration(900)
            .attr("y", function(d) { 
                return y(d.Value); 
            })
            .attr("height", function(d) { 
                return height - y(d.Value);
             })
            .delay(function(d,i){console.log(i) ; 
                return(i * 100)
            })
    })
    return (
        <>
        </>
    )
}

export default BarChart;