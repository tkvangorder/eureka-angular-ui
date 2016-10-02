import { EurekaAngularUiPage } from './app.po';

describe('eureka-angular-ui App', function() {
  let page: EurekaAngularUiPage;

  beforeEach(() => {
    page = new EurekaAngularUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
