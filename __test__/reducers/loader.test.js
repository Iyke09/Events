import store from '../../client/src/store';

describe('default state of elements',() => {
  const data = store.getState().loader;

  it('should have a default lenght of zero', () => {
    expect(data).toBe(false);
  });
});

describe('test reducers if they recieve right value',() => {

  it('should return false with action unload', () => {
    store.dispatch({type: 'UNLOAD'});
    const data = store.getState().loader;
    expect(data).toBe(false);
  });

  it('should return true if action is load', () => {
    store.dispatch({type: 'LOAD'});
    const data = store.getState().loader;
    expect(data).toBe(true);
  });
});
