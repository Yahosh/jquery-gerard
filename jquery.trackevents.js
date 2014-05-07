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
			dataAttr: 'track-event',
			addGA: true,
			uid: 'UA-NNNNNN-N'
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
		// add GA code if not yet in DOM
		if ( this.options.addGA === true && !window.ga) {
			this.addGA();
		}

		// on click send a tracking event based on element's data attributes
		$(this.element).on('click', this.trackEvent);

		// TODO: if social media like/share use their tracking code
	};

	Plugin.prototype.addGA = function (i, s, o, g, r, a, m) {
		var i = i || window,
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
		window.ga('create', this.options.uid);
		window.ga('send', 'pageview');
	};

	Plugin.prototype.trackEvent = function () {
		var $el = $(this),
			url = $el.attr("href"),
			data = $el.data(this.options.dataAttr).split(",");

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