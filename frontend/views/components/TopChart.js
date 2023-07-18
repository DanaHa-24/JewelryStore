function TopChart(data, param, name, id) {
  // Sort the data based on numOfOrders in descending order
  const sortedData = data.sort((a, b) => b[param] - a[param]);

  // Take only the top 5 buyers
  const top5 = sortedData.slice(0, 5);

  const width = 500;
  const height = 300;
  const svg = d3.select(id).append('svg').attr('width', width).attr('height', height);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .domain(top5.map((d) => d[name]))
    .range([0, chartWidth])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(top5, (d) => d[param])])
    .range([chartHeight, 0]);

  const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  chart
    .append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-10)')
    .style('text-anchor', 'end');

  chart.append('g').call(d3.axisLeft(y));

  chart
    .selectAll('.bar')
    .data(top5)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d[name]))
    .attr('y', (d) => y(d[param]))
    .attr('width', x.bandwidth())
    .attr('height', (d) => chartHeight - y(d[param]));

  chart
    .selectAll('.bar-label')
    .data(top5)
    .enter()
    .append('text')
    .text((d) => d[param])
    .attr('class', 'bar-label')
    .attr('x', (d) => x(d[name]) + x.bandwidth() / 2)
    .attr('y', (d) => y(d[param]) - 5)
    .attr('text-anchor', 'middle');
}
