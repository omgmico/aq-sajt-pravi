// Dummy test file to verify Jest setup
describe('AQ Accounting Website Tests', () => {
  test('should pass this dummy test', () => {
    expect(true).toBe(true);
  });

  test('should handle basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
  });

  test('should handle string operations', () => {
    const siteName = 'AQ Accounting';
    expect(siteName).toContain('AQ');
    expect(siteName).toHaveLength(13);
  });

  test('should validate arrays', () => {
    const services = ['Bookkeeping', 'Tax Consulting', 'Business Advisory'];
    expect(services).toHaveLength(3);
    expect(services).toContain('Bookkeeping');
  });
});
