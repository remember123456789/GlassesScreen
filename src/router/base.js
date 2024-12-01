let map = new Map([
    [0, '/main/home'],
    [1, '/main/dataImport'],
    [2, '/main'],
])

export const getRouterPath = (index) => {
    const path = map.get(Number(index))
    if (!path) {
        console.log('path not found')
        return
    }
    return path
}