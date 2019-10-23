function ninety_nine_bottles(bottles_number: number): string {
  if (bottles_number === 0)
    return `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.`;

  if (bottles_number === 1)
    return `1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.`;

  if (bottles_number === 2)
    return `2 bottles of beer on the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beer on the wall.`;

  return `${bottles_number} bottles of beer on the wall, ${bottles_number} bottles of beer.` + '\n' +
         `Take one down and pass it around, ${bottles_number - 1} bottles of beer on the wall.`;
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
