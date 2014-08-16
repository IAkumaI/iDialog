# iDialog AngularJS module

Modal windows with AngularJS. It's very easy to use!
More examples and documentation you can found on gh-pages: [http://iakumai.github.io/iDialog](http://iakumai.github.io/iDialog)

## Installation

### Bower

```bower install idialog```

iDialog requires only `angular` version 1.2.0 or greater

### Manual

First, you must add AngularJS scripts to your page:

```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min.js"></script>

<!-- Animation scripts are not required, but otherwise you will not see animations -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-animate.min.js"></script>
<link rel="stylesheet" href="//cdn.jsdelivr.net/animatecss/3.2.0/animate.css"/>
```

```html
<script src="/src/js/idialog.js"></script>
<link rel="stylesheet" href="/src/css/style.css">
```

## Usage

Include ```idialog``` module to your Angular application. Add ```idialog``` directive to any element in application and create a template. Example:

``` html
<a href="" idialog="tpl-name">Show dialog</a>
...
<script type="text/ng-template" id="tpl-name">
    This is a dialog content.
</script>
```

### iDialog events

Since version 0.2 you can set ID for dialog and catch show/hide events in `$scope`. Example:

``` html
<a href="" idialog="tpl-name" idialog-id="someid">Show dialog</a>

<script type="text/ng-template" id="tpl-name">
    This is a dialog content.
</script>
```

Somewhere in your Angular code:
```js
$scope.$on('iDialogShow', function(e, dialogId) {
   console.log('Show: ', dialogId);
});

$scope.$on('iDialogHide', function(e, dialogId) {
    console.log('Hide: ', dialogId);
});
```