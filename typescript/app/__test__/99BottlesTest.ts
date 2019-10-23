function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function currentBottlesOfBeerFrom(bottles_number: number) {
    let currentBottlesOfBeer;
    if (bottles_number === 0) {
        currentBottlesOfBeer = `no more bottles of beer`;
    } else if (bottles_number === 1) {
        currentBottlesOfBeer = `${bottles_number} bottle of beer`;
    } else {
        currentBottlesOfBeer = `${bottles_number} bottles of beer`;
    }
    return currentBottlesOfBeer;
}

function first_period_from(bottles_number: number) {
    let currentBottlesOfBeer = currentBottlesOfBeerFrom(bottles_number);
    return capitalize(`${currentBottlesOfBeer} on the wall, ${currentBottlesOfBeer}.`);
}

function actionFor(bottles_number: number) {
    let action: string;
    if (bottles_number === 0) {
        action = `Go to the store and buy some more`;
    } else {
        action = `Take one down and pass it around`;
    }
    return action;
}

function remaining_bottles_from(bottles_number: number) {
    let remaining_bottles;
    if (bottles_number === 0) {
        remaining_bottles = `99 bottles`;
    } else if (bottles_number === 1) {
        remaining_bottles = `no more bottles`;
    } else if (bottles_number === 2) {
        remaining_bottles = `1 bottle`;
    } else {
        remaining_bottles = `${bottles_number - 1} bottles`;
    }
    return remaining_bottles;
}

function second_period_from(bottles_number: number) {
    return `${(actionFor(bottles_number))}, ${(remaining_bottles_from(bottles_number))} of beer on the wall.`;
}

function ninety_nine_bottles(bottles_number: number): string {
    return first_period_from(bottles_number) + '\n' + second_period_from(bottles_number);
}

describe('99 bottles Kata', () => {
    it('correct 99th verse', () => {
        expect(ninety_nine_bottles(99))
            .toEqual(`99 bottles of beer on the wall, 99 bottles of beer.
Take one down and pass it around, 98 bottles of beer on the wall.`);
    });

    it('correct 98th verse', () => {
        expect(ninety_nine_bottles(98))
            .toEqual(`98 bottles of beer on the wall, 98 bottles of beer.
Take one down and pass it around, 97 bottles of beer on the wall.`);
    });

    it('correct 2nd verse', () => {
        expect(ninety_nine_bottles(2))
            .toEqual(`2 bottles of beer on the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beer on the wall.`);
    });

    it('correct 1st verse', () => {
        expect(ninety_nine_bottles(1))
            .toEqual(`1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.`);
    });

    it('correct 0th verse', () => {
        expect(ninety_nine_bottles(0))
            .toEqual(`No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.`);
    });

});
