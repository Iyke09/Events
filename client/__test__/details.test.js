import Detail from '../src/components/details';
import store from '../src/store';
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
      date: '09-09-2019'
    },
    {
      title: 'emporium2',
      description: 'awesome place',
      date: '09-09-2019'
    },
  ]};
  const newEvents = [
    {
      title: 'emporium',
      description: 'awesome place',
      date: '09-09-2019'
    },
    {
      title: 'emporium2',
      description: 'awesome place',
      date: '09-09-2014'
    },
  ];
  const prevEvents = [
    {
      title: 'emporium',
      description: 'awesome place',
      date: '09-09-2019'
    }
  ];
  const newProps = {single: {events: [{
    date: '2019-04-05',
    name: 'algo',
  },
  {
    date: '2018-09-07',
    name: 'op'
  }
]}};
  const center = {id: 1};

  it('detail comp renders without crashing', () => {
    localStorage.setItem('token', `ZZXJvZmVxOS5uWnJLSFY4UnFXN1VvQkVqTGEuN29XTnVP`);
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.contains(
      <button className="btn red" style={{marginRight: 25}}>BOOK CENTER</button>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('detail component renders upcoming events for that center', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    wrapper.setState({newArr1: newEvents});
    expect(wrapper.find('.newTitle').length).toEqual(2);
    expect(wrapper.contains(<h2 className="font2 newTitle">emporium</h2>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('detail component renders past events', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    wrapper.setState({pastArr1: prevEvents});
    expect(wrapper.find('.prevTitle').length).toEqual(1);
    expect(wrapper.contains(<h2 className="font2 prevTitle">emporium</h2>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('detail component renders past events', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper).toMatchSnapshot();
  });

  it('detail comp renders past events for that center', () => {
    const wrapper = shallow(
      <Detail getSingle={(index) => index} params={center} single={single} />
    );
    wrapper.setState({pastArr1: prevEvents});
    expect(wrapper.find('.prevInfo').length).toEqual(0);
  });

});
