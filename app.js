'use strict';

const Homey = require('homey');

class FibaroZwave extends Homey.App {

	onInit() {

		this.log('Fibaro Z-wave app is running...');

	}

}

module.exports = FibaroZwave;
