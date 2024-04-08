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
        url: '/tutors',
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
    demoteTutors: builder.mutation<void, IDemoteTutorRequest>({
      query: (tutor_ids) => ({
        url: '/tutors/demote',
        method: 'POST',
        body: tutor_ids,
      }),
    }),
  }),
});

export const {
  useLazyGetStudentsQuery,
  useLazyGetTutorsQuery,
  usePromoteStudentsMutation,
  useAssignStudentsMutation,
  useDemoteTutorsMutation,
} = managerApi;
