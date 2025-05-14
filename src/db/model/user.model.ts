import { Table, Column, Model, DataType } from "sequelize-typescript";

interface UserAttributes {
  id?: number;
  name: string;
  age: number;
  address?: object;
  additional_info?: object;
}

@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model<UserAttributes, UserAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age!: number;

  @Column({ type: DataType.JSONB, allowNull: true })
  address?: object;

  @Column({ type: DataType.JSONB, allowNull: true })
  additional_info?: object;
}
