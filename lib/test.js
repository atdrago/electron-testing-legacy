'use strict';

var electron = require('electron');
var ipcMain  = electron.ipcMain;
var menu     = require('./menu');

module.exports = {
	init() {
		/**
		 * Simulate a click on the menu
		 * @param  {array} menuPath The path of menu items to take. ['File', 'Quit']
		 */
		function simulateMenuClick(menuPath) {
			var menuItem;
			
			for (var menuName of menuPath) {
				if (!menuItem) {
					menuItem = menu.template.find(function (item) { return item.label === menuName; });
				} else {
					menuItem = menuItem.submenu.find(function (item) { return item.label === menuName; });
				}
			}
			
			if (menuItem) {
				var enabled = menuItem.enabled;
				var visible = menuItem.visible;
				var click = menuItem.click;
				
				if (enabled !== false && visible !== false && typeof click === 'function') {
					menuItem.click();
				}
			}
		}
		
		ipcMain.on('test-red', function () { simulateMenuClick(['View', 'Make Background Red']); });
		ipcMain.on('test-green', function () { simulateMenuClick(['View', 'Make Background Green']); });
		ipcMain.on('test-blue', function () { simulateMenuClick(['View', 'Make Background Blue']); });
	}
};
