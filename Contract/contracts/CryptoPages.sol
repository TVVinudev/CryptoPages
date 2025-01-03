// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPages {
    struct Book {
        uint256 id;
        string title;
        string description;
        string img;
        string author;
        uint256 price;
        uint256 stock;
        address owner;
    }

    struct Order {
        uint256 orderId;
        uint256 bookId;
        address buyer;
        string houseAddress;
        uint256 mobile;
        uint256 quantity;
        bool delivered;
    }

    uint256 private bookCounter;
    uint256 private orderCounter;

    mapping(uint256 => Book) public books;
    mapping(uint256 => Order) public orders;

    address public admin;

    constructor(){
        admin = msg.sender;
    }

    event BookAdded(uint256 bookId, string title, address indexed owner);
    event BookOrdered(uint256 orderId, uint256 bookId, address indexed buyer, uint256 quantity);
    event OrderDelivered(uint256 orderId);

    // Add a new book
    function addBook(string memory _title, string memory _author,string memory _description, string memory _img, uint256 _price, uint256 _stock ) public {
        require(_price > 0, "Price must be greater than zero");
        require(_stock > 0, "Stock must be greater than zero");

        bookCounter++;
        books[bookCounter] = Book(bookCounter, _title, _author,_description,_img, _price, _stock, msg.sender);

        emit BookAdded(bookCounter, _title, msg.sender);
    }

    // View all books
    function viewBooks() public view returns (Book[] memory) {
        Book[] memory allBooks = new Book[](bookCounter);
        for (uint256 i = 1; i <= bookCounter; i++) {
            allBooks[i - 1] = books[i];
        }
        return allBooks;
    }

    // Order a book
    function orderBook(uint256 _bookId, uint256 _quantity, string memory _houseAddress, uint256 _mobile) public payable {
        Book storage book = books[_bookId];
        require(book.id != 0, "Book does not exist");
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_quantity <= book.stock, "Not enough stock available");
        require(msg.value >= book.price * _quantity, "Insufficient payment");

        book.stock -= _quantity;

        orderCounter++;
        orders[orderCounter] = Order(orderCounter, _bookId, msg.sender, _houseAddress, _mobile, _quantity, false);

        payable(book.owner).transfer(msg.value);

        emit BookOrdered(orderCounter, _bookId, msg.sender, _quantity);
    }

    // Track an order
    function trackOrder(uint256 _orderId) public view returns (Order memory) {
        Order memory order = orders[_orderId];
        require(order.orderId != 0, "Order does not exist");
        return order;
    }

    // Mark an order as delivered (only seller can call this)
    function deliverOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.orderId != 0, "Order does not exist");

        Book storage book = books[order.bookId];
        require(msg.sender == book.owner, "Only the seller can mark the order as delivered");

        order.delivered = true;

        emit OrderDelivered(_orderId);
    }

    // Search for a book by ID
    function searchBookById(uint256 _bookId) public view returns (Book memory) {
        Book memory book = books[_bookId];
        require(book.id != 0, "Book not found");
        return book;
    }

    // Search for books by title
    function searchBooksByTitle(string memory _title) public view returns (Book[] memory) {
        uint256 matchingBooksCount = 0;

        // Count matching books
        for (uint256 i = 1; i <= bookCounter; i++) {
            if (keccak256(abi.encodePacked(books[i].title)) == keccak256(abi.encodePacked(_title))) {
                matchingBooksCount++;
            }
        }

        // Collect matching books
        Book[] memory matchingBooks = new Book[](matchingBooksCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= bookCounter; i++) {
            if (keccak256(abi.encodePacked(books[i].title)) == keccak256(abi.encodePacked(_title))) {
                matchingBooks[index] = books[i];
                index++;
            }
        }
        return matchingBooks;
    }

    // Search for books by author
    function searchBooksByAuthor(string memory _author) public view returns (Book[] memory) {
        uint256 matchingBooksCount = 0;

        // Count matching books
        for (uint256 i = 1; i <= bookCounter; i++) {
            if (keccak256(abi.encodePacked(books[i].author)) == keccak256(abi.encodePacked(_author))) {
                matchingBooksCount++;
            }
        }

        // Collect matching books
        Book[] memory matchingBooks = new Book[](matchingBooksCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= bookCounter; i++) {
            if (keccak256(abi.encodePacked(books[i].author)) == keccak256(abi.encodePacked(_author))) {
                matchingBooks[index] = books[i];
                index++;
            }
        }
        return matchingBooks;
    }
}
