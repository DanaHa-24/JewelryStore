const BarChart = (data) => {
  const width = 500;
  const height = 300;

  const svg = d3.select('#barChart').append('svg').attr('width', width).attr('height', height);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d._id))
    .range([0, chartWidth])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([chartHeight, 0]);

  const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  chart.append('g').attr('transform', `translate(0, ${chartHeight})`).call(d3.axisBottom(x));

  chart.append('g').call(d3.axisLeft(y));

  chart
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d._id))
    .attr('y', (d) => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', (d) => chartHeight - y(d.count))
    .append('text')
    .text((d) => d.count)
    .attr('x', (d) => x(d._id) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.count) - 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white');
};
