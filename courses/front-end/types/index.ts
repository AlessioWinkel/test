export type StatusMessage = {
    message: string;
    type: "error" | "success";
};


export interface User {
    username: string
    password: string
}

export interface Lecturer {
    user: User;
    expertise: string;
}
