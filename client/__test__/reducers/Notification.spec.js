import store from '../../src/store';

describe('default state of elements',() => {
  it('should have a default state ', () => {
    const data = store.getState().Notify;
    expect(data).toEqual({error: '', loader: false, success: false});
  });
});

describe('Test Notification states',() => {

  it('should update the error state', () => {
    store.dispatch({type: 'ERROR', error: 'error'});
    const data = store.getState().Notify;
    expect(data).toEqual({error: 'error', loader: false, success: false});
  });

  it('should update the loader state', () => {
    store.dispatch({type: 'LOAD'});
    const data = store.getState().Notify;
    expect(data).toEqual({error: 'error', loader: true, success: false});
  });

  it('should return true with action success', () => {
    store.dispatch({type: 'SUCCESS'});
    const data = store.getState().Notify;
    expect(data).toEqual({error: 'error', loader: true, success: true});
  });

  it('should return false with action !success', () => {
    store.dispatch({type: '!SUCCESS'});
    const data = store.getState().Notify;
    expect(data).toEqual({error: 'error', loader: true, success: false});
  });

});

