// library
import constant from "../library/constant";

// model
import User from "../models/User";
import Review from "../models/Review";
import Book from "../models/Book";

// /**
//  *  @서재,리뷰에 책 추가하기
//  *  @route POST /book
//  *  @access public
//  *  @access private
//  *  @err   1. 필요한 값이 없을 때
//  *         2. 리뷰가 이미 존재할 때
//  */
// const postBookService = async (
//   isLogin: boolean,
//   userId: number,
//   isbn: string,
//   thumbnail: string,
//   title: string,
//   author: string[],
//   translator: string[],
//   publicationDt: string
// ) => {
//   if (!isbn || !title || !author || !translator || !publicationDt) {
//     return constant.NULL_VALUE;
//   }

//   isbn = isbn.trim();

//   if (!isLogin) {
//     return constant.ANONYMOUS_USER;
//   }

//   let isbnOne: string, isbnTwo: string;
//   let bookExist;
//   let book;

//   if (/\s/.test(isbn)) {
//     // isbn이 2개일 경우
//     [isbnOne, isbnTwo] = isbn.split(" ");

//     bookExist = await Book.findOne({
//       where: {
//         [Op.or]: [
//           { isbn: isbnOne },
//           { isbn: isbnTwo },
//           { isbnSub: isbnOne },
//           { isbnSub: isbnTwo },
//         ],
//       },
//     });
//   } else {
//     // isbn 1개
//     isbnOne = isbn;
//     bookExist = await Book.findOne({
//       where: {
//         [Op.or]: [{ isbn: isbnOne }, { isbnSub: isbnOne }],
//       },
//     });
//   }

//   if (!bookExist) {
//     book = await Book.create({
//       isbn: isbnOne,
//       ...(isbnTwo && { isbnSub: isbnTwo }),
//       title,
//       author,
//       ...(thumbnail && { thumbnail }),
//       translator,
//       publicationDt,
//     });
//   } else {
//     book = bookExist;
//   }

//   // review 중복 체크
//   const exist = await Review.findOne({
//     where: {
//       bookId: book.id,
//       userId,
//       isDeleted: false,
//     },
//   });

//   if (exist) {
//     return constant.VALUE_ALREADY_EXIST;
//   }

//   // create review
//   const review = await Review.create({
//     userId: userId,
//     bookId: book.id,
//     questionList: [],
//     answerOne: "",
//     answerTwo: "",
//     reviewSt: 2,
//     finishSt: false,
//   });

//   return {
//     isLogin,
//     reviewId: review.id,
//   };
// };

// /**
//  *  @서재 책 조회
//  *  @route GET /book
//  *  @access private
//  */
// const getBookService = async (userId: number) => {
//   let books = [];
//   await Review.findAll({
//     attributes: ["id", "reviewSt"],
//     include: [
//       {
//         model: Book,
//         attributes: ["title", "author", "thumbnail"],
//       },
//     ],
//     where: {
//       userId,
//       isDeleted: false,
//     },
//     order: [["updatedAt", "DESC"]],
//   }).then((reviews) =>
//     reviews.forEach((review) => {
//       books.push({
//         reviewId: review.id,
//         thumbnail: review.book.thumbnail,
//         title: review.book.title,
//         author: review.book.author,
//         reviewSt: review.reviewSt,
//       });
//     })
//   );

//   return { books: books };
// };

/**
 *  @서재  독서전 책 조회
 *  @route GET /book/pre
 *  @access private
 */
const getBookPreService = async (userId: string) => {
  const reviews = await Review.find(
    {
      user_id: userId,
      is_deleted: false,
      review_st: 2,
    },
    { _id: true, book_id: true, review_st: true, __v: false }
  ).sort({ updated_at: -1 });

  const books = await Promise.all(
    reviews.map(async function (review) {
      const findBook = await Book.findById(review.book_id);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: review.review_st,
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
    {
      user_id: userId,
      is_deleted: false,
      review_st: 3,
    },
    { _id: true, book_id: true, review_st: true, __v: false }
  ).sort({ updated_at: -1 });

  const books = await Promise.all(
    reviews.map(async function (review) {
      const findBook = await Book.findById(review.book_id);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: review.review_st,
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
const getBookPostService = async (userId: number) => {
  const reviews = await Review.find(
    {
      user_id: userId,
      is_deleted: false,
      review_st: 3,
    },
    { _id: true, book_id: true, review_st: true, __v: false }
  ).sort({ updated_at: -1 });

  const books = await Promise.all(
    reviews.map(async function (review) {
      const findBook = await Book.findById(review.book_id);
      const book = {
        reviewId: review.id,
        thumbnail: findBook.thumbnail,
        title: findBook.title,
        author: findBook.author,
        reviewSt: review.review_st,
      };

      return book;
    })
  );
  return { books: books };
};

const bookService = {
  // postBookService,
  // getBookService,
  getBookPreService,
  getBookPeriService,
  getBookPostService,
};

export default bookService;
