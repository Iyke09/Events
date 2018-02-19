import Add from '../src/components/addEvents';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Add events component', () => {
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
  beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const wrapper = shallow(<Add getCenters={(index) => index} centers={centers} params={center}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form and 2 options in select', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const wrapper = shallow(<Add getCenters={(index) => index} centers={centers} params={center}/>);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ changes  username input field', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const wrapper = shallow(<Add getCenters={(index) => index} centers={centers} params={center}/>,
      { attachTo: document.body });
    wrapper.find('input').first().simulate('change', { target: {
      value: 'emporium' }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ calls the error function', () => {
    const errorAction = sinon.spy();
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const wrapper = shallow(<Add getCenters={(index) => index} centers={centers} errorAction={errorAction} params={center}/>);
    wrapper.instance().closeErrMsg();
    expect(errorAction.calledOnce).toEqual(true);
    expect(wrapper.set);
  });

  it('+++ calls the addEvent function', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const addEvent = sinon.spy();
    const getCenters = sinon.spy();
    const preventDefault = sinon.spy();
    const component = shallow(<Add getCenters={(index) => index} centers={centers}
       params={center} addEvent={addEvent} loaders={() => null} />);
    component.find('input').first().simulate('change', { target: {
      value: 'emporium',name: 'title' }
    });
    component.setState({ date: '2019-09-08'});
    const dummy = {
      centerSet: '',
      value: 'yo',
      title: 'emporium',
      time: '12:00',
      date: '2019-09-08',
      guests: 0,
      type: '',
      selectedCenter: []
    };
    component.find('form').simulate('submit', { preventDefault });
    expect(addEvent.calledOnce).toEqual(true);
    expect(addEvent.calledWith(dummy)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });


  it('+++ calls the error function if date field is not recent', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = {id: 1};
    const addEvent = sinon.spy();
    const getCenters = sinon.spy();
    const errorAction = sinon.spy();
    const preventDefault = sinon.spy();
    const component = shallow(<Add getCenters={(index) => index} centers={centers}
       params={center} errorAction={errorAction} addEvent={addEvent} loaders={() => null} />);
    component.setState({ date: '2014-09-08'});
    component.find('form').simulate('submit', { preventDefault });
    expect(addEvent.calledOnce).toEqual(false);
    expect(errorAction.calledOnce).toEqual(true);
  });

});
