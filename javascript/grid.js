const GRID_SIZE = 50

// generates a random grid position

export const randomGridPosition = () => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

// scans to see if you are outside the grid

export const outSideGrid = (position) => {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}