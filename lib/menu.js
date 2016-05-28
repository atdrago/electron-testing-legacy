'use strict';

var electron      = require('electron');
var app           = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Menu          = electron.Menu;

var electronWindow = require('electron-window');

var MENU_SEPARATOR = { type: 'separator' };

module.exports = {
	init: function () {
		this.createMenu();
	},
	
	createMenu: function () {
		function makeBackgroundRed() {
			var redJs = 'document.body.style.backgroundColor = "red"';
			
			BrowserWindow.getFocusedWindow().webContents.executeJavaScript(redJs);
		}
		
		function makeBackgroundGreen() {
			var greenJs = 'document.body.style.backgroundColor = "green"';
			
			BrowserWindow.getFocusedWindow().webContents.executeJavaScript(greenJs);
		}
		
		function makeBackgroundBlue() {
			var blueJs = 'document.body.style.backgroundColor = "blue"';
			
			BrowserWindow.getFocusedWindow().webContents.executeJavaScript(blueJs);
		}
		
		this.template = [
			{
				label: 'Electron Testing',
				submenu: [
					{ label: 'Quit Electron Testing', accelerator: 'CommandOrControl+Q', click: function () { app.quit(); } }
				]
			},
			{
				label: 'File',
				submenu: [
					{ label: 'Close Window', accelerator: 'CommandOrControl+W', role: 'close' },
				]
			},
			{
				label: 'View',
				submenu: [
					{ label: 'Make Background Red', accelerator: 'CommandOrControl+R', click: makeBackgroundRed },
					{ label: 'Make Background Green', accelerator: 'CommandOrControl+G', click: makeBackgroundGreen },
					{ label: 'Make Background Blue', accelerator: 'CommandOrControl+B', click: makeBackgroundBlue },
					MENU_SEPARATOR,
					{ label: 'Toggle DevTools', accelerator: 'Alt+CommandOrControl+I', click: function () { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
				]
			},
			{
				label: 'Window',
				submenu: [
					{ label: 'Minimize', accelerator: 'CommandOrControl+M', role: 'minimize' }
				]
			}
		];
		
		var menu = Menu.buildFromTemplate(this.template);
		Menu.setApplicationMenu(menu);
	}
};
