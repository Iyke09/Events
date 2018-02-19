import Home from '../src/components/Home';
import store from '../src/store';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { Provider } from 'react-redux';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Home component', () => {
  const centers = [
    {
      name: 'emporium',
      description: 'awesome place',
      price: 400
    },
    {
      name: 'emporium',
      description: 'awesome place',
      price: 400
    },
  ];
  it('+++ renders without crashing', () => {
    const wrapper = shallow(
        <Home getCenters={(index) => index} centers={centers} />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form', () => {
    const wrapper = shallow(
      <Home getCenters={(index) => index} centers={centers} />
    );
    expect(wrapper.find('.displayed').length).toEqual(2);
  });

  it('+++ renders with all list of user events', () => {
    const getCenters = sinon.spy();
    const wrapper = shallow(<Home getCenters={getCenters} centers={centers} />);
    expect(getCenters.calledOnce).toEqual(true);
    wrapper.find('.testx').simulate('click');
    expect(getCenters.calledWith(5)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders link to home page', () => {
    const wrapper = shallow(
      <Home getCenters={(index) => index} centers={centers} />
    );
    expect(wrapper.find('Link').at(1).prop('to')).toEqual('/auth/signup');
    expect(wrapper.find('Link').at(0).prop('to')).toEqual('/auth/signin');
  });
});
