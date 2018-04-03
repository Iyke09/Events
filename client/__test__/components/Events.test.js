import Events from '../../src/components/Events';
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
		}
	];
	const newProps = { centers: [ 'helo', 'bae' ], singleEvent: {name: 'jane'}, success: true };
	beforeEach(() => {
		mockument(`client/__test__/mocks/index.html`);
	});
	it('+++ renders without crashing', () => {
		localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = { id: 1 };
    const pathname = {pathname: 'hello'};
		const wrapper = shallow(<Events location={pathname} getCenters={(index) => index} centers={centers} params={center} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('+++ renders with just one form and 2 options in select', () => {
		localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = { id: 1 };
    const pathname = {pathname: 'hello'};
		const wrapper = shallow(<Events getCenters={(index) => index} location={pathname} centers={centers} params={center} />);
		expect(wrapper.find('form').length).toEqual(1);
		expect(wrapper).toMatchSnapshot();
	});

	it('+++ changes  username input field', () => {
		localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = { id: 1 };
    const pathname = {pathname: 'hello'};
		const wrapper = shallow(<Events getCenters={(index) => index} location={pathname} centers={centers} params={center} />, {
			attachTo: document.body
		});
		wrapper.find('input').first().simulate('change', {
			target: {
				value: 'emporium'
			}
		});
		expect(wrapper).toMatchSnapshot();
	});

	it('+++ calls the error function', () => {
		const errorAction = sinon.spy();
		localStorage.setItem('token', 'fdfdfd9489483kfd');
    const center = { id: 1 };
    const pathname = {pathname: 'hello'};
		const wrapper = shallow(
			<Events getCenters={(index) => index} location={pathname} centers={centers} errorAction={errorAction} params={center} />
		);
		wrapper.instance().closeErrMsg();
		expect(errorAction.calledOnce).toEqual(true);
		expect(wrapper.set);
	});

	it('+++ calls the addEvent function', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const pathname = {pathname: 'hello'};
		const center = { id: 1 };
		const addEvent = sinon.spy();
		const getCenters = sinon.spy();
		const preventDefault = sinon.spy();
		const component = shallow(
			<Events
				getCenters={(index) => index}
        location={pathname}
				centers={centers}
				params={center}
				addEvent={addEvent}
				loaders={() => null}
			/>
		);
		component.find('input').first().simulate('change', {
			target: {
				value: 'emporium',
				name: 'title'
			}
		});
		component.setState({ date: '2019-09-08' });
		const dummy = {
			centerSet: '',
			center: 'yo',
			title: 'emporium',
			time: '12:00',
			date: '2019-09-08',
			guests: 0,
      type: '',
      Center: 'testing',
      selectedCenter: []
		};
		component.find('form').simulate('submit', { preventDefault });
		expect(addEvent.calledOnce).toEqual(true);
		expect(addEvent.calledWith(dummy)).toEqual(true);
		expect(preventDefault.calledOnce).toEqual(true);
  });

  it('+++ calls the updateEvent function**', () => {
    localStorage.setItem('token', 'fdfdfd9489483kfd');
    const pathname = {pathname: 'edit'};
		const center = { id: 1 };
		const updateEvent = sinon.spy();
    const getCenters = sinon.spy();
    const success = true;
		const preventDefault = sinon.spy();
		const component = shallow(
			<Events
				getCenters={(index) => index}
        location={pathname}
				centers={centers}
				params={center}
				updateEvent={updateEvent}
				loaders={() => null}
			/>
		);
    component.setState({ date: '2019-09-08' });
		component.find('form').simulate('submit', { preventDefault });
		expect(updateEvent.calledOnce).toEqual(true);
		expect(preventDefault.calledOnce).toEqual(true);
	});

	it('+++ calls the error function if date field is not recent', () => {
		localStorage.setItem('token', 'fdfdfd9489483kfd');
		const center = { id: 1 };
    const addEvent = sinon.spy();
    const pathname = {pathname: 'hello'};
		const getCenters = sinon.spy();
		const errorAction = sinon.spy();
		const preventDefault = sinon.spy();
		const component = shallow(
			<Events
				getCenters={(index) => index}
				centers={centers}
        location={pathname}
				params={center}
				errorAction={errorAction}
				addEvent={addEvent}
				loaders={() => null}
			/>
		);
		component.setState({ date: '2014-09-08' });
		component.find('form').simulate('submit', { preventDefault });
		expect(addEvent.calledOnce).toEqual(false);
		expect(errorAction.calledOnce).toEqual(true);
	});

	it('addevent component call componentwillrecieveprops', () => {
    const pathname = {pathname: 'hello'};
    const event = {name: 'jane09'};
		const component = shallow(<Events  getCenters={(index) => index}
       location={pathname} singleEvent={event} centers={centers} loaders={() => null} />);
		component.instance().componentWillReceiveProps(newProps);
		expect(component).toMatchSnapshot();
  });

});
