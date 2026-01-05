export const userCredentials = {
    validUser: process.env.VALID_USER || '',
    lockedOutUser: process.env.LOCKED_OUT_USER || '',
    invalidUser: process.env.INVALID_USER || '',
    password: process.env.PASSWORD || '',
};

export const baseUrl = process.env.BASE_URL || '';

export const sampleProductNames = {
    multiProductName: process.env.MULTI_PRODUCT_NAME || '',
    singleProductName: process.env.SINGLE_PRODUCT_NAME || ''
}