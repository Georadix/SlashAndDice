import { SlashAndDicePage } from './app.po';

describe('slash-and-dice App', () => {
  let page: SlashAndDicePage;

  beforeEach(() => {
    page = new SlashAndDicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
