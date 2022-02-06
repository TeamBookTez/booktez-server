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
  tableName: "review",
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
  userId: number;

  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @Column(DataType.ARRAY(DataType.STRING))
  questionList: string[];

  @Column(DataType.TEXT)
  answerOne: string;

  @Column(DataType.TEXT)
  answerTwo: string;

  @Column(DataType.JSON)
  answerThree: JSON;

  @Default(2)
  @AllowNull(false)
  @Column
  reviewSt: number;

  @Default(false)
  @AllowNull(false)
  @Column
  finishSt: boolean;

  @AllowNull(false)
  @Default(false)
  @Column
  isDeleted: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
