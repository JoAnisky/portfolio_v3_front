export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    await $fetch(`${config.apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json',
        },
        body,
    })

    return { success: true }
})