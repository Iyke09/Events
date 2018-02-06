import Detail from '../client/src/components/details';
import store from '../client/src/store';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { Provider } from 'react-redux';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Detail component', () => {
  const single ={name: 'emporium', description: 'awesome place', price: 400, events: [
    {
      title: 'emporium',
      description: 'awesome place',
      date: '2016-07-08'
    },
    {
      title: 'emporium2',
      description: 'awesome place',
      date: '2016-12-04'
    },
  ]};
  const center = {id: 1};
  localStorage.setItem('token', 'dfdgkkkde9559');
  it('detail comp renders without crashing', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.contains(
    <button className="btn red right" style={{marginRight: 25}}>BOOK CENTER</button>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('detail comp renders events for that ceneter', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    expect(wrapper.contains(<p className="font3">No events available for this center</p>)).toEqual(false);
    expect(wrapper.find('.title').length).toEqual(2);
    expect(wrapper.contains(<h2 className="font3 title">emporium</h2>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

});
