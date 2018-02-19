import store from '../../src/store';

describe('Events()',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().events;
    expect(data).toHaveLength(0);
  });

  it('should return true with action success', () => {
    store.dispatch({type: 'SET_EVENTS', response: {event: [{id: 1, name: 'emporium'}] }});
    const data = store.getState().events;
    expect(data).toEqual([{id: 1, name: 'emporium'}]);
    expect(data).toHaveLength(1);
  });

});
