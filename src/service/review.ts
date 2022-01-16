import sequelize from "sequelize";
import { Op } from "sequelize";

// libraries
import constant from "../library/constant";

// models
import { User, Book, Review } from "../models";

/**
 *  @질문리스트 조회하기
 *  @route GET /review/:reviewId/question-list
 *  @access private
 *  @error
 *      1. 필요한 값이 없습니다.
 *      2. 존재하지 않는 Review 입니다.
 */

const getQuestionService = async (userId: number, reviewId: number) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  // review 조회
  const review = await Review.findOne({
    where: {
      id: reviewId,
      userId,
      isDeleted: false,
    },
  });

  // 존재하지 않는 리뷰일 때
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  return { questionList: review.questionList };
};

/**
 *  @독서중 독서 전 작성
 *  @route POST /review/before/:isbn
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 ISBN
 *      3. 이미 존재하는 독후감
 */
const postReviewBeforeService = async (
  isbn: string,
  userId: number,
  answerOne: string,
  answerTwo: string,
  questionList: string[],
  progress: number
) => {
  if (
    !isbn ||
    !userId ||
    !answerOne ||
    !answerTwo ||
    !questionList ||
    !progress
  ) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // user 확인
  const user = await User.findOne({ where: { id: userId, isDeleted: false } });

  // isbn 체킹
  let mainIsbn: string, subIsbn: string;
  let isbnList = isbn.split(" ");
  isbnList.length >= 2
    ? ([mainIsbn, subIsbn] = isbnList)
    : ([mainIsbn, subIsbn] = [isbnList[0], "-1"]);

  // book 확인
  const book = await Book.findOne({
    where: {
      [Op.or]: [
        { isbn: mainIsbn },
        { isbn: subIsbn },
        { isbnSub: mainIsbn },
        { isbnSub: subIsbn },
      ],
    },
  });

  if (!book) {
    return constant.DB_NOT_FOUND;
  }

  // 중복 review 확인
  const exist = await Review.findOne({
    where: {
      bookId: book.id,
      userId: user.id,
      isDeleted: false,
    },
  });

  if (exist) {
    return constant.VALUE_ALREADY_EXIST;
  }

  // review 확인 - 기존의 독서 전 단계가 완료된 리뷰
  const review = await Review.create({
    userId: user.id,
    bookId: book.id,
    questionList,
    answerOne,
    answerTwo,
    reviewSt: progress,
    finishSt: false,
  });

  return { reviewId: review.id };
};

/**

 *  @독서중 독서 중 작성
 *  @route POST /review/now/:reviewId
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const postReviewNowService = async (
  reviewId: number,
  userId: number,
  answerThree: JSON,
  progress: number
) => {
  if (!reviewId || !userId || !answerThree || !progress) {
    return constant.NULL_VALUE;
  }

  // user 확인
  const user = await User.findOne({ where: { id: userId, isDeleted: false } });

  // 해당 review 조회
  const review = await Review.findOne({
    where: { id: reviewId, userId: user.id, isDeleted: false },
  });

  // 2. 존재하지 않는 review
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  let finishSt = progress === 4 ? true : false;

  // 3. review update
  await review.update({
    answerThree,
    reviewSt: progress,
    finishSt,
  });

  // 변경 리뷰 저장
  await review.save();

  return { reviewId: review.id };
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
  reviewId: number,
  answerOne: string,
  answerTwo: string,
  answerThree: JSON
) => {
  if (!reviewId || !answerOne || !answerTwo || !answerThree) {
    return constant.NULL_VALUE;
  }

  const reviewToChange = await Review.findOne({
    where: { id: reviewId, isDeleted: false },
  });
  if (!reviewToChange) {
    return constant.WRONG_REQUEST_VALUE;
  }

  await Review.update(
    {
      answerOne,
      answerTwo,
      answerThree,
    },
    {
      where: { id: reviewId, isDeleted: false },
    }
  );

  return constant.SUCCESS;
};

/**
 *  @독후감 조회하기
 *  @route GET /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewService = async (userId: number, reviewId: number) => {
  // 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  const reviewToShow = await Review.findOne({
    where: {
      id: reviewId,
      userId,
      isDeleted: false,
    },
  });

  // 존재하지 않는 리뷰일 때
  if (!reviewToShow) {
    return constant.WRONG_REQUEST_VALUE;
  }

  const bookToShow = await Book.findOne({
    where: { id: reviewToShow.bookId },
  });

  return {
    bookTitle: bookToShow.title,
    answerOne: reviewToShow.answerOne,
    answerTwo: reviewToShow.answerTwo,
    questionList: reviewToShow.questionList,
    answerThree: reviewToShow.answerThree,
    reviewState: reviewToShow.reviewSt,
    finishState: reviewToShow.finishSt,
  };
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
const deleteReviewService = async (userId: number, reviewId: number) => {
  // 1. 필요한 값이 없을 때
  if (!userId || !reviewId) {
    return constant.NULL_VALUE;
  }

  // user 확인
  const user = await User.findOne({ where: { id: userId, isDeleted: false } });

  // 해당 review 조회
  const review = await Review.findOne({
    where: { id: reviewId, userId: user.id, isDeleted: false },
  });

  // 2. 존재하지 않는 review
  if (!review) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 3. 이미 삭제된 Review 입니다.
  if (review.isDeleted) {
    return constant.VALUE_ALREADY_DELETED;
  }

  // 독후감 삭제
  await review.update({
    isDeleted: true,
  });

  // 삭제 리뷰 저장
  await review.save();

  return constant.SUCCESS;
};

const reviewService = {
  getQuestionService,
  postReviewBeforeService,
  postReviewNowService,
  patchReviewService,
  getReviewService,
  deleteReviewService,
};

export default reviewService;
