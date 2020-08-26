const GRID_SIZE = 51

export const randomGridPosition = () => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export const outSideGrid = () => {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.x > GRID_SIZE
    )
}