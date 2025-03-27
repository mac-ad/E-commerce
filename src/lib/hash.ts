import { hash as bcryptHash,compare } from "bcrypt";

export async function hashPassword(input: string): Promise<string> {
    try {
        // Use consistent salt from environment variable
        const salt = process.env.SALT_KEY;
        if (!salt) {
            throw new Error('SALT_KEY environment variable is required');
        }

        // Hash password with consistent salt
        const hashedPassword = await bcryptHash(input, 10);

        // console.log({
        //     original: input + salt,
        //     hashed: hashedPassword
        // })

        // to be fixed later
        return hashedPassword;
        // return input;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

export async function comparePassword(input: string, hashedPassword: string): Promise<boolean> {
    return await compare(input, hashedPassword);
}