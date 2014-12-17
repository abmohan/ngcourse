'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function (tasks,$log) {
	var vm = this;
    vm.tasks = [];
    
    tasks.getTasks()
      .then(function(tasks) {
        vm.tasks = tasks;
        vm.numberOfTasks = tasks.length;
      })
      .then(null, $log.error);

    vm.numberOfTasks = 0;
    vm.addTask = function() {
      vm.numberOfTasks += 1;
    };
})
.controller('TaskDetailsCtrl', function ($log,$stateParams) {
	var vm = this;
	vm.taskId= $stateParams._id;
});