import sequelize from "sequelize";
import { Op } from "sequelize";

// libraries
import constant from "../library/constant";

// models
import { User, Book, Review } from "../models";

/**
 *  @독서중 독서 전 작성
 *  @route POST /review/before/:isbn
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
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
  const user = await User.findOne({ where: { id: userId } });

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
        { isbn_sub: mainIsbn },
        { isbn_sub: subIsbn },
      ],
    },
  });

  if (!book) {
    return -101;
  }

  // 중복 review 확인
  const exist = await Review.findOne({
    where: {
      [Op.and]: [
        { book_id: book.id },
        { user_id: user.id },
        { is_deleted: false },
      ],
    },
  });

  if (exist) {
    return constant.VALUE_ALREADY_EXIST;
  }

  // review 확인 - 기존의 독서 전 단계가 완료된 리뷰
  const review = await Review.create({
    user_id: user.id,
    book_id: book.id,
    question_list: questionList,
    answer_one: answerOne,
    answer_two: answerTwo,
    review_st: progress,
    finish_st: false,
  });

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
    where: { id: reviewId, is_deleted: false },
  });
  if (!reviewToChange) {
    return constant.WRONG_REQUEST_VALUE;
  }

  await Review.update(
    {
      answer_one: answerOne,
      answer_two: answerTwo,
      answer_three: answerThree,
    },
    {
      where: { id: reviewId },
    }
  );

  return constant.SUCCESS;
};

const reviewService = {
  postReviewBeforeService,
  patchReviewService,
};

export default reviewService;
