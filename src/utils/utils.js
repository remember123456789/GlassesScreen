//防抖
export const debounce = (fn, delay) => {
    let timer = null

    return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...args)
            // timer = null
        }, delay)
    }
}