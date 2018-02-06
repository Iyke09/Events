import Add from '../client/src/components/addEvents';
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
    mockument(`__test__/mocks/index.html`);
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
    expect(wrapper.find('option').length).toEqual(2);
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
    const dummy = {
      centerSet: '',
      value: 'yo',
      title: 'emporium',
      time: '12:00',
      date: 0,
      guests: 0,
      type: ''
    };
    component.find('form').simulate('submit', { preventDefault });
    expect(addEvent.calledOnce).toEqual(true);
    expect(addEvent.calledWith(dummy)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

});
