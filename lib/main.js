'use strict';

var app = require('electron').app;

var electronWindow = require('electron-window');
var menu           = require('./menu');
var path           = require('path');

app.on('ready', function () {
	menu.init();
	
	var _window = electronWindow.createWindow({
		width: 600,
		height: 600
	});
		
	_window.showUrl(path.resolve(__dirname, '../view/index.html'));
	
	if (process.env.NODE_ENV === 'development') {
		require('./test').init();
	}
});
