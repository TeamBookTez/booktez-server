// import assert from "assert";

// // library
// import constant from "../../library/constant";

// // model
// import { Book, Review, User } from "../../models";

// // service
// import bookService from "../../service/book";

// describe("bookService test", () => {
//   describe("postBookService test", () => {
//     it("fail: null value given", async () => {
//       assert.strictEqual(
//         await bookService.postBookService(
//           true,
//           1,
//           null,
//           "thumbnail",
//           "title",
//           ["author"],
//           ["translator"],
//           "2021년 12월 18일"
//         ),
//         constant.NULL_VALUE
//       );
//     });
//     it("fail: not logged in user", async () => {
//       assert.strictEqual(
//         await bookService.postBookService(
//           false,
//           1,
//           "isbn",
//           "thumbnail",
//           "title",
//           ["author"],
//           ["translator"],
//           "2021년 12월 18일"
//         ),
//         constant.ANONYMOUS_USER
//       );
//     });
//     it("fail: review already exist", async () => {
//       const book: Book = await Book.create({
//         isbn: "12345",
//         title: "mocha",
//         author: ["mocha"],
//       });
//       const review: Review = await Review.create({
//         userId: 1,
//         bookId: book.id,
//         reviewSt: 2,
//         finishSt: false,
//         isDeleted: false,
//       });
//       assert.strictEqual(
//         await bookService.postBookService(
//           true,
//           1,
//           "12345",
//           "thumbnail",
//           "title",
//           ["author"],
//           ["translator"],
//           "2021년 12월 18일"
//         ),
//         constant.VALUE_ALREADY_EXIST
//       );
//       await Book.destroy({
//         where: {
//           id: book.id,
//         },
//       });
//       await Review.destroy({
//         where: {
//           id: review.id,
//         },
//       });
//     });
//     it("success", async () => {
//       const result: any = await bookService.postBookService(
//         true,
//         1,
//         "123454321234321",
//         "thumbnail",
//         "title",
//         ["author"],
//         ["translator"],
//         "2021년 12월 18일"
//       );
//       assert.ok(result.isLogin);
//       await Book.destroy({
//         where: {
//           isbn: "123454321234321",
//         },
//       });
//       await Review.destroy({
//         where: {
//           id: result.reviewId,
//         },
//       });
//     });
//   });
//   describe("getBookService test", () => {
//     it("success", async () => {
//       const mochaUser: User = await User.create({
//         email: "mocha@test.com",
//         password: "!234qwer",
//         nickname: "mocha",
//       });
//       const mochaBook: Book = await Book.create({
//         isbn: "12345",
//         title: "mocha",
//         author: ["mocha"],
//       });
//       const mochaReview: Review = await Review.create({
//         userId: mochaUser.id,
//         bookId: mochaBook.id,
//         reviewSt: 2,
//         finishSt: false,
//         isDeleted: false,
//       });

//       const resultBooks = await bookService.getBookService(mochaUser.id);

//       const resultBook = resultBooks.books[0];

//       assert.strictEqual(mochaBook.thumbnail, resultBook.thumbnail);
//       assert.strictEqual(mochaBook.title, resultBook.title);
//       assert.deepStrictEqual(mochaBook.author, resultBook.author);
//       assert.strictEqual(mochaReview.reviewSt, resultBook.state);

//       await User.destroy({
//         where: {
//           id: mochaUser.id,
//         },
//       });
//       await Book.destroy({
//         where: {
//           id: mochaBook.id,
//         },
//       });
//       await Review.destroy({
//         where: {
//           id: mochaReview.id,
//         },
//       });
//     });
//   });
// });
