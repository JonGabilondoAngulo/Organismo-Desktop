// JQUERY
$ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui.min.js')

// Change JQueryUI plugin names to fix name collision with Bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip)
$.widget.bridge('uibutton', $.ui.button)

require('jquery-contextmenu')

// BOOTSTRAP
require('bootstrap')

// GOOGLE
//const GoogleMapsLoader = require('google-maps')
//GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
//GoogleMapsLoader.KEY = process.env.GOOGLE_API_KEY
//GoogleMapsLoader.load(function(google) {
//    require('./js-third-party/epoly.js')
//})


// THREE JS
const THREE = require('three')
THREE.OrbitControls = require('three-orbitcontrols')
THREE.TransformControls = require('threejs-transformcontrols')
THREE.TextTexture = require('three.texttexture')
const TWEEN = require('@tweenjs/tween.js')
const bootbox = require('bootbox')
require('three-obj-mtl-loader')

// FLUX
const Flux = require('flux');
const FluxUtils = require('flux/utils');
