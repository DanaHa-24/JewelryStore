const MonthsChart = async (data) => {
  // Calculate total sales for each month
  const salesData = {};
  data.forEach((yearData) => {
    yearData.months.forEach((monthData) => {
      const monthKey = `${yearData._id}-${monthData.month}`;
      salesData[monthKey] = monthData.totalSales;
    });
  });

  // Parse sales data for D3
  const parsedData = Object.entries(salesData).map(([key, value]) => ({
    month: key,
    sales: value,
  }));

  // Create the dropdown button for year selection
  const years = data.map((yearData) => yearData._id);
  const dropdown = d3.select('#yearDropdown');
  years.forEach((year) => {
    dropdown.append('option').attr('value', year).text(year);
  });

  // Set initial year and render the graph
  let selectedYear = years[0];
  renderGraph(selectedYear);

  // Update the graph when a different year is selected
  dropdown.on('change', () => {
    selectedYear = dropdown.property('value');
    renderGraph(selectedYear);
  });

  // Function to render the graph
  function renderGraph(year) {
    // Filter sales data for the selected year
    const filteredData = parsedData.filter((d) => d.month.startsWith(year));

    // Clear the previous graph
    d3.select('#salesGraph').html('');

    // Set up the graph dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3
      .select('#salesGraph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales for x and y axes
    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    // Set domains for x and y scales
    xScale.domain(filteredData.map((d) => d.month));
    yScale.domain([0, d3.max(filteredData, (d) => d.sales)]);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append x axis to the SVG
    svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${height})`).call(xAxis);

    // Append y axis to the SVG
    svg.append('g').attr('class', 'y-axis').call(yAxis);

    // Create bars for each month
    svg
      .selectAll('.bar')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.month))
      .attr('y', (d) => yScale(d.sales))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.sales));
  }
};
