# jQuery Gerard

A simple plugin that allows you to track events in Google Analytics like you're Samuel Gerard.

## Usage

### Include the script
First, you must include jQuery library in your `<head>` or just before the close of your `<body>`. Then, include this plugin after loading the jQuery library.

```html
<!-- Load jQuery -->
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<!-- Load jSharey plugin -->
<script src="jquery.gerard.js"></script>
```

### Add data to your markup
Next, go through your markup and add a `data-track-event` data-attribute to each element you would like to track. The value of the attribute should be a comma separated string that includes: `"category, action, label, value"`.

### Initialize the plugin
Finally, you need to initialize the plugin to begin tracking events.

```javascript
$(document).ready(funtion() {
	$('[data-track-event]').gerard({
		attrName: 'track-event',
		addGA: true,
		gaid: 'UA-NNNNNN-N'
	});
});
```

That's it! Have fun tracking down events like [Samuel Gerard](http://www.imdb.com/character/ch0003750/?ref_=tt_cl_t2).
