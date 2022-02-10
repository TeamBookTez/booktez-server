// library
import constant from "../library/constant";

// model
import { User, Book, Review } from "../models";

/**
 *  @독서중 독서 전 작성
 *  @route PATCH /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPreService = async (
  reviewId: number,
  userId: number,
  answerOne: string,
  answerTwo: string,
  questionList: string[],
  reviewSt: number
) => {
  if (
    !reviewId ||
    !userId ||
    !answerOne ||
    !answerTwo ||
    !questionList ||
    !reviewSt
  ) {
    return constant.NULL_VALUE;
  }

  // review 체크
  const review = await Review.findOne({
    where: {
      id: reviewId,
      userId,
      isDeleted: false,
    },
  });

  if (!review) {
    return constant.DB_NOT_FOUND;
  }

  // review 수정
  await review.update({
    questionList,
    answerOne,
    answerTwo,
    reviewSt,
    finishSt: false,
  });

  await review.save();

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

 *  @독서중 독서 중 작성
 *  @route PATCH /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPeriService = async (
  reviewId: number,
  userId: number,
  answerThree: object,
  reviewSt: number
) => {
  if (!reviewId || !userId || !answerThree || !reviewSt) {
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

  let finishSt = Number(reviewSt) === 4 ? true : false;

  // 3. review update
  await review.update({
    answerThree,
    reviewSt,
    finishSt,
  });

  // 변경 리뷰 저장
  await review.save();

  // 책 확인
  const book = await Book.findOne({ where: { id: review.bookId } });

  return {
    reviewId: review.id,
    bookData: {
      thumbnail: book.thumbnail,
      title: book.title,
      author: book.author,
      translator: book.translator,
      publicationDt: book.publicationDt,
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
    reviewSt: reviewToShow.reviewSt,
    finishSt: reviewToShow.finishSt,
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
const getPreReviewService = async (userId: number, reviewId: number) => {
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

  return {
    answerOne: reviewToShow.answerOne,
    answerTwo: reviewToShow.answerTwo,
    questionList: reviewToShow.questionList,
    reviewSt: reviewToShow.reviewSt,
    finishSt: reviewToShow.finishSt,
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
const getPeriReviewService = async (userId: number, reviewId: number) => {
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

  return {
    answerThree: reviewToShow.answerThree,
    reviewSt: reviewToShow.reviewSt,
    finishSt: reviewToShow.finishSt,
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
  reviewId: number,
  answerOne: string,
  answerTwo: string,
  answerThree: object
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
    where: { id: reviewId, userId: user.id },
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
  patchReviewPreService,
  getQuestionService,
  patchReviewPeriService,
  getReviewService,
  getPreReviewService,
  getPeriReviewService,
  patchReviewService,
  deleteReviewService,
};

export default reviewService;
