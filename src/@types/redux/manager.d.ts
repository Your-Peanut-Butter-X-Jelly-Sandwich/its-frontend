interface IStudent {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
}
interface IStudentListResponse {
    users: IStudent[];
}
interface IStudentListRequest {}