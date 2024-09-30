// @ts-nocheck
// @ts-ignore
import { evaluate } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		yshow: 0,
		errorshow: 0,
		iter: 0,
		iterations: [],
		error: ''
	};
}

// @ts-ignore
export function calmethod(xStart, xEnd, errorFactor, func) {
	// สร้างผลลัพธ์ที่เป็น Object
	const result = objectresult();

	// สร้างฟังก์ชันสำหรับคำนวณค่า y โดยรับ x เป็นพารามิเตอร์
	const f = (x) => evaluate(func, { x });

	while ((xEnd - xStart) / xEnd > errorFactor) {
		const xMid = (xStart + xEnd) / 2;
		const fMid = f(xMid);
		const errorcal = Math.abs((xEnd - xStart) / xEnd); // คำนวณข้อผิดพลาด (error)

		// เก็บข้อมูลแต่ละรอบการคำนวณลงใน result.iterations
		result.iterations.push({
			xshow: xMid,
			yshow: fMid,
			errorshow: errorcal
		});

		// ตรวจสอบว่าค่า f(xMid) เป็น 0 หรือไม่ ถ้าใช่ถือว่าคำนวณเสร็จสิ้น
		if (fMid === 0) {
			result.xshow = xMid;
			result.yshow = fMid;
			result.errorshow = errorcal;
			break;
		}

		// อัปเดตค่า xStart หรือ xEnd ตามเงื่อนไข
		if (fMid * f(xStart) < 0) {
			xEnd = xMid;
		} else {
			xStart = xMid;
		}

		// อัปเดตผลลัพธ์สุดท้ายในแต่ละรอบ
		result.xshow = xMid;
		result.yshow = fMid;
		result.errorshow = errorcal;
		result.iter++;
	}

	return result;
}
