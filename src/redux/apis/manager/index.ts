import { ITSApi } from '@/redux/createApi';



export const managerApi = ITSApi.injectEndpoints({
    endpoints: (builder) => ({
      getStudents: builder.query<IStudentListResponse, void>({
        query: () => ({
            url: '/students',
            method: 'GET',
        }),
      }),
    }),
  });
  
  export const { useGetStudentsQuery } = managerApi;