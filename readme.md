> This is under development, and don't finish

# Introduction
box-layout is like below, you can easily config a json to create this layout.    
It is a AMD module
![ ](doc/basic.png)

# Example
First, create a html(below is jade code) like this.

```jade
div.everything
	div.box0
    	h1 A
    div.box1
        h1 B
    div.box2
        h1 C
    div.box3
        h1 D
```
Second, config a json object to apply box layout.

```javascript
var boxLayout = require('./src/box-layout')
var $dom = boxLayout.init({
	_schema: 'linear',
	isHor: false,
	boxes: [{
		_schema: 'box',
		size: 100,
		domSelector: '.box0'
	}, {
		_schema: 'linear',
		isHor: true,
		size: 'auto',
		boxes: [{
			_schema: 'linear',
			isHor: false,
			size: 300,
			boxes: [{
				_schema: 'box',
				size: 200,
				domSelector: '.box1'
			}, {
				_schema: 'box',
				size: 'auto',
				domSelector: '.box2'
			}]
		}, {
			_schema: 'box',
			size: 'auto',
			domSelector: '.box3'
		}]
	}]
})

$('.everything').append($dom)
```

Third, check the dom use css to beautify page.