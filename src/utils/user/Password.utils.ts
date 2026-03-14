export abstract class PasswordUtils {
    public static verifyPassword(pass: string) : string[] {
        const errorsList = new Array();
        let regex;
        
        if (pass.length < 8)
            errorsList.push("Senha tem menos de 8 caracteres");

        if (pass === pass.toLowerCase())
            errorsList.push("Senha não tem caractere maíusculo");

        if (pass === pass.toUpperCase())
            errorsList.push("Senha não tem caractere minúsculo");

        regex = /[^A-Za-z0-9]/;
        if (!regex.test(pass))
            errorsList.push("Senha não tem caractere especial");

        regex = /\d/;
        if (!regex.test(pass))
            errorsList.push("Senha não tem caractere númerico");
        
        return errorsList;
    }
}