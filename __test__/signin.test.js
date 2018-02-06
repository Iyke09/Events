import Signin from '../client/src/components/Signin';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Signin component', () => {
  beforeEach(() => {
    mockument(`__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('+++ renders link to home page', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find('Link').first().prop('to')).toEqual('/');
  });

  it('+++ changes  username input field', () => {
    const component = shallow(<Signin />);
    component.find('input').first().simulate('change', { target: {
      value: 'janedoe' }
    });

    expect(component).toMatchSnapshot();
  });

  it('+++ calls the signin function', () => {
    const signin = sinon.spy();
    const preventDefault = sinon.spy();
    const component = shallow(<Signin signin={signin} loaders={() => null} />);
    const dummy = {
      email: '',
      password: '',
    };
    component.find('form').simulate('submit', { preventDefault });
    expect(signin.calledOnce).toEqual(true);
    expect(signin.calledWith(dummy)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

});
