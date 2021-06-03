import { CreatedUpdatedDatePipe } from './created-updated-date.pipe';

describe('CreatedUpdatedDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CreatedUpdatedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
