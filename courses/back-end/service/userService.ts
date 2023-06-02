import { User } from '../domain/model/user';
import userDatabase from '../domain/data-access/userDatabase';
import { UserInput } from '../types/UserInput';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET;



const getAllUsers = async (): Promise<User[]> => userDatabase.getAllUsers();


const getUserByName = async (username: string): Promise<User> => {
    try {
      return await userDatabase.getUserByName(username);
    } catch (error) {
      console.error(`Error in UserService: ${error.message}`);
      throw error;
    }
  }

  const getUserById = async (userId:number ): Promise<User> => {
    try {
      return await userDatabase.getUserById(userId);
    } catch (error) {
      console.error(`Error in UserService: ${error.message}`);
      throw error;
    }
  }
  

const addUser =async ({username,firstName,lastName, email, password}: UserInput): Promise<User> => {
    const existingUser = await userDatabase.getUserByNameForRegistration(username);

    if (existingUser != null) {
      throw new Error(`User with username ${username} already exists!`)
    }

    const hashedPassword = await bcrypt.hash(password,12)

    return await userDatabase.addUser({
        username: username,
        firstName:firstName,
        lastName:lastName,
        email: email,
        password: hashedPassword,
    })
}

const authenticatie = async ({username, password}: UserInput): Promise<string> =>{
    const user = await getUserByName(username);
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        console.log("FOUT PASWOORD")
        throw new Error('Incorrect Password')
    }
    return generateJwtToken(username)
}

const generateJwtToken = (username: string): string =>{
    const option = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}`};

    try{
        return jwt.sign({username}, jwtSecret, option);
    } catch(error){
        console.log(error)
        throw new Error('Error generating JWT token')
    }
}


export default {getAllUsers,getUserByName,addUser,generateJwtToken,authenticatie,getUserById}