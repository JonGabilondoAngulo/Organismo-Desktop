
var gulp = require('gulp')
    , concat = require('gulp-concat')
    , rename = require('gulp-rename')
    , babel = require('gulp-babel')
    , del = require('del')
    //    gp_uglify = require('gulp-uglify-es').default
;

const sources = [
    'js-third-party/three.js/build/three.min.js',
    'js-third-party/three.js/examples/js/controls/OrbitControls.js',
    'js-third-party/three.js/examples/js/controls/TransformControls.js',
    'js-third-party/KeyboardState.js',
    'js-third-party/math.min.js',
    'js-third-party/three.js/examples/js/loaders/MTLLoader.js',
    'js-third-party/three.js/examples/js/loaders/OBJLoader.js',
    'js-third-party/three.js/examples/js/libs/tween.min.js',
    'js-third-party/bootstrap-slider/bootstrap-slider.min.js',
    'js-third-party/patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js',
    'js-third-party/dist.js',
    'js-third-party/epoly.js',
    'js-organismo/ORG.Namespaces.js',
    'js-organismo/ORG.Constants.js',
    'js-organismo/ORG.DeviceMetrics.js',
    'js-organismo/ORGError.js',
    'js-organismo/ORGWebSocket.js',
    'js-organismo/ORGScenario.js',
    'js-organismo/ORGDeviceConnection.js',
    'js-organismo/ORG3DUITreeModel.js',
    'js-organismo/ORGMouseListener.js',
    'js-organismo/ORG3DUIElementHighlight.js',
    'js-organismo/ORGTooltip.js',
    'js-organismo/ORG3DScene.js',
    'js-organismo/ORGMessageBuilder.js',
    'js-organismo/ORGContextMenuManager.js',
    'js-organismo/ORGUITreeContextMenuManager.js',
    'js-organismo/ORGFloorMap.js',
    'js-organismo/ORGLocationProvider.js',
    'js-organismo/ORGMap.js',
    'js-organismo/ORGDevice.js',
    'js-organismo/ORG3DDevice.js',
    'js-organismo/ORGBeacon.js',
    'js-organismo/ORG3DBeaconTransformControl.js',
    'js-organismo/ORG3DDeviceTransformControl.js',
    'js-organismo/ORGTestApp.js',
    'js-organismo/ORGDeviceBaseController.js',
    'js-organismo/ORGWebSocketDeviceController.js',
    'js-organismo/ORGDeviceController.js',
    'js-organismo/ORGDeviceWDAController.js',
    'js-organismo/ORGiMobileDeviceController.js',
    'js-organismo/ORG3DSceneFloor.js',
    'js-organismo/ORG3DDeviceModelLoader.js',
    'js-organismo/ORG3DDeviceModel.js',
    'js-organismo/ORG3DDeviceScreen.js',
    'js-organismo/ORGWebSocketDelegate.js',
    'js-organismo/ORGiControlProxyWSDelegate.js',
    'js-organismo/ORGOrganismoWSDelegate.js',
    'js-organismo/ORG3DUITreeRaycaster.js',
    'js-organismo/ORG3DSceneRaycaster.js',
    'js-organismo/ORG3DBeacon.js',
    'js-organismo/ORG3DBattery.js',
    'js-organismo/ORG3DPieChart.js',
    'js-organismo/ORG3DMemoryChart.js',
    'js-organismo/ORG3DDiskChart.js',
    'js-organismo/ORG3DCPUUsageBarChart.js',
    'js-organismo/ORGLocationManager.js',
    'js-organismo/ORGFluxStore.js',
    'js-organismo/ORG.SplitterResize.js',
    'js-organismo/ORG.WindowResize.js',
    'js-organismo/ORGMain.js',
    'js-organismo/ORGDeviceConnectionControls.js',
    'js-organismo/ORGSettingsControls.js',
    'js-organismo/ORG3DLocationMarker.js',
    'js-organismo/ORGItinerary.js',
    'js-organismo/ORGItineraryLocation.js',
    'js-organismo/ORGItineraryRunner.js',
    'js-organismo/ORGSystemInfoManager.js',
    'js-organismo/ORG3DUIElement.js',
    'js-organismo/ORG3DWDAUIElement.js',
    'js-organismo/ORG3DORGUIElement.js',
    'js-organismo/ORGUIJSONTreeManager.js',
    'js-organismo/ORGUIJSONWDATreeAdaptor.js',
    'js-organismo/ORGUIJSONOrganismoTreeAdaptor.js',
    'js-organismo/ORGActionsCenter.js',
    'js-organismo/ORG3DNetPoint.js',
    'js-organismo/ORG3DNetPointDescriptor.js',
];


const all_source_names = function() {
    var source_names = [];
    for (var i in sources) {
        source_names.push(sources[i].split("/").pop(-1));
    }
    return source_names;
}

gulp.task('clean', function(cb){
    del(['build', 'js-libs/organismo.development.js']).then(function(){
        cb();
    });
});

gulp.task('babel', ['clean'], function(){
    return gulp.src(sources)
        //.pipe(babel())
        .pipe(gulp.dest('build'));
});
gulp.task('concat', ['babel'], function () {
    process.chdir('build');
    return gulp.src(all_source_names())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('.'))
        .pipe(rename('organismo.development.js'))
        //.pipe(gp_uglify())
        .pipe(gulp.dest('../js-libs'));
});


gulp.task('default', function () {
    gulp.start('concat');
});
