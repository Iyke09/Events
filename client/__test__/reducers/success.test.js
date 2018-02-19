import store from '../../src/store';

describe('default state of elements',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().success;
    expect(data).toBe(false);
  });

  it('should return true with action success', () => {
    store.dispatch({type: 'SUCCESS'});
    const data = store.getState().success;
    expect(data).toEqual(true);
  });

  it('should return false with action !success', () => {
    store.dispatch({type: '!SUCCESS'});
    const data = store.getState().success;
    expect(data).toEqual(false);
  });
});
