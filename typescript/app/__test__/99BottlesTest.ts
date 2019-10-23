function ninety_nine_bottles(verse: number): string {
  // tslint:disable-next-line:prefer-template
  return '99 bottles of beer on the wall, 99 bottles of beer.' + '\n' +
         'Take one down and pass it around, 98 bottles of beer on the wall.';
}

describe('99 bottles Kata', () => {
  it('correct 99th verse', () => {
    expect(ninety_nine_bottles(99))
      .toEqual(`99 bottles of beer on the wall, 99 bottles of beer.
Take one down and pass it around, 98 bottles of beer on the wall.`);
  });
});
