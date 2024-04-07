import { ITSApi } from '@/redux/createApi';



export const managerApi = ITSApi.injectEndpoints({
    endpoints: (builder) => ({
      getStudents: builder.query<IStudentListResponse, void>({
        query: () => ({
            url: '/students',
            method: 'GET',
        }),
      }),
      getTutors: builder.query<ITutorListResponse, void>({
        query: () => ({
            url: '/tutor',
            method: 'GET',
        }),
      }),
      promoteStudents: builder.mutation<void, IPromoteStudentRequest>({
        query: (student_ids) => ({
            url: '/students/promote',
            method: 'POST',
            body: student_ids,
        }),
      }),
      assignStudents: builder.mutation<IAssignStudentResponse, IAssignStudentRequest>({
        query: (params) => ({
            url: '/teaches',
            method: 'POST',
            body: params,
        }),
      }),
    }),
  });
  
  export const { useLazyGetStudentsQuery, useLazyGetTutorsQuery, usePromoteStudentsMutation, useAssignStudentsMutation } = managerApi;