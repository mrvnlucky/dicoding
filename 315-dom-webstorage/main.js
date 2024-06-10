let books = [];

function addBook() {
	const title = document.getElementById('inputBookTitle').value;
	const author = document.getElementById('inputBookAuthor').value;
	const year = document.getElementById('inputBookYear').value;
	const isComplete = document.getElementById('inputBookIsComplete').checked;

	const book = {
		id: +new Date(),
		title,
		author,
		year,
		isComplete
	};

	const books = JSON.parse(localStorage.getItem('books')) || [];
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));

	displayBooks();
	alert('Buku berhasil ditambahkan');
}

function displayBooks(booksParam) {
	const books = booksParam || JSON.parse(localStorage.getItem('books')) || [];

	const incompleteShelf = document.getElementById('incompleteBookshelfList');
	const completeShelf = document.getElementById('completeBookshelfList');

	incompleteShelf.innerHTML = '';
	completeShelf.innerHTML = '';

	for (let book of books) {
		const bookElement = `<article class="book_item" data-id="${book.id}">
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <div class="action">
                <button class="green" onclick="toggleComplete(${book.id})">${book.isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca'}</button>
				<button class="yellow" onclick="editBook(${book.id})">Edit buku</button>
                <button class="red" onclick="deleteBook(${book.id})">Hapus buku</button>
            </div>
        </article>`;

		if (book.isComplete) {
			completeShelf.innerHTML += bookElement;
		} else {
			incompleteShelf.innerHTML += bookElement;
		}
	}
}

function toggleComplete(bookId) {
	const books = JSON.parse(localStorage.getItem('books')) || [];
	const bookIndex = books.findIndex(book => book.id === bookId);
	if (bookIndex !== -1) {
		books[bookIndex].isComplete = !books[bookIndex].isComplete;
		localStorage.setItem('books', JSON.stringify(books));
		displayBooks();
	}
}

function deleteBook(bookId) {
	let books = JSON.parse(localStorage.getItem('books')) || [];
	books = books.filter(book => book.id !== bookId);
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}

function searchBook() {
	const searchInput = document.getElementById('searchBookTitle').value;
	const books = JSON.parse(localStorage.getItem('books')) || [];
	const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput.toLowerCase()));
	displayBooks(filteredBooks);
	console.log(filteredBooks)
}

// Event Listeners
document.getElementById('searchBook').addEventListener('submit', function (e) {
	e.preventDefault();
	searchBook();
});

document.getElementById('inputBook').addEventListener('submit', function (e) {
	e.preventDefault();
	addBook();
});


document.addEventListener('DOMContentLoaded', function () {
	displayBooks();
});