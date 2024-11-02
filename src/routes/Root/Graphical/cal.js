// @ts-nocheck
import { abs, evaluate, floor, log, pow } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		yshow: 0,
		errorshow: 0,
		iter: 1,
		iterations: [],
		error: ''
	};
}

export function graphicalMethod(xStart, xEnd, errorFactor, func) {
	const result = objectresult();

	if (!func || func.trim().length === 0) {
		result.error = 'Invalid function';
		return result;
	}

	const calculateStep = (xStart, xEnd) => {
		const step = log(xEnd - xStart, 10);
		return step % 1 === 0 ? pow(10, step - 1) : pow(10, floor(step));
	};

	let step = calculateStep(xStart, xEnd);
	const MAX_ITER = 1000;
	let iter = 1;
	let x = xStart;
	let prevY = 0;
	let temp;
	let newTemp;

	while (iter < MAX_ITER) {
		iter++;

		if (iter === MAX_ITER) {
			result.error = 'Max iter';
			break;
		}

		newTemp = evaluate(func, { x });
		const error = iter === 1 ? 0 : abs((newTemp - prevY) / newTemp);

		result.iterations.push({
			iter: result.iter,
			xshow: Number(x),
			yshow: newTemp,
			errorshow: error
		});

		if (abs(newTemp) < errorFactor) {
			result.xshow = Number(x);
			result.yshow = newTemp;
			result.errorshow = error;
			break;
		}

		if (temp * newTemp < 0) {
			x -= step;
			step /= 10;
			newTemp = evaluate(func, { x });
		}

		if (x === xEnd) break;

		x += step;
		if (x > xEnd) {
			x = xEnd;
		}

		prevY = newTemp;
		temp = newTemp;
		result.iter++;
	}

	result.result = x;
	result.iter = iter;
	return result;
}
