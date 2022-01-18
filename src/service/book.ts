import { Op } from "sequelize";

// libraries
import constant from "../library/constant";

// models
import { Book, Review } from "../models";

/**
 *  @서재,리뷰에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   1. 필요한 값이 없을 때
 *         2. 리뷰가 이미 존재할 때
 */
const postBookService = async (
  isLogin: boolean,
  userId: number,
  isbn: string,
  thumbnail: string,
  title: string,
  author: string[],
  translator: string[],
  publicationDate: string
) => {
  if (!isbn || !title || !author || !translator || !publicationDate) {
    return constant.NULL_VALUE;
  }

  if (!isLogin) {
    return constant.ANONYMOUS_USER;
  }

  let isbnOne: string, isbnTwo: string;
  let bookExist;
  let book;

  if (/\s/.test(isbn)) {
    // isbn이 2개일 경우
    [isbnOne, isbnTwo] = isbn.split(" ");

    bookExist = await Book.findOne({
      where: {
        [Op.or]: [
          { isbn: isbnOne },
          { isbn: isbnTwo },
          { isbnSub: isbnOne },
          { isbnSub: isbnTwo },
        ],
      },
    });
  } else {
    // isbn 1개
    isbnOne = isbn;
    bookExist = await Book.findOne({
      where: {
        [Op.or]: [{ isbn: isbnOne }, { isbnSub: isbnOne }],
      },
    });
  }

  if (!bookExist) {
    book = await Book.create({
      isbn: isbnOne,
      ...(isbnTwo && { isbnSub: isbnTwo }),
      title,
      author,
      ...(thumbnail && { thumbnail }),
      translator,
      publicationDt: publicationDate,
    });
  } else {
    book = bookExist;
  }

  // review 중복 체크
  const exist = await Review.findOne({
    where: {
      bookId: book.id,
      userId,
      isDeleted: false,
    },
  });

  if (exist) {
    return constant.VALUE_ALREADY_EXIST;
  }

  // create review
  const review = await Review.create({
    userId: userId,
    bookId: book.id,
    questionList: [],
    answerOne: "",
    answerTwo: "",
    reviewSt: 2,
    finishSt: false,
  });

  return {
    isLogin,
    reviewId: review.id,
  };
};

/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookService = async (userId: number) => {
  let books = [];
  await Review.findAll({
    attributes: ["id", "reviewSt"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "thumbnail"],
      },
    ],
    where: {
      userId,
      isDeleted: false,
    },
    order: [["updatedAt", "DESC"]],
  }).then((reviews) =>
    reviews.forEach((review) => {
      books.push({
        reviewId: review.id,
        thumbnail: review.book.thumbnail,
        title: review.book.title,
        author: review.book.author,
        state: review.reviewSt,
      });
    })
  );

  return { books: books };
};

const bookService = {
  postBookService,
  getBookService,
};

export default bookService;
