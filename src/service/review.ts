import mongoose from "mongoose";

// library
import constant from "../library/constant";
import { keysToSnake, keysToCamel } from "../library/convertSnakeToCamel";

// model
import User from "../models/User";
import Review from "../models/Review";
import Book from "../models/Book";
import { String } from "aws-sdk/clients/apigateway";

/**
 *  @독서중 독서 전 작성
 *  @route PATCH /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */

const patchReviewPreService = async (
  reviewId: string,
  userId: string,
  answerOne: string,
  answerTwo: string,
  questionList: string[],
  reviewSt: number
) => {
  if (
    !reviewId ||
    !userId ||
    answerOne === undefined ||
    answerOne === null ||
    answerTwo === undefined ||
    answerTwo === null ||
    questionList === undefined ||
    questionList === null ||
    !reviewSt
  ) {
    return constant.NULL_VALUE;
  }

  // review 체크
  const review = await Review.findOne(
    keysToSnake({
      id: reviewId,
      userId,
      isDeleted: false,
    })
  );

  if (!review) {
    return constant.DB_NOT_FOUND;
  }

  // review 수정
  await review.updateOne({
    $set: keysToSnake({
      questionList,
      answerOne,
      answerTwo,
      reviewSt,
      finishSt: false,
    }),
  });

  return { reviewId: review.id };
};

/**
 *  @질문리스트 조회하기
 *  @route GET /review/:reviewId/question-list
 *  @access private
 *  @error
 *      1. 필요한 값이 없습니다.
 *      2. 존재하지 않는 Review 입니다.
 */
const getQuestionService = async (userId: string, reviewId: string) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  // review 조회
  const review = await Review.findById(
    new mongoose.Types.ObjectId(reviewId)
  ).where(keysToSnake({ userId, isDeleted: false }));

  // 존재하지 않는 리뷰
  if (!review) {
    return constant.DB_NOT_FOUND;
  }

  // 질문리스트
  let questionList = review.question_list;

  return { questionList };
};

/**
 *  @독서중 독서 중 작성
 *  @route PATCH /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPeriService = async (
  reviewId: string,
  userId: string,
  answerThree: object,
  reviewSt: number
) => {
  if (
    !reviewId ||
    !userId ||
    answerThree === undefined ||
    answerThree === null ||
    !reviewSt
  ) {
    return constant.NULL_VALUE;
  }

  // 해당 review 조회
  const review = await Review.findById(
    new mongoose.Types.ObjectId(reviewId)
  ).where(keysToSnake({ userId, isDeleted: false }));

  // 2. 존재하지 않는 review
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  let finishSt = Number(reviewSt) === 4 ? true : false;

  // 3. review update
  await review.updateOne({
    $set: keysToSnake({
      answerThree,
      reviewSt,
      finishSt,
    }),
  });

  // 책 확인
  const book = await Book.findOne(
    keysToSnake({ id: review.book_id }),
    keysToSnake({
      _id: false,
      isbn: false,
      isbnSub: false,
    })
  );

  // snake to camel
  const originBook = keysToCamel(book);
  const camelBook = keysToCamel(originBook.Doc);

  return {
    reviewId: review.id,
    bookData: {
      title: camelBook.title,
      author: camelBook.author,
      translator: camelBook.translator,
      thumbnail: camelBook.thumbnail,
      publicationDt: camelBook.publicationDt,
    },
  };
};

/**
 *  @독후감 조회하기
 *  @route GET /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewService = async (userId: string, reviewId: string) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  // review 조회
  const reviewToShow = await Review.findById(
    new mongoose.Types.ObjectId(reviewId)
  ).where(keysToSnake({ userId, isDeleted: false }));

  // 존재하지 않는 리뷰일 때
  if (!reviewToShow) {
    return constant.WRONG_REQUEST_VALUE;
  }
  // snake to camel
  const originReview = keysToCamel(reviewToShow);
  const camelReview = keysToCamel(originReview.Doc);

  // book 조회
  const bookToShow = await Book.findById(camelReview.bookId);

  return {
    bookTitle: bookToShow.title,
    answerOne: camelReview.answerOne,
    answerTwo: camelReview.answerTwo,
    questionList: camelReview.questionList,
    answerThree: camelReview.answerThree,
    reviewSt: camelReview.reviewSt,
    finishSt: camelReview.finishSt,
  };
};

/**
 *  @독후감_전단계_조회하기
 *  @route GET /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPreService = async (userId: string, reviewId: string) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }
  const reviewToShow = await Review.findOne({
    id: reviewId,
    userId,
    isDeleted: false,
  });

  // 존재하지 않는 리뷰일 때
  if (!reviewToShow) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 질문리스트 default response
  let questionList = reviewToShow.question_list;
  if (questionList.length < 1) {
    questionList = [""];
  }

  return {
    answerOne: reviewToShow.answer_one,
    answerTwo: reviewToShow.answer_two,
    questionList,
    reviewSt: reviewToShow.review_st,
    finishSt: reviewToShow.finish_St,
  };
};

/**
 *  @독후감_중단계_조회하기
 *  @route GET /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPeriService = async (userId: string, reviewId: string) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }
  const reviewToShow = await Review.findOne({
    id: reviewId,
    userId,
    isDeleted: false,
  });

  // 존재하지 않는 리뷰일 때
  if (!reviewToShow) {
    return constant.WRONG_REQUEST_VALUE;
  }

  return {
    answerThree: reviewToShow.answer_three,
    reviewSt: reviewToShow.review_st,
    finishSt: reviewToShow.finish_St,
  };
};

/**
 *  @독서 완료 후 답변 수정
 *  @route PATCH /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const patchReviewService = async (
  reviewId: string,
  answerOne: string,
  answerTwo: string,
  answerThree: object
) => {
  if (
    !reviewId ||
    answerOne === undefined ||
    answerOne === null ||
    answerTwo === undefined ||
    answerTwo === null ||
    answerThree === undefined ||
    answerThree === null
  ) {
    return constant.NULL_VALUE;
  }

  // find review
  const reviewToChange = await Review.findById(
    new mongoose.Types.ObjectId(reviewId)
  ).where(keysToSnake({ isDeleted: false }));

  // 존재하지 않는 리뷰
  if (!reviewToChange) {
    return constant.DB_NOT_FOUND;
  }

  // review 수정
  await reviewToChange.updateOne({
    $set: keysToSnake({
      answerOne,
      answerTwo,
      answerThree,
    }),
  });

  return constant.SUCCESS;
};

/**
 *  @독후감 삭제
 *  @route DELETE /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 삭제될 리뷰가 없을 때
 *      3. 이미 삭제된 리뷰일 때
 */
const deleteReviewService = async (userId: string, reviewId: string) => {
  // 1. 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  // 해당 review 조회
  const review = await Review.findOne({
    id: reviewId,
    userId,
  });

  // 2. 존재하지 않는 review
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 3. 이미 삭제된 Review 입니다.
  if (review.is_deleted) {
    return constant.VALUE_ALREADY_DELETED;
  }

  // 독후감 삭제
  await review.update({
    isDeleted: true,
  });

  return constant.SUCCESS;
};

const reviewService = {
  patchReviewPreService,
  getQuestionService,
  patchReviewPeriService,
  getReviewService,
  getReviewPreService,
  getReviewPeriService,
  patchReviewService,
  deleteReviewService,
};

export default reviewService;
