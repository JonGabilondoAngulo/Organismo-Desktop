

ORG.contentWrapper = document.getElementById('content-wrapper');
ORG.leftSection = document.getElementById('3d-canvas-col');
ORG.canvasDomElem = document.getElementById('threejs-canvas');
ORG.rightSection = document.getElementById('right-tabs');
ORG.deviceController = null;
ORG.device = null;
ORG.testApp = null;
ORG.map = null;
ORG.scenario = new ORGScenario();
ORG.dispatcher = new Flux.Dispatcher();
ORG.fluxStore = new ORGFluxStore(ORG.dispatcher);

ORG.fontLoader = new THREE.FontLoader();
ORG.fontLoader.load( 'js-third-party/three.js/examples/fonts/helvetiker_regular.typeface.json',  ( font ) => {

    ORG.font_helvetiker_regular = font;
    ORG.scene = new ORG3DScene(ORG.canvasDomElem, {"width":320, "height":568});
    ORG.locationManager = new ORGLocationManager();
    ORG.locationManager.addListener( ORG.scene );

    // Resize splitter
    ORG.SplitterResize(document.getElementById('org-splitter'), ORG.contentWrapper, ORG.leftSection, ORG.rightSection, ORG.scene);

    google.charts.load('current', {'packages' : ['columnchart']});
    //google.charts.setOnLoadCallback(function() { sendAndDraw('') });

    // System Info manager
    ORG.systemInfoManager = new ORGSystemInfoManager(ORG.scene);

    // UI JSON Tree
    ORG.UIJSONTreeManager = new ORGUIJSONTreeManager(document.getElementById('ui-json-tree'), document.getElementById('ui-json-tree-node'));
    ORG.UIJSONTreeContextMenuManager = new ORGUITreeContextMenuManager('#ui-json-tree');

    // Install handler for Window Resize
    var resizer = ORG.WindowResize( ORG.scene.THREERenderer, ORG.scene.THREECamera, ORG.canvasDomElem, ORG.contentWrapper, ORG.leftSection, ORG.rightSection);
    resizer.resize();

} );



