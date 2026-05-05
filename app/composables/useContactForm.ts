import { contactSchema } from '#shared/types/contact'
import type { ContactFormData, ContactFormErrors, SubmitStatus } from '#shared/types/contact'

export function useContactForm() {
    // ── State ─────────────────────────────────────────────────────────────────
    const form = reactive<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const errors = reactive<ContactFormErrors>({})

    const isLoading = ref(false)
    const submitStatus = ref<SubmitStatus>('idle')

    clearErrorOnInput('name')
    clearErrorOnInput('email')
    clearErrorOnInput('subject')
    clearErrorOnInput('message')

    /**
     * Reset l'erreur d'un champ du formulaire quand il est à nouveau saisi
     * @param field - Champ à reset
     */
    function clearErrorOnInput(field: keyof ContactFormErrors) {
        watch(() => form[field], () => { errors[field] = '' })
    }

    // ── Validation ────────────────────────────────────────────────────────────
    function validate(): boolean {
        // Vide les erreurs précédentes
        Object.keys(errors).forEach((key) => {
            delete errors[key as keyof ContactFormErrors]
        })

        const result = contactSchema.safeParse(form)
        if (!result.success) {
            result.error.issues.forEach((issue: { path: (string | number | symbol)[]; message: string | undefined }) => {
                const field = issue.path[0] as keyof ContactFormErrors
                // Ne conserve que la première erreur par champ
                if (!errors[field]) {
                    errors[field] = issue.message
                }
            })
            return false
        }

        return true
    }

    // ── Submit ────────────────────────────────────────────────────────────────
    async function handleSubmit() {
        if (!validate()) return

        isLoading.value = true
        submitStatus.value = 'idle'

        try {
            await $fetch('/api/contact', {
                method: 'POST',
                body: {
                    name:    form.name,
                    email:   form.email,
                    subject: form.subject,
                    message: form.message,
                },
            })

            submitStatus.value = 'success'
            form.name = form.email = form.subject = form.message = ''

        } catch {
            submitStatus.value = 'error'
        } finally {
            isLoading.value = false
        }
    }

    return {
        form,
        errors,
        isLoading,
        submitStatus,
        handleSubmit,
    }
}