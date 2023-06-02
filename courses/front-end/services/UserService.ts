import { User } from "../types";
import Fetcher from "./Fetcher";

class UserService {

    static async getAllUsers() {
        const url = (process.env.NEXT_PUBLIC_API_URL+'/users');
        const response = await Fetcher.fetchGetUrl(url);
    
        if (response.status === 401) {
          throw new Error('You are not authorized to view this page. Please login first');
        }
    
        const users = await response.json();
        return users;
      }
      
      static async loginUser(username: string, password: string): Promise<User> {
        const url = (process.env.NEXT_PUBLIC_API_URL+`/users/login`);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
          throw new Error('Incorrect username or password');
        }
        const user = await response.json();
    
        return user;
      }

      static async addUser(username: string, email: string,firstName:string, lastName:string, password: string) {
        const url = (process.env.NEXT_PUBLIC_API_URL+'/users/signup');
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email,firstName,lastName, password })
        });
        if (response.status === 500) {
          throw new Error('Username or email is already in use!');
        }
        const user = await response.json();
        console.log(user);
        return user;
      }
}

export default UserService;