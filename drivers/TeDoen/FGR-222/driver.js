'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/492

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		windowcoverings_state: {
			command_class: 'COMMAND_CLASS_SWITCH_BINARY',
			command_get: 'SWITCH_BINARY_GET',
			command_set: 'SWITCH_BINARY_SET',
			command_set_parser: (value, node) => {
				let invertDirection = false;
				if (node.hasOwnProperty('settings') && node.settings.hasOwnProperty('invert_direction')) {
					invertDirection = node.settings.invert_direction;
				}

				let result = 'off/disable';
				// Check correct counter value in case of idle
				if (value === 'idle') {
					if (node.state.position === 'on/enable') result = 'off/disable';
					else if (node.state.position === 'off/disable') result = 'on/enable';
				}
				if (value === 'up') {
					if (invertDirection) result = 'off/disable';
					else result = 'on/enable';
				}
				if (value === 'down') {
					if (invertDirection) result = 'on/enable';
					else result = 'off/disable';
				}

				// Save latest known position state
				if (node && node.state) {
					node.state.position = result;
				}

				return {
					'Switch Value': result,
				};
			},
			command_report: 'SWITCH_BINARY_REPORT',
			command_report_parser: (report, node) => {
				let invertDirection = false;
				if (node.hasOwnProperty('settings') && node.settings.hasOwnProperty('invert_direction')) {
					invertDirection = node.settings.invert_direction;
				}

				// Save latest known position state
				if (node && node.state) {
					node.state.position = report.Value;
				}

				switch (report.Value) {
					case 'on/enable':
						if (invertDirection) return 'down';
						return 'up';
					case 'off/disable':
						if (invertDirection) return 'up';
						return 'down';
					default:
						return 'idle';
				}
			},
		},
		dim: {
			command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			command_get: 'SWITCH_MULTILEVEL_GET',
			command_set: 'SWITCH_MULTILEVEL_SET',
			command_set_parser: (value, node) => {
				let invertDirection = false;
				if (node.hasOwnProperty('settings') && node.settings.hasOwnProperty('invert_direction')) {
					invertDirection = node.settings.invert_direction;
				}

				if (value >= 1) {
					if (invertDirection) value = 0;
					else value = 0.99;
				}
				if (invertDirection) {
					return {
						'Value': (1 - value.toFixed(2)) * 100,
						'Dimming Duration': 'Factory default',
					};
				}
				return {
					'Value': value * 100,
					'Dimming Duration': 'Factory default',
				};
			},
			command_report: 'SWITCH_MULTILEVEL_REPORT',
			command_report_parser: (report, node) => {
				let invertDirection = false;
				if (node.hasOwnProperty('settings') && node.settings.hasOwnProperty('invert_direction')) {
					invertDirection = node.settings.invert_direction;
				}

				if (typeof report['Value (Raw)'] === 'undefined') return null;
				if (invertDirection) return (100 - report['Value (Raw)'][0]) / 100;
				return report['Value (Raw)'][0] / 100;
			},
		},
		measure_power: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get: 'SENSOR_MULTILEVEL_GET',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => report['Sensor Value (Parsed)'],
		},
	},
	settings: {
		reports_type: {
			index: 3,
			size: 1,
		},
		operating_mode: {
			index: 10,
			size: 1,
		},
		switch_type: {
			index: 14,
			size: 1,
		},
		power_level_change: {
			index: 40,
			size: 1,
		},
		periodic_power_level_reports: {
			index: 42,
			size: 2,
			signed: false,
		},
		start_calibration: {
			index: 29,
			size: 1,
		},
		invert_direction: (newValue, oldValue, deviceData) => module.exports.nodes[deviceData.token].settings.invert_direction = newValue
	},
});
