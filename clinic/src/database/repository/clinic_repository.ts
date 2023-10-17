import { log } from "console";
import { ClinicModel } from "..";
import { ClinicInterface } from "../../utils/type_interfaces";

class ClinicRepository{
    async CreateClinic(data:ClinicInterface){
        const clinic=await ClinicModel.create({
            name:data.name,
            latitude:data.latitude,
            longitude:data.longitude,
            phone_number:data.phone_number
        })
        return clinic;
    }

    async UpdateClinic(pk:string,data:ClinicInterface){
        const updatedClinic=await ClinicModel.update(data,{
            where:{
                id:pk
            },
            returning:true
        })
        if(updatedClinic[0]>0){
            return updatedClinic[1]
        }
        return null;
    }

    async GetClinics(){
        const allClinics=await ClinicModel.findAll()
        return allClinics;
    }

    async DeleteClinic(pk:string){
        const deletedClinic= await ClinicModel.update({
            id_deleted:false
        },{
            where:{
                id:pk
            },
            returning:true
        })
        if(deletedClinic[0]>0){
            return deletedClinic[1]
        }return null;
    }
}

export default ClinicRepository