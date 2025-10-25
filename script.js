let library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.id = crypto.randomUUID();
}

function addBookToLibrary() {
    library.push(this);
}

function removeBookFromLibrary() {
    library = library.filter((book) => book.id != this.id)
}

function toggleBookReadStatus() {
    this.read = !this.read;
}

Book.prototype.addBookToLibrary = addBookToLibrary;
Book.prototype.removeBookFromLibrary = removeBookFromLibrary;
Book.prototype.toggleBookReadStatus = toggleBookReadStatus;


// user interface related
const addBookButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");

addBookButton.onclick = () => {
  dialog.showModal();
}

document.querySelector(".close-dialog").onclick = () => dialog.close();

const form = document.querySelector("form");
const bookTitle = document.querySelector("#book-title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#number-of-pages");

form.onsubmit = (e) => {
    e.preventDefault();

    const book = new Book(bookTitle.value, author.value, numberOfPages.value);
    library.push(book);

    const bookCard = createBookCard(book);
    addBookButton.parentNode.insertBefore(bookCard, addBookButton);

    const checkButton = bookCard.firstElementChild;
    checkButton.onclick = () =>  {
        toggleBookReadStatusUI(bookCard, checkButton);
    };

    const deleteButton = bookCard.lastElementChild.firstElementChild;
    deleteButton.onclick = () => {
        bookCard.remove();
        book.removeBookFromLibrary();
    };

    clearForm();
}

function createBookCard(book) {
    console.log(book);
    const bookCard = document.createElement("div");

    bookCard.setAttribute("id", book.id);
    bookCard.setAttribute("class", "book-card");
    bookCard.innerHTML = `
        <img src="./assets/circle-outline.svg" class="read-status">
        <h3 class="book-title">${book.title}</h3>
        <p class="author">By ${book.author}</p>
        <div>
            <img src="./assets/delete.svg" alt="" class="delete-book-button">
            <p class="number-of-pages">${book.pages} pages</p>
        </div>
    `

    return bookCard;
}

function toggleBookReadStatusUI(bookCard, checkButton) {
    let currentReadStatus = "./assets/circle-outline.svg";

    library.forEach(book => {
        if (book.id == bookCard.id) {
            book.isRead = !book.isRead;

            if (book.isRead) {
                currentReadStatus = "./assets/check-circle.svg";
            } else {
                currentReadStatus = "./assets/circle-outline.svg";
            }
        } 
    });

    checkButton.setAttribute("src", currentReadStatus);
}

function clearForm() {
    bookTitle.value = null;
    author.value = null;
    numberOfPages.value = null;
    dialog.close();
}