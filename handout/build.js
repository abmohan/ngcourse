var marked = require('marked');
var fs = require('fs');
var highlightjs = require('highlight.js');
var typogr = require('typogr');

var parts = [
  '00-setup.md',
  '01-introduction.md',
  '02-toolchain.md',
  '03-javascript.md',
  '04-controllers.md',
  '05-rest-apis.md',
  '06-promises.md',
  '07-services.md',
  '08-advanced-promises.md',
  '09-unit-testing-services.md',
  '11-ui-router.md',
  '12-directives.md',
  '13-advanced-form-validation.md',
  '14-authentication.md',
  '15-providers.md',
  '16-integration-testing.md',
  '17-unit-testing-controllers-and-directives.md',
  '20-gulp.md',
  '21-sublime.md'
];

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

var buffer = fs.readFileSync('header.html', 'utf8');
buffer = buffer.replace('{{date}}', new Date().toLocaleDateString());

parts.forEach(function(filePath) {
  var markdownString = fs.readFileSync(filePath, 'utf8');
  buffer += marked(markdownString);
});

buffer += '</body></html>';
buffer = buffer.replace(/&quot;/g, '"');
buffer = buffer.replace(/&#39;/g, '\'');

buffer = typogr(buffer).typogrify();

console.log(buffer);
