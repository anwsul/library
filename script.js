let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
  this.id = crypto.randomUUID();
}

function toggleBookReadStatus() {
  this.read = !this.read;
}

function addBookToLibrary() {
  myLibrary.push(this);
}

function removeBookFromLibrary() {
  myLibrary = myLibrary.filter((book) => book.id != this.id)
}

Book.prototype.addBookToLibrary = addBookToLibrary;
Book.prototype.removeBooksFromLibrary = removeBooksFromLibrary;
Book.prototype.setBookReadStatus = setBookReadStatus;

//display books function
// new book button to add a new book
// dialog or side bar to add a book
// remove book
// read status