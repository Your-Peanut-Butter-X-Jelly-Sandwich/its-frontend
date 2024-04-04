import { ITSApi } from '@/redux/createApi';



export const managerApi = ITSApi.injectEndpoints({
    endpoints: (builder) => ({
      getStudents: builder.query<IStudentListResponse, void>({
        query: () => ({
            url: '/students',
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
    }),
  });
  
  export const { useLazyGetStudentsQuery, usePromoteStudentsMutation } = managerApi;