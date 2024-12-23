import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmploye } from "../../Types";


interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: IEmploye;
}

interface SingRequest {
    user: IEmploye;
}
interface SignResponse {
    user: IEmploye;
}

const apiUrl = import.meta.env.VITE_API_URL;
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            queryFn: async (credentials, _queryApi, _extraOptions, baseQuery) => {
                const { email, password } = credentials;
                const result = await baseQuery(`?email=${email}`);
                const users = result.data as IEmploye[];
                if (users.length === 0) {
                    return { error: { status: 404, data: "User not found" } };
                }
                const user = users[0];
                const url = "https://www.toptal.com/developers/bcrypt/api/check-password.json";
                const urlBody = new URLSearchParams();
                urlBody.append("hash", user.password);
                urlBody.append("password", password);
                try {
                    const res = await fetch(url, {
                        method: "POST",
                        body: urlBody,
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    });
                    const bcryptResult = await res.json();

                    if (!bcryptResult.ok) {
                        return { error: { status: 401, data: "Invalid password" } };
                    }
                    return {
                        data: { user }
                    };
                } catch (error) {
                    return { error: { status: 500, data: "Something went wrong" } };
                }
            },
        }),
        signUp: builder.mutation<SignResponse, SingRequest>({
            queryFn: async ({ user }, _queryApi, _extraOptions, baseQuery) => {
                try {
                    const result = await baseQuery(`?email=${user.email}`);
                    const users = result.data as IEmploye[];
                    if (users.length > 0) {
                        return { error: { data: "Email already exists", status: 401 } };
                    }
                    const signUpResponse = await baseQuery({
                        url: '',
                        method: 'POST',
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    return { data: { user: signUpResponse.data as IEmploye } };

                } catch (error) {
                    return { error: { data: "Something went wrong", status: 500 } };
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
