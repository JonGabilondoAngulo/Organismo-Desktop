var ORG = ORG || {}
ORG.UI = {}

// JQUERY
$ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui.min.js')

// Change JQueryUI plugin names to fix name collision with Bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip)
$.widget.bridge('uibutton', $.ui.button)

require('jquery-contextmenu')

// BOOTSTRAP
require('bootstrap')
require("bootstrap-slider")

// GOOGLE
//const GoogleMapsLoader = require('google-maps')
//GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
//GoogleMapsLoader.KEY = process.env.GOOGLE_API_KEY
//GoogleMapsLoader.load(function(google) {
//    require('./third-party/epoly.js')
//})

// THREE JS
const THREE = require('three')
THREE.OrbitControls = require('three-orbitcontrols')
THREE.TransformControls = require('threejs-transformcontrols')
THREE.TextTexture = require('@seregpie/three.text-texture')
const TWEEN = require('@tweenjs/tween.js')
const bootbox = require('bootbox')
require('three-obj-mtl-loader')

const Flux = require('flux')
const FluxUtils = require('flux/utils')
const ORG3DScene = require('./src/organismo/ORG3DScene')
const ORGScenario = require('./src/organismo/ORGScenario')
const ORGUITreeContextMenuManager = require('./src/organismo/ORGUITreeContextMenuManager')
const ORGFluxStore = require('./src/organismo/ORGFluxStore')
const ORGLocationManager = require('./src/organismo/ORGLocationManager')
const ORGSystemInfoManager = require('./src/organismo/ORGSystemInfoManager')
const {ORGUIJSONTreeManager, ORGJSONTreeType} = require('./src/organismo/ORGUIJSONTreeManager')
//const ORGSplitterResize = require('./src/organismo/ORG.SplitterResize')
const ORGWindowResize = require('./src/organismo/ORG.WindowResize')
const ORGSplitter = require('split.js')

ORG.contentWrapper = document.getElementById('content-wrapper')
ORG.leftSection = document.getElementById('threejs-canvas')
ORG.canvas = document.getElementById('threejs-canvas')
ORG.rightSection = document.getElementById('right-tabs')
ORG.deviceController = null
ORG.device = null
ORG.testApp = null
ORG.map = null
ORG.scenario = new ORGScenario()
ORG.dispatcher = new Flux.Dispatcher()
ORG.fluxStore = new ORGFluxStore(ORG.dispatcher)

ORG.fontLoader = new THREE.FontLoader()
ORG.fontLoader.load('assets/three.js/fonts/helvetiker_regular.typeface.json', (font) => {
    ORG.font_helvetiker_regular = font
})

ORG.scene = new ORG3DScene(ORG.canvas, {"width": 320, "height": 568})
ORG.locationManager = new ORGLocationManager()
ORG.locationManager.addListener(ORG.scene)

// Resize splitter
//ORGSplitterResize(document.getElementById('org-splitter'), ORG.contentWrapper, ORG.leftSection, ORG.rightSection, ORG.scene);

// System Info manager
ORG.systemInfoManager = new ORGSystemInfoManager(ORG.scene)

// UI JSON Tree
ORG.UIJSONTreeManager = new ORGUIJSONTreeManager(document.getElementById('ui-json-tree'), document.getElementById('ui-json-tree-node'))
ORG.UIJSONTreeContextMenuManager = new ORGUITreeContextMenuManager('#ui-json-tree')

ORG.splitter = ORGSplitter([ORG.leftSection, ORG.rightSection], {
    sizes: [80, 20],
    minSize: [300, 300],
    gutterSize : 10,
    onDrag: function() {
        ORG.windowResizer.resize()
    },
})

ORG.windowResizer = ORGWindowResize(ORG.scene.THREERenderer, ORG.scene.THREECamera, ORG.canvas, ORG.contentWrapper, ORG.leftSection, ORG.rightSection)

