# iDialog AngularJS module

Module to show any content in a simple popup windows with AngularJS.

It's realy simple!
Include **/src/js/idialog.js** and **/src/css/style.css** to your page.
Add **idialog** module to application.
And add **idialog** attribute to any tag with a template name as value.
Create ng-template with a content.

Don't forget include AngularJS.

Example:

``` html
<link rel="stylesheet" href="/src/css/style.css">
<script src="/src/js/idialog.js"></script>
...
<a href="" idialog="tpl-name">Show dialog</a>
...
<script type="text/ng-template" id="tpl-name">
    This is a dialog content.
</script>
```

More examples and documentation you can found on gh-pages: [http://iakumai.github.io/iDialog](http://iakumai.github.io/iDialog)
