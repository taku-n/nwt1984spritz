/* setting */
const MSEC = 200;

const object = {
	  'genesis':         50
	, 'exodus':          40
	, 'leviticus':       27
	, 'numbers':         36
	, 'deuteronomy':     34

	, 'joshua':          24
	, 'judges':          21
	, 'ruth':             4
	, '1samuel':         31
	, '2samuel':         24
	, '1kings':          22
	, '2kings':          25
	, '1chronicles':     29
	, '2chronicles':     36
	, 'ezra':            10
	, 'nehemiah':        13
	, 'esther':          10
	, 'job':             42
	, 'psalms':         150
	, 'proverbs':        31
	, 'ecclesiastes':    12
	, 'songofsolomon':    8
	, 'isaiah':          66
	, 'jeremiah':        52
	, 'lamentations':     5
	, 'ezekiel':         48
	, 'daniel':          12
	, 'hosea':           14
	, 'joel':             3
	, 'amos':             9
	, 'obadiah':          1
	, 'jonah':            4
	, 'micah':            7
	, 'nahum':            3
	, 'habakkuk':         3
	, 'zephaniah':        3
	, 'haggai':           2
	, 'zechariah':       14
	, 'malachi':          4

	, 'matthew':         28
	, 'mark':            16
	, 'luke':            24
	, 'john':            21

	, 'acts':            28
	, 'romans':          16
	, '1corinthians':    16
	, '2corinthians':    13
	, 'galatians':        6
	, 'ephesians':        6
	, 'philippians':      4
	, 'colossians':       4
	, '1thessalonians':   5
	, '2thessalonians':   3
	, '1timothy':         6
	, '2timothy':         4
	, 'titus':            3
	, 'philemon':         1
	, 'hebrews':         13
	, 'james':            5
	, '1peter':           5
	, '2peter':           3
	, '1john':            5
	, '2john':            1
	, '3john':            1
	, 'jude':             1
	, 'revelation':      22
};

const storage = localStorage;

const last = storage.getItem('last');

if (last)
	document.getElementById('last').textContent = last;

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

const getTime = (array, msec) => {
	const timeMS = array.length * msec;
	const timeS  = timeMS / 1000;
	const timeM  = timeS / 60;

	return Math.ceil(timeM) + 'min';
};

document.getElementById('form').chapter.onchange = async () => {
	const fileName = getFileName();
	const response0 = await fetch(fileName);
	const response1 = await response0.text();
	const response2 = await promiseLinesToArray(response1);

	document.getElementById('time').textContent = getTime(response2, MSEC);
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

		document.getElementById('time').textContent = getTime(array, MSEC);

		for (let element of array) {
			document.getElementById('main').textContent = element;
			if (element == '。')
				await promiseSleep(MSEC * 5);
			else if (element == '，')
				await promiseSleep(MSEC * 3);
			else
				await promiseSleep(MSEC);
		}
	});

	return promise;
};

const main = async () => {
	const fileName = getFileName();

	if (document.forms.form.checkbox.checked)
		storage.setItem('last', fileName);

	const response0 = await fetch(fileName);
	const response1 = await response0.text();
	const response2 = await promiseLinesToArray(response1);
	await promiseShowArrayInOrder(response2);
};
