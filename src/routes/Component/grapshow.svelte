<script>
	//@ts-nocheck
	export let result = {
		xshow: 0,
		iter: 0,
		iterations: [{ iter: 1, xshow: 0, yshow: 0, errorshow: 0 }],
		mainxy: [{ x: 0, y: 0 }],
		info0: [{ xshow: 0, yshow: 0 }]
	};
	import { onMount } from 'svelte';
	export let choosez = '';

	let Plotly;

	let data, layout, config;

	$: if (choosez === 'onepoint') {
		data = [
			{
				x: result.iterations.map((point) => point.xshow),
				y: result.iterations.map((point) => point.yshow),
				type: 'scatter',
				mode: 'lines+markers',
				line: { shape: 'hv', color: 'red' },
				name: 'Xm'
			},
			{
				x: result.iterations.map((point) => point.xshow),
				y: result.iterations.map((point) => point.yshow),
				type: 'scatter',
				mode: 'lines',
				line: { shape: 'spline', color: 'blue' },
				name: 'main'
			},
			{
				x: result.iterations.map((point) => point.xshow),
				y: result.iterations.map((point) => point.xshow),
				type: 'scatter',
				mode: 'lines',
				line: { shape: 'spline', color: 'purple' },
				name: 'x'
			}
		];
	}
	$: if (choosez === 'bisection' || choosez === 'false' || choosez === 'graphical') {
		data = [
			{
				x: result.iterations.map((point) => point.iter),
				y: result.iterations.map((point) => point.xshow),
				type: 'scatter',
				mode: 'lines+markers',
				line: { shape: 'spline', color: 'red' },
				name: 'Xm'
			}
		];
	}
	$: if (choosez === 'newton' || choosez === 'secant') {
		data = [
			{
				x: result.info0.map((point) => point.xshow),
				y: result.info0.map((point) => point.yshow),
				type: 'scatter',
				mode: 'lines+markers',
				line: { shape: 'splines', color: 'purple' },
				marker: { color: 'blue' },
				name: 'Xm'
			},
			{
				x: result.mainxy.map((point) => point.x),
				y: result.mainxy.map((point) => point.y),
				type: 'scatter',
				mode: 'lines',
				line: { shape: 'spline', color: 'red' },
				name: 'main graph'
			}
		];
	}

	$: layout = {
		xaxis: {
			title: 'Xm,iter',
			zeroline: true,
			showlegend: true
		},
		yaxis: {
			title: 'f(X)',
			zeroline: true,
			showlegend: true
		},
		autosize: true,
		margin: { l: 40, r: 10, t: 40, b: 40 }
	};

	$: config = {
		responsive: true,
		displayModeBar: true,
		modeBarButtonsToRemove: ['zoom2d', 'boxsec'],
		displaylogo: false,
		modeBarButtonsToAdd: ['drawline'],
		scrollZoom: true,
		dragmode: ['pan']
	};

	onMount(async () => {
		Plotly = await import('plotly.js-dist-min');

		Plotly.newPlot('myDiv', data, layout, config);
	});

	$: if (Plotly) {
		Plotly.react('myDiv', data, layout, config);
	}
	// $: console.log(result);
	// $: console.log(result.mainxy);
</script>

<div id="myDiv" class="w-full h-96 sm:h-80 rounded-lg"></div>
