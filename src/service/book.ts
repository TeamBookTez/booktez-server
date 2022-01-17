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
  author: string[],
  translator: string[],
  publicationDate: string
) => {
  if (!isbn || !title || !author || !translator || !publicationDate) {
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
          { isbnSub: isbnOne },
          { isbnSub: isbnTwo },
        ],
        isDeleted: false,
      },
    });
  } else {
    // isbn 1개
    isbnOne = isbn;
    exist = await Book.findOne({
      where: {
        [Op.or]: [{ isbn: isbnOne }, { isbnSub: isbnOne }],
      },
    });
  }

  if (!exist) {
    await Book.create({
      isbn: isbnOne,
      ...(isbnTwo && { isbnSub: isbnTwo }),
      title,
      author,
      ...(thumbnail && { thumbnail }),
      translator,
      publicationDate
    });
  }

  return isLogin;
};

const bookService = {
  getBookService,
  postBookService,
};

export default bookService;
