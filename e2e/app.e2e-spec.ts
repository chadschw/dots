import { DotsPage } from './app.po';

describe('dots App', function() {
  let page: DotsPage;

  beforeEach(() => {
    page = new DotsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
