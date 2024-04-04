interface IStudent {
    id:number;
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
}
interface IStudentListResponse {
    user: IStudent[];
}
interface IStudentListRequest {}

interface IPromoteStudentRequest{
    student_ids: number[];
}
interface IPromoteStudentResponse {
    data: {
        [key: string]: string;
    };
}