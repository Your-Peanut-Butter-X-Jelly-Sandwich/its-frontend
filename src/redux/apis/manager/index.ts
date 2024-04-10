import { ITSApi } from '@/redux/createApi';

export const managerApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<StudentListResponse, void>({
      query: () => ({
        url: '/students',
        method: 'GET',
      }),
    }),
    getTutors: builder.query<TutorListResponse, void>({
      query: () => ({
        url: '/tutors',
        method: 'GET',
      }),
    }),
    promoteStudents: builder.mutation<void, PromoteStudentRequest>({
      query: (student_ids) => ({
        url: '/students/promote',
        method: 'POST',
        body: student_ids,
      }),
    }),
    assignStudents: builder.mutation<AssignStudentResponse, AssignStudentRequest>({
      query: (params) => ({
        url: '/teaches',
        method: 'POST',
        body: params,
      }),
    }),
    demoteTutors: builder.mutation<void, DemoteTutorRequest>({
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
