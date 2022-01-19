import assert from "assert";
import reviewService from "../../service/review";
import constant from "../../library/constant";

import { User, Book, Review } from "../../models";

describe("reviewService test", async () => {
  // MARK: - before, after
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
    await Book.destroy({ where: { id: testBook.id } });
  });

  //MARK: - 독서 전 작성 테스트
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

  // MARK: - 질문리스트 조회 테스트
  describe("getQuestionList test", async () => {
    it("success: getQuestionList returns question list correctly", async () => {
      const questionList: any = await reviewService.getQuestionService(
        testUser.id,
        testReview.id
      );
      // TODO: - strictEqual Vs deepStrictEqual
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

  // MARK: - 독서 중 작성 테스트
  describe("patchReviewNow test", async () => {
    it("success: patchReviewNow returns reviewId and bookData correctly", async () => {
      const answerThree: object = {
        root: [
          {
            depth: 1,
            question: "북테즈는 왜 전부 이쁘고 잘생겼을까?",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            depth: 1,
            question: "북테즈는 왜 이렇게 성격이 다 좋을까?",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            depth: 1,
            question: "북테즈는 왜 다 일을 잘할까?",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      await reviewService.patchReviewNowService(
        testReview.id,
        testReview.userId,
        answerThree,
        4
      );
      const updatedReview = await Review.findOne({
        where: {
          id: testReview.id,
        },
      });
      assert.deepStrictEqual(updatedReview.answerThree, answerThree);
    });
    it("fail: return null when arguments are null", async () => {
      assert.strictEqual(
        await reviewService.patchReviewNowService(
          testReview.id,
          testReview.userId,
          null,
          4
        ),
        constant.NULL_VALUE
      );
    });
    it("fail: return wrong request value when request wrong", async () => {
      assert.strictEqual(
        await reviewService.patchReviewNowService(
          -100,
          testReview.userId,
          { test: "hi" },
          4
        ),
        constant.WRONG_REQUEST_VALUE
      );
    });
  });

  // MARK: - 독후감 조회 테스트
  describe("getReview test", async () => {
    it("success: getReview returns book title and review data correctly", async () => {
      const foundReview = await Review.findOne({
        where: { id: testReview.id },
      });
      const foundBook = await Book.findOne({
        where: { id: foundReview.bookId },
      });
      assert.strictEqual(foundReview.userId, testUser.id);
      assert.strictEqual(foundBook.title, testBook.title);
    });
    it("fail: try to get review which doesn't exist", async () => {
      assert.strictEqual(
        await reviewService.getReviewService(testUser.id, -50),
        constant.WRONG_REQUEST_VALUE
      );
    });
  });

  // MARK: - 독서 완료 후 답변 수정 테스트
  describe("patchReview test", async () => {
    it("success: patchReview returns changed data", async () => {
      const answerOne: string = "모카 수정 질문 1";
      const answerTwo: string = "모카 수정 질문 2";
      const answerThree: object = {
        root: [
          {
            depth: 1,
            question: "모카 수정 질문 3",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            depth: 1,
            question: "북테즈는 왜 이렇게 성격이 다 좋을까?",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            depth: 1,
            question: "북테즈는 왜 다 일을 잘할까?",
            answer: [
              {
                text: "유전자가 우월해서",
                children: [
                  {
                    depth: 2,
                    question: "왜 유전자가 우월할까?",
                    answer: [
                      {
                        text: "세상은 우리를 그렇게 만들었다.",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const resData = await reviewService.patchReviewService(
        testReview.id,
        answerOne,
        answerTwo,
        answerThree
      );
      const updatedReview = await Review.findOne({
        where: {
          id: testReview.id,
        },
      });
      assert.strictEqual(resData, constant.SUCCESS);
      assert.strictEqual(updatedReview.answerOne, answerOne);
      assert.strictEqual(updatedReview.answerTwo, answerTwo);
      assert.deepStrictEqual(updatedReview.answerThree, answerThree);
    });
    it("fail: return null when arguments are null", async () => {
      assert.strictEqual(
        await reviewService.patchReviewService(testReview.id, null, null, null),
        constant.NULL_VALUE
      );
    });
    it("fail: return wrong request value when request wrong", async () => {
      assert.strictEqual(
        await reviewService.patchReviewService(-100, "answerOne", "answerTwo", {
          test: "hi",
        }),
        constant.WRONG_REQUEST_VALUE
      );
    });
  });

  // MARK: - 리뷰 삭제 테스트
  describe("deleteReview test", async () => {
    it("success: deleteReview deletes review correctly", async () => {
      const testReviewId: number = testReview.id;
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
      assert.strictEqual(
        await reviewService.deleteReviewService(testUser.id, deletedReview.id),
        constant.VALUE_ALREADY_DELETED
      );
    });
  });
});
