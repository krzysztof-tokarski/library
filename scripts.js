const addNewBookFormContainer = document.getElementById("add-new-book-form-container");
const addNewBookButton = document.getElementById("add-new-book-button");
const formButton = document.getElementById("form-button");
const addNewBookForm = document.getElementById("add-new-book-form");
const cardsContainer = document.getElementById("cards-container");

addNewBookButton.addEventListener("click", toggleForm);
formButton.addEventListener("click",addBookToLibrary);




let myLibrary = [];

function Book(author,title,numberOfPages,haveRead) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
}


function addBookToLibrary() {
  
  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let numberOfPages = document.getElementById("number-of-pages").value;
  let haveRead = document.getElementById("have-read");

  if (haveRead.checked) {
    haveRead.value = "yes"
  } else {
    haveRead.value = "no"
  }


  let newBook = new Book(author,title,numberOfPages,haveRead.value)

  let inputs = [author,title,numberOfPages]

  inputs.forEach(input => input.value="")
  
  addNewBookForm.reset();

  myLibrary.push(newBook)

  displayMyLibrary(myLibrary)
}

function displayMyLibrary (myLibrary) {
  
  while (cardsContainer.firstChild) {
    cardsContainer.firstChild.remove()
  }
  
  myLibrary.forEach((book) => {
    let bookCard = document.createElement('div');
    let authorField = document.createElement('div');
    let titleField = document.createElement('div');
    let pagesField = document.createElement('div');
    let haveReadField = document.createElement('div');
    let haveReadButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let index = myLibrary.indexOf(book);

    authorField.textContent = `Author: ${book.author}`;
    titleField.textContent = `Title: ${book.title}`;
    pagesField.textContent = `Pages: ${book.numberOfPages}`;
    haveReadField.textContent = `Have read: ${book.haveRead}`
    haveReadButton.textContent = 'Press to change "have read" status';
    
    bookCard.dataset.index = index;
    haveReadButton.dataset.index = index;
    deleteButton.dataset.index = index;


    haveReadButton.addEventListener("click", changeReadStatus)

    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click",deleteBook)

    let elements =  [authorField,titleField,pagesField,haveReadField,haveReadButton,deleteButton];
    elements.forEach((element) => {bookCard.appendChild(element)})

    bookCard.classList.add('card');
    haveReadButton.classList.add('have-read-button')

    cardsContainer.appendChild(bookCard);
  })
}


function toggleForm() {
  if (window.getComputedStyle(addNewBookFormContainer).display === "none") {
    addNewBookFormContainer.style.display = "flex";
  } else {
    addNewBookFormContainer.style.display = "none";
  }
}

function deleteBook(event) {
  myLibrary.splice(this.dataset.index,1)
  displayMyLibrary (myLibrary)
}

function changeReadStatus(event) {
  let index = this.dataset.index

  if (myLibrary[index].haveRead == "yes") {
    myLibrary[index].haveRead = "no";
  } else {
    myLibrary[index].haveRead = "yes";
  }

  displayMyLibrary (myLibrary)
  
}