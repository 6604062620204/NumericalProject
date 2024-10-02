// @ts-nocheck

import { abs, evaluate } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		iter: 1,
		iterations: [],
		mainxy: [],
		info0: []
	};
}

export function calmethod(xi0, xi1, errorFactor, func) {
	const result = objectresult();

	const calcuateXn = (xn2, xn1) => {
		const fxn2 = evaluate(func, { x: xn2 });
		const fxn1 = evaluate(func, { x: xn1 });

		return xn2 - (fxn2 * (xn1 - xn2)) / (fxn1 - fxn2);
	};

	let xn2 = xi0;
	let xn1 = xi1;
	let xfirst = calcuateXn(xn2, xn1);
	for (let i = -5; i <= 5; i += 0.002) {
		result.mainxy.push({
			x: i,
			y: evaluate(func, { x: i })
		});
	}
	let x = 0;
	let errorcal = 0;
	do {
		x = calcuateXn(xn2, xn1);

		errorcal = abs((x - xn1) / xn1);

		xn2 = xn1;
		xn1 = x;
		result.info0.push({
			xshow: x,
			yshow: 0
		});
		result.info0.push({
			xshow: x,
			yshow: evaluate(func, { x: x })
		});
		result.iterations.push({
			iter: result.iter,
			xshow: x,
			yshow: evaluate(func, { x: x }),
			errorshow: errorcal
		});
		result.iter++;
	} while (errorcal > errorFactor);
	result.info0.push({
		xshow: xfirst,
		yshow: 0
	});
	result.xshow = x;

	console.log(result);
	return result;
}
