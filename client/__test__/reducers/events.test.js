import store from '../../src/store';

describe('Test Events state',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().events;
    expect(data.event).toHaveLength(0);
    expect(data).toEqual({event: [], singleEvent: {}});
  });

  it('should update the event state', () => {
    store.dispatch({type: 'SET_EVENTS', response: {event: [{id: 1, name: 'emporium'}] }});
    const data = store.getState().events;
    expect(data).toEqual({event: [{id: 1, name: 'emporium'}], singleEvent: {}});
  });

  it('should update the event state', () => {
    store.dispatch({type: 'SET_SINGLE_EVENT', response: {event: {id: 1, title: 'Emporium'}}});
    const data = store.getState().events;
    expect(data).toEqual({event: [{id: 1, name: 'emporium'}], singleEvent: {id: 1, title: 'Emporium'}});
  });

});
