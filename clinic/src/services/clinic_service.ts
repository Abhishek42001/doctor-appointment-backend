import { ClinicRepository } from "../database";
import { ClinicInterface } from "../utils/type_interfaces";
import {FormatData} from '../../../utils/format_response';
import {NotFoundError} from '../../../utils/error_handling/app_error';

class ClinicService{
    private  repository=new ClinicRepository();
    async createClinic(body:ClinicInterface){
        const data=await this.repository.CreateClinic(body)
        return FormatData(data);
    }
    async getAllClinicsNearMe(latitude:string|undefined|null,longitude:string|undefined|null){
        const data=await this.repository.GetClinicsNearMe(latitude,longitude);
        return FormatData(data);
    }
    async updateClinic(pk:string,data:ClinicInterface){
        const result=await this.repository.UpdateClinic(pk,data)
        if(result==null){
            throw new NotFoundError("could not find clinic to update with provided id");
        }
        return FormatData(result);
    }
    async deleteClinic(pk:string){
        const data=await this.repository.DeleteClinic(pk)
        console.log(data);
        return FormatData(data);
    }
    
}

export default ClinicService