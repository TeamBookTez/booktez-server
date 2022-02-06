import dotenv from "dotenv";
dotenv.config();

import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Review } from ".";

@Table({
  tableName: "book",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
})
export default class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  isbn: string;

  @Unique
  @Column
  isbnSub: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  author: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  translator: string[];

  @AllowNull(false)
  @Default(process.env.DEFAULT_BOOK_IMG)
  @Column
  thumbnail: string;

  @Column
  publicationDt: string;

  @HasMany(() => Review)
  reviews: Review[];
}
