import { Column, DataType, ForeignKey, Model,PrimaryKey,Table } from "sequelize-typescript";
import UserModel from '../../../../user/src/database/models/user_model';


const status=Object.freeze({
    pending:'pending',
    completed:'completed',
    cancelled:'cancelled'
})

@Table({
    tableName:"Appointment"
})
class AppointmentModel extends Model{
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    id!:string

    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.UUID,
        allowNull:false,
    })
    doctor_id!:string

    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.UUID,
        allowNull:false,
    })
    patient_id!:string

    // @Column({
    //     type:DataType.UUIDV4,
    //     allowNull:false
    // })
    // clinic_id!:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    appointment_datetime!:number

    @Column({
        defaultValue:"pending",
        type:DataType.ENUM(...Object.values(status))
    })
    status?:string

    @Column({
        defaultValue:false,
        type:DataType.BOOLEAN
    })
    is_deleted!:boolean


    public toJSON() {
        return {
            id:this.id,
            doctor_id:this.doctor_id,
            patient_id:this.patient_id,
            appointment_datetime:this.appointment_datetime,
            status:this.status,
            is_deleted:this.is_deleted
        }
    }
    
}

export default AppointmentModel;