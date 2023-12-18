// Bring data from book-data.js file
const data = bookData;
// References
const header = document.getElementById('header');
const bookshelfEl = document.getElementById('bookshelf');

// Classes declaration
class Book {
    constructor(_author, _language, _subject, _title){
        this.author = _author;
        this.language = _language;
        this.subject = _subject;
        this.title = _title;
    }
    render(){
        const bookLi = document.createElement('li');
        bookLi.classList.add('book');
        bookLi.innerHTML = `
            <div class="tip">
                <table>
                    <tr><td>Author</td><td>${this.author.join(' / ')}</td></tr>
                    <tr><td>Title</td><td>${this.title.join(' / ')}</td></tr>
                    <tr><td>Language</td><td>${this.language.join(' / ')}</td></tr>                  
                </table>
                <div class="more">
                    Subject: ${this.subject.join(' / ')}
                </div>
            </div>
            `;
        return bookLi;
    }
}

class Bookshelf{
    constructor(){
        this.books = [];
    }
    addBook(book){
        this.books.push(book);
    }
    render(){
        const bookshelfUl = document.createElement('ul');
        this.books.forEach(book => {
            bookshelfUl.appendChild(book.render());
        });
        return bookshelfUl;
    }

    sort(key){
        const sortedList = [...this.books].sort(function(a, b) {
            const nameA = a[`${key}`][0].toUpperCase();
            const nameB = b[`${key}`][0].toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        return sortedList;
    }
}

// create instances
const bookshelf = new Bookshelf();

// data.forEach(book => {
//     bookshelf.addBook(Object.setPrototypeOf(book, Book.prototype))
// });
//   OR to preserve data as it is:
data.forEach(book => {
    bookshelf.addBook(new Book(book.author, book.language, book.subject, book.title));
});

// Add event listeners to checkboxes
const sortCheckboxes = document.querySelectorAll('input[type="checkbox"]');
sortCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // All other checkboxes are turned unchecked
            sortCheckboxes.forEach(function(otherCheckbox) {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
        });

        //  create Bookshelf instance for the sorted list
        const sortedLst = new Bookshelf();
        // sort the list by the slected key and create Book instances to fill the sorted list
        bookshelf.sort(this.name.slice(8)).forEach(book => {
            sortedLst.addBook(Object.setPrototypeOf(book, Book.prototype))
        });
        // display the sorted list
        bookshelfEl.replaceChildren(sortedLst.render());
        }
        else{
            // otherwise display the original list
            init();
        }
    });
});

// initial state: Display the original list
function init(){
    bookshelfEl.replaceChildren(bookshelf.render());
}

init();
