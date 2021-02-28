/**
 * Resolve une promesse après une durée donnée
 * @param {number} duration
 */
export function wait (duration) {
    return new Promise(resolve => {
        window.setTimeout(resolve, duration)
    })
}
