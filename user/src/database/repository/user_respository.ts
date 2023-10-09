import {UserModel} from '../models'
import { UserInterFace } from '../../utils/type_interfaces';


class UserRepository{
    async CreateUser(body:UserInterFace){
        const user=await UserModel.create({
            email:body.email,
            name:body.name,
            password:body.password,
            role:body.role,
            salt:body.salt
        });
        user.password=undefined;
        return user;
    }
    async FindUserByEmail(email:string){
        const existingUser=await UserModel.findOne({
           where: {email:email}
        })
        return existingUser;
    }

    async FindUserByPk(id:string){
        const user=await UserModel.findByPk(id);
        return user;
    }

    async UpdateUser(body:UserInterFace,id:string){
        const [,updatedUser]=await UserModel.update({
            email:body.email,
            name:body.name,
            password:body.password,
            is_deleted:body.is_deleted,
            role:body.role
        },{
            where:{
                id:id
            },
            returning:true
        })
        return updatedUser
    }


}

export default UserRepository