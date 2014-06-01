# View Change Module

By [Jamie Kowalski](https://github.com/jamiekowalski/web-snippets/)

A simple module for navigating bewteen a set of pages using AJAX. Requires [jQuery](http://jquery.com) and the [jQuery Hash-change plugin](https://github.com/cowboy/jquery-hashchange).

## Usage

```
var vc = ViewChange({
  linkURLs: [
    'about',
    'work',
    'contact'
  ],
  defaultExtension: '.htm'
})

```

The only required option is linkURLs (an array of filenames, optionally with extension). See code for further options.
