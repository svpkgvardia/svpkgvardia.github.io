const cards = document.querySelector('#cards');

async function getItems() {
	const response = await fetch('items.json');
	const items = await response.json();
	return items;
}

function formatText(text) {
	return text
		.replace(/\*\*(.*?)\*\*/g, '$1')
		.replace(/\*(.*?)\*/g, '$1');
}

async function main() {
	try {
		const items = await getItems();
		
		for (const item of items) {
			// Карточка
			const card = document.createElement("div");
			card.classList.add('card');

			// Ссылка
			const a = document.createElement("a");
			a.href = 'item?id='+item.id;
			// UPDATE

			// Блок с изображением
			const cardImage = document.createElement("div");
			cardImage.classList.add('card-image');

			// Изображение
			const img = document.createElement("img");
			img.src = item.image;

			// Добавление в блок изображение
			cardImage.appendChild(img);

			// Блок с информацией
			const cardInfo = document.createElement("div");
			cardInfo.classList.add('card-info');

			// Название карточки
			const cardTitle = document.createElement("div");
			cardTitle.classList.add('card-title');
			cardTitle.textContent = item.title;

			// Описание карточки
			const cardDescription = document.createElement("div");
			cardDescription.classList.add('card-description');
			cardDescription.textContent = formatText(item.description[0]);

			// Добавление элементов в блок с информацией
			cardInfo.appendChild(cardTitle);
			cardInfo.appendChild(cardDescription);

			// Добавление блоков в ссылку
			a.appendChild(cardImage);
			a.appendChild(cardInfo);

			// Добавление ссылки в карточку
			card.appendChild(a);

			// Добавляем карту
			cards.appendChild(card);
		}
	} catch (error) {
		console.error('Error loading JSON:', error);
	}
}

main();
