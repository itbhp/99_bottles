function ninety_nine_bottles(bottles_number: number): string {
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

});
