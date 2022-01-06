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
} from "sequelize-typescript";

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

  @Column
  email: string;

  @Column
  password: string;

  @Default(
    "https://o2-server.s3.ap-northeast-2.amazonaws.com/default_O2_Logo%403x.png"
  )
  @Column
  img: string;

  @Column
  nickname: string;

  @AllowNull
  @Column
  emailCode!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
