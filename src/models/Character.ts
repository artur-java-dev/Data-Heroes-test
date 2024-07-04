import {
  AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table
} from "sequelize-typescript"


@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'characters_artur_jsts',
})
export class Character extends Model {


  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number


  @AllowNull(false)
  @Column(DataType.TEXT)
  declare name: string


  @AllowNull(false)
  @Column(DataType.JSONB)
  declare data: object

}
