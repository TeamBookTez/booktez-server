import assert from "assert";
import constant from "../../library/constant";
import { Book, Review, User } from "../../models";
import bookService from "../../service/book";

describe("bookService test", () => {
  describe("postBookService test", () => {
    it("error: null value given", async () => {
      assert.strictEqual(
        await bookService.postBookService(
          true,
          1,
          null,
          "thumbnail",
          "title",
          ["author"],
          ["translator"],
          "2021년 12월 18일"
        ),
        constant.NULL_VALUE
      );
    });
    it("error: not logged in user", async () => {
      assert.strictEqual(
        await bookService.postBookService(
          false,
          1,
          "isbn",
          "thumbnail",
          "title",
          ["author"],
          ["translator"],
          "2021년 12월 18일"
        ),
        constant.ANONYMOUS_USER
      );
    });
    it("error: review already exist", async () => {
      const book = await Book.create({
        isbn: "12345",
        title: "test",
        author: ["test"],
      });
      const review = await Review.create({
        userId: 1,
        bookId: book.id,
        reviewSt: 2,
        finishSt: false,
        isDeleted: false,
      });
      assert.strictEqual(
        await bookService.postBookService(
          true,
          1,
          "12345",
          "thumbnail",
          "title",
          ["author"],
          ["translator"],
          "2021년 12월 18일"
        ),
        constant.VALUE_ALREADY_EXIST
      );
      await Book.destroy({
        where: {
          id: book.id,
        },
      });
      await Review.destroy({
        where: {
          id: review.id,
        },
      });
    });
    it("success", async () => {
      const result: any = await bookService.postBookService(
        true,
        1,
        "123454321234321",
        "thumbnail",
        "title",
        ["author"],
        ["translator"],
        "2021년 12월 18일"
      );
      assert.ok(result.isLogin);
      await Book.destroy({
        where: {
          isbn: "123454321234321",
        },
      });
      await Review.destroy({
        where: {
          id: result.reviewId,
        },
      });
    });
  });
  describe("getBookService test", () => {
    it("false: length is less than 2", async () => {
      //   assert.ok(!checkNicknameValid("룡"));
    });
  });
});
