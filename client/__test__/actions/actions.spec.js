import * as actionCreators from "../../src/actions/actionCreators";
import expect from 'expect';

describe("ActionCreators", () => {
    it("should create an action to sign up", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { payload, type: "SIGN_UP" };

        expect(actionCreators.signup(payload)).toEqual(expectedAction);
    });

    it("should create an action to sign in", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { payload, type: "SIGN_IN" };

        expect(actionCreators.signin(payload)).toEqual(expectedAction);
    });

    it("should create an action to change password", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { payload, type: "CHANGE_PASSWORD" };

        expect(actionCreators.changePassword(payload)).toEqual(expectedAction);
    });

    it("should create an action to loaders", () => {
        const expectedAction = { type: "LOAD" };

        expect(actionCreators.loaders()).toEqual(expectedAction);
    });

    it("should create an action to get reviews", () => {
        const index = 4;
        const expectedAction = { index, type: "GET_ALL_REVIEWS" };

        expect(actionCreators.getReviews(index)).toEqual(expectedAction);
    });

    it("should create an action to add review", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { payload, type: "ADD_REVIEW" };

        expect(actionCreators.addReview(payload)).toEqual(expectedAction);
    });

    it("should create an action to notify for error", () => {
        const error = "error";
        const expectedAction = { error, type: "ERROR" };

        expect(actionCreators.errorAction(error)).toEqual(expectedAction);
    });

    it("should create an action to get centers", () => {
        const index = 4;
        const expectedAction = { index, type: "GET_ALL" };

        expect(actionCreators.getCenters(index)).toEqual(expectedAction);
    });

    it("should create an action to list events for a center", () => {
        const index = 4;
        const expectedAction = { index, type: "GET_CENTER_EVENTS" };

        expect(actionCreators.centerEvents(index)).toEqual(expectedAction);
    });

    it("should create an action to retrieve email", () => {
        const email = "foo@foo.com";
        const expectedAction = { email, type: "RETRIEVE" };

        expect(actionCreators.retrieve(email)).toEqual(expectedAction);
    });

    it("should create an action to update event", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const index = 5;
        const expectedAction = { payload, index, type: "UPDATE_EVENT" };

        expect(actionCreators.updateEvent(payload, index)).toEqual(expectedAction);
    });

    it("should create an action to get a single center", () => {
        const index = 5;
        const expectedAction = { index, type: "GET_SINGLE" };

        expect(actionCreators.getSingle(index)).toEqual(expectedAction);
    });

    it("should create an action to add favorite", () => {
        const index = 5;
        const expectedAction = { type: "FAVORITE_CENTER", index };

        expect(actionCreators.addFavorite(index)).toEqual(expectedAction);
    });

    it("should create an action to get a single event", () => {
        const index = 5;
        const expectedAction = { type: "GET_SINGLE_EVENT", index };

        expect(actionCreators.getSingleEvents(index)).toEqual(expectedAction);
    });

    it("should create an action to get all event", () => {
        const expectedAction = { type: "GET_EVENTS" };

        expect(actionCreators.getEvents()).toEqual(expectedAction);
    });

    it("should create an action to add centers", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { type: "ADD_CENTER", payload };

        expect(actionCreators.addCenter(payload)).toEqual(expectedAction);
    });

    it("should create an action to update centers", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const index = 8;
        const expectedAction = { type: "UPDATE_CENTER", payload, index };

        expect(actionCreators.updateCenter(payload, index)).toEqual(expectedAction);
    });

    it("should create an action to add events", () => {
        const payload = { email: "foo@foo.com", password: "123456"};
        const expectedAction = { type: "ADD_EVENT", payload };

        expect(actionCreators.addEvent(payload)).toEqual(expectedAction);
    });

    it("should create an action to delete events", () => {
        const index = 9;
        const expectedAction = { type: "DELETE_EVENT", index };

        expect(actionCreators.deleteEvent(index)).toEqual(expectedAction);
    });
});