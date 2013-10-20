/**
 * Created by matthias on 10/13/13.
 */

angular.module('objectify.objects_directive', [])
    .directive('addFormField', function () {
        return {
            restrict: 'E',
            template: '<input type="text" ng-model="newFieldName" />' +
                      '<select ng-model="selected_type" ng-options="f.name for f in field_types"></select>' +
                      '<button class="btn btn-success" ng-click="addFormField(newFieldName)">Add</button>',
            link: function (scope, elem, attrs) {
                scope.fields = [];
                scope.field_types = [
                    { name: 'Checkbox', type: 'checkbox' },
                    { name: 'Radio', type: 'radio'},
                    { name:'Text', type: 'text'}
                ];

                scope.selected_type = scope.field_types[0];

                scope.addFormField = function(newFieldName) {
                    scope.fields.push( {name: newFieldName, type: scope.selected_type.type});
                    console.log(scope.fields);
                };
            }
        }
    });