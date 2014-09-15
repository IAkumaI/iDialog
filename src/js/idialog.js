/**
 * iDialog main module
 */
angular.module('idialog', [])
/**
 * Init default templates
 */
    .run(['$templateCache', 'idialogWindowTpl', function($templateCache, idialogWindowTpl) {
        $templateCache
            .put(idialogWindowTpl, '<div class="idialog animated ng-hide" ng-show="visible">'
                + '<div class="close-btn" ng-click="hide()"></div>'
                + '<div class="w" ng-init="startLoading()"></div>'
                + '</div>');
    }])

/**
 * iDialog window template path
 */
    .value('idialogWindowTpl', 'idialogWindowTpl')

/**
 * $idialog service
 */
    .service('$idialog', ['$compile', '$timeout', '$rootScope', function($compile, $timeout, $rootScope) {
        return function(template, options) {
            options = options || {};

            var $dialog = angular.element('<div idialog-window="' + template + '" class="' + (options['class'] || '') + '"></div>');
            angular.element(document.body).append($dialog);

            $timeout(function() {
                var newScope = $rootScope.$new(true);

                newScope.dialogId = options.dialogId || false;

                $compile($dialog)(newScope);
            });
        };
    }])

/**
 * Button-directive to show dialog
 */
    .directive('idialog', ['$idialog', function($idialog) {
        return {
            restrict: 'A',

            link: function($scope, $element, attrs) {
                $element.on('click', function(e) {
                    e.preventDefault();

                    if (!attrs.idialog) {
                        console.error('Try to show an empty idialog');
                        return;
                    }

                    $idialog(attrs.idialog, {
                        'class': attrs.idialogClass,
                        dialogId: attrs.idialogId
                    });
                });
            }
        }
    }])

/**
 * iDialog window
 */
    .directive('idialogWindow', ['$templateCache', '$timeout', '$compile', '$http', 'idialogWindowTpl', function($templateCache, $timeout, $compile, $http, idialogWindowTpl) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: idialogWindowTpl,
            replace: true,

            link: function($scope, $element, $attrs) {
                $scope.visible = false;
                $scope.loading = false;
                $scope.closed = false;
                $scope.scopeEventsEnabled = !!$scope.dialogId;

                angular.element(document).on('ready', $scope.relocate);
                angular.element(window).on('load', $scope.relocate);
                angular.element(window).on('resize', $scope.relocate);

                $timeout($scope.relocate, 100);

                $scope.$overlay = angular.element('<div class="idialog-overlay ng-hide" ng-show="visible || loading" ng-click="hide()"><s class="l idialog-animation ng-hide" ng-show="loading"></s></div>');
                angular.element(document.body).append($scope.$overlay);
                $compile($scope.$overlay)($scope);

                var dialogTemplate = $attrs.idialogWindow;
                var dialogContent = $templateCache.get(dialogTemplate);
                var applyTemplate = function() {
                    var $w = $element.children('.w');
                    $w.append(dialogContent);
                    $compile($w)($scope);
                    $scope.show();
                };

                if (!dialogContent) {
                    $http({
                        method: 'GET',
                        url: dialogTemplate
                    }).success(function(response) {
                        dialogContent = response;
                        $templateCache.put(dialogTemplate, dialogContent);
                        applyTemplate();
                    }).error(function(response, code) {
                        if (code > 0) {
                            console.error('Error while loading idialog template: ' + dialogTemplate);
                        }
                    });
                } else {
                    applyTemplate();
                }
            },

            controller: ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
                /**
                 * Update dialog position to center or to a window's top
                 */
                $scope.relocate = function() {
                    if (document.body.clientHeight < $element[0].clientHeight) {
                        var doc = document.documentElement, body = document.body;
                        var top = (doc && doc.scrollTop || body && body.scrollTop || 0) + 15;
                        top = parseInt(top, 10) + 'px';

                        var left = document.body.clientWidth > 1000 ? -$element[0].clientWidth / 2 : -$element[0].clientWidth / 2 + 25;
                        left = parseInt(left, 10) + 'px';

                        $element.css({
                            position: 'absolute',
                            marginLeft: left,
                            marginTop: '0px',
                            top: top
                        });
                    } else {
                        var left = document.body.clientWidth > 1000 ? -$element[0].clientWidth / 2 : -$element[0].clientWidth / 2 + 25;
                        left = parseInt(left, 10) + 'px';

                        var top = -$element[0].clientHeight / 2;
                        top = parseInt(top, 10) + 'px';

                        $element.css({
                            position: 'fixed',
                            marginLeft: left,
                            marginTop: top
                        });
                    }
                };

                /**
                 * Show idialog window
                 */
                $scope.show = function() {
                    $scope.visible = true;
                    $scope.loading = false;
                    $scope.relocate();
                    $timeout($scope.relocate);
                    $timeout($scope.relocate, 100);

                    if ($scope.scopeEventsEnabled) {
                        $rootScope.$broadcast('iDialogShow', $scope.dialogId);
                    }
                };

                /**
                 * Hide idialog window
                 */
                $scope.hide = function() {
                    $scope.visible = false;
                    $scope.loading = false;
                    $timeout(function() {
                        $scope.$overlay.remove();
                        $element.remove();
                    }, 3000);

                    if ($scope.scopeEventsEnabled) {
                        $rootScope.$broadcast('iDialogHide', $scope.dialogId);
                    }
                };

                /**
                 * Delayed loading
                 */
                $scope.startLoading = function() {
                    $timeout(function() {
                        if (!$scope.visible && !$scope.closed) {
                            $scope.loading = true;
                        }
                    }, 300);
                }
            }]
        }
    }])
;
