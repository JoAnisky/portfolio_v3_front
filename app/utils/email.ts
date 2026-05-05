/**
 * Décode une chaîne Base64 (utilisé pour masquer les emails des bots)
 */
export const decodeEmail = (encoded: string): string => {
    try {
        return atob(encoded);
    } catch (e) {
        console.error("Erreur de décodage email", e);
        return "";
    }
};

/**
 * Ouvre le client mail par défaut
 */
export const openMailer = (email: string): void => {
    if (email) {
        window.location.href = `mailto:${email}`;
    }
};