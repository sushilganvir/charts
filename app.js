function barChart({ params }) {
  const { data, chart } = params;
  const height = 300;
  const width = 400;
  const marginTop = 40;
  const marginBottom = 40;
  const marginLeft = 40;
  const marginRight = 40;

  const svg = d3.select("svg").attr("height", height).attr("width", width);

  const x = d3
    .scaleBand(
      data.map((_, i) => i),
      [marginLeft, width - marginRight]
    )
    .padding(0.2);

  // const x = d3.scalePow([0, 100], [marginLeft, width - marginRight]);

  const y = d3.scaleLinear(
    [0, d3.max(data)],
    [height - marginBottom, marginTop]
  );

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .on("click", function (event, d) {
      console.log(event, d);
      d3.select(this).attr("fill", "orange").attr("r", 5);
    })
    .on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "orange").attr("r", 10);
    })
    .on("mouseout", function (event, d) {
      d3.select(this).attr("fill", "steelblue").attr("r", 5);
    })
    .attr("x", (_, i) => x(i))
    .attr("y", (d) => y(d))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - marginBottom - y(d))
    .attr("fill", "steelblue");
}

const data = [25, 30, 45, 60, 20];
const params = {
  data: data,
  chart: {
    type: "bar",
    id: "barChart",
    height: 400,
    width: 600,
  },
};
barChart({ params });
