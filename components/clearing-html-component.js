export function clearingHtml(unsafe) {
    const clearingTag = unsafe.replace(/<[^>]*>/g, '')
    const clearingChars = clearingTag
        .replace(/&lt;/g, '')
        .replace(/\//g, '')
        .replace(/b&gt;/g, '')
        .replace(/&/g, '')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')

    return clearingChars.trim().replace(/\s+/g, ' ')
}
