# Part 8: End-to-End Testing

## Testing the API Server

Many companies rely on end-to-end testing using Selenium to test their
backend. One of the advantages of moving to Angular on the front end, however,
is that the backend can be simplified to only provide a data API. This allows
running integration tests of the backend by driving the API via HTTP. This can
be done using Mocha together with a libraries such as `supertest`.

Let's put the following test into `server/testing/e2e/api-test.js`:

```javascript
  'use strict';

  var querystring = require('querystring');
  var request = require('supertest');
  var expect = require('chai').expect;
  var Q = require('q');

  describe('api', function () {
    var server;

    beforeEach(function () {
      server = request('http://ngcourse.herokuapp.com');
    });

    it('should return a 404 on a wrong endpoint', function (done) {
      return server
        .get('/api/foo')
        .expect(404)
        .end(done);
    });

  });
```

We can now run the test using:

```bash
    gulp api-test
```

This test makes a call to a non-existent endpoint and verifies that it gets
back a 404.

We can now have the test make a call to a real endpoint and verify that it
gets the expected results:

```javascript
  it('should get 3 tasks', function (done) {
    return server
      .get('/api/v1/tasks')
      .expect(200)
      .end(function(err, res) {
        var body = JSON.parse(res.text);
        expect(body.length).to.equal(2);
        done(err);
      });
  });
```

Note that that we are using "done" to allow for asynchronous tests, since
`supertest` relies on callbacks. However, with a little bit of work we can
wrap supertest in a function that would allow us to return promises to mocha.

## Protractor and Selenium

If we want to do true end-to-end testing, engaging the client and the server
at the same time, we can do so using Selenium and Protractor.

We'll be using rangle-gulp (install version 0.0.7) to run protractor, but we'll need to have selenium installed. For that, we'll need to install protractor first.

```bash
  sudo npm install -g protractor
  sudo webdriver-manager update --standalone
  sudo webdriver-manager start
```

This starts selenium on port 4444.

## Writing a Simple Test

```javascript
  describe('localhost', function() {
    it('should allow login', function() {
      var displayName;
      browser.get('http://localhost:8080/');
      element(by.model('loginForm.username')).sendKeys('alice');
      element(by.model('loginForm.password')).sendKeys('x');
      element(by.id('login-button')).click();
      displayName = element(by.binding('main.user.data.displayName')).getText();
      expect(displayName).toEqual('Alice');
    });
  });
```

Note: we'll be using Jasmine in this case.

## Running the Test

Our protractor config:

```javascript
  exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub'
  }
```

We'll configure our protractor task as follows:

```javascript
  gulp.task('protractor', rg.protractor({
    files: [
      'client/testing/scenarios/*.scenario.js'
    ]
  }));
```

Now we can run our test:

```bash
  gulp protractor
```

## Running Protractor Interactively

```bash
  node node_modules/rangle-gulp/node_modules/gulp-protractor/node_modules/protractor/bin/elementexplorer.js http://localhost:8080/
```

## Debugging

Add this to the test code:

```javascript
  browser.debugger();
```

In the console:

```javascript
  window.clientSideScripts.findByModel('login.Username');
```

## More Locators

```javascript
  var tasks = element.all(by.repeater('task in taskList.tasks'));
  expect(tasks.count()).toEqual(3);

  var owners = element.all(by.binding('task.owner'));
  expect(owners.count()).toEqual(3);
```

## Using Protractor Instance

```javascript
  var ptor = protractor.getInstance();
  var button = by.id('login-button');

  expect(ptor.isElementPresent(button)).toBe(true);
  expect(element(button).isDisplayed()).toBe(true);

```