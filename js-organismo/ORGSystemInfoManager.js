/**
 * Created by jongabilondo on 09/11/2017.
 */


class ORGSystemInfoManager {

    constructor(scene) {
        this._scene = scene;
        //this._lastUpdateTime = null;
        this._enabled = false;
        //this._updateInterval = 60000; // ms
        this._waitingForResponse = false;
        this._lastsSystemInfo = null;
    }

    start() {
        if (ORG.deviceController) {
            this._lastsSystemInfo = null;
            this._create3DCPUUsageBarChart();
            this._enabled = true;
        }
    }

    stop() {
        if (this._enabled) {
            this._enabled = false;
            this._lastsSystemInfo = null;

            this._remove3DBattery();
            this._remove3DMemoryChart();
            this._remove3DDiskChart();
            this._remove3DCPUUsageBarChart();
        }
    }

    update() {
        if (this._enabled) {
            if (this._lastsSystemInfo) {
                this._updateCharts(this._lastsSystemInfo);
                this._waitingForResponse = false;
                this._lastsSystemInfo = null;
            }
            if (this._needsUpdate()) {
                this._requestSystemInfo();
            }
        }

    }

    dataUpdate(systemInfoData) {
        // prepare for update() to do the chart update.
        if (this._enabled) {
            this._lastsSystemInfo = systemInfoData;
        }
    }

    // PRIVATE

    _requestSystemInfo() {
        if (ORG.deviceController && ORG.deviceController.hasSystemInfo) {
            ORG.deviceController.requestSystemInfo();
            this._waitingForResponse = true;
        }
    }

    _updateCharts(systemInfoData) {
        this._remove3DBattery();
        this._create3DBattery(systemInfoData);
        this._remove3DMemoryChart();
        this._create3DMemoryChart(systemInfoData);
        this._remove3DDiskChart();
        this._create3DDiskChart(systemInfoData);
        this._update3DCPUUsageBarChart(systemInfoData);

    }

    _create3DBattery(batteryData) {
        this._battery = new ORG3DBattery(0.005, 0.03, batteryData.BatteryLevel / 100.0);
        this._battery.position = new THREE.Vector3(-0.05, 1.45, 0);
        this._scene.THREEScene.add(this._battery.THREEModel);
    }

    _remove3DBattery() {
        if (this._battery) {
            this._scene.THREEScene.remove(this._battery.THREEModel);
            this._battery = null;
        }
    }

    _create3DMemoryChart(memoryData) {
        this._memoryChart = new ORG3DMemoryChart(memoryData);
        this._memoryChart.position = new THREE.Vector3(0.065, 1.45, 0);
        this._scene.THREEScene.add(this._memoryChart.THREEModel);
    }

    _remove3DMemoryChart() {
        if (this._memoryChart) {
            this._scene.THREEScene.remove(this._memoryChart.THREEModel);
            this._memoryChart = null;
        }
    }

    _create3DDiskChart(diskData) {
        this._diskChart = new ORG3DDiskChart(diskData);
        this._diskChart.position = new THREE.Vector3(0.065, 1.50, 0);
        this._scene.THREEScene.add(this._diskChart.THREEModel);
    }

    _remove3DDiskChart() {
        if (this._diskChart) {
            this._scene.THREEScene.remove(this._diskChart.THREEModel);
            this._diskChart = null;
        }
    }

    _create3DCPUUsageBarChart() {
        this._cpuUsageChart = new ORG3DCPUUsageBarChart(new THREE.Vector3(0.002, 0.03, 0.002));
        this._cpuUsageChart.position = new THREE.Vector3(0.065, 1.52, 0);
        this._scene.THREEScene.add(this._cpuUsageChart.THREEModel);
    }

    _remove3DCPUUsageBarChart() {
        if (this._cpuUsageChart) {
            this._scene.THREEScene.remove(this._cpuUsageChart.THREEModel);
            this._cpuUsageChart = null;
        }
    }

    _update3DCPUUsageBarChart(cpuData) {
        if (this._cpuUsageChart) {
            this._cpuUsageChart.usageUpdate(cpuData);
        }
    }

    _needsUpdate() {
        return (this._enabled && !this._waitingForResponse);
    }

}