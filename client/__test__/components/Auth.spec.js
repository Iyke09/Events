import Auth from '../../src/components/Auth.jsx';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Auth component', () => {
  beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    const pathname = {pathname: 'hello'};
    const wrapper = shallow(<Auth location={pathname} />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders with just two forms', () => {
    const pathname = {pathname: 'hello'};
    const wrapper = mount(<Auth location={pathname} />);
    expect(wrapper.find('form').length).toEqual(2);
  });

  it('+++ renders link to home page', () => {
    const pathname = {pathname: 'hello'};
    const wrapper = shallow(<Auth location={pathname} />);
    expect(wrapper.find('Link').first().prop('to')).toEqual('/');
  });


  it('+++ calls the signin function', () => {
    const signin = sinon.spy();
    const signup = sinon.spy();
    const preventDefault = sinon.spy();
    const pathname = {pathname: 'signin'};
    const component = mount(<Auth signin={signin} signup={signup} location={pathname} loaders={() => null} />);
    const dummy = {
      email: '',
      retrieve: '',
      password: '',
      username: ''
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
    const pathname = {pathname: 'signin'};
    const component = mount(<Auth retrieve={retrieve} location={pathname} errorAction={errorAction} loaders={() => null} />);
    component.setState({retrieve: 'hello'});
    component.find('.modal-trigger').simulate('click');
    component.find('#add-form2').simulate('submit', { preventDefault });
    expect(retrieve.calledOnce).toEqual(true);
    expect(retrieve.calledWith('hello')).toEqual(true);
    component.instance().closeErrMsg();
    expect(errorAction.calledOnce).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

});
