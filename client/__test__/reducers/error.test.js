import store from '../../src/store';

describe('default state of elements',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().error;
    expect(data).toBe('');
  });

  it('should return true with action success', () => {
    store.dispatch({type: 'ERROR', error: 'error'});
    const data = store.getState().error;
    expect(data).toBe('error');
  });

});
