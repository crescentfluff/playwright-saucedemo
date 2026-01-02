export type UserAccount = {
    type: string;
    username: string;
    password: string;
    errorMessage?: string;
};

export const valid_users: UserAccount[] = [
    {
        type: 'valid',
        username: 'standard_user',
        password: 'secret_sauce'
    }
];

export const invalid_users: UserAccount[] = [
    {
        type: 'locked_out',
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMessage: 'Sorry, this user has been locked out.'
    },
    {
        type: 'invalid',
        username: 'wrong_user',
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
        username: 'standard_user',
        password: '',
        errorMessage: 'Password is required'
    }
];
