# Multislider Widget

[![Coverage Status](https://coveralls.io/repos/github/Vertumnus/jqm-multislider/badge.svg?branch=master)](https://coveralls.io/github/Vertumnus/jqm-multislider?branch=master)
[![npm](https://img.shields.io/npm/dt/jqm-multislider.svg)](https://www.npmjs.com/package/jqm-multislider)
[![npm](https://img.shields.io/npm/v/jqm-multislider.svg)](https://www.npmjs.com/package/jqm-multislider)
[![npm](https://img.shields.io/npm/l/jqm-multislider.svg)](https://www.npmjs.com/package/jqm-multislider)

This is a widget for jQuery mobile. It is similar to a rangeslider, but it supports mutliple slider handlers.
So you have multiple ranges. In difference to the standard rangeslider the input fields are not shown.

## Preview
![Multislider](preview.png)

## Preconditions
The widget is implemented in ECMAScript 2015, so your project should support
at least this version.
To use the widget of course you need also [jQuery](http://jquery.com) and [jQuery Mobile](http://jquerymobile.com).

## Installation
Installation via npm:
```shell
npm install jqm-multislider
```

Download built file:
* [jqm-multislider.min.js](./bin/jqm-multislider.min.js)

## Integration
Include the JS file right after jQuery JS file and jQuery mobile JS file:
```html
<script src="javascripts/jquery.min.js"></script>
<script src="javascripts/jquery.mobile.min.js"></script>
<script src="javascripts/jqm-multislider.min.js"></script>
```

## Usage
### Definition in your HTML file
Create the multislider by adding the `data-role="multislider"` attribute to a `div`
and provide the number of sliders by specifying `input` tags with type `range` (e.g. three):
```html
<div id="multislider" data-role="multislider">
   <input type="range">
   <input type="range">
   <input type="range">
</div>
```

Per default the multislider has the minimum `0`, the maximum `100`, the step size `1` 
and shows the values of the sliders on the handlers. You can specify these values
as attributes at the `div` tag:
```html
<div id="multislider" data-role="multislider" min="10" max="90" step="10" data-show-value="false">
...
</div>
```

### Options
You have only one functional option.

#### showValue
__Type:__ Boolean

__Default:__ `true`

With this option you can control if the values are shown on the handlers or not.
You can specify it also as the attribute `data-show-value`.
```js
// hide values
$('#multislider').multislider('option', 'showValue', false)
// show values
$('#multislider').multislider('option', 'showValue', true)
```

### Methods
You can use following methods.

#### values
Get all the values of the multislider as an Array.
```js
// get values
var values = $('#multislider').multislider('values')
```

#### value
You can get or set the value of a specific slider on the multislider.
The specified index starts with 0.
```js
// get value of second slider
var value = $('#multislider').multislider('value', 1)

// set value of third slider
$('#multislider').multislider('value', 2, 88)
```

#### count
Get the number of sliders you have on the multislider.
```js
var count = $('#multislider').multislider('count')
```

#### increase
With this method you have the possibility to add a slider to the multislider.
```js
// if you have before three sliders afterwards you will have four
$('#multislider').multislider('increase')
```

__Attention:__
> The multislider widget initializes the values of the sliders using this method.
> It will distribute them even on the slider bar.

#### decrease
With this method you have the possibility to remove a slider from the multislider.
It removes always the last slider.
```js
// if you have before three sliders afterwards you will have two
$('#multislider').multislider('decrease')
```

__Attention:__
> The multislider widget initializes the values of the sliders using this method.
> It will distribute them even on the slider bar.

## Behavior
You cannot move a slider over its neighbor slider. There is always a difference of one step.
Same is valid for the minimum. So your minimum is 0 then the first slider can have
at least only the value 1 (assuming step size 1). But you can move the last slider to the
maximum value.

## Background Story
I decided to realize this multislider widget to provide a simple method of grouping.
So I have a set of objects and want to group them individually (different number of groups
with different number of included objects).

## Example
See the [manual test HTML page](./test/multislider.man.html) to get an idea how it works.

## License
MIT