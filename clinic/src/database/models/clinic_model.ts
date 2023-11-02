import { Column, Model,PrimaryKey,Table,DataType } from "sequelize-typescript";


@Table({
    tableName:"Appointment"
})
class ClinicModel extends Model{
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    id!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name!:string

    @Column({
        type:DataType.GEOMETRY("POINT"),
        allowNull:false,
    })
    location!:object

    @Column({
        type:DataType.STRING,
    })
    phone_number?:string

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false,
    })
    is_deleted!:boolean
}

export default ClinicModel;