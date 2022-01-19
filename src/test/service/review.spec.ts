import assert from "assert";
import reviewService from "../../service/review";
import constant from "../../library/constant";

import { User, Book, Review } from "../../models";

describe("reviewService test", async () => {
  let testUser, testBook, testReview;
  before("create user, book, empty review", async () => {
    testUser = await User.create({
      email: "mocha@test.com",
      nickname: "mocha",
      password: "mocha123!",
    });
    testBook = await Book.create({
      isbn: "mochamocha",
      title: "mochaBook",
      author: ["mo", "cha"],
    });
    testReview = await Review.create({
      userId: testUser.id,
      bookId: testBook.id,
      questionList: ["모카?", "좋아하세요?"],
      answerOne: "모카 좋아하져",
      answerTwo: "캐페모카",
      reviewSt: 2,
    });
  });
  after("delete user, book", async () => {
    await User.destroy({ where: { id: testUser.id } });
    await Book.destroy({where: {id: testBook.id}});
  });
  describe("patchReviewBefore test", async () => {
    it("success: patchReviewBefore returns reviewId correctly", async () => {
      const patchedReview: any =
        await reviewService.patchReviewBeforeController(
          testReview.id,
          testUser.id,
          testReview.answerOne,
          testReview.answerTwo,
          testReview.questionList,
          3
        );
      assert.ok(patchedReview.reviewId === testReview.id);
    });

    it("fail: try to patch review which doesn't exist", async () => {
      const nonExistentReview: any =
        await reviewService.patchReviewBeforeController(
          -50,
          testUser.id,
          testReview.answerOne,
          testReview.answerTwo,
          testReview.questionList,
          3
        );
      assert.strictEqual(
        await reviewService.patchReviewBeforeController(
          -50,
          testUser.id,
          testReview.answerOne,
          testReview.answerTwo,
          testReview.questionList,
          3
        ),
        constant.DB_NOT_FOUND
      );
    });
  });
  describe("getQuestionList test", async () => {
    it("success: getQuestionList returns question list correctly", async () => {
      const questionList: any = await reviewService.getQuestionService(
        testUser.id,
        testReview.id
      );
      // 오 여기 그냥 strict로 하면 안됨 ㄷ ㄷ 정확히 먼 차이인지 찾아보자 ~
      assert.deepStrictEqual(
        questionList.questionList,
        testReview.questionList
      );
    });
    it("fail: try to get questionList whose reviewId doesn't exist", async () => {
      assert.strictEqual(
        await reviewService.getQuestionService(testUser.id, -50),
        constant.WRONG_REQUEST_VALUE
      );
    });
  });
  describe("patchReviewNow test", async () => {
    it("success: patchReviewNow returns reviewId and bookData correctly", async () => {
      const testBookData = {
        thumbnail: "",
        title: testBook.title,
        authors: testBook.author,
        translators: [],
        publicationDt: "",
      };

    });
  });
  describe("getReview test", async() => {
    it("success: getReview returns review data correctly", async() => {
      // 맘에 안들어
      // 먼가 .. 책 정보 잘가져오는지도 알아야할 것 같은 .. 몰라 .. 샹 ..
      const foundReview = await Review.findOne({where: {id: testReview.id}});
      assert.strictEqual(foundReview.userId, testUser.id);
});
    it("fail: try to get review which doesn't exist", async() => {
      assert.strictEqual(await reviewService.getReviewService(testUser.id, -50), constant.WRONG_REQUEST_VALUE);
    });
  });
  describe("patchReview test", async () => {});
  describe("deleteReview test", async () => {
    it("success: deleteReview deletes review correctly", async () => {
      const testReviewId = testReview.id;
      await reviewService.deleteReviewService(testUser.id, testReview.id);
      const deletedReview: any = await Review.findOne({
        where: { id: testReviewId },
      });
      assert.ok(deletedReview.isDeleted);
    });

    it("fail: try to delete non-existent review", async () => {
      assert.strictEqual(
        await reviewService.deleteReviewService(testUser.id, -50),
        constant.WRONG_REQUEST_VALUE
      );
    });

    it("fail: try to delete review which is already deleted", async () => {
      await reviewService.deleteReviewService(testUser.id, testReview.id);
      const deletedReview: any = await Review.findOne({
        where: { id: testReview.id },
      });
      // 존재하지 않는 review, 이미 삭제된 review 모호 ..
      // 만약 이 두 경우를 나눌거라면 리뷰를 조회해오는 where에서
      // "isDeleted: false" -> 여기는 빼야하지 않을까?

      // 일단 두 경우 모두 WRONG_REQUEST로 빠지니까 글케 박아두자
      assert.strictEqual(
        await reviewService.deleteReviewService(testUser.id, deletedReview.id),
        constant.WRONG_REQUEST_VALUE
      );
    });
  });
});
