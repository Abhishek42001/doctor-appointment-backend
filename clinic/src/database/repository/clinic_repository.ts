import { log } from "console";
import { ClinicModel } from "..";
import { ClinicInterface } from "../../utils/type_interfaces";
import { Sequelize } from "sequelize-typescript";

class ClinicRepository {
    async CreateClinic(data: ClinicInterface) {
        const point = {
            type: "POINT",
            coordinates: [data.latitude, data.longitude]
        }
        const clinic = await ClinicModel.create({
            name: data.name,
            location: point,
            phone_number: data.phone_number
        })
        return clinic;
    }

    async UpdateClinic(pk: string, data: ClinicInterface) {
        const updatedClinic = await ClinicModel.update(data, {
            where: {
                id: pk
            },
            returning: true
        })
        if (updatedClinic[0] > 0) {
            return updatedClinic[1]
        }
        return null;
    }

    async GetClinicsNearMe(latitude: string, longitude: string) {
        // Define the radius in meters (10km = 10,000 meters)
        const radiusMeters = 100000;
        const allClinics = await ClinicModel.findAll(
            latitude&&longitude ? {
                where: 
                    Sequelize.fn("ST_DWithin",
                    Sequelize.col("location"),
                    Sequelize.fn("ST_MakePoint", latitude, longitude),
                    radiusMeters,
                    true
                )
            } : {}
            )
        return allClinics;
    }

    async DeleteClinic(pk: string) {
        const clinic = await ClinicModel.findOne(
            {
                where: { id: pk }
            }
        )
        if (!clinic) return null;
        clinic.is_deleted = true;
        const deletedModel = await clinic.save();
        return deletedModel
    }
}

export default ClinicRepository