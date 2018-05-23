import store from '../../src/store';

describe('Test Review state',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().reviews;
    expect(data).toHaveLength(0);
    expect(data).toEqual([]);
  });

  it('should update the review state', () => {
    store.dispatch({type: 'SET_REVIEW', response: {review: {id: 1, name: 'emporium'} }});
    const data = store.getState().reviews;
    expect(data).toEqual([{id: 1, name: 'emporium'}]);
  });

  it('should update the review state', () => {
    store.dispatch({type: 'GET_REVIEWS', response: {review: [{id: 1, title: 'Emporium'},{id: 1, title: 'Emporium'},
    {id: 1, title: 'Emporium'}]}});
    const data = store.getState().reviews;
    expect(data).toEqual([{id: 1, title: 'Emporium'},{id: 1, title: 'Emporium'},{id: 1, title: 'Emporium'}]);
  });

  it('should pop state and update the review state', () => {
    store.dispatch({type: 'SET_REVIEW', response: {review: {id: 1, name: 'emporium'} }});
    const data = store.getState().reviews;
    expect(data).toEqual([{id: 1, name: 'emporium'},{id: 1, title: 'Emporium'},{id: 1, title: 'Emporium'}]);
  });

});
