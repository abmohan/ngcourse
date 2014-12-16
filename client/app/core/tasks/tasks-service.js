angular.module('ngcourse.tasks', [])

.factory('tasks', function (server) {
  var service = {};

  service.getTasks = function () {
 	return server.get('/api/v1/tasks');
  };

  service.getMyTasks = function () {
    return service.getTasks()
      .then(function(tasks) {
        return filterTasks(tasks, {
          owner: user.username
        });
      });
  };

  return service;
});