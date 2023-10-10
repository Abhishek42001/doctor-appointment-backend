import { Column, DataType, ForeignKey, Model,Table } from "sequelize-typescript";
import UserModel from '../../../../user/src/database/models/user_model';

@Table({
    tableName:"Appointment"
})
class AppointmentModel extends Model{
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
        defaultValue:DataType.UUIDV4
    })
    id!:string

    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
    })
    doctor_id!:string

    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.UUIDV4,
        allowNull:false,
    })
    patient_id!:string

    // @Column({
    //     type:DataType.UUIDV4,
    //     allowNull:false
    // })
    // clinic_id!:string
    
}