# jQuery Track Events

This is a simple plugin that allows you to track events in Google Analytics just by adding a data attribute to the element you want to track.

## Usage

First, you must include jQuery library in your `<head>` or just before the close of your `<body>`. Then, include this plugin after loading the jQuery library.

Next, go through your markup and add a data-attribute (track-event by default) to each element you would like to track. The value of the attribute should be a comma separated string that includes: 'category, action, label, value.' Label and value are optional.

Finally, you need to initialize the script to begin tracking events.

```javascript
$(document).ready(funtion() {
	$('[data-track-event]').trackEvents({
		dataAttr: 'track-event',
		addGA: true,
		uid: 'UA-NNNNNN-N'
	});
});
```