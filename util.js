const generateId = () => {
    return Math.floor(Math.random()*90000) + 10000;
};

const idExist = (books, id) => {
    const allBookIds = books.map((item) => item.bookId );
    return (allBookIds.indexOf(id) > -1);
}

module.exports = {
    generateId, idExist
};