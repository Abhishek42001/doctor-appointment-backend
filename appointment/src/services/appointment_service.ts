import { AppointmentRepository } from "../database";
import { AppointmentInterface } from "../utils/type_interfaces";
import {FormatData} from '../../../utils/format_response';
 
class AppointmentService{
    private appointmentRepository=new AppointmentRepository();
    async CreateAppointment(data:AppointmentInterface,id:string){
       const appointment= await this.appointmentRepository.CreateAppointment(data,id);
       return FormatData(appointment);
    }

    async UpdateAppointmentStatus(pk:string,status:string){
        const updatedAppointment=await this.appointmentRepository.UpdateAppointmentStatus(pk,status);
        return FormatData(updatedAppointment);
    }
    async GetAllAppointmentsOfCustomer(customerId:string){
        const appointments=await this.appointmentRepository.GetAppointmentsByCustomerId(customerId);
        return FormatData(appointments);
    }
    async GetAllAppointmentsOfDoctor(doctor_id:string){
        const appointments=await this.appointmentRepository.GetAppointmentsByDoctorId(doctor_id);
        return FormatData(appointments);
    }
}

export default AppointmentService;