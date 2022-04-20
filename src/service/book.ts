import mongoose from "mongoose";

// library
import constant from "../library/constant";
import {
  keysToSnake,
  keysToCamel,
  toSnakeString,
} from "../library/convertSnakeToCamel";
import { isValidObjectId } from "mongoose";

// model
import User from "../models/User";
import Review from "../models/Review";
import Book from "../models/Book";

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
  userId: string,
  isbn: string,
  thumbnail: string,
  title: string,
  author: string[],
  translator: string[],
  publicationDt: string
) => {
  if (!isbn || !title || !author || !translator || !publicationDt) {
    return constant.NULL_VALUE;
  }

  isbn = isbn.trim();

  if (!isLogin) {
    return constant.ANONYMOUS_USER;
  }

  let isbnOne: string, isbnTwo: string;
  let bookExist;
  let book;

  if (/\s/.test(isbn)) {
    // isbn이 2개일 경우
    [isbnOne, isbnTwo] = isbn.split(" ");

    bookExist = await Book.exists({
      $or: [
        { isbn: isbnOne },
        { isbn: isbnTwo },
        keysToSnake({ isbnSub: isbnOne }),
        keysToSnake({ isbnSub: isbnTwo }),
      ],
    });
  } else {
    // isbn 1개
    isbnOne = isbn;
    bookExist = await Book.exists({
      $or: [{ isbn: isbnOne }, keysToSnake({ isbnSub: isbnOne })],
    });
  }

  if (!bookExist) {
    book = await Book.create(
      keysToSnake({
        isbn: isbnOne,
        ...(isbnTwo && { isbnSub: isbnTwo }),
        title,
        author,
        ...(thumbnail && { thumbnail }),
        translator,
        publicationDt,
      })
    );
  } else {
    book = bookExist;
  }

  // review 중복 체크
  const exist = await Review.findOne(
    keysToSnake({
      bookId: book._id,
      userId,
      isDeleted: false,
    })
  );
  if (exist) {
    return constant.VALUE_ALREADY_EXIST;
  }

  // create review
  const review = await Review.create(
    keysToSnake({
      userId,
      bookId: book,
      reviewSt: 2,
      finishSt: false,
    })
  );

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
const getBookService = async (userId: string) => {
  const reviews = await Review.find(
    keysToSnake({
      userId,
      isDeleted: false,
    }),
    keysToSnake({ _id: true, bookId: true, reviewSt: true })
  ).sort(keysToSnake({ updatedAt: -1 }));

  const books = await Promise.all(
    reviews.map(async (review) => {
      // snake to camel
      const originReview = keysToCamel(review);
      const camelReview = keysToCamel(originReview.Doc);

      const findBook = await Book.findById(camelReview.bookId);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: camelReview.reviewSt,
      };

      return book;
    })
  );

  return { books: books };
};

/**
 *  @서재  독서전 책 조회
 *  @route GET /book/pre
 *  @access private
 */
const getBookPreService = async (userId: string) => {
  const reviews = await Review.find(
    keysToSnake({
      userId,
      isDeleted: false,
      reviewSt: 2,
    }),
    keysToSnake({ _id: true, bookId: true, reviewSt: true })
  ).sort(keysToSnake({ updatedAt: -1 }));

  const books = await Promise.all(
    reviews.map(async (review) => {
      // snake to camel
      const originReview = keysToCamel(review);
      const camelReview = keysToCamel(originReview.Doc);

      const findBook = await Book.findById(camelReview.bookId);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: camelReview.reviewSt,
      };

      return book;
    })
  );
  return { books: books };
};

/**
 *  @서재 독서중 책 조회
 *  @route GET /book/peri
 *  @access private
 */
const getBookPeriService = async (userId: string) => {
  const reviews = await Review.find(
    keysToSnake({
      userId,
      isDeleted: false,
      reviewSt: 3,
    }),
    keysToSnake({ _id: true, bookId: true, reviewSt: true })
  ).sort(keysToSnake({ updatedAt: -1 }));

  const books = await Promise.all(
    reviews.map(async (review) => {
      // snake to camel
      const originReview = keysToCamel(review);
      const camelReview = keysToCamel(originReview.Doc);

      const findBook = await Book.findById(camelReview.bookId);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: camelReview.reviewSt,
      };

      return book;
    })
  );
  return { books: books };
};

/**
 *  @서재 독서완료 책 조회
 *  @route GET /book/post
 *  @access private
 */
const getBookPostService = async (userId: string) => {
  const reviews = await Review.find(
    keysToSnake({
      userId,
      isDeleted: false,
      reviewSt: 4,
      finishSt: true,
    }),
    keysToSnake({ _id: true, bookId: true, reviewSt: true })
  ).sort(keysToSnake({ updatedAt: -1 }));

  const books = await Promise.all(
    reviews.map(async (review) => {
      // snake to camel
      const originReview = keysToCamel(review);
      const camelReview = keysToCamel(originReview.Doc);

      const findBook = await Book.findById(camelReview.bookId);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: camelReview.reviewSt,
      };

      return book;
    })
  );
  return { books: books };
};

/**
 * @서재 중복검사
 * @route GET /book/exist/:isbn
 * @access private
 */
// TODO: 책 검사하는 과정에서 isbn이 2개 들어오는지 클라랑 이야기해보기
// TODO: isbn 형식값 검사 필요 고민
const getBookExistService = async (userId: string, isbn: string) => {
  // 필요한 값이 없는 경우
  if (!userId || !isbn) {
    return constant.NULL_VALUE;
  }

  const reviews = await Review.find(
    keysToSnake({
      userId,
      isDeleted: false,
    })
  ).populate(toSnakeString("bookId"));

  const existReview = reviews.filter((review) => {
    if (review.book_id.isbn === isbn || review.book_id.isbn_sub === isbn) {
      return review;
    }
  });

  if (existReview.length > 0) {
    return constant.VALUE_ALREADY_EXIST;
  }

  return constant.SUCCESS;
};

const bookService = {
  postBookService,
  getBookService,
  getBookPreService,
  getBookPeriService,
  getBookPostService,
  getBookExistService,
};

export default bookService;
