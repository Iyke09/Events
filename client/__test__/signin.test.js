import Signin from '../src/components/Signin';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Signin component', () => {
  beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find('form').length).toEqual(2);
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
      retrieve: '',
      password: '',
    };
    component.find('#add-form').simulate('submit', { preventDefault });
    expect(signin.calledOnce).toEqual(true);
    expect(signin.calledWith(dummy)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('+++ calls the retrieve function', () => {
    const retrieve = sinon.spy();
    const errorAction = sinon.spy();
    const preventDefault = sinon.spy();
    const component = shallow(<Signin retrieve={retrieve} errorAction={errorAction} loaders={() => null} />);
    component.setState({retrieve: 'hello'});
    component.find('.modal-trigger').simulate('click');
    component.find('#add-form2').simulate('submit', { preventDefault });
    expect(retrieve.calledOnce).toEqual(true);
    expect(retrieve.calledWith('hello')).toEqual(true);
    component.instance().closeErrMsg();
    expect(errorAction.calledOnce).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('+++ calls the facebook authenticate function', () => {
    const signin = sinon.spy();
    const response = {accessToken: 'authTokenHot', id: 1};
    const component = shallow(<Signin signin={signin} loaders={() => null} />);
    component.find('.facebook-login').simulate('click');
    const auth = sinon.spy(component.instance().authenticate(response));
    expect(signin.calledOnce).toEqual(true);
  });

  it('+++ calls the google authenticate function', () => {
    const signin = sinon.spy();
    const response = {Zi: {id_token: 'authTokenem'}};
    const component = shallow(<Signin signin={signin} error={'error'} loaders={() => null} />);
    component.find('#google').simulate('click');
    component.instance().responseGoogle(response);
    expect(signin.calledOnce).toEqual(true);
  });

});
