import store from '../../src/store';

describe('Test Centers state ',() => {

  it('should have a default lenght of zero', () => {
    const data = store.getState().centers;
    expect(data.center).toHaveLength(0);
    expect(data).toEqual({center: [], singleCenter: {}});
  });

  it('should update the center state', () => {
    store.dispatch({type: 'GET_CENTER', response: {center: [{id: 1, name: 'emporium'}] }});
    const data = store.getState().centers;
    expect(data).toEqual({center: [{id: 1, name: 'emporium'}], singleCenter: {}});
  });

  it('should update the center state**', () => {
    store.dispatch({type: 'SET_CENTER', response: {center: {id: 1, title: 'Emporium'}}});
    const data = store.getState().centers;
    expect(data).toEqual({center: [{id: 1, name: 'emporium'}, {id: 1, title: 'Emporium'}], singleCenter: {}});
  });

  it('should update the center state', () => {
    store.dispatch({type: 'SET_SINGLE', response: {center: {id: 1, title: 'Emporium'}}});
    const data = store.getState().centers;
    expect(data).toEqual({center: [{id: 1, name: 'emporium'}, {id: 1, title: 'Emporium'}], singleCenter: {id: 1, title: 'Emporium'}});
  });

});
