import mongoose from "mongoose";

// library
import constant from "../library/constant";
import { keysToSnake } from "../library/convertSnakeToCamel";

// model
import User from "../models/User";
import Review from "../models/Review";
import Book from "../models/Book";

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
  const review = await Review.findOne({
    id: reviewId,
    user_id: userId,
    isDeleted: false,
  });

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
  const review = await Review.findOne({
    id: reviewId,
    userId,
    isDeleted: false,
  });

  // 2. 존재하지 않는 review
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  let finishSt = Number(reviewSt) === 4 ? true : false;

  // 3. review update
  await review.update({
    answerThree,
    reviewSt,
    finishSt,
  });

  // 책 확인
  const book = await Book.findOne({ id: review.book_id });

  return {
    reviewId: review.id,
    bookData: {
      thumbnail: book.thumbnail,
      title: book.title,
      author: book.author,
      translator: book.translator,
      publicationDt: book.publication_dt,
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
  const reviewToShow = await Review.findOne({
    id: reviewId,
    userId,
    isDeleted: false,
  });

  // 존재하지 않는 리뷰일 때
  if (!reviewToShow) {
    return constant.WRONG_REQUEST_VALUE;
  }

  const bookToShow = await Book.findOne({
    where: { id: reviewToShow.book_id },
  });

  // 질문리스트 default response
  let questionList = reviewToShow.question_list;
  if (questionList.length < 1) {
    questionList = [""];
  }

  return {
    bookTitle: bookToShow.title,
    answerOne: reviewToShow.answer_one,
    answerTwo: reviewToShow.answer_two,
    questionList,
    answerThree: reviewToShow.answer_three,
    reviewSt: reviewToShow.review_st,
    finishSt: reviewToShow.finish_St,
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
// const patchReviewService = async (
//   reviewId: number,
//   answerOne: string,
//   answerTwo: string,
//   answerThree: object
// ) => {
//   if (
//     !reviewId ||
//     answerOne === undefined ||
//     answerOne === null ||
//     answerTwo === undefined ||
//     answerTwo === null ||
//     answerThree === undefined ||
//     answerThree === null
//   ) {
//     return constant.NULL_VALUE;
//   }

//   const reviewToChange = await Review.findOne({
//     where: { id: reviewId, isDeleted: false },
//   });
//   if (!reviewToChange) {
//     return constant.WRONG_REQUEST_VALUE;
//   }

//   await Review.update(
//     {
//       answerOne,
//       answerTwo,
//       answerThree,
//     },
//     {
//       where: { id: reviewId, isDeleted: false },
//     }
//   );

//   return constant.SUCCESS;
// };

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
  // patchReviewService,
  deleteReviewService,
};

export default reviewService;
