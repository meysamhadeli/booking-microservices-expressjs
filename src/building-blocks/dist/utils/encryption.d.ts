export declare const encryptPassword: (password: string) => Promise<string>;
export declare const isPasswordMatch: (password: string, userPassword: string) => Promise<boolean>;
export declare const generateFakeJwt: () => Promise<string>;
