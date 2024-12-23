import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmploye } from "../../Types";
// 
const apiUrl = import.meta.env.VITE_API_URL;
export const employesApi = createApi({
    reducerPath: "employesApi",
    baseQuery: async (args, api, extraOptions) => {
        const user = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (!user) {
            return {
                error: {
                    status: 401,
                    data: "User is not logged in",
                },
            };
        }
        const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });
        return baseQuery(args, api, extraOptions);
    },
    endpoints: (builder) => ({
        getEmployes: builder.query<IEmploye[], void>({
            query: () => ({
                url: ""
            })
        }),
        getSingleEmploy: builder.query<IEmploye, string>({
            query: (id) => ({
                url: `/${id}`
            })
        })
    })
})
export const { useGetEmployesQuery, useGetSingleEmployQuery } = employesApi;