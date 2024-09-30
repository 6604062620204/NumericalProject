import { abs, evaluate, floor, log, pow } from 'mathjs';

export function objectresult() {
	return {
		result: 0,
		iter: 0,
		iterations: [],
		error: ''
	};
}

// @ts-ignore
export function graphicalMethod(xStart, xEnd, errorFactor, func) {
	const result = objectresult();

	// @ts-ignore
	if (!func || func.trim().length == 0) {
		result.error = 'Invalid function';
		return result;
	}

	// @ts-ignore
	const calculateStep = (xStart, xEnd) => {
		const step = log(xEnd - xStart, 10);
		if (step % 1 == 0) return Number(pow(10, step - 1));
		return Number(pow(10, floor(step)));
	};

	let step = calculateStep(xStart, xEnd);
	const MAX_ITER = 1000;
	let iter = 0;
	let x = xStart;
	let temp = 0;
	let prevY = 0;
	try {
		temp = evaluate(func, { x: xStart });
		// eslint-disable-next-line no-unused-vars
	} catch (error) {
		result.error = 'Invalid function';
		return result;
	}
	let newTemp;
	while (iter < MAX_ITER) {
		iter += 1;
		if (iter == MAX_ITER) {
			result.error = 'Max iteration reached';
			break;
		}

		newTemp = evaluate(func, { x });

		// คำนวณ Error เป็นความต่างของค่า y ปัจจุบันและรอบก่อนหน้า
		const error = iter === 1 ? 0 : abs((newTemp - prevY) / newTemp);

		if (result.iterations) {
			// @ts-ignore
			result.iterations.push({ x: Number(x), y: newTemp, error });
		}

		if (abs(newTemp) < errorFactor) {
			break;
		}

		if (temp * newTemp < 0) {
			x -= step;
			step /= 10;
			newTemp = evaluate(func, { x });
		}

		if (x == xEnd) break;

		x += step;
		if (x > xEnd) {
			x = xEnd;
		}

		// อัพเดทค่า prevY สำหรับการคำนวณ error รอบถัดไป
		prevY = newTemp;
		temp = newTemp;
	}

	result.result = x;
	result.iter = iter;
	console.log(result);
	return result;
}
