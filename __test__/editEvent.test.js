import Edit from '../client/src/components/editEvents';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Edit events component', () => {
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
    const center = {id: 1};
    const wrapper = shallow(<Edit getSingleEvents={(index) => index} params={center}/>);
    wrapper.setState({title: 'hello', Center: {name: ''}});
    expect(wrapper.find('.inputx').props().value).toBe('hello');
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with just one form and 2 options in select', () => {
    const center = {id: 1};
    const wrapper = shallow(<Edit getSingleEvents={(index) => index} params={center}/>);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ changes  username input field', () => {
    const center = {id: 1};
    const wrapper = shallow(<Edit getSingleEvents={(index) => index} params={center}/>);
    wrapper.setState({title: 'hello', Center: {name: ''}});
    wrapper.find('.inputx').simulate('change', { target: {
      value: 'emporium', name: 'title' }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ calls the addEvent function', () => {
    const center = {id: 1};
    const updateEvent = sinon.spy();
    const preventDefault = sinon.spy();
    const wrapper = shallow(<Edit getSingleEvents={(index) => index} updateEvent={updateEvent} loaders={() => null} params={center}/>);
    wrapper.setState({title: 'emporium', guests: 400, date: '2014-09-08', Center: {name: ''}});
    wrapper.find('.type').simulate('change', { target: {
      value: 'enta',name: 'type' }
    });
    const dummy = {
      center: '',
      title: 'emporium',
      time: '',
      date: '2014-09-08',
      guests: 400,
      type: 'enta',
      Center: { name: '' }
    };
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(updateEvent.calledOnce).toEqual(true);
    expect(updateEvent.calledWith(dummy, 1)).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

});
