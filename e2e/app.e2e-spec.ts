import { SlashAndDicePage } from './app.po';

describe('slash-and-dice App', function() {
  let page: SlashAndDicePage;

  beforeEach(() => {
    page = new SlashAndDicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
