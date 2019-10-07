/**api链接 */
const apiUrl = "https://api.douban.com/v2/book/"; // 需要修改为可用API,没有可以联系微信geekxz
//
module.exports = { 
    getBookById: apiUrl,
    searchBook: apiUrl + "search",
    getBookList: apiUrl + "series/:id/books" }