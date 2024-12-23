export interface IEmploye {
    isRemoteWork: boolean;
    user_avatar: string;
    first_name: string;
    last_name: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
    department: string;
    building: string;
    room: string;
    date_birth: {
        year: number;
        month: number;
        day: number;
    };
    desk_number: number;
    manager: {
        id: string;
        first_name: string;
        last_name: string;
    };
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
    visa: IVisa[];
    password: string;
    id: string;
    role: string;
    sub: string[];

}

interface IVisa {
    issuing_country: string;
    type: string;
    start_date: number;
    end_date: number;
}
