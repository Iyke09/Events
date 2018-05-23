import Detail from '../../src/components/Details.jsx';
import store from '../../src/store';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import mockument from 'mockument';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Detail component', () => {
  const single ={name: 'emporium', description: 'awesome place', price: 400, events: [
    {
      id: 1,
      title: 'emporium',
      description: 'awesome place',
      date: '09-09-2019'
    },
    {
      id: 2,
      title: 'emporium2',
      description: 'awesome place',
      date: '09-09-2019'
    },
  ]};

  const newEvents = [
    {
      id: 1,
      title: 'emporium',
      description: 'awesome place',
      date: '09-09-2019'
    },
    {
      id: 2,
      title: 'emporium2',
      description: 'awesome place',
      date: '09-09-2014'
    },
  ];
  const prevEvents = [
    {
      id: 1,
      title: 'emporium',
      description: 'awesome place',
      date: '09-09-2019'
    }
  ];
  const newProps = {events: [{
      id: 1,
      date: '2020-04-05',
      name: 'algo',
    },
    {
      id: 2,
      date: '2016-09-07',
      name: 'op'
    }
  ]};
  const center = {id: 1};
  const review = [{comment: 'hello', user: 'aje'}];
  beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
    localStorage.setItem('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7
    ImlkIjo4OCwidXNlcm5hbWUiOiJhbmRyZXciLCJlbWFpbCI6ImZvbzExQGZvby5jb20iLCJwYXNzd29yZCI
    6IiQyYSQxMCQxamVtekFla1kxQWluY3h1RC5WSlNPRXhJNXVpSlU0dDdicktDUHpjME1pZkZSNU1nVVQ3aSIs
    ImlzQWRtaW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDE4LTAzLTEwVDIwOjU1OjQ1LjIzN1oiLCJ1cGRhdGVkQXQiOiIyMDE4LTAzLTEwVDIwOjU1OjQ1LjIzN1oifSwiaWF0IjoxNTIwNz
    E3MzkyLCJleHAiOjE1MjA4OTAxOTJ9.vtV9eRx_6OpJOw_cvBIlztCmQVRqvuJFwmo2trxy1B0`);
  });

  it('rendersnthe detail component without crashing', () => {
    const wrapper = mount(
      <Detail getSingle={(index) => index} centerEvents={(index) => index} review={review} getReviews={(index) => index} params={center} single={single} />
    );
    expect(wrapper.length).toEqual(1);
  });

  it('renders all upcoming events for that center', () => {
    const wrapper = mount(
      <Detail getSingle={(index) => index} centerEvents={(index) => index} review={review} getReviews={(index) => index} params={center} single={single} />
    );
    wrapper.setState({newArr1: newEvents});
    expect(wrapper.find('.new').length).toEqual(2);
    expect(wrapper.contains(<h2 className="font2 new">emporium</h2>)).toEqual(true);
  });

  it('detail component renders past events', () => {
    const wrapper = mount(
      <Detail getSingle={(index) => index} centerEvents={(index) => index} review={review} getReviews={(index) => index} params={center} single={single} />
    );
    wrapper.setState({pastArr1: prevEvents});
    expect(wrapper.find('.past').length).toEqual(1);
    expect(wrapper.contains(<h2 className="font2 past">emporium</h2>)).toEqual(true);
  });

  it('calls the componentWillReceiveProps and updates state', () => {
    const wrapper = mount(
      <Detail getSingle={(index) => index} centerEvents={(index) => index} review={review} getReviews={(index) => index} params={center} single={single} />
    );
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state().newArr1).toEqual([{
      id: 1,
      date: '2020-04-05',
      name: 'algo',
    }]);
  });

  it('renders all the past events for that center', () => {
    const wrapper = mount(
      <Detail centerEvents={(index) => index} getSingle={(index) => index} review={review}
        getReviews={(index) => index} params={center} single={single} />
    );
    wrapper.setState({pastArr1: prevEvents});
    expect(wrapper.find('.prevInfo').length).toEqual(0);
  });

  it('detail comp renders past events for that center', () => {
    const preventDefault = sinon.spy();
    const addReview = sinon.spy();
    const params = {id: 1};
    const wrapper = mount(
      <Detail centerEvents={(index) => index} getSingle={(index) => index}
        review={review} addReview={addReview} params={params} getReviews={(index) => index} single={single} />
    );
    wrapper.find('#add-form').simulate('submit', { preventDefault });
    expect(addReview.calledOnce).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

});
