import Event from '../../src/components/myEvents.jsx';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import mockument from 'mockument';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for My Event component', () => {
	const events = [
		{
			id: 1,
			date: '2014-06-04',
			title: 'emporium',
			time: '12:00',
			Center: {
				location: 'emporium',
				image: '/images/img.jsx'
			}
		},
		{
			id: 2,
			date: '2014-06-04',
			title: 'emporium',
			time: '12:00',
			Center: {
				location: 'emporium',
				image: '/images/img.jsx'
			}
		}
	];
	beforeEach(() => {
		mockument(`client/__test__/mocks/index.html`);
	});
	it('+++ renders without crashing', () => {
		const wrapper = shallow(<Event getEvents={() => null} />);
	});

	it('+++ renders with all list of user events', () => {
		const getEvents = sinon.spy();
		const wrapper = shallow(<Event getEvents={getEvents} events={events} />);
		expect(getEvents.calledOnce).toEqual(true);
		expect(
			wrapper.contains(
				<img
					className="responsive-img img-event"
					src="/images/img.jsx"
					style={{ width: '100%', height: 250 }}
				/>
			)
		).toEqual(true);
		expect(wrapper.find('.test').length).toEqual(2);
	});

	it('+++ renders with all list of user events', () => {
		const deleteEvent = sinon.spy();
		const wrapper = shallow(<Event getEvents={() => null} deleteEvent={deleteEvent} events={events} />);
		wrapper.find('.test1').first().simulate('click');
		wrapper.find('.test2').first().simulate('click');
		expect(deleteEvent.calledOnce).toEqual(true);
	});
});
