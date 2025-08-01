// API DTO
export interface LoginDTO{
    code: number,
    status: string,
    data: {
        returnedObj: [
            {
                checksum: string;
                email: string;
                companyName: string;
                mobileNumber: string;
                crNumber: string;
                roles: string[];
            }
        ]
    }
}

export interface LoginType{
    checksum: string;
    email: string;
    companyName: string;
    mobileNumber: string;
    crNumber: string;
    role: string;
}


export interface RegisterationDTO{
    code: number;
    status: string;
    data: {
        returnedObj: [
            {
                id: number;
                email: string;
                companyName: string;
                mobileNumber: string;
                registrationStatus: string;
                status: string| null;
                psuid: string;
                role: string;
            }
        ]
    }
}


export interface RegisterationType{
    id: number;
    email: string;
    companyName: string;
    mobileNumber: string;
    registrationStatus: string;
    status: string| null;
    psuid: string;
    role: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  mobileNumber: string;
  companyName: string;
  psuid: string
}

export interface LoginPayload {
    email:string;
    password: string;
}