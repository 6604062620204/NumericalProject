<script>
	export let result = { xshow: 0, iter: 0, iterations: [{ xshow: 0, yshow: 0, errorshow: 0 }] };
	import { onMount } from 'svelte';
	export let choosez = '';

	// @ts-ignore
	let Plotly;
	// @ts-ignore
	let data, layout, config;

	// @ts-ignore
	$: if (choosez === 'newton' || choosez === 'onepoint') {
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
	// @ts-ignore
	$: if (choosez === 'bisection' || choosez === 'false') {
		data = [
			{
				x: result.iterations.map((point) => point.xshow),
				y: result.iterations.map((point) => point.yshow),
				type: 'scatter',
				mode: 'lines+markers',
				line: { shape: 'spline', color: 'red' },
				name: 'Xm'
			}
		];
	}

	// @ts-ignore
	$: layout = {
		xaxis: {
			title: 'Xm',
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

	// @ts-ignore
	$: config = {
		responsive: true,
		displayModeBar: true,
		modeBarButtonsToRemove: ['zoom2d', 'boxsec'],
		displaylogo: false,
		modeBarButtonsToAdd: ['drawline'],
		scrollZoom: true
	};

	onMount(async () => {
		// @ts-ignore
		Plotly = await import('plotly.js-dist-min');
		// @ts-ignore
		Plotly.newPlot('myDiv', data, layout, config);
	});

	// @ts-ignore
	$: if (Plotly) {
		// @ts-ignore
		Plotly.react('myDiv', data, layout, config);
	}
</script>

<div id="myDiv" class="w-full h-96 sm:h-80 rounded-lg"></div>
