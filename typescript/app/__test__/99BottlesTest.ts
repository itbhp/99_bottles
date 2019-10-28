import {fold, getFirstMonoid, none, Option, some} from 'fp-ts/lib/Option';
import {Monoid} from 'fp-ts/lib/Monoid';
import {foldMap} from "fp-ts/lib/Array";

const monoidAnyOnOption: Monoid<Option<string>> = getFirstMonoid();

type rule = (n: number) => Option<string>
const applyRuleTo = (n:number) => (f: rule) => f(n);

function compose<A, B, C>(f: (a:A) => B, g: (b:B) => C) {
    return (a: A) => g(f(a));

}
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function currentBottlesOfBeerFrom(n: number): string {
    const onZeroBottles = (num: number) => num == 0 ?  some(`no more bottles of beer`) : none;
    const onOneBottle = (num: number) => num == 1 ?  some(`1 bottle of beer`) : none;

    const rules = [onZeroBottles, onOneBottle];
    const edgeCases = foldMap(monoidAnyOnOption)(applyRuleTo(n))(rules);

    return fold(() => `${n} bottles of beer`, (s:string) => s)(edgeCases);
}

function first_period_from(n: number): string {
    const template: (s: string) => string = (currentBottlesOfBeer: string) =>
        `${currentBottlesOfBeer} on the wall, ${currentBottlesOfBeer}.`;
    return compose(compose(currentBottlesOfBeerFrom, template), capitalize)(n);
}

function actionFor(bottles_number: number): string {
    const onZeroRemainingBottles = (n: number) => n == 0 ? some(`Go to the store and buy some more`) : none;
    const edgeCases: Option<string> = onZeroRemainingBottles(bottles_number);
    return fold(() => `Take one down and pass it around`, (s: string) => s)(edgeCases);
}

function remaining_bottles_from(n: number): string {
    const onZeroBottles = (num: number) => num == 0 ? some(`99 bottles`) : none;
    const onOneBottle = (num: number) => num == 1 ? some(`no more bottles`) : none;
    const onTwoBottles = (num: number) => num == 2 ? some(`1 bottle`) : none;

    const rules = [onZeroBottles, onOneBottle, onTwoBottles];
    const edgeCases = foldMap(monoidAnyOnOption)(applyRuleTo(n))(rules);

    return fold(() => `${n - 1} bottles`, (s:string) => s)(edgeCases);
}

function second_period_from(n: number): string {
    const action = actionFor(n);
    const motto = `${remaining_bottles_from(n)} of beer on the wall.`;
    return `${action}, ${motto}`;
}

function ninety_nine_bottles_verse(n: number): string {
    return first_period_from(n) + `\n` + second_period_from(n);
}

describe('99 bottles Kata', () => {
    it('should produce the right 99th verse', () => {
        expect(ninety_nine_bottles_verse(99))
            .toEqual(`99 bottles of beer on the wall, 99 bottles of beer.
Take one down and pass it around, 98 bottles of beer on the wall.`);
    });

    it('should produce the right 98th verse', () => {
        expect(ninety_nine_bottles_verse(98))
            .toEqual(`98 bottles of beer on the wall, 98 bottles of beer.
Take one down and pass it around, 97 bottles of beer on the wall.`);
    });

    it('should produce the right 2nd verse', () => {
        expect(ninety_nine_bottles_verse(2))
            .toEqual(`2 bottles of beer on the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beer on the wall.`);
    });

    it('should produce the right 1st verse', () => {
        expect(ninety_nine_bottles_verse(1))
            .toEqual(`1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.`);
    });

    it('should produce the right 0th verse', () => {
        expect(ninety_nine_bottles_verse(0))
            .toEqual(`No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.`);
    });
});
