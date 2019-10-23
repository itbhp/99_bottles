function firstPeriod(bottles_number: number) {
    return `${bottles_number} bottles of beer on the wall, ${bottles_number} bottles of beer.`;
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

function ninety_nine_bottles(bottles_number: number): string {
    let first_period;
    let second_period;

    let remaining_bottles = remaining_bottles_from(bottles_number);

    if (bottles_number === 0) {
        first_period = `No more bottles of beer on the wall, no more bottles of beer.`;
        second_period = `Go to the store and buy some more, ${remaining_bottles} of beer on the wall.`;
    } else if (bottles_number === 1) {
        first_period = `1 bottle of beer on the wall, 1 bottle of beer.`;
        second_period = `Take one down and pass it around, ${remaining_bottles} of beer on the wall.`;
    } else if (bottles_number === 2) {
        first_period = firstPeriod(bottles_number);
        second_period = `Take one down and pass it around, ${remaining_bottles} of beer on the wall.`;
    } else {
        first_period = firstPeriod(bottles_number);
        second_period = `Take one down and pass it around, ${remaining_bottles} of beer on the wall.`;
    }
    return first_period + '\n' + second_period;
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
