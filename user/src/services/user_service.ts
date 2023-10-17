import UserRepository from "../database/repository/user_respository";
import { GenerateHashedPassowrd, GenerateSalt, GenerateSignature, ValidatePassowrd, } from "../utils";
import { AlreadyExistError, AuthorizeError, NotFoundError } from "../../../utils/error_handling/app_error";
import { LoginInterface, UserInterFace } from "../utils/type_interfaces";
import {FormatData} from '../../../utils/format_response';

class UserService {
    private repository: UserRepository;
    
    constructor() {
        this.repository = new UserRepository();
    }

    async SignIn(body: LoginInterface) {
        const existingUser = await this.repository.FindUserByEmail(body.email)
        if (existingUser) {
            const isPasswordValid = await ValidatePassowrd(body.password, existingUser.password, existingUser.salt);
            if (isPasswordValid) {
                const token= GenerateSignature({email:existingUser.email,_id:existingUser.id});
                return FormatData({token})
            }else{
                console.log("here",body.password,existingUser)
                throw new AuthorizeError('Invalid credentials');
            }
        }else{
            throw new AuthorizeError('Invalid credentials');
        }
    }

    async SignUp(data:UserInterFace){
       const isUserExist=await this.repository.FindUserByEmail(data.email);
       
       if(!isUserExist){
            const salt=await GenerateSalt()
            const hashedPassword=await GenerateHashedPassowrd(data.password,salt)
            const user=await this.repository.CreateUser({
                ...data,salt,password:hashedPassword
            })
            return FormatData(user)
       }
       throw new AlreadyExistError("User already exist");
    }

    async GetProfile(id:string){
        const data=await this.repository.FindUserByPk(id);
        if(data)
        return FormatData(data)
        else{
            throw new NotFoundError("User not found")
        }
    }

    //implemente updateuser
    // async UpdateUser(data){
    //     const updatedUser=await this.repository.UpdateUser()
    // }
}

export default UserService