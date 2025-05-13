import { IsExpiringPipe } from './is-expiring.pipe';

describe('IsExpiringPipe', () => {
  it('create an instance', () => {
    const pipe = new IsExpiringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return true if endDate is within 30 days from now', () => {
    const pipe = new IsExpiringPipe();
    const now = new Date();
    const in10Days = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(in10Days)).toBeTrue();
  });

  it('should return false if endDate is more than 30 days from now', () => {
    const pipe = new IsExpiringPipe();
    const now = new Date();
    const in40Days = new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(in40Days)).toBeFalse();
  });

  it('should return false if endDate is in the past', () => {
    const pipe = new IsExpiringPipe();
    const now = new Date();
    const pastDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(pastDate)).toBeFalse();
  });

  it('should work with string dates', () => {
    const pipe = new IsExpiringPipe();
    const now = new Date();
    const in5Days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(in5Days.toISOString())).toBeTrue();
  });
});
