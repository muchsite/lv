import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmploye } from "../../Types";

interface UpdateResponse {
    user: IEmploye;
}

interface UpdateRequest {
    user: IEmploye;
}
const apiUrl = import.meta.env.VITE_API_URL;
export const updateUser = createApi({
    reducerPath: "updateUser",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
    }),
    endpoints: (builder) => ({
        updateUser: builder.mutation<UpdateResponse, UpdateRequest>({
            query: ({ user }) => ({
                url: `/${user.id}`,
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useUpdateUserMutation } = updateUser;
