interface IStudent {
  id: number;
  email: string;
  organisation: string;
  username: string;
  is_student: boolean;
  is_tutor: boolean;
  is_manager: boolean;
}
interface ITutor extends IStudent {}
interface IStudentListResponse {
  user: IStudent[];
}
interface ITutorListResponse extends IStudentListResponse {}
interface IStudentListRequest {}

interface IPromoteStudentRequest {
  student_ids: number[];
}
interface IDemoteTutorRequest {
  tutor_ids: number[];
}
interface IAssignStudentRequest {
  tutor_id: number;
  student_ids: number[];
}
interface IAssignStudentResponse {
  message: string[];
}
