'use strict';

angular.module('ngcourse', [
  'ngcourse.main-ctrl',
  'ngcourse.tasks',
  'ngcourse.users',
  'ngcourse.router',
  'koast'
])

.constant('API_BASE_URL', 'http://ngcourse.herokuapp.com')

.run(function ($log, koast, API_BASE_URL) {
  $log.info('All ready!');

  koast.init({
    baseUrl: API_BASE_URL
  });
  koast.setApiUriPrefix('/api/v2/');
  koast.addEndpoint('tasks', ':_id', {
    useEnvelope: true
  });
  koast.addEndpoint('users', ':_id', {
    useEnvelope: true
  });
});