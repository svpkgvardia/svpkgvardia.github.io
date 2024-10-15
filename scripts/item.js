const image = document.querySelector('#image');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

const replaces = {
	bold: '<span class="bold">$1</span>',
	italic: '<span class="italic">$1</span>'
}

async function getItems() {
	const response = await fetch('./items.json');
	const items = await response.json();
	return items;
}

function getItem(items, id) {
	const item = items.find((value) => value.id == id);

	if (!item) {
		return null
	} else {
		return item;
	}
}

function getID() {
	const currentUrl = window.location.href;
	const url = new URL(currentUrl);
	const id = url.searchParams.get('id');
	
	return Number(id);
}

function formatText(text) {
	return text
		.replace(/\*\*(.*?)\*\*/g, replaces.bold)
		.replace(/\*(.*?)\*/g, replaces.italic);
}

function setInfo(item) {
	if (item.image) image.src = item.image;
	if (item.title) title.textContent = item.title;
	if (item.description.length > 0) {
		for (const text of item.description) {
			const div = document.createElement("div");
			div.classList.add('text');
			div.innerHTML = formatText(text);

			description.appendChild(div);
		}
	}
}

async function main() {
	try {
		const items = await getItems();
		const id = getID();
		const item = getItem(items, id);

		setInfo(item);
		
		console.log(item);
	} catch (error) {
		console.error('Error loading JSON:', error);
	}
}

main();