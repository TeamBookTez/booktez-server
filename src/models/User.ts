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

  @Default("디폴트 이미지")
  @Column
  img: string;

  @AllowNull
  @Column
  emailCode!: string;

  @HasMany(() => Review)
  reviews: Review[];
}
