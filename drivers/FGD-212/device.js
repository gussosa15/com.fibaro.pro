'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FGD-212 extends ZwaveDevice {
	onMeshInit() {
		//this.enableDebug();
		//this.printNode();
		this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL');
		this.registerCapability('measure_power', 'SENSOR_MULTILEVEL');
		this.registerCapability('meter_power', 'METER');
	}
}
module.exports = FGD-212;
