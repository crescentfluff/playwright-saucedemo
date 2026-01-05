import { userCredentials } from "@utils/config";

export type UserAccount = {
    type: string;
    username: string;
    password: string;
    errorMessage?: string;
};

export const valid_users: UserAccount[] = [
    {
        type: 'valid',
        username: userCredentials.validUser,
        password: userCredentials.password
    }
];

export const invalid_users: UserAccount[] = [
    {
        type: 'locked_out',
        username: userCredentials.lockedOutUser,
        password: userCredentials.password,
        errorMessage: 'Sorry, this user has been locked out.'
    },
    {
        type: 'invalid',
        username: userCredentials.invalidUser,
        password: 'wrong_password',
        errorMessage: 'Username and password do not match any user in this service'
    },
    {
        type: 'empty',
        username: '',
        password: '',
        errorMessage: 'Username is required'
    },
    {
        type: 'empty password',
        username: userCredentials.validUser,
        password: '',
        errorMessage: 'Password is required'
    }
];
