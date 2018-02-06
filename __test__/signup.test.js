import Signup from '../client/src/components/Signup';
import React from 'react';
import jest from 'jest';
import mockument from 'mockument';
import sinon from 'sinon';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Signup component', () => {
  beforeEach(() => {
    mockument(`__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('+++ renders link to home page', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find('Link').first().prop('to')).toEqual('/');
  });

  it('+++ changes  username input field', () => {
    const component = shallow(<Signup />);
    component.find('input').first().simulate('change', { target: {
      value: 'janedoe' }
    });

    expect(component).toMatchSnapshot();
  });

  it('+++ calls the signup function', () => {
    const signup = sinon.spy();
    const preventDefault = sinon.spy();
    const component = shallow(<Signup signup={signup} loaders={() => null} />);
    const dummy = {
      username: '',
      email: '',
      password: '',
    };
    component.find('form').simulate('submit', { preventDefault });
    expect(signup.calledOnce).toEqual(true);
    expect(signup.calledWith(dummy)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
