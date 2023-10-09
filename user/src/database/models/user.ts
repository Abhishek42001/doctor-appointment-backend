import { Column, Model, Table,DataType, PrimaryKey, IsUUID, Default} from "sequelize-typescript";

@Table({
  tableName:"User"
})
class UserModel extends Model {
  @PrimaryKey
  @Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4
  })
  id!:string

  @Column({
    allowNull:false
  })
  name!:string

  @Column({
    allowNull:false
  })
  email!:string

  @Column({
    allowNull:false,
    type:DataType.STRING(64)
  })
  password!:string

  @Column({
    allowNull:false,
    type:DataType.STRING(64)
  })
  salt!:string

  @Column({
    type:DataType.ENUM('doctor','patient'),
    allowNull:false,
  })
  role!:string

  @Default(false)
  @Column({
    type:DataType.BOOLEAN
  })
  is_deleted:boolean

  public toJSON(): object  {
      return {
        id:this.id,
        name:this.name,
        role:this.role,
        email:this.email,
        is_deleted:this.is_deleted,
        updatedAt:this.updatedAt,
        createdAt:this.createdAt
      }
  }
}


export default UserModel