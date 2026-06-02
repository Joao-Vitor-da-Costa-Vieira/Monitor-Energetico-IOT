import CryptoJS from 'crypto-js';

export abstract class EncryptionUtils {
    /**
     * Encrypt
     */

    public static encryptHash(data: string) : string {
        const encryptedText = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex)
        return encryptedText;
    }
}