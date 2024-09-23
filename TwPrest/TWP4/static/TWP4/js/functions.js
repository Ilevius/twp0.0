const randInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min) ) + min;
}


const randMatrix = (row, col)=>{
    const randInt = (min, max)=>{
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    let matrix = []
    for (let i = 0; i < col; i++) {
        let aRow = []
        for (let j = 0; j < row; j++) {
            let a = randInt(-5, 6)
            aRow.push(a)
        }
        matrix.push(aRow)
    }    
}


const makeTriplet = n =>{
    const triplets = [
        [1, 2, 2],
        [1, 4, 8]
    ]
    return triplets[0]
}