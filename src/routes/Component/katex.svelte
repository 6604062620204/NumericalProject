<script>
	import katex from 'katex';
	import 'katex/dist/katex.min.css'; // นำเข้า CSS

	export let num = 0;
	export let func = '';
	export let func1 = '';
	export let func2 = '';
	export let func3 = '';
	let equation = '';

	function renderMath() {
		if (num === 1) {
			if (func) {
				equation = katex.renderToString(`f(x) = ${func}`, {
					throwOnError: false
				});
			} else {
				equation = katex.renderToString(`f(x) = ...`, {
					throwOnError: false
				});
			}
		}
		if (num === 2) {
			if (func) {
				equation = katex.renderToString(`x_{i+1} = ${func}`, {
					throwOnError: false
				});
			} else {
				equation = katex.renderToString(`x_{i+1} = ...`, {
					throwOnError: false
				});
			}
		}
		if (num === 3) {
			if (func) {
				equation = katex.renderToString(`${func}`, {
					throwOnError: false
				});
			}
			if (func1) {
				equation = katex.renderToString(`${func1}`, {
					throwOnError: false
				});
			}
			if (func2) {
				equation = katex.renderToString(`${func2}`, {
					throwOnError: false
				});
			}
			if (func3) {
				equation = katex.renderToString(`${func3}`, {
					throwOnError: false
				});
			}
		}
	}

	$: func, renderMath();
</script>

<div>
	<div class="block mt-2 w-auto">{@html equation}</div>
</div>
