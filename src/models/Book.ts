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
} from "sequelize-typescript";

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
  isbn_sub: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  author: string[];

  @AllowNull(false)
  @Default(
    "https://o2-server.s3.ap-northeast-2.amazonaws.com/default_O2_Logo%403x.png"
  )
  @Column
  thumbnail: string;
}
