import { ITSApi } from '@/redux/createApi';

export const tutorApi = ITSApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ITutorGetQuestionResponse, void>({
      query: () => ({
        url: '/tutor/dashboard-stats',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = tutorApi;
