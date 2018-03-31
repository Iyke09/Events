module.exports = {
  // 'Render landing page': (client) => {
  //   client
  //     .url('http://localhost:3000')
  //     .waitForElementVisible('body', 5000)
  //     .verify.urlEquals('http://localhost:3000/')
  //     .verify.title('Event Manager.io')
  //     .verify.elementPresent('nav')
  //     .verify.containsText('h1', 'Welcome to Andela Events')
  //     .waitForElementPresent('#centerx', 10000)
  //     .verify.visible('#centerx')
  //     .verify.containsText('a.brand-logo', 'Andela')
  //     .verify.containsText('.reg', 'Register')
  //     .pause(500);
  // },
  // 'user submits signup form with passord length less than 6 characters': (client) => {
  //   client
  //     .url('http://localhost:3000/auth/signup')
  //     .setValue('input[name="email"]', 'foo01@bar.com')
  //     .setValue('.passwordz', 'p4Z')
  //     .setValue('.username', 'janedoe01')
  //     .verify.containsText('h3', 'Sign Up')
  //     .click('button[type="submit"]')
  //     .waitForElementVisible('.error', 5000)
  //     .verify.containsText('#err_msg', 'password must be greater than 6 characters')
  //     .pause(500);
  // },
  // 'Redirect to signin page if user is not authenticated and trying to access admin page': (client) => {
  //   client
  //     .url('http://localhost:3000/user/admin')
  //     .verify.urlContains('signin')
  //     .pause(500);
  // },
  // 'Redirect to details page on clicking on a center': (client) => {
  //   client
  //     .url('http://localhost:3000')
  //     .waitForElementVisible('body', 5000)
  //     .verify.urlEquals('http://localhost:3000/')
  //     .verify.title('Event Manager.io')
  //     .verify.elementPresent('nav')
  //     .waitForElementPresent('#centerx', 10000)
  //     .click('.linked')
  //     .verify.urlContains('centerdetails')
  //     .pause(500);
  // },
  // 'Redirect to signin page if user is not authenticated and trying to book center': (client) => {
  //   client
  //     .url('http://localhost:3000')
  //     .waitForElementVisible('body', 5000)
  //     .waitForElementPresent('#centerx', 10000)
  //     .click('.link')
  //     .verify.urlContains('centerdetails')
  //     .waitForElementPresent('h1', 3000)
  //     .verify.visible('.visible')
  //     .click('.visible')
  //     .verify.urlContains('signin')
  //     .pause(500);
  // },
  // 'Redirect to signin page if signin page then back to addevents page ': (client) => {
  //   client
  //     .url('http://localhost:3000/centerdetails/16')
  //     .verify.urlContains('centerdetails')
  //     .verify.visible('.visible')
  //     .click('.visible')
  //     .verify.urlContains('signin')
  //     .verify.elementPresent('form')
  //     .setValue('input[name="email"]', 'foo5@foo.com')
  //     .setValue('.passwordz', '123456')
  //     .click('button[type="submit"]')
  //     .waitForElementPresent('.titlr', 20000)
  //     .verify.urlContains('Mason')
  //     .end();
  // },


  //   'user successfully signin in then logs out': (client) => {
  //   client
  //     .url('http://localhost:3000/auth/signin')
  //     .setValue('input[name="email"]', 'foo5@foo.com')
  //     .setValue('.passwordz', '123456')
  //     .click('button[type="submit"]', () => {
  //       client
  //         .waitForElementVisible('.reg', 10000)
  //         .verify.urlEquals('http://localhost:3000/')
  //         .verify.containsText('.logout', 'Logout')
  //         .keys(client.Keys.ESCAPE)
  //         .click('.logout')
  //         .waitForElementVisible('.login', 5000)
  //         .verify.elementPresent('.login')
  //         .pause(500);
  //     });
  // },
  //   'user signs in with invalid email': (client) => {
  //   client
  //     .url('http://localhost:3000/auth/signin')
  //     .setValue('input[name="email"]', 'foo5@foot.com')
  //     .setValue('.passwordz', '123456')
  //     .click('button[type="submit"]', () => {
  //       client
  //         .waitForElementVisible('.error', 15000)
  //         .assert.containsText('#err_msg', 'invalid login details')
  //         .pause(500);
  //     });
  // },
  // 'user can not signup with taken email address': (client) => {
  //   client
  //     .url('http://localhost:3000/auth/signup')
  //     .setValue('input[name="email"]', 'foo5@foo.com')
  //     .setValue('.passwordz', '123456')
  //     .setValue('.username', 'jenaeodo')
  //     .click('button[type="submit"]')
  //     .waitForElementVisible('.error', 15000)
  //     .assert.containsText('#err_msg', 'Oops.The email you entered already exists')
  //     .pause(500);
  // },
  'User should be able to  signin in ': (client) => {
    client
      .url('http://localhost:3000/auth/signin')
      .verify.elementPresent('form')
      .setValue('input[name="email"]', 'foo5@foo.com')
      .setValue('.passwordz', '123456')
      .click('button[type="submit"]')
      .waitForElementPresent('.reg', 15000)

      .pause(500);
  },
  'admin link present if admin user logs in': (client) => {
    client
      .url('http://localhost:3000/')
      .verify.urlEquals('http://localhost:3000/')
      .waitForElementVisible('.admin', 5000)
      .verify.containsText('.admin', 'Admin')

      .pause(500);
  },
  'User should be able to addevents after signin in ': (client) => {
    client
      .url('http://localhost:3000/add/events')
      .verify.elementPresent('form')
      .verify.urlContains('add')
      .verify.containsText('h4', 'Add an Event!')
      .setValue('input[name="title"]', 'google1')
      .setValue('input[name="date"]', '20/12/2013')
      .setValue('input[name="type"]', 'google')
      .setValue('input[name="guests"]', 300)
      .click('button[type="submit"]', () => {
        client
          .pause(5000)
          .verify.elementNotPresent('.error')
          .keys(client.Keys.ESCAPE);
      })
      .pause(500);
  },

  'User should see listing of all events he/she added': (client) => {
    client
      .url('http://localhost:3000/user/events')
      .verify.urlContains('events')
      .waitForElementPresent('.title_text', 5000)
      .verify.containsText('span.title_text', 'google1')

      .pause(500);
  },
  'User should be able to update and view updated event ': (client) => {
    client
      .url('http://localhost:3000/user/events')
      .verify.urlContains('events')
      .waitForElementPresent('.title_text', 5000)
      .click('#rgoogle1')
      // .verify.urlContains('26')
      .waitForElementPresent('form', 5000)
      .verify.elementPresent('form')
      .clearValue('input[name="title"]')
      .setValue('input[name="title"]', 'google2')
      .click('button[type="submit"]', () => {
        client
          .pause(5000)
          .verify.elementNotPresent('.error')
          .keys(client.Keys.ESCAPE)
          .url('http://localhost:3000/user/events')
          .waitForElementPresent('.title_text', 5000)
          .verify.containsText('span.title_text', 'google2');
      })
      .pause(500);
  },
  'User should be able to delete one of their event ': (client) => {
    client
      .url('http://localhost:3000/user/events')
      .waitForElementPresent('.title_text', 5000)
      .verify.elementPresent('#rgoogle2')
      .click('#google2')
      .waitForElementPresent('#modal1', 5000)
      .click('.test2')
      .pause(3000)
      .url('http://localhost:3000/user/events')
      .verify.elementNotPresent('#google2')

      .pause(500);
  },

  'Admin user should be able to add a new center ': (client) => {
    client
      .url('http://localhost:3000/user/admin')
      .click('.add')
      .verify.elementPresent('form')
      .verify.containsText('h4', 'Add a Center!')
      .setValue('input[name="name"]', 'emTest')
      .setValue('input[name="location"]', '24 airport road, lagos state.')
      .setValue('input[name="capacity"]', 4000)
      .setValue('input[name="price"]', 750)
      .setValue('textarea', 'awesome place to host all manner of functions')
      .click('button[type="submit"]', () => {
        client
          .pause(5000)
          .verify.elementNotPresent('.error')
          .keys(client.Keys.ESCAPE)
           .keys(client.Keys.ESCAPE);
      })
      .pause(500);
  },
  'return error if name field less than 4 characters ': (client) => {
    client
      .url('http://localhost:3000/user/admin')
      .click('.add')
      .verify.elementPresent('form')
      .setValue('input[name="name"]', 'em')
      .setValue('input[name="location"]', '24 airport road, lagos state.')
      .setValue('input[name="capacity"]', 4000)
      .setValue('input[name="price"]', 750)
      .setValue('textarea', 'awesome place to host all manner of functions')
      .click('button[type="submit"]', () => {
        client
          .pause(5000)
          .verify.elementPresent('.error')
          .verify.containsText('#err_msg', 'name must be atleast 4 characters long');
      })
      .pause(500);
  },
  'admin user should be able to update center': (client) => {
    client
      .url('http://localhost:3000/user/admin')
      .waitForElementPresent('.update', 15000)
      .assert.elementPresent('.update')
      .click('.update')
      .pause(3000)
      .assert.urlContains('edit')
      .verify.elementPresent('form')
      .clearValue('input[name="name"]')
      .setValue('input[name="name"]', 'Rozinberg')
      .click('button[type="submit"]', () => {
        client
          .pause(5000)
          .verify.elementNotPresent('.error')
          .keys(client.Keys.ESCAPE)
          .url('http://localhost:3000/user/admin')
          .waitForElementPresent('.card-title', 5000)
          .verify.containsText('.card-title', 'Rozinberg');
      })
      .pause(500);
  },
};
