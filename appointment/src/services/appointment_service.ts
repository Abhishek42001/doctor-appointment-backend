import { AppointmentRepository } from "../database";
import { AppointmentInterface } from "../utils/type_interfaces";
import {FormatData} from '../../../utils/format_response';
 
class AppointmentService{
    private appointmentRepository=new AppointmentRepository();
    async CreateAppointment(data:AppointmentInterface){
       const appointment= await this.appointmentRepository.CreateAppointment(data);
       return FormatData(appointment);
    }

    async UpdateAppointmentStatus(pk:string,status:string){
        const updatedAppointment=await this.appointmentRepository.UpdateAppointmentStatus(pk,status);
        return FormatData(updatedAppointment);
    }
}

export default AppointmentService;