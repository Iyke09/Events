import store from '../../client/src/store';

describe('default state of elements',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().singleEvent;
    expect(data).toEqual({});
  });

  it('should return false with action unload', () => {
    store.dispatch({type: 'SET_SINGLE_EVENT', response: {event: {id: 1, title: 'Emporium'}}});
    const data = store.getState().singleEvent;
    expect(data).toEqual({id: 1, title: 'Emporium'});
  });
});
