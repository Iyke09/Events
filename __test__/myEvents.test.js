import Event from '../client/src/components/myEvents';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for My Event component', () => {
  const events = [
    {
      id: 1,
      Center: {
        title: 'emporium',
        image: '/images/img.jsx',
        date: '2014-06-04'
      }
    },
    {
      id: 2,
      Center: {
        title: 'emporium2',
        image: '/images/img.jsx',
        date: '2014-06-04'
      }
    },
  ];
  beforeEach(() => {
    mockument(`__test__/mocks/index.html`);
  });
  it('+++ renders without crashing', () => {
    const wrapper = shallow(<Event getEvents={() => null}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with all list of user events', () => {
    const getEvents = sinon.spy();
    const wrapper = shallow(<Event getEvents={getEvents} events={events}/>);
    expect(getEvents.calledOnce).toEqual(true);
    expect(wrapper.contains(
      <img className="responsive-img" src="/images/img.jsx" style={{width: '100%',height: 250}}/>
      )
    ).toEqual(true);
    expect(wrapper.find('.test').length).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ renders with all list of user events', () => {
    const deleteEvent = sinon.spy();
    const wrapper = shallow(<Event getEvents={() => null} deleteEvent={deleteEvent} events={events}/>);
    wrapper.find('.testn').first().simulate('click');
    expect(deleteEvent.calledOnce).toEqual(true);
    expect(deleteEvent.calledWith(1)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  // it('+++ renders link to home page', () => {
  //   const wrapper = shallow(<Signup />);
  //   expect(wrapper.find('Link').first().prop('to')).toEqual('/');
  // });

});
