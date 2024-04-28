import React, { useState, useEffect, useRef } from 'react'; 
import firstImage from '../assets/VR.png'
import secondImage from '../assets/61.6 Exposure Rate.png'
import thirdImage from '../assets/phishing.png'
import '../App.css'; // Import CSS file for global styles
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import Navbar from '../components/Navbar'; // Import Navbar component
import * as d3 from "d3";


const ScamTrends = () => {

  // Ref for bar chart container
  const d3Container = useRef(null);
  const colors = ['#89C2D9', '#2C7DA0', '#013A63']; // Colors for the bars corresponding to the years
  const years = ['Year_2021', 'Year_2022', 'Year_2023'];

  // Ref for the horizontal bar chart container
  const horizontalBarChartContainer = useRef(null);

  //Ref for pie chart container
  const pieChartRef = useRef(null);

  //Ref for line chart container
const lineChartRef = useRef(null);

  // Hardcoded data for bar chart
  const data = [
    { authority: "Bank/Financial institution", Year_2021: 27.3, Year_2022: 32.2, Year_2023: 48.9 },
    { authority: "Social media", Year_2021: 8.7, Year_2022: 11.1, Year_2023: 9.7 },
    { authority: "Government Org", Year_2021: 8.4, Year_2022: 11.8, Year_2023: 8.7 },
    { authority: "Police Department", Year_2021: 8.2, Year_2022: 13, Year_2023: 12.6 },
    { authority: "Other Authorities", Year_2021: 9.8, Year_2022: 9.9, Year_2023: 8.9 },
    { authority: "Any authority", Year_2021: 49.5, Year_2022: 57.4, Year_2023: 69.4 },
  ];

  // Data for the horizontal bar chart
  const identityTheftData = [
    { category: "Access bank account or superannuation", percentage: 32.9 },
    { category: "Unknown", percentage: 31.5 },
    { category: "Other", percentage: 18.2 },
    { category: "Open accounts on victim's name", percentage: 14.4 },
    { category: "Loan/Credit Card ", percentage: 14.3 },
  ];

  // Data for pie chart
  const reportingData = [
    { category: "Bank/Financial institution", value: 37.7 },
    { category: "Police", value: 25.6 },
    { category: "Government Org", value: 23.1 },
    { category: "Social media", value: 2.8 },
    { category: "Other", value: 14.5 },
    { category: "Not reported", value: 28.3 }
  ];

  const lineData = [
    { year: 2020, reportingRate: 3.6 },
    { year: 2021, reportingRate: 2.7 },
    { year: 2022, reportingRate: 2.5 },
    // ... more data points
  ];

  // for bar chart 
  useEffect(() => {
    drawBarChart(data);
  }, []); // Dependency array is empty, so the effect runs once on mount

  // for horizontal bar chart 
  useEffect(() => {
    drawHorizontalBarChart(identityTheftData);
  }, []); // Dependency array is empty so the effect runs once on mount

  useEffect(() => {
    if (reportingData.length > 0) {
      drawPieChart(reportingData, pieChartRef);
    }
  }, [reportingData]); // The dependency array ensures this effect runs when reportingData changes

  useEffect(() => {
    drawLineChart(lineData, lineChartRef);
  }, [lineData]);


  const drawBarChart = (fetchedData) => {
    const svg = d3.select(d3Container.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 80 }; // Adjusted for y-axis label visibility
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Tooltip setup
    const tooltip = d3.select('body').append('div')
        .attr('class', 'd3-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('padding', '6px')
        .style('background', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('pointer-events', 'none');

    // Scales and axes
    const x0 = d3.scaleBand()
      .range([0, width])
      .paddingInner(0.1)
      .domain(fetchedData.map(d => d.authority));

    const x1 = d3.scaleBand()
      .padding(0.05)
      .domain(years)
      .rangeRound([0, x0.bandwidth()]);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(fetchedData, d => Math.max(...years.map(year => d[year])))])
      .nice();

    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y).tickFormat(d => `${d}%`);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add x-axis labels
    chart.append('g')
    .attr('class', 'x-axis-labels')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'translate(40,10)rotate(-5)')
    .style('text-anchor', 'end');

    // Add y-axis labels
    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Legend setup
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${margin.left},0)`);

    years.forEach((year, index) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${index * 20})`);

      legendItem.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colors[index]);

      legendItem.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'start')
        .text(`${year}`);
    });

    // Bars setup
    const bars = chart.append('g')
      .selectAll('g')
      .data(fetchedData)
      .enter().append('g')
        .attr('transform', d => `translate(${x0(d.authority)}, 0)`);
    
    bars.selectAll('rect')
      .data(d => years.map(year => ({ key: year, value: d[year] })))
      .enter().append('rect')
        .attr('x', d => x1(d.key))
        .attr('width', x1.bandwidth())
        .attr('y', y(0))
        .attr('height', 0)
        .attr('fill', (d, i) => colors[i])
        .attr('class', 'bar')
        .on('mouseover', function (event, d) {
          tooltip.html(`${d.key}: ${d.value}%`)
            .style('visibility', 'visible');
        })
        .on('mousemove', function (event, d) {
          tooltip.style('top', `${event.pageY - 20}px`)
            .style('left', `${event.pageX + 20}px`);
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        })
        // Animate the bars
        .transition()
        .duration(750)
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value));

    // Clean up the tooltip when unmounting
    return () => tooltip.remove();
  };

  const drawHorizontalBarChart = (data) => {
    const svg = d3.select(horizontalBarChartContainer.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 200 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll('*').remove();

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.percentage)])
      .range([0, width]);

    // Calculate the maximum percentage value in the data
    const maxPercentage = d3.max(data, d => d.percentage);
    // Determine a suitable number of ticks based on the maximum percentage value
    const numTicks = Math.min(maxPercentage, 5);

    const y = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([height, 0])
      .padding(0.1);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add a tooltip container (initially hidden)
    const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background', 'white')
    .style('border', '1px solid #ddd')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('opacity', 0.8);

    chart.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('width', d => x(d.percentage))
    .attr('y', d => y(d.category))
    .attr('height', y.bandwidth())
    .attr('fill', '#2a454b')
    .on('mouseover', function (event, d) {
      tooltip.style('visibility', 'visible')
             .text(`${d.category}: ${d.percentage}%`)
             .style('top', (event.pageY - 10) + 'px')
             .style('left', (event.pageX + 10) + 'px');
      d3.select(this).attr('opacity', 0.7);
    })
    .on('mousemove', function (event) {
      tooltip.style('top', (event.pageY - 10) + 'px')
             .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function () {
      tooltip.style('visibility', 'hidden');
      d3.select(this).attr('opacity', 1);
    });

    // Add transition to the bars
    chart.selectAll('.bar')
      .attr('width', 0)
      .transition()
      .duration(800)
      .attr('width', d => x(d.percentage));

    // Add the x-axis
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(numTicks));

    // Add the y-axis
    chart.append('g')
      .call(d3.axisLeft(y));
      

    // Add x-axis label
    //svg.append('text')
     // .attr('class', 'label')
     // .attr('x', width / 2 + margin.left)
     // .attr('y', height + margin.top + 30)
     // .style('text-anchor', 'middle')
     // .text('Percentage of Scam Reports');

  };

  // Function to draw a pie chart
  const drawPieChart = (data, svgRef) => {
    const svg = d3.select(svgRef.current);
    const width = 750; // Width of the SVG container
    const height = 400; // Height of the SVG container
    const radius = Math.min(width-100, height-100) / 2; // Radius of the pie chart
  
    svg.attr('width', width).attr('height', height);
  
    // Define the main group element of the pie chart
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
      // Define your custom color palette
    const myColorPalette = [
      '#1d3557', 
      '#457b9d', 
      '#a8dadc', 
      '#f1faee', 
      '#e63946', 
      '#f07167', 
    ];

    // Use the custom color palette for the color scale
    const color = d3.scaleOrdinal(myColorPalette);
  
    // Generate the pie chart data
    const pie = d3.pie()
      .sort(null) // Keep the order of data as in the array
      .value(d => d.value)(data);
  
    // Define the arc generator for the paths of the pie chart slices
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
    // Define the arc for the hover state (enlarged)
    const arcHover = d3.arc()
      .innerRadius(0)
      .outerRadius(radius * 1.1); // Increase the radius for the hover state
  
    // Create the pie chart slices
    const slices = g.selectAll('.slice')
      .data(pie)
      .enter().append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category))
      .style('stroke', 'white')
      .style('stroke-width', '2px');
  
    // Hover interaction
    slices.on('mouseover', function(event, d) {
      d3.select(this).transition()
        .duration(200)
        .attr('d', arcHover);
  
      // Show the tooltip text
      g.append('text')
        .attr('class', 'tooltip')
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.25em') // Position above the center
        .style('font-size', '1em')
        .style('font-weight', 'bold')
        .style('fill', '#ffffff')
        .text(`${d.data.category}: ${d.data.value}%`);
    })
    .on('mouseout', function() {
      d3.select(this).transition()
        .duration(200)
        .attr('d', arc);
  
      // Remove the tooltip text
      g.select('.tooltip').remove();
    });
    // Adjust styles in CSS
  };
  
  const drawLineChart = (data, lineChartContainerRef) => {
    const svg = d3.select(lineChartContainerRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);
  
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(data, d => d.year));
  
    // Adjusted y domain to go up to 4
    const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, 4]);

    const xOffset = 30; // Define xOffset here
  
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.reportingRate));
  
    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  
    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y));
  
    // Line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  
    // Tooltip container
    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');
  
    tooltip.append('circle')
      .attr('r', 4.5);
  
    tooltip.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');
  
    // Hover effect
    g.selectAll('.dot')
      .data(data)
      .enter().append('circle') // Uses the enter().append() method
      .attr('class', 'dot') // Assign a class for styling
      .attr('cx', d => x(d.year)) // Adjust x-coordinate
      .attr('cy', d => y(d.reportingRate))
      .attr('r', 5)
      .on('mouseover', function(event, d) {
        tooltip.style('display', null);
        tooltip.attr('transform', `translate(${x(d.year) + xOffset},${y(d.reportingRate)})`); // Adjust x-coordinate
        tooltip.select('text').text(`${d.reportingRate}%`); // Assuming it's a percentage
    })
      .on('mouseout', () => tooltip.style('display', 'none'));

  };


  return (
    <div>
        {/* Background section with inline styles */}
        <section style={{
            height: '4500px', /*height of the page*/
            background: 'rgb(254, 254, 227)', /*background colour of the page*/
        }}>
        <Navbar/>
        <div className='vis-heading-container'>
        <h1>SCAM TRENDS</h1>
        <hr />
        </div>
        {/* Container for the first bar chart and its description */}
        <div className="chart-with-info-container">
          <div className="chart-container">
            <svg ref={d3Container} width="960" height="500"></svg>
          </div>
          <div className="chart-description">
            <p>In the chart provided <strong>Banking Institutions</strong> were the authorities that were the most approached when a scam victim needed to complain.</p>
          </div>
        </div>

        {/* Container for the horizontal bar chart and its description */}
        <div className="chart-with-info-container">
          <div className="chart-container">
            <svg ref={horizontalBarChartContainer} width="960" height="500"></svg>
          </div>
          <div className="chart-description">
            <p><strong>Bank Accounts</strong> were the accessed the most by the scamsters for personal user of information.</p>
          </div>
        </div>

        {/* Container for the pie chart and its description */}
        <div className="chart-with-info-container">
          <div className="chart-container">
            <svg ref={pieChartRef} width="960" height="500"></svg>
          </div>
          <div className="chart-description">
            <p>Even during <strong>ID thefts</strong> the most approached authorities were <strong>Banking or Financial Institutions</strong></p>
          </div>
        </div>
        <div className='vis-heading-container'>
          <h1>SCAM IMPACTS ON PEOPLE AGED 65+</h1>
          <hr />
        </div>
        <div className="line-chart-container">
        <svg ref={lineChartRef}></svg>
        <p>The total scam victimisation rate has been decreasing in recent years with many people being more aware of different types of scams. However, there is no much change between years <strong>2022 and 2023.</strong></p>
      </div>
        <div className="visualization-section">
      <div className="image-info-container">
        <img src={firstImage} alt="Description for first image" className="info-image" />
        <div className="info-text">
          <h3>Victimisation Rate (Age 65+)</h3>
          <p>Considering the decline in victimisation rate over the years, people over the age of 65 are experiencing the same rate in 2023 compared to 2022. This means that elder financial abuse is still a real problem.</p>
        </div>
      </div>
      <div className="image-info-container reverse">
        <div className="info-text">
          <h3>Exposure Rate (Age 65+)</h3>
          <p>In 2022, 61.6% of people over the age of 65 have been exposed to a scam. Most of them over the phone or text messages.</p>
        </div>
        <img src={secondImage} alt="Description for second image" className="info-image" />
      </div>
      <div className="image-info-container">
        <img src={thirdImage} alt="Description for third image" className="info-image" />
        <div className="info-text">
          <h3>Information request or phishing(Age 65+)</h3>
          <p>The second most frequent kind of scams that people experienced in 2023 was a phishing or information request scam (0.6% or 134,700).</p>
        </div>
      </div>
    </div>
          
        </section>

        {/*footer*/}
        <footer className="footer">
          <div className="footer-left">
            <p className="text-footer">
              Team - Agile Rangers
            </p>
          </div>
          <div className="footer-right">
            <p className="footer-link">About Us</p>
            <p className="footer-link">Privacy Policy</p>
            <p className="footer-link">Terms & Conditions</p>
          </div>
        </footer>
    </div>
  )
}

export default ScamTrends