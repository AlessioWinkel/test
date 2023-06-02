import { LecturerInput } from "../types/LecturerInput";
import lecturerDatabase from "../domain/data-access/lecturerDatabase";
import userDatabase from "../domain/data-access/userDatabase";
import { Lecturer } from "../domain/model/lecturer";



class LecturerService {

  static addLecturer = async (lecturerData: {
    userId: number;
    expertise: string;
  }): Promise<Lecturer> => {
    try {
      const lecturer = await lecturerDatabase.addLecturer(lecturerData);
      return lecturer;
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  };

  
  static getAllLecturers = async (): Promise<Lecturer[]> => lecturerDatabase.getAllLecturers();


}



export default LecturerService;

