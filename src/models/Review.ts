import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";

import { User, Book } from ".";

@Table({
  tableName: "user",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
})
export default class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  //   @ForeignKey(() => Book)
  //   @Column
  //   book_id: number;

  @Column(DataType.ARRAY(DataType.STRING))
  question_list: string[];

  @Column(DataType.TEXT)
  answer_one: string;

  @Column(DataType.TEXT)
  answer_two: string;

  @Column(DataType.JSON)
  answer_three: JSON;

  @Default(2)
  @AllowNull(false)
  @Column
  review_st: number;

  @Default(false)
  @AllowNull(false)
  @Column
  finish_st: boolean;

  @AllowNull(false)
  @Default(false)
  @Column
  is_deleted: boolean;

  @BelongsTo(() => User)
  user: User;

  //   @BelongsTo(() => Review)
  //   review: Review;
}
