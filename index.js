const promiseLinesToArray = (lines) => {
	const promise = new Promise((resolve, reject) => {
		const ARRAY = lines.split(/\r\n|\r|\n/);
		/* The order of the regular expression is important. */

		resolve(ARRAY);
	});

	return promise;
};

const promiseSleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const promiseShowArrayInOrder = async (array) => {
	const promise = new Promise(async (resolve, reject) => {
		for (let element of array) {
			document.getElementById('main').textContent = element;
			await promiseSleep(1000);
		}
	});

	return promise;
};

const main = async () => {
	const response0 = await fetch("data.txt");
	const response1 = await response0.text();
	const response2 = await promiseLinesToArray(response1);
	await promiseShowArrayInOrder(response2);
};
