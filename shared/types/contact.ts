import { z } from 'zod';

// ── Schéma Zod ────────────────────────────────────────────────────────────────
export const contactSchema = z.object({
    name: z
        .string()
        .min(1, 'Le nom est requis.')
        .max(100, 'Le nom ne peut pas dépasser 100 caractères.'),

    email: z
        .string()
        .min(1, "L'email est requis.")
        .email('Adresse email invalide.'),

    subject: z
        .string()
        .min(1, 'Le sujet est requis.')
        .max(200, 'Le sujet ne peut pas dépasser 200 caractères.'),

    message: z
        .string()
        .min(10, 'Le message doit faire au moins 10 caractères.')
        .max(5000, 'Le message ne peut pas dépasser 5000 caractères.'),
})

// ── Types dérivés ─────────────────────────────────────────────────────────────
export type ContactFormData = z.infer<typeof contactSchema>

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export type SubmitStatus = 'idle' | 'success' | 'error'