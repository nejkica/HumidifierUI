import { Chart, Line } from 'react-chartjs-2';
import '../../node_modules/chartjs-plugin-crosshair/src/index';
import React from 'react';
import '../style/graf.css';


class Graf extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {

		};

	}

// ########################################## REACT ##################################

	componentDidMount() {
    Chart.pluginService.register({
      afterDraw: function(chart, easing) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.controller.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.tooltipPosition().x;
          const topY = chart.scales['y-axis-0'].top;
          const bottomY = chart.scales['y-axis-0'].bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#e23fa9';
          ctx.stroke();
          ctx.restore();
        }
      }
    });
}

	render () {

		const options = {
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					id: 'x-axis-0',
					display: true,
					type: 'time',
					time: {
						unit: 'minute',
						unitStepSize: 15,
						displayFormats: {
							minute: 'H:mm .M .D'
						},
						tooltipFormat: 'H:mm .M .D YYYY'
						},
					ticks: {
						fontSize: 16,
						minRotation: 45,
						// labelOffset: -5,
						// min: new Date(this.props.podatki.labels[0]),
						// max: new Date(this.props.podatki.labels[this.props.podatki.labels.length - 1])
					}

				}],
				yAxes: [{
					id: 'y-axis-0',
					position: 'right',
					ticks: 
					{
						min: 30,
						max: 100,
						stepSize: 2,
						fontSize: 16,
						// callback: function(value, index, values) {
						// 	return value.toFixed(0).toString().split('.').join(',');
						// }
					},
					scaleLabel: {
						display: false,
						labelString: 'vlažnost',
						fontSize: 20
					},
				},
				{
					id: 'y-axis-1',
					position: 'right',
					display: false,
					ticks: 
					{
						// min: Math.floor((Math.min.apply(null, vlaznost)-0.5)/5)*5-10,
						// max: Math.ceil((Math.max.apply(null, vlaznost)+0.5)/5)*5,
						min: 30,
						max: 100,
						stepSize: 2,
						// fontSize: fontSz,
						// callback: function(value, index, values) {
						// 	return value.toFixed(0).toString().split('.').join(',');
						// }
					}
				}]					
			},
			legend: {
			   	display: false
			},
			tooltips: {
				mode: 'interpolate',
            	intersect: false,
				// callbacks: {

			},
			plugins: {
		      crosshair: {
		      	// snapping: true,
		        line: {
		          color: '#BFBFBF',        // crosshair line color
		          width: 1
		        },
		        sync: {
		          enabled: true,            // enable trace line syncing with other charts
		          group: 1,                 // chart group
		          suppressTooltips: false   // suppress tooltips when showing a synced tracer
		        },
		        zoom: {
					enabled: false,                                      // enable zooming

		        },
		      }
		    }
		};

		const data = {
		        labels: this.props.podatki.labels,
		        datasets: [{
		        	label: 'vlažnost',
		            yAxisID: 'y-axis-0',
		            backgroundColor: 'rgba(255, 99, 132, 0.15)',
		            borderColor: 'rgb(255, 99, 132)',
		            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
		            pointHoverBorderColor: '#BFBFBF',
		            pointHoverRadius: 8,
		            // interpolate: true,
        			xAxisID: 'x-axis-0',
		            // lineTension: 0,
		            data: this.props.podatki.data
		        // },
		        // {
		        // 	label: 'Moving Average',
		        //     yAxisID: 'y-axis-1',
		        //     backgroundColor: 'rgba(53, 97, 240, 0.15)',
		        //     borderColor: 'rgb(53, 97, 240)',
		        //     pointBackgroundColor: 'rgba(53, 97, 240, 1)',
		        //     pointHoverBorderColor: '#BFBFBF',
		        //     pointHoverRadius: 8,
		        //     // interpolate: true,
        		// 	xAxisID: 'x-axis-0',
		        //     // lineTension: 0,
		        //     data: this.props.podatki.mov
		        }]
		    }; 

		// let temp = new Date(this.props.podatki.labels[0]);
		// console.log(this.props.podatki.labels[0]);
		// console.log(temp + ' ' + temp.toLocaleString());

		return (
			<div className="grafWrap">
				<div className="grafAreaWrapper">
					<Line 
						data={data}
						options={options}
						// ref = {(reference) => this.reference = reference}
					/>
				</div>
			</div>
		)
	}
}

export default Graf;