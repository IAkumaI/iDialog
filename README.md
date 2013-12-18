# iDialog AngularJS module

Module help you to show any content in a modal window. It's very easy to use!

More examples and documentation you can found on gh-pages: [http://iakumai.github.io/iDialog](http://iakumai.github.io/iDialog)

## Installation

### Bower

```bower install idialog```

### Manual

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
