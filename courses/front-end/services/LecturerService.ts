import Fetcher from "./Fetcher";

class LecturerService {
    static async getAllLecturers() {
        const url = (process.env.NEXT_PUBLIC_API_URL+'/lecturers');
        const response = await Fetcher.fetchGetUrl(url);
    
        if (response.status === 401) {
          throw new Error('You are not authorized to view this page. Please login first');
        }
    
        const users = await response.json();
        return users;
      }
      
}

export default LecturerService;