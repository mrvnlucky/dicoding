let books = [];

if (localStorage.getItem('books')) {
	books = JSON.parse(localStorage.getItem('books'));
	displayBooks(books);
}

document.getElementById('inputBook').addEventListener('submit', function (e) {
	e.preventDefault();
	const id = +new Date();
	const title = document.getElementById('inputBookTitle').value;
	const author = document.getElementById('inputBookAuthor').value;
	const year = document.getElementById('inputBookYear').value;
	const isComplete = false;

	books.push({
		id,
		title,
		author,
		year,
		isComplete
	});

	localStorage.setItem('books', JSON.stringify(books));
	displayBooks(books);
});

document.getElementById('searchBook').addEventListener('submit', function (e) {
	e.preventDefault();
	const searchInput = document.getElementById('searchBookTitle').value;
	const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput.toLowerCase()));
	displayBooks(filteredBooks);
});

function displayBooks(booksToDisplay) {
	const listUncompleted = document.getElementById('incompleteBookshelfList');
	const listCompleted = document.getElementById('completeBookshelfList');

	listUncompleted.innerHTML = '';
	listCompleted.innerHTML = '';

	for (let book of booksToDisplay) {
		const bookItem = document.createElement('div');
		bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.year}</p>
            <button onclick="moveBook(${book.id})">${book.isComplete ? 'Uncomplete' : 'Complete'}</button>
            <button onclick="removeBook(${book.id})">Remove</button>
        `;

		if (book.isComplete) {
			listCompleted.append(bookItem);
		} else {
			listUncompleted.append(bookItem);
		}
	}
}

function removeBook(id) {
	books = books.filter(book => book.id !== id);
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}

function moveBook(id) {
	const book = books.find(book => book.id === id);
	book.isComplete = !book.isComplete;
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}

