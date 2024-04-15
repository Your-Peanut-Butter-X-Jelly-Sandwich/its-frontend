interface Student {
  id: number;
  email: string;
  organisation: string;
  username: string;
  is_student: boolean;
  is_tutor: boolean;
  is_manager: boolean;
}
interface Tutor extends Student {}
interface StudentListResponse {
  user: Student[];
}
interface TutorListResponse extends StudentListResponse {}
interface StudentListRequest {}

interface PromoteStudentRequest {
  student_ids: number[];
}
interface DemoteTutorRequest {
  tutor_ids: number[];
}
interface AssignStudentRequest {
  tutor_id: number;
  student_ids: number[];
}
interface AssignStudentResponse {
  success?: [number, number][];
  error?: { pair: [number, number]; reason: string }[];
}
