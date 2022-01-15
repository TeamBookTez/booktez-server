import { Op } from "sequelize";

// libraries
import constant from "../library/constant";

// models
import { Book, Review } from "../models";

/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookService = async (userId: number) => {
  let books = [];
  await Review.findAll({
    attributes: ["review_st"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "thumbnail"],
      },
    ],
    where: {
      user_id: userId,
    },
    order: [["updated_at", "DESC"]],
  }).then((reviews) =>
    reviews.forEach((review) => {
      books.push({
        thumbnail: review.book.thumbnail,
        title: review.book.title,
        author: review.book.author,
        state: review.review_st,
      });
    })
  );

  return { books: books };
};

/**
 *  @서재에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   필요한 값이 없을 때
 */
const postBookService = async (
  isLogin: boolean,
  isbn: string,
  thumbnail: string,
  title: string,
  author: string[]
) => {
  if (!isbn || !title || !author) {
    return constant.NULL_VALUE;
  }

  let isbnOne: string, isbnTwo: string;
  let exist;

  if (/\s/.test(isbn)) {
    // isbn이 2개일 경우
    [isbnOne, isbnTwo] = isbn.split(" ");

    exist = await Book.findOne({
      where: {
        [Op.or]: [
          { isbn: isbnOne },
          { isbn: isbnTwo },
          { isbn_sub: isbnOne },
          { isbn_sub: isbnTwo },
        ],
      },
    });
  } else {
    // isbn 1개
    isbnOne = isbn;
    exist = await Book.findOne({
      where: {
        [Op.or]: [{ isbn: isbnOne }, { isbn_sub: isbnOne }],
      },
    });
  }

  if (!exist) {
    Book.create({
      isbn: isbnOne,
      ...(isbnTwo && { isbn_sub: isbnTwo }),
      title,
      author,
      ...(thumbnail && { thumbnail }),
    });
  }

  return isLogin;
};

const bookService = {
  getBookService,
  postBookService,
};

export default bookService;
