/*
 *  Project: Track Events
 *  Description: Tracks events in Google Analytics based on the targeted element's data attribute
 *  Author: Josh Lawrence
 *  License: MIT
 */

;(function($, window, document, undefined) {

	// Defaults
	var pluginName = 'trackEvents',
		defaults = {
			attrName: 'track-event',
			addGA: true,
			gaid: 'UA-NNNNNN-N'
		};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {
		var self = this;

		// add GA code if not yet in DOM
		if ( this.options.addGA === true && !window.ga) {
			this.addGA(self.options);
		}

		// on click send a tracking event based on element's data attributes
		$(this.element).on('click', function () {
			self.trackEvent(self.options);
		});
	};

	Plugin.prototype.addGA = function (options, i, s, o, g, r, a, m) {
		var options = options || {},
			i = i || window,
			s = s || document,
			o = o || 'script',
			g = g || '//www.google-analytics.com/analytics.js',
			r = r || 'ga';

		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function() {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);

		/**
		 * Set up GA account and log pageview
		 */
		window.ga('create', options.gaid);
		window.ga('send', 'pageview');
	};

	Plugin.prototype.trackEvent = function (options) {
		var $el = $(this.element),
			url = $el.attr("href"),
			data = $el.data(options.attrName);

		// If the data attribute isn't present, stop
		if ( !data ) {
			return false;
		}

		// Turn the data string into an array
		data = data.split(",");

		// Trim whitespace from data
		$.each(data, function (i) {
			data[i] = this.trim(data[i]);
		});

		// Push data: category, action, label (if link then href else another value), value (number)
		window.ga( 'send', 'event', data[0], data[1], (url || data[2]), data[3] );

		// If active link, delay so we can capture event then follow it
		// http://support.google.com/analytics/bin/answer.py?hl=en&answer=1136920
		if (url) {
			setTimeout(function() {
				return true;
			}, 100);
		}
	};

	// Define the plugin
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	}

}(jQuery, window, document));