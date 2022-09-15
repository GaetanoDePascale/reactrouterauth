describe('Utility function Tests', () => {
  beforeEach(() => {});

  afterEach(() => {});

  const utils = require('../../src/utils/index');
  it('Test numeric conversion', () => {
    expect(utils.formatNumber('222.24332', '2')).to.eq('222.24');
    expect(utils.formatNumber('222.84332', '0')).to.eq('223');
    expect(utils.formatNumber('prova', '0')).to.eq('NaN');
  });
});
