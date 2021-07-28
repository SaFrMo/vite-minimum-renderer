export const normalizeContainer = (
    container: Element | ShadowRoot | string
): Element | null => {
    if (typeof container === 'string') {
        return document.querySelector(container)
    }
    return container as any
}