import { BooleanPipe } from './is-private.pipe';

describe('IsPrivatePipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
