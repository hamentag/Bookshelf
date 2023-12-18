// Bring data from book-data.js file
const data = bookData;
console.log(data)
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
            <table>
                <tr>
                    <td>Author</td>
                    <td>${this.author.join(' / ')}</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>${this.language.join(' / ')}</td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>${this.subject.join(' / ')}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>${this.title.join(' / ')}</td>
                </tr>
            </table>
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
        // bookshelfUl.classList.add('bookshelf');
        this.books.forEach(book => {
            bookshelfUl.appendChild(book.render());
        });
        return bookshelfUl;
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

bookshelfEl.replaceChildren(bookshelf.render());