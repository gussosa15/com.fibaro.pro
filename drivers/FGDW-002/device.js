'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FGDW-002 extends ZwaveDevice {
	onMeshInit() {
		//this.enableDebug();
		//this.printNode();
		this.registerCapability('alarm_contact', 'NOTIFICATION');
		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');
	}
}
module.exports = FGDW-002;
