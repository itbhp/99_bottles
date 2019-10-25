import {Option, some, none, fold, getFirstMonoid} from 'fp-ts/lib/Option';
import {Monoid} from 'fp-ts/lib/Monoid';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function zero_bottles_currently(bottles_number: number): Option<string> {
    if (bottles_number === 0) {
        return some(`no more bottles of beer`);
    } else {
        return none;
    }
}

function one_bottle_currently(bottles_number: number): Option<string> {
    if (bottles_number === 1) {
        return some(`${bottles_number} bottle of beer`);
    } else {
        return none;
    }
}

const monoidAnyOnOption: Monoid<Option<string>> = getFirstMonoid();

function currentBottlesOfBeerFrom(n: number): string {
    let onNone = () => `${n} bottles of beer`;
    let onSome = s => s;
    return fold(onNone, onSome)(
        [zero_bottles_currently, one_bottle_currently]
            .map(f => f(n))
            .reduce(monoidAnyOnOption.concat)
    );
}

function compose<A, B, C>(f: (A) => B, g: (B) => C) {
    return (a: A) => g(f(a));
}

function first_period_from(bottles_number: number): string {
    const template: (s: string) => string = (currentBottlesOfBeer: string) =>
        `${currentBottlesOfBeer} on the wall, ${currentBottlesOfBeer}.`;
    let firstPeriod = compose(currentBottlesOfBeerFrom, template);
    return compose(firstPeriod, capitalize)(bottles_number);
}

function actionFor(bottles_number: number): string {
    let action: string;
    if (bottles_number === 0) {
        action = `Go to the store and buy some more`;
    } else {
        action = `Take one down and pass it around`;
    }
    return action;
}

function remaining_bottles_from(bottles_number: number): string {
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

function second_period_from(bottles_number: number): string {
    return `${(actionFor(bottles_number))}, ${(remaining_bottles_from(bottles_number))} of beer on the wall.`;
}

function ninety_nine_bottles(n: number): string {
    return [first_period_from, second_period_from].map(f => f(n)).join('\n');
}

describe('99 bottles Kata', () => {
    it('should produce the right 99th verse', () => {
        expect(ninety_nine_bottles(99))
            .toEqual(`99 bottles of beer on the wall, 99 bottles of beer.
Take one down and pass it around, 98 bottles of beer on the wall.`);
    });

    it('should produce the right 98th verse', () => {
        expect(ninety_nine_bottles(98))
            .toEqual(`98 bottles of beer on the wall, 98 bottles of beer.
Take one down and pass it around, 97 bottles of beer on the wall.`);
    });

    it('should produce the right 2nd verse', () => {
        expect(ninety_nine_bottles(2))
            .toEqual(`2 bottles of beer on the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beer on the wall.`);
    });

    it('should produce the right 1st verse', () => {
        expect(ninety_nine_bottles(1))
            .toEqual(`1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.`);
    });

    it('should produce the right 0th verse', () => {
        expect(ninety_nine_bottles(0))
            .toEqual(`No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.`);
    });

});
