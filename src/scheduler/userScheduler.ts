import schedule from "node-schedule";

// models
import Review from "../models/Review";
import User from "../models/User";

// library
import { keysToSnake, keysToCamel } from "../library/convertSnakeToCamel";

export const userScan = schedule.scheduleJob("0 0 0 * * *", async () => {
  // 현재 시간
  const current = new Date(new Date(Date.now()).setUTCMinutes(0, 0, 0));
  console.log("Scanning users...[" + current + "]");

  // 삭제 예정 유저
  const deletedUsers = await User.find(keysToSnake({ isDeleted: true }));

  await Promise.all(
    deletedUsers.map(async (user) => {
      // 현재 날짜가 만료 날짜 이후
      if (current.getTime() >= user.expired_at.getTime()) {
        // 해당 유저가 가진 리뷰 모두 삭제
        const { deletedCount } = await Review.deleteMany(
          keysToSnake({ userId: user._id })
        );
        // 해당 유저 삭제
        await user.deleteOne(keysToSnake({ _id: user._id }));
        console.log("Delete Count: " + deletedCount);
      }
    })
  );
  console.log("Complete scanning...");
});
