import studentDatabase from "../domain/data-access/studentDatabase";
import { Student } from "../domain/model/student";


class StudentService {

    static addStudent = async (studentData: {
      study: string;
      userId:number;
    }): Promise<Student> => {
      try {
        const student = await studentDatabase.addStudent(studentData);
        return student;
      } catch (error) {
        console.error(error);
        throw new Error('DB Error');
      }
    };
  
    
    static getAllStudents = async (): Promise<Student[]> => studentDatabase.getAllStudents();
  
  }
  
  
  
  export default StudentService;
  