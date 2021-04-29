import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Line, defaults, Pie } from "react-chartjs-2";

const api = axios.create({
  baseURL: `http://localhost:8080/item`,
});

const RankingStatistics = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({});
  const [chartData, setChardData] = useState({});

  const getItemStatistics = async () => {
    let data = await api
      .get("/getStatistics?itemId=" + itemId)
      .then(({ data }) => data);

    let labels = Object.keys(data.allPositions);
    let chartItems = Object.values(data.allPositions);
    console.log(chartItems);
    //chartItems = chartItems.map((position) => {
    //  if (position == 0) {
    //    position = data.lowestPosition + 100;
    //  }
    //  return position;
    //});
    //console.log(chartItems);

    setChardData({
      labels: labels,
      datasets: [
        {
          label: "position",
          data: chartItems,
        },
      ],
    });
    console.log(data);
    setStatistics(data);
    setLoading(false);
  };

  useEffect(() => {
    getItemStatistics();
  }, []);

  return (
    <Container>
      <Card style={{ marginTop: "5rem" }}>
        <h1 className="text-center">Item statistics</h1>
        {loading || (
          <div>
            <p className="text-left">
              First appearance: {statistics.firstRanking.name}
            </p>
            <p>
              Highest position: {statistics.highestPosition} (
              {statistics.highestPositionRanking.name})
            </p>
            <Line
              data={chartData}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                responsive: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        min: 1,
                        max: statistics.lowestPosition,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 25,
                  },
                },
              }}
            />
          </div>
        )}
      </Card>
    </Container>
  );
};

export default RankingStatistics;
