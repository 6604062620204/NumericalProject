<script>
	import katex from 'katex';
	import 'katex/dist/katex.min.css'; // นำเข้า CSS
	import { exp } from 'mathjs';

	export let num = 0;
	export let func = '';
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
	}

	$: func, renderMath();
</script>

<div>
	<div class="block mt-2 w-auto">{@html equation}</div>
</div>
