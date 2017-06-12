const object = {
	  genesis:     50
	, exodus:      40
	, leviticus:   27
	, numbers:     36
	, deuteronomy: 34
};

document.getElementById('form').scripture.onchange = () => {
	const select_chapter = document.getElementById('chapter');
	const scripture = document.getElementById('form').scripture.value;

	/* remove all options of select */
	while (select_chapter.firstChild)
		select_chapter.removeChild(select_chapter.firstChild);

	/* add options */
	for (let i = 1; i <= object[scripture]; i++) {
		const option = document.createElement('option');

		option.setAttribute('value', ('00' + i).slice(-3));
		option.innerHTML = i;

		select_chapter.appendChild(option);
	}
};

const getFileName = () => {
	const scripture = document.getElementById('form').scripture.value;
	const chapter   = document.getElementById('form').chapter.value;

	const fileName = 'nwt1984/' + scripture + '/' + scripture + chapter;

	return fileName;
};

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
		const msec     = 300;
		const length   = array.length;
		const timeMSec = length * msec;
		const timeSec  = timeMSec / 1000;
		const timeMin  = timeSec / 60;

		document.getElementById('time').textContent = timeMin;

		for (let element of array) {
			document.getElementById('main').textContent = element;
			if (element == '。')
				await promiseSleep(msec * 5);
			else if (element == '，')
				await promiseSleep(msec * 3);
			else
				await promiseSleep(msec);
		}
	});

	return promise;
};

const main = async () => {
	const fileName = getFileName();
	const response0 = await fetch(fileName);
	const response1 = await response0.text();
	const response2 = await promiseLinesToArray(response1);
	await promiseShowArrayInOrder(response2);
};
