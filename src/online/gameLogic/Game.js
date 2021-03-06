import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()
export const gameSubject = new BehaviorSubject()

export function initGame() {
    updateGame()
}

export function resetGame(whoReset) {
    alert(`${whoReset} reset the Game.`)
    chess.reset()
    updateGame()
}

export function handleMove(from, to) {
    // console.log(chess.board())
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion) // checking all possible moves, verbose true means we are converting it to array
    // console.table(promotions)
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }   //why we can't promote right away??? => we need to check first to which we promote
        updateGame(pendingPromotion)  //yeh hi check krlenga, promotion ko, aur result ko bhi
    }
    const { pendingPromotion } = gameSubject.getValue()
    if (!pendingPromotion) {
        move({from, to})
    }
}


export function move(tempMove) {
    // promotion parameter is extra if you want to avoid promotion
    const legalMove = chess.move(tempMove)
    if (legalMove) {
        updateGame()
    }
}

export function handleMovePieces(positionObject) {
    handleMove(positionObject.from, positionObject.to)
}

// optional parameter hai yei pendingPromotion wala!
function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null,
        isChecked: chess.in_check()
    }

    gameSubject.next(newGame)
}
function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}