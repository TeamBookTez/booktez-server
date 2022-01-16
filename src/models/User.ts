import {
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  HasMany,
} from "sequelize-typescript";

import { Review } from ".";

@Table({
  tableName: "user",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Unique
  @Column
  nickname: string;

  @Default(
    "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/defaultProfile.png"
  )
  @Column
  img: string;

  @AllowNull
  @Column
  emailCode: string;

  @AllowNull
  @Column
  token: string;

  @AllowNull(false)
  @Default(false)
  @Column
  isDeleted: boolean;

  @HasMany(() => Review)
  reviews: Review[];
}
