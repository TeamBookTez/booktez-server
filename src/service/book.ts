// models
import { Book, Review } from "../models";

/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookService = async (userId: number) => {
  let resData = [];
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
      resData.push({
        thumbnail: review.book.thumbnail,
        title: review.book.title,
        author: review.book.author,
        state: review.review_st,
      });
    })
  );

  return resData;
};

const bookService = {
  getBookService,
};

export default bookService;
