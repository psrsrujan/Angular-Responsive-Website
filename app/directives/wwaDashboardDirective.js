/*"use strict";

angular.module('app').directive('wwaDashboard', [function () {
    return {
        scope: {
        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {

            scope.title = 'My First Dashboard';

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: false
            };

            scope.widgets = [
                {
                    title: 'Temperature',
                    sizeX: 3,
                    sizeY: 3,
                    row: 0,
                    col: 0,
                    template: '<wwa-temperature></wwa-temperature>'
                  //  widgetSettings: {
                  //      id: 1000
                  //  }
                }

            ];
        }
    }
}]);*/




'use strict';

angular.module('app').directive('wwaDashboard',
    ['$localStorage',
        function ($localStorage) {
            return {
                scope: {},
                template: '<ps-dashboard></ps-dashboard></h1>',
                link: function (scope) {

                    scope.title = 'Dashboard';

                    scope.gridsterOpts = {
                        columns: 12,
                        margins: [20, 20],
                        mobileBreakPoint: 600,
                        mobileModeEnabled: true,
                        outerMargin: false,
                        pushing: true,
                        floating: true,
                        swapping: false
                    };

                    scope.widgetDefinitions = [
                        {
                            title: 'Temperature',
                            settings: {
                                sizeX: 3,
                                sizeY: 3,
                                minSizeX: 3,
                                minSizeY: 3,
                                template: '<wwa-temperature></wwa-temperature>',
                                widgetSettings: {
                                    id: 1000,
                                    templateUrl: 'app/dialogs/wwwSelectLocationTemplate.html',
                                    controller: 'wwaSelectLocationController'
                                }
                            }
                        },
                        {
                            title: 'Inventory',
                            settings: {
                                sizeX: 5,
                                sizeY: 3,
                                minSizeX: 5,
                                minSizeY: 3,
                                template: '<wwa-inventory></wwa-inventory>',
                                widgetSettings: {
                                    id: 1002,
                                    templateUrl: 'app/dialogs/wwwSelectLocationTemplate.html',
                                    controller: 'wwaSelectLocationController'
                                }
                            }
                        },
                        {
                            title: 'Employee',
                            settings: {
                                sizeX: 4,
                                sizeY: 3,
                                minSizeX: 4,
                                minSizeY: 3,
                                template: '<wwa-employee></wwa-employee>',
                                widgetSettings: {
                                    id: 5001,
                                    templateUrl: 'app/dialogs/wwwSelectEmployeeTemplate.html',
                                    controller: 'wwaSelectEmployeeController'
                                }
                            }
                        }
                    ];

                    //load any widgets that have been saved to local storage or instantiate
                    //an empty array if local storage does not have any saved widgets
                    scope.widgets = $localStorage.widgets || [];

                    //if there are no widgets initialize one of each type of widget
                    if (scope.widgets.length === 0) {
                        scope.widgets.push(scope.widgetDefinitions[0].settings);
                        scope.widgets.push(scope.widgetDefinitions[1].settings);
                        scope.widgets.push(scope.widgetDefinitions[2].settings);
                    }

                    //watch for changes to the widgets and store them locally
                    scope.$watch('widgets', function () {
                        $localStorage.widgets = scope.widgets;
                    });

                }
            };
        }
    ]
);