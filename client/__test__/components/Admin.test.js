import Admin from '../../src/components/admin';
import store from '../../src/store';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import mockument from 'mockument';
// import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Home component', () => {
	const centers = [
		{
			name: 'emporium',
      description: 'awesome place',
      favorites: [{userId: 11, centerId: 33}],
			price: 400
		},
		{
			name: 'emporium',
      description: 'awesome place',
      favorites: [{userId: 88, centerId: 36}],
			price: 400
    },
    {
			name: 'emporium3',
      description: 'awesome place',
      favorites: [{userId: 88, centerId: 36}],
			price: 400
		}
  ];

  const newProps = {single: {image: '/img08.jpeg'}};

	beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
    localStorage.setItem('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXIiOnsi
    aWQiOjEsInVzZXJuYW1lIjoiamFuZXQiLCJlbWFpbCI6ImZvbzVAZm9vLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJ
    E9tYUF6dUVrOFVPeVJoaE1ZTUhKZWVqNEFrRDcvMnA0SHlaM0pKbE1idGlyeklwekI0R2FTIiwiaXNBZG1pbiI6dHJ1
    ZSwiY3JlYXRlZEF0IjoiMjAxNy0xMS0yNFQxNDozNTowMy4wMDFaIiwidXBkYXRlZEF0IjoiMjAxNy0xMS0yNFQxNDozNToxNC42NTdaIn0sImlhdCI
    6MTUyMTQ1MTMzOSwiZXhwIjoxNTIxNjI0MTM5fQ.3JmQOoTLdw1Tfj6BYHEb5BgY56LeramAxEWAy_7vfaU`);
  });

	it('+++ admin page renders without crashing', () => {
    const pathname = {pathname: 'list_center'};
		const wrapper = shallow(<Admin mock={'hello'} location={pathname} getCenters={(index) => index} centers={centers} />);
		expect(wrapper.length).toEqual(1);
		expect(wrapper).toMatchSnapshot();
	});

	it('+++ admin page renders with all list of centers and calls the get more function', () => {
    const getCenters= sinon.spy();
    const error = 'jefe!';
    const pathname = {pathname: '/admin/list_center'};
    const wrapper = shallow(<Admin mock={'hello'} location={pathname} error={error} getCenters={getCenters} centers={centers} />);
    expect(getCenters.calledOnce).toEqual(true);
    expect(wrapper.find('.displayed').length).toEqual(3);
		wrapper.find('.more').simulate('click');
		expect(getCenters.calledWith(6)).toEqual(true);
  });

  it('+++ admin page renders with all list of centers and calls the update function', () => {
    const getCenters= sinon.spy();
    const getSingle= sinon.spy();
    const error = 'jefe!';
    const pathname = {pathname: '/admin/list_center'};
    const wrapper = shallow(<Admin mock={'hello'} location={pathname} error={error} getSingle={getSingle}
    getCenters={getCenters} centers={centers} />);
    expect(getCenters.calledOnce).toEqual(true);
    //wrapper.find('.update').simulate('click');
    wrapper.instance().updateCenter(5);
    expect(getSingle.calledOnce).toEqual(true);
    expect(getSingle.calledWith(5)).toEqual(true);
	});

  it('+++ calls the add center function', () => {
    const getCenters= sinon.spy();
    const loaders = sinon.spy();
    const preventDefault = sinon.spy();
    const addCenter = sinon.spy();
    const pathname = {pathname: '/admin/add_center'};
    const component = shallow(<Admin mock={'hello'} location={pathname}
    getCenters={getCenters} addCenter={addCenter} loaders={loaders} centers={centers} />);
    component.find('#add-form').simulate('submit', { preventDefault });
    expect(addCenter.calledOnce).toEqual(true);
    expect(loaders.calledOnce).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('+++ calls the update center function', () => {
    const getCenters= sinon.spy();
    const loaders = sinon.spy();
    const preventDefault = sinon.spy();
    const updateCenter = sinon.spy();
    const params = {id: 1};
    const pathname = {pathname: 'edit'};
    const component = shallow(<Admin mock={'hello'} location={pathname}
    getCenters={getCenters} updateCenter={updateCenter} params={params} loaders={loaders} centers={centers} />);
    component.find('#add-form').simulate('submit', { preventDefault });
    expect(updateCenter.calledOnce).toEqual(true);
    expect(loaders.calledOnce).toEqual(true);
    expect(preventDefault.calledOnce).toEqual(true);
  });


  it('+++ calls the search center function', () => {
    const getCenters = sinon.spy();
    const errorAction = sinon.spy();
    const e = {target: {value: 'hello'}};
    const pathname = {pathname: 'edit'};
    const error = 'yoyo!';
    const component = shallow(<Admin mock={'hello'} location={pathname}
      getCenters={getCenters} errorAction={errorAction} error={error} centers={centers} />);
    component.instance().searchCenter(e);
    expect(errorAction.calledOnce).toEqual(false);
    //expect(getCenters.calledOnce).toEqual(true);
    expect(getCenters.calledWith('hello')).toEqual(true);
    component.instance().closeErrMsg();
    expect(errorAction.calledOnce).toEqual(true);
  });

  it('+++ admin page calls the componentdidmount function', () => {
    const getCenters = sinon.spy();
    const getSingle = sinon.spy();
    const params = {id: 1};
    const pathname = {pathname: 'edit'};
    const component = shallow(<Admin mock={'hello'} location={pathname}
    getCenters={getCenters} getSingle={getSingle} params={params} centers={centers} />);
    component.instance().componentDidMount();
    expect(getSingle.calledOnce).toEqual(true);
    expect(getSingle.calledWith(1)).toEqual(true);
  });

  it('admin component calls componentwillrecieveprops with newprops', () => {
    const getCenters = sinon.spy();
    const getSingle = sinon.spy();
    const params = {id: 1};
    const pathname = {pathname: 'edit'};
    const single = 'helloo0';
    const wrapper = shallow(
      <Admin location={pathname}
        getCenters={getCenters} mock={'hello'} single={single} getSingle={getSingle} params={params} centers={centers} />
    );
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper).toMatchSnapshot();
  });

  it('admin component calls componentwillrecieveprops with newprops', () => {
    const getCenters = sinon.spy();
    const getSingle = sinon.spy();
    const params = {id: 1};
    const pathname = {pathname: 'edit'};
    const newProps = {single: 'hello', success: true};
    const single = 'hello';
    const wrapper = shallow(
      <Admin location={pathname}
        getCenters={getCenters} mock={'hello'} single={single} getSingle={getSingle}
        params={params} centers={centers} />
    );
    wrapper.instance().componentWillReceiveProps(newProps);
    wrapper.instance().handleUploadStart();
    wrapper.instance().handleProgress();
    wrapper.instance().handleUploadError();
    expect(wrapper).toMatchSnapshot();
  });

});
