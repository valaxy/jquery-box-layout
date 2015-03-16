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


# Introduction
## SimpleView
	{
	    _schema: 'simple',     // type string
	    flex: 1,               // or '10px', number:flex, string:width
	    selector: '.box',      // detach the dom
		className: 'my-simple' // add class to dom
	}

## LinearLayout
	{
		_schema: 'linear',      // type string
		flex: 2,	
		direction: 'column',    // or 'row'
		className: 'my-linear', 
		views: [...]            // view configs contained in dom
	}

- getViewAt
- appendView
- addViewAt
- removeViewAt



Third, check the dom use css to beautify page.
