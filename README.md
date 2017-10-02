# Fibaro Pro App for Homey
This app adds support for Fibaro devices in Homey on the new SDKv2 Platform and the Mesh Driver

## Supported devices with most common parameters:
* FGD-211, Dimmer
* FGD-212, Dimmer 2
* FGFS-101, Flood Sensor
* FGFS-101-PLUS, Flood Sensor (Z-Wave Plus)
* FGGC-001, Swipe
* FGK-101, Door/Window Sensor
* FGK-10x, Door/Window Sensor (Z-Wave Plus)
* FGMS-001, Motion Sensor
* FGMS-001-PLUS, Motion Sensor (Z-Wave Plus)
* FGPB-101, Push Button
* FGS-211, Relay Switch
* FGS-212, Relay Switch 2
* FGS-213, Single Switch 2
* FGS-221, Double Relay Switch
* FGS-222, Double Relay Switch 2
* FGS-223, Double Switch 2
* FGSD-002, Smoke Detector (Z-Wave Plus)
* FGSS-001, Smoke Sensor
* FGCD-001, CO Sensor
* FGRGBWM-441, RGBW Controller
* FGWPx-101/102, Wall Plug
* FGWPx-102-PLUS, Wall Plug (Z-Wave Plus)
* FGKF-601, KeyFob (Z-Wave Plus)
* FGDW-002, Door/Window Sensor 2

## Supported devices with some parameters:
* FGR-221, Roller Shutter
* FGRM-222, Roller Shutter 2
* FGR-222, Roller Shutter 2 (v2.5)

## Supported Languages:
* English
* Dutch

## NOTE:
**FGKF-601**
This device has no wake up interval. After changing settings, wake up the device manually (by using the exclusion button press sequence) to store them on the device.

**FGS-2xx Devices:**  
Main Device = Also Relay/Switch 1 (S1/Q1)  
Relay/Switch 2 = Relay/Switch 2 (S2/Q2)

**FGS-223:**  
Scene cards only triggers with the "Main Node" as device.  
The "Right Switch (S2)" as device doesn't work.

**FGPB-101:**  
When the app has just started, it can take up to 2 minutes before it reacts.  
If it takes longer you (probably) need to restart your homey.

## Change Log:

### v 2.0.0

The new way of controlling Fibaro on Homey   

