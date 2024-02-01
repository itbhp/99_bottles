import {fold, getMonoid, none, Option, some} from 'fp-ts/lib/Option';
import {first} from 'fp-ts/lib/Semigroup';
import {Monoid} from 'fp-ts/lib/Monoid';
import {foldMap} from "fp-ts/lib/Array";
import {flow} from "fp-ts/lib/function";

const monoidAnyOnOption: Monoid<Option<string>> = getMonoid(first());

type rule = (n: number) => Option<string>
const applyRuleTo = (n: number) => (f: rule) => f(n);

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function mottoFor(n: number, motto: string) {
    return (num: number) => num == n ? some(motto) : none;
}

function currentBottlesWhen(n: number): string {
    const onZeroBottles = mottoFor(0, `no more bottles`);
    const onOneBottle = mottoFor(1, `1 bottle`);

    const rules = [onZeroBottles, onOneBottle];
    const edgeCases = foldMap(monoidAnyOnOption)(applyRuleTo(n))(rules);

    return fold(() => `${n} bottles`, (s: string) => s)(edgeCases);
}

function first_period_from(n: number): string {
    const template = (currentBottles: string) =>
        `${currentBottles} of beer on the wall, ${currentBottles} of beer.`;
    return flow(currentBottlesWhen, template, capitalize)(n);
}

function actionFor(bottles_number: number): string {
    const onZeroRemainingBottles = mottoFor(0, `Go to the store and buy some more`);
    const edgeCases: Option<string> = onZeroRemainingBottles(bottles_number);
    return fold(() => `Take one down and pass it around`, (s: string) => s)(edgeCases);
}

function remaining_bottles_from(n: number): string {
    const onZeroBottles = mottoFor(0, currentBottlesWhen(99));
    const onOneBottle = mottoFor(1, currentBottlesWhen(0));
    const onTwoBottles = mottoFor(2, currentBottlesWhen(1));

    const rules = [onZeroBottles, onOneBottle, onTwoBottles];
    const edgeCases = foldMap(monoidAnyOnOption)(applyRuleTo(n))(rules);

    return fold(() => currentBottlesWhen(n - 1), (s: string) => s)(edgeCases);
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
