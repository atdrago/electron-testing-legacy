'use strict';

var Application = require('spectron').Application;

var APP_PATH = './dist/Electron Testing-darwin-x64/Electron Testing.app/Contents/MacOS/Electron Testing';

describe('View', function () {
	var app = new Application({
		path: APP_PATH,
		env: {
			ELECTRON_ENABLE_LOGGING: true,
			ELECTRON_ENABLE_STACK_DUMPING: true,
			NODE_ENV: 'development'
		}
	});
	
	this.timeout(60000);
	
	beforeEach(function () {
		return app.start();
	});

	afterEach(function () {
		if (app && app.isRunning()) {
			return app.stop();
		}
	});
	
	it('> Make Background Red', function () {
		return app.client.waitUntilWindowLoaded()
			.then(function () { return app.electron.ipcRenderer.send('test-red'); })
			.then(function () { 
				return app.client.waitUntil(function () {
					return app.client.getCssProperty('//body', 'background-color')
						.then(function (style) {
							return style.value === 'rgba(255,0,0,1)';
						});
				});
			});
	});
	
	it('> Make Background Green', function () {
		return app.client.waitUntilWindowLoaded()
			.then(function () { return app.electron.ipcRenderer.send('test-green'); })
			.then(function () { 
				return app.client.waitUntil(function () {
					return app.client.getCssProperty('//body', 'background-color')
						.then(function (style) {
							return style.value === 'rgba(0,128,0,1)';
						});
				});
			});
	});
	
	it('> Make Background Blue', function () {
		return app.client.waitUntilWindowLoaded()
			.then(function () { return app.electron.ipcRenderer.send('test-blue'); })
			.then(function () { 
				return app.client.waitUntil(function () {
					return app.client.getCssProperty('//body', 'background-color')
						.then(function (style) {
							return style.value === 'rgba(0,0,255,1)';
						});
				});
			});
	});
});
