import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2' 

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
function Chart1(props) {
	console.log(props)
	const options = {
		responsive: true,
		plugins: {
		title: {
			display: true,
			text: `${props.currency} Data`,
		},
		},
	};


	const labels = [props.date, props.secondDate, props.middleDate, props.thirdDate, props.today];
	
	const data = {
		labels,
		datasets: [
		{
			label: props.currency,
			data: [0, 0, props.value],
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
		],
	};
	return(
		<Line options={options} data={data}/>
	)
}

export default Chart1;