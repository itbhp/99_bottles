import {fold, getFirstMonoid, none, Option, some} from 'fp-ts/lib/Option';
import {Monoid} from 'fp-ts/lib/Monoid';

const monoidAnyOnOption: Monoid<Option<string>> = getFirstMonoid();

function compose<A, B, C>(f: (A) => B, g: (B) => C) {
    return (a: A) => g(f(a));

}
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);

}

function currentBottlesOfBeerFrom(n: number): string {
    let onZeroBottles = (num: number) => num == 0 ?  some(`no more bottles of beer`) : none;
    let onOneBottle = (num: number) => num == 1 ?  some(`1 bottle of beer`) : none;
    let edgeCases = [onZeroBottles, onOneBottle]
        .map(f => f(n))
        .reduce(monoidAnyOnOption.concat);

    return fold(() => `${n} bottles of beer`, (s:string) => s)(edgeCases);
}

function first_period_from(n: number): string {
    const template: (s: string) => string = (currentBottlesOfBeer: string) =>
        `${currentBottlesOfBeer} on the wall, ${currentBottlesOfBeer}.`;
    return compose(compose(currentBottlesOfBeerFrom, template), capitalize)(n);
}

function actionFor(bottles_number: number): string {
    let onZeroRemainingBottles = (n: number) => n == 0 ? some(`Go to the store and buy some more`) : none;
    let edgeCases: Option<string> = onZeroRemainingBottles(bottles_number);
    return fold(() => `Take one down and pass it around`, (s: string) => s)(edgeCases);
}

function remaining_bottles_from(n: number): string {
    let remaining_bottles;
    if (n === 0) {
        remaining_bottles = `99 bottles`;
    } else if (n === 1) {
        remaining_bottles = `no more bottles`;
    } else if (n === 2) {
        remaining_bottles = `1 bottle`;
    } else {
        remaining_bottles = `${n - 1} bottles`;
    }
    return remaining_bottles;
}

function second_period_from(n: number): string {
    let action = actionFor(n);
    return `${action}, ${remaining_bottles_from(n)} of beer on the wall.`;
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
