import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
type MetricsType = {
  questions_assigned: number;
  questions_attemped: number;
};
const Metrics: React.FC<MetricsType> = ({
  questions_assigned,
  questions_attemped,
}: MetricsType) => {
  const data = {
    labels: ['Questions Yet to Attempt', 'Total Question Attempted'],
    datasets: [
      {
        label: '#',
        data: [questions_assigned - questions_attemped, questions_attemped],
        backgroundColor: ['gray', 'skyblue'],
      },
    ],
  };
  return (
    <div className="bg-white p-5 rounded-md shadow-md">
      <div className="h-64 w-64 relative">
        <Doughnut data={data} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
          <div className="flex flex-col justify-center items-center font-medium">
            <div>Total</div> <div>Questions:</div> <div>{questions_assigned}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
