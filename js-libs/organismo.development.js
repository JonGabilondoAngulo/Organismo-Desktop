/**
 * @author Lee Stemkoski
 *
 * Usage: 
 * (1) create a global variable:
 *      var keyboard = new KeyboardState();
 * (2) during main loop:
 *       keyboard.update();
 * (3) check state of keys:
 *       keyboard.down("A")    -- true for one update cycle after key is pressed
 *       keyboard.pressed("A") -- true as long as key is being pressed
 *       keyboard.up("A")      -- true for one update cycle after key is released
 * 
 *  See KeyboardState.k object data below for names of keys whose state can be polled
 */
 
// initialization
KeyboardState = function()
{	
	// bind keyEvents
	document.addEventListener("keydown", KeyboardState.onKeyDown, false);
	document.addEventListener("keyup",   KeyboardState.onKeyUp,   false);	
}

///////////////////////////////////////////////////////////////////////////////

KeyboardState.k = 
{  
    8: "backspace",  9: "tab",       13: "enter",    16: "shift", 
    17: "ctrl",     18: "alt",       27: "esc",      32: "space",
    33: "pageup",   34: "pagedown",  35: "end",      36: "home",
    37: "left",     38: "up",        39: "right",    40: "down",
    45: "insert",   46: "delete",   186: ";",       187: "=",
    188: ",",      189: "-",        190: ".",       191: "/",
    219: "[",      220: "\\",       221: "]",       222: "'"
}

KeyboardState.status = {};

KeyboardState.keyName = function ( keyCode )
{
	return ( KeyboardState.k[keyCode] != null ) ? 
		KeyboardState.k[keyCode] : 
		String.fromCharCode(keyCode);
}

KeyboardState.onKeyUp = function(event)
{
	var key = KeyboardState.keyName(event.keyCode);
	if ( KeyboardState.status[key] )
		KeyboardState.status[key].pressed = false;
}

KeyboardState.onKeyDown = function(event)
{
	var key = KeyboardState.keyName(event.keyCode);
	if ( !KeyboardState.status[key] )
		KeyboardState.status[key] = { down: false, pressed: false, up: false, updatedPreviously: false };
}

KeyboardState.prototype.update = function()
{
	for (var key in KeyboardState.status)
	{
		// insure that every keypress has "down" status exactly once
		if ( !KeyboardState.status[key].updatedPreviously )
		{
			KeyboardState.status[key].down        		= true;
			KeyboardState.status[key].pressed     		= true;
			KeyboardState.status[key].updatedPreviously = true;
		}
		else // updated previously
		{
			KeyboardState.status[key].down = false;
		}

		// key has been flagged as "up" since last update
		if ( KeyboardState.status[key].up ) 
		{
			delete KeyboardState.status[key];
			continue; // move on to next key
		}
		
		if ( !KeyboardState.status[key].pressed ) // key released
			KeyboardState.status[key].up = true;
	}
}

KeyboardState.prototype.down = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].down);
}

KeyboardState.prototype.pressed = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].pressed);
}

KeyboardState.prototype.up = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].up);
}

KeyboardState.prototype.debug = function()
{
	var list = "Keys active: ";
	for (var arg in KeyboardState.status)
		list += " " + arg
	console.log(list);
}

///////////////////////////////////////////////////////////////////////////////
/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 3.2.1
 * @date    2016-04-26
 *
 * @license
 * Copyright (C) 2013-2016 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.math=t():e.math=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){function n(e){var t=i.create(e);return t.create=n,t["import"](r(13)),t}var i=r(1);e.exports=n()},function(e,t,r){e.exports=r(2)},function(e,t,r){var n=r(3).isFactory,i=(r(3).deepExtend,r(4)),a=r(8),o=r(10),s=r(12);t.create=function(e){function t(e){if(!n(e))throw new Error("Factory object with properties `type`, `name`, and `factory` expected");var i,a=r.indexOf(e);return-1===a?(i=e.math===!0?e.factory(c.type,f,t,c.typed,c):e.factory(c.type,f,t,c.typed),r.push(e),u.push(i)):i=u[a],i}if("function"!=typeof Object.create)throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var r=[],u=[],c=a.mixin({});c.type={},c.expression={transform:Object.create(c)},c.typed=i.create(c.type);var f={epsilon:1e-12,matrix:"Matrix",number:"number",precision:64,predictable:!1};return c["import"]=t(o),c.config=t(s),e&&c.config(e),c}},function(e,t){"use strict";t.clone=function r(e){var t=typeof e;if("number"===t||"string"===t||"boolean"===t||null===e||void 0===e)return e;if("function"==typeof e.clone)return e.clone();if(Array.isArray(e))return e.map(function(e){return r(e)});if(e instanceof Number)return new Number(e.valueOf());if(e instanceof String)return new String(e.valueOf());if(e instanceof Boolean)return new Boolean(e.valueOf());if(e instanceof Date)return new Date(e.valueOf());if(e&&e.isBigNumber===!0)return e;if(e instanceof RegExp)throw new TypeError("Cannot clone "+e);var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=r(e[i]));return n},t.extend=function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},t.deepExtend=function n(e,t){if(Array.isArray(t))throw new TypeError("Arrays are not supported by deepExtend");for(var r in t)if(t.hasOwnProperty(r))if(t[r]&&t[r].constructor===Object)void 0===e[r]&&(e[r]={}),e[r].constructor===Object?n(e[r],t[r]):e[r]=t[r];else{if(Array.isArray(t[r]))throw new TypeError("Arrays are not supported by deepExtend");e[r]=t[r]}return e},t.deepEqual=function(e,r){var n,i,a;if(Array.isArray(e)){if(!Array.isArray(r))return!1;if(e.length!=r.length)return!1;for(i=0,a=e.length;a>i;i++)if(!t.deepEqual(e[i],r[i]))return!1;return!0}if(e instanceof Object){if(Array.isArray(r)||!(r instanceof Object))return!1;for(n in e)if(!t.deepEqual(e[n],r[n]))return!1;for(n in r)if(!t.deepEqual(e[n],r[n]))return!1;return!0}return typeof e==typeof r&&e==r},t.canDefineProperty=function(){try{if(Object.defineProperty)return Object.defineProperty({},"x",{get:function(){}}),!0}catch(e){}return!1},t.lazy=function(e,r,n){if(t.canDefineProperty()){var i,a=!0;Object.defineProperty(e,r,{get:function(){return a&&(i=n(),a=!1),i},set:function(e){i=e,a=!1},configurable:!0,enumerable:!0})}else e[r]=n()},t.traverse=function(e,t){var r=e;if(t)for(var n=t.split("."),i=0;i<n.length;i++){var a=n[i];a in r||(r[a]={}),r=r[a]}return r},t.isFactory=function(e){return e&&"function"==typeof e.factory}},function(e,t,r){var n=r(5),i=r(6).digits,a=function(){return a=n.create,n};t.create=function(e){var t=a();return t.types=[{name:"number",test:function(e){return"number"==typeof e}},{name:"Complex",test:function(e){return e&&e.isComplex}},{name:"BigNumber",test:function(e){return e&&e.isBigNumber}},{name:"Fraction",test:function(e){return e&&e.isFraction}},{name:"Unit",test:function(e){return e&&e.isUnit}},{name:"string",test:function(e){return"string"==typeof e}},{name:"Array",test:Array.isArray},{name:"Matrix",test:function(e){return e&&e.isMatrix}},{name:"DenseMatrix",test:function(e){return e&&e.isDenseMatrix}},{name:"SparseMatrix",test:function(e){return e&&e.isSparseMatrix}},{name:"ImmutableDenseMatrix",test:function(e){return e&&e.isImmutableDenseMatrix}},{name:"Range",test:function(e){return e&&e.isRange}},{name:"Index",test:function(e){return e&&e.isIndex}},{name:"boolean",test:function(e){return"boolean"==typeof e}},{name:"ResultSet",test:function(e){return e&&e.isResultSet}},{name:"Help",test:function(e){return e&&e.isHelp}},{name:"function",test:function(e){return"function"==typeof e}},{name:"Date",test:function(e){return e instanceof Date}},{name:"RegExp",test:function(e){return e instanceof RegExp}},{name:"Object",test:function(e){return"object"==typeof e}},{name:"null",test:function(e){return null===e}},{name:"undefined",test:function(e){return void 0===e}}],t.conversions=[{from:"number",to:"BigNumber",convert:function(t){if(i(t)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: "+t+"). Use function bignumber(x) to convert to BigNumber.");return new e.BigNumber(t)}},{from:"number",to:"Complex",convert:function(t){return new e.Complex(t,0)}},{from:"number",to:"string",convert:function(e){return e+""}},{from:"BigNumber",to:"Complex",convert:function(t){return new e.Complex(t.toNumber(),0)}},{from:"Fraction",to:"Complex",convert:function(t){return new e.Complex(t.valueOf(),0)}},{from:"number",to:"Fraction",convert:function(t){if(i(t)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to Fraction (value: "+t+"). Use function fraction(x) to convert to Fraction.");return new e.Fraction(t)}},{from:"string",to:"number",convert:function(e){var t=Number(e);if(isNaN(t))throw new Error('Cannot convert "'+e+'" to a number');return t}},{from:"boolean",to:"number",convert:function(e){return+e}},{from:"boolean",to:"BigNumber",convert:function(t){return new e.BigNumber(+t)}},{from:"boolean",to:"Fraction",convert:function(t){return new e.Fraction(+t)}},{from:"boolean",to:"string",convert:function(e){return+e}},{from:"null",to:"number",convert:function(){return 0}},{from:"null",to:"string",convert:function(){return"null"}},{from:"null",to:"BigNumber",convert:function(){return new e.BigNumber(0)}},{from:"null",to:"Fraction",convert:function(){return new e.Fraction(0)}},{from:"Array",to:"Matrix",convert:function(t){return new e.DenseMatrix(t)}},{from:"Matrix",to:"Array",convert:function(e){return e.valueOf()}}],t}},function(e,t,r){var n,i,a;!function(r,o){i=[],n=o,a="function"==typeof n?n.apply(t,i):n,!(void 0!==a&&(e.exports=a))}(this,function(){function e(){function t(e){for(var t,r=0;r<N.types.length;r++){var n=N.types[r];if(n.name===e){t=n.test;break}}if(!t){var i;for(r=0;r<N.types.length;r++)if(n=N.types[r],n.name.toLowerCase()==e.toLowerCase()){i=n.name;break}throw new Error('Unknown type "'+e+'"'+(i?'. Did you mean "'+i+'"?':""))}return t}function r(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(n.signatures&&""!=n.name)if(""==t)t=n.name;else if(t!=n.name){var i=new Error("Function names do not match (expected: "+t+", actual: "+n.name+")");throw i.data={actual:n.name,expected:t},i}}return t}function n(e,t,r,n,i){var a,o=m(n),s=i?i.split(","):null,u=e||"unnamed",c=s&&d(s,"any"),f={fn:e,index:r,actual:n,expected:s};a=s?t>r&&!c?"Unexpected type of argument in function "+u+" (expected: "+s.join(" or ")+", actual: "+o+", index: "+r+")":"Too few arguments in function "+u+" (expected: "+s.join(" or ")+", index: "+r+")":"Too many arguments in function "+u+" (expected: "+r+", actual: "+t+")";var l=new TypeError(a);return l.data=f,l}function i(e){this.name=e||"refs",this.categories={}}function a(e,t){if("string"==typeof e){var r=e.trim(),n="..."===r.substr(0,3);if(n&&(r=r.substr(3)),""===r)this.types=["any"];else{this.types=r.split("|");for(var i=0;i<this.types.length;i++)this.types[i]=this.types[i].trim()}}else{if(!Array.isArray(e)){if(e instanceof a)return e.clone();throw new Error("String or Array expected")}this.types=e}this.conversions=[],this.varArgs=n||t||!1,this.anyType=-1!==this.types.indexOf("any")}function o(e,t){var r;if("string"==typeof e)r=""!==e?e.split(","):[];else{if(!Array.isArray(e))throw new Error("string or Array expected");r=e}this.params=new Array(r.length);for(var n=0;n<r.length;n++){var i=new a(r[n]);if(this.params[n]=i,n===r.length-1)this.varArgs=i.varArgs;else if(i.varArgs)throw new SyntaxError('Unexpected variable arguments operator "..."')}this.fn=t}function s(e,t,r){this.path=e||[],this.param=e[e.length-1]||null,this.signature=t||null,this.childs=r||[]}function u(e){var t,r,n={},i=[];for(var a in e)if(e.hasOwnProperty(a)){var s=e[a];if(t=new o(a,s),t.ignore())continue;var u=t.expand();for(r=0;r<u.length;r++){var c=u[r],f=c.toString(),l=n[f];if(l){var p=o.compare(c,l);if(0>p)n[f]=c;else if(0===p)throw new Error('Signature "'+f+'" is defined twice')}else n[f]=c}}for(f in n)n.hasOwnProperty(f)&&i.push(n[f]);for(i.sort(function(e,t){return o.compare(e,t)}),r=0;r<i.length;r++)if(t=i[r],t.varArgs)for(var h=t.params.length-1,m=t.params[h],g=0;g<m.types.length;){if(m.conversions[g])for(var v=m.types[g],y=0;y<i.length;y++){var x=i[y],b=x.params[h];if(x!==t&&b&&d(b.types,v)&&!b.conversions[h]){m.types.splice(g,1),m.conversions.splice(g,1),g--;break}}g++}return i}function c(e){for(var t={},r=0;r<e.length;r++){var n=e[r];if(n.fn&&!n.hasConversions()){var i=n.params.join(",");t[i]=n.fn}}return t}function f(e,t){var r,n,i,o=t.length,u=[];for(r=0;r<e.length;r++)n=e[r],n.params.length!==o||i||(i=n),void 0!=n.params[o]&&u.push(n);u.sort(function(e,t){return a.compare(e.params[o],t.params[o])});var c=[];for(r=0;r<u.length;r++){n=u[r];var l=n.params[o],p=c.filter(function(e){return e.param.overlapping(l)})[0];if(p){if(p.param.varArgs)throw new Error('Conflicting types "'+p.param+'" and "'+l+'"');p.signatures.push(n)}else c.push({param:l,signatures:[n]})}var h=new Array(c.length);for(r=0;r<c.length;r++){var m=c[r];h[r]=f(m.signatures,t.concat(m.param))}return new s(t,i,h)}function l(e){for(var t=[],r=0;e>r;r++)t[r]="arg"+r;return t}function p(e,t){var r=new i,a=u(t);if(0==a.length)throw new Error("No signatures provided");var o=f(a,[]),s=[],p=e||"",m=l(h(a));s.push("function "+p+"("+m.join(", ")+") {"),s.push('  "use strict";'),s.push("  var name = '"+p+"';"),s.push(o.toCode(r,"  ")),s.push("}");var d=[r.toCode(),"return "+s.join("\n")].join("\n"),g=new Function(r.name,"createError",d),v=g(r,n);return v.signatures=c(a),v}function h(e){for(var t=0,r=0;r<e.length;r++){var n=e[r].params.length;n>t&&(t=n)}return t}function m(e){for(var t,r=0;r<N.types.length;r++){var n=N.types[r];if("Object"===n.name)t=n;else if(n.test(e))return n.name}return t&&t.test(e)?t.name:"unknown"}function d(e,t){return-1!==e.indexOf(t)}function g(e,t){if(!e.signatures)throw new TypeError("Function is no typed-function");var r;if("string"==typeof t){r=t.split(",");for(var n=0;n<r.length;n++)r[n]=r[n].trim()}else{if(!Array.isArray(t))throw new TypeError("String array or a comma separated string expected");r=t}var i=r.join(","),a=e.signatures[i];if(a)return a;throw new TypeError("Signature not found (signature: "+(e.name||"unnamed")+"("+r.join(", ")+"))")}function v(e,t){var r=m(e);if(t===r)return e;for(var n=0;n<N.conversions.length;n++){var i=N.conversions[n];if(i.from===r&&i.to===t)return i.convert(e)}throw new Error("Cannot convert from "+r+" to "+t)}i.prototype.add=function(e,t){var r=t||"fn";this.categories[r]||(this.categories[r]=[]);var n=this.categories[r].indexOf(e);return-1==n&&(n=this.categories[r].length,this.categories[r].push(e)),r+n},i.prototype.toCode=function(){var e=[],t=this.name+".categories",r=this.categories;for(var n in r)if(r.hasOwnProperty(n))for(var i=r[n],a=0;a<i.length;a++)e.push("var "+n+a+" = "+t+"['"+n+"']["+a+"];");return e.join("\n")},a.compare=function(e,t){if(e.anyType)return 1;if(t.anyType)return-1;if(d(e.types,"Object"))return 1;if(d(t.types,"Object"))return-1;if(e.hasConversions()){if(t.hasConversions()){var r,n,i;for(r=0;r<e.conversions.length;r++)if(void 0!==e.conversions[r]){n=e.conversions[r];break}for(r=0;r<t.conversions.length;r++)if(void 0!==t.conversions[r]){i=t.conversions[r];break}return N.conversions.indexOf(n)-N.conversions.indexOf(i)}return 1}if(t.hasConversions())return-1;var a,o;for(r=0;r<N.types.length;r++)if(N.types[r].name===e.types[0]){a=r;break}for(r=0;r<N.types.length;r++)if(N.types[r].name===t.types[0]){o=r;break}return a-o},a.prototype.overlapping=function(e){for(var t=0;t<this.types.length;t++)if(d(e.types,this.types[t]))return!0;return!1},a.prototype.clone=function(){var e=new a(this.types.slice(),this.varArgs);return e.conversions=this.conversions.slice(),e},a.prototype.hasConversions=function(){return this.conversions.length>0},a.prototype.contains=function(e){for(var t=0;t<this.types.length;t++)if(e[this.types[t]])return!0;return!1},a.prototype.toString=function(e){for(var t=[],r={},n=0;n<this.types.length;n++){var i=this.conversions[n],a=e&&i?i.to:this.types[n];a in r||(r[a]=!0,t.push(a))}return(this.varArgs?"...":"")+t.join("|")},o.prototype.clone=function(){return new o(this.params.slice(),this.fn)},o.prototype.expand=function(){function e(r,n){if(n.length<r.params.length){var i,s,u,c=r.params[n.length];if(c.varArgs){for(s=c.clone(),i=0;i<N.conversions.length;i++)if(u=N.conversions[i],!d(c.types,u.from)&&d(c.types,u.to)){var f=s.types.length;s.types[f]=u.from,s.conversions[f]=u}e(r,n.concat(s))}else{for(i=0;i<c.types.length;i++)e(r,n.concat(new a(c.types[i])));for(i=0;i<N.conversions.length;i++)u=N.conversions[i],!d(c.types,u.from)&&d(c.types,u.to)&&(s=new a(u.from),s.conversions[0]=u,e(r,n.concat(s)))}}else t.push(new o(n,r.fn))}var t=[];return e(this,[]),t},o.compare=function(e,t){if(e.params.length>t.params.length)return 1;if(e.params.length<t.params.length)return-1;var r,n=e.params.length,i=0,o=0;for(r=0;n>r;r++)e.params[r].hasConversions()&&i++,t.params[r].hasConversions()&&o++;if(i>o)return 1;if(o>i)return-1;for(r=0;r<e.params.length;r++){var s=a.compare(e.params[r],t.params[r]);if(0!==s)return s}return 0},o.prototype.hasConversions=function(){for(var e=0;e<this.params.length;e++)if(this.params[e].hasConversions())return!0;return!1},o.prototype.ignore=function(){for(var e={},t=0;t<N.ignore.length;t++)e[N.ignore[t]]=!0;for(t=0;t<this.params.length;t++)if(this.params[t].contains(e))return!0;return!1},o.prototype.toCode=function(e,t){for(var r=[],n=new Array(this.params.length),i=0;i<this.params.length;i++){var a=this.params[i],o=a.conversions[0];a.varArgs?n[i]="varArgs":o?n[i]=e.add(o.convert,"convert")+"(arg"+i+")":n[i]="arg"+i}var s=this.fn?e.add(this.fn,"signature"):void 0;return s?t+"return "+s+"("+n.join(", ")+"); // signature: "+this.params.join(", "):r.join("\n")},o.prototype.toString=function(){return this.params.join(", ")},s.prototype.toCode=function(e,r,n){var i=[];if(this.param){var a=this.path.length-1,o=this.param.conversions[0],s="// type: "+(o?o.from+" (convert to "+o.to+")":this.param);if(this.param.varArgs)if(this.param.anyType)i.push(r+"if (arguments.length > "+a+") {"),i.push(r+"  var varArgs = [];"),i.push(r+"  for (var i = "+a+"; i < arguments.length; i++) {"),i.push(r+"    varArgs.push(arguments[i]);"),i.push(r+"  }"),i.push(this.signature.toCode(e,r+"  ")),i.push(r+"}");else{for(var u=function(r,n){for(var i=[],a=0;a<r.length;a++)i[a]=e.add(t(r[a]),"test")+"("+n+")";return i.join(" || ")}.bind(this),c=this.param.types,f=[],l=0;l<c.length;l++)void 0===this.param.conversions[l]&&f.push(c[l]);i.push(r+"if ("+u(c,"arg"+a)+") { "+s),i.push(r+"  var varArgs = [arg"+a+"];"),i.push(r+"  for (var i = "+(a+1)+"; i < arguments.length; i++) {"),i.push(r+"    if ("+u(f,"arguments[i]")+") {"),i.push(r+"      varArgs.push(arguments[i]);");for(var l=0;l<c.length;l++){var p=this.param.conversions[l];if(p){var h=e.add(t(c[l]),"test"),m=e.add(p.convert,"convert");i.push(r+"    }"),i.push(r+"    else if ("+h+"(arguments[i])) {"),i.push(r+"      varArgs.push("+m+"(arguments[i]));")}}i.push(r+"    } else {"),i.push(r+"      throw createError(name, arguments.length, i, arguments[i], '"+f.join(",")+"');"),i.push(r+"    }"),i.push(r+"  }"),i.push(this.signature.toCode(e,r+"  ")),i.push(r+"}")}else if(this.param.anyType)i.push(r+"// type: any"),i.push(this._innerCode(e,r,n));else{var d=this.param.types[0],h="any"!==d?e.add(t(d),"test"):null;i.push(r+"if ("+h+"(arg"+a+")) { "+s),i.push(this._innerCode(e,r+"  ",n)),i.push(r+"}")}}else i.push(this._innerCode(e,r,n));return i.join("\n")},s.prototype._innerCode=function(e,t,r){var n,i=[];this.signature&&(i.push(t+"if (arguments.length === "+this.path.length+") {"),i.push(this.signature.toCode(e,t+"  ")),i.push(t+"}"));var a;for(n=0;n<this.childs.length;n++)if(this.childs[n].param.anyType){a=this.childs[n];break}for(n=0;n<this.childs.length;n++)i.push(this.childs[n].toCode(e,t,a));r&&!this.param.anyType&&i.push(r.toCode(e,t,a));var o=this._exceptions(e,t);return o&&i.push(o),i.join("\n")},s.prototype._exceptions=function(e,t){var r=this.path.length;if(0===this.childs.length)return[t+"if (arguments.length > "+r+") {",t+"  throw createError(name, arguments.length, "+r+", arguments["+r+"]);",t+"}"].join("\n");for(var n={},i=[],a=0;a<this.childs.length;a++){var o=this.childs[a];if(o.param)for(var s=0;s<o.param.types.length;s++){var u=o.param.types[s];u in n||o.param.conversions[s]||(n[u]=!0,i.push(u))}}return t+"throw createError(name, arguments.length, "+r+", arguments["+r+"], '"+i.join(",")+"');"};var y=[{name:"number",test:function(e){return"number"==typeof e}},{name:"string",test:function(e){return"string"==typeof e}},{name:"boolean",test:function(e){return"boolean"==typeof e}},{name:"Function",test:function(e){return"function"==typeof e}},{name:"Array",test:Array.isArray},{name:"Date",test:function(e){return e instanceof Date}},{name:"RegExp",test:function(e){return e instanceof RegExp}},{name:"Object",test:function(e){return"object"==typeof e}},{name:"null",test:function(e){return null===e}},{name:"undefined",test:function(e){return void 0===e}}],x={},b=[],w=[],N={config:x,types:y,conversions:b,ignore:w};return N=p("typed",{Object:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);var i=r(t);return p(i,e)},"string, Object":p,"...Function":function(e){for(var t,n=r(e),i={},a=0;a<e.length;a++){var o=e[a];if("object"!=typeof o.signatures)throw t=new TypeError("Function is no typed-function (index: "+a+")"),t.data={index:a},t;for(var s in o.signatures)if(o.signatures.hasOwnProperty(s))if(i.hasOwnProperty(s)){if(o.signatures[s]!==i[s])throw t=new Error('Signature "'+s+'" is defined twice'),t.data={signature:s},t}else i[s]=o.signatures[s]}return p(n,i)}}),N.config=x,N.types=y,N.conversions=b,N.ignore=w,N.create=e,N.find=g,N.convert=v,N.addType=function(e){if(!e||"string"!=typeof e.name||"function"!=typeof e.test)throw new TypeError("Object with properties {name: string, test: function} expected");N.types.push(e)},N.addConversion=function(e){if(!e||"string"!=typeof e.from||"string"!=typeof e.to||"function"!=typeof e.convert)throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");N.conversions.push(e)},N}return e()})},function(e,t,r){"use strict";var n=r(7);t.isNumber=function(e){return"number"==typeof e},t.isInteger=function(e){return isFinite(e)?e==Math.round(e):!1},t.sign=Math.sign||function(e){return e>0?1:0>e?-1:0},t.format=function(e,r){if("function"==typeof r)return r(e);if(e===1/0)return"Infinity";if(e===-(1/0))return"-Infinity";if(isNaN(e))return"NaN";var n="auto",i=void 0;switch(r&&(r.notation&&(n=r.notation),t.isNumber(r)?i=r:r.precision&&(i=r.precision)),n){case"fixed":return t.toFixed(e,i);case"exponential":return t.toExponential(e,i);case"engineering":return t.toEngineering(e,i);case"auto":return t.toPrecision(e,i,r&&r.exponential).replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],t=arguments[4];return"."!==e?e+t:t});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},t.toExponential=function(e,t){return new n(e).toExponential(t)},t.toEngineering=function(e,t){return new n(e).toEngineering(t)},t.toFixed=function(e,t){return new n(e).toFixed(t)},t.toPrecision=function(e,t,r){return new n(e).toPrecision(t,r)},t.digits=function(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length},t.DBL_EPSILON=Number.EPSILON||2.220446049250313e-16,t.nearlyEqual=function(e,r,n){if(null==n)return e==r;if(e==r)return!0;if(isNaN(e)||isNaN(r))return!1;if(isFinite(e)&&isFinite(r)){var i=Math.abs(e-r);return i<t.DBL_EPSILON?!0:i<=Math.max(Math.abs(e),Math.abs(r))*n}return!1}},function(e,t){"use strict";function r(e){var t=String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!t)throw new SyntaxError("Invalid number");var r=t[1],n=t[2],i=parseFloat(t[4]||"0"),a=n.indexOf(".");i+=-1!==a?a-1:n.length-1,this.sign=r,this.coefficients=n.replace(".","").replace(/^0*/,function(e){return i-=e.length,""}).replace(/0*$/,"").split("").map(function(e){return parseInt(e)}),0===this.coefficients.length&&(this.coefficients.push(0),i++),this.exponent=i}function n(e){for(var t=[],r=0;e>r;r++)t.push(0);return t}r.prototype.toEngineering=function(e){var t=this.roundDigits(e),r=t.exponent,i=t.coefficients,a=r%3===0?r:0>r?r-3-r%3:r-r%3,o=r>=0?r:Math.abs(a);i.length-1<o&&(i=i.concat(n(o-(i.length-1))));for(var s=Math.abs(r-a),u=1,c="";--s>=0;)u++;var f=i.slice(u).join(""),l=f.match(/[1-9]/)?"."+f:"";return c=i.slice(0,u).join("")+l,c+="e"+(r>=0?"+":"")+a.toString(),t.sign+c},r.prototype.toFixed=function(e){var t=this.roundDigits(this.exponent+1+(e||0)),r=t.coefficients,i=t.exponent+1,a=i+(e||0);return r.length<a&&(r=r.concat(n(a-r.length))),0>i&&(r=n(-i+1).concat(r),i=1),e&&r.splice(i,0,0===i?"0.":"."),this.sign+r.join("")},r.prototype.toExponential=function(e){var t=e?this.roundDigits(e):this.clone(),r=t.coefficients,i=t.exponent;r.length<e&&(r=r.concat(n(e-r.length)));var a=r.shift();return this.sign+a+(r.length>0?"."+r.join(""):"")+"e"+(i>=0?"+":"")+i},r.prototype.toPrecision=function(e,t){var r=t&&void 0!==t.lower?t.lower:.001,i=t&&void 0!==t.upper?t.upper:1e5,a=Math.abs(Math.pow(10,this.exponent));if(r>a||a>=i)return this.toExponential(e);var o=e?this.roundDigits(e):this.clone(),s=o.coefficients,u=o.exponent;s.length<e&&(s=s.concat(n(e-s.length))),s=s.concat(n(u-s.length+1+(s.length<e?e-s.length:0))),s=n(-u).concat(s);var c=u>0?u:0;return c<s.length-1&&s.splice(c+1,0,"."),this.sign+s.join("")},r.prototype.clone=function(){var e=new r("0");return e.sign=this.sign,e.coefficients=this.coefficients.slice(0),e.exponent=this.exponent,e},r.prototype.roundDigits=function(e){for(var t=this.clone(),r=t.coefficients;0>=e;)r.unshift(0),t.exponent++,e++;if(r.length>e){var n=r.splice(e,r.length-e);if(n[0]>=5){var i=e-1;for(r[i]++;10===r[i];)r.pop(),0===i&&(r.unshift(0),t.exponent++,i++),i--,r[i]++}}return t},e.exports=r},function(e,t,r){var n=r(9);t.mixin=function(e){var t=new n;return e.on=t.on.bind(t),e.off=t.off.bind(t),e.once=t.once.bind(t),e.emit=t.emit.bind(t),e}},function(e,t){function r(){}r.prototype={on:function(e,t,r){var n=this.e||(this.e={});return(n[e]||(n[e]=[])).push({fn:t,ctx:r}),this},once:function(e,t,r){function n(){i.off(e,n),t.apply(r,arguments)}var i=this;return n._=t,this.on(e,n,r)},emit:function(e){var t=[].slice.call(arguments,1),r=((this.e||(this.e={}))[e]||[]).slice(),n=0,i=r.length;for(n;i>n;n++)r[n].fn.apply(r[n].ctx,t);return this},off:function(e,t){var r=this.e||(this.e={}),n=r[e],i=[];if(n&&t)for(var a=0,o=n.length;o>a;a++)n[a].fn!==t&&n[a].fn._!==t&&i.push(n[a]);return i.length?r[e]=i:delete r[e],this}},e.exports=r},function(e,t,r){"use strict";function n(e,t,r,n,u){function c(e,t){var r=arguments.length;if(1!=r&&2!=r)throw new s("import",r,1,2);if(t||(t={}),a(e))h(e,t);else if(Array.isArray(e))e.forEach(function(e){c(e,t)});else if("object"==typeof e){for(var n in e)if(e.hasOwnProperty(n)){var i=e[n];m(i)?f(n,i,t):a(e)?h(e,t):c(i,t)}}else if(!t.silent)throw new TypeError("Factory, Object, or Array expected")}function f(e,t,r){if(r.wrap&&"function"==typeof t&&(t=p(t)),d(u[e])&&d(t))return t=r.override?n(e,t.signatures):n(u[e],t),u[e]=t,l(e,t),void u.emit("import",e,function(){return t});if(void 0===u[e]||r.override)return u[e]=t,l(e,t),void u.emit("import",e,function(){return t});if(!r.silent)throw new Error('Cannot import "'+e+'": already exists')}function l(e,t){t&&"function"==typeof t.transform&&(u.expression.transform[e]=t.transform)}function p(e){var t=function(){for(var t=[],r=0,n=arguments.length;n>r;r++){var i=arguments[r];t[r]=i&&i.valueOf()}return e.apply(u,t)};return e.transform&&(t.transform=e.transform),t}function h(e,t){if("string"==typeof e.name){var a=e.name,s=e.path?o(u,e.path):u,c=s.hasOwnProperty(a)?s[a]:void 0,f=function(){var i=r(e);if(d(c)&&d(i))return t.override||(i=n(c,i)),i;if(void 0===c||t.override)return i;if(!t.silent)throw new Error('Cannot import "'+a+'": already exists')};e.lazy!==!1?i(s,a,f):s[a]=f(),u.emit("import",a,f,e.path)}else r(e)}function m(e){return"function"==typeof e||"number"==typeof e||"string"==typeof e||"boolean"==typeof e||null===e||e&&e.isUnit===!0||e&&e.isComplex===!0||e&&e.isBigNumber===!0||e&&e.isFraction===!0||e&&e.isMatrix===!0||e&&Array.isArray(e)===!0}function d(e){return"function"==typeof e&&"object"==typeof e.signatures}return c}var i=r(3).lazy,a=r(3).isFactory,o=r(3).traverse,s=(r(3).extend,r(11));t.math=!0,t.name="import",t.factory=n,t.lazy=!0},function(e,t){"use strict";function r(e,t,n,i){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.count=t,this.min=n,this.max=i,this.message="Wrong number of arguments in function "+e+" ("+t+" provided, "+n+(void 0!=i?"-"+i:"")+" expected)",this.stack=(new Error).stack}r.prototype=new Error,r.prototype.constructor=Error,r.prototype.name="ArgumentsError",r.prototype.isArgumentsError=!0,e.exports=r},function(e,t,r){"use strict";function n(e,t,r,n,i){function a(e){if(e){var r=s.clone(t);o(e,"matrix",u),o(e,"number",c),s.deepExtend(t,e);var n=s.clone(t);return i.emit("config",n,r),n}return s.clone(t)}var u=["Matrix","Array"],c=["number","BigNumber","Fraction"];return a.MATRIX=u,a.NUMBER=c,a}function i(e,t){return-1!==e.indexOf(t)}function a(e,t){return e.map(function(e){return e.toLowerCase()}).indexOf(t.toLowerCase())}function o(e,t,r){if(void 0!==e[t]&&!i(r,e[t])){var n=a(r,e[t]);-1!==n?(console.warn('Warning: Wrong casing for configuration option "'+t+'", should be "'+r[n]+'" instead of "'+e[t]+'".'),e[t]=r[n]):console.warn('Warning: Unknown value "'+e[t]+'" for configuration option "'+t+'". Available options: '+r.map(JSON.stringify).join(", ")+".")}}var s=r(3);t.name="config",t.math=!0,t.factory=n},function(e,t,r){e.exports=[r(14),r(93),r(95),r(326),r(489),r(491)]},function(e,t,r){e.exports=[r(15),r(20),r(21),r(26),r(33),r(37),r(70),r(71),r(73),r(74)]},function(e,t,r){e.exports=[r(16),r(18)]},function(e,t,r){function n(e,t,r,n,a){var o=i.clone({precision:t.precision});return o.prototype.type="BigNumber",o.prototype.isBigNumber=!0,o.prototype.toJSON=function(){return{mathjs:"BigNumber",value:this.toString()}},o.fromJSON=function(e){return new o(e.value)},a.on("config",function(e,t){e.precision!==t.precision&&o.config({precision:e.precision})}),o}var i=r(17);t.name="BigNumber",t.path="type",t.factory=n,t.math=!0},function(e,t,r){var n;!function(i){"use strict";function a(e){var t,r,n,i=e.length-1,a="",o=e[0];if(i>0){for(a+=o,t=1;i>t;t++)n=e[t]+"",r=Re-n.length,r&&(a+=g(r)),a+=n;o=e[t],n=o+"",r=Re-n.length,r&&(a+=g(r))}else if(0===o)return"0";for(;o%10===0;)o/=10;return a+o}function o(e,t,r){if(e!==~~e||t>e||e>r)throw Error(_e+e)}function s(e,t,r,n){var i,a,o,s;for(a=e[0];a>=10;a/=10)--t;return--t<0?(t+=Re,i=0):(i=Math.ceil((t+1)/Re),t%=Re),a=Ce(10,Re-t),s=e[i]%a|0,null==n?3>t?(0==t?s=s/100|0:1==t&&(s=s/10|0),o=4>r&&99999==s||r>3&&49999==s||5e4==s||0==s):o=(4>r&&s+1==a||r>3&&s+1==a/2)&&(e[i+1]/a/100|0)==Ce(10,t-2)-1||(s==a/2||0==s)&&0==(e[i+1]/a/100|0):4>t?(0==t?s=s/1e3|0:1==t?s=s/100|0:2==t&&(s=s/10|0),o=(n||4>r)&&9999==s||!n&&r>3&&4999==s):o=((n||4>r)&&s+1==a||!n&&r>3&&s+1==a/2)&&(e[i+1]/a/1e3|0)==Ce(10,t-3)-1,o}function u(e,t,r){for(var n,i,a=[0],o=0,s=e.length;s>o;){for(i=a.length;i--;)a[i]*=t;for(a[0]+=xe.indexOf(e.charAt(o++)),n=0;n<a.length;n++)a[n]>r-1&&(void 0===a[n+1]&&(a[n+1]=0),a[n+1]+=a[n]/r|0,a[n]%=r)}return a.reverse()}function c(e,t){var r,n,i=t.d.length;32>i?(r=Math.ceil(i/3),n=Math.pow(4,-r).toString()):(r=16,n="2.3283064365386962890625e-10"),e.precision+=r,t=_(e,1,t.times(n),new e(1));for(var a=r;a--;){var o=t.times(t);t=o.times(o).minus(o).times(8).plus(1)}return e.precision-=r,t}function f(e,t,r,n){var i,a,o,s,u,c,f,l,p,h=e.constructor;e:if(null!=t){if(l=e.d,!l)return e;for(i=1,s=l[0];s>=10;s/=10)i++;if(a=t-i,0>a)a+=Re,o=t,f=l[p=0],u=f/Ce(10,i-o-1)%10|0;else if(p=Math.ceil((a+1)/Re),s=l.length,p>=s){if(!n)break e;for(;s++<=p;)l.push(0);f=u=0,i=1,a%=Re,o=a-Re+1}else{for(f=s=l[p],i=1;s>=10;s/=10)i++;a%=Re,o=a-Re+i,u=0>o?0:f/Ce(10,i-o-1)%10|0}if(n=n||0>t||void 0!==l[p+1]||(0>o?f:f%Ce(10,i-o-1)),c=4>r?(u||n)&&(0==r||r==(e.s<0?3:2)):u>5||5==u&&(4==r||n||6==r&&(a>0?o>0?f/Ce(10,i-o):0:l[p-1])%10&1||r==(e.s<0?8:7)),1>t||!l[0])return l.length=0,c?(t-=e.e+1,l[0]=Ce(10,(Re-t%Re)%Re),e.e=-t||0):l[0]=e.e=0,e;if(0==a?(l.length=p,s=1,p--):(l.length=p+1,s=Ce(10,Re-a),l[p]=o>0?(f/Ce(10,i-o)%Ce(10,o)|0)*s:0),c)for(;;){if(0==p){for(a=1,o=l[0];o>=10;o/=10)a++;for(o=l[0]+=s,s=1;o>=10;o/=10)s++;a!=s&&(e.e++,l[0]==Ie&&(l[0]=1));break}if(l[p]+=s,l[p]!=Ie)break;l[p--]=0,s=1}for(a=l.length;0===l[--a];)l.pop()}return Me&&(e.e>h.maxE?(e.d=null,e.e=NaN):e.e<h.minE&&(e.e=0,e.d=[0])),e}function l(e,t,r){if(!e.isFinite())return N(e);var n,i=e.e,o=a(e.d),s=o.length;return t?(r&&(n=r-s)>0?o=o.charAt(0)+"."+o.slice(1)+g(n):s>1&&(o=o.charAt(0)+"."+o.slice(1)),o=o+(e.e<0?"e":"e+")+e.e):0>i?(o="0."+g(-i-1)+o,r&&(n=r-s)>0&&(o+=g(n))):i>=s?(o+=g(i+1-s),r&&(n=r-i-1)>0&&(o=o+"."+g(n))):((n=i+1)<s&&(o=o.slice(0,n)+"."+o.slice(n)),r&&(n=r-s)>0&&(i+1===s&&(o+="."),o+=g(n))),o}function p(e,t){for(var r=1,n=e[0];n>=10;n/=10)r++;return r+t*Re-1}function h(e,t,r){if(t>Ue)throw Me=!0,r&&(e.precision=r),Error(Oe);return f(new e(be),t,1,!0)}function m(e,t,r){if(t>qe)throw Error(Oe);return f(new e(we),t,r,!0)}function d(e){var t=e.length-1,r=t*Re+1;if(t=e[t]){for(;t%10==0;t/=10)r--;for(t=e[0];t>=10;t/=10)r++}return r}function g(e){for(var t="";e--;)t+="0";return t}function v(e,t,r,n){var i,a=new e(1),o=Math.ceil(n/Re+4);for(Me=!1;;){if(r%2&&(a=a.times(t),C(a.d,o)&&(i=!0)),r=Te(r/2),0===r){r=a.d.length-1,i&&0===a.d[r]&&++a.d[r];break}t=t.times(t),C(t.d,o)}return Me=!0,a}function y(e){return 1&e.d[e.d.length-1]}function x(e,t,r){for(var n,i=new e(t[0]),a=0;++a<t.length;){if(n=new e(t[a]),!n.s){i=n;break}i[r](n)&&(i=n)}return i}function b(e,t){var r,n,i,o,u,c,l,p=0,h=0,m=0,d=e.constructor,g=d.rounding,v=d.precision;if(!e.d||!e.d[0]||e.e>17)return new d(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:NaN);for(null==t?(Me=!1,l=v):l=t,c=new d(.03125);e.e>-2;)e=e.times(c),m+=5;for(n=Math.log(Ce(2,m))/Math.LN10*2+5|0,l+=n,r=o=u=new d(1),d.precision=l;;){if(o=f(o.times(e),l,1),r=r.times(++h),c=u.plus(je(o,r,l,1)),a(c.d).slice(0,l)===a(u.d).slice(0,l)){for(i=m;i--;)u=f(u.times(u),l,1);if(null!=t)return d.precision=v,u;if(!(3>p&&s(u.d,l-n,g,p)))return f(u,d.precision=v,g,Me=!0);d.precision=l+=10,r=o=c=new d(1),h=0,p++}u=c}}function w(e,t){var r,n,i,o,u,c,l,p,m,d,g,v=1,y=10,x=e,b=x.d,N=x.constructor,E=N.rounding,M=N.precision;if(x.s<0||!b||!b[0]||!x.e&&1==b[0]&&1==b.length)return new N(b&&!b[0]?-1/0:1!=x.s?NaN:b?0:x);if(null==t?(Me=!1,m=M):m=t,N.precision=m+=y,r=a(b),n=r.charAt(0),!(Math.abs(o=x.e)<15e14))return p=h(N,m+2,M).times(o+""),x=w(new N(n+"."+r.slice(1)),m-y).plus(p),N.precision=M,null==t?f(x,M,E,Me=!0):x;for(;7>n&&1!=n||1==n&&r.charAt(1)>3;)x=x.times(e),r=a(x.d),n=r.charAt(0),v++;for(o=x.e,n>1?(x=new N("0."+r),o++):x=new N(n+"."+r.slice(1)),d=x,l=u=x=je(x.minus(1),x.plus(1),m,1),g=f(x.times(x),m,1),i=3;;){if(u=f(u.times(g),m,1),p=l.plus(je(u,new N(i),m,1)),a(p.d).slice(0,m)===a(l.d).slice(0,m)){
if(l=l.times(2),0!==o&&(l=l.plus(h(N,m+2,M).times(o+""))),l=je(l,new N(v),m,1),null!=t)return N.precision=M,l;if(!s(l.d,m-y,E,c))return f(l,N.precision=M,E,Me=!0);N.precision=m+=y,p=u=x=je(d.minus(1),d.plus(1),m,1),g=f(x.times(x),m,1),i=c=1}l=p,i+=2}}function N(e){return String(e.s*e.s/0)}function E(e,t){var r,n,i;for((r=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(0>r&&(r=n),r+=+t.slice(n+1),t=t.substring(0,n)):0>r&&(r=t.length),n=0;48===t.charCodeAt(n);n++);for(i=t.length;48===t.charCodeAt(i-1);--i);if(t=t.slice(n,i)){if(i-=n,e.e=r=r-n-1,e.d=[],n=(r+1)%Re,0>r&&(n+=Re),i>n){for(n&&e.d.push(+t.slice(0,n)),i-=Re;i>n;)e.d.push(+t.slice(n,n+=Re));t=t.slice(n),n=Re-t.length}else n-=i;for(;n--;)t+="0";e.d.push(+t),Me&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function M(e,t){var r,n,i,a,o,s,c,f,l;if("Infinity"===t||"NaN"===t)return+t||(e.s=NaN),e.e=NaN,e.d=null,e;if(ze.test(t))r=16,t=t.toLowerCase();else if(Se.test(t))r=2;else{if(!Be.test(t))throw Error(_e+t);r=8}for(a=t.search(/p/i),a>0?(c=+t.slice(a+1),t=t.substring(2,a)):t=t.slice(2),a=t.indexOf("."),o=a>=0,n=e.constructor,o&&(t=t.replace(".",""),s=t.length,a=s-a,i=v(n,new n(r),a,2*a)),f=u(t,r,Ie),l=f.length-1,a=l;0===f[a];--a)f.pop();return 0>a?new n(0*e.s):(e.e=p(f,l),e.d=f,Me=!1,o&&(e=je(e,i,4*s)),c&&(e=e.times(Math.abs(c)<54?Math.pow(2,c):Ne.pow(2,c))),Me=!0,e)}function A(e,t){var r,n=t.d.length;if(3>n)return _(e,2,t,t);r=1.4*Math.sqrt(n),r=r>16?16:0|r,t=t.times(Math.pow(5,-r)),t=_(e,2,t,t);for(var i,a=new e(5),o=new e(16),s=new e(20);r--;)i=t.times(t),t=t.times(a.plus(i.times(o.times(i).minus(s))));return t}function _(e,t,r,n,i){var a,o,s,u,c=1,f=e.precision,l=Math.ceil(f/Re);for(Me=!1,u=r.times(r),s=new e(n);;){if(o=je(s.times(u),new e(t++*t++),f,1),s=i?n.plus(o):n.minus(o),n=je(o.times(u),new e(t++*t++),f,1),o=s.plus(n),void 0!==o.d[l]){for(a=l;o.d[a]===s.d[a]&&a--;);if(-1==a)break}a=s,s=n,n=o,o=a,c++}return Me=!0,o.d.length=l+1,o}function O(e,t){var r,n=t.s<0,i=m(e,e.precision,1),a=i.times(.5);if(t=t.abs(),t.lte(a))return ge=n?4:1,t;if(r=t.divToInt(i),r.isZero())ge=n?3:2;else{if(t=t.minus(r.times(i)),t.lte(a))return ge=y(r)?n?2:3:n?4:1,t;ge=y(r)?n?1:4:n?3:2}return t.minus(i).abs()}function T(e,t,r,n){var i,a,s,c,f,p,h,m,d,g=e.constructor,v=void 0!==r;if(v?(o(r,1,ye),void 0===n?n=g.rounding:o(n,0,8)):(r=g.precision,n=g.rounding),e.isFinite()){for(h=l(e),s=h.indexOf("."),v?(i=2,16==t?r=4*r-3:8==t&&(r=3*r-2)):i=t,s>=0&&(h=h.replace(".",""),d=new g(1),d.e=h.length-s,d.d=u(l(d),10,i),d.e=d.d.length),m=u(h,10,i),a=f=m.length;0==m[--f];)m.pop();if(m[0]){if(0>s?a--:(e=new g(e),e.d=m,e.e=a,e=je(e,d,r,n,0,i),m=e.d,a=e.e,p=de),s=m[r],c=i/2,p=p||void 0!==m[r+1],p=4>n?(void 0!==s||p)&&(0===n||n===(e.s<0?3:2)):s>c||s===c&&(4===n||p||6===n&&1&m[r-1]||n===(e.s<0?8:7)),m.length=r,p)for(;++m[--r]>i-1;)m[r]=0,r||(++a,m.unshift(1));for(f=m.length;!m[f-1];--f);for(s=0,h="";f>s;s++)h+=xe.charAt(m[s]);if(v){if(f>1)if(16==t||8==t){for(s=16==t?4:3,--f;f%s;f++)h+="0";for(m=u(h,i,t),f=m.length;!m[f-1];--f);for(s=1,h="1.";f>s;s++)h+=xe.charAt(m[s])}else h=h.charAt(0)+"."+h.slice(1);h=h+(0>a?"p":"p+")+a}else if(0>a){for(;++a;)h="0"+h;h="0."+h}else if(++a>f)for(a-=f;a--;)h+="0";else f>a&&(h=h.slice(0,a)+"."+h.slice(a))}else h=v?"0p+0":"0";h=(16==t?"0x":2==t?"0b":8==t?"0o":"")+h}else h=N(e);return e.s<0?"-"+h:h}function C(e,t){return e.length>t?(e.length=t,!0):void 0}function S(e){return new this(e).abs()}function z(e){return new this(e).acos()}function B(e){return new this(e).acosh()}function k(e,t){return new this(e).plus(t)}function I(e){return new this(e).asin()}function R(e){return new this(e).asinh()}function P(e){return new this(e).atan()}function U(e){return new this(e).atanh()}function q(e,t){e=new this(e),t=new this(t);var r,n=this.precision,i=this.rounding,a=n+4;return e.s&&t.s?e.d||t.d?!t.d||e.isZero()?(r=t.s<0?m(this,n,i):new this(0),r.s=e.s):!e.d||t.isZero()?(r=m(this,a,1).times(.5),r.s=e.s):t.s<0?(this.precision=a,this.rounding=1,r=this.atan(je(e,t,a,1)),t=m(this,a,1),this.precision=n,this.rounding=i,r=e.s<0?r.minus(t):r.plus(t)):r=this.atan(je(e,t,a,1)):(r=m(this,a,1).times(t.s>0?.25:.75),r.s=e.s):r=new this(NaN),r}function L(e){return new this(e).cbrt()}function j(e){return f(e=new this(e),e.e+1,2)}function F(e){if(!e||"object"!=typeof e)throw Error(Ae+"Object expected");var t,r,n,i=["precision",1,ye,"rounding",0,8,"toExpNeg",-ve,0,"toExpPos",0,ve,"maxE",0,ve,"minE",-ve,0,"modulo",0,9];for(t=0;t<i.length;t+=3)if(void 0!==(n=e[r=i[t]])){if(!(Te(n)===n&&n>=i[t+1]&&n<=i[t+2]))throw Error(_e+r+": "+n);this[r]=n}if(e.hasOwnProperty(r="crypto"))if(void 0===(n=e[r]))this[r]=n;else{if(n!==!0&&n!==!1&&0!==n&&1!==n)throw Error(_e+r+": "+n);this[r]=!(!n||!Ee||!Ee.getRandomValues&&!Ee.randomBytes)}return this}function D(e){return new this(e).cos()}function $(e){return new this(e).cosh()}function G(e){function t(e){var r,n,i,a=this;if(!(a instanceof t))return new t(e);if(a.constructor=t,e instanceof t)return a.s=e.s,a.e=e.e,void(a.d=(e=e.d)?e.slice():e);if(i=typeof e,"number"===i){if(0===e)return a.s=0>1/e?-1:1,a.e=0,void(a.d=[0]);if(0>e?(e=-e,a.s=-1):a.s=1,e===~~e&&1e7>e){for(r=0,n=e;n>=10;n/=10)r++;return a.e=r,void(a.d=[e])}return 0*e!==0?(e||(a.s=NaN),a.e=NaN,void(a.d=null)):E(a,e.toString())}if("string"!==i)throw Error(_e+e);return 45===e.charCodeAt(0)?(e=e.slice(1),a.s=-1):a.s=1,ke.test(e)?E(a,e):M(a,e)}var r,n,i;if(t.prototype=Le,t.ROUND_UP=0,t.ROUND_DOWN=1,t.ROUND_CEIL=2,t.ROUND_FLOOR=3,t.ROUND_HALF_UP=4,t.ROUND_HALF_DOWN=5,t.ROUND_HALF_EVEN=6,t.ROUND_HALF_CEIL=7,t.ROUND_HALF_FLOOR=8,t.EUCLID=9,t.config=F,t.clone=G,t.abs=S,t.acos=z,t.acosh=B,t.add=k,t.asin=I,t.asinh=R,t.atan=P,t.atanh=U,t.atan2=q,t.cbrt=L,t.ceil=j,t.cos=D,t.cosh=$,t.div=H,t.exp=V,t.floor=Z,t.fromJSON=W,t.hypot=Y,t.ln=X,t.log=J,t.log10=K,t.log2=Q,t.max=ee,t.min=te,t.mod=re,t.mul=ne,t.pow=ie,t.random=ae,t.round=oe,t.sign=se,t.sin=ue,t.sinh=ce,t.sqrt=fe,t.sub=le,t.tan=pe,t.tanh=he,t.trunc=me,void 0===e&&(e={}),e)for(i=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],r=0;r<i.length;)e.hasOwnProperty(n=i[r++])||(e[n]=this[n]);return t.config(e),t}function H(e,t){return new this(e).div(t)}function V(e){return new this(e).exp()}function Z(e){return f(e=new this(e),e.e+1,3)}function W(e){var t,r,n,i;if("string"!=typeof e||!e)throw Error(_e+e);if(n=e.length,i=xe.indexOf(e.charAt(0)),1===n)return new this(i>81?[-1/0,1/0,NaN][i-82]:i>40?-(i-41):i);if(64&i)r=16&i,t=r?(7&i)-3:(15&i)-7,n=1;else{if(2===n)return i=88*i+xe.indexOf(e.charAt(1)),new this(i>=2816?-(i-2816)-41:i+41);if(r=32&i,!(31&i))return e=u(e.slice(1),88,10).join(""),new this(r?"-"+e:e);t=15&i,n=t+1,t=1===t?xe.indexOf(e.charAt(1)):2===t?88*xe.indexOf(e.charAt(1))+xe.indexOf(e.charAt(2)):+u(e.slice(1,n),88,10).join(""),16&i&&(t=-t)}return e=u(e.slice(n),88,10).join(""),t=t-e.length+1,e=e+"e"+t,new this(r?"-"+e:e)}function Y(){var e,t,r=new this(0);for(Me=!1,e=0;e<arguments.length;)if(t=new this(arguments[e++]),t.d)r.d&&(r=r.plus(t.times(t)));else{if(t.s)return Me=!0,new this(1/0);r=t}return Me=!0,r.sqrt()}function X(e){return new this(e).ln()}function J(e,t){return new this(e).log(t)}function Q(e){return new this(e).log(2)}function K(e){return new this(e).log(10)}function ee(){return x(this,arguments,"lt")}function te(){return x(this,arguments,"gt")}function re(e,t){return new this(e).mod(t)}function ne(e,t){return new this(e).mul(t)}function ie(e,t){return new this(e).pow(t)}function ae(e){var t,r,n,i,a=0,s=new this(1),u=[];if(void 0===e?e=this.precision:o(e,1,ye),n=Math.ceil(e/Re),this.crypto===!1)for(;n>a;)u[a++]=1e7*Math.random()|0;else if(Ee&&Ee.getRandomValues)for(t=Ee.getRandomValues(new Uint32Array(n));n>a;)i=t[a],i>=429e7?t[a]=Ee.getRandomValues(new Uint32Array(1))[0]:u[a++]=i%1e7;else if(Ee&&Ee.randomBytes){for(t=Ee.randomBytes(n*=4);n>a;)i=t[a]+(t[a+1]<<8)+(t[a+2]<<16)+((127&t[a+3])<<24),i>=214e7?Ee.randomBytes(4).copy(t,a):(u.push(i%1e7),a+=4);a=n/4}else{if(this.crypto)throw Error(Ae+"crypto unavailable");for(;n>a;)u[a++]=1e7*Math.random()|0}for(n=u[--a],e%=Re,n&&e&&(i=Ce(10,Re-e),u[a]=(n/i|0)*i);0===u[a];a--)u.pop();if(0>a)r=0,u=[0];else{for(r=-1;0===u[0];r-=Re)u.shift();for(n=1,i=u[0];i>=10;i/=10)n++;Re>n&&(r-=Re-n)}return s.e=r,s.d=u,s}function oe(e){return f(e=new this(e),e.e+1,this.rounding)}function se(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function ue(e){return new this(e).sin()}function ce(e){return new this(e).sinh()}function fe(e){return new this(e).sqrt()}function le(e,t){return new this(e).sub(t)}function pe(e){return new this(e).tan()}function he(e){return new this(e).tanh()}function me(e){return f(e=new this(e),e.e+1,1)}var de,ge,ve=9e15,ye=1e9,xe="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~",be="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",we="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Ne={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-ve,maxE:ve,crypto:void 0},Ee="undefined"!=typeof crypto?crypto:null,Me=!0,Ae="[DecimalError] ",_e=Ae+"Invalid argument: ",Oe=Ae+"Precision limit exceeded",Te=Math.floor,Ce=Math.pow,Se=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,ze=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Be=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,ke=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Ie=1e7,Re=7,Pe=9007199254740991,Ue=be.length-1,qe=we.length-1,Le={};Le.absoluteValue=Le.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),f(e)},Le.ceil=function(){return f(new this.constructor(this),this.e+1,2)},Le.comparedTo=Le.cmp=function(e){var t,r,n,i,a=this,o=a.d,s=(e=new a.constructor(e)).d,u=a.s,c=e.s;if(!o||!s)return u&&c?u!==c?u:o===s?0:!o^0>u?1:-1:NaN;if(!o[0]||!s[0])return o[0]?u:s[0]?-c:0;if(u!==c)return u;if(a.e!==e.e)return a.e>e.e^0>u?1:-1;for(n=o.length,i=s.length,t=0,r=i>n?n:i;r>t;++t)if(o[t]!==s[t])return o[t]>s[t]^0>u?1:-1;return n===i?0:n>i^0>u?1:-1},Le.cosine=Le.cos=function(){var e,t,r=this,n=r.constructor;return r.d?r.d[0]?(e=n.precision,t=n.rounding,n.precision=e+Math.max(r.e,r.sd())+Re,n.rounding=1,r=c(n,O(n,r)),n.precision=e,n.rounding=t,f(2==ge||3==ge?r.neg():r,e,t,!0)):new n(1):new n(NaN)},Le.cubeRoot=Le.cbrt=function(){var e,t,r,n,i,o,s,u,c,l,p=this,h=p.constructor;if(!p.isFinite()||p.isZero())return new h(p);for(Me=!1,o=p.s*Math.pow(p.s*p,1/3),o&&Math.abs(o)!=1/0?n=new h(o.toString()):(r=a(p.d),e=p.e,(o=(e-r.length+1)%3)&&(r+=1==o||-2==o?"0":"00"),o=Math.pow(r,1/3),e=Te((e+1)/3)-(e%3==(0>e?-1:2)),o==1/0?r="5e"+e:(r=o.toExponential(),r=r.slice(0,r.indexOf("e")+1)+e),n=new h(r),n.s=p.s),s=(e=h.precision)+3;;)if(u=n,c=u.times(u).times(u),l=c.plus(p),n=je(l.plus(p).times(u),l.plus(c),s+2,1),a(u.d).slice(0,s)===(r=a(n.d)).slice(0,s)){if(r=r.slice(s-3,s+1),"9999"!=r&&(i||"4999"!=r)){+r&&(+r.slice(1)||"5"!=r.charAt(0))||(f(n,e+1,1),t=!n.times(n).times(n).eq(p));break}if(!i&&(f(u,e+1,0),u.times(u).times(u).eq(p))){n=u;break}s+=4,i=1}return Me=!0,f(n,e,h.rounding,t)},Le.decimalPlaces=Le.dp=function(){var e,t=this.d,r=NaN;if(t){if(e=t.length-1,r=(e-Te(this.e/Re))*Re,e=t[e])for(;e%10==0;e/=10)r--;0>r&&(r=0)}return r},Le.dividedBy=Le.div=function(e){return je(this,new this.constructor(e))},Le.dividedToIntegerBy=Le.divToInt=function(e){var t=this,r=t.constructor;return f(je(t,new r(e),0,1,1),r.precision,r.rounding)},Le.equals=Le.eq=function(e){return 0===this.cmp(e)},Le.floor=function(){return f(new this.constructor(this),this.e+1,3)},Le.greaterThan=Le.gt=function(e){return this.cmp(e)>0},Le.greaterThanOrEqualTo=Le.gte=function(e){var t=this.cmp(e);return 1==t||0===t},Le.hyperbolicCosine=Le.cosh=function(){var e,t,r,n,i,a=this,o=a.constructor,s=new o(1);if(!a.isFinite())return new o(a.s?1/0:NaN);if(a.isZero())return s;r=o.precision,n=o.rounding,o.precision=r+Math.max(a.e,a.sd())+4,o.rounding=1,i=a.d.length,32>i?(e=Math.ceil(i/3),t=Math.pow(4,-e).toString()):(e=16,t="2.3283064365386962890625e-10"),a=_(o,1,a.times(t),new o(1),!0);for(var u,c=e,l=new o(8);c--;)u=a.times(a),a=s.minus(u.times(l.minus(u.times(l))));return f(a,o.precision=r,o.rounding=n,!0)},Le.hyperbolicSine=Le.sinh=function(){var e,t,r,n,i=this,a=i.constructor;if(!i.isFinite()||i.isZero())return new a(i);if(t=a.precision,r=a.rounding,a.precision=t+Math.max(i.e,i.sd())+4,a.rounding=1,n=i.d.length,3>n)i=_(a,2,i,i,!0);else{e=1.4*Math.sqrt(n),e=e>16?16:0|e,i=i.times(Math.pow(5,-e)),i=_(a,2,i,i,!0);for(var o,s=new a(5),u=new a(16),c=new a(20);e--;)o=i.times(i),i=i.times(s.plus(o.times(u.times(o).plus(c))))}return a.precision=t,a.rounding=r,f(i,t,r,!0)},Le.hyperbolicTangent=Le.tanh=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+7,n.rounding=1,je(r.sinh(),r.cosh(),n.precision=e,n.rounding=t)):new n(r.s)},Le.inverseCosine=Le.acos=function(){var e,t=this,r=t.constructor,n=t.abs().cmp(1),i=r.precision,a=r.rounding;return-1!==n?0===n?t.isNeg()?m(r,i,a):new r(0):new r(NaN):t.isZero()?m(r,i+4,a).times(.5):(r.precision=i+6,r.rounding=1,t=t.asin(),e=m(r,i+4,a).times(.5),r.precision=i,r.rounding=a,e.minus(t))},Le.inverseHyperbolicCosine=Le.acosh=function(){var e,t,r=this,n=r.constructor;return r.lte(1)?new n(r.eq(1)?0:NaN):r.isFinite()?(e=n.precision,t=n.rounding,n.precision=e+Math.max(Math.abs(r.e),r.sd())+4,n.rounding=1,Me=!1,r=r.times(r).minus(1).sqrt().plus(r),Me=!0,n.precision=e,n.rounding=t,r.ln()):new n(r)},Le.inverseHyperbolicSine=Le.asinh=function(){var e,t,r=this,n=r.constructor;return!r.isFinite()||r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+2*Math.max(Math.abs(r.e),r.sd())+6,n.rounding=1,Me=!1,r=r.times(r).plus(1).sqrt().plus(r),Me=!0,n.precision=e,n.rounding=t,r.ln())},Le.inverseHyperbolicTangent=Le.atanh=function(){var e,t,r,n,i=this,a=i.constructor;return i.isFinite()?i.e>=0?new a(i.abs().eq(1)?i.s/0:i.isZero()?i:NaN):(e=a.precision,t=a.rounding,n=i.sd(),Math.max(n,e)<2*-i.e-1?f(new a(i),e,t,!0):(a.precision=r=n-i.e,i=je(i.plus(1),new a(1).minus(i),r+e,1),a.precision=e+4,a.rounding=1,i=i.ln(),a.precision=e,a.rounding=t,i.times(.5))):new a(NaN)},Le.inverseSine=Le.asin=function(){var e,t,r,n,i=this,a=i.constructor;return i.isZero()?new a(i):(t=i.abs().cmp(1),r=a.precision,n=a.rounding,-1!==t?0===t?(e=m(a,r+4,n).times(.5),e.s=i.s,e):new a(NaN):(a.precision=r+6,a.rounding=1,i=i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(),a.precision=r,a.rounding=n,i.times(2)))},Le.inverseTangent=Le.atan=function(){var e,t,r,n,i,a,o,s,u,c=this,l=c.constructor,p=l.precision,h=l.rounding;if(c.isFinite()){if(c.isZero())return new l(c);if(c.abs().eq(1)&&qe>=p+4)return o=m(l,p+4,h).times(.25),o.s=c.s,o}else{if(!c.s)return new l(NaN);if(qe>=p+4)return o=m(l,p+4,h).times(.5),o.s=c.s,o}for(l.precision=s=p+10,l.rounding=1,r=Math.min(28,s/Re+2|0),e=r;e;--e)c=c.div(c.times(c).plus(1).sqrt().plus(1));for(Me=!1,t=Math.ceil(s/Re),n=1,u=c.times(c),o=new l(c),i=c;-1!==e;)if(i=i.times(u),a=o.minus(i.div(n+=2)),i=i.times(u),o=a.plus(i.div(n+=2)),void 0!==o.d[t])for(e=t;o.d[e]===a.d[e]&&e--;);return r&&(o=o.times(2<<r-1)),Me=!0,f(o,l.precision=p,l.rounding=h,!0)},Le.isFinite=function(){return!!this.d},Le.isInteger=Le.isInt=function(){return!!this.d&&Te(this.e/Re)>this.d.length-2},Le.isNaN=function(){return!this.s},Le.isNegative=Le.isNeg=function(){return this.s<0},Le.isPositive=Le.isPos=function(){return this.s>0},Le.isZero=function(){return!!this.d&&0===this.d[0]},Le.lessThan=Le.lt=function(e){return this.cmp(e)<0},Le.lessThanOrEqualTo=Le.lte=function(e){return this.cmp(e)<1},Le.logarithm=Le.log=function(e){var t,r,n,i,o,u,c,l,p=this,m=p.constructor,d=m.precision,g=m.rounding,v=5;if(null==e)e=new m(10),t=!0;else{if(e=new m(e),r=e.d,e.s<0||!r||!r[0]||e.eq(1))return new m(NaN);t=e.eq(10)}if(r=p.d,p.s<0||!r||!r[0]||p.eq(1))return new m(r&&!r[0]?-1/0:1!=p.s?NaN:r?0:1/0);if(t)if(r.length>1)o=!0;else{for(i=r[0];i%10===0;)i/=10;o=1!==i}if(Me=!1,c=d+v,u=w(p,c),n=t?h(m,c+10):w(e,c),l=je(u,n,c,1),s(l.d,i=d,g))do if(c+=10,u=w(p,c),n=t?h(m,c+10):w(e,c),l=je(u,n,c,1),!o){+a(l.d).slice(i+1,i+15)+1==1e14&&(l=f(l,d+1,0));break}while(s(l.d,i+=10,g));return Me=!0,f(l,d,g)},Le.minus=Le.sub=function(e){var t,r,n,i,a,o,s,u,c,l,h,m,d=this,g=d.constructor;if(e=new g(e),!d.d||!e.d)return d.s&&e.s?d.d?e.s=-e.s:e=new g(e.d||d.s!==e.s?d:NaN):e=new g(NaN),e;if(d.s!=e.s)return e.s=-e.s,d.plus(e);if(c=d.d,m=e.d,s=g.precision,u=g.rounding,!c[0]||!m[0]){if(m[0])e.s=-e.s;else{if(!c[0])return new g(3===u?-0:0);e=new g(d)}return Me?f(e,s,u):e}if(r=Te(e.e/Re),l=Te(d.e/Re),c=c.slice(),a=l-r){for(h=0>a,h?(t=c,a=-a,o=m.length):(t=m,r=l,o=c.length),n=Math.max(Math.ceil(s/Re),o)+2,a>n&&(a=n,t.length=1),t.reverse(),n=a;n--;)t.push(0);t.reverse()}else{for(n=c.length,o=m.length,h=o>n,h&&(o=n),n=0;o>n;n++)if(c[n]!=m[n]){h=c[n]<m[n];break}a=0}for(h&&(t=c,c=m,m=t,e.s=-e.s),o=c.length,n=m.length-o;n>0;--n)c[o++]=0;for(n=m.length;n>a;){if(c[--n]<m[n]){for(i=n;i&&0===c[--i];)c[i]=Ie-1;--c[i],c[n]+=Ie}c[n]-=m[n]}for(;0===c[--o];)c.pop();for(;0===c[0];c.shift())--r;return c[0]?(e.d=c,e.e=p(c,r),Me?f(e,s,u):e):new g(3===u?-0:0)},Le.modulo=Le.mod=function(e){var t,r=this,n=r.constructor;return e=new n(e),!r.d||!e.s||e.d&&!e.d[0]?new n(NaN):!e.d||r.d&&!r.d[0]?f(new n(r),n.precision,n.rounding):(Me=!1,9==n.modulo?(t=je(r,e.abs(),0,3,1),t.s*=e.s):t=je(r,e,0,n.modulo,1),t=t.times(e),Me=!0,r.minus(t))},Le.naturalExponential=Le.exp=function(){return b(this)},Le.naturalLogarithm=Le.ln=function(){return w(this)},Le.negated=Le.neg=function(){var e=new this.constructor(this);return e.s=-e.s,f(e)},Le.plus=Le.add=function(e){var t,r,n,i,a,o,s,u,c,l,h=this,m=h.constructor;if(e=new m(e),!h.d||!e.d)return h.s&&e.s?h.d||(e=new m(e.d||h.s===e.s?h:NaN)):e=new m(NaN),e;if(h.s!=e.s)return e.s=-e.s,h.minus(e);if(c=h.d,l=e.d,s=m.precision,u=m.rounding,!c[0]||!l[0])return l[0]||(e=new m(h)),Me?f(e,s,u):e;if(a=Te(h.e/Re),n=Te(e.e/Re),c=c.slice(),i=a-n){for(0>i?(r=c,i=-i,o=l.length):(r=l,n=a,o=c.length),a=Math.ceil(s/Re),o=a>o?a+1:o+1,i>o&&(i=o,r.length=1),r.reverse();i--;)r.push(0);r.reverse()}for(o=c.length,i=l.length,0>o-i&&(i=o,r=l,l=c,c=r),t=0;i;)t=(c[--i]=c[i]+l[i]+t)/Ie|0,c[i]%=Ie;for(t&&(c.unshift(t),++n),o=c.length;0==c[--o];)c.pop();return e.d=c,e.e=p(c,n),Me?f(e,s,u):e},Le.precision=Le.sd=function(e){var t,r=this;if(void 0!==e&&e!==!!e&&1!==e&&0!==e)throw Error(_e+e);return r.d?(t=d(r.d),e&&r.e+1>t&&(t=r.e+1)):t=NaN,t},Le.round=function(){var e=this,t=e.constructor;return f(new t(e),e.e+1,t.rounding)},Le.sine=Le.sin=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+Math.max(r.e,r.sd())+Re,n.rounding=1,r=A(n,O(n,r)),n.precision=e,n.rounding=t,f(ge>2?r.neg():r,e,t,!0)):new n(NaN)},Le.squareRoot=Le.sqrt=function(){var e,t,r,n,i,o,s=this,u=s.d,c=s.e,l=s.s,p=s.constructor;if(1!==l||!u||!u[0])return new p(!l||0>l&&(!u||u[0])?NaN:u?s:1/0);for(Me=!1,l=Math.sqrt(+s),0==l||l==1/0?(t=a(u),(t.length+c)%2==0&&(t+="0"),l=Math.sqrt(t),c=Te((c+1)/2)-(0>c||c%2),l==1/0?t="1e"+c:(t=l.toExponential(),t=t.slice(0,t.indexOf("e")+1)+c),n=new p(t)):n=new p(l.toString()),r=(c=p.precision)+3;;)if(o=n,n=o.plus(je(s,o,r+2,1)).times(.5),a(o.d).slice(0,r)===(t=a(n.d)).slice(0,r)){if(t=t.slice(r-3,r+1),"9999"!=t&&(i||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(f(n,c+1,1),e=!n.times(n).eq(s));break}if(!i&&(f(o,c+1,0),o.times(o).eq(s))){n=o;break}r+=4,i=1}return Me=!0,f(n,c,p.rounding,e)},Le.tangent=Le.tan=function(){var e,t,r=this,n=r.constructor;return r.isFinite()?r.isZero()?new n(r):(e=n.precision,t=n.rounding,n.precision=e+10,n.rounding=1,r=r.sin(),r.s=1,r=je(r,new n(1).minus(r.times(r)).sqrt(),e+10,0),n.precision=e,n.rounding=t,f(2==ge||4==ge?r.neg():r,e,t,!0)):new n(NaN)},Le.times=Le.mul=function(e){var t,r,n,i,a,o,s,u,c,l=this,h=l.constructor,m=l.d,d=(e=new h(e)).d;if(e.s*=l.s,!(m&&m[0]&&d&&d[0]))return new h(!e.s||m&&!m[0]&&!d||d&&!d[0]&&!m?NaN:m&&d?0*e.s:e.s/0);for(r=Te(l.e/Re)+Te(e.e/Re),u=m.length,c=d.length,c>u&&(a=m,m=d,d=a,o=u,u=c,c=o),a=[],o=u+c,n=o;n--;)a.push(0);for(n=c;--n>=0;){for(t=0,i=u+n;i>n;)s=a[i]+d[n]*m[i-n-1]+t,a[i--]=s%Ie|0,t=s/Ie|0;a[i]=(a[i]+t)%Ie|0}for(;!a[--o];)a.pop();for(t?++r:a.shift(),n=a.length;!a[--n];)a.pop();return e.d=a,e.e=p(a,r),Me?f(e,h.precision,h.rounding):e},Le.toBinary=function(e,t){return T(this,2,e,t)},Le.toDecimalPlaces=Le.toDP=function(e,t){var r=this,n=r.constructor;return r=new n(r),void 0===e?r:(o(e,0,ye),void 0===t?t=n.rounding:o(t,0,8),f(r,e+r.e+1,t))},Le.toExponential=function(e,t){var r,n=this,i=n.constructor;return void 0===e?r=l(n,!0):(o(e,0,ye),void 0===t?t=i.rounding:o(t,0,8),n=f(new i(n),e+1,t),r=l(n,!0,e+1)),n.isNeg()&&!n.isZero()?"-"+r:r},Le.toFixed=function(e,t){var r,n,i=this,a=i.constructor;return void 0===e?r=l(i):(o(e,0,ye),void 0===t?t=a.rounding:o(t,0,8),n=f(new a(i),e+i.e+1,t),r=l(n,!1,e+n.e+1)),i.isNeg()&&!i.isZero()?"-"+r:r},Le.toFraction=function(e){var t,r,n,i,o,s,u,c,f,l,p,h,m=this,g=m.d,v=m.constructor;if(!g)return new v(m);if(f=r=new v(1),n=c=new v(0),t=new v(n),o=t.e=d(g)-m.e-1,s=o%Re,t.d[0]=Ce(10,0>s?Re+s:s),null==e)e=o>0?t:f;else{if(u=new v(e),!u.isInt()||u.lt(f))throw Error(_e+u);e=u.gt(t)?o>0?t:f:u}for(Me=!1,u=new v(a(g)),l=v.precision,v.precision=o=g.length*Re*2;p=je(u,t,0,1,1),i=r.plus(p.times(n)),1!=i.cmp(e);)r=n,n=i,i=f,f=c.plus(p.times(i)),c=i,i=t,t=u.minus(p.times(i)),u=i;return i=je(e.minus(r),n,0,1,1),c=c.plus(i.times(f)),r=r.plus(i.times(n)),c.s=f.s=m.s,h=je(f,n,o,1).minus(m).abs().cmp(je(c,r,o,1).minus(m).abs())<1?[f,n]:[c,r],v.precision=l,Me=!0,h},Le.toHexadecimal=Le.toHex=function(e,t){return T(this,16,e,t)},Le.toJSON=function(){var e,t,r,n,i,o,s,c,f=this,l=f.s<0;if(!f.d)return xe.charAt(f.s?l?82:83:84);if(t=f.e,1===f.d.length&&4>t&&t>=0&&(o=f.d[0],2857>o))return 41>o?xe.charAt(l?o+41:o):(o-=41,l&&(o+=2816),n=o/88|0,xe.charAt(n)+xe.charAt(o-88*n));if(c=a(f.d),s="",!l&&8>=t&&t>=-7)n=64+t+7;else if(l&&4>=t&&t>=-3)n=80+t+3;else if(c.length===t+1)n=32*l;else if(n=32*l+16*(0>t),t=Math.abs(t),88>t)n+=1,s=xe.charAt(t);else if(7744>t)n+=2,o=t/88|0,s=xe.charAt(o)+xe.charAt(t-88*o);else for(e=u(String(t),10,88),i=e.length,n+=i,r=0;i>r;r++)s+=xe.charAt(e[r]);for(s=xe.charAt(n)+s,e=u(c,10,88),i=e.length,r=0;i>r;r++)s+=xe.charAt(e[r]);return s},Le.toNearest=function(e,t){var r=this,n=r.constructor;if(r=new n(r),null==e){if(!r.d)return r;e=new n(1),t=n.rounding}else{if(e=new n(e),void 0!==t&&o(t,0,8),!r.d)return e.s?r:e;if(!e.d)return e.s&&(e.s=r.s),e}return e.d[0]?(Me=!1,4>t&&(t=[4,5,7,8][t]),r=je(r,e,0,t,1).times(e),Me=!0,f(r)):(e.s=r.s,r=e),r},Le.toNumber=function(){return+this},Le.toOctal=function(e,t){return T(this,8,e,t)},Le.toPower=Le.pow=function(e){var t,r,n,i,o,u,c,l=this,p=l.constructor,h=+(e=new p(e));if(!(l.d&&e.d&&l.d[0]&&e.d[0]))return new p(Ce(+l,h));if(l=new p(l),l.eq(1))return l;if(n=p.precision,o=p.rounding,e.eq(1))return f(l,n,o);if(t=Te(e.e/Re),r=e.d.length-1,c=t>=r,u=l.s,c){if((r=0>h?-h:h)<=Pe)return i=v(p,l,r,n),e.s<0?new p(1).div(i):f(i,n,o)}else if(0>u)return new p(NaN);return u=0>u&&1&e.d[Math.max(t,r)]?-1:1,r=Ce(+l,h),t=0!=r&&isFinite(r)?new p(r+"").e:Te(h*(Math.log("0."+a(l.d))/Math.LN10+l.e+1)),t>p.maxE+1||t<p.minE-1?new p(t>0?u/0:0):(Me=!1,p.rounding=l.s=1,r=Math.min(12,(t+"").length),i=b(e.times(w(l,n+r)),n),i=f(i,n+5,1),s(i.d,n,o)&&(t=n+10,i=f(b(e.times(w(l,t+r)),t),t+5,1),+a(i.d).slice(n+1,n+15)+1==1e14&&(i=f(i,n+1,0))),i.s=u,Me=!0,p.rounding=o,f(i,n,o))},Le.toPrecision=function(e,t){var r,n=this,i=n.constructor;return void 0===e?r=l(n,n.e<=i.toExpNeg||n.e>=i.toExpPos):(o(e,1,ye),void 0===t?t=i.rounding:o(t,0,8),n=f(new i(n),e,t),r=l(n,e<=n.e||n.e<=i.toExpNeg,e)),n.isNeg()&&!n.isZero()?"-"+r:r},Le.toSignificantDigits=Le.toSD=function(e,t){var r=this,n=r.constructor;return void 0===e?(e=n.precision,t=n.rounding):(o(e,1,ye),void 0===t?t=n.rounding:o(t,0,8)),f(new n(r),e,t)},Le.toString=function(){var e=this,t=e.constructor,r=l(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()&&!e.isZero()?"-"+r:r},Le.truncated=Le.trunc=function(){return f(new this.constructor(this),this.e+1,1)},Le.valueOf=function(){var e=this,t=e.constructor,r=l(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()?"-"+r:r};var je=function(){function e(e,t,r){var n,i=0,a=e.length;for(e=e.slice();a--;)n=e[a]*t+i,e[a]=n%r|0,i=n/r|0;return i&&e.unshift(i),e}function t(e,t,r,n){var i,a;if(r!=n)a=r>n?1:-1;else for(i=a=0;r>i;i++)if(e[i]!=t[i]){a=e[i]>t[i]?1:-1;break}return a}function r(e,t,r,n){for(var i=0;r--;)e[r]-=i,i=e[r]<t[r]?1:0,e[r]=i*n+e[r]-t[r];for(;!e[0]&&e.length>1;)e.shift()}return function(n,i,a,o,s,u){var c,l,p,h,m,d,g,v,y,x,b,w,N,E,M,A,_,O,T,C,S=n.constructor,z=n.s==i.s?1:-1,B=n.d,k=i.d;if(!(B&&B[0]&&k&&k[0]))return new S(n.s&&i.s&&(B?!k||B[0]!=k[0]:k)?B&&0==B[0]||!k?0*z:z/0:NaN);for(u?(m=1,l=n.e-i.e):(u=Ie,m=Re,l=Te(n.e/m)-Te(i.e/m)),T=k.length,_=B.length,y=new S(z),x=y.d=[],p=0;k[p]==(B[p]||0);p++);if(k[p]>(B[p]||0)&&l--,null==a?(E=a=S.precision,o=S.rounding):E=s?a+(n.e-i.e)+1:a,0>E)x.push(1),d=!0;else{if(E=E/m+2|0,p=0,1==T){for(h=0,k=k[0],E++;(_>p||h)&&E--;p++)M=h*u+(B[p]||0),x[p]=M/k|0,h=M%k|0;d=h||_>p}else{for(h=u/(k[0]+1)|0,h>1&&(k=e(k,h,u),B=e(B,h,u),T=k.length,_=B.length),A=T,b=B.slice(0,T),w=b.length;T>w;)b[w++]=0;C=k.slice(),C.unshift(0),O=k[0],k[1]>=u/2&&++O;do h=0,c=t(k,b,T,w),0>c?(N=b[0],T!=w&&(N=N*u+(b[1]||0)),h=N/O|0,h>1?(h>=u&&(h=u-1),g=e(k,h,u),v=g.length,w=b.length,c=t(g,b,v,w),1==c&&(h--,r(g,v>T?C:k,v,u))):(0==h&&(c=h=1),g=k.slice()),v=g.length,w>v&&g.unshift(0),r(b,g,w,u),-1==c&&(w=b.length,c=t(k,b,T,w),1>c&&(h++,r(b,w>T?C:k,w,u))),w=b.length):0===c&&(h++,b=[0]),x[p++]=h,c&&b[0]?b[w++]=B[A]||0:(b=[B[A]],w=1);while((A++<_||void 0!==b[0])&&E--);d=void 0!==b[0]}x[0]||x.shift()}if(1==m)y.e=l,de=d;else{for(p=1,h=x[0];h>=10;h/=10)p++;y.e=p+l*m-1,f(y,s?a+y.e+1:a,o,d)}return y}}();Ne=G(Ne),be=new Ne(be),we=new Ne(we),n=function(){return Ne}.call(t,r,t,e),!(void 0!==n&&(e.exports=n))}(this)},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("bignumber",{"":function(){return new e.BigNumber(0)},number:function(t){return new e.BigNumber(t+"")},string:function(t){return new e.BigNumber(t)},BigNumber:function(e){return e},Fraction:function(t){return new e.BigNumber(t.n).div(t.d)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={0:"0",1:"\\left(${args[0]}\\right)"},a}var i=r(19);t.name="bignumber",t.factory=n},function(e,t){"use strict";e.exports=function r(e,t,n){return e&&"function"==typeof e.map?e.map(function(e){return r(e,t,n)}):t(e)}},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("bool",{"":function(){return!1},"boolean":function(e){return e},number:function(e){return!!e},BigNumber:function(e){return!e.isZero()},string:function(e){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;var r=Number(e);if(""!=e&&!isNaN(r))return!!r;throw new Error('Cannot convert "'+e+'" to a boolean')},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);t.name="boolean",t.factory=n},function(e,t,r){e.exports=[r(22),r(25)]},function(e,t,r){"use strict";function n(e,t,r,n,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");e&&e.isChain?this.value=e.value:this.value=e}function u(e,t){"function"==typeof t&&(s.prototype[e]=f(t))}function c(e,t){a(s.prototype,e,function(){var e=t();return"function"==typeof e?f(e):void 0})}function f(e){return function(){for(var t=[this.value],r=0;r<arguments.length;r++)t[r+1]=arguments[r];return new s(e.apply(e,t))}}return s.prototype.type="Chain",s.prototype.isChain=!0,s.prototype.done=function(){return this.value},s.prototype.valueOf=function(){return this.value},s.prototype.toString=function(){return i(this.value)},s.createProxy=function(e,t){if("string"==typeof e)u(e,t);else for(var r in e)e.hasOwnProperty(r)&&u(r,e[r])},s.createProxy(o),o.on("import",function(e,t,r){void 0===r&&c(e,t)}),s}var i=r(23).format,a=r(3).lazy;t.name="Chain",t.path="type",t.factory=n,t.math=!0,t.lazy=!1},function(e,t,r){"use strict";function n(e,r){if(Array.isArray(e)){for(var i="[",a=e.length,o=0;a>o;o++)0!=o&&(i+=", "),i+=n(e[o],r);return i+="]"}return t.format(e,r)}var i=r(6).format,a=r(24).format;t.isString=function(e){return"string"==typeof e},t.endsWith=function(e,t){var r=e.length-t.length,n=e.length;return e.substring(r,n)===t},t.format=function(e,r){if("number"==typeof e)return i(e,r);if(e&&e.isBigNumber===!0)return a(e,r);if(e&&e.isFraction===!0)return r&&"decimal"===r.fraction?e.toString():e.s*e.n+"/"+e.d;if(Array.isArray(e))return n(e,r);if(t.isString(e))return'"'+e+'"';if("function"==typeof e)return e.syntax?String(e.syntax):"function";if(e&&"object"==typeof e){if("function"==typeof e.format)return e.format(r);if(e&&e.toString()!=={}.toString())return e.toString();var o=[];for(var s in e)e.hasOwnProperty(s)&&o.push('"'+s+'": '+t.format(e[s],r));return"{"+o.join(", ")+"}"}return String(e)}},function(e,t){t.format=function(e,r){if("function"==typeof r)return r(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var n="auto",i=void 0;switch(void 0!==r&&(r.notation&&(n=r.notation),"number"==typeof r?i=r:r.precision&&(i=r.precision)),n){case"fixed":return t.toFixed(e,i);case"exponential":return t.toExponential(e,i);case"auto":var a=.001,o=1e5;r&&r.exponential&&(void 0!==r.exponential.lower&&(a=r.exponential.lower),void 0!==r.exponential.upper&&(o=r.exponential.upper));({toExpNeg:e.constructor.toExpNeg,toExpPos:e.constructor.toExpPos});if(e.constructor.config({toExpNeg:Math.round(Math.log(a)/Math.LN10),toExpPos:Math.round(Math.log(o)/Math.LN10)}),e.isZero())return"0";var s,u=e.abs();return s=u.gte(a)&&u.lt(o)?e.toSignificantDigits(i).toFixed():t.toExponential(e,i),s.replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],t=arguments[4];return"."!==e?e+t:t});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},t.toExponential=function(e,t){return void 0!==t?e.toExponential(t-1):e.toExponential()},t.toFixed=function(e,t){return e.toFixed(t||0)}},function(e,t){"use strict";function r(e,t,r,n){return n("chain",{"":function(){return new e.Chain},any:function(t){
return new e.Chain(t)}})}t.name="chain",t.factory=r},function(e,t,r){e.exports=[r(27),r(31)]},function(e,t,r){function n(e,t,r,n,s){return i.prototype.type="Complex",i.prototype.isComplex=!0,i.prototype.toJSON=function(){return{mathjs:"Complex",re:this.re,im:this.im}},i.prototype.toPolar=function(){return{r:this.abs(),phi:this.arg()}},i.prototype.format=function(e){var t="",r=this.im,n=this.re,i=a(this.re,e),s=a(this.im,e),u=o(e)?e:e?e.precision:null;if(null!==u){var c=Math.pow(10,-u);Math.abs(n/r)<c&&(n=0),Math.abs(r/n)<c&&(r=0)}return t=0==r?i:0==n?1==r?"i":-1==r?"-i":s+"i":r>0?1==r?i+" + i":i+" + "+s+"i":-1==r?i+" - i":i+" - "+s.substring(1)+"i"},i.fromPolar=function(e){switch(arguments.length){case 1:var t=arguments[0];if("object"==typeof t)return i(t);throw new TypeError("Input has to be an object with r and phi keys.");case 2:var r=arguments[0],n=arguments[1];if(o(r)){if(n&&n.isUnit&&n.hasBase("ANGLE")&&(n=n.toNumber("rad")),o(n))return new i({r:r,phi:n});throw new TypeError("Phi is not a number nor an angle unit.")}throw new TypeError("Radius r is not a number.");default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},i.prototype.valueOf=i.prototype.toString,i.fromJSON=function(e){return new i(e)},i.EPSILON=t.epsilon,s.on("config",function(e,t){e.epsilon!==t.epsilon&&(i.EPSILON=e.epsilon)}),i}var i=r(28),a=r(6).format,o=r(6).isNumber;t.name="Complex",t.path="type",t.factory=n,t.math=!0},function(e,t,r){var n,i;(function(e){/**
	 * @license Complex.js v2.0.1 11/02/2016
	 *
	 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/
!function(a){"use strict";function o(e,t){var r=Math.abs(e),n=Math.abs(t);return 0===e?Math.log(n):0===t?Math.log(r):3e3>r&&3e3>n?.5*Math.log(e*e+t*t):Math.log(e/Math.cos(Math.atan2(t,e)))}function s(e,t){return this instanceof s?(f(e,t),this.re=u.re,void(this.im=u.im)):new s(e,t)}var u={re:0,im:0};Math.cosh=Math.cosh||function(e){return.5*(Math.exp(e)+Math.exp(-e))},Math.sinh=Math.sinh||function(e){return.5*(Math.exp(e)-Math.exp(-e))};var c=function(){throw SyntaxError("Invalid Param")},f=function(e,t){if(void 0===e||null===e)u.re=u.im=0;else if(void 0!==t)u.re=e,u.im=t;else switch(typeof e){case"object":"im"in e&&"re"in e?(u.re=e.re,u.im=e.im):"abs"in e&&"arg"in e?(u.re=e.abs*Math.cos(e.arg),u.im=e.abs*Math.sin(e.arg)):"r"in e&&"phi"in e?(u.re=e.r*Math.cos(e.phi),u.im=e.r*Math.sin(e.phi)):c();break;case"string":u.im=u.re=0;var r=e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),n=1,i=0;null===r&&c();for(var a=0;a<r.length;a++){var o=r[a];" "===o||"	"===o||"\n"===o||("+"===o?n++:"-"===o?i++:"i"===o||"I"===o?(n+i===0&&c()," "===r[a+1]||isNaN(r[a+1])?u.im+=parseFloat((i%2?"-":"")+"1"):(u.im+=parseFloat((i%2?"-":"")+r[a+1]),a++),n=i=0):((n+i===0||isNaN(o))&&c(),"i"===r[a+1]||"I"===r[a+1]?(u.im+=parseFloat((i%2?"-":"")+o),a++):u.re+=parseFloat((i%2?"-":"")+o),n=i=0))}n+i>0&&c();break;case"number":u.im=0,u.re=e;break;default:c()}isNaN(u.re)||isNaN(u.im)};s.prototype={re:0,im:0,sign:function(){var e=this.abs();return new s(this.re/e,this.im/e)},add:function(e,t){return f(e,t),new s(this.re+u.re,this.im+u.im)},sub:function(e,t){return f(e,t),new s(this.re-u.re,this.im-u.im)},mul:function(e,t){return f(e,t),0===u.im&&0===this.im?new s(this.re*u.re,0):new s(this.re*u.re-this.im*u.im,this.re*u.im+this.im*u.re)},div:function(e,t){f(e,t),e=this.re,t=this.im;var r,n,i=u.re,a=u.im;return 0===i&&0===a?new s(0!==e?e/0:0,0!==t?t/0:0):0===a?new s(e/i,t/i):Math.abs(i)<Math.abs(a)?(n=i/a,r=i*n+a,new s((e*n+t)/r,(t*n-e)/r)):(n=a/i,r=a*n+i,new s((e+t*n)/r,(t-e*n)/r))},pow:function(e,t){if(f(e,t),e=this.re,t=this.im,0===e&&0===t)return new s(0,0);var r=Math.atan2(t,e),n=o(e,t);if(0===u.im){if(0===t&&e>=0)return new s(Math.pow(e,u.re),0);if(0===e)switch(u.re%4){case 0:return new s(Math.pow(t,u.re),0);case 1:return new s(0,Math.pow(t,u.re));case 2:return new s(-Math.pow(t,u.re),0);case 3:return new s(0,-Math.pow(t,u.re))}}return e=Math.exp(u.re*n-u.im*r),t=u.im*n+u.re*r,new s(e*Math.cos(t),e*Math.sin(t))},sqrt:function(){var e,t,r=this.re,n=this.im,i=this.abs();return r>=0&&0===n?new s(Math.sqrt(r),0):(e=r>=0?.5*Math.sqrt(2*(i+r)):Math.abs(n)/Math.sqrt(2*(i-r)),t=0>=r?.5*Math.sqrt(2*(i-r)):Math.abs(n)/Math.sqrt(2*(i+r)),new s(e,n>=0?t:-t))},exp:function(){var e=Math.exp(this.re);return 0===this.im,new s(e*Math.cos(this.im),e*Math.sin(this.im))},log:function(){var e=this.re,t=this.im;return new s(o(e,t),Math.atan2(t,e))},abs:function(){var e=Math.abs(this.re),t=Math.abs(this.im);return 3e3>e&&3e3>t?Math.sqrt(e*e+t*t):(t>e?(e=t,t=this.re/this.im):t=this.im/this.re,e*Math.sqrt(1+t*t))},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var e=this.re,t=this.im;return new s(Math.sin(e)*Math.cosh(t),Math.cos(e)*Math.sinh(t))},cos:function(){var e=this.re,t=this.im;return new s(Math.cos(e)*Math.cosh(t),-Math.sin(e)*Math.sinh(t))},tan:function(){var e=2*this.re,t=2*this.im,r=Math.cos(e)+Math.cosh(t);return new s(Math.sin(e)/r,Math.sinh(t)/r)},cot:function(){var e=2*this.re,t=2*this.im,r=Math.cos(e)-Math.cosh(t);return new s(-Math.sin(e)/r,Math.sinh(t)/r)},sec:function(){var e=this.re,t=this.im,r=.5*Math.cosh(2*t)+.5*Math.cos(2*e);return new s(Math.cos(e)*Math.cosh(t)/r,Math.sin(e)*Math.sinh(t)/r)},csc:function(){var e=this.re,t=this.im,r=.5*Math.cosh(2*t)-.5*Math.cos(2*e);return new s(Math.sin(e)*Math.cosh(t)/r,-Math.cos(e)*Math.sinh(t)/r)},asin:function(){var e=this.re,t=this.im,r=new s(t*t-e*e+1,-2*e*t).sqrt(),n=new s(r.re-t,r.im+e).log();return new s(n.im,-n.re)},acos:function(){var e=this.re,t=this.im,r=new s(t*t-e*e+1,-2*e*t).sqrt(),n=new s(r.re-t,r.im+e).log();return new s(Math.PI/2-n.im,n.re)},atan:function(){var e=this.re,t=this.im;if(0===e){if(1===t)return new s(0,1/0);if(-1===t)return new s(0,-(1/0))}var r=e*e+(1-t)*(1-t),n=new s((1-t*t-e*e)/r,-2*e/r).log();return new s(-.5*n.im,.5*n.re)},acot:function(){var e=this.re,t=this.im;if(0===t)return new s(Math.atan2(1,e),0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).atan():new s(0!==e?e/0:0,0!==t?-t/0:0).atan()},asec:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(0,1/0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).acos():new s(0!==e?e/0:0,0!==t?-t/0:0).acos()},acsc:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(Math.PI/2,1/0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).asin():new s(0!==e?e/0:0,0!==t?-t/0:0).asin()},sinh:function(){var e=this.re,t=this.im;return new s(Math.sinh(e)*Math.cos(t),Math.cosh(e)*Math.sin(t))},cosh:function(){var e=this.re,t=this.im;return new s(Math.cosh(e)*Math.cos(t),Math.sinh(e)*Math.sin(t))},tanh:function(){var e=2*this.re,t=2*this.im,r=Math.cosh(e)+Math.cos(t);return new s(Math.sinh(e)/r,Math.sin(t)/r)},coth:function(){var e=2*this.re,t=2*this.im,r=Math.cosh(e)-Math.cos(t);return new s(Math.sinh(e)/r,-Math.sin(t)/r)},csch:function(){var e=this.re,t=this.im,r=Math.cos(2*t)-Math.cosh(2*e);return new s(-2*Math.sinh(e)*Math.cos(t)/r,2*Math.cosh(e)*Math.sin(t)/r)},sech:function(){var e=this.re,t=this.im,r=Math.cos(2*t)+Math.cosh(2*e);return new s(2*Math.cosh(e)*Math.cos(t)/r,-2*Math.sinh(e)*Math.sin(t)/r)},asinh:function(){var e=this.im;this.im=-this.re,this.re=e;var t=this.asin();return this.re=-this.im,this.im=e,e=t.re,t.re=-t.im,t.im=e,t},acosh:function(){var e,t=this.acos();return t.im<=0?(e=t.re,t.re=-t.im,t.im=e):(e=t.im,t.im=-t.re,t.re=e),t},atanh:function(){var e=this.re,t=this.im,r=e>1&&0===t,n=1-e,i=1+e,a=n*n+t*t,u=0!==a?new s((i*n-t*t)/a,(t*n+i*t)/a):new s(-1!==e?e/0:0,0!==t?t/0:0),c=u.re;return u.re=o(u.re,u.im)/2,u.im=Math.atan2(u.im,c)/2,r&&(u.im=-u.im),u},acoth:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(0,Math.PI/2);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).atanh():new s(0!==e?e/0:0,0!==t?-t/0:0).atanh()},acsch:function(){var e=this.re,t=this.im;if(0===t)return new s(0!==e?Math.log(e+Math.sqrt(e*e+1)):1/0,0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).asinh():new s(0!==e?e/0:0,0!==t?-t/0:0).asinh()},asech:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new s(1/0,0);var r=e*e+t*t;return 0!==r?new s(e/r,-t/r).acosh():new s(0!==e?e/0:0,0!==t?-t/0:0).acosh()},inverse:function(){var e=this.re,t=this.im,r=e*e+t*t;return new s(0!==e?e/r:0,0!==t?-t/r:0)},conjugate:function(){return new s(this.re,-this.im)},neg:function(){return new s(-this.re,-this.im)},ceil:function(e){return e=Math.pow(10,e||0),new s(Math.ceil(this.re*e)/e,Math.ceil(this.im*e)/e)},floor:function(e){return e=Math.pow(10,e||0),new s(Math.floor(this.re*e)/e,Math.floor(this.im*e)/e)},round:function(e){return e=Math.pow(10,e||0),new s(Math.round(this.re*e)/e,Math.round(this.im*e)/e)},equals:function(e,t){return f(e,t),Math.abs(u.re-this.re)<=s.EPSILON&&Math.abs(u.im-this.im)<=s.EPSILON},clone:function(){return new s(this.re,this.im)},toString:function(){var e=this.re,t=this.im,r="";return isNaN(e)||isNaN(t)?"NaN":(0!==e&&(r+=e),0!==t&&(0!==e?r+=0>t?" - ":" + ":0>t&&(r+="-"),t=Math.abs(t),1!==t&&(r+=t),r+="i"),r?r:"0")},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)}},s.ZERO=new s(0,0),s.ONE=new s(1,0),s.I=new s(0,1),s.PI=new s(Math.PI,0),s.E=new s(Math.E,0),s.EPSILON=1e-16,r(30).amd?(n=[],i=function(){return s}.apply(t,n),!(void 0!==i&&(e.exports=i))):e.exports=s}(this)}).call(t,r(29)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("complex",{"":function(){return e.Complex.ZERO},number:function(t){return new e.Complex(t,0)},"number, number":function(t,r){return new e.Complex(t,r)},"BigNumber, BigNumber":function(t,r){return new e.Complex(t.toNumber(),r.toNumber())},Complex:function(e){return e.clone()},string:function(t){return e.Complex(t)},Object:function(t){if("re"in t&&"im"in t)return new e.Complex(t.re,t.im);if("r"in t&&"phi"in t)return new e.Complex(t);throw new Error("Expected object with either properties re and im, or properties r and phi.")},"Array | Matrix":function(e){return i(e,s)}});return s.toTex={0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)+"+o.symbols.i+"\\cdot\\left(${args[1]}\\right)\\right)"},s}var i=r(19);t.name="complex",t.factory=n},function(e,t){"use strict";t.symbols={Alpha:"A",alpha:"\\alpha",Beta:"B",beta:"\\beta",Gamma:"\\Gamma",gamma:"\\gamma",Delta:"\\Delta",delta:"\\delta",Epsilon:"E",epsilon:"\\epsilon",varepsilon:"\\varepsilon",Zeta:"Z",zeta:"\\zeta",Eta:"H",eta:"\\eta",Theta:"\\Theta",theta:"\\theta",vartheta:"\\vartheta",Iota:"I",iota:"\\iota",Kappa:"K",kappa:"\\kappa",varkappa:"\\varkappa",Lambda:"\\Lambda",lambda:"\\lambda",Mu:"M",mu:"\\mu",Nu:"N",nu:"\\nu",Xi:"\\Xi",xi:"\\xi",Omicron:"O",omicron:"o",Pi:"\\Pi",pi:"\\pi",varpi:"\\varpi",Rho:"P",rho:"\\rho",varrho:"\\varrho",Sigma:"\\Sigma",sigma:"\\sigma",varsigma:"\\varsigma",Tau:"T",tau:"\\tau",Upsilon:"\\Upsilon",upsilon:"\\upsilon",Phi:"\\Phi",phi:"\\phi",varphi:"\\varphi",Chi:"X",chi:"\\chi",Psi:"\\Psi",psi:"\\psi",Omega:"\\Omega",omega:"\\omega","true":"\\mathrm{True}","false":"\\mathrm{False}",i:"i",inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:"\\lim",undefined:"\\mathbf{?}"},t.operators={transpose:"^\\top",factorial:"!",pow:"^",dotPow:".^\\wedge",unaryPlus:"+",unaryMinus:"-",bitNot:"~",not:"\\neg",multiply:"\\cdot",divide:"\\frac",dotMultiply:".\\cdot",dotDivide:".:",mod:"\\mod",add:"+",subtract:"-",to:"\\rightarrow",leftShift:"<<",rightArithShift:">>",rightLogShift:">>>",equal:"=",unequal:"\\neq",smaller:"<",larger:">",smallerEq:"\\leq",largerEq:"\\geq",bitAnd:"\\&",bitXor:"\\underline{|}",bitOr:"|",and:"\\wedge",xor:"\\veebar",or:"\\vee"},t.defaultTemplate="\\mathrm{${name}}\\left(${args}\\right)";var r={deg:"^\\circ"};t.toSymbol=function(e,n){if(n="undefined"==typeof n?!1:n)return r.hasOwnProperty(e)?r[e]:"\\mathrm{"+e+"}";if(t.symbols.hasOwnProperty(e))return t.symbols[e];if(-1!==e.indexOf("_")){var i=e.indexOf("_");return t.toSymbol(e.substring(0,i))+"_{"+t.toSymbol(e.substring(i+1))+"}"}return e}},function(e,t,r){e.exports=[r(34),r(36)]},function(e,t,r){function n(e,t,r,n){return i}var i=r(35);i.prototype.type="Fraction",i.prototype.isFraction=!0,i.prototype.toJSON=function(){return{mathjs:"Fraction",n:this.s*this.n,d:this.d}},i.fromJSON=function(e){return new i(e)},t.name="Fraction",t.path="type",t.factory=n},function(e,t,r){var n,i;(function(e){/**
	 * @license Fraction.js v3.3.1 09/09/2015
	 * http://www.xarg.org/2014/03/precise-calculations-in-javascript/
	 *
	 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/
!function(a){"use strict";function o(e,t){return isNaN(e=parseInt(e,10))&&s(),e*t}function s(){throw"Invalid Param"}function u(e,t){return this instanceof u?(l(e,t),e=u.REDUCE?d(f.d,f.n):1,this.s=f.s,this.n=f.n/e,void(this.d=f.d/e)):new u(e,t)}var c=2e3,f={s:1,n:0,d:1},l=function(e,t){var r,n=0,i=1,a=1,u=0,c=0,l=0,p=1,h=1,m=0,d=1,g=1,v=1,y=1e7;if(void 0===e||null===e);else if(void 0!==t)n=e,i=t,a=n*i;else switch(typeof e){case"object":"d"in e&&"n"in e?(n=e.n,i=e.d,"s"in e&&(n*=e.s)):0 in e?(n=e[0],1 in e&&(i=e[1])):s(),a=n*i;break;case"number":if(0>e&&(a=e,e=-e),e%1===0)n=e;else if(e>0){for(e>=1&&(h=Math.pow(10,Math.floor(1+Math.log(e)/Math.LN10)),e/=h);y>=d&&y>=v;){if(r=(m+g)/(d+v),e===r){y>=d+v?(n=m+g,i=d+v):v>d?(n=g,i=v):(n=m,i=d);break}e>r?(m+=g,d+=v):(g+=m,v+=d),d>y?(n=g,i=v):(n=m,i=d)}n*=h}else(isNaN(e)||isNaN(t))&&(i=n=NaN);break;case"string":if(d=e.match(/\d+|./g),"-"===d[m]?(a=-1,m++):"+"===d[m]&&m++,d.length===m+1?c=o(d[m++],a):"."===d[m+1]||"."===d[m]?("."!==d[m]&&(u=o(d[m++],a)),m++,(m+1===d.length||"("===d[m+1]&&")"===d[m+3]||"'"===d[m+1]&&"'"===d[m+3])&&(c=o(d[m],a),p=Math.pow(10,d[m].length),m++),("("===d[m]&&")"===d[m+2]||"'"===d[m]&&"'"===d[m+2])&&(l=o(d[m+1],a),h=Math.pow(10,d[m+1].length)-1,m+=3)):"/"===d[m+1]||":"===d[m+1]?(c=o(d[m],a),p=o(d[m+2],1),m+=3):"/"===d[m+3]&&" "===d[m+1]&&(u=o(d[m],a),c=o(d[m+2],a),p=o(d[m+4],1),m+=5),d.length<=m){i=p*h,a=n=l+i*u+h*c;break}default:s()}if(0===i)throw"DIV/0";f.s=0>a?-1:1,f.n=Math.abs(n),f.d=Math.abs(i)},p=function(e,t,r){for(var n=1;t>0;e=e*e%r,t>>=1)1&t&&(n=n*e%r);return n},h=function(e,t){for(;t%2===0;t/=2);for(;t%5===0;t/=5);if(1===t)return 0;for(var r=10%t,n=1;1!==r;n++)if(r=10*r%t,n>c)return 0;return n},m=function(e,t,r){for(var n=1,i=p(10,r,t),a=0;300>a;a++){if(n===i)return a;n=10*n%t,i=10*i%t}return 0},d=function(e,t){if(!e)return t;if(!t)return e;for(;;){if(e%=t,!e)return t;if(t%=e,!t)return e}};u.REDUCE=1,u.prototype={s:1,n:0,d:1,abs:function(){return new u(this.n,this.d)},neg:function(){return new u(-this.s*this.n,this.d)},add:function(e,t){return l(e,t),new u(this.s*this.n*f.d+f.s*this.d*f.n,this.d*f.d)},sub:function(e,t){return l(e,t),new u(this.s*this.n*f.d-f.s*this.d*f.n,this.d*f.d)},mul:function(e,t){return l(e,t),new u(this.s*f.s*this.n*f.n,this.d*f.d)},div:function(e,t){return l(e,t),new u(this.s*f.s*this.n*f.d,this.d*f.n)},clone:function(){return new u(this)},mod:function(e,t){return isNaN(this.n)||isNaN(this.d)?new u(NaN):void 0===e?new u(this.s*this.n%this.d,1):(l(e,t),0===f.n&&0===this.d&&u(0,0),new u(this.s*f.d*this.n%(f.n*this.d),f.d*this.d))},gcd:function(e,t){return l(e,t),new u(d(f.n,this.n),f.d*this.d/d(f.d,this.d))},lcm:function(e,t){return l(e,t),0===f.n&&0===this.n?new u:new u(f.n*this.n/d(f.n,this.n),d(f.d,this.d))},ceil:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.ceil(e*this.s*this.n/this.d),e)},floor:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.floor(e*this.s*this.n/this.d),e)},round:function(e){return e=Math.pow(10,e||0),isNaN(this.n)||isNaN(this.d)?new u(NaN):new u(Math.round(e*this.s*this.n/this.d),e)},inverse:function(){return new u(this.s*this.d,this.n)},pow:function(e){return 0>e?new u(Math.pow(this.s*this.d,-e),Math.pow(this.n,-e)):new u(Math.pow(this.s*this.n,e),Math.pow(this.d,e))},equals:function(e,t){return l(e,t),this.s*this.n*f.d===f.s*f.n*this.d},compare:function(e,t){l(e,t);var r=this.s*this.n*f.d-f.s*f.n*this.d;return(r>0)-(0>r)},divisible:function(e,t){return l(e,t),!(!(f.n*this.d)||this.n*f.d%(f.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(e){var t,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(e&&(t=Math.floor(n/i))>0&&(r+=t,r+=" ",n%=i),r+=n,r+="/",r+=i),r},toLatex:function(e){var t,r="",n=this.n,i=this.d;return this.s<0&&(r+="-"),1===i?r+=n:(e&&(t=Math.floor(n/i))>0&&(r+=t,n%=i),r+="\\frac{",r+=n,r+="}{",r+=i,r+="}"),r},toContinued:function(){var e,t=this.n,r=this.d,n=[];do n.push(Math.floor(t/r)),e=t%r,t=r,r=e;while(1!==t);return n},toString:function(){var e,t=this.n,r=this.d;if(isNaN(t)||isNaN(r))return"NaN";u.REDUCE||(e=d(t,r),t/=e,r/=e);for(var n=String(t).split(""),i=0,a=[~this.s?"":"-","",""],o="",s=h(t,r),c=m(t,r,s),f=-1,l=1,p=15+s+c+n.length,g=0;p>g;g++,i*=10){if(g<n.length?i+=Number(n[g]):(l=2,f++),s>0)if(f===c)a[l]+=o+"(",o="";else if(f===s+c){a[l]+=o+")";break}i>=r?(a[l]+=o+(i/r|0),o="",i%=r):l>1?o+="0":a[l]&&(a[l]+="0")}return a[0]+=a[1]||"0",a[2]?a[0]+"."+a[2]:a[0]}},r(30).amd?(n=[],i=function(){return u}.apply(t,n),!(void 0!==i&&(e.exports=i))):e.exports=u}(this)}).call(t,r(29)(e))},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("fraction",{number:function(t){if(!isFinite(t)||isNaN(t))throw new Error(t+" cannot be represented as a fraction");return new e.Fraction(t)},string:function(t){return new e.Fraction(t)},"number, number":function(t,r){return new e.Fraction(t,r)},BigNumber:function(t){return new e.Fraction(t.toString())},Fraction:function(e){return e},Object:function(t){return new e.Fraction(t)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);t.name="fraction",t.factory=n},function(e,t,r){e.exports=[r(38),r(46),r(47),r(50),r(59),r(65),r(66),r(67),r(68),r(52),r(69)]},function(e,t,r){"use strict";function n(e,t,r,n){function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator")}return i.prototype.type="Matrix",i.prototype.isMatrix=!0,i.storage=function(e){if(!o(e))throw new TypeError("format must be a string value");var t=i._storage[e];if(!t)throw new SyntaxError("Unsupported matrix storage format: "+e);return t},i._storage={},i.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},i.prototype.datatype=function(){throw new Error("Cannot invoke datatype on a Matrix interface")},i.prototype.create=function(e,t){throw new Error("Cannot invoke create on a Matrix interface")},i.prototype.subset=function(e,t,r){throw new Error("Cannot invoke subset on a Matrix interface")},i.prototype.get=function(e){throw new Error("Cannot invoke get on a Matrix interface")},i.prototype.set=function(e,t,r){throw new Error("Cannot invoke set on a Matrix interface")},i.prototype.resize=function(e,t){throw new Error("Cannot invoke resize on a Matrix interface")},i.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},i.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},i.prototype.map=function(e,t){throw new Error("Cannot invoke map on a Matrix interface")},i.prototype.forEach=function(e){throw new Error("Cannot invoke forEach on a Matrix interface")},i.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},i.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},i.prototype.format=function(e){throw new Error("Cannot invoke format on a Matrix interface")},i.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},i}var i=r(39),a=i.string,o=a.isString;t.name="Matrix",t.path="type",t.factory=n},function(e,t,r){"use strict";t.array=r(40),t["boolean"]=r(44),t["function"]=r(45),t.number=r(6),t.object=r(3),t.string=r(23),t.types=r(41),t.emitter=r(8)},function(e,t,r){"use strict";function n(e,t,r){var i,a=e.length;if(a!=t[r])throw new c(a,t[r]);if(r<t.length-1){var o=r+1;for(i=0;a>i;i++){var s=e[i];if(!Array.isArray(s))throw new c(t.length-1,t.length,"<");n(e[i],t,o)}}else for(i=0;a>i;i++)if(Array.isArray(e[i]))throw new c(t.length+1,t.length,">")}function i(e,r,n,a){var o,s,u=e.length,c=r[n],f=Math.min(u,c);if(e.length=c,n<r.length-1){var l=n+1;for(o=0;f>o;o++)s=e[o],Array.isArray(s)||(s=[s],e[o]=s),i(s,r,l,a);for(o=f;c>o;o++)s=[],e[o]=s,i(s,r,l,a)}else{for(o=0;f>o;o++)for(;Array.isArray(e[o]);)e[o]=e[o][0];if(a!==t.UNINITIALIZED)for(o=f;c>o;o++)e[o]=a}}function a(e,t,r){var n,i;if(t>r){var o=r+1;for(n=0,i=e.length;i>n;n++)e[n]=a(e[n],t,o)}else for(;Array.isArray(e);)e=e[0];return e}function o(e,t,r){var n,i;if(Array.isArray(e)){var a=r+1;for(n=0,i=e.length;i>n;n++)e[n]=o(e[n],t,a)}else for(var s=r;t>s;s++)e=[e];return e}var s=r(6),u=r(23),c=(r(3),r(41),r(42)),f=r(43);t.size=function(e){for(var t=[];Array.isArray(e);)t.push(e.length),e=e[0];return t},t.validate=function(e,t){var r=0==t.length;if(r){if(Array.isArray(e))throw new c(e.length,0)}else n(e,t,0)},t.validateIndex=function(e,t){if(!s.isNumber(e)||!s.isInteger(e))throw new TypeError("Index must be an integer (value: "+e+")");if(0>e||"number"==typeof t&&e>=t)throw new f(e,t)},t.UNINITIALIZED={},t.resize=function(e,t,r){if(!Array.isArray(e)||!Array.isArray(t))throw new TypeError("Array expected");if(0===t.length)throw new Error("Resizing to scalar is not supported");t.forEach(function(e){if(!s.isNumber(e)||!s.isInteger(e)||0>e)throw new TypeError("Invalid size, must contain positive integers (size: "+u.format(t)+")")});var n=void 0!==r?r:0;return i(e,t,0,n),e},t.squeeze=function(e,r){for(var n=r||t.size(e);Array.isArray(e)&&1===e.length;)e=e[0],n.shift();for(var i=n.length;1===n[i-1];)i--;return i<n.length&&(e=a(e,i,0),n.length=i),e},t.unsqueeze=function(e,r,n,i){var a=i||t.size(e);if(n)for(var s=0;n>s;s++)e=[e],a.unshift(1);for(e=o(e,r,0);a.length<r;)a.push(1);return e},t.flatten=function(e){if(!Array.isArray(e))return e;var t=[];return e.forEach(function r(e){Array.isArray(e)?e.forEach(r):t.push(e)}),t},t.isArray=Array.isArray},function(e,t){"use strict";t.type=function(e){var t=typeof e;return"object"===t?null===e?"null":e instanceof Boolean?"boolean":e instanceof Number?"number":e instanceof String?"string":Array.isArray(e)?"Array":e instanceof Date?"Date":e instanceof RegExp?"RegExp":"Object":"function"===t?"Function":t},t.isScalar=function(e){return!(e&&e.isMatrix||Array.isArray(e))}},function(e,t){"use strict";function r(e,t,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=t,this.relation=n,this.message="Dimension mismatch ("+(Array.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(Array.isArray(t)?"["+t.join(", ")+"]":t)+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="DimensionError",r.prototype.isDimensionError=!0,e.exports=r},function(e,t){"use strict";function r(e,t,n){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=t):(this.min=t,this.max=n),void 0!==this.min&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":void 0!==this.max&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="IndexError",r.prototype.isIndexError=!0,e.exports=r},function(e,t){"use strict";t.isBoolean=function(e){return"boolean"==typeof e}},function(e,t){t.memoize=function(e,t){return function r(){"object"!=typeof r.cache&&(r.cache={});for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var a=t?t(n):JSON.stringify(n);return a in r.cache?r.cache[a]:r.cache[a]=e.apply(e,n)}}},function(e,t,r){"use strict";function n(e,t,n,c){function d(e,t){if(!(this instanceof d))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!h(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0)"DenseMatrix"===e.type?(this._data=u.clone(e._data),this._size=u.clone(e._size),this._datatype=t||e._datatype):(this._data=e.toArray(),this._size=e.size(),this._datatype=t||e._datatype);else if(e&&f(e.data)&&f(e.size))this._data=e.data,this._size=e.size,this._datatype=t||e.datatype;else if(f(e))this._data=w(e),this._size=s.size(this._data),s.validate(this._data,this._size),this._datatype=t;else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._data=[],this._size=[0],this._datatype=t}}function g(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var r=t.isScalar();if(r)return e.get(t.min());var n=t.size();if(n.length!=e._size.length)throw new a(n.length,e._size.length);for(var i=t.min(),o=t.max(),s=0,u=e._size.length;u>s;s++)m(i[s],e._size[s]),m(o[s],e._size[s]);return new d(v(e._data,t,n.length,0),e._datatype)}function v(e,t,r,n){var i=n==r-1,a=t.dimension(n);return i?a.map(function(t){return e[t]}).valueOf():a.map(function(i){var a=e[i];return v(a,t,r,n+1)}).valueOf()}function y(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var i,o=t.size(),c=t.isScalar();if(r&&r.isMatrix===!0?(i=r.size(),r=r.valueOf()):i=s.size(r),c){if(0!==i.length)throw new TypeError("Scalar expected");e.set(t.min(),r,n)}else{if(o.length<e._size.length)throw new a(o.length,e._size.length,"<");if(i.length<o.length){for(var f=0,l=0;1===o[f]&&1===i[f];)f++;for(;1===o[f];)l++,f++;r=s.unsqueeze(r,o.length,l,i)}if(!u.deepEqual(o,i))throw new a(o,i,">");var p=t.max().map(function(e){return e+1});b(e,p,n);var h=o.length,m=0;x(e._data,t,r,h,m)}return e}function x(e,t,r,n,i){var a=i==n-1,o=t.dimension(i);a?o.forEach(function(t,n){m(t),e[t]=r[n[0]]}):o.forEach(function(a,o){m(a),x(e[a],t,r[o[0]],n,i+1)})}function b(e,t,r){for(var n=e._size.slice(0),i=!1;n.length<t.length;)n.push(0),i=!0;for(var a=0,o=t.length;o>a;a++)t[a]>n[a]&&(n[a]=t[a],i=!0);i&&E(e,n,r)}function w(e){for(var t=0,r=e.length;r>t;t++){var n=e[t];f(n)?e[t]=w(n):n&&n.isMatrix===!0&&(e[t]=w(n.valueOf()))}return e}var N=n(r(38));d.prototype=new N,d.prototype.type="DenseMatrix",d.prototype.isDenseMatrix=!0,d.prototype.storage=function(){return"dense"},d.prototype.datatype=function(){return this._datatype},d.prototype.create=function(e,t){return new d(e,t)},d.prototype.subset=function(e,t,r){switch(arguments.length){case 1:return g(this,e);case 2:case 3:return y(this,e,t,r);default:throw new SyntaxError("Wrong number of arguments")}},d.prototype.get=function(e){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);for(var t=0;t<e.length;t++)m(e[t],this._size[t]);for(var r=this._data,n=0,i=e.length;i>n;n++){var o=e[n];m(o,r.length),r=r[o]}return r},d.prototype.set=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(e.length<this._size.length)throw new a(e.length,this._size.length,"<");var n,i,o,s=e.map(function(e){return e+1});b(this,s,r);var u=this._data;for(n=0,i=e.length-1;i>n;n++)o=e[n],m(o,u.length),u=u[o];return o=e[e.length-1],m(o,u.length),u[o]=t,this},d.prototype.resize=function(e,t,r){if(!f(e))throw new TypeError("Array expected");var n=r?this.clone():this;return E(n,e,t)};var E=function(e,t,r){if(0===t.length){for(var n=e._data;f(n);)n=n[0];return n}return e._size=t.slice(0),e._data=s.resize(e._data,e._size,r),e};return d.prototype.clone=function(){var e=new d({data:u.clone(this._data),size:u.clone(this._size),datatype:this._datatype});return e},d.prototype.size=function(){return this._size.slice(0)},d.prototype.map=function(e){var t=this,r=function(n,i){return f(n)?n.map(function(e,t){return r(e,i.concat(t))}):e(n,i,t)};return new d({data:r(this._data,[]),size:u.clone(this._size),datatype:this._datatype})},d.prototype.forEach=function(e){var t=this,r=function(n,i){f(n)?n.forEach(function(e,t){r(e,i.concat(t))}):e(n,i,t)};r(this._data,[])},d.prototype.toArray=function(){return u.clone(this._data)},d.prototype.valueOf=function(){return this._data},d.prototype.format=function(e){return o.format(this._data,e)},d.prototype.toString=function(){return o.format(this._data)},d.prototype.toJSON=function(){return{mathjs:"DenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},d.prototype.diagonal=function(e){if(e){if(e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e))throw new TypeError("The parameter k must be an integer number")}else e=0;for(var t=e>0?e:0,r=0>e?-e:0,n=this._size[0],i=this._size[1],a=Math.min(n-r,i-t),o=[],s=0;a>s;s++)o[s]=this._data[s+r][s+t];return new d({data:o,size:[a],datatype:this._datatype})},d.diagonal=function(t,r,n,i,a){if(!f(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map(function(e){if(e&&e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e)||1>e)throw new Error("Size values must be positive integers");return e}),n){if(n&&n.isBigNumber===!0&&(n=n.toNumber()),!l(n)||!p(n))throw new TypeError("The parameter k must be an integer number")}else n=0;i&&h(a)&&(i=c.convert(i,a));var o,u=n>0?n:0,m=0>n?-n:0,g=t[0],v=t[1],y=Math.min(g-m,v-u);if(f(r)){if(r.length!==y)throw new Error("Invalid value array length");o=function(e){return r[e]}}else if(r&&r.isMatrix===!0){var x=r.size();if(1!==x.length||x[0]!==y)throw new Error("Invalid matrix length");o=function(e){return r.get([e])}}else o=function(){return r};i||(i=o(0)&&o(0).isBigNumber===!0?new e.BigNumber(0):0);var b=[];if(t.length>0){b=s.resize(b,t,i);for(var w=0;y>w;w++)b[w+m][w+u]=o(w)}return new d({data:b,size:[g,v]})},d.fromJSON=function(e){return new d(e)},d.prototype.swapRows=function(e,t){if(!(l(e)&&p(e)&&l(t)&&p(t)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return m(e,this._size[0]),m(t,this._size[0]),d._swapRows(e,t,this._data),this},d._swapRows=function(e,t,r){var n=r[e];r[e]=r[t],r[t]=n},e.Matrix._storage.dense=d,e.Matrix._storage["default"]=d,d}var i=r(39),a=r(42),o=i.string,s=i.array,u=i.object,c=i.number,f=Array.isArray,l=c.isNumber,p=c.isInteger,h=o.isString,m=s.validateIndex;t.name="DenseMatrix",t.path="type",t.factory=n,t.lazy=!1},function(e,t,r){"use strict";function n(e,t,n,d){function g(e,t){if(!(this instanceof g))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!h(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0)x(this,e,t);else if(e&&f(e.index)&&f(e.ptr)&&f(e.size))this._values=e.values,this._index=e.index,this._ptr=e.ptr,this._size=e.size,this._datatype=t||e.datatype;else if(f(e))b(this,e,t);else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0,0],this._datatype=t}}var v=n(r(38)),y=n(r(48)),x=function(e,t,r){"SparseMatrix"===t.type?(e._values=t._values?s.clone(t._values):void 0,e._index=s.clone(t._index),e._ptr=s.clone(t._ptr),e._size=s.clone(t._size),e._datatype=r||t._datatype):b(e,t.valueOf(),r||t._datatype)},b=function(e,t,r){e._values=[],e._index=[],e._ptr=[],e._datatype=r;var n=t.length,i=0,a=y,o=0;if(h(r)&&(a=d.find(y,[r,r])||y,o=d.convert(0,r)),n>0){var s=0;do{e._ptr.push(e._index.length);for(var u=0;n>u;u++){var c=t[u];if(f(c)){if(0===s&&i<c.length&&(i=c.length),s<c.length){var l=c[s];a(l,o)||(e._values.push(l),e._index.push(u))}}else 0===s&&1>i&&(i=1),a(c,o)||(e._values.push(c),e._index.push(u))}s++}while(i>s)}e._ptr.push(e._index.length),e._size=[n,i]};g.prototype=new v,g.prototype.type="SparseMatrix",g.prototype.isSparseMatrix=!0,g.prototype.storage=function(){return"sparse"},g.prototype.datatype=function(){return this._datatype},g.prototype.create=function(e,t){return new g(e,t)},g.prototype.density=function(){var e=this._size[0],t=this._size[1];return 0!==e&&0!==t?this._index.length/(e*t):0},g.prototype.subset=function(e,t,r){if(!this._values)throw new Error("Cannot invoke subset on a Pattern only matrix");switch(arguments.length){case 1:return w(this,e);case 2:case 3:return N(this,e,t,r);default:throw new SyntaxError("Wrong number of arguments")}};var w=function(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var r=t.isScalar();if(r)return e.get(t.min());var n=t.size();if(n.length!=e._size.length)throw new a(n.length,e._size.length);var i,o,s,u,c=t.min(),f=t.max();for(i=0,o=e._size.length;o>i;i++)m(c[i],e._size[i]),m(f[i],e._size[i]);var l=e._values,p=e._index,h=e._ptr,d=t.dimension(0),v=t.dimension(1),y=[],x=[];d.forEach(function(e,t){x[e]=t[0],y[e]=!0});var b=l?[]:void 0,w=[],N=[];return v.forEach(function(e){for(N.push(w.length),s=h[e],u=h[e+1];u>s;s++)i=p[s],y[i]===!0&&(w.push(x[i]),b&&b.push(l[s]))}),N.push(w.length),new g({values:b,index:w,ptr:N,size:n,datatype:e._datatype})},N=function(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Invalid index");var i,u=t.size(),c=t.isScalar();if(r&&r.isMatrix===!0?(i=r.size(),r=r.toArray()):i=o.size(r),c){if(0!==i.length)throw new TypeError("Scalar expected");e.set(t.min(),r,n)}else{if(1!==u.length&&2!==u.length)throw new a(u.length,e._size.length,"<");if(i.length<u.length){for(var f=0,l=0;1===u[f]&&1===i[f];)f++;for(;1===u[f];)l++,f++;r=o.unsqueeze(r,u.length,l,i)}if(!s.deepEqual(u,i))throw new a(u,i,">");for(var p=t.min()[0],h=t.min()[1],m=i[0],d=i[1],g=0;m>g;g++)for(var v=0;d>v;v++){var y=r[g][v];e.set([g+p,v+h],y,n)}}return e};g.prototype.get=function(e){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);if(!this._values)throw new Error("Cannot invoke get on a Pattern only matrix");var t=e[0],r=e[1];m(t,this._size[0]),m(r,this._size[1]);var n=E(t,this._ptr[r],this._ptr[r+1],this._index);return n<this._ptr[r+1]&&this._index[n]===t?this._values[n]:0},g.prototype.set=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new a(e.length,this._size.length);if(!this._values)throw new Error("Cannot invoke set on a Pattern only matrix");var n=e[0],i=e[1],o=this._size[0],s=this._size[1],u=y,c=0;h(this._datatype)&&(u=d.find(y,[this._datatype,this._datatype])||y,c=d.convert(0,this._datatype)),(n>o-1||i>s-1)&&(_(this,Math.max(n+1,o),Math.max(i+1,s),r),o=this._size[0],s=this._size[1]),m(n,o),m(i,s);var l=E(n,this._ptr[i],this._ptr[i+1],this._index);return l<this._ptr[i+1]&&this._index[l]===n?u(t,c)?M(l,i,this._values,this._index,this._ptr):this._values[l]=t:A(l,n,i,t,this._values,this._index,this._ptr),this};var E=function(e,t,r,n){if(r-t===0)return r;for(var i=t;r>i;i++)if(n[i]===e)return i;return t},M=function(e,t,r,n,i){r.splice(e,1),n.splice(e,1);for(var a=t+1;a<i.length;a++)i[a]--},A=function(e,t,r,n,i,a,o){i.splice(e,0,n),a.splice(e,0,t);for(var s=r+1;s<o.length;s++)o[s]++};g.prototype.resize=function(e,t,r){if(!f(e))throw new TypeError("Array expected");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");e.forEach(function(t){if(!c.isNumber(t)||!c.isInteger(t)||0>t)throw new TypeError("Invalid size, must contain positive integers (size: "+u.format(e)+")")});var n=r?this.clone():this;return _(n,e[0],e[1],t)};var _=function(e,t,r,n){var i=n||0,a=y,o=0;h(e._datatype)&&(a=d.find(y,[e._datatype,e._datatype])||y,o=d.convert(0,e._datatype),i=d.convert(i,e._datatype));var s,u,c,f=!a(i,o),l=e._size[0],p=e._size[1];if(r>p){for(u=p;r>u;u++)if(e._ptr[u]=e._values.length,f)for(s=0;l>s;s++)e._values.push(i),e._index.push(s);e._ptr[r]=e._values.length}else p>r&&(e._ptr.splice(r+1,p-r),e._values.splice(e._ptr[r],e._values.length),e._index.splice(e._ptr[r],e._index.length));if(p=r,t>l){if(f){var m=0;for(u=0;p>u;u++){e._ptr[u]=e._ptr[u]+m,c=e._ptr[u+1]+m;var g=0;for(s=l;t>s;s++,g++)e._values.splice(c+g,0,i),e._index.splice(c+g,0,s),m++}e._ptr[p]=e._values.length}}else if(l>t){var v=0;for(u=0;p>u;u++){e._ptr[u]=e._ptr[u]-v;var x=e._ptr[u],b=e._ptr[u+1]-v;for(c=x;b>c;c++)s=e._index[c],s>t-1&&(e._values.splice(c,1),e._index.splice(c,1),v++)}e._ptr[u]=e._values.length}return e._size[0]=t,e._size[1]=r,e};g.prototype.clone=function(){var e=new g({values:this._values?s.clone(this._values):void 0,index:s.clone(this._index),ptr:s.clone(this._ptr),size:s.clone(this._size),datatype:this._datatype});return e},g.prototype.size=function(){return this._size.slice(0)},g.prototype.map=function(e,t){if(!this._values)throw new Error("Cannot invoke map on a Pattern only matrix");var r=this,n=this._size[0],i=this._size[1],a=function(t,n,i){return e(t,[n,i],r)};return O(this,0,n-1,0,i-1,a,t)};var O=function(e,t,r,n,i,a,o){var s=[],u=[],c=[],f=y,l=0;h(e._datatype)&&(f=d.find(y,[e._datatype,e._datatype])||y,l=d.convert(0,e._datatype));for(var p=function(e,t,r){e=a(e,t,r),f(e,l)||(s.push(e),u.push(t))},m=n;i>=m;m++){c.push(s.length);for(var v=e._ptr[m],x=e._ptr[m+1],b=t,w=v;x>w;w++){var N=e._index[w];if(N>=t&&r>=N){if(!o)for(var E=b;N>E;E++)p(0,E-t,m-n);p(e._values[w],N-t,m-n)}b=N+1}if(!o)for(var M=b;r>=M;M++)p(0,M-t,m-n)}return c.push(s.length),new g({values:s,index:u,ptr:c,size:[r-t+1,i-n+1]})};g.prototype.forEach=function(e,t){if(!this._values)throw new Error("Cannot invoke forEach on a Pattern only matrix");for(var r=this,n=this._size[0],i=this._size[1],a=0;i>a;a++){for(var o=this._ptr[a],s=this._ptr[a+1],u=0,c=o;s>c;c++){var f=this._index[c];if(!t)for(var l=u;f>l;l++)e(0,[l,a],r);e(this._values[c],[f,a],r),u=f+1}if(!t)for(var p=u;n>p;p++)e(0,[p,a],r)}},g.prototype.toArray=function(){return T(this._values,this._index,this._ptr,this._size,!0)},g.prototype.valueOf=function(){return T(this._values,this._index,this._ptr,this._size,!1)};var T=function(e,t,r,n,i){var a,o,u=n[0],c=n[1],f=[];for(a=0;u>a;a++)for(f[a]=[],o=0;c>o;o++)f[a][o]=0;for(o=0;c>o;o++)for(var l=r[o],p=r[o+1],h=l;p>h;h++)a=t[h],f[a][o]=e?i?s.clone(e[h]):e[h]:1;return f};return g.prototype.format=function(e){for(var t=this._size[0],r=this._size[1],n=this.density(),i="Sparse Matrix ["+u.format(t,e)+" x "+u.format(r,e)+"] density: "+u.format(n,e)+"\n",a=0;r>a;a++)for(var o=this._ptr[a],s=this._ptr[a+1],c=o;s>c;c++){var f=this._index[c];i+="\n    ("+u.format(f,e)+", "+u.format(a,e)+") ==> "+(this._values?u.format(this._values[c],e):"X")}return i},g.prototype.toString=function(){return u.format(this.toArray())},g.prototype.toJSON=function(){return{mathjs:"SparseMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size,datatype:this._datatype}},g.prototype.diagonal=function(e){if(e){if(e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e))throw new TypeError("The parameter k must be an integer number")}else e=0;var t=e>0?e:0,r=0>e?-e:0,n=this._size[0],i=this._size[1],a=Math.min(n-r,i-t),o=[],s=[],u=[];u[0]=0;for(var c=t;i>c&&o.length<a;c++)for(var f=this._ptr[c],h=this._ptr[c+1],m=f;h>m;m++){var d=this._index[m];if(d===c-t+r){o.push(this._values[m]),s[o.length-1]=d-r;break}}return u.push(o.length),new g({values:o,index:s,ptr:u,size:[a,1]})},g.fromJSON=function(e){return new g(e)},g.diagonal=function(e,t,r,n,i){if(!f(e))throw new TypeError("Array expected, size parameter");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");if(e=e.map(function(e){if(e&&e.isBigNumber===!0&&(e=e.toNumber()),!l(e)||!p(e)||1>e)throw new Error("Size values must be positive integers");return e}),r){if(r.isBigNumber===!0&&(r=r.toNumber()),!l(r)||!p(r))throw new TypeError("The parameter k must be an integer number")}else r=0;var a=y,o=0;h(i)&&(a=d.find(y,[i,i])||y,o=d.convert(0,i));var s,u=r>0?r:0,c=0>r?-r:0,m=e[0],v=e[1],x=Math.min(m-c,v-u);if(f(t)){if(t.length!==x)throw new Error("Invalid value array length");s=function(e){return t[e]}}else if(t&&t.isMatrix===!0){var b=t.size();if(1!==b.length||b[0]!==x)throw new Error("Invalid matrix length");s=function(e){return t.get([e])}}else s=function(){return t};for(var w=[],N=[],E=[],M=0;v>M;M++){E.push(w.length);var A=M-u;if(A>=0&&x>A){var _=s(A);a(_,o)||(N.push(A+c),w.push(_))}}return E.push(w.length),new g({values:w,index:N,ptr:E,size:[m,v]})},g.prototype.swapRows=function(e,t){if(!(l(e)&&p(e)&&l(t)&&p(t)))throw new Error("Row index must be positive integers");if(2!==this._size.length)throw new Error("Only two dimensional matrix is supported");return m(e,this._size[0]),m(t,this._size[0]),g._swapRows(e,t,this._size[1],this._values,this._index,this._ptr),this},g._forEachRow=function(e,t,r,n,i){for(var a=n[e],o=n[e+1],s=a;o>s;s++)i(r[s],t[s])},g._swapRows=function(e,t,r,n,i,a){for(var o=0;r>o;o++){var s=a[o],u=a[o+1],c=E(e,s,u,i),f=E(t,s,u,i);if(u>c&&u>f&&i[c]===e&&i[f]===t){if(n){var l=n[c];n[c]=n[f],n[f]=l}}else if(u>c&&i[c]===e&&(f>=u||i[f]!==t)){var p=n?n[c]:void 0;i.splice(f,0,t),n&&n.splice(f,0,p),i.splice(c>=f?c+1:c,1),n&&n.splice(c>=f?c+1:c,1)}else if(u>f&&i[f]===t&&(c>=u||i[c]!==e)){var h=n?n[f]:void 0;i.splice(c,0,e),n&&n.splice(c,0,h),i.splice(f>=c?f+1:f,1),n&&n.splice(f>=c?f+1:f,1)}}},e.Matrix._storage.sparse=g,g}var i=r(39),a=r(42),o=i.array,s=i.object,u=i.string,c=i.number,f=Array.isArray,l=c.isNumber,p=c.isInteger,h=u.isString,m=o.validateIndex;t.name="SparseMatrix",t.path="type",t.factory=n,t.lazy=!1},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("equalScalar",{"boolean, boolean":function(e,t){return e===t},"number, number":function(e,r){return e===r||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.eq(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return e.equals(t)},"Complex, Complex":function(e,t){return e.equals(t)},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return o(e.value,t.value)},"string, string":function(e,t){return e===t}});return o}var i=r(6).nearlyEqual,a=r(49);t.factory=n},function(e,t){"use strict";e.exports=function(e,t,r){if(null==r)return e.eq(t);if(e.eq(t))return!0;if(e.isNaN()||t.isNaN())return!1;if(e.isFinite()&&t.isFinite()){var n=e.minus(t).abs();if(n.isZero())return!0;var i=e.constructor.max(e.abs(),t.abs());return n.lte(i.times(r))}return!1}},function(e,t,r){"use strict";function n(e,t,n){function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this._values=[],this._heap=new e.FibonacciHeap}var a=n(r(51)),o=n(r(48));return i.prototype.type="Spa",i.prototype.isSpa=!0,i.prototype.set=function(e,t){if(this._values[e])this._values[e].value=t;else{var r=this._heap.insert(e,t);this._values[e]=r}},i.prototype.get=function(e){var t=this._values[e];return t?t.value:0},i.prototype.accumulate=function(e,t){var r=this._values[e];r?r.value=a(r.value,t):(r=this._heap.insert(e,t),this._values[e]=r)},i.prototype.forEach=function(e,t,r){var n=this._heap,i=this._values,a=[],s=n.extractMinimum();for(s&&a.push(s);s&&s.key<=t;)s.key>=e&&(o(s.value,0)||r(s.key,s.value,this)),s=n.extractMinimum(),s&&a.push(s);for(var u=0;u<a.length;u++){var c=a[u];s=n.insert(c.key,c.value),i[s.key]=s}},i.prototype.swap=function(e,t){var r=this._values[e],n=this._values[t];if(!r&&n)r=this._heap.insert(e,n.value),this._heap.remove(n),this._values[e]=r,this._values[t]=void 0;else if(r&&!n)n=this._heap.insert(t,r.value),this._heap.remove(r),this._values[t]=n,this._values[e]=void 0;else if(r&&n){var i=r.value;r.value=n.value,n.value=i}},i}t.name="Spa",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=n(r(53)),u=r(32),c=n(r(54)),f=n(r(55)),l=n(r(56)),p=n(r(57)),h=n(r(58)),m=a("add",i({"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,s);break;default:r=c(t,e,s,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,s,!1);break;default:r=p(e,t,s)}}return r},"Array, Array":function(e,t){return m(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return m(o(e),t)},"Matrix, Array":function(e,t){return m(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,s,!1);break;default:r=h(e,t,s,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,s,!0);break;default:r=h(t,e,s,!0)}return r},"Array, any":function(e,t){return h(o(e),t,s,!1).valueOf()},"any, Array":function(e,t){return h(o(t),e,s,!0).valueOf()}},s.signatures));return m.toTex={2:"\\left(${args[0]}"+u.operators.add+"${args[1]}\\right)"},m}var i=r(3).extend;t.name="add",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){function i(t,r,n){var i=e.Matrix.storage(r||"default");return new i(t,n)}var a=n("matrix",{"":function(){return i([])},string:function(e){return i([],e)},"string, string":function(e,t){
return i([],e,t)},Array:function(e){return i(e)},Matrix:function(e){return i(e,e.storage())},"Array | Matrix, string":i,"Array | Matrix, string, string":i});return a.toTex={0:"\\begin{bmatrix}\\end{bmatrix}",1:"\\left(${args[0]}\\right)",2:"\\left(${args[0]}\\right)"},a}t.name="matrix",t.factory=r},function(e,t){"use strict";function r(e,t,r,n){var i=n("add",{"number, number":function(e,t){return e+t},"Complex, Complex":function(e,t){return e.add(t)},"BigNumber, BigNumber":function(e,t){return e.plus(t)},"Fraction, Fraction":function(e,t){return e.add(t)},"Unit, Unit":function(e,t){if(null==e.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!e.equalBase(t))throw new Error("Units do not match");var r=e.clone();return r.value=i(r.value,t.value),r.fixPrefix=!1,r}});return i}t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var s=e._data,u=e._size,c=e._datatype,f=t._values,l=t._index,p=t._ptr,h=t._size,m=t._datatype;if(u.length!==h.length)throw new i(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!f)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,g,v=u[0],y=u[1],x="string"==typeof c&&c===m?c:void 0,b=x?n.find(r,[x,x]):r,w=[];for(d=0;v>d;d++)w[d]=[];var N=[],E=[];for(g=0;y>g;g++){for(var M=g+1,A=p[g],_=p[g+1],O=A;_>O;O++)d=l[O],N[d]=o?b(f[O],s[d][g]):b(s[d][g],f[O]),E[d]=M;for(d=0;v>d;d++)E[d]===M?w[d][g]=N[d]:w[d][g]=s[d][g]}return new a({data:w,size:[v,y],datatype:x})};return o}var i=r(42);t.name="algorithm01",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O,T=n&&p?[]:void 0,C=[],S=[],z=new s({values:T,index:C,ptr:S,size:[y,x],datatype:v}),B=n&&p?[]:void 0,k=n&&p?[]:void 0,I=[],R=[];for(M=0;x>M;M++){S[M]=C.length;var P=M+1;for(_=c[M],O=c[M+1],A=_;O>A;A++)E=u[A],C.push(E),I[E]=P,B&&(B[E]=n[A]);for(_=m[M],O=m[M+1],A=_;O>A;A++)if(E=h[A],I[E]===P){if(B){var U=N(B[E],p[A]);b(U,w)?I[E]=null:B[E]=U}}else C.push(E),R[E]=P,k&&(k[E]=p[A]);if(B&&k)for(A=S[M];A<C.length;)E=C[A],I[E]===P?(T[A]=B[E],A++):R[E]===P?(T[A]=k[E],A++):C.splice(A,1)}return S[x]=C.length,z};return u}var i=r(42);t.name="algorithm04",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=e.DenseMatrix,a=function(e,t,r,a){var o=e._values,s=e._index,u=e._ptr,c=e._size,f=e._datatype;if(!o)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=c[0],h=c[1],m=r;"string"==typeof f&&(l=f,t=n.convert(t,l),m=n.find(r,[l,l]));for(var d=[],g=new i({data:d,size:[p,h],datatype:l}),v=[],y=[],x=0;h>x;x++){for(var b=x+1,w=u[x],N=u[x+1],E=w;N>E;E++){var M=s[E];v[M]=o[E],y[M]=b}for(var A=0;p>A;A++)0===x&&(d[A]=[]),y[A]===b?d[A][x]=a?m(t,v[A]):m(v[A],t):d[A][x]=t}return g};return a}t.name="algorithm10",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var i=e.DenseMatrix,o=function(e,t,r){var o=e._data,u=e._size,c=e._datatype,f=t._data,l=t._size,p=t._datatype,h=[];if(u.length!==l.length)throw new a(u.length,l.length);for(var m=0;m<u.length;m++){if(u[m]!==l[m])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+l+")");h[m]=u[m]}var d,g=r;"string"==typeof c&&c===p&&(d=c,t=n.convert(t,d),g=n.find(r,[d,d]));var v=h.length>0?s(g,0,h,h[0],o,f):[];return new i({data:v,size:h,datatype:d})},s=function(e,t,r,n,i,a){var o=[];if(t===r.length-1)for(var u=0;n>u;u++)o[u]=e(i[u],a[u]);else for(var c=0;n>c;c++)o[c]=s(e,t+1,r,r[t+1],i[c],a[c]);return o};return o}var i=r(39),a=r(42),o=i.string;o.isString;t.name="algorithm13",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var u,c=e._data,f=e._size,l=e._datatype,p=r;"string"==typeof l&&(u=l,t=n.convert(t,u),p=n.find(r,[u,u]));var h=f.length>0?s(p,0,f,f[0],c,t,o):[];return new a({data:h,size:i(f),datatype:u})},s=function(e,t,r,n,i,a,o){var u=[];if(t===r.length-1)for(var c=0;n>c;c++)u[c]=o?e(a,i[c]):e(i[c],a);else for(var f=0;n>f;f++)u[f]=s(e,t+1,r,r[t+1],i[f],a,o);return u};return o}var i=r(3).clone;t.name="algorithm14",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");this._minimum=null,this._size=0}var o=n(r(60)),s=n(r(64)),u=1/Math.log((1+Math.sqrt(5))/2);a.prototype.type="FibonacciHeap",a.prototype.isFibonacciHeap=!0,a.prototype.insert=function(e,t){var r={key:e,value:t,degree:0};if(this._minimum){var n=this._minimum;r.left=n,r.right=n.right,n.right=r,r.right.left=r,o(e,n.key)&&(this._minimum=r)}else r.left=r,r.right=r,this._minimum=r;return this._size++,r},a.prototype.size=function(){return this._size},a.prototype.clear=function(){this._minimum=null,this._size=0},a.prototype.isEmpty=function(){return!!this._minimum},a.prototype.extractMinimum=function(){var e=this._minimum;if(null===e)return e;for(var t=this._minimum,r=e.degree,n=e.child;r>0;){var i=n.right;n.left.right=n.right,n.right.left=n.left,n.left=t,n.right=t.right,t.right=n,n.right.left=n,n.parent=null,n=i,r--}return e.left.right=e.right,e.right.left=e.left,e==e.right?t=null:(t=e.right,t=h(t,this._size)),this._size--,this._minimum=t,e},a.prototype.remove=function(e){this._minimum=c(this._minimum,e,-1),this.extractMinimum()};var c=function(e,t,r){t.key=r;var n=t.parent;return n&&o(t.key,n.key)&&(f(e,t,n),l(e,n)),o(t.key,e.key)&&(e=t),e},f=function(e,t,r){t.left.right=t.right,t.right.left=t.left,r.degree--,r.child==t&&(r.child=t.right),0===r.degree&&(r.child=null),t.left=e,t.right=e.right,e.right=t,t.right.left=t,t.parent=null,t.mark=!1},l=function(e,t){var r=t.parent;r&&(t.mark?(f(e,t,r),l(r)):t.mark=!0)},p=function(e,t){e.left.right=e.right,e.right.left=e.left,e.parent=t,t.child?(e.left=t.child,e.right=t.child.right,t.child.right=e,e.right.left=e):(t.child=e,e.right=e,e.left=e),t.degree++,e.mark=!1},h=function(e,t){var r=Math.floor(Math.log(t)*u)+1,n=new Array(r),i=0,a=e;if(a)for(i++,a=a.right;a!==e;)i++,a=a.right;for(var c;i>0;){for(var f=a.degree,l=a.right;;){if(c=n[f],!c)break;if(s(a.key,c.key)){var h=c;c=a,a=h}p(c,a),n[f]=null,f++}n[f]=a,a=l,i--}e=null;for(var m=0;r>m;m++)c=n[m],c&&(e?(c.left.right=c.right,c.right.left=c.left,c.left=e,c.right=e.right,e.right=c,c.right.left=c,o(c.key,e.key)&&(e=c)):e=c);return e};return a}t.name="FibonacciHeap",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("smaller",{"boolean, boolean":function(e,t){return t>e},"number, number":function(e,r){return r>e&&!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.lt(r)&&!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return-1===e.compare(t)},"Complex, Complex":function(e,t){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return t>e},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.smaller+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="smaller",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r,o){var s=e._data,u=e._size,c=e._datatype,f=t._values,l=t._index,p=t._ptr,h=t._size,m=t._datatype;if(u.length!==h.length)throw new i(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!f)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,g=u[0],v=u[1],y=0,x=r;"string"==typeof c&&c===m&&(d=c,y=n.convert(0,d),x=n.find(r,[d,d]));for(var b=[],w=0;g>w;w++)b[w]=[];for(var N=[],E=[],M=0;v>M;M++){for(var A=M+1,_=p[M],O=p[M+1],T=_;O>T;T++){var C=l[T];N[C]=o?x(f[T],s[C][M]):x(s[C][M],f[T]),E[C]=A}for(var S=0;g>S;S++)E[S]===A?b[S][M]=N[S]:b[S][M]=o?x(y,s[S][M]):x(s[S][M],y)}return new a({data:b,size:[g,v],datatype:d})};return o}var i=r(42);t.name="algorithm03",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=e.DenseMatrix,o=function(e,t,r){var o=e._size,u=e._datatype,c=t._size,f=t._datatype;if(o.length!==c.length)throw new i(o.length,c.length);if(o[0]!==c[0]||o[1]!==c[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+c+")");var l,p=o[0],h=o[1],m=0,d=r;"string"==typeof u&&u===f&&(l=u,m=n.convert(0,l),d=n.find(r,[l,l]));var g,v,y=[];for(g=0;p>g;g++)y[g]=[];var x=new a({data:y,size:[p,h],datatype:l}),b=[],w=[],N=[],E=[];for(v=0;h>v;v++){var M=v+1;for(s(e,v,N,b,M),s(t,v,E,w,M),g=0;p>g;g++){var A=N[g]===M?b[g]:m,_=E[g]===M?w[g]:m;y[g][v]=d(A,_)}}return x},s=function(e,t,r,n,i){for(var a=e._values,o=e._index,s=e._ptr,u=s[t],c=s[t+1];c>u;u++){var f=o[u];r[f]=i,n[f]=a[u]}};return o}var i=r(42);t.name="algorithm07",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=e.DenseMatrix,a=function(e,t,r,a){var o=e._values,s=e._index,u=e._ptr,c=e._size,f=e._datatype;if(!o)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,p=c[0],h=c[1],m=r;"string"==typeof f&&(l=f,t=n.convert(t,l),m=n.find(r,[l,l]));for(var d=[],g=new i({data:d,size:[p,h],datatype:l}),v=[],y=[],x=0;h>x;x++){for(var b=x+1,w=u[x],N=u[x+1],E=w;N>E;E++){var M=s[E];v[M]=o[E],y[M]=b}for(var A=0;p>A;A++)0===x&&(d[A]=[]),y[A]===b?d[A][x]=a?m(t,v[A]):m(v[A],t):d[A][x]=a?m(t,0):m(0,t)}return g};return a}t.name="algorithm12",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("larger",{"boolean, boolean":function(e,t){return e>t},"number, number":function(e,r){return e>r&&!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.gt(r)&&!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return 1===e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e>t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.larger+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="larger",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(t&&!u(t))throw new Error("Invalid datatype: "+t);if(e&&e.isMatrix===!0||s(e)){var r=new c(e,t);this._data=r._data,this._size=r._size,this._datatype=r._datatype,this._min=null,this._max=null}else if(e&&s(e.data)&&s(e.size))this._data=e.data,this._size=e.size,this._datatype=e.datatype,this._min="undefined"!=typeof e.min?e.min:null,this._max="undefined"!=typeof e.max?e.max:null;else{if(e)throw new TypeError("Unsupported type of data ("+i.types.type(e)+")");this._data=[],this._size=[0],this._datatype=t,this._min=null,this._max=null}}var c=n(r(46)),f=n(r(60));return a.prototype=new c,a.prototype.type="ImmutableDenseMatrix",a.prototype.isImmutableDenseMatrix=!0,a.prototype.subset=function(e){switch(arguments.length){case 1:var t=c.prototype.subset.call(this,e);return t.isMatrix?new a({data:t._data,size:t._size,datatype:t._datatype}):t;case 2:case 3:throw new Error("Cannot invoke set subset on an Immutable Matrix instance");default:throw new SyntaxError("Wrong number of arguments")}},a.prototype.set=function(){throw new Error("Cannot invoke set on an Immutable Matrix instance")},a.prototype.resize=function(){throw new Error("Cannot invoke resize on an Immutable Matrix instance")},a.prototype.clone=function(){var e=new a({data:o.clone(this._data),size:o.clone(this._size),datatype:this._datatype});return e},a.prototype.toJSON=function(){return{mathjs:"ImmutableDenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},a.fromJSON=function(e){return new a(e)},a.prototype.swapRows=function(){throw new Error("Cannot invoke swapRows on an Immutable Matrix instance")},a.prototype.min=function(){if(null===this._min){var e=null;this.forEach(function(t){(null===e||f(t,e))&&(e=t)}),this._min=null!==e?e:void 0}return this._min},a.prototype.max=function(){if(null===this._max){var e=null;this.forEach(function(t){(null===e||f(e,t))&&(e=t)}),this._max=null!==e?e:void 0}return this._max},a}var i=r(39),a=i.string,o=i.object,s=Array.isArray,u=a.isString;t.name="ImmutableDenseMatrix",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this._dimensions=[],this._isScalar=!0;for(var n=0,i=arguments.length;i>n;n++){var a=arguments[n];if(a&&a.isRange===!0)this._dimensions.push(a),this._isScalar=!1;else if(a&&(Array.isArray(a)||a.isMatrix===!0)){var o=r(a.valueOf());this._dimensions.push(o);var s=o.size();1===s.length&&1===s[0]||(this._isScalar=!1)}else if("number"==typeof a)this._dimensions.push(r([a]));else{if("string"!=typeof a)throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");this._dimensions.push(a)}}}function r(t){for(var r=0,n=t.length;n>r;r++)if("number"!=typeof t[r]||!a(t[r]))throw new TypeError("Index parameters must be positive integer numbers");return new e.ImmutableDenseMatrix(t)}return t.prototype.type="Index",t.prototype.isIndex=!0,t.prototype.clone=function(){var e=new t;return e._dimensions=i(this._dimensions),e._isScalar=this._isScalar,e},t.create=function(e){var r=new t;return t.apply(r,e),r},t.prototype.size=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?1:n.size()[0]}return e},t.prototype.max=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?n:n.max()}return e},t.prototype.min=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e[t]="string"==typeof n?n:n.min()}return e},t.prototype.forEach=function(e){for(var t=0,r=this._dimensions.length;r>t;t++)e(this._dimensions[t],t,this)},t.prototype.dimension=function(e){return this._dimensions[e]||null},t.prototype.isObjectProperty=function(){return 1===this._dimensions.length&&"string"==typeof this._dimensions[0]},t.prototype.getObjectProperty=function(){return this.isObjectProperty()?this._dimensions[0]:null},t.prototype.isScalar=function(){return this._isScalar},t.prototype.toArray=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];e.push("string"==typeof n?n:n.toArray())}return e},t.prototype.valueOf=t.prototype.toArray,t.prototype.toString=function(){for(var e=[],t=0,r=this._dimensions.length;r>t;t++){var n=this._dimensions[t];"string"==typeof n?e.push(JSON.stringify(n)):e.push(n.toString())}return"["+e.join(", ")+"]"},t.prototype.toJSON=function(){return{mathjs:"Index",dimensions:this._dimensions}},t.fromJSON=function(e){return t.create(e.dimensions)},t}var i=r(3).clone,a=r(6).isInteger;t.name="Index",t.path="type",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(e,t,r){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(null!=e)if(e.isBigNumber===!0)e=e.toNumber();else if("number"!=typeof e)throw new TypeError("Parameter start must be a number");if(null!=t)if(t.isBigNumber===!0)t=t.toNumber();else if("number"!=typeof t)throw new TypeError("Parameter end must be a number");if(null!=r)if(r.isBigNumber===!0)r=r.toNumber();else if("number"!=typeof r)throw new TypeError("Parameter step must be a number");this.start=null!=e?parseFloat(e):0,this.end=null!=t?parseFloat(t):0,this.step=null!=r?parseFloat(r):1}return a.prototype.type="Range",a.prototype.isRange=!0,a.parse=function(e){if("string"!=typeof e)return null;var t=e.split(":"),r=t.map(function(e){return parseFloat(e)}),n=r.some(function(e){return isNaN(e)});if(n)return null;switch(r.length){case 2:return new a(r[0],r[1]);case 3:return new a(r[0],r[2],r[1]);default:return null}},a.prototype.clone=function(){return new a(this.start,this.end,this.step)},a.prototype.size=function(){var e=0,t=this.start,r=this.step,n=this.end,a=n-t;return i.sign(r)==i.sign(a)?e=Math.ceil(a/r):0==a&&(e=0),isNaN(e)&&(e=0),[e]},a.prototype.min=function(){var e=this.size()[0];return e>0?this.step>0?this.start:this.start+(e-1)*this.step:void 0},a.prototype.max=function(){var e=this.size()[0];return e>0?this.step>0?this.start+(e-1)*this.step:this.start:void 0},a.prototype.forEach=function(e){var t=this.start,r=this.step,n=this.end,i=0;if(r>0)for(;n>t;)e(t,[i],this),t+=r,i++;else if(0>r)for(;t>n;)e(t,[i],this),t+=r,i++},a.prototype.map=function(e){var t=[];return this.forEach(function(r,n,i){t[n[0]]=e(r,n,i)}),t},a.prototype.toArray=function(){var e=[];return this.forEach(function(t,r){e[r[0]]=t}),e},a.prototype.valueOf=function(){return this.toArray()},a.prototype.format=function(e){var t=i.format(this.start,e);return 1!=this.step&&(t+=":"+i.format(this.step,e)),t+=":"+i.format(this.end,e)},a.prototype.toString=function(){return this.format()},a.prototype.toJSON=function(){return{mathjs:"Range",start:this.start,end:this.end,step:this.step}},a.fromJSON=function(e){return new a(e.start,e.end,e.step)},a}var i=r(6);t.name="Range",t.path="type",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){return n("index",{"...number | string | BigNumber | Range | Array | Matrix":function(t){var r=t.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e&&(Array.isArray(e)||e.isMatrix===!0)?e.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e}):e}),n=new e.Index;return e.Index.apply(n,r),n}})}t.name="index",t.factory=r},function(e,t){"use strict";function r(e,t,r,n){var i=e.SparseMatrix,a=n("sparse",{"":function(){return new i([])},string:function(e){return new i([],e)},"Array | Matrix":function(e){return new i(e)},"Array | Matrix, string":function(e,t){return new i(e,t)}});return a.toTex={0:"\\begin{bsparse}\\end{bsparse}",1:"\\left(${args[0]}\\right)"},a}t.name="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("number",{"":function(){return 0},number:function(e){return e},string:function(e){var t=Number(e);if(isNaN(t))throw new SyntaxError('String "'+e+'" is no valid number');return t},BigNumber:function(e){return e.toNumber()},Fraction:function(e){return e.valueOf()},Unit:function(e){throw new Error("Second argument with valueless unit expected")},"Unit, string | Unit":function(e,t){return e.toNumber(t)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},a}var i=r(19);t.name="number",t.factory=n},function(e,t,r){e.exports=[r(72)]},function(e,t){"use strict";function r(e,t,r,n){function i(e){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this.entries=e||[]}return i.prototype.type="ResultSet",i.prototype.isResultSet=!0,i.prototype.valueOf=function(){return this.entries},i.prototype.toString=function(){return"["+this.entries.join(", ")+"]"},i.prototype.toJSON=function(){return{mathjs:"ResultSet",entries:this.entries}},i.fromJSON=function(e){return new i(e.entries)},i}t.name="ResultSet",t.path="type",t.factory=r},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("string",{"":function(){return""},number:a.format,"null":function(e){return"null"},"boolean":function(e){return e+""},string:function(e){return e},"Array | Matrix":function(e){return i(e,o)},any:function(e){return String(e)}});return o.toTex={0:'\\mathtt{""}',1:"\\mathrm{string}\\left(${args[0]}\\right)"},o}var i=r(19),a=r(6);t.name="string",t.factory=n},function(e,t,r){e.exports=[r(75),r(91),r(92)]},function(e,t,r){"use strict";function n(e,t,n,s,u){function c(e,t){if(!(this instanceof c))throw new Error("Constructor must be called with the new operator");if(void 0!==e&&!O(e)&&!e.isComplex)throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if(void 0!=t&&("string"!=typeof t||""==t))throw new TypeError("Second parameter in Unit constructor must be a string");if(void 0!=t){var r=c.parse(t);this.units=r.units,this.dimensions=r.dimensions}else this.units=[{unit:F,prefix:P.NONE,power:0}],this.dimensions=[0,0,0,0,0,0,0,0,0];this.value=void 0!=e?this._normalize(e):null,this.fixPrefix=!1,this.isUnitListSimplified=!0}function f(){for(;" "==I||"	"==I;)h()}function l(e){return e>="0"&&"9">=e||"."==e}function p(e){return e>="0"&&"9">=e}function h(){k++,I=B.charAt(k)}function m(e){k=e,I=B.charAt(k)}function d(){var e,t="";if(e=k,"+"==I?h():"-"==I&&(t+=I,h()),!l(I))return m(e),null;if("."==I){if(t+=I,h(),!p(I))return m(e),null}else{for(;p(I);)t+=I,h();"."==I&&(t+=I,h())}for(;p(I);)t+=I,h();if("E"==I||"e"==I){var r="",n=k;if(r+=I,h(),"+"!=I&&"-"!=I||(r+=I,h()),!p(I))return m(n),t;for(t+=r;p(I);)t+=I,h()}return t}function g(){for(var e="",t=B.charCodeAt(k);t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t;)e+=I,h(),t=B.charCodeAt(k);return t=e.charCodeAt(0),t>=65&&90>=t||t>=97&&122>=t?e||null:null}function v(e){return I===e?(h(),e):null}function y(e){for(var t in D)if(D.hasOwnProperty(t)&&i(e,t)){var r=D[t],n=e.length-t.length,a=e.substring(0,n),o=r.prefixes[a];if(void 0!==o)return{unit:r,prefix:o}}return null}function x(t){if("BigNumber"===t.number){var r=o.pi(e.BigNumber);D.rad.value=new e.BigNumber(1),D.deg.value=r.div(180),D.grad.value=r.div(200),D.cycle.value=r.times(2),D.arcsec.value=r.div(648e3),D.arcmin.value=r.div(10800)}else D.rad.value=1,D.deg.value=Math.PI/180,D.grad.value=Math.PI/200,D.cycle.value=2*Math.PI,D.arcsec.value=Math.PI/648e3,D.arcmin.value=Math.PI/10800}var b=n(r(53)),w=n(r(77)),N=n(r(80)),E=n(r(81)),M=n(r(82)),A=n(r(86)),_=n(r(87)),O=n(r(88)),T=n(r(89)),C=n(r(90)),S=n(r(70)),z=n(r(27));c.prototype.type="Unit",c.prototype.isUnit=!0;var B,k,I;c.parse=function(r){if(B=r,k=-1,I="","string"!=typeof B)throw new TypeError("Invalid argument in Unit.parse, string expected");var n=new c;n.units=[],h(),f();var i=d(),a=null;i&&(a="BigNumber"===t.number?new e.BigNumber(i):"Fraction"===t.number?new e.Fraction(i):parseFloat(i)),f();for(var o=1,s=!1,u=[],l=1;;){for(f();"("===I;)u.push(o),l*=o,o=1,h(),f();if(!I)break;var p=I,m=g();if(null==m)throw new SyntaxError('Unexpected "'+p+'" in "'+B+'" at index '+k.toString());var x=y(m);if(null==x)throw new SyntaxError('Unit "'+m+'" not found.');var b=o*l;if(f(),v("^")){f();var w=d();if(null==w)throw new SyntaxError('In "'+r+'", "^" must be followed by a floating-point number');b*=w}n.units.push({unit:x.unit,prefix:x.prefix,power:b});for(var N=0;N<q.length;N++)n.dimensions[N]+=x.unit.dimensions[N]*b;for(f();")"===I;){if(0===u.length)throw new SyntaxError('Unmatched ")" in "'+B+'" at index '+k.toString());l/=u.pop(),h(),f()}s=!1,v("*")?(o=1,s=!0):v("/")?(o=-1,s=!0):o=1;var E=x.unit.base.key;G.auto[E]={unit:x.unit,prefix:x.prefix}}if(f(),I)throw new SyntaxError('Could not parse: "'+r+'"');if(s)throw new SyntaxError('Trailing characters: "'+r+'"');if(0!==u.length)throw new SyntaxError('Unmatched "(" in "'+B+'"');if(0==n.units.length)throw new SyntaxError('"'+r+'" contains no units');return n.value=void 0!=a?n._normalize(a):null,n},c.prototype.clone=function(){var e=new c;e.fixPrefix=this.fixPrefix,e.isUnitListSimplified=this.isUnitListSimplified,e.value=a(this.value),e.dimensions=this.dimensions.slice(0),e.units=[];for(var t=0;t<this.units.length;t++){e.units[t]={};for(var r in this.units[t])this.units[t].hasOwnProperty(r)&&(e.units[t][r]=this.units[t][r])}return e},c.prototype._isDerived=function(){return 0===this.units.length?!1:this.units.length>1||Math.abs(this.units[0].power-1)>1e-15},c.prototype._normalize=function(e){var t,r,n,i,a;if(null==e||0===this.units.length)return e;if(this._isDerived()){var o=e;a=c._getNumberConverter(C(e));for(var s=0;s<this.units.length;s++)t=a(this.units[s].unit.value),i=a(this.units[s].prefix.value),n=a(this.units[s].power),o=N(o,M(N(t,i),n));return o}return a=c._getNumberConverter(C(e)),t=a(this.units[0].unit.value),r=a(this.units[0].unit.offset),i=a(this.units[0].prefix.value),N(b(e,r),N(t,i))},c.prototype._denormalize=function(e,t){var r,n,i,a,o;if(null==e||0===this.units.length)return e;if(this._isDerived()){var s=e;o=c._getNumberConverter(C(e));for(var u=0;u<this.units.length;u++)r=o(this.units[u].unit.value),a=o(this.units[u].prefix.value),i=o(this.units[u].power),s=E(s,M(N(r,a),i));return s}return o=c._getNumberConverter(C(e)),r=o(this.units[0].unit.value),a=o(this.units[0].prefix.value),n=o(this.units[0].unit.offset),void 0==t?w(E(E(e,r),a),n):w(E(E(e,r),t),n)},c.isValuelessUnit=function(e){return null!=y(e)},c.prototype.hasBase=function(e){if("string"==typeof e&&(e=L[e]),!e)return!1;for(var t=0;t<q.length;t++)if(Math.abs(this.dimensions[t]-e.dimensions[t])>1e-12)return!1;return!0},c.prototype.equalBase=function(e){for(var t=0;t<q.length;t++)if(Math.abs(this.dimensions[t]-e.dimensions[t])>1e-12)return!1;return!0},c.prototype.equals=function(e){return this.equalBase(e)&&_(this.value,e.value)},c.prototype.multiply=function(e){for(var t=this.clone(),r=0;r<q.length;r++)t.dimensions[r]=this.dimensions[r]+e.dimensions[r];for(var r=0;r<e.units.length;r++){var n=JSON.parse(JSON.stringify(e.units[r]));t.units.push(n)}if(null!=this.value||null!=e.value){var i=null==this.value?this._normalize(1):this.value,a=null==e.value?e._normalize(1):e.value;t.value=N(i,a)}else t.value=null;return t.isUnitListSimplified=!1,R(t)},c.prototype.divide=function(e){for(var t=this.clone(),r=0;r<q.length;r++)t.dimensions[r]=this.dimensions[r]-e.dimensions[r];for(var r=0;r<e.units.length;r++){var n=JSON.parse(JSON.stringify(e.units[r]));n.power=-n.power,t.units.push(n)}if(null!=this.value||null!=e.value){var i=null==this.value?this._normalize(1):this.value,a=null==e.value?e._normalize(1):e.value;t.value=E(i,a)}else t.value=null;return t.isUnitListSimplified=!1,R(t)},c.prototype.pow=function(e){for(var t=this.clone(),r=0;r<q.length;r++)t.dimensions[r]=this.dimensions[r]*e;for(var r=0;r<t.units.length;r++)t.units[r].power*=e;return null!=t.value?t.value=M(t.value,e):t.value=null,t.isUnitListSimplified=!1,R(t)};var R=function(e){return e.equalBase(L.NONE)&&null!==e.value&&!t.predictable?e.value:e};c.prototype.abs=function(){var e=this.clone();e.value=A(e.value);for(var t in e.units)"VA"!==e.units[t].unit.name&&"VAR"!==e.units[t].unit.name||(e.units[t].unit=D.W);return e},c.prototype.to=function(e){var t,r=null==this.value?this._normalize(1):this.value;if("string"==typeof e){if(t=c.parse(e),!this.equalBase(t))throw new Error("Units do not match");if(null!==t.value)throw new Error("Cannot convert to a unit with a value");return t.value=a(r),t.fixPrefix=!0,t.isUnitListSimplified=!0,t}if(e&&e.isUnit){if(!this.equalBase(e))throw new Error("Units do not match");if(null!==e.value)throw new Error("Cannot convert to a unit with a value");return t=e.clone(),t.value=a(r),t.fixPrefix=!0,t.isUnitListSimplified=!0,t}throw new Error("String or Unit expected as parameter")},c.prototype.toNumber=function(e){return S(this.toNumeric(e))},c.prototype.toNumeric=function(e){var t=this.to(e);return t._isDerived()?t._denormalize(t.value):t._denormalize(t.value,t.units[0].prefix.value)},c.prototype.toString=function(){return this.format()},c.prototype.toJSON=function(){return{mathjs:"Unit",value:this._denormalize(this.value),unit:this.formatUnits(),fixPrefix:this.fixPrefix}},c.fromJSON=function(e){var t=new c(e.value,e.unit);return t.fixPrefix=e.fixPrefix||!1,t},c.prototype.valueOf=c.prototype.toString,c.prototype.simplifyUnitListLazy=function(){if(!this.isUnitListSimplified&&null!=this.value){var e,t=[];for(var r in H)if(this.hasBase(L[r])){e=r;break}if("NONE"===e)this.units=[];else{var n;e&&H.hasOwnProperty(e)&&(n=H[e]);if(n)this.units=[{unit:n.unit,prefix:n.prefix,power:1}];else{for(var i=0;i<q.length;i++){var a=q[i];Math.abs(this.dimensions[i])>1e-12&&t.push({unit:H[a].unit,prefix:H[a].prefix,power:this.dimensions[i]})}t.length<this.units.length&&(this.units=t)}}this.isUnitListSimplified=!0}},c.prototype.formatUnits=function(){this.simplifyUnitListLazy();for(var e="",t="",r=0,n=0,i=0;i<this.units.length;i++)this.units[i].power>0?(r++,e+=" "+this.units[i].prefix.name+this.units[i].unit.name,Math.abs(this.units[i].power-1)>1e-15&&(e+="^"+this.units[i].power)):this.units[i].power<0&&n++;if(n>0)for(var i=0;i<this.units.length;i++)this.units[i].power<0&&(r>0?(t+=" "+this.units[i].prefix.name+this.units[i].unit.name,Math.abs(this.units[i].power+1)>1e-15&&(t+="^"+-this.units[i].power)):(t+=" "+this.units[i].prefix.name+this.units[i].unit.name,t+="^"+this.units[i].power));e=e.substr(1),t=t.substr(1),r>1&&n>0&&(e="("+e+")"),n>1&&r>0&&(t="("+t+")");var a=e;return r>0&&n>0&&(a+=" / "),a+=t},c.prototype.format=function(e){this.simplifyUnitListLazy();var t=!1,r=!0;"undefined"!=typeof this.value&&null!==this.value&&this.value.isComplex&&(t=Math.abs(this.value.re)<1e-14,r=Math.abs(this.value.im)<1e-14);for(var n in this.units)this.units[n].unit&&("VA"===this.units[n].unit.name&&t?this.units[n].unit=D.VAR:"VAR"!==this.units[n].unit.name||t||(this.units[n].unit=D.VA));1!==this.units.length||this.fixPrefix||Math.abs(this.units[0].power-Math.round(this.units[0].power))<1e-14&&(this.units[0].prefix=this._bestPrefix());var i=this._denormalize(this.value),a=null!==this.value?T(i,e||{}):"",o=this.formatUnits();return this.value&&this.value.isComplex&&(a="("+a+")"),o.length>0&&a.length>0&&(a+=" "),a+=o},c.prototype._bestPrefix=function(){if(1!==this.units.length)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if(Math.abs(this.units[0].power-Math.round(this.units[0].power))>=1e-14)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
var e=A(this.value),t=A(this.units[0].unit.value),r=this.units[0].prefix;if(0===e)return r;var n=this.units[0].power,i=Math.abs(Math.log(e/Math.pow(r.value*t,n))/Math.LN10-1.2),a=this.units[0].unit.prefixes;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];if(s.scientific){var u=Math.abs(Math.log(e/Math.pow(s.value*t,n))/Math.LN10-1.2);(i>u||u===i&&s.name.length<r.name.length)&&(r=s,i=u)}}return r};var P={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-48,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}},BTU:{"":{name:"",value:1,scientific:!0},MM:{name:"MM",value:1e6,scientific:!0}}};P.SHORTLONG={};for(var U in P.SHORT)P.SHORT.hasOwnProperty(U)&&(P.SHORTLONG[U]=P.SHORT[U]);for(var U in P.LONG)P.LONG.hasOwnProperty(U)&&(P.SHORTLONG[U]=P.LONG[U]);var q=["MASS","LENGTH","TIME","CURRENT","TEMPERATURE","LUMINOUS_INTENSITY","AMOUNT_OF_SUBSTANCE","ANGLE","BIT"],L={NONE:{dimensions:[0,0,0,0,0,0,0,0,0]},MASS:{dimensions:[1,0,0,0,0,0,0,0,0]},LENGTH:{dimensions:[0,1,0,0,0,0,0,0,0]},TIME:{dimensions:[0,0,1,0,0,0,0,0,0]},CURRENT:{dimensions:[0,0,0,1,0,0,0,0,0]},TEMPERATURE:{dimensions:[0,0,0,0,1,0,0,0,0]},LUMINOUS_INTENSITY:{dimensions:[0,0,0,0,0,1,0,0,0]},AMOUNT_OF_SUBSTANCE:{dimensions:[0,0,0,0,0,0,1,0,0]},FORCE:{dimensions:[1,1,-2,0,0,0,0,0,0]},SURFACE:{dimensions:[0,2,0,0,0,0,0,0,0]},VOLUME:{dimensions:[0,3,0,0,0,0,0,0,0]},ENERGY:{dimensions:[1,2,-2,0,0,0,0,0,0]},POWER:{dimensions:[1,2,-3,0,0,0,0,0,0]},PRESSURE:{dimensions:[1,-1,-2,0,0,0,0,0,0]},ELECTRIC_CHARGE:{dimensions:[0,0,1,1,0,0,0,0,0]},ELECTRIC_CAPACITANCE:{dimensions:[-1,-2,4,2,0,0,0,0,0]},ELECTRIC_POTENTIAL:{dimensions:[1,2,-3,-1,0,0,0,0,0]},ELECTRIC_RESISTANCE:{dimensions:[1,2,-3,-2,0,0,0,0,0]},ELECTRIC_INDUCTANCE:{dimensions:[1,2,-2,-2,0,0,0,0,0]},ELECTRIC_CONDUCTANCE:{dimensions:[-1,-2,3,2,0,0,0,0,0]},MAGNETIC_FLUX:{dimensions:[1,2,-2,-1,0,0,0,0,0]},MAGNETIC_FLUX_DENSITY:{dimensions:[1,0,-2,-1,0,0,0,0,0]},FREQUENCY:{dimensions:[0,0,-1,0,0,0,0,0,0]},ANGLE:{dimensions:[0,0,0,0,0,0,0,1,0]},BIT:{dimensions:[0,0,0,0,0,0,0,0,1]}};for(var U in L)L[U].key=U;var j={},F={name:"",base:j,value:1,offset:0,dimensions:[0,0,0,0,0,0,0,0,0]},D={meter:{name:"meter",base:L.LENGTH,prefixes:P.LONG,value:1,offset:0},inch:{name:"inch",base:L.LENGTH,prefixes:P.NONE,value:.0254,offset:0},foot:{name:"foot",base:L.LENGTH,prefixes:P.NONE,value:.3048,offset:0},yard:{name:"yard",base:L.LENGTH,prefixes:P.NONE,value:.9144,offset:0},mile:{name:"mile",base:L.LENGTH,prefixes:P.NONE,value:1609.344,offset:0},link:{name:"link",base:L.LENGTH,prefixes:P.NONE,value:.201168,offset:0},rod:{name:"rod",base:L.LENGTH,prefixes:P.NONE,value:5.02921,offset:0},chain:{name:"chain",base:L.LENGTH,prefixes:P.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:L.LENGTH,prefixes:P.NONE,value:1e-10,offset:0},m:{name:"m",base:L.LENGTH,prefixes:P.SHORT,value:1,offset:0},"in":{name:"in",base:L.LENGTH,prefixes:P.NONE,value:.0254,offset:0},ft:{name:"ft",base:L.LENGTH,prefixes:P.NONE,value:.3048,offset:0},yd:{name:"yd",base:L.LENGTH,prefixes:P.NONE,value:.9144,offset:0},mi:{name:"mi",base:L.LENGTH,prefixes:P.NONE,value:1609.344,offset:0},li:{name:"li",base:L.LENGTH,prefixes:P.NONE,value:.201168,offset:0},rd:{name:"rd",base:L.LENGTH,prefixes:P.NONE,value:5.02921,offset:0},ch:{name:"ch",base:L.LENGTH,prefixes:P.NONE,value:20.1168,offset:0},mil:{name:"mil",base:L.LENGTH,prefixes:P.NONE,value:254e-7,offset:0},m2:{name:"m2",base:L.SURFACE,prefixes:P.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:L.SURFACE,prefixes:P.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:L.SURFACE,prefixes:P.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:L.SURFACE,prefixes:P.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:L.SURFACE,prefixes:P.NONE,value:2589988.110336,offset:0},sqrd:{name:"sqrd",base:L.SURFACE,prefixes:P.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:L.SURFACE,prefixes:P.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:L.SURFACE,prefixes:P.NONE,value:6.4516e-10,offset:0},acre:{name:"acre",base:L.SURFACE,prefixes:P.NONE,value:4046.86,offset:0},hectare:{name:"hectare",base:L.SURFACE,prefixes:P.NONE,value:1e4,offset:0},m3:{name:"m3",base:L.VOLUME,prefixes:P.CUBIC,value:1,offset:0},L:{name:"L",base:L.VOLUME,prefixes:P.SHORT,value:.001,offset:0},l:{name:"l",base:L.VOLUME,prefixes:P.SHORT,value:.001,offset:0},litre:{name:"litre",base:L.VOLUME,prefixes:P.LONG,value:.001,offset:0},cuin:{name:"cuin",base:L.VOLUME,prefixes:P.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:L.VOLUME,prefixes:P.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:L.VOLUME,prefixes:P.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:L.VOLUME,prefixes:P.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:L.VOLUME,prefixes:P.NONE,value:15e-6,offset:0},drop:{name:"drop",base:L.VOLUME,prefixes:P.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:L.VOLUME,prefixes:P.NONE,value:5e-8,offset:0},minim:{name:"minim",base:L.VOLUME,prefixes:P.NONE,value:6.161152e-8,offset:0},fluiddram:{name:"fluiddram",base:L.VOLUME,prefixes:P.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:L.VOLUME,prefixes:P.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:L.VOLUME,prefixes:P.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:L.VOLUME,prefixes:P.NONE,value:1e-6,offset:0},cup:{name:"cup",base:L.VOLUME,prefixes:P.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:L.VOLUME,prefixes:P.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:L.VOLUME,prefixes:P.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:L.VOLUME,prefixes:P.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:L.VOLUME,prefixes:P.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:L.VOLUME,prefixes:P.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:L.VOLUME,prefixes:P.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:L.VOLUME,prefixes:P.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:L.VOLUME,prefixes:P.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:L.VOLUME,prefixes:P.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:L.VOLUME,prefixes:P.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:L.VOLUME,prefixes:P.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:L.VOLUME,prefixes:P.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:L.VOLUME,prefixes:P.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:L.VOLUME,prefixes:P.NONE,value:.1173478,offset:0},obl:{name:"obl",base:L.VOLUME,prefixes:P.NONE,value:.1589873,offset:0},g:{name:"g",base:L.MASS,prefixes:P.SHORT,value:.001,offset:0},gram:{name:"gram",base:L.MASS,prefixes:P.LONG,value:.001,offset:0},ton:{name:"ton",base:L.MASS,prefixes:P.SHORT,value:907.18474,offset:0},tonne:{name:"tonne",base:L.MASS,prefixes:P.SHORT,value:1e3,offset:0},grain:{name:"grain",base:L.MASS,prefixes:P.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:L.MASS,prefixes:P.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:L.MASS,prefixes:P.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:L.MASS,prefixes:P.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:L.MASS,prefixes:P.NONE,value:45.359237,offset:0},stick:{name:"stick",base:L.MASS,prefixes:P.NONE,value:.115,offset:0},stone:{name:"stone",base:L.MASS,prefixes:P.NONE,value:6.35029318,offset:0},gr:{name:"gr",base:L.MASS,prefixes:P.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:L.MASS,prefixes:P.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:L.MASS,prefixes:P.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:L.MASS,prefixes:P.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:L.MASS,prefixes:P.NONE,value:45.359237,offset:0},s:{name:"s",base:L.TIME,prefixes:P.SHORT,value:1,offset:0},min:{name:"min",base:L.TIME,prefixes:P.NONE,value:60,offset:0},h:{name:"h",base:L.TIME,prefixes:P.NONE,value:3600,offset:0},second:{name:"second",base:L.TIME,prefixes:P.LONG,value:1,offset:0},sec:{name:"sec",base:L.TIME,prefixes:P.LONG,value:1,offset:0},minute:{name:"minute",base:L.TIME,prefixes:P.NONE,value:60,offset:0},hour:{name:"hour",base:L.TIME,prefixes:P.NONE,value:3600,offset:0},day:{name:"day",base:L.TIME,prefixes:P.NONE,value:86400,offset:0},week:{name:"week",base:L.TIME,prefixes:P.NONE,value:604800,offset:0},month:{name:"month",base:L.TIME,prefixes:P.NONE,value:2629800,offset:0},year:{name:"year",base:L.TIME,prefixes:P.NONE,value:31557600,offset:0},decade:{name:"year",base:L.TIME,prefixes:P.NONE,value:315576e3,offset:0},century:{name:"century",base:L.TIME,prefixes:P.NONE,value:315576e4,offset:0},millennium:{name:"millennium",base:L.TIME,prefixes:P.NONE,value:315576e5,offset:0},hertz:{name:"Hertz",base:L.FREQUENCY,prefixes:P.LONG,value:1,offset:0,reciprocal:!0},Hz:{name:"Hz",base:L.FREQUENCY,prefixes:P.SHORT,value:1,offset:0,reciprocal:!0},rad:{name:"rad",base:L.ANGLE,prefixes:P.NONE,value:1,offset:0},deg:{name:"deg",base:L.ANGLE,prefixes:P.NONE,value:null,offset:0},grad:{name:"grad",base:L.ANGLE,prefixes:P.NONE,value:null,offset:0},cycle:{name:"cycle",base:L.ANGLE,prefixes:P.NONE,value:null,offset:0},arcsec:{name:"arcsec",base:L.ANGLE,prefixes:P.NONE,value:null,offset:0},arcmin:{name:"arcmin",base:L.ANGLE,prefixes:P.NONE,value:null,offset:0},A:{name:"A",base:L.CURRENT,prefixes:P.SHORT,value:1,offset:0},ampere:{name:"ampere",base:L.CURRENT,prefixes:P.LONG,value:1,offset:0},K:{name:"K",base:L.TEMPERATURE,prefixes:P.NONE,value:1,offset:0},degC:{name:"degC",base:L.TEMPERATURE,prefixes:P.NONE,value:1,offset:273.15},degF:{name:"degF",base:L.TEMPERATURE,prefixes:P.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:L.TEMPERATURE,prefixes:P.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:L.TEMPERATURE,prefixes:P.NONE,value:1,offset:0},celsius:{name:"celsius",base:L.TEMPERATURE,prefixes:P.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:L.TEMPERATURE,prefixes:P.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:L.TEMPERATURE,prefixes:P.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:L.AMOUNT_OF_SUBSTANCE,prefixes:P.SHORT,value:1,offset:0},mole:{name:"mole",base:L.AMOUNT_OF_SUBSTANCE,prefixes:P.LONG,value:1,offset:0},cd:{name:"cd",base:L.LUMINOUS_INTENSITY,prefixes:P.NONE,value:1,offset:0},candela:{name:"candela",base:L.LUMINOUS_INTENSITY,prefixes:P.NONE,value:1,offset:0},N:{name:"N",base:L.FORCE,prefixes:P.SHORT,value:1,offset:0},newton:{name:"newton",base:L.FORCE,prefixes:P.LONG,value:1,offset:0},dyn:{name:"dyn",base:L.FORCE,prefixes:P.SHORT,value:1e-5,offset:0},dyne:{name:"dyne",base:L.FORCE,prefixes:P.LONG,value:1e-5,offset:0},lbf:{name:"lbf",base:L.FORCE,prefixes:P.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:L.FORCE,prefixes:P.NONE,value:4.4482216152605,offset:0},kip:{name:"kip",base:L.FORCE,prefixes:P.LONG,value:4448.2216,offset:0},J:{name:"J",base:L.ENERGY,prefixes:P.SHORT,value:1,offset:0},joule:{name:"joule",base:L.ENERGY,prefixes:P.SHORT,value:1,offset:0},erg:{name:"erg",base:L.ENERGY,prefixes:P.NONE,value:1e-5,offset:0},Wh:{name:"Wh",base:L.ENERGY,prefixes:P.SHORT,value:3600,offset:0},BTU:{name:"BTU",base:L.ENERGY,prefixes:P.BTU,value:1055.05585262,offset:0},eV:{name:"eV",base:L.ENERGY,prefixes:P.SHORT,value:1.602176565e-19,offset:0},electronvolt:{name:"electronvolt",base:L.ENERGY,prefixes:P.LONG,value:1.602176565e-19,offset:0},W:{name:"W",base:L.POWER,prefixes:P.SHORT,value:1,offset:0},watt:{name:"W",base:L.POWER,prefixes:P.LONG,value:1,offset:0},hp:{name:"hp",base:L.POWER,prefixes:P.NONE,value:745.6998715386,offset:0},VAR:{name:"VAR",base:L.POWER,prefixes:P.SHORT,value:z.I,offset:0},VA:{name:"VA",base:L.POWER,prefixes:P.SHORT,value:1,offset:0},Pa:{name:"Pa",base:L.PRESSURE,prefixes:P.SHORT,value:1,offset:0},psi:{name:"psi",base:L.PRESSURE,prefixes:P.NONE,value:6894.75729276459,offset:0},atm:{name:"atm",base:L.PRESSURE,prefixes:P.NONE,value:101325,offset:0},bar:{name:"bar",base:L.PRESSURE,prefixes:P.NONE,value:1e5,offset:0},torr:{name:"torr",base:L.PRESSURE,prefixes:P.NONE,value:133.322,offset:0},mmHg:{name:"mmHg",base:L.PRESSURE,prefixes:P.NONE,value:133.322,offset:0},mmH2O:{name:"mmH2O",base:L.PRESSURE,prefixes:P.NONE,value:9.80665,offset:0},cmH2O:{name:"cmH2O",base:L.PRESSURE,prefixes:P.NONE,value:98.0665,offset:0},coulomb:{name:"coulomb",base:L.ELECTRIC_CHARGE,prefixes:P.LONG,value:1,offset:0},C:{name:"C",base:L.ELECTRIC_CHARGE,prefixes:P.SHORT,value:1,offset:0},farad:{name:"farad",base:L.ELECTRIC_CAPACITANCE,prefixes:P.LONG,value:1,offset:0},F:{name:"F",base:L.ELECTRIC_CAPACITANCE,prefixes:P.SHORT,value:1,offset:0},volt:{name:"volt",base:L.ELECTRIC_POTENTIAL,prefixes:P.LONG,value:1,offset:0},V:{name:"V",base:L.ELECTRIC_POTENTIAL,prefixes:P.SHORT,value:1,offset:0},ohm:{name:"ohm",base:L.ELECTRIC_RESISTANCE,prefixes:P.SHORTLONG,value:1,offset:0},henry:{name:"henry",base:L.ELECTRIC_INDUCTANCE,prefixes:P.LONG,value:1,offset:0},H:{name:"H",base:L.ELECTRIC_INDUCTANCE,prefixes:P.SHORT,value:1,offset:0},siemens:{name:"siemens",base:L.ELECTRIC_CONDUCTANCE,prefixes:P.LONG,value:1,offset:0},S:{name:"S",base:L.ELECTRIC_CONDUCTANCE,prefixes:P.SHORT,value:1,offset:0},weber:{name:"weber",base:L.MAGNETIC_FLUX,prefixes:P.LONG,value:1,offset:0},Wb:{name:"Wb",base:L.MAGNETIC_FLUX,prefixes:P.SHORT,value:1,offset:0},tesla:{name:"tesla",base:L.MAGNETIC_FLUX_DENSITY,prefixes:P.LONG,value:1,offset:0},T:{name:"T",base:L.MAGNETIC_FLUX_DENSITY,prefixes:P.SHORT,value:1,offset:0},b:{name:"b",base:L.BIT,prefixes:P.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:L.BIT,prefixes:P.BINARY_LONG,value:1,offset:0},B:{name:"B",base:L.BIT,prefixes:P.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:L.BIT,prefixes:P.BINARY_LONG,value:8,offset:0}},$={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",lt:"l",litres:"litre",liter:"litre",liters:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",lb:"lbm",lbs:"lbm",kips:"kip",acres:"acre",hectares:"hectare",sqfeet:"sqft",sqyard:"sqyd",sqmile:"sqmi",sqmiles:"sqmi",mmhg:"mmHg",mmh2o:"mmH2O",cmh2o:"cmH2O",seconds:"second",secs:"second",minutes:"minute",mins:"minute",hours:"hour",hr:"hour",hrs:"hour",days:"day",weeks:"week",months:"month",years:"year",hertz:"hertz",radians:"rad",degree:"deg",degrees:"deg",gradian:"grad",gradians:"grad",cycles:"cycle",arcsecond:"arcsec",arcseconds:"arcsec",arcminute:"arcmin",arcminutes:"arcmin",BTUs:"BTU",watts:"watt",joules:"joule",amperes:"ampere",coulombs:"coulomb",volts:"volt",ohms:"ohm",farads:"farad",webers:"weber",teslas:"tesla",electronvolts:"electronvolt",moles:"mole"};x(t),u.on("config",function(e,t){e.number!==t.number&&x(e)});var G={si:{NONE:{unit:F,prefix:P.NONE[""]},LENGTH:{unit:D.m,prefix:P.SHORT[""]},MASS:{unit:D.g,prefix:P.SHORT.k},TIME:{unit:D.s,prefix:P.SHORT[""]},CURRENT:{unit:D.A,prefix:P.SHORT[""]},TEMPERATURE:{unit:D.K,prefix:P.SHORT[""]},LUMINOUS_INTENSITY:{unit:D.cd,prefix:P.SHORT[""]},AMOUNT_OF_SUBSTANCE:{unit:D.mol,prefix:P.SHORT[""]},ANGLE:{unit:D.rad,prefix:P.SHORT[""]},BIT:{unit:D.bit,prefix:P.SHORT[""]},FORCE:{unit:D.N,prefix:P.SHORT[""]},ENERGY:{unit:D.J,prefix:P.SHORT[""]},POWER:{unit:D.W,prefix:P.SHORT[""]},PRESSURE:{unit:D.Pa,prefix:P.SHORT[""]},ELECTRIC_CHARGE:{unit:D.C,prefix:P.SHORT[""]},ELECTRIC_CAPACITANCE:{unit:D.F,prefix:P.SHORT[""]},ELECTRIC_POTENTIAL:{unit:D.V,prefix:P.SHORT[""]},ELECTRIC_RESISTANCE:{unit:D.ohm,prefix:P.SHORT[""]},ELECTRIC_INDUCTANCE:{unit:D.H,prefix:P.SHORT[""]},ELECTRIC_CONDUCTANCE:{unit:D.S,prefix:P.SHORT[""]},MAGNETIC_FLUX:{unit:D.Wb,prefix:P.SHORT[""]},MAGNETIC_FLUX_DENSITY:{unit:D.T,prefix:P.SHORT[""]},FREQUENCY:{unit:D.Hz,prefix:P.SHORT[""]}}};G.cgs=JSON.parse(JSON.stringify(G.si)),G.cgs.LENGTH={unit:D.m,prefix:P.SHORT.c},G.cgs.MASS={unit:D.g,prefix:P.SHORT[""]},G.cgs.FORCE={unit:D.dyn,prefix:P.SHORT[""]},G.cgs.ENERGY={unit:D.erg,prefix:P.NONE[""]},G.us=JSON.parse(JSON.stringify(G.si)),G.us.LENGTH={unit:D.ft,prefix:P.NONE[""]},G.us.MASS={unit:D.lbm,prefix:P.NONE[""]},G.us.TEMPERATURE={unit:D.degF,prefix:P.NONE[""]},G.us.FORCE={unit:D.lbf,prefix:P.NONE[""]},G.us.ENERGY={unit:D.BTU,prefix:P.BTU[""]},G.us.POWER={unit:D.hp,prefix:P.NONE[""]},G.us.PRESSURE={unit:D.psi,prefix:P.NONE[""]},G.auto=JSON.parse(JSON.stringify(G.si));var H=G.auto;c.setUnitSystem=function(e){if(!G.hasOwnProperty(e))throw new Error("Unit system "+e+" does not exist. Choices are: "+Object.keys(G).join(", "));H=G[e]},c.getUnitSystem=function(){for(var e in G)if(G[e]===H)return e},c.typeConverters={BigNumber:function(t){return new e.BigNumber(t+"")},Fraction:function(t){return new e.Fraction(t)},Complex:function(e){return e},number:function(e){return e}},c._getNumberConverter=function(e){if(!c.typeConverters[e])throw new TypeError('Unsupported type "'+e+'"');return c.typeConverters[e]};for(var U in D){var V=D[U];V.dimensions=V.base.dimensions}for(var Z in $)if($.hasOwnProperty(Z)){var V=D[$[Z]],W=Object.create(V);W.name=Z,D[Z]=W}return c.PREFIXES=P,c.BASE_UNITS=L,c.UNITS=D,c.UNIT_SYSTEMS=G,c}var i=r(23).endsWith,a=r(3).clone,o=r(76);t.name="Unit",t.path="type",t.factory=n,t.math=!0},function(e,t,r){function n(e){return e[0].precision}var i=r(45).memoize;t.e=i(function(e){return new e(1).exp()},n),t.phi=i(function(e){return new e(1).plus(new e(5).sqrt()).div(2)},n),t.pi=i(function(e){return pi=e.acos(-1)},n),t.tau=i(function(e){return t.pi(e).times(2)},n)},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=n(r(52)),u=n(r(53)),c=n(r(78)),f=n(r(54)),l=n(r(61)),p=n(r(79)),h=n(r(56)),m=n(r(57)),d=n(r(58)),g=a("subtract",{"number, number":function(e,t){return e-t},"Complex, Complex":function(e,t){return e.sub(t)},"BigNumber, BigNumber":function(e,t){return e.minus(t)},"Fraction, Fraction":function(e,t){return e.sub(t)},"Unit, Unit":function(e,t){if(null==e.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!e.equalBase(t))throw new Error("Units do not match");var r=e.clone();return r.value=g(r.value,t.value),r.fixPrefix=!1,r},"Matrix, Matrix":function(e,t){var r=e.size(),n=t.size();if(r.length!==n.length)throw new i(r.length,n.length);var a;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":a=p(e,t,g);break;default:a=l(t,e,g,!0)}break;default:switch(t.storage()){case"sparse":a=f(e,t,g,!1);break;default:a=m(e,t,g)}}return a},"Array, Array":function(e,t){return g(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return g(s(e),t)},"Matrix, Array":function(e,t){return g(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=h(e,c(t),u);break;default:r=d(e,t,g)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=h(t,e,g,!0);break;default:r=d(t,e,g,!0)}return r},"Array, any":function(e,t){return d(s(e),t,g,!1).valueOf()},"any, Array":function(e,t){return d(s(t),e,g,!0).valueOf()}});return g.toTex={2:"\\left(${args[0]}"+o.operators.subtract+"${args[1]}\\right)"},g}var i=r(42);t.name="subtract",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("unaryMinus",{number:function(e){return-e},Complex:function(e){return e.neg()},BigNumber:function(e){return e.neg()},Fraction:function(e){return e.neg()},Unit:function(e){var t=e.clone();return t.value=s(e.value),t},"Array | Matrix":function(e){return i(e,s,!0)}});return s.toTex={1:o.operators.unaryMinus+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="unaryMinus",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O=n&&p?[]:void 0,T=[],C=[],S=new s({values:O,index:T,ptr:C,size:[y,x],datatype:v}),z=O?[]:void 0,B=O?[]:void 0,k=[],I=[];for(M=0;x>M;M++){C[M]=T.length;var R=M+1;for(A=c[M],_=c[M+1];_>A;A++)E=u[A],T.push(E),k[E]=R,z&&(z[E]=n[A]);for(A=m[M],_=m[M+1];_>A;A++)E=h[A],k[E]!==R&&T.push(E),I[E]=R,B&&(B[E]=p[A]);if(O)for(A=C[M];A<T.length;){E=T[A];var P=k[E],U=I[E];if(P===R||U===R){var q=P===R?z[E]:w,L=U===R?B[E]:w,j=N(q,L);b(j,w)?T.splice(A,1):(O.push(j),A++)}}}return C[x]=T.length,S};return u}var i=r(42);t.name="algorithm05",t.factory=n},function(e,t){"use strict";function r(e,t,r,n){var i=n("multiplyScalar",{"number, number":function(e,t){return e*t},"Complex, Complex":function(e,t){return e.mul(t)},"BigNumber, BigNumber":function(e,t){return e.times(t)},"Fraction, Fraction":function(e,t){return e.mul(t)},"number | Fraction | BigNumber | Complex, Unit":function(e,t){var r=t.clone();return r.value=null===r.value?r._normalize(e):i(r.value,e),r},"Unit, number | Fraction | BigNumber | Complex":function(e,t){var r=e.clone();return r.value=null===r.value?r._normalize(t):i(r.value,t),r},"Unit, Unit":function(e,t){return e.multiply(t)}});return i}t.factory=r},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(80)),o=i("divide",{"number, number":function(e,t){return e/t},"Complex, Complex":function(e,t){return e.div(t)},"BigNumber, BigNumber":function(e,t){return e.div(t)},"Fraction, Fraction":function(e,t){return e.div(t)},"Unit, number | Fraction | BigNumber":function(e,t){var r=e.clone();return r.value=o(null===r.value?r._normalize(1):r.value,t),r},"number | Fraction | BigNumber, Unit":function(e,t){var r=t.pow(-1);return r.value=a(null===r.value?r._normalize(1):r.value,e),r},"Unit, Unit":function(e,t){return e.divide(t)}});return o}t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(r,n){if(t.predictable&&!i(n)&&0>r)try{var a=m(n),o=d(a);if((n===o||Math.abs((n-o)/n)<1e-14)&&a.d%2===1)return(a.n%2===0?1:-1)*Math.pow(-r,n)}catch(s){}return i(n)||r>=0||t.predictable?Math.pow(r,n):new e.Complex(r,0).pow(n,0)}function u(e,t){if(!i(t)||0>t)throw new TypeError("For A^b, b must be a positive integer (value is "+t+")");var r=a(e);if(2!=r.length)throw new Error("For A^b, A must be 2 dimensional (A has "+r.length+" dimensions)");if(r[0]!=r[1])throw new Error("For A^b, A must be square (size is "+r[0]+"x"+r[1]+")");for(var n=l(r[0]).valueOf(),o=e;t>=1;)1==(1&t)&&(n=p(o,n)),t>>=1,o=p(o,o);return n}function c(e,t){return h(u(e.valueOf(),t))}var f=r(32),l=n(r(83)),p=n(r(84)),h=n(r(52)),m=n(r(36)),d=n(r(70)),g=o("pow",{"number, number":s,"Complex, Complex":function(e,t){return e.pow(t)},"BigNumber, BigNumber":function(r,n){return n.isInteger()||r>=0||t.predictable?r.pow(n):new e.Complex(r.toNumber(),0).pow(n.toNumber(),0)},"Fraction, Fraction":function(e,r){if(1!==r.d){if(t.predictable)throw new Error("Function pow does not support non-integer exponents for fractions.");return s(e.valueOf(),r.valueOf())}return e.pow(r)},"Array, number":u,"Array, BigNumber":function(e,t){return u(e,t.toNumber())},"Matrix, number":c,"Matrix, BigNumber":function(e,t){return c(e,t.toNumber())},"Unit, number":function(e,t){return e.pow(t)}});return g.toTex={2:"\\left(${args[0]}\\right)"+f.operators.pow+"{${args[1]}}"},g}var i=r(6).isInteger,a=r(40).size;t.name="pow",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e,t){switch(e.length){case 0:return t?c(t):[];case 1:return u(e[0],e[0],t);case 2:return u(e[0],e[1],t);default:throw new Error("Vector containing two values expected")}}function u(t,r,n){var o=t&&t.isBigNumber===!0?e.BigNumber:r&&r.isBigNumber===!0?e.BigNumber:null;if(t&&t.isBigNumber===!0&&(t=t.toNumber()),r&&r.isBigNumber===!0&&(r=r.toNumber()),!a(t)||1>t)throw new Error("Parameters in function eye must be positive integers");if(!a(r)||1>r)throw new Error("Parameters in function eye must be positive integers");var s=o?new e.BigNumber(1):1,u=o?new o(0):0,c=[t,r];if(n){var f=e.Matrix.storage(n);return f.diagonal(c,s,0,u)}for(var l=i.resize([],c,u),p=r>t?t:r,h=0;p>h;h++)l[h][h]=s;return l}var c=n(r(52)),f=o("eye",{"":function(){return"Matrix"===t.matrix?c([]):[]},string:function(e){return c(e)},"number | BigNumber":function(e){return u(e,e,"Matrix"===t.matrix?"default":void 0)},"number | BigNumber, string":function(e,t){return u(e,e,t)},"number | BigNumber, number | BigNumber":function(e,r){return u(e,r,"Matrix"===t.matrix?"default":void 0)},"number | BigNumber, number | BigNumber, string":function(e,t,r){return u(e,t,r)},Array:function(e){return s(e)},"Array, string":function(e,t){return s(e,t)},Matrix:function(e){return s(e.valueOf(),e.storage())},"Matrix, string":function(e,t){return s(e.valueOf(),t)}});return f.toTex=void 0,f}var i=r(40),a=r(6).isInteger;t.name="eye",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(53)),f=n(r(80)),l=n(r(48)),p=n(r(85)),h=n(r(58)),m=e.DenseMatrix,d=e.SparseMatrix,g=o("multiply",i({"Array, Array":function(e,t){v(a.size(e),a.size(t));var r=g(u(e),u(t));return r&&r.isMatrix===!0?r.valueOf():r},"Matrix, Matrix":function(e,t){var r=e.size(),n=t.size();return v(r,n),1===r.length?1===n.length?y(e,t,r[0]):x(e,t):1===n.length?w(e,t):N(e,t)},"Matrix, Array":function(e,t){return g(e,u(t))},"Array, Matrix":function(e,t){return g(u(e,t.storage()),t)},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,f,!1);break;case"dense":r=h(e,t,f,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,f,!0);break;case"dense":r=h(t,e,f,!0)}return r},"Array, any":function(e,t){return h(u(e),t,f,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,f,!0).valueOf()}},f.signatures)),v=function(e,t){switch(e.length){case 1:switch(t.length){case 1:if(e[0]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:if(e[0]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Vector length ("+e[0]+") must match Matrix rows ("+t[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+t.length+" dimensions)")}break;case 2:switch(t.length){case 1:if(e[1]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Matrix columns ("+e[1]+") must match Vector length ("+t[0]+")");break;case 2:if(e[1]!==t[0])throw new RangeError("Dimension mismatch in multiplication. Matrix A columns ("+e[1]+") must match Matrix B rows ("+t[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+t.length+" dimensions)")}break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has "+e.length+" dimensions)")}},y=function(e,t,r){if(0===r)throw new Error("Cannot multiply two empty vectors");var n,i=e._data,a=e._datatype,s=t._data,u=t._datatype,l=c,p=f;
a&&u&&a===u&&"string"==typeof a&&(n=a,l=o.find(c,[n,n]),p=o.find(f,[n,n]));for(var h=p(i[0],s[0]),m=1;r>m;m++)h=l(h,p(i[m],s[m]));return h},x=function(e,t){switch(t.storage()){case"dense":return b(e,t)}throw new Error("Not implemented")},b=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._size,l=t._datatype,p=i[0],h=u[1],d=c,g=f;a&&l&&a===l&&"string"==typeof a&&(r=a,d=o.find(c,[r,r]),g=o.find(f,[r,r]));for(var v=[],y=0;h>y;y++){for(var x=g(n[0],s[0][y]),b=1;p>b;b++)x=d(x,g(n[b],s[b][y]));v[y]=x}return new m({data:v,size:[h],datatype:r})},w=function(e,t){switch(e.storage()){case"dense":return E(e,t);case"sparse":return _(e,t)}},N=function(e,t){switch(e.storage()){case"dense":switch(t.storage()){case"dense":return M(e,t);case"sparse":return A(e,t)}break;case"sparse":switch(t.storage()){case"dense":return O(e,t);case"sparse":return T(e,t)}}},E=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._datatype,l=i[0],p=i[1],h=c,d=f;a&&u&&a===u&&"string"==typeof a&&(r=a,h=o.find(c,[r,r]),d=o.find(f,[r,r]));for(var g=[],v=0;l>v;v++){for(var y=n[v],x=d(y[0],s[0]),b=1;p>b;b++)x=h(x,d(y[b],s[b]));g[v]=x}return new m({data:g,size:[l],datatype:r})},M=function(e,t){var r,n=e._data,i=e._size,a=e._datatype,s=t._data,u=t._size,l=t._datatype,p=i[0],h=i[1],d=u[1],g=c,v=f;a&&l&&a===l&&"string"==typeof a&&(r=a,g=o.find(c,[r,r]),v=o.find(f,[r,r]));for(var y=[],x=0;p>x;x++){var b=n[x];y[x]=[];for(var w=0;d>w;w++){for(var N=v(b[0],s[0][w]),E=1;h>E;E++)N=g(N,v(b[E],s[E][w]));y[x][w]=N}}return new m({data:y,size:[p,d],datatype:r})},A=function(e,t){var r=e._data,n=e._size,i=e._datatype,a=t._values,s=t._index,u=t._ptr,p=t._size,h=t._datatype;if(!a)throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var m,g=n[0],v=p[1],y=c,x=f,b=l,w=0;i&&h&&i===h&&"string"==typeof i&&(m=i,y=o.find(c,[m,m]),x=o.find(f,[m,m]),b=o.find(l,[m,m]),w=o.convert(0,m));for(var N=[],E=[],M=[],A=new d({values:N,index:E,ptr:M,size:[g,v],datatype:m}),_=0;v>_;_++){M[_]=E.length;var O=u[_],T=u[_+1];if(T>O)for(var C=0,S=0;g>S;S++){for(var z,B=S+1,k=O;T>k;k++){var I=s[k];C!==B?(z=x(r[S][I],a[k]),C=B):z=y(z,x(r[S][I],a[k]))}C!==B||b(z,w)||(E.push(S),N.push(z))}}return M[v]=E.length,A},_=function(e,t){var r=e._values,n=e._index,i=e._ptr,a=e._datatype;if(!r)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,u=t._data,p=t._datatype,h=e._size[0],m=t._size[0],g=[],v=[],y=[],x=c,b=f,w=l,N=0;a&&p&&a===p&&"string"==typeof a&&(s=a,x=o.find(c,[s,s]),b=o.find(f,[s,s]),w=o.find(l,[s,s]),N=o.convert(0,s));var E=[],M=[];y[0]=0;for(var A=0;m>A;A++){var _=u[A];if(!w(_,N))for(var O=i[A],T=i[A+1],C=O;T>C;C++){var S=n[C];M[S]?E[S]=x(E[S],b(_,r[C])):(M[S]=!0,v.push(S),E[S]=b(_,r[C]))}}for(var z=v.length,B=0;z>B;B++){var k=v[B];g[B]=E[k]}return y[1]=v.length,new d({values:g,index:v,ptr:y,size:[h,1],datatype:s})},O=function(e,t){var r=e._values,n=e._index,i=e._ptr,a=e._datatype;if(!r)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,u=t._data,p=t._datatype,h=e._size[0],m=t._size[0],g=t._size[1],v=c,y=f,x=l,b=0;a&&p&&a===p&&"string"==typeof a&&(s=a,v=o.find(c,[s,s]),y=o.find(f,[s,s]),x=o.find(l,[s,s]),b=o.convert(0,s));for(var w=[],N=[],E=[],M=new d({values:w,index:N,ptr:E,size:[h,g],datatype:s}),A=[],_=[],O=0;g>O;O++){E[O]=N.length;for(var T=O+1,C=0;m>C;C++){var S=u[C][O];if(!x(S,b))for(var z=i[C],B=i[C+1],k=z;B>k;k++){var I=n[k];_[I]!==T?(_[I]=T,N.push(I),A[I]=y(S,r[k])):A[I]=v(A[I],y(S,r[k]))}}for(var R=E[O],P=N.length,U=R;P>U;U++){var q=N[U];w[U]=A[q]}}return E[g]=N.length,M},T=function(e,t){var r,n=e._values,i=e._index,a=e._ptr,s=e._datatype,u=t._values,l=t._index,p=t._ptr,h=t._datatype,m=e._size[0],g=t._size[1],v=n&&u,y=c,x=f;s&&h&&s===h&&"string"==typeof s&&(r=s,y=o.find(c,[r,r]),x=o.find(f,[r,r]));for(var b,w,N,E,M,A,_,O,T=v?[]:void 0,C=[],S=[],z=new d({values:T,index:C,ptr:S,size:[m,g],datatype:r}),B=v?[]:void 0,k=[],I=0;g>I;I++){S[I]=C.length;var R=I+1;for(M=p[I],A=p[I+1],E=M;A>E;E++)if(O=l[E],v)for(w=a[O],N=a[O+1],b=w;N>b;b++)_=i[b],k[_]!==R?(k[_]=R,C.push(_),B[_]=x(u[E],n[b])):B[_]=y(B[_],x(u[E],n[b]));else for(w=a[O],N=a[O+1],b=w;N>b;b++)_=i[b],k[_]!==R&&(k[_]=R,C.push(_));if(v)for(var P=S[I],U=C.length,q=P;U>q;q++){var L=C[q];T[q]=B[L]}}return S[g]=C.length,z};return g.toTex={2:"\\left(${args[0]}"+s.operators.multiply+"${args[1]}\\right)"},g}var i=r(3).extend,a=r(40);t.name="multiply",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(48)),o=e.SparseMatrix,s=function(e,t,r,n){var s=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype;if(!s)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var p,h=f[0],m=f[1],d=a,g=0,v=r;"string"==typeof l&&(p=l,d=i.find(a,[p,p]),g=i.convert(0,p),t=i.convert(t,p),v=i.find(r,[p,p]));for(var y=[],x=[],b=[],w=new o({values:y,index:x,ptr:b,size:[h,m],datatype:p}),N=0;m>N;N++){b[N]=x.length;for(var E=c[N],M=c[N+1],A=E;M>A;A++){var _=u[A],O=n?v(t,s[A]):v(s[A],t);d(O,g)||(x.push(_),y.push(O))}}return b[m]=x.length,w};return s}t.name="algorithm11",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("abs",{number:Math.abs,Complex:function(e){return e.abs()},BigNumber:function(e){return e.abs()},Fraction:function(e){return e.abs()},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.abs()}});return a.toTex={1:"\\left|${args[0]}\\right|"},a}var i=r(19);t.name="abs",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(48)),s=n(r(61)),u=n(r(62)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=r(32),h=i("equal",{"any, any":function(e,t){return null===e?null===t:null===t?null===e:void 0===e?void 0===t:void 0===t?void 0===e:o(e,t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,o);break;default:r=s(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,o,!1);break;default:r=f(e,t,o)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=l(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,o,!0);break;default:r=l(t,e,o,!0)}return r},"Array, any":function(e,t){return l(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return l(a(t),e,o,!0).valueOf()}});return h.toTex={2:"\\left(${args[0]}"+p.operators.equal+"${args[1]}\\right)"},h}t.name="equal",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isNumeric",{"number | BigNumber | Fraction | boolean":function(){return!0},"Complex | Unit | string":function(){return!1},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isNumeric",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("format",{any:i.format,"any, Object | function | number":i.format});return a.toTex=void 0,a}var i=r(23);t.name="format",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("_typeof",{any:function(e){var t=i.type(e);if("Object"===t){if(e.isBigNumber===!0)return"BigNumber";if(e.isComplex===!0)return"Complex";if(e.isFraction===!0)return"Fraction";if(e.isMatrix===!0)return"Matrix";if(e.isUnit===!0)return"Unit";if(e.isIndex===!0)return"Index";if(e.isRange===!0)return"Range";if(e.isChain===!0)return"Chain";if(e.isHelp===!0)return"Help"}return t}});return a.toTex=void 0,a}var i=r(41);t.name="typeof",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("unit",{Unit:function(e){return e.clone()},string:function(t){return e.Unit.isValuelessUnit(t)?new e.Unit(null,t):e.Unit.parse(t)},"number | BigNumber | Fraction | Complex, string":function(t,r){return new e.Unit(t,r)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},a}var i=r(19);t.name="unit",t.factory=n},function(e,t,r){function n(e,t,r,n,a){function o(t){var r=e.Unit.parse(t);return r.fixPrefix=!0,r}i(a,"speedOfLight",function(){return o("299792458 m s^-1")}),i(a,"gravitationConstant",function(){return o("6.6738480e-11 m^3 kg^-1 s^-2")}),i(a,"planckConstant",function(){return o("6.626069311e-34 J s")}),i(a,"reducedPlanckConstant",function(){return o("1.05457172647e-34 J s")}),i(a,"magneticConstant",function(){return o("1.2566370614e-6 N A^-2")}),i(a,"electricConstant",function(){return o("8.854187817e-12 F m^-1")}),i(a,"vacuumImpedance",function(){return o("376.730313461 ohm")}),i(a,"coulomb",function(){return o("8.9875517873681764e9 N m^2 C^-2")}),i(a,"elementaryCharge",function(){return o("1.60217656535e-19 C")}),i(a,"bohrMagneton",function(){return o("9.2740096820e-24 J T^-1")}),i(a,"conductanceQuantum",function(){return o("7.748091734625e-5 S")}),i(a,"inverseConductanceQuantum",function(){return o("12906.403721742 ohm")}),i(a,"magneticFluxQuantum",function(){return o("2.06783375846e-15 Wb")}),i(a,"nuclearMagneton",function(){return o("5.0507835311e-27 J T^-1")}),i(a,"klitzing",function(){return o("25812.807443484 ohm")}),i(a,"bohrRadius",function(){return o("5.291772109217e-11 m")}),i(a,"classicalElectronRadius",function(){return o("2.817940326727e-15 m")}),i(a,"electronMass",function(){return o("9.1093829140e-31 kg")}),i(a,"fermiCoupling",function(){return o("1.1663645e-5 GeV^-2")}),i(a,"fineStructure",function(){return.007297352569824}),i(a,"hartreeEnergy",function(){return o("4.3597443419e-18 J")}),i(a,"protonMass",function(){return o("1.67262177774e-27 kg")}),i(a,"deuteronMass",function(){return o("3.3435830926e-27 kg")}),i(a,"neutronMass",function(){return o("1.6749271613e-27 kg")}),i(a,"quantumOfCirculation",function(){return o("3.636947552024e-4 m^2 s^-1")}),i(a,"rydberg",function(){return o("10973731.56853955 m^-1")}),i(a,"thomsonCrossSection",function(){return o("6.65245873413e-29 m^2")}),i(a,"weakMixingAngle",function(){return.222321}),i(a,"efimovFactor",function(){return 22.7}),i(a,"atomicMass",function(){return o("1.66053892173e-27 kg")}),i(a,"avogadro",function(){return o("6.0221412927e23 mol^-1")}),i(a,"boltzmann",function(){return o("1.380648813e-23 J K^-1")}),i(a,"faraday",function(){return o("96485.336521 C mol^-1")}),i(a,"firstRadiation",function(){return o("3.7417715317e-16 W m^2")}),i(a,"loschmidt",function(){return o("2.686780524e25 m^-3")}),i(a,"gasConstant",function(){return o("8.314462175 J K^-1 mol^-1")}),i(a,"molarPlanckConstant",function(){return o("3.990312717628e-10 J s mol^-1")}),i(a,"molarVolume",function(){return o("2.241396820e-10 m^3 mol^-1")}),i(a,"sackurTetrode",function(){return-1.164870823}),i(a,"secondRadiation",function(){return o("1.438777013e-2 m K")}),i(a,"stefanBoltzmann",function(){return o("5.67037321e-8 W m^-2 K^-4")}),i(a,"wienDisplacement",function(){return o("2.897772126e-3 m K")}),i(a,"molarMass",function(){return o("1e-3 kg mol^-1")}),i(a,"molarMassC12",function(){return o("1.2e-2 kg mol^-1")}),i(a,"gravity",function(){return o("9.80665 m s^-2")}),i(a,"planckLength",function(){return o("1.61619997e-35 m")}),i(a,"planckMass",function(){return o("2.1765113e-8 kg")}),i(a,"planckTime",function(){return o("5.3910632e-44 s")}),i(a,"planckCharge",function(){return o("1.87554595641e-18 C")}),i(a,"planckTemperature",function(){return o("1.41683385e+32 K")})}var i=r(3).lazy;t.factory=n,t.lazy=!1,t.math=!0},function(e,t,r){"use strict";function n(e,t,o,s,u){u.on("config",function(r,i){r.number!==i.number&&n(e,t,o,s,u)}),u["true"]=!0,u["false"]=!1,u["null"]=null,u.uninitialized=r(40).UNINITIALIZED,"BigNumber"===t.number?(u.Infinity=new e.BigNumber(1/0),u.NaN=new e.BigNumber(NaN),i.lazy(u,"pi",function(){return a.pi(e.BigNumber)}),i.lazy(u,"tau",function(){return a.tau(e.BigNumber)}),i.lazy(u,"e",function(){return a.e(e.BigNumber)}),i.lazy(u,"phi",function(){return a.phi(e.BigNumber)}),i.lazy(u,"E",function(){return u.e}),i.lazy(u,"LN2",function(){return new e.BigNumber(2).ln()}),i.lazy(u,"LN10",function(){return new e.BigNumber(10).ln()}),i.lazy(u,"LOG2E",function(){return new e.BigNumber(1).div(new e.BigNumber(2).ln())}),i.lazy(u,"LOG10E",function(){return new e.BigNumber(1).div(new e.BigNumber(10).ln())}),i.lazy(u,"PI",function(){return u.pi}),i.lazy(u,"SQRT1_2",function(){return new e.BigNumber("0.5").sqrt()}),i.lazy(u,"SQRT2",function(){return new e.BigNumber(2).sqrt()})):(u.Infinity=1/0,u.NaN=NaN,u.pi=Math.PI,u.tau=2*Math.PI,u.e=Math.E,u.phi=1.618033988749895,u.E=u.e,u.LN2=Math.LN2,u.LN10=Math.LN10,u.LOG2E=Math.LOG2E,u.LOG10E=Math.LOG10E,u.PI=u.pi,u.SQRT1_2=Math.SQRT1_2,u.SQRT2=Math.SQRT2),u.i=e.Complex.I,u.version=r(94)}var i=r(3),a=r(76);t.factory=n,t.lazy=!1,t.math=!0},function(e,t){e.exports="3.2.1"},function(e,t,r){e.exports=[r(96),r(268),r(297),r(299),r(325),r(270),r(296)]},function(e,t,r){function n(e,t,n,i){var a={};return a.bignumber=r(97),a["boolean"]=r(98),a.complex=r(99),a.fraction=r(100),a.index=r(101),a.matrix=r(102),a.number=r(103),a.sparse=r(104),a.string=r(105),a.unit=r(106),a.e=r(107),a.E=r(107),a["false"]=r(108),a.i=r(109),a.Infinity=r(110),a.LN2=r(111),a.LN10=r(112),a.LOG2E=r(113),a.LOG10E=r(114),a.NaN=r(115),a["null"]=r(116),a.pi=r(117),a.PI=r(117),a.phi=r(118),a.SQRT1_2=r(119),a.SQRT2=r(120),a.tau=r(121),a["true"]=r(122),a.version=r(123),a.speedOfLight={description:"Speed of light in vacuum",examples:["speedOfLight"]},a.gravitationConstant={description:"Newtonian constant of gravitation",examples:["gravitationConstant"]},a.planckConstant={description:"Planck constant",examples:["planckConstant"]},a.reducedPlanckConstant={description:"Reduced Planck constant",examples:["reducedPlanckConstant"]},a.magneticConstant={description:"Magnetic constant (vacuum permeability)",examples:["magneticConstant"]},a.electricConstant={description:"Electric constant (vacuum permeability)",examples:["electricConstant"]},a.vacuumImpedance={description:"Characteristic impedance of vacuum",examples:["vacuumImpedance"]},a.coulomb={description:"Coulomb's constant",examples:["coulomb"]},a.elementaryCharge={description:"Elementary charge",examples:["elementaryCharge"]},a.bohrMagneton={description:"Borh magneton",examples:["bohrMagneton"]},a.conductanceQuantum={description:"Conductance quantum",examples:["conductanceQuantum"]},a.inverseConductanceQuantum={description:"Inverse conductance quantum",examples:["inverseConductanceQuantum"]},a.magneticFluxQuantum={description:"Magnetic flux quantum",examples:["magneticFluxQuantum"]},a.nuclearMagneton={description:"Nuclear magneton",examples:["nuclearMagneton"]},a.klitzing={description:"Von Klitzing constant",examples:["klitzing"]},a.bohrRadius={description:"Borh radius",examples:["bohrRadius"]},a.classicalElectronRadius={description:"Classical electron radius",examples:["classicalElectronRadius"]},a.electronMass={description:"Electron mass",examples:["electronMass"]},a.fermiCoupling={description:"Fermi coupling constant",examples:["fermiCoupling"]},a.fineStructure={description:"Fine-structure constant",examples:["fineStructure"]},a.hartreeEnergy={description:"Hartree energy",examples:["hartreeEnergy"]},a.protonMass={description:"Proton mass",examples:["protonMass"]},a.deuteronMass={description:"Deuteron Mass",examples:["deuteronMass"]},a.neutronMass={description:"Neutron mass",examples:["neutronMass"]},a.quantumOfCirculation={description:"Quantum of circulation",examples:["quantumOfCirculation"]},a.rydberg={description:"Rydberg constant",examples:["rydberg"]},a.thomsonCrossSection={description:"Thomson cross section",examples:["thomsonCrossSection"]},a.weakMixingAngle={description:"Weak mixing angle",examples:["weakMixingAngle"]},a.efimovFactor={description:"Efimov factor",examples:["efimovFactor"]},a.atomicMass={description:"Atomic mass constant",examples:["atomicMass"]},a.avogadro={description:"Avogadro's number",examples:["avogadro"]},a.boltzmann={description:"Boltzmann constant",examples:["boltzmann"]},a.faraday={description:"Faraday constant",examples:["faraday"]},a.firstRadiation={description:"First radiation constant",examples:["firstRadiation"]},a.loschmidt={description:"Loschmidt constant at T=273.15 K and p=101.325 kPa",examples:["loschmidt"]},a.gasConstant={description:"Gas constant",examples:["gasConstant"]},a.molarPlanckConstant={description:"Molar Planck constant",examples:["molarPlanckConstant"]},a.molarVolume={description:"Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",examples:["molarVolume"]},a.sackurTetrode={description:"Sackur-Tetrode constant at T=1 K and p=101.325 kPa",examples:["sackurTetrode"]},a.secondRadiation={description:"Second radiation constant",examples:["secondRadiation"]},a.stefanBoltzmann={description:"Stefan-Boltzmann constant",examples:["stefanBoltzmann"]},a.wienDisplacement={description:"Wien displacement law constant",examples:["wienDisplacement"]},a.molarMass={description:"Molar mass constant",examples:["molarMass"]},a.molarMassC12={description:"Molar mass constant of carbon-12",examples:["molarMassC12"]},a.gravity={description:"Standard acceleration of gravity (standard acceleration of free-fall on Earth)",examples:["gravity"]},a.planckLength={description:"Planck length",examples:["planckLength"]},a.planckMass={description:"Planck mass",examples:["planckMass"]},a.planckTime={description:"Planck time",examples:["planckTime"]},a.planckCharge={description:"Planck charge",examples:["planckCharge"]},a.planckTemperature={description:"Planck temperature",examples:["planckTemperature"]},a.lsolve=r(124),a.lup=r(125),a.lusolve=r(126),a.slu=r(127),a.usolve=r(128),a.abs=r(129),a.add=r(130),a.cbrt=r(131),a.ceil=r(132),a.cube=r(133),a.divide=r(134),a.dotDivide=r(135),a.dotMultiply=r(136),a.dotPow=r(137),a.exp=r(138),a.fix=r(139),a.floor=r(140),a.gcd=r(141),a.hypot=r(142),a.lcm=r(143),a.log=r(144),a.log10=r(145),a.mod=r(146),a.multiply=r(147),a.norm=r(148),a.nthRoot=r(149),a.pow=r(150),a.round=r(151),a.sign=r(152),a.sqrt=r(153),a.square=r(154),a.subtract=r(155),a.unaryMinus=r(156),a.unaryPlus=r(157),a.xgcd=r(158),a.bitAnd=r(159),a.bitNot=r(160),a.bitOr=r(161),a.bitXor=r(162),a.leftShift=r(163),a.rightArithShift=r(164),a.rightLogShift=r(165),a.bellNumbers=r(166),a.catalan=r(167),a.composition=r(168),a.stirlingS2=r(169),a.config=r(170),a["import"]=r(171),a.typed=r(172),a.arg=r(173),a.conj=r(174),a.re=r(175),a.im=r(176),a.eval=r(177),a.help=r(178),a.distance=r(179),a.intersect=r(180),a.and=r(181),a.not=r(182),a.or=r(183),a.xor=r(184),a.concat=r(185),a.cross=r(186),a.det=r(187),a.diag=r(188),a.dot=r(189),a.eye=r(190),a.filter=r(191),a.flatten=r(192),a.forEach=r(193),a.inv=r(194),a.map=r(195),a.ones=r(196),a.partitionSelect=r(197),a.range=r(198),a.resize=r(199),a.size=r(200),a.sort=r(201),a.squeeze=r(202),a.subset=r(203),a.trace=r(204),a.transpose=r(205),a.zeros=r(206),a.combinations=r(207),a.factorial=r(208),a.gamma=r(209),a.kldivergence=r(210),a.multinomial=r(211),a.permutations=r(212),a.pickRandom=r(213),a.random=r(214),a.randomInt=r(215),a.compare=r(216),a.deepEqual=r(217),a.equal=r(218),a.larger=r(219),a.largerEq=r(220),a.smaller=r(221),a.smallerEq=r(222),a.unequal=r(223),a.max=r(224),a.mean=r(225),a.median=r(226),a.min=r(227),a.mode=r(228),a.prod=r(229),a.quantileSeq=r(230),a.std=r(231),a.sum=r(232),a["var"]=r(233),a.acos=r(234),a.acosh=r(235),a.acot=r(236),a.acoth=r(237),a.acsc=r(238),a.acsch=r(239),a.asec=r(240),a.asech=r(241),a.asin=r(242),a.asinh=r(243),a.atan=r(244),a.atanh=r(245),a.atan2=r(246),a.cos=r(247),a.cosh=r(248),a.cot=r(249),a.coth=r(250),a.csc=r(251),a.csch=r(252),a.sec=r(253),a.sech=r(254),a.sin=r(255),a.sinh=r(256),a.tan=r(257),a.tanh=r(258),a.to=r(259),a.clone=r(260),a.format=r(261),a.isInteger=r(262),a.isNegative=r(263),a.isNumeric=r(264),a.isPositive=r(265),a.isZero=r(266),a["typeof"]=r(267),a}t.name="docs",t.path="expression",t.factory=n},function(e,t){e.exports={name:"bignumber",category:"Construction",syntax:["bignumber(x)"],description:"Create a big number from a number or string.",examples:["0.1 + 0.2","bignumber(0.1) + bignumber(0.2)",'bignumber("7.2")','bignumber("7.2e500")',"bignumber([0.1, 0.2, 0.3])"],seealso:["boolean","complex","fraction","index","matrix","string","unit"]}},function(e,t){e.exports={name:"boolean",category:"Construction",syntax:["x","boolean(x)"],description:"Convert a string or number into a boolean.",examples:["boolean(0)","boolean(1)","boolean(3)",'boolean("true")','boolean("false")',"boolean([1, 0, 1, 1])"],seealso:["bignumber","complex","index","matrix","number","string","unit"]}},function(e,t){e.exports={name:"complex",category:"Construction",syntax:["complex()","complex(re, im)","complex(string)"],description:"Create a complex number.",examples:["complex()","complex(2, 3)",'complex("7 - 2i")'],seealso:["bignumber","boolean","index","matrix","number","string","unit"]}},function(e,t){e.exports={name:"fraction",category:"Construction",syntax:["fraction(num)","fraction(num,den)"],description:"Create a fraction from a number or from a numerator and denominator.",examples:["fraction(0.125)","fraction(1, 3) + fraction(2, 5)"],seealso:["bignumber","boolean","complex","index","matrix","string","unit"]}},function(e,t){e.exports={name:"index",category:"Construction",syntax:["[start]","[start:end]","[start:step:end]","[start1, start 2, ...]","[start1:end1, start2:end2, ...]","[start1:step1:end1, start2:step2:end2, ...]"],description:"Create an index to get or replace a subset of a matrix",examples:["[]","[1, 2, 3]","A = [1, 2, 3; 4, 5, 6]","A[1, :]","A[1, 2] = 50","A[0:2, 0:2] = ones(2, 2)"],seealso:["bignumber","boolean","complex","matrix,","number","range","string","unit"]}},function(e,t){e.exports={name:"matrix",category:"Construction",syntax:["[]","[a1, b1, ...; a2, b2, ...]","matrix()",'matrix("dense")',"matrix([...])"],description:"Create a matrix.",examples:["[]","[1, 2, 3]","[1, 2, 3; 4, 5, 6]","matrix()","matrix([3, 4])",'matrix([3, 4; 5, 6], "sparse")','matrix([3, 4; 5, 6], "sparse", "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","sparse"]}},function(e,t){e.exports={name:"number",category:"Construction",syntax:["x","number(x)"],description:"Create a number or convert a string or boolean into a number.",examples:["2","2e3","4.05","number(2)",'number("7.2")',"number(true)","number([true, false, true, true])",'number("52cm", "m")'],seealso:["bignumber","boolean","complex","fraction","index","matrix","string","unit"]}},function(e,t){e.exports={name:"sparse",category:"Construction",syntax:["sparse()","sparse([a1, b1, ...; a1, b2, ...])",'sparse([a1, b1, ...; a1, b2, ...], "number")'],description:"Create a sparse matrix.",examples:["sparse()","sparse([3, 4; 5, 6])",'sparse([3, 0; 5, 0], "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","matrix"]}},function(e,t){e.exports={name:"string",category:"Construction",syntax:['"text"',"string(x)"],description:"Create a string or convert a value to a string",examples:['"Hello World!"',"string(4.2)","string(3 + 2i)"],seealso:["bignumber","boolean","complex","index","matrix","number","unit"]}},function(e,t){e.exports={name:"unit",category:"Construction",syntax:["value unit","unit(value, unit)","unit(string)"],description:"Create a unit.",examples:["5.5 mm","3 inch",'unit(7.1, "kilogram")','unit("23 deg")'],seealso:["bignumber","boolean","complex","index","matrix","number","string"]}},function(e,t){e.exports={name:"e",category:"Constants",syntax:["e"],description:"Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",examples:["e","e ^ 2","exp(2)","log(e)"],seealso:["exp"]}},function(e,t){e.exports={name:"false",category:"Constants",syntax:["false"],description:"Boolean value false",examples:["false"],seealso:["true"]}},function(e,t){e.exports={name:"i",category:"Constants",syntax:["i"],description:"Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",examples:["i","i * i","sqrt(-1)"],seealso:[]}},function(e,t){e.exports={name:"Infinity",category:"Constants",syntax:["Infinity"],description:"Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",examples:["Infinity","1 / 0"],seealso:[]}},function(e,t){e.exports={name:"LN2",category:"Constants",syntax:["LN2"],description:"Returns the natural logarithm of 2, approximately equal to 0.693",examples:["LN2","log(2)"],seealso:[]}},function(e,t){e.exports={name:"LN10",category:"Constants",syntax:["LN10"],description:"Returns the natural logarithm of 10, approximately equal to 2.302",examples:["LN10","log(10)"],seealso:[]}},function(e,t){e.exports={name:"LOG2E",category:"Constants",syntax:["LOG2E"],description:"Returns the base-2 logarithm of E, approximately equal to 1.442",examples:["LOG2E","log(e, 2)"],seealso:[]}},function(e,t){e.exports={name:"LOG10E",category:"Constants",syntax:["LOG10E"],description:"Returns the base-10 logarithm of E, approximately equal to 0.434",examples:["LOG10E","log(e, 10)"],seealso:[]}},function(e,t){e.exports={name:"NaN",category:"Constants",syntax:["NaN"],description:"Not a number",examples:["NaN","0 / 0"],seealso:[]}},function(e,t){e.exports={name:"null",category:"Constants",syntax:["null"],description:"Value null",examples:["null"],seealso:["true","false"]}},function(e,t){e.exports={name:"pi",category:"Constants",syntax:["pi"],description:"The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",examples:["pi","sin(pi/2)"],seealso:["tau"]}},function(e,t){e.exports={name:"phi",category:"Constants",syntax:["phi"],description:"Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",examples:["tau"],seealso:[]}},function(e,t){e.exports={name:"SQRT1_2",category:"Constants",syntax:["SQRT1_2"],description:"Returns the square root of 1/2, approximately equal to 0.707",examples:["SQRT1_2","sqrt(1/2)"],seealso:[]}},function(e,t){e.exports={name:"SQRT2",category:"Constants",syntax:["SQRT2"],description:"Returns the square root of 2, approximately equal to 1.414",examples:["SQRT2","sqrt(2)"],seealso:[]}},function(e,t){e.exports={name:"tau",category:"Constants",syntax:["tau"],description:"Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",examples:["tau","2 * pi"],seealso:["pi"]}},function(e,t){e.exports={name:"true",category:"Constants",syntax:["true"],description:"Boolean value true",examples:["true"],seealso:["false"]}},function(e,t){e.exports={name:"version",category:"Constants",syntax:["version"],description:"A string with the version number of math.js",examples:["version"],seealso:[]}},function(e,t){e.exports={name:"lsolve",category:"Algebra",syntax:["x=lsolve(L, b)"],description:"Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lsolve(a, b)"],seealso:["lup","lusolve","usolve","matrix","sparse"]}},function(e,t){e.exports={name:"lup",category:"Algebra",syntax:["lup(m)"],description:"Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",examples:["lup([[2, 1], [1, 4]])","lup(matrix([[2, 1], [1, 4]]))","lup(sparse([[2, 1], [1, 4]]))"],seealso:["lusolve","lsolve","usolve","matrix","sparse","slu"]}},function(e,t){e.exports={name:"lusolve",category:"Algebra",syntax:["x=lusolve(A, b)","x=lusolve(lu, b)"],description:"Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lusolve(a, b)"],seealso:["lup","slu","lsolve","usolve","matrix","sparse"]}},function(e,t){e.exports={name:"slu",category:"Algebra",syntax:["slu(A, order, threshold)"],description:"Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",examples:["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],seealso:["lusolve","lsolve","usolve","matrix","sparse","lup"]}},function(e,t){e.exports={name:"usolve",category:"Algebra",syntax:["x=usolve(U, b)"],description:"Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",examples:["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],seealso:["lup","lusolve","lsolve","matrix","sparse"]}},function(e,t){e.exports={name:"abs",category:"Arithmetic",syntax:["abs(x)"],description:"Compute the absolute value.",examples:["abs(3.5)","abs(-4.2)"],seealso:["sign"]}},function(e,t){e.exports={name:"add",category:"Operators",syntax:["x + y","add(x, y)"],description:"Add two values.",examples:["a = 2.1 + 3.6","a - 3.6","3 + 2i","3 cm + 2 inch",'"2.3" + "4"'],seealso:["subtract"]}},function(e,t){e.exports={name:"cbrt",category:"Arithmetic",syntax:["cbrt(x)","cbrt(x, allRoots)"],description:"Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",examples:["cbrt(64)","cube(4)","cbrt(-8)","cbrt(2 + 3i)","cbrt(8i)","cbrt(8i, true)","cbrt(27 m^3)"],seealso:["square","sqrt","cube","multiply"]}},function(e,t){e.exports={name:"ceil",category:"Arithmetic",syntax:["ceil(x)"],description:"Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",examples:["ceil(3.2)","ceil(3.8)","ceil(-4.2)"],seealso:["floor","fix","round"]}},function(e,t){e.exports={name:"cube",category:"Arithmetic",syntax:["cube(x)"],description:"Compute the cube of a value. The cube of x is x * x * x.",examples:["cube(2)","2^3","2 * 2 * 2"],seealso:["multiply","square","pow"]}},function(e,t){e.exports={name:"divide",category:"Operators",syntax:["x / y","divide(x, y)"],description:"Divide two values.",examples:["a = 2 / 3","a * 3","4.5 / 2","3 + 4 / 2","(3 + 4) / 2","18 km / 4.5"],seealso:["multiply"]}},function(e,t){e.exports={name:"dotDivide",category:"Operators",syntax:["x ./ y","dotDivide(x, y)"],description:"Divide two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a ./ b"],seealso:["multiply","dotMultiply","divide"]}},function(e,t){e.exports={name:"dotMultiply",category:"Operators",syntax:["x .* y","dotMultiply(x, y)"],description:"Multiply two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a .* b"],seealso:["multiply","divide","dotDivide"]}},function(e,t){e.exports={name:"dotpow",category:"Operators",syntax:["x .^ y","dotpow(x, y)"],description:"Calculates the power of x to y element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","a .^ 2"],seealso:["pow"]}},function(e,t){e.exports={name:"exp",category:"Arithmetic",syntax:["exp(x)"],description:"Calculate the exponent of a value.",examples:["exp(1.3)","e ^ 1.3","log(exp(1.3))","x = 2.4","(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],seealso:["pow","log"]}},function(e,t){e.exports={name:"fix",category:"Arithmetic",syntax:["fix(x)"],description:"Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",examples:["fix(3.2)","fix(3.8)","fix(-4.2)","fix(-4.8)"],seealso:["ceil","floor","round"]}},function(e,t){e.exports={name:"floor",category:"Arithmetic",syntax:["floor(x)"],description:"Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",examples:["floor(3.2)","floor(3.8)","floor(-4.2)"],seealso:["ceil","fix","round"]}},function(e,t){e.exports={name:"gcd",category:"Arithmetic",
syntax:["gcd(a, b)","gcd(a, b, c, ...)"],description:"Compute the greatest common divisor.",examples:["gcd(8, 12)","gcd(-4, 6)","gcd(25, 15, -10)"],seealso:["lcm","xgcd"]}},function(e,t){e.exports={name:"hypot",category:"Arithmetic",syntax:["hypot(a, b, c, ...)","hypot([a, b, c, ...])"],description:"Calculate the hypotenusa of a list with values. ",examples:["hypot(3, 4)","sqrt(3^2 + 4^2)","hypot(-2)","hypot([3, 4, 5])"],seealso:["abs","norm"]}},function(e,t){e.exports={name:"lcm",category:"Arithmetic",syntax:["lcm(x, y)"],description:"Compute the least common multiple.",examples:["lcm(4, 6)","lcm(6, 21)","lcm(6, 21, 5)"],seealso:["gcd"]}},function(e,t){e.exports={name:"log",category:"Arithmetic",syntax:["log(x)","log(x, base)"],description:"Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",examples:["log(3.5)","a = log(2.4)","exp(a)","10 ^ 4","log(10000, 10)","log(10000) / log(10)","b = log(1024, 2)","2 ^ b"],seealso:["exp","log10"]}},function(e,t){e.exports={name:"log10",category:"Arithmetic",syntax:["log10(x)"],description:"Compute the 10-base logarithm of a value.",examples:["log10(0.00001)","log10(10000)","10 ^ 4","log(10000) / log(10)","log(10000, 10)"],seealso:["exp","log"]}},function(e,t){e.exports={name:"mod",category:"Operators",syntax:["x % y","x mod y","mod(x, y)"],description:"Calculates the modulus, the remainder of an integer division.",examples:["7 % 3","11 % 2","10 mod 4","function isOdd(x) = x % 2","isOdd(2)","isOdd(3)"],seealso:["divide"]}},function(e,t){e.exports={name:"multiply",category:"Operators",syntax:["x * y","multiply(x, y)"],description:"multiply two values.",examples:["a = 2.1 * 3.4","a / 3.4","2 * 3 + 4","2 * (3 + 4)","3 * 2.1 km"],seealso:["divide"]}},function(e,t){e.exports={name:"norm",category:"Arithmetic",syntax:["norm(x)","norm(x, p)"],description:"Calculate the norm of a number, vector or matrix.",examples:["abs(-3.5)","norm(-3.5)","norm(3 - 4i))","norm([1, 2, -3], Infinity)","norm([1, 2, -3], -Infinity)","norm([3, 4], 2)","norm([[1, 2], [3, 4]], 1)","norm([[1, 2], [3, 4]], 'inf')","norm([[1, 2], [3, 4]], 'fro')"]}},function(e,t){e.exports={name:"nthRoot",category:"Arithmetic",syntax:["nthRoot(a)","nthRoot(a, root)"],description:'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',examples:["4 ^ 3","nthRoot(64, 3)","nthRoot(9, 2)","sqrt(9)"],seealso:["sqrt","pow"]}},function(e,t){e.exports={name:"pow",category:"Operators",syntax:["x ^ y","pow(x, y)"],description:"Calculates the power of x to y, x^y.",examples:["2^3 = 8","2*2*2","1 + e ^ (pi * i)"],seealso:["multiply"]}},function(e,t){e.exports={name:"round",category:"Arithmetic",syntax:["round(x)","round(x, n)"],description:"round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",examples:["round(3.2)","round(3.8)","round(-4.2)","round(-4.8)","round(pi, 3)","round(123.45678, 2)"],seealso:["ceil","floor","fix"]}},function(e,t){e.exports={name:"sign",category:"Arithmetic",syntax:["sign(x)"],description:"Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",examples:["sign(3.5)","sign(-4.2)","sign(0)"],seealso:["abs"]}},function(e,t){e.exports={name:"sqrt",category:"Arithmetic",syntax:["sqrt(x)"],description:"Compute the square root value. If x = y * y, then y is the square root of x.",examples:["sqrt(25)","5 * 5","sqrt(-1)"],seealso:["square","multiply"]}},function(e,t){e.exports={name:"square",category:"Arithmetic",syntax:["square(x)"],description:"Compute the square of a value. The square of x is x * x.",examples:["square(3)","sqrt(9)","3^2","3 * 3"],seealso:["multiply","pow","sqrt","cube"]}},function(e,t){e.exports={name:"subtract",category:"Operators",syntax:["x - y","subtract(x, y)"],description:"subtract two values.",examples:["a = 5.3 - 2","a + 2","2/3 - 1/6","2 * 3 - 3","2.1 km - 500m"],seealso:["add"]}},function(e,t){e.exports={name:"unaryMinus",category:"Operators",syntax:["-x","unaryMinus(x)"],description:"Inverse the sign of a value. Converts booleans and strings to numbers.",examples:["-4.5","-(-5.6)",'-"22"'],seealso:["add","subtract","unaryPlus"]}},function(e,t){e.exports={name:"unaryPlus",category:"Operators",syntax:["+x","unaryPlus(x)"],description:"Converts booleans and strings to numbers.",examples:["+true",'+"2"'],seealso:["add","subtract","unaryMinus"]}},function(e,t){e.exports={name:"xgcd",category:"Arithmetic",syntax:["xgcd(a, b)"],description:"Calculate the extended greatest common divisor for two values",examples:["xgcd(8, 12)","gcd(8, 12)","xgcd(36163, 21199)"],seealso:["gcd","lcm"]}},function(e,t){e.exports={name:"bitAnd",category:"Bitwise",syntax:["x & y","bitAnd(x, y)"],description:"Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",examples:["5 & 3","bitAnd(53, 131)","[1, 12, 31] & 42"],seealso:["bitNot","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitNot",category:"Bitwise",syntax:["~x","bitNot(x)"],description:"Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",examples:["~1","~2","bitNot([2, -3, 4])"],seealso:["bitAnd","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitOr",category:"Bitwise",syntax:["x | y","bitOr(x, y)"],description:"Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",examples:["5 | 3","bitOr([1, 2, 3], 4)"],seealso:["bitAnd","bitNot","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"bitXor",category:"Bitwise",syntax:["bitXor(x, y)"],description:"Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",examples:["bitOr(1, 2)","bitXor([2, 3, 4], 4)"],seealso:["bitAnd","bitNot","bitOr","leftShift","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"leftShift",category:"Bitwise",syntax:["x << y","leftShift(x, y)"],description:"Bitwise left logical shift of a value x by y number of bits.",examples:["4 << 1","8 >> 1"],seealso:["bitAnd","bitNot","bitOr","bitXor","rightArithShift","rightLogShift"]}},function(e,t){e.exports={name:"rightArithShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right arithmetic shift of a value x by y number of bits.",examples:["8 >> 1","4 << 1","-12 >> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightLogShift"]}},function(e,t){e.exports={name:"rightLogShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right logical shift of a value x by y number of bits.",examples:["8 >>> 1","4 << 1","-12 >>> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightArithShift"]}},function(e,t){e.exports={name:"bellNumbers",category:"Combinatorics",syntax:["bellNumbers(n)"],description:"The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["bellNumbers(3)","bellNumbers(8)"],seealso:["stirlingS2"]}},function(e,t){e.exports={name:"catalan",category:"Combinatorics",syntax:["catalan(n)"],description:"The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["catalan(3)","catalan(8)"],seealso:["bellNumbers"]}},function(e,t){e.exports={name:"composition",category:"Combinatorics",syntax:["composition(n, k)"],description:"The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",examples:["composition(5, 3)"],seealso:["combinations"]}},function(e,t){e.exports={name:"stirlingS2",category:"Combinatorics",syntax:["stirlingS2(n, k)"],description:"he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",examples:["stirlingS2(5, 3)"],seealso:["bellNumbers"]}},function(e,t){e.exports={name:"config",category:"Core",syntax:["config()","config(options)"],description:"Get configuration or change configuration.",examples:["config()","1/3 + 1/4",'config({number: "Fraction"})',"1/3 + 1/4"],seealso:[]}},function(e,t){e.exports={name:"import",category:"Core",syntax:["import(functions)","import(functions, options)"],description:"Import functions or constants from an object.",examples:["import({myFn: f(x)=x^2, myConstant: 32 })","myFn(2)","myConstant"],seealso:[]}},function(e,t){e.exports={name:"typed",category:"Core",syntax:["typed(signatures)","typed(name, signatures)"],description:"Create a typed function.",examples:['double = typed({ "number, number": f(x)=x+x })',"double(2)",'double("hello")'],seealso:[]}},function(e,t){e.exports={name:"arg",category:"Complex",syntax:["arg(x)"],description:"Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",examples:["arg(2 + 2i)","atan2(3, 2)","arg(2 + 3i)"],seealso:["re","im","conj","abs"]}},function(e,t){e.exports={name:"conj",category:"Complex",syntax:["conj(x)"],description:"Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",examples:["conj(2 + 3i)","conj(2 - 3i)","conj(-5.2i)"],seealso:["re","im","abs","arg"]}},function(e,t){e.exports={name:"re",category:"Complex",syntax:["re(x)"],description:"Get the real part of a complex number.",examples:["re(2 + 3i)","im(2 + 3i)","re(-5.2i)","re(2.4)"],seealso:["im","conj","abs","arg"]}},function(e,t){e.exports={name:"im",category:"Complex",syntax:["im(x)"],description:"Get the imaginary part of a complex number.",examples:["im(2 + 3i)","re(2 + 3i)","im(-5.2i)","im(2.4)"],seealso:["re","conj","abs","arg"]}},function(e,t){e.exports={name:"eval",category:"Expression",syntax:["eval(expression)","eval([expr1, expr2, expr3, ...])"],description:"Evaluate an expression or an array with expressions.",examples:['eval("2 + 3")','eval("sqrt(" + 4 + ")")'],seealso:[]}},function(e,t){e.exports={name:"help",category:"Expression",syntax:["help(object)","help(string)"],description:"Display documentation on a function or data type.",examples:["help(sqrt)",'help("complex")'],seealso:[]}},function(e,t){e.exports={name:"distance",category:"Geometry",syntax:["distance([x1, y1], [x2, y2])","distance([[x1, y1], [x2, y2])"],description:"Calculates the Euclidean distance between two points.",examples:["distance([0,0], [4,4])","distance([[0,0], [4,4]])"],seealso:[]}},function(e,t){e.exports={name:"intersect",category:"Geometry",syntax:["intersect(expr1, expr2, expr3, expr4)","intersect(expr1, expr2, expr3)"],description:"Computes the intersection point of lines and/or planes.",examples:["intersect([0, 0], [10, 10], [10, 0], [0, 10])","intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],seealso:[]}},function(e,t){e.exports={name:"and",category:"Logical",syntax:["x and y","and(x, y)"],description:"Logical and. Test whether two values are both defined with a nonzero/nonempty value.",examples:["true and false","true and true","2 and 4"],seealso:["not","or","xor"]}},function(e,t){e.exports={name:"not",category:"Logical",syntax:["not x","not(x)"],description:"Logical not. Flips the boolean value of given argument.",examples:["not true","not false","not 2","not 0"],seealso:["and","or","xor"]}},function(e,t){e.exports={name:"or",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical or. Test if at least one value is defined with a nonzero/nonempty value.",examples:["true or false","false or false","0 or 4"],seealso:["not","and","xor"]}},function(e,t){e.exports={name:"xor",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",examples:["true xor false","false xor false","true xor true","0 or 4"],seealso:["not","and","or"]}},function(e,t){e.exports={name:"concat",category:"Matrix",syntax:["concat(A, B, C, ...)","concat(A, B, C, ..., dim)"],description:"Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",examples:["A = [1, 2; 5, 6]","B = [3, 4; 7, 8]","concat(A, B)","concat(A, B, 1)","concat(A, B, 2)"],seealso:["det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"cross",category:"Matrix",syntax:["cross(A, B)"],description:"Calculate the cross product for two vectors in three dimensional space.",examples:["cross([1, 1, 0],  [0, 1, 1])","cross([3, -3, 1], [4, 9, 2])","cross([2, 3, 4],  [5, 6, 7])"],seealso:["multiply","dot"]}},function(e,t){e.exports={name:"det",category:"Matrix",syntax:["det(x)"],description:"Calculate the determinant of a matrix",examples:["det([1, 2; 3, 4])","det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],seealso:["concat","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"diag",category:"Matrix",syntax:["diag(x)","diag(x, k)"],description:"Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",examples:["diag(1:3)","diag(1:3, 1)","a = [1, 2, 3; 4, 5, 6; 7, 8, 9]","diag(a)"],seealso:["concat","det","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"dot",category:"Matrix",syntax:["dot(A, B)"],description:"Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",examples:["dot([2, 4, 1], [2, 2, 3])","[2, 4, 1] * [2, 2, 3]"],seealso:["multiply","cross"]}},function(e,t){e.exports={name:"eye",category:"Matrix",syntax:["eye(n)","eye(m, n)","eye([m, n])","eye"],description:"Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",examples:["eye(3)","eye(3, 5)","a = [1, 2, 3; 4, 5, 6]","eye(size(a))"],seealso:["concat","det","diag","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"filter",category:"Matrix",syntax:["filter(x, test)"],description:"Filter items in a matrix.",examples:["isPositive(x) = x > 0","filter([6, -2, -1, 4, 3], isPositive)","filter([6, -2, 0, 1, 0], x != 0)"],seealso:["sort","map","forEach"]}},function(e,t){e.exports={name:"flatten",category:"Matrix",syntax:["flatten(x)"],description:"Flatten a multi dimensional matrix into a single dimensional matrix.",examples:["a = [1, 2, 3; 4, 5, 6]","size(a)","b = flatten(a)","size(b)"],seealso:["concat","resize","size","squeeze"]}},function(e,t){e.exports={name:"forEach",category:"Matrix",syntax:["forEach(x, callback)"],description:"Iterates over all elements of a matrix/array, and executes the given callback function.",examples:["forEach([1, 2, 3], function(val) { console.log(val) })"],seealso:["map","sort","filter"]}},function(e,t){e.exports={name:"inv",category:"Matrix",syntax:["inv(x)"],description:"Calculate the inverse of a matrix",examples:["inv([1, 2; 3, 4])","inv(4)","1 / 4"],seealso:["concat","det","diag","eye","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"map",category:"Matrix",syntax:["map(x, callback)"],description:"Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",examples:["map([1, 2, 3], function(val) { return value * value })"],seealso:["filter","forEach"]}},function(e,t){e.exports={name:"ones",category:"Matrix",syntax:["ones(m)","ones(m, n)","ones(m, n, p, ...)","ones([m])","ones([m, n])","ones([m, n, p, ...])","ones"],description:"Create a matrix containing ones.",examples:["ones(3)","ones(3, 5)","ones([2,3]) * 4.5","a = [1, 2, 3; 4, 5, 6]","ones(size(a))"],seealso:["concat","det","diag","eye","inv","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"partitionSelect",category:"Matrix",syntax:["partitionSelect(x, k)","partitionSelect(x, k, compare)"],description:"Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",examples:["partitionSelect([5, 10, 1], 2)",'partitionSelect(["C", "B", "A", "D"], 1)'],seealso:["sort"]}},function(e,t){e.exports={name:"range",category:"Type",syntax:["start:end","start:step:end","range(start, end)","range(start, end, step)","range(string)"],description:"Create a range. Lower bound of the range is included, upper bound is excluded.",examples:["1:5","3:-1:-3","range(3, 7)","range(0, 12, 2)",'range("4:10")',"a = [1, 2, 3, 4; 5, 6, 7, 8]","a[1:2, 1:2]"],seealso:["concat","det","diag","eye","inv","ones","size","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"resize",category:"Matrix",syntax:["resize(x, size)","resize(x, size, defaultValue)"],description:"Resize a matrix.",examples:["resize([1,2,3,4,5], [3])","resize([1,2,3], [5])","resize([1,2,3], [5], -1)","resize(2, [2, 3])",'resize("hello", [8], "!")'],seealso:["size","subset","squeeze"]}},function(e,t){e.exports={name:"size",category:"Matrix",syntax:["size(x)"],description:"Calculate the size of a matrix.",examples:["size(2.3)",'size("hello world")',"a = [1, 2; 3, 4; 5, 6]","size(a)","size(1:6)"],seealso:["concat","det","diag","eye","inv","ones","range","squeeze","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"sort",category:"Matrix",syntax:["sort(x)","sort(x, compare)"],description:'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.',examples:["sort([5, 10, 1])",'sort(["C", "B", "A", "D"])',"sortByLength(a, b) = size(a)[1] - size(b)[1]",'sort(["Langdon", "Tom", "Sara"], sortByLength)'],seealso:["map","filter","forEach"]}},function(e,t){e.exports={name:"squeeze",category:"Matrix",syntax:["squeeze(x)"],description:"Remove inner and outer singleton dimensions from a matrix.",examples:["a = zeros(3,2,1)","size(squeeze(a))","b = zeros(1,1,3)","size(squeeze(b))"],seealso:["concat","det","diag","eye","inv","ones","range","size","subset","trace","transpose","zeros"]}},function(e,t){e.exports={name:"subset",category:"Matrix",syntax:["value(index)","value(index) = replacement","subset(value, [index])","subset(value, [index], replacement)"],description:"Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.",examples:["d = [1, 2; 3, 4]","e = []","e[1, 1:2] = [5, 6]","e[2, :] = [7, 8]","f = d * e","f[2, 1]","f[:, 1]"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","trace","transpose","zeros"]}},function(e,t){e.exports={name:"trace",category:"Matrix",syntax:["trace(A)"],description:"Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",examples:["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]","trace(A)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e,t){e.exports={name:"transpose",category:"Matrix",syntax:["x'","transpose(x)"],description:"Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","transpose(a)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","zeros"]}},function(e,t){e.exports={name:"zeros",category:"Matrix",syntax:["zeros(m)","zeros(m, n)","zeros(m, n, p, ...)","zeros([m])","zeros([m, n])","zeros([m, n, p, ...])","zeros"],description:"Create a matrix containing zeros.",examples:["zeros(3)","zeros(3, 5)","a = [1, 2, 3; 4, 5, 6]","zeros(size(a))"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose"]}},function(e,t){e.exports={name:"combinations",category:"Probability",syntax:["combinations(n, k)"],description:"Compute the number of combinations of n items taken k at a time",examples:["combinations(7, 5)"],seealso:["permutations","factorial"]}},function(e,t){e.exports={name:"factorial",category:"Probability",syntax:["kldivergence(x, y)"],description:"Compute the factorial of a value",examples:["5!","5 * 4 * 3 * 2 * 1","3!"],seealso:["combinations","permutations","gamma"]}},function(e,t){e.exports={name:"gamma",category:"Probability",syntax:["gamma(n)"],description:"Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",examples:["gamma(4)","3!","gamma(1/2)","sqrt(pi)"],seealso:["factorial"]}},function(e,t){e.exports={name:"kldivergence",category:"Probability",syntax:["n!","factorial(n)"],description:"Calculate the Kullback-Leibler (KL) divergence  between two distributions.",examples:["math.kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],seealso:[]}},function(e,t){e.exports={name:"multinomial",category:"Probability",syntax:["multinomial(A)"],description:"Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai <= 0.",examples:["multinomial([1, 2, 1])"],seealso:["combinations","factorial"]}},function(e,t){e.exports={name:"permutations",category:"Probability",syntax:["permutations(n)","permutations(n, k)"],description:"Compute the number of permutations of n items taken k at a time",examples:["permutations(5)","permutations(5, 3)"],seealso:["combinations","factorial"]}},function(e,t){e.exports={name:"pickRandom",category:"Probability",syntax:["pickRandom(array)"],description:"Pick a random entry from a given array.",examples:["pickRandom(0:10)","pickRandom([1, 3, 1, 6])"],seealso:["random","randomInt"]}},function(e,t){e.exports={name:"random",category:"Probability",syntax:["random()","random(max)","random(min, max)","random(size)","random(size, max)","random(size, min, max)"],description:"Return a random number.",examples:["random()","random(10, 20)","random([2, 3])"],seealso:["pickRandom","randomInt"]}},function(e,t){e.exports={name:"randInt",category:"Probability",syntax:["randInt(max)","randInt(min, max)","randInt(size)","randInt(size, max)","randInt(size, min, max)"],description:"Return a random integer number",examples:["randInt(10, 20)","randInt([2, 3], 10)"],seealso:["pickRandom","random"]}},function(e,t){e.exports={name:"compare",category:"Relational",syntax:["compare(x, y)"],description:"Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.",examples:["compare(2, 3)","compare(3, 2)","compare(2, 2)","compare(5cm, 40mm)","compare(2, [1, 2, 3])"],seealso:["equal","unequal","smaller","smallerEq","largerEq"]}},function(e,t){e.exports={name:"deepEqual",category:"Relational",syntax:["deepEqual(x, y)"],description:"Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",examples:["[1,3,4] == [1,3,4]","[1,3,4] == [1,3]"],seealso:["equal","unequal","smaller","larger","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"equal",category:"Relational",syntax:["x == y","equal(x, y)"],description:"Check equality of two values. Returns true if the values are equal, and false if not.",examples:["2+2 == 3","2+2 == 4","a = 3.2","b = 6-2.8","a == b","50cm == 0.5m"],seealso:["unequal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,t){e.exports={name:"larger",category:"Relational",syntax:["x > y","larger(x, y)"],description:"Check if value x is larger than y. Returns true if x is larger than y, and false if not.",examples:["2 > 3","5 > 2*2","a = 3.3","b = 6-2.8","(a > b)","(b < a)","5 cm > 2 inch"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"largerEq",category:"Relational",syntax:["x >= y","largerEq(x, y)"],description:"Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",examples:["2 > 1+1","2 >= 1+1","a = 3.2","b = 6-2.8","(a > b)"],seealso:["equal","unequal","smallerEq","smaller","largerEq","compare"]}},function(e,t){e.exports={name:"smaller",category:"Relational",syntax:["x < y","smaller(x, y)"],description:"Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 3","5 < 2*2","a = 3.3","b = 6-2.8","(a < b)","5 cm < 2 inch"],seealso:["equal","unequal","larger","smallerEq","largerEq","compare"]}},function(e,t){e.exports={name:"smallerEq",category:"Relational",syntax:["x <= y","smallerEq(x, y)"],description:"Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 1+1","2 <= 1+1","a = 3.2","b = 6-2.8","(a < b)"],seealso:["equal","unequal","larger","smaller","largerEq","compare"]}},function(e,t){e.exports={name:"unequal",category:"Relational",syntax:["x != y","unequal(x, y)"],description:"Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",examples:["2+2 != 3","2+2 != 4","a = 3.2","b = 6-2.8","a != b","50cm != 0.5m","5 cm != 2 inch"],seealso:["equal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,t){e.exports={name:"max",category:"Statistics",syntax:["max(a, b, c, ...)","max(A)","max(A, dim)"],description:"Compute the maximum value of a list of values.",examples:["max(2, 3, 4, 1)","max([2, 3, 4, 1])","max([2, 5; 4, 3])","max([2, 5; 4, 3], 1)","max([2, 5; 4, 3], 2)","max(2.7, 7.1, -4.5, 2.0, 4.1)","min(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["mean","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"mean",category:"Statistics",syntax:["mean(a, b, c, ...)","mean(A)","mean(A, dim)"],description:"Compute the arithmetic mean of a list of values.",examples:["mean(2, 3, 4, 1)","mean([2, 3, 4, 1])","mean([2, 5; 4, 3])","mean([2, 5; 4, 3], 1)","mean([2, 5; 4, 3], 2)","mean([1.0, 2.7, 3.2, 4.0])"],seealso:["max","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"median",category:"Statistics",syntax:["median(a, b, c, ...)","median(A)"],description:"Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",examples:["median(5, 2, 7)","median([3, -1, 5, 7])"],seealso:["max","mean","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"min",category:"Statistics",syntax:["min(a, b, c, ...)","min(A)","min(A, dim)"],description:"Compute the minimum value of a list of values.",examples:["min(2, 3, 4, 1)","min([2, 3, 4, 1])","min([2, 5; 4, 3])","min([2, 5; 4, 3], 1)","min([2, 5; 4, 3], 2)","min(2.7, 7.1, -4.5, 2.0, 4.1)","max(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["max","mean","median","prod","std","sum","var"]}},function(e,t){e.exports={name:"mode",category:"Statistics",syntax:["mode(a, b, c, ...)","mode(A)","mode(A, a, b, B, c, ...)"],description:"Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",examples:["mode(5, 2, 7)","mode([3, -1, 5, 7])"],seealso:["max","mean","min","median","prod","std","sum","var"]}},function(e,t){e.exports={name:"prod",category:"Statistics",syntax:["prod(a, b, c, ...)","prod(A)"],description:"Compute the product of all values.",examples:["prod(2, 3, 4)","prod([2, 3, 4])","prod([2, 5; 4, 3])"],seealso:["max","mean","min","median","min","std","sum","var"]}},function(e,t){e.exports={name:"quantileSeq",category:"Statistics",syntax:["quantileSeq(A, prob[, sorted])","quantileSeq(A, [prob1, prob2, ...][, sorted])","quantileSeq(A, N[, sorted])"],description:"Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.",examples:["quantileSeq([3, -1, 5, 7], 0.5)","quantileSeq([3, -1, 5, 7], [1/3, 2/3])","quantileSeq([3, -1, 5, 7], 2)","quantileSeq([-1, 3, 5, 7], 0.5, true)"],seealso:["mean","median","min","max","prod","std","sum","var"]}},function(e,t){e.exports={name:"std",category:"Statistics",syntax:["std(a, b, c, ...)","std(A)","std(A, normalization)"],description:'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["std(2, 4, 6)","std([2, 4, 6, 8])",'std([2, 4, 6, 8], "uncorrected")','std([2, 4, 6, 8], "biased")',"std([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","sum","var"]}},function(e,t){e.exports={name:"sum",category:"Statistics",syntax:["sum(a, b, c, ...)","sum(A)"],description:"Compute the sum of all values.",examples:["sum(2, 3, 4, 1)","sum([2, 3, 4, 1])","sum([2, 5; 4, 3])"],seealso:["max","mean","median","min","prod","std","sum","var"]}},function(e,t){e.exports={name:"var",category:"Statistics",syntax:["var(a, b, c, ...)","var(A)","var(A, normalization)"],description:'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["var(2, 4, 6)","var([2, 4, 6, 8])",'var([2, 4, 6, 8], "uncorrected")','var([2, 4, 6, 8], "biased")',"var([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","std","sum"]}},function(e,t){e.exports={name:"acos",category:"Trigonometry",syntax:["acos(x)"],description:"Compute the inverse cosine of a value in radians.",examples:["acos(0.5)","acos(cos(2.3))"],seealso:["cos","atan","asin"]}},function(e,t){e.exports={name:"acosh",category:"Trigonometry",syntax:["acosh(x)"],description:"Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",examples:["acosh(1.5)"],seealso:["cosh","asinh","atanh"]}},function(e,t){e.exports={name:"acot",category:"Trigonometry",syntax:["acot(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acot(0.5)","acot(cot(0.5))","acot(2)"],seealso:["cot","atan"]}},function(e,t){e.exports={name:"acoth",category:"Trigonometry",syntax:["acoth(x)"],description:"Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",examples:["acoth(0.5)"],seealso:["acsch","asech"]}},function(e,t){e.exports={name:"acsc",
category:"Trigonometry",syntax:["acsc(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acsc(0.5)","acsc(csc(0.5))","acsc(2)"],seealso:["csc","asin","asec"]}},function(e,t){e.exports={name:"acsch",category:"Trigonometry",syntax:["acsch(x)"],description:"Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",examples:["acsch(0.5)"],seealso:["asech","acoth"]}},function(e,t){e.exports={name:"asec",category:"Trigonometry",syntax:["asec(x)"],description:"Calculate the inverse secant of a value.",examples:["asec(0.5)","asec(sec(0.5))","asec(2)"],seealso:["acos","acot","acsc"]}},function(e,t){e.exports={name:"asech",category:"Trigonometry",syntax:["asech(x)"],description:"Calculate the inverse secant of a value.",examples:["asech(0.5)"],seealso:["acsch","acoth"]}},function(e,t){e.exports={name:"asin",category:"Trigonometry",syntax:["asin(x)"],description:"Compute the inverse sine of a value in radians.",examples:["asin(0.5)","asin(sin(2.3))"],seealso:["sin","acos","atan"]}},function(e,t){e.exports={name:"asinh",category:"Trigonometry",syntax:["asinh(x)"],description:"Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",examples:["asinh(0.5)"],seealso:["acosh","atanh"]}},function(e,t){e.exports={name:"atan",category:"Trigonometry",syntax:["atan(x)"],description:"Compute the inverse tangent of a value in radians.",examples:["atan(0.5)","atan(tan(2.3))"],seealso:["tan","acos","asin"]}},function(e,t){e.exports={name:"atanh",category:"Trigonometry",syntax:["atanh(x)"],description:"Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",examples:["atanh(0.5)"],seealso:["acosh","asinh"]}},function(e,t){e.exports={name:"atan2",category:"Trigonometry",syntax:["atan2(y, x)"],description:"Computes the principal value of the arc tangent of y/x in radians.",examples:["atan2(2, 2) / pi","angle = 60 deg in rad","x = cos(angle)","y = sin(angle)","atan2(y, x)"],seealso:["sin","cos","tan"]}},function(e,t){e.exports={name:"cos",category:"Trigonometry",syntax:["cos(x)"],description:"Compute the cosine of x in radians.",examples:["cos(2)","cos(pi / 4) ^ 2","cos(180 deg)","cos(60 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["acos","sin","tan"]}},function(e,t){e.exports={name:"cosh",category:"Trigonometry",syntax:["cosh(x)"],description:"Compute the hyperbolic cosine of x in radians.",examples:["cosh(0.5)"],seealso:["sinh","tanh","coth"]}},function(e,t){e.exports={name:"cot",category:"Trigonometry",syntax:["cot(x)"],description:"Compute the cotangent of x in radians. Defined as 1/tan(x)",examples:["cot(2)","1 / tan(2)"],seealso:["sec","csc","tan"]}},function(e,t){e.exports={name:"coth",category:"Trigonometry",syntax:["coth(x)"],description:"Compute the hyperbolic cotangent of x in radians.",examples:["coth(2)","1 / tanh(2)"],seealso:["sech","csch","tanh"]}},function(e,t){e.exports={name:"csc",category:"Trigonometry",syntax:["csc(x)"],description:"Compute the cosecant of x in radians. Defined as 1/sin(x)",examples:["csc(2)","1 / sin(2)"],seealso:["sec","cot","sin"]}},function(e,t){e.exports={name:"csch",category:"Trigonometry",syntax:["csch(x)"],description:"Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",examples:["csch(2)","1 / sinh(2)"],seealso:["sech","coth","sinh"]}},function(e,t){e.exports={name:"sec",category:"Trigonometry",syntax:["sec(x)"],description:"Compute the secant of x in radians. Defined as 1/cos(x)",examples:["sec(2)","1 / cos(2)"],seealso:["cot","csc","cos"]}},function(e,t){e.exports={name:"sech",category:"Trigonometry",syntax:["sech(x)"],description:"Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",examples:["sech(2)","1 / cosh(2)"],seealso:["coth","csch","cosh"]}},function(e,t){e.exports={name:"sin",category:"Trigonometry",syntax:["sin(x)"],description:"Compute the sine of x in radians.",examples:["sin(2)","sin(pi / 4) ^ 2","sin(90 deg)","sin(30 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["asin","cos","tan"]}},function(e,t){e.exports={name:"sinh",category:"Trigonometry",syntax:["sinh(x)"],description:"Compute the hyperbolic sine of x in radians.",examples:["sinh(0.5)"],seealso:["cosh","tanh"]}},function(e,t){e.exports={name:"tan",category:"Trigonometry",syntax:["tan(x)"],description:"Compute the tangent of x in radians.",examples:["tan(0.5)","sin(0.5) / cos(0.5)","tan(pi / 4)","tan(45 deg)"],seealso:["atan","sin","cos"]}},function(e,t){e.exports={name:"tanh",category:"Trigonometry",syntax:["tanh(x)"],description:"Compute the hyperbolic tangent of x in radians.",examples:["tanh(0.5)","sinh(0.5) / cosh(0.5)"],seealso:["sinh","cosh"]}},function(e,t){e.exports={name:"to",category:"Units",syntax:["x to unit","to(x, unit)"],description:"Change the unit of a value.",examples:["5 inch to cm","3.2kg to g","16 bytes in bits"],seealso:[]}},function(e,t){e.exports={name:"clone",category:"Utils",syntax:["clone(x)"],description:"Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",examples:["clone(3.5)","clone(2 - 4i)","clone(45 deg)","clone([1, 2; 3, 4])",'clone("hello world")'],seealso:[]}},function(e,t){e.exports={name:"format",category:"Utils",syntax:["format(value)","format(value, precision)"],description:"Format a value of any type as string.",examples:["format(2.3)","format(3 - 4i)","format([])","format(pi, 3)"],seealso:["print"]}},function(e,t){e.exports={name:"isInteger",category:"Utils",syntax:["isInteger(x)"],description:"Test whether a value is an integer number.",examples:["isInteger(2)","isInteger(3.5)","isInteger([3, 0.5, -2])"],seealso:["isNegative","isNumeric","isPositive","isZero"]}},function(e,t){e.exports={name:"isNegative",category:"Utils",syntax:["isNegative(x)"],description:"Test whether a value is negative: smaller than zero.",examples:["isNegative(2)","isNegative(0)","isNegative(-4)","isNegative([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isPositive","isZero"]}},function(e,t){e.exports={name:"isNumeric",category:"Utils",syntax:["isNumeric(x)"],description:"Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",examples:["isNumeric(2)","isNumeric(0)","isNumeric(bignumber(500))","isNumeric(fraction(0.125))",'isNumeric("3")',"isNumeric(2 + 3i)",'isNumeric([2.3, "foo", false])'],seealso:["isInteger","isZero","isNegative","isPositive"]}},function(e,t){e.exports={name:"isPositive",category:"Utils",syntax:["isPositive(x)"],description:"Test whether a value is positive: larger than zero.",examples:["isPositive(2)","isPositive(0)","isPositive(-4)","isPositive([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isNegative","isZero"]}},function(e,t){e.exports={name:"isZero",category:"Utils",syntax:["isZero(x)"],description:"Test whether a value is zero.",examples:["isZero(2)","isZero(0)","isZero(-4)","isZero([3, 0, -2, 0])"],seealso:["isInteger","isNumeric","isNegative","isPositive"]}},function(e,t){e.exports={name:"typeof",category:"Utils",syntax:["typeof(x)"],description:"Get the type of a variable.",examples:["typeof(3.5)","typeof(2 - 4i)","typeof(45 deg)",'typeof("hello world")'],seealso:[]}},function(e,t,r){e.exports=[r(269),r(292),r(293),r(294),r(295)]},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(270));return a("compile",{string:function(e){return o(e).compile()},"Array | Matrix":function(e){return i(e,function(e){return o(e).compile()})}})}var i=r(19);t.name="compile",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){if(1!=arguments.length&&2!=arguments.length)throw new i("parse",arguments.length,1,2);if(de=r&&r.nodes?r.nodes:{},"string"==typeof t)return ge=t,x();if(Array.isArray(t)||t instanceof e.Matrix)return a(t,function(e){if("string"!=typeof e)throw new TypeError("String expected");return ge=e,x()});throw new TypeError("String or matrix expected")}function u(){ve=0,ye=ge.charAt(0),we=0,Ne=null}function c(){ve++,ye=ge.charAt(ve)}function f(){return ge.charAt(ve+1)}function l(){return ge.charAt(ve+2)}function p(){for(be=pe.NULL,xe="";" "==ye||"	"==ye||"\n"==ye&&we;)c();if("#"==ye)for(;"\n"!=ye&&""!=ye;)c();if(""==ye)return void(be=pe.DELIMITER);if("\n"==ye&&!we)return be=pe.DELIMITER,xe=ye,void c();var e=ye+f(),t=e+l();if(3==t.length&&he[t])return be=pe.DELIMITER,xe=t,c(),c(),void c();if(2==e.length&&he[e])return be=pe.DELIMITER,xe=e,c(),void c();if(he[ye])return be=pe.DELIMITER,xe=ye,void c();if(!v(ye)){if(g()){for(;g()||y(ye);)xe+=ye,c();return void(be=me.hasOwnProperty(xe)?pe.DELIMITER:pe.SYMBOL)}for(be=pe.UNKNOWN;""!=ye;)xe+=ye,c();throw X('Syntax error in part "'+xe+'"')}if(be=pe.NUMBER,"."==ye)xe+=ye,c(),y(ye)||(be=pe.UNKNOWN);else{for(;y(ye);)xe+=ye,c();"."==ye&&(xe+=ye,c())}for(;y(ye);)xe+=ye,c();if(e=f(),"E"==ye||"e"==ye)if(y(e)||"-"==e||"+"==e){if(xe+=ye,c(),"+"!=ye&&"-"!=ye||(xe+=ye,c()),!y(ye))throw X('Digit expected, got "'+ye+'"');for(;y(ye);)xe+=ye,c();if("."==ye)throw X('Digit expected, got "'+ye+'"')}else if("."==e)throw c(),X('Digit expected, got "'+ye+'"')}function h(){do p();while("\n"==xe)}function m(){we++}function d(){we--}function g(){var e=ge.charAt(ve-1),t=ge.charAt(ve+1),r=function(e){return/^[a-zA-Z_\u00C0-\u02AF\u0370-\u03FF]$/.test(e)},n=function(e,t){return/^[\uD835]$/.test(e)&&/^[\uDC00-\uDFFF]$/.test(t)&&/^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t)};return r(ye)||n(ye,t)||n(e,ye)}function v(e){return e>="0"&&"9">=e||"."==e}function y(e){return e>="0"&&"9">=e}function x(){u(),p();var e=b();if(""!=xe)throw be==pe.DELIMITER?J("Unexpected operator "+xe):X('Unexpected part "'+xe+'"');return e}function b(){var e,t,r=[];if(""==xe)return new ne("undefined","undefined");for("\n"!=xe&&";"!=xe&&(e=w());"\n"==xe||";"==xe;)0==r.length&&e&&(t=";"!=xe,r.push({node:e,visible:t})),p(),"\n"!=xe&&";"!=xe&&""!=xe&&(e=w(),t=";"!=xe,r.push({node:e,visible:t}));return r.length>0?new te(r):e}function w(){var e,t,r,n,i=N();if("="==xe){if(i&&i.isSymbolNode)return e=i.name,h(),r=w(),new ee(new le(e),r);if(i&&i.isAccessorNode)return h(),r=w(),new ee(i.object,i.index,r);if(i&&i.isFunctionNode&&(n=!0,t=[],e=i.name,i.args.forEach(function(e,r){e&&e.isSymbolNode?t[r]=e.name:n=!1}),n))return h(),r=w(),new ie(e,t,r);throw X("Invalid left hand side of assignment operator =")}return i}function N(){for(var e=E();"?"==xe;){var t=Ne;Ne=we,h();var r=e,n=w();if(":"!=xe)throw X("False part of conditional expression expected");Ne=null,h();var i=w();e=new re(r,n,i),Ne=t}return e}function E(){for(var e=M();"or"==xe;)h(),e=new se("or","or",[e,M()]);return e}function M(){for(var e=A();"xor"==xe;)h(),e=new se("xor","xor",[e,A()]);return e}function A(){for(var e=_();"and"==xe;)h(),e=new se("and","and",[e,_()]);return e}function _(){for(var e=O();"|"==xe;)h(),e=new se("|","bitOr",[e,O()]);return e}function O(){for(var e=T();"^|"==xe;)h(),e=new se("^|","bitXor",[e,T()]);return e}function T(){for(var e=C();"&"==xe;)h(),e=new se("&","bitAnd",[e,C()]);return e}function C(){var e,t,r,n,i;for(e=S(),t={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};xe in t;)r=xe,n=t[r],h(),i=[e,S()],e=new se(r,n,i);return e}function S(){var e,t,r,n,i;for(e=z(),t={"<<":"leftShift",">>":"rightArithShift",">>>":"rightLogShift"};xe in t;)r=xe,n=t[r],h(),i=[e,z()],e=new se(r,n,i);return e}function z(){var e,t,r,n,i;for(e=B(),t={to:"to","in":"to"};xe in t;)r=xe,n=t[r],h(),"in"===r&&""===xe?e=new se("*","multiply",[e,new le("in")],!0):(i=[e,B()],e=new se(r,n,i));return e}function B(){var e,t=[];if(e=":"==xe?new ne("1","number"):k(),":"==xe&&Ne!==we){for(t.push(e);":"==xe&&t.length<3;)h(),")"==xe||"]"==xe||","==xe||""==xe?t.push(new le("end")):t.push(k());e=3==t.length?new fe(t[0],t[2],t[1]):new fe(t[0],t[1])}return e}function k(){var e,t,r,n,i;for(e=I(),t={"+":"add","-":"subtract"};xe in t;)r=xe,n=t[r],h(),i=[e,I()],e=new se(r,n,i);return e}function I(){var e,t,r,n,i;for(e=R(),t=e,r={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide","%":"mod",mod:"mod"};;)if(xe in r)n=xe,i=r[n],h(),t=R(),e=new se(n,i,[e,t]);else{if(!(be==pe.SYMBOL||"in"==xe&&e&&e.isConstantNode||be==pe.NUMBER&&!t.isConstantNode||"("==xe))break;t=R(),e=new se("*","multiply",[e,t],!0)}return e}function R(){var e,t,r={"-":"unaryMinus","+":"unaryPlus","~":"bitNot",not:"not"}[xe];return r?(e=xe,h(),t=[R()],new se(e,r,t)):P()}function P(){var e,t,r,n;return e=U(),"^"!=xe&&".^"!=xe||(t=xe,r="^"==t?"pow":"dotPow",h(),n=[e,R()],e=new se(t,r,n)),e}function U(){var e,t,r,n,i;for(e=q(),t={"!":"factorial","'":"transpose"};xe in t;)r=xe,n=t[r],p(),i=[e],e=new se(r,n,i),e=j(e);return e}function q(){var e,t=[];if(be==pe.SYMBOL&&de[xe]){if(e=de[xe],p(),"("==xe){if(t=[],m(),p(),")"!=xe)for(t.push(w());","==xe;)p(),t.push(w());if(")"!=xe)throw X("Parenthesis ) expected");d(),p()}return new e(t)}return L()}function L(){var e,t;return be==pe.SYMBOL||be==pe.DELIMITER&&xe in me?(t=xe,p(),e=new le(t),e=j(e)):F()}function j(e,t){for(var r;!("("!=xe&&"["!=xe&&"."!=xe||t&&-1===t.indexOf(xe));)if(r=[],"("==xe){if(!e.isSymbolNode&&!e.isAccessorNode)return e;if(m(),p(),")"!=xe)for(r.push(w());","==xe;)p(),r.push(w());if(")"!=xe)throw X("Parenthesis ) expected");d(),p(),e=new ce(e,r)}else if("["==xe){if(m(),p(),"]"!=xe)for(r.push(w());","==xe;)p(),r.push(w());if("]"!=xe)throw X("Parenthesis ] expected");d(),p(),e=new Q(e,new ae(r))}else{if(p(),be!=pe.SYMBOL)throw X("Property name expected after dot");r.push(new ne(xe)),p();var n=!0;e=new Q(e,new ae(r,n))}return e}function F(){var e,t;return'"'==xe?(t=D(),e=new ne(t,"string"),e=j(e)):$()}function D(){for(var e="";""!=ye&&'"'!=ye;)"\\"==ye&&(e+=ye,c()),e+=ye,c();if(p(),'"'!=xe)throw X('End of string " expected');return p(),e}function $(){var e,t,r,n;if("["==xe){if(m(),p(),"]"!=xe){var i=G();if(";"==xe){for(r=1,t=[i];";"==xe;)p(),t[r]=G(),r++;if("]"!=xe)throw X("End of matrix ] expected");d(),p(),n=t[0].items.length;for(var a=1;r>a;a++)if(t[a].items.length!=n)throw J("Column dimensions mismatch ("+t[a].items.length+" != "+n+")");e=new K(t)}else{if("]"!=xe)throw X("End of matrix ] expected");d(),p(),e=i}}else d(),p(),e=new K([]);return j(e)}return H()}function G(){for(var e=[w()],t=1;","==xe;)p(),e[t]=w(),t++;return new K(e)}function H(){if("{"==xe){var e,t={};do if(p(),"}"!=xe){if('"'==xe)e=D();else{if(be!=pe.SYMBOL)throw X("Symbol or string expected as object key");e=xe,p()}if(":"!=xe)throw X("Colon : expected after object key");p(),t[e]=w()}while(","==xe);if("}"!=xe)throw X("Comma , or bracket } expected after object value");p();var r=new oe(t);return r=j(r)}return V()}function V(){var e;return be==pe.NUMBER?(e=xe,p(),new ne(e,"number")):Z()}function Z(){var e;if("("==xe){if(m(),p(),e=w(),")"!=xe)throw X("Parenthesis ) expected");return d(),p(),e=new ue(e),e=j(e)}return W()}function W(){throw X(""==xe?"Unexpected end of expression":"Value expected")}function Y(){return ve-xe.length+1}function X(e){var t=Y(),r=new SyntaxError(e+" (char "+t+")");return r["char"]=t,r}function J(e){var t=Y(),r=new SyntaxError(e+" (char "+t+")");return r["char"]=t,r}var Q=n(r(271)),K=n(r(277)),ee=n(r(278)),te=n(r(281)),re=n(r(282)),ne=n(r(283)),ie=n(r(284)),ae=n(r(285)),oe=n(r(288)),se=n(r(289)),ue=n(r(291)),ce=n(r(290)),fe=n(r(286)),le=n(r(287)),pe={NULL:0,DELIMITER:1,NUMBER:2,SYMBOL:3,UNKNOWN:4},he={",":!0,"(":!0,")":!0,"[":!0,"]":!0,"{":!0,"}":!0,'"':!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"~":!0,"!":!0,"&":!0,"|":!0,"^|":!0,"'":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0,"<<":!0,">>":!0,">>>":!0},me={mod:!0,to:!0,"in":!0,and:!0,xor:!0,or:!0,not:!0},de={},ge="",ve=0,ye="",xe="",be=pe.NULL,we=0,Ne=null;return s}var i=r(11),a=r(19);t.name="parse",t.path="expression",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError('Node expected for parameter "object"');if(!t||!t.isIndexNode)throw new TypeError('IndexNode expected for parameter "index"');this.object=e||null,this.index=t,Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}function o(e){return!(e.isAccessorNode||e.isArrayNode||e.isConstantNode||e.isFunctionNode||e.isObjectNode||e.isParenthesisNode||e.isSymbolNode)}var s=n(r(272)),u=n(r(274));return a.prototype=new s,a.prototype.type="AccessorNode",a.prototype.isAccessorNode=!0,a.prototype._compile=function(e,t){e.access=u;var r=this.object._compile(e,t),n=this.index._compile(e,t);return this.index.isObjectProperty()?r+'["'+this.index.getObjectProperty()+'"]':this.index.needsSize()?"(function () {  var object = "+r+";  var size = math.size(object).valueOf();  return access(object, "+n+");})()":"access("+r+", "+n+")"},a.prototype.forEach=function(e){e(this.object,"object",this),e(this.index,"index",this)},a.prototype.map=function(e){return new a(this._ifNode(e(this.object,"object",this)),this._ifNode(e(this.index,"index",this)))},a.prototype.clone=function(){return new a(this.object,this.index)},a.prototype._toString=function(e){var t=this.object.toString(e);return o(this.object)&&(t="("+t+")"),t+this.index.toString(e)},a.prototype._toTex=function(e){var t=this.object.toTex(e);return o(this.object)&&(t="\\left("+t+"\\right)"),t+this.index.toTex(e)},a}t.name="AccessorNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n,a){function o(){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator")}function s(e){for(var t in e)if(e.hasOwnProperty(t)&&t in i)throw new Error('Scope contains an illegal symbol, "'+t+'" is a reserved keyword')}return o.prototype.eval=function(e){return this.compile().eval(e)},o.prototype.type="Node",o.prototype.isNode=!0,o.prototype.compile=function(){if(arguments.length>0)throw new Error("Calling compile(math) is deprecated. Call the function as compile() instead.");var e={math:a.expression.transform,args:{},_validateScope:s},t={},r=this._compile(e,t),n=Object.keys(e).map(function(e){return"    var "+e+' = defs["'+e+'"];'}),i=n.join(" ")+'return {  "eval": function (scope) {    if (scope) _validateScope(scope);    scope = scope || {};    return '+r+";  }};",o=new Function("defs",i);return o(e)},o.prototype._compile=function(e,t){throw new Error("Cannot compile a Node interface")},o.prototype.forEach=function(e){throw new Error("Cannot run forEach on a Node interface")},o.prototype.map=function(e){throw new Error("Cannot run map on a Node interface")},o.prototype._ifNode=function(e){if(!e||!e.isNode)throw new TypeError("Callback function must return a Node");return e},o.prototype.traverse=function(e){function t(e,r){e.forEach(function(e,n,i){r(e,n,i),t(e,r)})}e(this,null,null),t(this,e)},o.prototype.transform=function(e){function t(e,r){return e.map(function(e,n,i){var a=r(e,n,i);return t(a,r)})}var r=e(this,null,null);return t(r,e)},o.prototype.filter=function(e){var t=[];return this.traverse(function(r,n,i){e(r,n,i)&&t.push(r)}),t},o.prototype.find=function(){throw new Error("Function Node.find is deprecated. Use Node.filter instead.")},o.prototype.match=function(){throw new Error("Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.")},o.prototype.clone=function(){throw new Error("Cannot clone a Node interface")},o.prototype.toString=function(e){var t;if(e&&"object"==typeof e)switch(typeof e.handler){case"object":case"undefined":break;case"function":t=e.handler(this,e);break;default:throw new TypeError("Object or function expected as callback")}return"undefined"!=typeof t?t:this._toString(e)},o.prototype._toString=function(){throw new Error("_toString not implemented for "+this.type)},o.prototype.toTex=function(e){var t;if(e&&"object"==typeof e)switch(typeof e.handler){case"object":case"undefined":break;case"function":t=e.handler(this,e);break;default:throw new TypeError("Object or function expected as callback")}return"undefined"!=typeof t?t:this._toTex(e)},o.prototype._toTex=function(e){throw new Error("_toTex not implemented for "+this.type)},o.prototype.getIdentifier=function(){return this.type},o.prototype.getContent=function(){return this},o}var i=r(273);r(3).extend;t.name="Node",t.path="expression.node",t.math=!0,t.factory=n},function(e,t){"use strict";e.exports={end:!0}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276)),s=n(r(52));return function(e,t){try{if(Array.isArray(e))return s(e).subset(t).valueOf();if(e&&"function"==typeof e.subset)return e.subset(t);if("string"==typeof e)return o(e,t);if("object"==typeof e){if(!t.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()]}throw new TypeError("Cannot apply index: unsupported type of object")}catch(r){throw i(r)}}}var i=r(275).transform;t.factory=n},function(e,t,r){var n=r(43);t.transform=function(e){return e&&e.isIndexError?new n(e.index+1,e.min+1,void 0!==e.max?e.max+1:void 0):e}},function(e,t,r){"use strict";function n(e,t,n,c){function f(e,t){if(!t||t.isIndex!==!0)throw new TypeError("Index expected");if(1!=t.size().length)throw new u(t.size().length,1);var r=e.length;s(t.min()[0],r),s(t.max()[0],r);var n=t.dimension(0),i="";return n.forEach(function(t){i+=e.charAt(t)}),i}function l(e,t,r,n){if(!t||t.isIndex!==!0)throw new TypeError("Index expected");if(1!=t.size().length)throw new u(t.size().length,1);if(void 0!==n){if("string"!=typeof n||1!==n.length)throw new TypeError("Single character expected as defaultValue")}else n=" ";var i=t.dimension(0),a=i.size()[0];if(a!=r.length)throw new u(i.size()[0],r.length);var o=e.length;s(t.min()[0]),s(t.max()[0]);for(var c=[],f=0;o>f;f++)c[f]=e.charAt(f);if(i.forEach(function(e,t){c[e]=r.charAt(t[0])}),c.length>o)for(f=o-1,a=c.length;a>f;f++)c[f]||(c[f]=n);return c.join("")}var p=n(r(52)),h=c("subset",{"Array, Index":function(e,t){var r=p(e),n=r.subset(t);return n&&n.valueOf()},"Matrix, Index":function(e,t){return e.subset(t)},"Object, Index":i,"string, Index":f,"Array, Index, any":function(e,t,r){return p(o(e)).subset(t,r,void 0).valueOf()},"Array, Index, any, any":function(e,t,r,n){return p(o(e)).subset(t,r,n).valueOf()},"Matrix, Index, any":function(e,t,r){return e.clone().subset(t,r)},"Matrix, Index, any, any":function(e,t,r,n){return e.clone().subset(t,r,n)},"string, Index, string":l,"string, Index, string, string":l,"Object, Index, any":a});return h.toTex=void 0,h}function i(e,t){if(1!==t.size().length)throw new u(t.size(),1);var r=t.dimension(0);if("string"!=typeof r)throw new TypeError("String expected as index to retrieve an object property");return e[r]}function a(e,t,r){if(1!==t.size().length)throw new u(t.size(),1);var n=t.dimension(0);if("string"!=typeof n)throw new TypeError("String expected as index to retrieve an object property");var i=o(e);return i[n]=r,i}var o=r(3).clone,s=r(40).validateIndex,u=r(42);t.name="subset",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.items=e||[],!Array.isArray(this.items)||!this.items.every(function(e){return e&&e.isNode}))throw new TypeError("Array containing Nodes expected");var t=function(){throw new Error("Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead")};Object.defineProperty(this,"nodes",{get:t,set:t})}var o=n(r(272));return a.prototype=new o,a.prototype.type="ArrayNode",a.prototype.isArrayNode=!0,a.prototype._compile=function(e,t){var r="Array"!==e.math.config().matrix,n=this.items.map(function(r){return r._compile(e,t)});return(r?"math.matrix([":"[")+n.join(",")+(r?"])":"]")},a.prototype.forEach=function(e){for(var t=0;t<this.items.length;t++){var r=this.items[t];e(r,"items["+t+"]",this)}},a.prototype.map=function(e){for(var t=[],r=0;r<this.items.length;r++)t[r]=this._ifNode(e(this.items[r],"items["+r+"]",this));return new a(t)},a.prototype.clone=function(){return new a(this.items.slice(0))},a.prototype._toString=function(e){var t=this.items.map(function(t){return t.toString(e)});return"["+t.join(", ")+"]"},a.prototype._toTex=function(e){var t="\\begin{bmatrix}";return this.items.forEach(function(r){t+=r.items?r.items.map(function(t){return t.toTex(e)}).join("&"):r.toTex(e),t+="\\\\"}),t+="\\end{bmatrix}"},a}t.name="ArrayNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t,r){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.object=e,this.index=r?t:null,this.value=r?r:t,!e||!e.isSymbolNode&&!e.isAccessorNode)throw new TypeError('SymbolNode or AccessorNode expected as "object"');if(e&&e.isSymbolNode&&"end"===e.name)throw new Error('Cannot assign to symbol "end"');if(this.index&&!this.index.isIndexNode)throw new TypeError('IndexNode expected as "index"');if(!this.value||!this.value.isNode)throw new TypeError('Node expected as "value"');Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}function o(e,t){t||(t="keep");var r=f.getPrecedence(e,t),n=f.getPrecedence(e.value,t);return"all"===t||null!==n&&r>=n}var s=n(r(272)),u=(n(r(277)),n(r(52)),n(r(279))),c=n(r(274)),f=(r(273),r(280));return a.prototype=new s,a.prototype.type="AssignmentNode",a.prototype.isAssignmentNode=!0,a.prototype._compile=function(e,t){e.assign=u,e.access=c;var r,n=this.object._compile(e,t),i=this.index?this.index._compile(e,t):null,a=this.value._compile(e,t);if(this.index){if(this.index.isObjectProperty())return n+'["'+this.index.getObjectProperty()+'"] = '+a;if(this.object.isSymbolNode)return r=this.index.needsSize()?"var size = math.size(object).valueOf();":"","(function () {  var object = "+n+";  var value = "+a+";  "+r+'  scope["'+this.object.name+'"] = assign(object, '+i+", value);  return value;})()";r=this.index.needsSize()?"var size = math.size(object).valueOf();":"";var o=this.object.object._compile(e,t);if(this.object.index.isObjectProperty()){var s='["'+this.object.index.getObjectProperty()+'"]';return"(function () {  var parent = "+o+";  var object = parent"+s+";  var value = "+a+";"+r+"  parent"+s+" = assign(object, "+i+", value);  return value;})()"}var f=this.object.index.needsSize()?"var size = math.size(parent).valueOf();":"",l=this.object.index._compile(e,t);return"(function () {  var parent = "+o+";  "+f+"  var parentIndex = "+l+";  var object = access(parent, parentIndex);  var value = "+a+";  "+r+"  assign(parent, parentIndex, assign(object, "+i+", value));  return value;})()"}if(!this.object.isSymbolNode)throw new TypeError("SymbolNode expected as object");return'scope["'+this.object.name+'"] = '+a},a.prototype.forEach=function(e){e(this.object,"object",this),this.index&&e(this.index,"index",this),e(this.value,"value",this)},a.prototype.map=function(e){var t=this._ifNode(e(this.object,"object",this)),r=this.index?this._ifNode(e(this.index,"index",this)):null,n=this._ifNode(e(this.value,"value",this));return new a(t,r,n)},a.prototype.clone=function(){return new a(this.object,this.index,this.value)},a.prototype._toString=function(e){var t=this.object.toString(e),r=this.index?this.index.toString(e):"",n=this.value.toString(e);return o(this,e&&e.parenthesis)&&(n="("+n+")"),t+r+" = "+n},a.prototype._toTex=function(e){var t=this.object.toTex(e),r=this.index?this.index.toTex(e):"",n=this.value.toTex(e);return o(this,e&&e.parenthesis)&&(n="\\left("+n+"\\right)"),t+r+":="+n},a}r(32);t.name="AssignmentNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276)),s=n(r(52));return function(e,t,r){try{if(Array.isArray(e))return s(e).subset(t,r).valueOf();if(e&&"function"==typeof e.subset)return e.subset(t,r);if("string"==typeof e)return o(e,t,r);if("object"==typeof e){if(!t.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()]=r,e}throw new TypeError("Cannot apply index: unsupported type of object")}catch(n){throw i(n)}}}var i=r(275).transform;t.factory=n},function(e,t){"use strict";function r(e,t){var r=e;"keep"!==t&&(r=e.getContent());for(var n=r.getIdentifier(),i=0;i<a.length;i++)if(n in a[i])return i;return null}function n(e,t){var n=e;"keep"!==t&&(n=e.getContent());var i=n.getIdentifier(),o=r(n,t);if(null===o)return null;var s=a[o][i];if(s.hasOwnProperty("associativity")){if("left"===s.associativity)return"left";if("right"===s.associativity)return"right";throw Error("'"+i+"' has the invalid associativity '"+s.associativity+"'.")}return null}function i(e,t,n){var i=e,o=t;if("keep"!==n)var i=e.getContent(),o=t.getContent();var s=i.getIdentifier(),u=o.getIdentifier(),c=r(i,n);if(null===c)return null;var f=a[c][s];if(f.hasOwnProperty("associativeWith")&&f.associativeWith instanceof Array){for(var l=0;l<f.associativeWith.length;l++)if(f.associativeWith[l]===u)return!0;return!1}return null}var a=[{AssignmentNode:{},FunctionAssignmentNode:{}},{ConditionalNode:{latexLeftParens:!1,latexRightParens:!1,latexParens:!1}},{"OperatorNode:or":{associativity:"left",associativeWith:[]}},{"OperatorNode:xor":{associativity:"left",associativeWith:[]}},{"OperatorNode:and":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitOr":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitXor":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitAnd":{associativity:"left",associativeWith:[]}},{"OperatorNode:equal":{associativity:"left",associativeWith:[]},"OperatorNode:unequal":{associativity:"left",associativeWith:[]},"OperatorNode:smaller":{associativity:"left",associativeWith:[]},"OperatorNode:larger":{associativity:"left",associativeWith:[]},"OperatorNode:smallerEq":{associativity:"left",associativeWith:[]},"OperatorNode:largerEq":{associativity:"left",associativeWith:[]}},{"OperatorNode:leftShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightArithShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightLogShift":{associativity:"left",associativeWith:[]}},{"OperatorNode:to":{associativity:"left",associativeWith:[]}},{RangeNode:{}},{"OperatorNode:add":{associativity:"left",associativeWith:["OperatorNode:add","OperatorNode:subtract"]},"OperatorNode:subtract":{associativity:"left",associativeWith:[]}},{"OperatorNode:multiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","Operator:dotMultiply","Operator:dotDivide"]},"OperatorNode:divide":{associativity:"left",associativeWith:[],latexLeftParens:!1,latexRightParens:!1,latexParens:!1},"OperatorNode:dotMultiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","OperatorNode:dotMultiply","OperatorNode:doDivide"]},"OperatorNode:dotDivide":{associativity:"left",associativeWith:[]},"OperatorNode:mod":{associativity:"left",associativeWith:[]}},{"OperatorNode:unaryPlus":{associativity:"right"},"OperatorNode:unaryMinus":{associativity:"right"},"OperatorNode:bitNot":{associativity:"right"},"OperatorNode:not":{associativity:"right"}},{"OperatorNode:pow":{associativity:"right",associativeWith:[],latexRightParens:!1},"OperatorNode:dotPow":{associativity:"right",associativeWith:[]}},{"OperatorNode:factorial":{associativity:"left"}},{"OperatorNode:transpose":{associativity:"left"}}];e.exports.properties=a,e.exports.getPrecedence=r,e.exports.getAssociativity=n,e.exports.isAssociativeWith=i},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");
if(!Array.isArray(e))throw new Error("Array expected");this.blocks=e.map(function(e){var t=e&&e.node,r=e&&void 0!==e.visible?e.visible:!0;if(!t||!t.isNode)throw new TypeError('Property "node" must be a Node');if("boolean"!=typeof r)throw new TypeError('Property "visible" must be a boolean');return{node:t,visible:r}})}var o=n(r(272)),s=n(r(72));return a.prototype=new o,a.prototype.type="BlockNode",a.prototype.isBlockNode=!0,a.prototype._compile=function(e,t){e.ResultSet=s;var r=this.blocks.map(function(r){var n=r.node._compile(e,t);return r.visible?"results.push("+n+");":n+";"});return"(function () {var results = [];"+r.join("")+"return new ResultSet(results);})()"},a.prototype.forEach=function(e){for(var t=0;t<this.blocks.length;t++)e(this.blocks[t].node,"blocks["+t+"].node",this)},a.prototype.map=function(e){for(var t=[],r=0;r<this.blocks.length;r++){var n=this.blocks[r],i=this._ifNode(e(n.node,"blocks["+r+"].node",this));t[r]={node:i,visible:n.visible}}return new a(t)},a.prototype.clone=function(){var e=this.blocks.map(function(e){return{node:e.node,visible:e.visible}});return new a(e)},a.prototype._toString=function(e){return this.blocks.map(function(t){return t.node.toString(e)+(t.visible?"":";")}).join("\n")},a.prototype._toTex=function(e){return this.blocks.map(function(t){return t.node.toTex(e)+(t.visible?"":";")}).join("\\;\\;\n")},a}t.name="BlockNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError("Parameter condition must be a Node");if(!t||!t.isNode)throw new TypeError("Parameter trueExpr must be a Node");if(!r||!r.isNode)throw new TypeError("Parameter falseExpr must be a Node");this.condition=e,this.trueExpr=t,this.falseExpr=r}var s=n(r(272));return o.prototype=new s,o.prototype.type="ConditionalNode",o.prototype.isConditionalNode=!0,o.prototype._compile=function(e,t){return e.testCondition=function(t){if("number"==typeof t||"boolean"==typeof t||"string"==typeof t)return!!t;if(t){if(t.isBigNumber===!0)return!t.isZero();if(t.isComplex===!0)return!(!t.re&&!t.im);if(t.isUnit===!0)return!!t.value}if(null===t||void 0===t)return!1;throw new TypeError('Unsupported type of condition "'+e.math["typeof"](t)+'"')},"testCondition("+this.condition._compile(e,t)+") ? ( "+this.trueExpr._compile(e,t)+") : ( "+this.falseExpr._compile(e,t)+")"},o.prototype.forEach=function(e){e(this.condition,"condition",this),e(this.trueExpr,"trueExpr",this),e(this.falseExpr,"falseExpr",this)},o.prototype.map=function(e){return new o(this._ifNode(e(this.condition,"condition",this)),this._ifNode(e(this.trueExpr,"trueExpr",this)),this._ifNode(e(this.falseExpr,"falseExpr",this)))},o.prototype.clone=function(){return new o(this.condition,this.trueExpr,this.falseExpr)},o.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=i.getPrecedence(this,t),n=this.condition.toString(e),a=i.getPrecedence(this.condition,t);("all"===t||"OperatorNode"===this.condition.type||null!==a&&r>=a)&&(n="("+n+")");var o=this.trueExpr.toString(e),s=i.getPrecedence(this.trueExpr,t);("all"===t||"OperatorNode"===this.trueExpr.type||null!==s&&r>=s)&&(o="("+o+")");var u=this.falseExpr.toString(e),c=i.getPrecedence(this.falseExpr,t);return("all"===t||"OperatorNode"===this.falseExpr.type||null!==c&&r>=c)&&(u="("+u+")"),n+" ? "+o+" : "+u},o.prototype._toTex=function(e){return"\\begin{cases} {"+this.trueExpr.toTex(e)+"}, &\\quad{\\text{if }\\;"+this.condition.toTex(e)+"}\\\\{"+this.falseExpr.toTex(e)+"}, &\\quad{\\text{otherwise}}\\end{cases}"},o}var i=(r(32),r(280));t.name="ConditionalNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(t){if("string"!=typeof t)throw new TypeError('String expected for parameter "valueType"');if("string"!=typeof e)throw new TypeError('String expected for parameter "value"');this.value=e,this.valueType=t}else this.value=e+"",this.valueType=i(e);if(!u[this.valueType])throw new TypeError('Unsupported type of value "'+this.valueType+'"')}var s=n(r(272)),u={number:!0,string:!0,"boolean":!0,undefined:!0,"null":!0};return o.prototype=new s,o.prototype.type="ConstantNode",o.prototype.isConstantNode=!0,o.prototype._compile=function(e,t){switch(this.valueType){case"number":var r=e.math.config().number;return"BigNumber"===r?'math.bignumber("'+this.value+'")':"Fraction"===r?'math.fraction("'+this.value+'")':this.value.replace(/^(0*)[0-9]/,function(e,t){return e.substring(t.length)});case"string":return'"'+this.value+'"';case"boolean":return this.value;case"undefined":return this.value;case"null":return this.value;default:throw new TypeError('Unsupported type of constant "'+this.valueType+'"')}},o.prototype.forEach=function(e){},o.prototype.map=function(e){return this.clone()},o.prototype.clone=function(){return new o(this.value,this.valueType)},o.prototype._toString=function(e){switch(this.valueType){case"string":return'"'+this.value+'"';default:return this.value}},o.prototype._toTex=function(e){var t,r=this.value;switch(this.valueType){case"string":return'\\mathtt{"'+r+'"}';case"number":return t=r.toLowerCase().indexOf("e"),-1!==t?r.substring(0,t)+"\\cdot10^{"+r.substring(t+1)+"}":r;default:return r}},o}var i=r(41).type;t.name="ConstantNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e){return"string"==typeof e}function i(e,t,i,u){function c(e,t,r){if(!(this instanceof c))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('String expected for parameter "name"');if(!Array.isArray(t)||!t.every(n))throw new TypeError('Array containing strings expected for parameter "params"');if(!r||!r.isNode)throw new TypeError('Node expected for parameter "expr"');if(e in a)throw new Error('Illegal function name, "'+e+'" is a reserved keyword');this.name=e,this.params=t,this.expr=r}function f(e,t){var r=s.getPrecedence(e,t),n=s.getPrecedence(e.expr,t);return"all"===t||null!==n&&r>=n}var l=i(r(272));return c.prototype=new l,c.prototype.type="FunctionAssignmentNode",c.prototype.isFunctionAssignmentNode=!0,c.prototype._compile=function(e,t){var r=Object.create(t);this.params.forEach(function(e){r[e]=!0});var n=this.expr._compile(e,r);return'scope["'+this.name+'"] =   (function () {    var fn = function '+this.name+"("+this.params.join(",")+") {      if (arguments.length != "+this.params.length+') {        throw new SyntaxError("Wrong number of arguments in function '+this.name+' (" + arguments.length + " provided, '+this.params.length+' expected)");      }      return '+n+'    };    fn.syntax = "'+this.name+"("+this.params.join(", ")+')";    return fn;  })()'},c.prototype.forEach=function(e){e(this.expr,"expr",this)},c.prototype.map=function(e){var t=this._ifNode(e(this.expr,"expr",this));return new c(this.name,this.params.slice(0),t)},c.prototype.clone=function(){return new c(this.name,this.params.slice(0),this.expr)},c.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=this.expr.toString(e);return f(this,t)&&(r="("+r+")"),"function "+this.name+"("+this.params.join(", ")+") = "+r},c.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=this.expr.toTex(e);return f(this,t)&&(r="\\left("+r+"\\right)"),"\\mathrm{"+this.name+"}\\left("+this.params.map(o.toSymbol).join(",")+"\\right):="+r},c}var a=r(273),o=r(32),s=r(280);t.name="FunctionAssignmentNode",t.path="expression.node",t.factory=i},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.dimensions=e,this.dotNotation=t||!1,!u(e)||!e.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if(this.dotNotation&&!this.isObjectProperty())throw new Error("dotNotation only applicable for object properties");var r=function(){throw new Error("Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead")};Object.defineProperty(this,"object",{get:r,set:r})}var o=n(r(272)),s=(n(r(286)),n(r(287)),n(r(67))),u=Array.isArray;return a.prototype=new o,a.prototype.type="IndexNode",a.prototype.isIndexNode=!0,a.prototype._compile=function(e,t){var r=Object.create(t);e.range=function(e,t,r){return new s(e&&e.isBigNumber===!0?e.toNumber():e,t&&t.isBigNumber===!0?t.toNumber():t,r&&r.isBigNumber===!0?r.toNumber():r)};var n=this.dimensions.map(function(t,n){return t&&t.isRangeNode?t.needsEnd()?(r.end=!0,"(function () {var end = size["+n+"]; return range("+t.start._compile(e,r)+", "+t.end._compile(e,r)+", "+(t.step?t.step._compile(e,r):"1")+"); })()"):"range("+t.start._compile(e,r)+", "+t.end._compile(e,r)+", "+(t.step?t.step._compile(e,r):"1")+")":t.isSymbolNode&&"end"===t.name?(r.end=!0,"(function () {var end = size["+n+"]; return "+t._compile(e,r)+"; })()"):t._compile(e,r)});return"math.index("+n.join(", ")+")"},a.prototype.forEach=function(e){for(var t=0;t<this.dimensions.length;t++)e(this.dimensions[t],"dimensions["+t+"]",this)},a.prototype.map=function(e){for(var t=[],r=0;r<this.dimensions.length;r++)t[r]=this._ifNode(e(this.dimensions[r],"dimensions["+r+"]",this));return new a(t)},a.prototype.clone=function(){return new a(this.dimensions.slice(0))},a.prototype.isObjectProperty=function(){return 1===this.dimensions.length&&this.dimensions[0].isConstantNode&&"string"===this.dimensions[0].valueType},a.prototype.getObjectProperty=function(){return this.isObjectProperty()?this.dimensions[0].value:null},a.prototype._toString=function(e){return this.dotNotation?"."+this.getObjectProperty():"["+this.dimensions.join(", ")+"]"},a.prototype._toTex=function(e){var t=this.dimensions.map(function(t){return t.toTex(e)});return this.dotNotation?"."+this.getObjectProperty():"_{"+t.join(",")+"}"},a.prototype.needsSize=function(){return this.dimensions.some(function(e){return e.isRangeNode&&e.needsEnd()||e.isSymbolNode&&"end"===e.name})},a}t.name="IndexNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){if(!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError("Node expected");if(!t||!t.isNode)throw new TypeError("Node expected");if(r&&(!r||!r.isNode))throw new TypeError("Node expected");if(arguments.length>3)throw new Error("Too many arguments");this.start=e,this.end=t,this.step=r||null}function s(e,t){var r=i.getPrecedence(e,t),n={},a=i.getPrecedence(e.start,t);if(n.start=null!==a&&r>=a||"all"===t,e.step){var o=i.getPrecedence(e.step,t);n.step=null!==o&&r>=o||"all"===t}var s=i.getPrecedence(e.end,t);return n.end=null!==s&&r>=s||"all"===t,n}var u=n(r(272));return o.prototype=new u,o.prototype.type="RangeNode",o.prototype.isRangeNode=!0,o.prototype.needsEnd=function(){var e=this.filter(function(e){return e&&e.isSymbolNode&&"end"==e.name});return e.length>0},o.prototype._compile=function(e,t){return"math.range("+this.start._compile(e,t)+", "+this.end._compile(e,t)+(this.step?", "+this.step._compile(e,t):"")+")"},o.prototype.forEach=function(e){e(this.start,"start",this),e(this.end,"end",this),this.step&&e(this.step,"step",this)},o.prototype.map=function(e){return new o(this._ifNode(e(this.start,"start",this)),this._ifNode(e(this.end,"end",this)),this.step&&this._ifNode(e(this.step,"step",this)))},o.prototype.clone=function(){return new o(this.start,this.end,this.step&&this.step)},o.prototype._toString=function(e){var t,r=e&&e.parenthesis?e.parenthesis:"keep",n=s(this,r),i=this.start.toString(e);if(n.start&&(i="("+i+")"),t=i,this.step){var a=this.step.toString(e);n.step&&(a="("+a+")"),t+=":"+a}var o=this.end.toString(e);return n.end&&(o="("+o+")"),t+=":"+o},o.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=s(this,t),n=this.start.toTex(e);if(r.start&&(n="\\left("+n+"\\right)"),this.step){var i=this.step.toTex(e);r.step&&(i="\\left("+i+"\\right)"),n+=":"+i}var a=this.end.toTex(e);return r.end&&(a="\\left("+a+"\\right)"),n+=":"+a},o}var i=r(280);t.name="RangeNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('String expected for parameter "name"');this.name=e}function u(e){throw new Error("Undefined symbol "+e)}var c=n(r(272)),f=n(r(75));return s.prototype=new c,s.prototype.type="SymbolNode",s.prototype.isSymbolNode=!0,s.prototype._compile=function(e,t){return e.undef=u,e.Unit=f,t[this.name]?this.name:this.name in e.math?'("'+this.name+'" in scope ? scope["'+this.name+'"] : math["'+this.name+'"])':'("'+this.name+'" in scope ? scope["'+this.name+'"] : '+(f.isValuelessUnit(this.name)?'new Unit(null, "'+this.name+'")':'undef("'+this.name+'")')+")"},s.prototype.forEach=function(e){},s.prototype.map=function(e){return this.clone()},s.prototype.clone=function(){return new s(this.name)},s.prototype._toString=function(e){return this.name},s.prototype._toTex=function(e){var t=!1;"undefined"==typeof o[this.name]&&f.isValuelessUnit(this.name)&&(t=!0);var r=i.toSymbol(this.name,t);return"\\"===r[0]?r:" "+r},s}var i=r(32);t.name="SymbolNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(this.properties=e||{},e&&("object"!=typeof e||Object.keys(e).some(function(t){return!e[t]||!e[t].isNode})))throw new TypeError("Object containing Nodes expected")}var o=n(r(272));return a.prototype=new o,a.prototype.type="ObjectNode",a.prototype.isObjectNode=!0,a.prototype._compile=function(e,t){var r=[];for(var n in this.properties)this.properties.hasOwnProperty(n)&&r.push('"'+n+'": '+this.properties[n]._compile(e,t));return"{"+r.join(", ")+"}"},a.prototype.forEach=function(e){for(var t in this.properties)this.properties.hasOwnProperty(t)&&e(this.properties[t],'properties["'+t+'"]',this)},a.prototype.map=function(e){var t={};for(var r in this.properties)this.properties.hasOwnProperty(r)&&(t[r]=this._ifNode(e(this.properties[r],'properties["'+r+'"]',this)));return new a(t)},a.prototype.clone=function(){var e={};for(var t in this.properties)this.properties.hasOwnProperty(t)&&(e[t]=this.properties[t]);return new a(e)},a.prototype._toString=function(e){var t=[];for(var r in this.properties)this.properties.hasOwnProperty(r)&&t.push('"'+r+'": '+this.properties[r].toString(e));return"{"+t.join(", ")+"}"},a.prototype._toTex=function(e){var t=[];for(var r in this.properties)this.properties.hasOwnProperty(r)&&t.push("\\mathbf{"+r+":} & "+this.properties[r].toTex(e)+"\\\\");return"\\left\\{\\begin{array}{ll}"+t.join("\n")+"\\end{array}\\right\\}"},a}r(23);t.name="ObjectNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o,s){function u(e,t,r,n){if(!(this instanceof u))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('string expected for parameter "op"');if("string"!=typeof t)throw new TypeError('string expected for parameter "fn"');if(!Array.isArray(r)||!r.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit=n===!0,this.op=e,this.fn=t,this.args=r||[]}function c(e,t,r,n){var i=a.getPrecedence(e,t),o=a.getAssociativity(e,t);if("all"===t||r.length>2){var s=[];return r.forEach(function(e){switch(e.getContent().type){case"ArrayNode":case"ConstantNode":case"SymbolNode":case"ParenthesisNode":s.push(!1);break;default:s.push(!0)}}),s}switch(r.length){case 0:return[];case 1:var u=a.getPrecedence(r[0],t);if(n&&null!==u){var c,f;if("keep"===t?(c=r[0].getIdentifier(),f=e.getIdentifier()):(c=r[0].getContent().getIdentifier(),f=e.getContent().getIdentifier()),a.properties[i][f].latexLeftParens===!1)return[!1];if(a.properties[u][c].latexParens===!1)return[!1]}return null===u?[!1]:i>=u?[!0]:[!1];case 2:var l,p=a.getPrecedence(r[0],t),h=a.isAssociativeWith(e,r[0],t);l=null===p?!1:p!==i||"right"!==o||h?i>p:!0;var m,d=a.getPrecedence(r[1],t),g=a.isAssociativeWith(e,r[1],t);if(m=null===d?!1:d!==i||"left"!==o||g?i>d:!0,n){var f,v,y;"keep"===t?(f=e.getIdentifier(),v=e.args[0].getIdentifier(),y=e.args[1].getIdentifier()):(f=e.getContent().getIdentifier(),v=e.args[0].getContent().getIdentifier(),y=e.args[1].getContent().getIdentifier()),null!==p&&(a.properties[i][f].latexLeftParens===!1&&(l=!1),a.properties[p][v].latexParens===!1&&(l=!1)),null!==d&&(a.properties[i][f].latexRightParens===!1&&(m=!1),a.properties[d][y].latexParens===!1&&(m=!1))}return[l,m]}}var f=n(r(272));n(r(283)),n(r(287)),n(r(290));return u.prototype=new f,u.prototype.type="OperatorNode",u.prototype.isOperatorNode=!0,u.prototype._compile=function(e,t){if(!e.math[this.fn])throw new Error("Function "+this.fn+' missing in provided namespace "math"');var r=this.args.map(function(r){return r._compile(e,t)});return"math."+this.fn+"("+r.join(", ")+")"},u.prototype.forEach=function(e){for(var t=0;t<this.args.length;t++)e(this.args[t],"args["+t+"]",this)},u.prototype.map=function(e){for(var t=[],r=0;r<this.args.length;r++)t[r]=this._ifNode(e(this.args[r],"args["+r+"]",this));return new u(this.op,this.fn,t)},u.prototype.clone=function(){return new u(this.op,this.fn,this.args.slice(0))},u.prototype._toString=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=e&&e.implicit?e.implicit:"hide",n=this.args,i=c(this,t,n,!1);switch(n.length){case 1:var o=a.getAssociativity(this,t),s=n[0].toString(e);return i[0]&&(s="("+s+")"),"right"===o?this.op+s:"left"===o?s+this.op:s+this.op;case 2:var u=n[0].toString(e),f=n[1].toString(e);return i[0]&&(u="("+u+")"),i[1]&&(f="("+f+")"),this.implicit&&"OperatorNode:multiply"===this.getIdentifier()&&"hide"==r?u+" "+f:u+" "+this.op+" "+f;default:return this.fn+"("+this.args.join(", ")+")"}},u.prototype._toTex=function(e){var t=e&&e.parenthesis?e.parenthesis:"keep",r=e&&e.implicit?e.implicit:"hide",n=this.args,o=c(this,t,n,!0),s=i.operators[this.fn];switch(s="undefined"==typeof s?this.op:s,n.length){case 1:var u=a.getAssociativity(this,t),f=n[0].toTex(e);return o[0]&&(f="\\left("+f+"\\right)"),"right"===u?s+f:"left"===u?f+s:f+s;case 2:var l=n[0],p=l.toTex(e);o[0]&&(p="\\left("+p+"\\right)");var h=n[1],m=h.toTex(e);o[1]&&(m="\\left("+m+"\\right)");var d;switch(d="keep"===t?l.getIdentifier():l.getContent().getIdentifier(),this.getIdentifier()){case"OperatorNode:divide":return s+"{"+p+"}{"+m+"}";case"OperatorNode:pow":switch(p="{"+p+"}",m="{"+m+"}",d){case"ConditionalNode":case"OperatorNode:divide":p="\\left("+p+"\\right)"}case"OperatorNode:multiply":if(this.implicit&&"hide"===r)return p+"~"+m}return p+s+m;default:return"\\mathrm{"+this.fn+"}\\left("+n.map(function(t){return t.toTex(e)}).join(",")+"\\right)"}},u.prototype.getIdentifier=function(){return this.type+":"+this.fn},u}var i=r(32),a=r(280);t.name="OperatorNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(e,t){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if("string"==typeof e&&(console.warn("WARNING: passing a string to FunctionNode is deprecated, pass a SymbolNode instead."),e=new f(e)),!e||!e.isNode)throw new TypeError('Node expected as parameter "fn"');if(!Array.isArray(t)||!t.every(function(e){return e&&e.isNode}))throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn=e,this.args=t||[],Object.defineProperty(this,"name",{get:function(){return this.fn.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}});var r=function(){throw new Error("Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead")};Object.defineProperty(this,"object",{get:r,set:r})}function u(e,t,r){for(var n,i="",a=new RegExp("\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)","ig"),o=0;null!==(n=a.exec(e));)if(i+=e.substring(o,n.index),o=n.index,"$$"===n[0])i+="$",o++;else{o+=n[0].length;var s=t[n[1]];if(!s)throw new ReferenceError("Template: Property "+n[1]+" does not exist.");if(void 0===n[2])switch(typeof s){case"string":i+=s;break;case"object":if(s.isNode)i+=s.toTex(r);else{if(!Array.isArray(s))throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes");i+=s.map(function(e,t){if(e&&e.isNode)return e.toTex(r);throw new TypeError("Template: "+n[1]+"["+t+"] is not a Node.")}).join(",")}break;default:throw new TypeError("Template: "+n[1]+" has to be a Node, String or array of Nodes")}else{if(!s[n[2]]||!s[n[2]].isNode)throw new TypeError("Template: "+n[1]+"["+n[2]+"] is not a Node.");i+=s[n[2]].toTex(r)}}return i+=e.slice(o)}var c=n(r(272)),f=n(r(287));s.prototype=new c,s.prototype.type="FunctionNode",s.prototype.isFunctionNode=!0,s.prototype._compile=function(e,t){var r,n=this.fn._compile(e,t),i=this.args.map(function(r){return r._compile(e,t)});if(this.fn.isSymbolNode){var a=this.fn.name,o=e.math[a],s="function"==typeof o&&1==o.rawArgs;return s?(r=this._getUniqueArgumentsName(e),e[r]=this.args,n+"("+r+", math, scope)"):n+"("+i.join(", ")+")"}if(this.fn.isAccessorNode&&this.fn.index.isObjectProperty()){r=this._getUniqueArgumentsName(e),e[r]=this.args;var u=this.fn.object._compile(e,t),c=this.fn.index.getObjectProperty();return"(function () {var object = "+u+';return (object["'+c+'"] && object["'+c+'"].rawArgs)  ? object["'+c+'"]('+r+', math, scope) : object["'+c+'"]('+i.join(", ")+")})()"}return r=this._getUniqueArgumentsName(e),e[r]=this.args,"(function () {var fn = "+n+";return (fn && fn.rawArgs)  ? fn("+r+", math, scope) : fn("+i.join(", ")+")})()"},s.prototype._getUniqueArgumentsName=function(e){var t,r=0;do t="args"+r,r++;while(t in e);return t},s.prototype.forEach=function(e){for(var t=0;t<this.args.length;t++)e(this.args[t],"args["+t+"]",this)},s.prototype.map=function(e){for(var t=this.fn.map(e),r=[],n=0;n<this.args.length;n++)r[n]=this._ifNode(e(this.args[n],"args["+n+"]",this));return new s(t,r)},s.prototype.clone=function(){return new s(this.fn,this.args.slice(0))};var l=s.prototype.toString;s.prototype.toString=function(e){var t,r=this.fn.toString(e);return e&&"object"==typeof e.handler&&e.handler.hasOwnProperty(r)&&(t=e.handler[r](this,e)),"undefined"!=typeof t?t:l.call(this,e)},s.prototype._toString=function(e){var t=this.args.map(function(t){return t.toString(e)});return this.fn.toString(e)+"("+t.join(", ")+")"};var p=s.prototype.toTex;return s.prototype.toTex=function(e){var t;return e&&"object"==typeof e.handler&&e.handler.hasOwnProperty(this.name)&&(t=e.handler[this.name](this,e)),"undefined"!=typeof t?t:p.call(this,e)},s.prototype._toTex=function(e){var t,r=this.args.map(function(t){return t.toTex(e)});!o[this.name]||"function"!=typeof o[this.name].toTex&&"object"!=typeof o[this.name].toTex&&"string"!=typeof o[this.name].toTex||(t=o[this.name].toTex);var n;switch(typeof t){case"function":n=t(this,e);break;case"string":n=u(t,this,e);break;case"object":switch(typeof t[r.length]){case"function":n=t[r.length](this,e);break;case"string":n=u(t[r.length],this,e)}}return"undefined"!=typeof n?n:u(i.defaultTemplate,this,e)},s.prototype.getIdentifier=function(){return this.type+":"+this.name},s}var i=r(32);t.name="FunctionNode",t.path="expression.node",t.math=!0,t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(!e||!e.isNode)throw new TypeError('Node expected for parameter "content"');this.content=e}var o=n(r(272));return a.prototype=new o,a.prototype.type="ParenthesisNode",a.prototype.isParenthesisNode=!0,a.prototype._compile=function(e,t){return this.content._compile(e,t)},a.prototype.getContent=function(){return this.content.getContent()},a.prototype.forEach=function(e){e(this.content,"content",this)},a.prototype.map=function(e){var t=e(this.content,"content",this);return new a(t)},a.prototype.clone=function(){return new a(this.content)},a.prototype._toString=function(e){return!e||e&&!e.parenthesis||e&&"keep"===e.parenthesis?"("+this.content.toString(e)+")":this.content.toString(e)},a.prototype._toTex=function(e){return!e||e&&!e.parenthesis||e&&"keep"===e.parenthesis?"\\left("+this.content.toTex(e)+"\\right)":this.content.toTex(e)},a}t.name="ParenthesisNode",t.path="expression.node",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(270));return a("compile",{string:function(e){var t={};return o(e).compile().eval(t)},"string, Object":function(e,t){return o(e).compile().eval(t)},"Array | Matrix":function(e){var t={};return i(e,function(e){return o(e).compile().eval(t)})},"Array | Matrix, Object":function(e,t){return i(e,function(e){return o(e).compile().eval(t)})}})}var i=r(19);t.name="eval",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i,a){var o=n(r(96));return i("help",{any:function(t){var r,n=t;if("string"!=typeof t)for(r in a)if(a.hasOwnProperty(r)&&t===a[r]){n=r;break}var i=o[n];if(!i)throw new Error('No documentation found on "'+n+'"');return new e.Help(i)}})}t.math=!0,t.name="help",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(270));return i("parse",{"string | Array | Matrix":a,"string | Array | Matrix, Object":a})}t.name="parse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i,a){var o=n(r(296));return i("parser",{"":function(){return new o(a)}})}t.name="parser",t.factory=n,t.math=!0},function(e,t,r){"use strict";function n(e,t,n,a,o){function s(){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");this.scope={}}var u=n(r(270));return s.prototype.type="Parser",s.prototype.isParser=!0,s.prototype.parse=function(e){throw new Error("Parser.parse is deprecated. Use math.parse instead.")},s.prototype.compile=function(e){throw new Error("Parser.compile is deprecated. Use math.compile instead.")},s.prototype.eval=function(e){return u(e).compile().eval(this.scope)},s.prototype.get=function(e){return this.scope[e]},s.prototype.getAll=function(){return i({},this.scope)},s.prototype.set=function(e,t){return this.scope[e]=t},s.prototype.remove=function(e){delete this.scope[e]},s.prototype.clear=function(){for(var e in this.scope)this.scope.hasOwnProperty(e)&&delete this.scope[e]},s}var i=r(3).extend;t.name="Parser",t.path="expression",t.factory=n,t.math=!0},function(e,t,r){e.exports=[r(271),r(277),r(278),r(281),r(282),r(283),r(285),r(284),r(290),r(272),r(288),r(289),r(291),r(286),r(287),r(298)]},function(e,t){"use strict";function r(e,t,r,n){function i(){throw new Error("UpdateNode is deprecated. Use AssignmentNode instead.")}return i}t.name="UpdateNode",t.path="expression.node",t.factory=r},function(e,t,r){e.exports=[r(300),r(302),r(304),r(306),r(307),r(309),r(315),r(320),r(322),r(324)]},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(301));return a("concat",{"...any":function(e){var t=e.length-1,r=e[t];"number"==typeof r?e[t]=r-1:r&&r.isBigNumber===!0&&(e[t]=r.minus(1));try{return o.apply(null,e)}catch(n){throw i(n)}}})}var i=r(275).transform;t.name="concat",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,f){var l=n(r(52)),p=f("concat",{"...Array | Matrix | number | BigNumber":function(e){var t,r,n=e.length,f=-1,p=!1,h=[];for(t=0;n>t;t++){var m=e[t];if(m&&m.isMatrix===!0&&(p=!0),"number"==typeof m||m&&m.isBigNumber===!0){if(t!==n-1)throw new Error("Dimension must be specified as last argument");if(r=f,f=m.valueOf(),!o(f))throw new TypeError("Integer number expected for dimension");if(0>f||t>0&&f>r)throw new u(f,r+1)}else{var d=a(m).valueOf(),g=s.size(d);if(h[t]=d,r=f,f=g.length-1,t>0&&f!=r)throw new c(r+1,f+1)}}if(0==h.length)throw new SyntaxError("At least one matrix expected");for(var v=h.shift();h.length;)v=i(v,h.shift(),f,0);return p?l(v):v},"...string":function(e){return e.join("")}});return p.toTex=void 0,p}function i(e,t,r,n){if(r>n){if(e.length!=t.length)throw new c(e.length,t.length);for(var a=[],o=0;o<e.length;o++)a[o]=i(e[o],t[o],r,n+1);return a}return e.concat(t)}var a=r(3).clone,o=r(6).isInteger,s=r(40),u=r(43),c=r(42);t.name="concat",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t,r){var n,i;if(e[0]&&(n=e[0].compile().eval(r)),e[1])if(e[1]&&e[1].isSymbolNode)i=e[1].compile().eval(r);else{var a=r||{},s=e[1].filter(function(e){return e&&e.isSymbolNode&&!(e.name in t)&&!(e.name in a)})[0],u=Object.create(a),c=e[1].compile();if(!s)throw new Error("No undefined variable found in filter equation");var f=s.name;i=function(e){return u[f]=e,c.eval(u)}}return o(n,i)}var o=n(r(303));n(r(287));return a.rawArgs=!0,a}t.name="filter",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("filter",{"Array, function":i,"Array, RegExp":a,"Matrix, function":function(e,t){return s(i(e.toArray(),t))},"Matrix, RegExp":function(e,t){return s(a(e.toArray(),t))}});return u.toTex=void 0,u}function i(e,t){if(1!==o(e).length)throw new Error("Only one dimensional matrices supported");return e.filter(function(e){return t(e)})}function a(e,t){if(1!==o(e).length)throw new Error("Only one dimensional matrices supported");return e.filter(function(e){return t.test(e)})}var o=r(40).size;t.name="filter",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){n(r(305));return i("forEach",{"Array | Matrix, function":function(e,t){var r=function(n,i){Array.isArray(n)?n.forEach(function(e,t){r(e,i.concat(t+1))}):t(n,i,e)};r(e.valueOf(),[])}})}t.name="forEach",t.path="expression.transform",t.factory=n},function(e,t){"use strict";function r(e,t,r,i){var a=i("forEach",{"Array, function":n,"Matrix, function":function(e,t){return e.forEach(t)}});return a.toTex=void 0,a}function n(e,t){var r=function(n,i){Array.isArray(n)?n.forEach(function(e,t){r(e,i.concat(t))}):t(n,i,e)};r(e,[])}t.name="forEach",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){n(r(68));return function(){for(var t=[],r=0,n=arguments.length;n>r;r++){var i=arguments[r];if(i&&i.isRange===!0)i.start--,i.end-=i.step>0?0:2;else if(i&&i.isSet===!0)i=i.map(function(e){return e-1});else if(i&&(i.isArray===!0||i.isMatrix))i=i.map(function(e){return e-1});else if("number"==typeof i)i--;else if(i&&i.isBigNumber===!0)i=i.toNumber()-1;else if("string"!=typeof i)throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");t[r]=i}var a=new e.Index;return e.Index.apply(a,t),a}}Array.isArray;t.name="index",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=(n(r(308)),n(r(52)));return a("max",{"Array, function":function(e,t){return i(e,t,e)},"Matrix, function":function(e,t){return o(i(e.valueOf(),t,e))}})}function i(e,t,r){function n(e,i){return Array.isArray(e)?e.map(function(e,t){return n(e,i.concat(t+1))}):t(e,i,r)}return n(e,[])}t.name="map",t.path="expression.transform",t.factory=n},function(e,t){"use strict";function r(e,t,r,i){var a=i("map",{"Array, function":n,"Matrix, function":function(e,t){return e.map(t)}});return a.toTex=void 0,a}function n(e,t){var r=function(n,i){return Array.isArray(n)?n.map(function(e,t){return r(e,i.concat(t))}):t(n,i,e)};return r(e,[])}t.name="map",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(311));return o("max",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="max",t.path="expression.transform",t.factory=n},function(e,t){"use strict";
e.exports=function(e){return Array.isArray(e)||e&&e.isMatrix===!0}},function(e,t,r){"use strict";function n(e,t,n,s){function u(e,t){return f(e,t)?e:t}function c(e){var t=void 0;if(i(e,function(e){(void 0===t||f(e,t))&&(t=e)}),void 0===t)throw new Error("Cannot calculate max of an empty array");return t}var f=n(r(64)),l=s("max",{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(e,t){return a(e,t.valueOf(),u)},"...":function(e){if(o(e))throw new TypeError("Scalar values expected in function max");return c(e)}});return l.toTex="\\max\\left(${args}\\right)",l}var i=r(312),a=r(313),o=r(314);t.name="max",t.factory=n},function(e,t){"use strict";e.exports=function r(e,t){e&&e.isMatrix===!0&&(e=e.valueOf());for(var n=0,i=e.length;i>n;n++){var a=e[n];Array.isArray(a)?r(a,t):t(a)}}},function(e,t,r){"use strict";function n(e,t,r){var a,o,s,u;if(0>=t){if(Array.isArray(e[0])){for(u=i(e),o=[],a=0;a<u.length;a++)o[a]=n(u[a],t-1,r);return o}for(s=e[0],a=1;a<e.length;a++)s=r(s,e[a]);return s}for(o=[],a=0;a<e.length;a++)o[a]=n(e[a],t-1,r);return o}function i(e){var t,r,n=e.length,i=e[0].length,a=[];for(r=0;i>r;r++){var o=[];for(t=0;n>t;t++)o.push(e[t][r]);a.push(o)}return a}var a=r(40).size,o=r(43);e.exports=function(e,t,r){var i=Array.isArray(e)?a(e):e.size();if(0>t||t>=i.length)throw new o(t,i.length);return e&&e.isMatrix===!0?e.create(n(e.valueOf(),t,r)):n(e,t,r)}},function(e,t,r){"use strict";var n=r(310);e.exports=function(e){for(var t=0;t<e.length;t++)if(n(e[t]))return!0;return!1}},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(316));return o("mean",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="mean",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(e,t){var r=o(e,t,l),n=Array.isArray(e)?i(e):e.size();return p(r,n[t])}function f(e){var t=0,r=0;if(a(e,function(e){t=l(t,e),r++}),0===r)throw new Error("Cannot calculate mean of an empty array");return p(t,r)}var l=n(r(51)),p=n(r(317)),h=u("mean",{"Array | Matrix":f,"Array | Matrix, number | BigNumber":c,"...":function(e){if(s(e))throw new TypeError("Scalar values expected in function mean");return f(e)}});return h.toTex=void 0,h}var i=r(40).size,a=r(312),o=r(313),s=r(314);t.name="mean",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(81)),s=n(r(84)),u=n(r(318)),c=n(r(52)),f=n(r(85)),l=n(r(58)),p=a("divide",i({"Array | Matrix, Array | Matrix":function(e,t){return s(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,o,!1);break;case"dense":r=l(e,t,o,!1)}return r},"Array, any":function(e,t){return l(c(e),t,o,!1).valueOf()},"any, Array | Matrix":function(e,t){return s(e,u(t))}},o.signatures));return p.toTex={2:"\\frac{${args[0]}}{${args[1]}}"},p}var i=r(3).extend;t.name="divide",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t,r){var n,i,a,o,s;if(1==t){if(o=e[0][0],0==o)throw Error("Cannot calculate inverse, determinant is zero");return[[u(1,o)]]}if(2==t){var m=p(e);if(0==m)throw Error("Cannot calculate inverse, determinant is zero");return[[u(e[1][1],m),u(l(e[0][1]),m)],[u(l(e[1][0]),m),u(e[0][0],m)]]}var d=e.concat();for(n=0;t>n;n++)d[n]=d[n].concat();for(var g=h(t).valueOf(),v=0;r>v;v++){for(n=v;t>n&&0==d[n][v];)n++;if(n==t||0==d[n][v])throw Error("Cannot calculate inverse, determinant is zero");n!=v&&(s=d[v],d[v]=d[n],d[n]=s,s=g[v],g[v]=g[n],g[n]=s);var y=d[v],x=g[v];for(n=0;t>n;n++){var b=d[n],w=g[n];if(n!=v){if(0!=b[v]){for(a=u(l(b[v]),y[v]),i=v;r>i;i++)b[i]=c(b[i],f(a,y[i]));for(i=0;r>i;i++)w[i]=c(w[i],f(a,x[i]))}}else{for(a=y[v],i=v;r>i;i++)b[i]=u(b[i],a);for(i=0;r>i;i++)w[i]=u(w[i],a)}}}return g}var s=n(r(52)),u=n(r(81)),c=n(r(53)),f=n(r(84)),l=n(r(78)),p=n(r(319)),h=n(r(83)),m=a("inv",{"Array | Matrix":function(e){var t=e.isMatrix===!0?e.size():i.array.size(e);switch(t.length){case 1:if(1==t[0])return e.isMatrix===!0?s([u(1,e.valueOf()[0])]):[u(1,e[0])];throw new RangeError("Matrix must be square (size: "+i.string.format(t)+")");case 2:var r=t[0],n=t[1];if(r==n)return e.isMatrix===!0?s(o(e.valueOf(),r,n),e.storage()):o(e,r,n);throw new RangeError("Matrix must be square (size: "+i.string.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+i.string.format(t)+")")}},any:function(e){return u(1,e)}});return m.toTex={1:"\\left(${args[0]}\\right)^{-1}"},m}var i=r(39);t.name="inv",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function s(e,t,r){if(1==t)return a.clone(e[0][0]);if(2==t)return f(l(e[0][0],e[1][1]),l(e[1][0],e[0][1]));for(var n=function(e){var t,r,n=new Array(e.length),i=0;for(t=1;t<e.length;t++)i=c(i,e[t][t]);for(t=0;t<e.length;t++){for(n[t]=new Array(e.length),n[t][t]=p(i),r=0;t>r;r++)n[t][r]=0;for(r=t+1;r<e.length;r++)n[t][r]=e[t][r];t+1<e.length&&(i=f(i,e[t+1][t+1]))}return n},i=e,o=0;t-1>o;o++)i=l(n(i),e);return t%2==0?p(i[0][0]):i[0][0]}var u=n(r(52)),c=n(r(51)),f=n(r(77)),l=n(r(84)),p=n(r(78)),h=i("det",{any:function(e){return a.clone(e)},"Array | Matrix":function(e){var t;switch(e&&e.isMatrix===!0?t=e.size():Array.isArray(e)?(e=u(e),t=e.size()):t=[],t.length){case 0:return a.clone(e);case 1:if(1==t[0])return a.clone(e.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+o.format(t)+")");case 2:var r=t[0],n=t[1];if(r==n)return s(e.clone().valueOf(),r,n);throw new RangeError("Matrix must be square (size: "+o.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(t)+")")}}});return h.toTex={1:"\\det\\left(${args[0]}\\right)"},h}var i=r(39),a=i.object,o=i.string;t.name="det",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(321));return o("min",{"...any":function(e){if(2==e.length&&a(e[0])){var t=e[1];"number"==typeof t?e[1]=t-1:t&&t.isBigNumber===!0&&(e[1]=t.minus(1))}try{return s.apply(null,e)}catch(r){throw i(r)}}})}var i=r(275).transform,a=r(310);t.name="min",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,s){function u(e,t){return f(e,t)?e:t}function c(e){var t=void 0;if(i(e,function(e){(void 0===t||f(e,t))&&(t=e)}),void 0===t)throw new Error("Cannot calculate min of an empty array");return t}var f=n(r(60)),l=s("min",{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(e,t){return a(e,t.valueOf(),u)},"...":function(e){if(o(e))throw new TypeError("Scalar values expected in function min");return c(e)}});return l.toTex="\\min\\left(${args}\\right)",l}var i=r(312),a=r(313),o=r(314);t.name="min",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(323));return i("range",{"...any":function(e){var t=e.length-1,r=e[t];return"boolean"!=typeof r&&e.push(!0),a.apply(null,e)}})}t.name="range",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){return"Array"===t.matrix?e:p(e)}function o(r,n){var i=l(r);if(!i)throw new SyntaxError('String "'+r+'" is no valid range');var o;return"BigNumber"===t.number?(o=n?f:c,a(o(new e.BigNumber(i.start),new e.BigNumber(i.end),new e.BigNumber(i.step)))):(o=n?u:s,a(o(i.start,i.end,i.step)))}function s(e,t,r){var n=[],i=e;if(r>0)for(;t>i;)n.push(i),i+=r;else if(0>r)for(;i>t;)n.push(i),i+=r;return n}function u(e,t,r){var n=[],i=e;if(r>0)for(;t>=i;)n.push(i),i+=r;else if(0>r)for(;i>=t;)n.push(i),i+=r;return n}function c(e,t,r){var n=[],i=e;if(r.gt(h))for(;i.lt(t);)n.push(i),i=i.plus(r);else if(r.lt(h))for(;i.gt(t);)n.push(i),i=i.plus(r);return n}function f(e,t,r){var n=[],i=e;if(r.gt(h))for(;i.lte(t);)n.push(i),i=i.plus(r);else if(r.lt(h))for(;i.gte(t);)n.push(i),i=i.plus(r);return n}function l(e){var t=e.split(":"),r=t.map(function(e){return Number(e)}),n=r.some(function(e){return isNaN(e)});if(n)return null;switch(r.length){case 2:return{start:r[0],end:r[1],step:1};case 3:return{start:r[0],end:r[2],step:r[1]};default:return null}}var p=n(r(52)),h=new e.BigNumber(0),m=new e.BigNumber(1),d=i("range",{string:o,"string, boolean":o,"number, number":function(e,t){return a(s(e,t,1))},"number, number, number":function(e,t,r){return a(s(e,t,r))},"number, number, boolean":function(e,t,r){return a(r?u(e,t,1):s(e,t,1))},"number, number, number, boolean":function(e,t,r,n){return a(n?u(e,t,r):s(e,t,r))},"BigNumber, BigNumber":function(e,t){return a(c(e,t,m))},"BigNumber, BigNumber, BigNumber":function(e,t,r){return a(c(e,t,r))},"BigNumber, BigNumber, boolean":function(e,t,r){return a(r?f(e,t,m):c(e,t,m))},"BigNumber, BigNumber, BigNumber, boolean":function(e,t,r,n){return a(n?f(e,t,r):c(e,t,r))}});return d.toTex=void 0,d}t.name="range",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(276));return a("subset",{"...any":function(e){try{return o.apply(null,e)}catch(t){throw i(t)}}})}var i=r(275).transform;t.name="subset",t.path="expression.transform",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){if(!(this instanceof s))throw new SyntaxError("Constructor must be called with the new operator");if(!e)throw new Error('Argument "doc" missing');this.doc=e}var u=n(r(295))();return s.prototype.type="Help",s.prototype.isHelp=!0,s.prototype.toString=function(){var e=this.doc||{},t="\n";if(e.name&&(t+="Name: "+e.name+"\n\n"),e.category&&(t+="Category: "+e.category+"\n\n"),e.description&&(t+="Description:\n    "+e.description+"\n\n"),e.syntax&&(t+="Syntax:\n    "+e.syntax.join("\n    ")+"\n\n"),e.examples){t+="Examples:\n";for(var r=0;r<e.examples.length;r++){var n=e.examples[r];t+="    "+n+"\n";var i;try{i=u.eval(n)}catch(o){i=o}i&&!i.isHelp&&(t+="        "+a.format(i,{precision:14})+"\n")}t+="\n"}return e.seealso&&(t+="See also: "+e.seealso.join(", ")+"\n"),t},s.prototype.toJSON=function(){var e=i.clone(this.doc);return e.mathjs="Help",e},s.fromJSON=function(e){var t={};for(var r in e)"mathjs"!==r&&(t[r]=e[r]);return new s(t)},s.prototype.valueOf=s.prototype.toString,s}var i=r(3),a=r(23);t.name="Help",t.path="type",t.factory=n},function(e,t,r){e.exports=[r(327),r(354),r(386),r(402),r(411),r(416),r(419),r(425),r(437),r(446),r(450),r(457),r(459),r(485),r(487)]},function(e,t,r){e.exports=[r(328),r(329),r(349),r(351),r(353)]},function(e,t,r){"use strict";function n(e,t,n,i){var o=n(r(52)),s=n(r(86)),u=n(r(53)),c=n(r(81)),f=n(r(80)),l=n(r(77)),p=n(r(64)),h=n(r(48)),m=n(r(78)),d=e.SparseMatrix,g=e.DenseMatrix,v=e.Spa,y=i("lup",{DenseMatrix:function(e){return x(e)},SparseMatrix:function(e){return b(e)},Array:function(e){var t=o(e),r=x(t);return{L:r.L.valueOf(),U:r.U.valueOf(),p:r.p}}}),x=function(e){var t,r,n,i=e._size[0],o=e._size[1],m=Math.min(i,o),d=a.clone(e._data),v=[],y=[i,m],x=[],b=[m,o],w=[];for(t=0;i>t;t++)w[t]=t;for(r=0;o>r;r++){if(r>0)for(t=0;i>t;t++){var N=Math.min(t,r),E=0;for(n=0;N>n;n++)E=u(E,f(d[t][n],d[n][r]));d[t][r]=l(d[t][r],E)}var M=r,A=0,_=0;for(t=r;i>t;t++){var O=d[t][r],T=s(O);p(T,A)&&(M=t,A=T,_=O)}if(r!==M&&(w[r]=[w[M],w[M]=w[r]][0],g._swapRows(r,M,d)),i>r)for(t=r+1;i>t;t++){var C=d[t][r];h(C,0)||(d[t][r]=c(d[t][r],_))}}for(r=0;o>r;r++)for(t=0;i>t;t++)0===r&&(o>t&&(x[t]=[]),v[t]=[]),r>t?(o>t&&(x[t][r]=d[t][r]),i>r&&(v[t][r]=0)):t!==r?(o>t&&(x[t][r]=0),i>r&&(v[t][r]=d[t][r])):(o>t&&(x[t][r]=d[t][r]),i>r&&(v[t][r]=1));var S=new g({data:v,size:y}),z=new g({data:x,size:b}),B=[];for(t=0,m=w.length;m>t;t++)B[w[t]]=t;return{L:S,U:z,p:B,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}},b=function(e){var t,r,n,i=e._size[0],a=e._size[1],o=Math.min(i,a),u=e._values,l=e._index,g=e._ptr,y=[],x=[],b=[],w=[i,o],N=[],E=[],M=[],A=[o,a],_=[],O=[];for(t=0;i>t;t++)_[t]=t,O[t]=t;var T=function(e,t){var r=O[e],n=O[t];_[r]=t,_[n]=e,O[e]=n,O[t]=r};for(r=0;a>r;r++){var C=new v;i>r&&(b.push(y.length),y.push(1),x.push(r)),M.push(N.length);var S=g[r],z=g[r+1];for(n=S;z>n;n++)t=l[n],C.set(_[t],u[n]);r>0&&C.forEach(0,r-1,function(e,t){d._forEachRow(e,y,x,b,function(r,n){r>e&&C.accumulate(r,m(f(n,t)))})});var B=r,k=C.get(r),I=s(k);C.forEach(r+1,i-1,function(e,t){var r=s(t);p(r,I)&&(B=e,I=r,k=t)}),r!==B&&(d._swapRows(r,B,w[1],y,x,b),d._swapRows(r,B,A[1],N,E,M),C.swap(r,B),T(r,B)),C.forEach(0,i-1,function(e,t){r>=e?(N.push(t),E.push(e)):(t=c(t,k),h(t,0)||(y.push(t),x.push(e)))})}return M.push(N.length),b.push(y.length),{L:new d({values:y,index:x,ptr:b,size:w}),U:new d({values:N,index:E,ptr:M,size:A}),p:_,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\nP: "+this.p}}};return y}var i=r(39),a=i.object;t.name="lup",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(330)),s=n(r(341)),u=i("slu",{"SparseMatrix, number, number":function(e,t,r){if(!o(t)||0>t||t>3)throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");if(0>r||r>1)throw new Error("Partial pivoting threshold must be a number from 0 to 1");var n=a(t,e,!1),i=s(e,n,r);return{L:i.L,U:i.U,p:i.pinv,q:n.q,toString:function(){return"L: "+this.L.toString()+"\nU: "+this.U.toString()+"\np: "+this.p.toString()+(this.q?"\nq: "+this.q.toString():"")+"\n"}}}});return u}var i=r(39),a=i.number,o=a.isInteger;t.name="slu",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(331)),a=n(r(336)),o=n(r(337)),s=n(r(338)),u=n(r(339)),c=function(e,t,r){var n,c=t._ptr,l=t._size,p=l[1],h={};if(h.q=i(e,t),e&&!h.q)return null;if(r){var m=e?a(t,null,h.q,0):t;h.parent=o(m,1);var d=s(h.parent,p);if(h.cp=u(m,h.parent,d,1),m&&h.parent&&h.cp&&f(m,h))for(h.unz=0,n=0;p>n;n++)h.unz+=h.cp[n]}else h.unz=4*c[p]+p,h.lnz=h.unz;return h},f=function(e,t){var r=e._ptr,n=e._index,i=e._size,a=i[0],o=i[1];t.pinv=[],t.leftmost=[];var s,u,c,f,l,p=t.parent,h=t.pinv,m=t.leftmost,d=[],g=0,v=a,y=a+o,x=a+2*o;for(u=0;o>u;u++)d[v+u]=-1,d[y+u]=-1,d[x+u]=0;for(s=0;a>s;s++)m[s]=-1;for(u=o-1;u>=0;u--)for(f=r[u],l=r[u+1],c=f;l>c;c++)m[n[c]]=u;for(s=a-1;s>=0;s--)h[s]=-1,u=m[s],-1!=u&&(0===d[x+u]++&&(d[y+u]=s),d[g+s]=d[v+u],d[v+u]=s);for(t.lnz=0,t.m2=a,u=0;o>u;u++)if(s=d[v+u],t.lnz++,0>s&&(s=t.m2++),h[s]=u,!(--x[u]<=0)){t.lnz+=d[x+u];var b=p[u];-1!=b&&(0===d[x+b]&&(d[y+b]=d[y+u]),d[g+d[y+u]]=d[v+b],d[v+b]=d[g+s],d[x+b]+=d[x+u])}for(s=0;a>s;s++)h[s]<0&&(h[s]=u++);return!0};return c}t.name="cs_sqr",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=n(r(333)),o=n(r(334)),s=n(r(51)),u=n(r(84)),c=n(r(335)),f=function(e,t){if(!t||0>=e||e>3)return null;var r=t._size,n=r[0],s=r[1],u=0,c=Math.max(16,10*Math.sqrt(s));c=Math.min(s-2,c);var f=l(e,t,n,s,c);a(f,d,null);for(var g,v,y,x,b,w,N,E,M,A,_,O,T,C,S,z,B=f._index,k=f._ptr,I=k[s],R=[],P=[],U=0,q=s+1,L=2*(s+1),j=3*(s+1),F=4*(s+1),D=5*(s+1),$=6*(s+1),G=7*(s+1),H=R,V=p(s,k,P,U,j,H,L,G,q,$,F,D),Z=h(s,k,P,D,F,$,c,q,j,H,L),W=0;s>Z;){for(y=-1;s>W&&-1==(y=P[j+W]);W++);-1!=P[L+y]&&(H[P[L+y]]=-1),P[j+W]=P[L+y];var Y=P[F+y],X=P[q+y];Z+=X;var J=0;P[q+y]=-X;var Q=k[y],K=0===Y?Q:I,ee=K;for(x=1;Y+1>=x;x++){for(x>Y?(w=y,N=Q,E=P[U+y]-Y):(w=B[Q++],N=k[w],E=P[U+w]),b=1;E>=b;b++)g=B[N++],(M=P[q+g])<=0||(J+=M,P[q+g]=-M,B[ee++]=g,-1!=P[L+g]&&(H[P[L+g]]=H[g]),-1!=H[g]?P[L+H[g]]=P[L+g]:P[j+P[D+g]]=P[L+g]);w!=y&&(k[w]=i(y),P[$+w]=0)}for(0!==Y&&(I=ee),P[D+y]=J,k[y]=K,P[U+y]=ee-K,P[F+y]=-2,V=m(V,u,P,$,s),A=K;ee>A;A++)if(g=B[A],!((_=P[F+g])<=0)){M=-P[q+g];var te=V-M;for(Q=k[g],O=k[g]+_-1;O>=Q;Q++)w=B[Q],P[$+w]>=V?P[$+w]-=M:0!==P[$+w]&&(P[$+w]=P[D+w]+te)}for(A=K;ee>A;A++){for(g=B[A],O=k[g],T=O+P[F+g]-1,C=O,S=0,z=0,Q=O;T>=Q;Q++)if(w=B[Q],0!==P[$+w]){var re=P[$+w]-V;re>0?(z+=re,B[C++]=w,S+=w):(k[w]=i(y),P[$+w]=0)}P[F+g]=C-O+1;var ne=C,ie=O+P[U+g];for(Q=T+1;ie>Q;Q++){v=B[Q];var ae=P[q+v];0>=ae||(z+=ae,B[C++]=v,S+=v)}0===z?(k[g]=i(y),M=-P[q+g],J-=M,X+=M,Z+=M,P[q+g]=0,P[F+g]=-1):(P[D+g]=Math.min(P[D+g],z),B[C]=B[ne],B[ne]=B[O],B[O]=y,P[U+g]=C-O+1,S=(0>S?-S:S)%s,P[L+g]=P[G+S],P[G+S]=g,H[g]=S)}for(P[D+y]=J,u=Math.max(u,J),V=m(V+u,u,P,$,s),A=K;ee>A;A++)if(g=B[A],!(P[q+g]>=0))for(S=H[g],g=P[G+S],P[G+S]=-1;-1!=g&&-1!=P[L+g];g=P[L+g],V++){for(E=P[U+g],_=P[F+g],Q=k[g]+1;Q<=k[g]+E-1;Q++)P[$+B[Q]]=V;var oe=g;for(v=P[L+g];-1!=v;){var se=P[U+v]===E&&P[F+v]===_;for(Q=k[v]+1;se&&Q<=k[v]+E-1;Q++)P[$+B[Q]]!=V&&(se=0);se?(k[v]=i(g),P[q+g]+=P[q+v],P[q+v]=0,P[F+v]=-1,v=P[L+v],P[L+oe]=v):(oe=v,v=P[L+v])}}for(Q=K,A=K;ee>A;A++)g=B[A],(M=-P[q+g])<=0||(P[q+g]=M,z=P[D+g]+J-M,z=Math.min(z,s-Z-M),-1!=P[j+z]&&(H[P[j+z]]=g),P[L+g]=P[j+z],H[g]=-1,P[j+z]=g,W=Math.min(W,z),P[D+g]=z,B[Q++]=g);P[q+y]=X,0===(P[U+y]=Q-K)&&(k[y]=-1,P[$+y]=0),0!==Y&&(I=Q)}for(g=0;s>g;g++)k[g]=i(k[g]);for(v=0;s>=v;v++)P[j+v]=-1;for(v=s;v>=0;v--)P[q+v]>0||(P[L+v]=P[j+k[v]],P[j+k[v]]=v);for(w=s;w>=0;w--)P[q+w]<=0||-1!=k[w]&&(P[L+w]=P[j+k[w]],P[j+k[w]]=w);for(y=0,g=0;s>=g;g++)-1==k[g]&&(y=o(g,y,P,j,L,R,$));return R.splice(R.length-1,1),R},l=function(e,t,r,n,i){var a=c(t);if(1===e&&n===r)return s(t,a);if(2==e){for(var o=a._index,f=a._ptr,l=0,p=0;r>p;p++){var h=f[p];if(f[p]=l,!(f[p+1]-h>i))for(var m=f[p+1];m>h;h++)o[l++]=o[h]}return f[r]=l,t=c(a),u(a,t)}return u(a,t)},p=function(e,t,r,n,i,a,o,s,u,c,f,l){for(var p=0;e>p;p++)r[n+p]=t[p+1]-t[p];r[n+e]=0;for(var h=0;e>=h;h++)r[i+h]=-1,a[h]=-1,r[o+h]=-1,r[s+h]=-1,r[u+h]=1,r[c+h]=1,r[f+h]=0,r[l+h]=r[n+h];var d=m(0,0,r,c,e);return r[f+e]=-2,t[e]=-1,r[c+e]=0,d},h=function(e,t,r,n,a,o,s,u,c,f,l){for(var p=0,h=0;e>h;h++){var m=r[n+h];if(0===m)r[a+h]=-2,p++,t[h]=-1,r[o+h]=0;else if(m>s)r[u+h]=0,r[a+h]=-1,p++,t[h]=i(e),r[u+e]++;else{var d=r[c+m];-1!=d&&(f[d]=h),r[l+h]=r[c+m],r[c+m]=h}}return p},m=function(e,t,r,n,i){if(2>e||0>e+t){for(var a=0;i>a;a++)0!==r[n+a]&&(r[n+a]=1);e=2}return e},d=function(e,t){return e!=t};return f}t.name="cs_amd",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e){return-e-2};return e}t.name="cs_flip",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t,r){for(var n=e._values,i=e._index,a=e._ptr,o=e._size,s=o[1],u=0,c=0;s>c;c++){var f=a[c];for(a[c]=u;f<a[c+1];f++)t(i[f],c,n?n[f]:1,r)&&(i[u]=i[f],n&&(n[u]=n[f]),u++)}return a[s]=u,i.splice(u,i.length-u),n&&n.splice(u,n.length-u),u};return e}t.name="cs_fkeep",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t,r,n,i,a,o){var s=0;for(r[o]=e;s>=0;){var u=r[o+s],c=r[n+u];-1==c?(s--,a[t++]=u):(r[n+u]=r[i+c],++s,r[o+s]=c)}return t};return e}t.name="cs_tdfs",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=e.DenseMatrix,f=e.SparseMatrix,l=o("transpose",{Array:function(e){return l(u(e)).valueOf()},Matrix:function(e){var t,r=e.size();switch(r.length){case 1:t=e.clone();break;case 2:var n=r[0],i=r[1];if(0===i)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+a(r)+")");switch(e.storage()){case"dense":t=p(e,n,i);break;case"sparse":t=h(e,n,i)}break;default:throw new RangeError("Matrix must be a vector or two dimensional (size: "+a(this._size)+")")}return t},any:function(e){return i(e)}}),p=function(e,t,r){for(var n,a=e._data,o=[],s=0;r>s;s++){n=o[s]=[];for(var u=0;t>u;u++)n[u]=i(a[u][s])}return new c({data:o,size:[r,t],datatype:e._datatype})},h=function(e,t,r){for(var n=e._values,a=e._index,o=e._ptr,s=n?[]:void 0,u=[],c=[],l=[],p=0;t>p;p++)l[p]=0;var h,m,d;for(h=0,m=a.length;m>h;h++)l[a[h]]++;for(var g=0,v=0;t>v;v++)c.push(g),g+=l[v],l[v]=c[v];for(c.push(g),d=0;r>d;d++)for(var y=o[d],x=o[d+1],b=y;x>b;b++){var w=l[a[b]]++;u[w]=d,n&&(s[w]=i(n[b]))}return new f({values:s,index:u,ptr:c,size:[r,t],datatype:e._datatype})};return l.toTex={1:"\\left(${args[0]}\\right)"+s.operators.transpose},l}var i=r(3).clone,a=r(23).format;t.name="transpose",t.factory=n},function(e,t){"use strict";function r(e){var t=e.SparseMatrix,r=function(e,r,n,i){for(var a=e._values,o=e._index,s=e._ptr,u=e._size,c=e._datatype,f=u[0],l=u[1],p=i&&e._values?[]:null,h=[],m=[],d=0,g=0;l>g;g++){m[g]=d;for(var v=n?n[g]:g,y=s[v],x=s[v+1],b=y;x>b;b++){var w=r?r[o[b]]:o[b];h[d]=w,p&&(p[d]=a[b]),d++}}return m[l]=d,new t({values:p,index:h,ptr:m,size:[f,l],datatype:c})};return r}t.name="cs_permute",t.path="sparse",t.factory=r},function(e,t){"use strict";function r(){var e=function(e,t){if(!e)return null;var r,n,i=e._index,a=e._ptr,o=e._size,s=o[0],u=o[1],c=[],f=[],l=0,p=u;if(t)for(r=0;s>r;r++)f[p+r]=-1;for(var h=0;u>h;h++){c[h]=-1,f[l+h]=-1;for(var m=a[h],d=a[h+1],g=m;d>g;g++){var v=i[g];for(r=t?f[p+v]:v;-1!=r&&h>r;r=n)n=f[l+r],f[l+r]=h,-1==n&&(c[r]=h);t&&(f[p+v]=h)}}return c};return e}t.name="cs_etree",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(334)),a=function(e,t){if(!e)return null;var r,n=0,a=[],o=[],s=0,u=t,c=2*t;for(r=0;t>r;r++)o[s+r]=-1;for(r=t-1;r>=0;r--)-1!=e[r]&&(o[u+r]=o[s+e[r]],o[s+e[r]]=r);for(r=0;t>r;r++)-1==e[r]&&(n=i(r,n,o,s,u,a,c));return a};return a}t.name="cs_post",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(335)),a=n(r(340)),o=function(e,t,r,n){if(!e||!t||!r)return null;var o,s,u,c,f,l,p,h=e._size,m=h[0],d=h[1],g=4*d+(n?d+m+1:0),v=[],y=0,x=d,b=2*d,w=3*d,N=4*d,E=5*d+1;for(u=0;g>u;u++)v[u]=-1;var M=[],A=i(e),_=A._index,O=A._ptr;for(u=0;d>u;u++)for(s=r[u],M[s]=-1==v[w+s]?1:0;-1!=s&&-1==v[w+s];s=t[s])v[w+s]=u;if(n){for(u=0;d>u;u++)v[r[u]]=u;for(o=0;m>o;o++){for(u=d,l=O[o],p=O[o+1],f=l;p>f;f++)u=Math.min(u,v[_[f]]);v[E+o]=v[N+u],v[N+u]=o}}for(o=0;d>o;o++)v[y+o]=o;for(u=0;d>u;u++){for(s=r[u],-1!=t[s]&&M[t[s]]--,c=n?v[N+u]:s;-1!=c;c=n?v[E+c]:-1)for(f=O[c];f<O[c+1];f++){o=_[f];var T=a(o,s,v,w,x,b,y);T.jleaf>=1&&M[s]++,2==T.jleaf&&M[T.q]--}-1!=t[s]&&(v[y+s]=t[s])}for(s=0;d>s;s++)-1!=t[s]&&(M[t[s]]+=M[s]);return M};return o}t.name="cs_counts",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t,r,n,i,a,o){var s,u,c,f,l=0;if(t>=e||r[n+t]<=r[i+e])return-1;if(r[i+e]=r[n+t],c=r[a+e],r[a+e]=t,-1===c)l=1,f=e;else{for(l=2,f=c;f!=r[o+f];f=r[o+f]);for(s=c;s!=f;s=u)u=r[o+s],r[o+s]=f}return{jleaf:l,q:f}};return e}t.name="cs_leaf",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(86)),a=n(r(81)),o=n(r(84)),s=n(r(64)),u=n(r(342)),c=n(r(343)),f=e.SparseMatrix,l=function(e,t,r){if(!e)return null;var n,l=e._size,p=l[1],h=100,m=100;t&&(n=t.q,h=t.lnz||h,m=t.unz||m);var d,g,v=[],y=[],x=[],b=new f({values:v,index:y,ptr:x,size:[p,p]}),w=[],N=[],E=[],M=new f({values:w,index:N,ptr:E,size:[p,p]}),A=[],_=[],O=[];for(d=0;p>d;d++)_[d]=0,A[d]=-1,x[d+1]=0;h=0,m=0;for(var T=0;p>T;T++){x[T]=h,E[T]=m;var C=n?n[T]:T,S=c(b,e,C,O,_,A,1),z=-1,B=-1;for(g=S;p>g;g++)if(d=O[g],A[d]<0){var k=i(_[d]);s(k,B)&&(B=k,z=d)}else N[m]=A[d],w[m++]=_[d];if(-1==z||0>=B)return null;A[C]<0&&u(i(_[C]),o(B,r))&&(z=C);var I=_[z];for(N[m]=T,w[m++]=I,A[z]=T,y[h]=z,v[h++]=1,g=S;p>g;g++)d=O[g],A[d]<0&&(y[h]=d,v[h++]=a(_[d],I)),_[d]=0}for(x[p]=h,E[p]=m,g=0;h>g;g++)y[g]=A[y[g]];return v.splice(h,v.length-h),y.splice(h,y.length-h),w.splice(m,w.length-m),N.splice(m,N.length-m),{L:b,U:M,pinv:A}};return l}t.name="cs_lu",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("largerEq",{"boolean, boolean":function(e,t){return e>=t},"number, number":function(e,r){return e>=r||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.gte(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return-1!==e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e>=t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.largerEq+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="largerEq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(81)),a=n(r(84)),o=n(r(77)),s=n(r(344)),u=function(e,t,r,n,u,c,f){var l,p,h,m,d=e._values,g=e._index,v=e._ptr,y=e._size,x=y[1],b=t._values,w=t._index,N=t._ptr,E=s(e,t,r,n,c);for(l=E;x>l;l++)u[n[l]]=0;for(p=N[r],h=N[r+1],l=p;h>l;l++)u[w[l]]=b[l];for(var M=E;x>M;M++){var A=n[M],_=c?c[A]:A;if(!(0>_))for(p=v[_],h=v[_+1],u[A]=i(u[A],d[f?p:h-1]),l=f?p+1:p,m=f?h:h-1;m>l;l++){var O=g[l];u[O]=o(u[O],a(d[l],u[A]))}}return E};return u}t.name="cs_spsolve",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(345)),a=n(r(346)),o=n(r(347)),s=function(e,t,r,n,s){var u,c,f,l=e._ptr,p=e._size,h=t._index,m=t._ptr,d=p[1],g=d;for(c=m[r],f=m[r+1],u=c;f>u;u++){var v=h[u];a(l,v)||(g=i(v,e,g,n,s))}for(u=g;d>u;u++)o(l,n[u]);return g};return s}t.name="cs_reach",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(346)),a=n(r(347)),o=n(r(348)),s=function(e,t,r,n,s){var u,c,f,l=t._index,p=t._ptr,h=t._size,m=h[1],d=0;for(n[0]=e;d>=0;){e=n[d];var g=s?s[e]:e;i(p,e)||(a(p,e),n[m+d]=0>g?0:o(p[g]));var v=1;for(c=n[m+d],f=0>g?0:o(p[g+1]);f>c;c++)if(u=l[c],!i(p,u)){n[m+d]=c,n[++d]=u,v=0;break}v&&(d--,n[--r]=e)}return r};return s}t.name="cs_dfs",t.path="sparse",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t){return e[t]<0};return e}t.name="cs_marked",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=function(e,t){e[t]=i(e[t])};return a}t.name="cs_mark",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n){var i=n(r(332)),a=function(e){return 0>e?i(e):e};return a}t.name="cs_unflip",t.path="sparse",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=n(r(80)),u=n(r(77)),c=n(r(48)),f=n(r(350)),l=e.DenseMatrix,p=i("lsolve",{"SparseMatrix, Array | Matrix":function(e,t){return m(e,t)},"DenseMatrix, Array | Matrix":function(e,t){return h(e,t)},"Array, Array | Matrix":function(e,t){var r=a(e),n=h(r,t);return n.valueOf()}}),h=function(e,t){t=f(e,t,!0);for(var r=t._data,n=e._size[0],i=e._size[1],a=[],p=e._data,h=0;i>h;h++){var m,d=r[h][0]||0;if(c(d,0))m=0;else{var g=p[h][h];if(c(g,0))throw new Error("Linear system cannot be solved since matrix is singular");m=o(d,g);for(var v=h+1;n>v;v++)r[v]=[u(r[v][0]||0,s(m,p[v][h]))]}a[h]=[m]}return new l({data:a,size:[n,1]})},m=function(e,t){t=f(e,t,!0);for(var r,n,i=t._data,a=e._size[0],p=e._size[1],h=e._values,m=e._index,d=e._ptr,g=[],v=0;p>v;v++){var y=i[v][0]||0;if(c(y,0))g[v]=[0];else{var x=0,b=[],w=[],N=d[v+1];for(n=d[v];N>n;n++)r=m[n],r===v?x=h[n]:r>v&&(b.push(h[n]),w.push(r));if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");var E=o(y,x);for(n=0,N=w.length;N>n;n++)r=w[n],i[r]=[u(i[r][0]||0,s(E,b[n]))];g[v]=[E]}}return new l({data:g,size:[a,1]})};return p}t.name="lsolve",t.factory=n},function(e,t,r){"use strict";function n(e){var t=e.DenseMatrix,r=function(e,r,n){var i=e.size();if(2!==i.length)throw new RangeError("Matrix must be two dimensional (size: "+a.format(i)+")");var u=i[0],c=i[1];if(u!==c)throw new RangeError("Matrix must be square (size: "+a.format(i)+")");var f,l,p;if(r&&r.isMatrix===!0){var h=r.size();if(1===h.length){if(h[0]!==u)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],p=r._data,l=0;u>l;l++)f[l]=[p[l]];return new t({data:f,size:[u,1],datatype:r._datatype})}if(2===h.length){if(h[0]!==u||1!==h[1])throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");if(r.isDenseMatrix===!0){if(n){for(f=[],p=r._data,l=0;u>l;l++)f[l]=[p[l][0]];return new t({data:f,size:[u,1],datatype:r._datatype})}return r}for(f=[],l=0;u>l;l++)f[l]=[0];for(var m=r._values,d=r._index,g=r._ptr,v=g[1],y=g[0];v>y;y++)l=d[y],f[l][0]=m[y];return new t({data:f,size:[u,1],datatype:r._datatype})}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.")}if(s(r)){var x=o.size(r);if(1===x.length){if(x[0]!==u)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],l=0;u>l;l++)f[l]=[r[l]];return new t({data:f,size:[u,1]})}if(2===x.length){if(x[0]!==u||1!==x[1])throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(f=[],l=0;u>l;l++)f[l]=[r[l][0]];return new t({data:f,size:[u,1]})}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.")}};return r}var i=r(39),a=i.string,o=i.array,s=Array.isArray;t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=n(r(328)),u=n(r(329)),c=n(r(352)),f=n(r(350)),l=n(r(353)),p=n(r(349)),h=a("lusolve",{"Array, Array | Matrix":function(e,t){e=o(e);var r=s(e),n=d(r.L,r.U,r.p,null,t);return n.valueOf()},"DenseMatrix, Array | Matrix":function(e,t){var r=s(e);return d(r.L,r.U,r.p,null,t)},"SparseMatrix, Array | Matrix":function(e,t){var r=s(e);return d(r.L,r.U,r.p,null,t)},"SparseMatrix, Array | Matrix, number, number":function(e,t,r,n){var i=u(e,r,n);return d(i.L,i.U,i.p,i.q,t)},"Object, Array | Matrix":function(e,t){return d(e.L,e.U,e.p,e.q,t)}}),m=function(e){if(e&&e.isMatrix===!0)return e;if(i(e))return o(e);throw new TypeError("Invalid Matrix LU decomposition")},d=function(e,t,r,n,i){e=m(e),t=m(t),i=f(e,i,!1),r&&(i._data=c(r,i._data));var a=p(e,i),o=l(t,a);return n&&(o._data=c(n,o._data)),o};return h}var i=Array.isArray;t.name="lusolve",t.factory=n},function(e,t){"use strict";function r(){var e=function(e,t,r){var n,r=t.length,i=[];if(e)for(n=0;r>n;n++)i[e[n]]=t[n];else for(n=0;r>n;n++)i[n]=t[n];return i};return e}t.name="cs_ipvec",t.path="sparse",t.factory=r},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=n(r(80)),u=n(r(77)),c=n(r(48)),f=n(r(350)),l=e.DenseMatrix,p=i("usolve",{"SparseMatrix, Array | Matrix":function(e,t){return m(e,t)},"DenseMatrix, Array | Matrix":function(e,t){return h(e,t)},"Array, Array | Matrix":function(e,t){var r=a(e),n=h(r,t);return n.valueOf()}}),h=function(e,t){t=f(e,t,!0);for(var r=t._data,n=e._size[0],i=e._size[1],a=[],p=e._data,h=i-1;h>=0;h--){var m,d=r[h][0]||0;if(c(d,0))m=0;else{var g=p[h][h];if(c(g,0))throw new Error("Linear system cannot be solved since matrix is singular");m=o(d,g);for(var v=h-1;v>=0;v--)r[v]=[u(r[v][0]||0,s(m,p[v][h]))]}a[h]=[m]}return new l({data:a,size:[n,1]})},m=function(e,t){t=f(e,t,!0);for(var r,n,i=t._data,a=e._size[0],p=e._size[1],h=e._values,m=e._index,d=e._ptr,g=[],v=p-1;v>=0;v--){var y=i[v][0]||0;if(c(y,0))g[v]=[0];else{var x=0,b=[],w=[],N=d[v],E=d[v+1];for(n=E-1;n>=N;n--)r=m[n],r===v?x=h[n]:v>r&&(b.push(h[n]),w.push(r));if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");var M=o(y,x);for(n=0,E=w.length;E>n;n++)r=w[n],i[r]=[u(i[r][0],s(M,b[n]))];g[v]=[M]}}return new l({data:g,size:[a,1]})};return p}t.name="usolve",t.factory=n},function(e,t,r){e.exports=[r(86),r(51),r(53),r(355),r(357),r(358),r(317),r(359),r(361),r(363),r(364),r(365),r(366),r(367),r(368),r(371),r(374),r(375),r(376),r(84),r(377),r(379),r(82),r(380),r(382),r(369),r(383),r(77),r(78),r(384),r(385)]},function(e,t,r){"use strict";function n(e,t,n,o){function s(r,n){var i=r.arg()/3,o=r.abs(),s=new e.Complex(a(o),0).mul(new e.Complex(0,i).exp());if(n){var u=[s,new e.Complex(a(o),0).mul(new e.Complex(0,i+2*Math.PI/3).exp()),new e.Complex(a(o),0).mul(new e.Complex(0,i-2*Math.PI/3).exp())];return"Array"===t.matrix?u:l(u)}return s}function u(t){if(t.value&&t.value.isComplex){var r=t.clone();return r.value=1,
r=r.pow(1/3),r.value=s(t.value),r}var n=f(t.value);n&&(t.value=c(t.value));var i;i=t.value&&t.value.isBigNumber?new e.BigNumber(1).div(3):t.value&&t.value.isFraction?new e.Fraction(1,3):1/3;var r=t.pow(i);return n&&(r.value=c(r.value)),r}var c=n(r(78)),f=n(r(356)),l=n(r(52)),p=o("cbrt",{number:a,Complex:s,"Complex, boolean":s,BigNumber:function(e){return e.cbrt()},Unit:u,"Array | Matrix":function(e){return i(e,p,!0)}});return p.toTex={1:"\\sqrt[3]{${args[0]}}"},p}var i=r(19),a=Math.cbrt||function(e){if(0===e)return e;var t,r=0>e;return r&&(e=-e),isFinite(e)?(t=Math.exp(Math.log(e)/3),t=(e/(t*t)+2*t)/3):t=e,r?-t:t};t.name="cbrt",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isNegative",{number:function(e){return 0>e},BigNumber:function(e){return e.isNeg()&&!e.isZero()&&!e.isNaN()},Fraction:function(e){return e.s<0},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isNegative",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("ceil",{number:Math.ceil,Complex:function(e){return e.ceil()},BigNumber:function(e){return e.ceil()},Fraction:function(e){return e.ceil()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\left\\lceil${args[0]}\\right\\rceil"},a}var i=r(19);t.name="ceil",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cube",{number:function(e){return e*e*e},Complex:function(e){return e.mul(e).mul(e)},BigNumber:function(e){return e.times(e).times(e)},Fraction:function(e){return e.pow(3)},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.pow(3)}});return a.toTex={1:"\\left(${args[0]}\\right)^3"},a}var i=r(19);t.name="cube",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(81)),s=r(32),u=n(r(360)),c=n(r(61)),f=n(r(62)),l=n(r(85)),p=n(r(63)),h=n(r(57)),m=n(r(58)),d=i("dotDivide",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=h(e,t,o)}}return r},"Array, Array":function(e,t){return d(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return d(a(e),t)},"Matrix, Array":function(e,t){return d(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,o,!1);break;default:r=m(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,o,!0);break;default:r=m(t,e,o,!0)}return r},"Array, any":function(e,t){return m(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return m(a(t),e,o,!0).valueOf()}});return d.toTex={2:"\\left(${args[0]}"+s.operators.dotDivide+"${args[1]}\\right)"},d}t.name="dotDivide",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r,n){var u=e._data,c=e._size,f=e._datatype,l=t._values,p=t._index,h=t._ptr,m=t._size,d=t._datatype;if(c.length!==m.length)throw new i(c.length,m.length);if(c[0]!==m[0]||c[1]!==m[1])throw new RangeError("Dimension mismatch. Matrix A ("+c+") must match Matrix B ("+m+")");if(!l)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g,v=c[0],y=c[1],x=o,b=0,w=r;"string"==typeof f&&f===d&&(g=f,x=a.find(o,[g,g]),b=a.convert(0,g),w=a.find(r,[g,g]));for(var N=[],E=[],M=[],A=0;y>A;A++){M[A]=E.length;for(var _=h[A],O=h[A+1],T=_;O>T;T++){var C=p[T],S=n?w(l[T],u[C][A]):w(u[C][A],l[T]);x(S,b)||(E.push(C),N.push(S))}}return M[y]=E.length,new s({values:N,index:E,ptr:M,size:[v,y],datatype:g})};return u}var i=r(42);t.name="algorithm02",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(80)),s=r(32),u=n(r(360)),c=n(r(362)),f=n(r(85)),l=n(r(57)),p=n(r(58)),h=i("dotMultiply",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,o,!1);break;default:r=l(e,t,o)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,o,!1);break;default:r=p(e,t,o,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,o,!0);break;default:r=p(t,e,o,!0)}return r},"Array, any":function(e,t){return p(a(e),t,o,!1).valueOf()},"any, Array":function(e,t){return p(a(t),e,o,!0).valueOf()}});return h.toTex={2:"\\left(${args[0]}"+s.operators.dotMultiply+"${args[1]}\\right)"},h}t.name="dotMultiply",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));var E,M,A,_,O,T=n&&p?[]:void 0,C=[],S=[],z=new s({values:T,index:C,ptr:S,size:[y,x],datatype:v}),B=T?[]:void 0,k=[];for(M=0;x>M;M++){S[M]=C.length;var I=M+1;if(B)for(_=m[M],O=m[M+1],A=_;O>A;A++)E=h[A],k[E]=I,B[E]=p[A];for(_=c[M],O=c[M+1],A=_;O>A;A++)if(E=u[A],B){var R=k[E]===I?B[E]:w,P=N(n[A],R);b(P,w)||(C.push(E),T.push(P))}else C.push(E)}return S[x]=C.length,z};return u}var i=r(42);t.name="algorithm09",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(82)),s=r(32),u=n(r(61)),c=n(r(62)),f=n(r(85)),l=n(r(63)),p=n(r(57)),h=n(r(58)),m=i("dotPow",{"any, any":o,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,o,!1);break;default:r=u(t,e,o,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,o,!1);break;default:r=p(e,t,o)}}return r},"Array, Array":function(e,t){return m(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return m(a(e),t)},"Matrix, Array":function(e,t){return m(e,a(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(a(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(a(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.dotPow+"${args[1]}\\right)"},m}t.name="dotPow",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("exp",{number:Math.exp,Complex:function(e){return e.exp()},BigNumber:function(e){return e.exp()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\exp\\left(${args[0]}\\right)"},a}var i=r(19);t.name="exp",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("fix",{number:function(e){return e>0?Math.floor(e):Math.ceil(e)},Complex:function(t){return new e.Complex(t.re>0?Math.floor(t.re):Math.ceil(t.re),t.im>0?Math.floor(t.im):Math.ceil(t.im))},BigNumber:function(e){return e.isNegative()?e.ceil():e.floor()},Fraction:function(e){return e.s<0?e.ceil():e.floor()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="fix",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("floor",{number:Math.floor,Complex:function(e){return e.floor()},BigNumber:function(e){return e.floor()},Fraction:function(e){return e.floor()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\left\\lfloor${args[0]}\\right\\rfloor"},a}var i=r(19);t.name="floor",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(t,r){if(!t.isInt()||!r.isInt())throw new Error("Parameters in function gcd must be integer numbers");for(var n=new e.BigNumber(0);!r.isZero();){var i=t.mod(r);t=r,r=i}return t.lt(n)?t.neg():t}var s=n(r(52)),u=n(r(54)),c=n(r(55)),f=n(r(56)),l=n(r(57)),p=n(r(58)),h=a("gcd",{"number, number":i,"BigNumber, BigNumber":o,"Fraction, Fraction":function(e,t){return e.gcd(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(s(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(s(t),e,h,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(e,t,r){for(var n=h(e,t),i=0;i<r.length;i++)n=h(n,r[i]);return n}});return h.toTex="\\gcd\\left(${args}\\right)",h}function i(e,t){if(!a(e)||!a(t))throw new Error("Parameters in function gcd must be integer numbers");for(var r;0!=t;)r=e%t,e=t,t=r;return 0>e?-e:e}var a=r(6).isInteger;t.name="gcd",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){for(var t=0,r=0,n=0;n<e.length;n++){var i=s(e[n]);p(r,i)?(t=f(t,f(c(r,i),c(r,i))),t=u(t,1),r=i):t=u(t,h(i)?f(c(i,r),c(i,r)):i)}return f(r,l(t))}var s=n(r(86)),u=n(r(53)),c=n(r(81)),f=n(r(80)),l=n(r(369)),p=n(r(60)),h=n(r(370)),m=a("hypot",{"... number | BigNumber":o,Array:function(e){return m.apply(m,i(e))},Matrix:function(e){return m.apply(m,i(e.toArray()))}});return m.toTex="\\hypot\\left(${args}\\right)",m}var i=r(40).flatten;t.name="hypot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(r){return r>=0||t.predictable?Math.sqrt(r):new e.Complex(r,0).sqrt()}var o=n("sqrt",{number:a,Complex:function(e){return e.sqrt()},BigNumber:function(e){return!e.isNegative()||t.predictable?e.sqrt():a(e.toNumber())},"Array | Matrix":function(e){return i(e,o,!0)},Unit:function(e){return e.pow(.5)}});return o.toTex={1:"\\sqrt{${args[0]}}"},o}var i=r(19);t.name="sqrt",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isPositive",{number:function(e){return e>0},BigNumber:function(e){return!e.isNeg()&&!e.isZero()&&!e.isNaN()},Fraction:function(e){return e.s>0&&e.n>0},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isPositive",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(t,r){if(!t.isInt()||!r.isInt())throw new Error("Parameters in function lcm must be integer numbers");if(t.isZero()||r.isZero())return new e.BigNumber(0);for(var n=t.times(r);!r.isZero();){var i=r;r=t.mod(i),t=i}return n.div(t).abs()}var s=n(r(52)),u=n(r(360)),c=n(r(372)),f=n(r(85)),l=n(r(57)),p=n(r(58)),h=a("lcm",{"number, number":i,"BigNumber, BigNumber":o,"Fraction, Fraction":function(e,t){return e.lcm(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(s(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(s(t),e,h,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(e,t,r){for(var n=h(e,t),i=0;i<r.length;i++)n=h(n,r[i]);return n}});return h.toTex=void 0,h}function i(e,t){if(!a(e)||!a(t))throw new Error("Parameters in function lcm must be integer numbers");if(0==e||0==t)return 0;for(var r,n=e*t;0!=t;)r=t,t=e%r,e=r;return Math.abs(n/e)}var a=r(6).isInteger;t.name="lcm",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(48)),u=e.SparseMatrix,c=function(e,t,r){var n=e._values,c=e._size,f=e._datatype,l=t._values,p=t._size,h=t._datatype;if(c.length!==p.length)throw new a(c.length,p.length);if(c[0]!==p[0]||c[1]!==p[1])throw new RangeError("Dimension mismatch. Matrix A ("+c+") must match Matrix B ("+p+")");var m,d=c[0],g=c[1],v=s,y=0,x=r;"string"==typeof f&&f===h&&(m=f,v=o.find(s,[m,m]),y=o.convert(0,m),x=o.find(r,[m,m]));for(var b=n&&l?[]:void 0,w=[],N=[],E=new u({values:b,index:w,ptr:N,size:[d,g],datatype:m}),M=b?[]:void 0,A=[],_=[],O=0;g>O;O++){N[O]=w.length;var T=O+1;if(i(e,O,A,M,_,T,E,x),i(t,O,A,M,_,T,E,x),M)for(var C=N[O];C<w.length;){var S=w[C];if(_[S]===T){var z=M[S];v(z,y)?w.splice(C,1):(b.push(z),C++)}else w.splice(C,1)}else for(var B=N[O];B<w.length;){var k=w[B];_[k]!==T?w.splice(B,1):B++}}return N[g]=w.length,E};return c}var i=r(373),a=r(42);t.name="algorithm06",t.factory=n},function(e,t){"use strict";e.exports=function(e,t,r,n,i,a,o,s,u,c,f){var l,p,h,m,d=e._values,g=e._index,v=e._ptr,y=o._index;if(n)for(p=v[t],h=v[t+1],l=p;h>l;l++)m=g[l],r[m]!==a?(r[m]=a,y.push(m),c?(n[m]=u?s(d[l],f):s(f,d[l]),i[m]=a):n[m]=d[l]):(n[m]=u?s(d[l],n[m]):s(n[m],d[l]),i[m]=a);else for(p=v[t],h=v[t+1],l=p;h>l;l++)m=g[l],r[m]!==a?(r[m]=a,y.push(m)):i[m]=a}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(81)),s=a("log",{number:function(r){return r>=0||t.predictable?Math.log(r):new e.Complex(r,0).log()},Complex:function(e){return e.log()},BigNumber:function(r){return!r.isNegative()||t.predictable?r.ln():new e.Complex(r.toNumber(),0).log()},"Array | Matrix":function(e){return i(e,s)},"any, any":function(e,t){return o(s(e),s(t))}});return s.toTex={1:"\\ln\\left(${args[0]}\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}\\right)"},s}var i=r(19);t.name="log",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("log10",{number:function(r){return r>=0||t.predictable?a(r):new e.Complex(r,0).log().div(Math.LN10)},Complex:function(t){return new e.Complex(t).log().div(Math.LN10)},BigNumber:function(r){return!r.isNegative()||t.predictable?r.log():new e.Complex(r.toNumber(),0).log().div(Math.LN10)},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\log_{10}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.log10||function(e){return Math.log(e)/Math.LN10};t.name="log10",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(t>0)return e-t*Math.floor(e/t);if(0===t)return e;throw new Error("Cannot calculate mod for a negative divisor")}var o=n(r(52)),s=r(32),u=n(r(360)),c=n(r(61)),f=n(r(79)),l=n(r(85)),p=n(r(63)),h=n(r(57)),m=n(r(58)),d=i("mod",{"number, number":a,"BigNumber, BigNumber":function(e,t){return t.isZero()?e:e.mod(t)},"Fraction, Fraction":function(e,t){return e.mod(t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,d,!1);break;default:r=u(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,d,!1);break;default:r=h(e,t,d)}}return r},"Array, Array":function(e,t){return d(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return d(o(e),t)},"Matrix, Array":function(e,t){return d(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=p(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r},"Array, any":function(e,t){return m(o(e),t,d,!1).valueOf()},"any, Array":function(e,t){return m(o(t),e,d,!0).valueOf()}});return d.toTex={2:"\\left(${args[0]}"+s.operators.mod+"${args[1]}\\right)"},d}t.name="mod",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){var r=e.size();if(1==r.length){if(t===Number.POSITIVE_INFINITY||"inf"===t){var n=0;return e.forEach(function(e){var t=o(e);p(t,n)&&(n=t)},!0),n}if(t===Number.NEGATIVE_INFINITY||"-inf"===t){var i;return e.forEach(function(e){var t=o(e);i&&!h(t,i)||(i=t)},!0),i||0}if("fro"===t)return a(e,2);if("number"==typeof t&&!isNaN(t)){if(!l(t,0)){var m=0;return e.forEach(function(e){m=s(u(o(e),t),m)},!0),u(m,1/t)}return Number.POSITIVE_INFINITY}throw new Error("Unsupported parameter value")}if(2==r.length){if(1===t){var v=[],y=0;return e.forEach(function(e,t){var r=t[1],n=s(v[r]||0,o(e));p(n,y)&&(y=n),v[r]=n},!0),y}if(t===Number.POSITIVE_INFINITY||"inf"===t){var x=[],b=0;return e.forEach(function(e,t){var r=t[0],n=s(x[r]||0,o(e));p(n,b)&&(b=n),x[r]=n},!0),b}if("fro"===t)return c(d(f(g(e),e)));if(2===t)throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value")}}var o=n(r(86)),s=n(r(51)),u=n(r(82)),c=n(r(369)),f=n(r(84)),l=n(r(48)),p=n(r(64)),h=n(r(60)),m=n(r(52)),d=n(r(378)),g=n(r(335)),v=i("norm",{number:Math.abs,Complex:function(e){return e.abs()},BigNumber:function(e){return e.abs()},"boolean | null":function(e){return Math.abs(e)},Array:function(e){return a(m(e),2)},Matrix:function(e){return a(e,2)},"number | Complex | BigNumber | boolean | null, number | BigNumber | string":function(e){return v(e)},"Array, number | BigNumber | string":function(e,t){return a(m(e),t)},"Matrix, number | BigNumber | string":function(e,t){return a(e,t)}});return v.toTex={1:"\\left\\|${args[0]}\\right\\|",2:void 0},v}t.name="norm",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(51)),c=o("trace",{Array:function(e){return c(s(e))},Matrix:function(e){var t;switch(e.storage()){case"dense":t=f(e);break;case"sparse":t=l(e)}return t},any:i}),f=function(e){var t=e._size,r=e._data;switch(t.length){case 1:if(1==t[0])return i(r[0]);throw new RangeError("Matrix must be square (size: "+a(t)+")");case 2:var n=t[0],o=t[1];if(n===o){for(var s=0,c=0;n>c;c++)s=u(s,r[c][c]);return s}throw new RangeError("Matrix must be square (size: "+a(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+a(t)+")")}},l=function(e){var t=e._values,r=e._index,n=e._ptr,i=e._size,o=i[0],s=i[1];if(o===s){var c=0;if(t.length>0)for(var f=0;s>f;f++)for(var l=n[f],p=n[f+1],h=l;p>h;h++){var m=r[h];if(m===f){c=u(c,t[h]);break}if(m>f)break}return c}throw new RangeError("Matrix must be square (size: "+a(i)+")")};return c.toTex={1:"\\mathrm{tr}\\left(${args[0]}\\right)"},c}var i=r(3).clone,a=r(23).format;t.name="trace",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=e.BigNumber.precision,i=e.BigNumber.clone({precision:n+2}),a=new e.BigNumber(0),o=new i(1),s=r.isNegative();if(s&&(r=r.neg()),r.isZero())throw new Error("Root must be non-zero");if(t.isNegative()&&!r.abs().mod(2).equals(1))throw new Error("Root must be odd when a is negative.");if(t.isZero())return s?new i(1/0):0;if(!t.isFinite())return s?a:t;var u=t.abs().pow(o.div(r));return u=t.isNeg()?u.neg():u,new e.BigNumber((s?o.div(u):u).toPrecision(n))}var u=n(r(52)),c=n(r(54)),f=n(r(360)),l=n(r(372)),p=n(r(85)),h=n(r(57)),m=n(r(58)),d=o("nthRoot",{number:function(e){return i(e,2)},"number, number":i,BigNumber:function(t){return s(t,new e.BigNumber(2))},Complex:function(e){return a(e,2)},"Complex, number":a,"BigNumber, BigNumber":s,"Array | Matrix":function(e){return d(e,2)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=l(e,t,d);break;default:r=f(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=c(e,t,d,!1);break;default:r=h(e,t,d)}}return r},"Array, Array":function(e,t){return d(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return d(u(e),t)},"Matrix, Array":function(e,t){return d(e,u(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":if(1!==t.density())throw new Error("Root must be non-zero");r=p(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r},"Array, number | BigNumber":function(e,t){return d(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return d(e,u(t)).valueOf()}});return d.toTex={2:"\\sqrt[${args[1]}]{${args[0]}}"},d}function i(e,t){var r=0>t;if(r&&(t=-t),0===t)throw new Error("Root must be non-zero");if(0>e&&Math.abs(t)%2!=1)throw new Error("Root must be odd when a is negative.");if(0==e)return r?1/0:0;if(!isFinite(e))return r?0:e;var n=Math.pow(Math.abs(e),1/t);return n=0>e?-n:n,r?1/n:n}function a(e,t){if(0>t)throw new Error("Root must be greater than zero");if(0===t)throw new Error("Root must be non-zero");if(t%1!==0)throw new Error("Root must be an integer");for(var r=e.arg(),n=e.abs(),i=[],a=Math.pow(n,1/t),o=0;t>o;o++)i.push({r:a,phi:(r+2*Math.PI*o)/t});return i}t.name="nthRoot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var c=n(r(52)),f=n(r(48)),l=n(r(381)),p=n(r(85)),h=n(r(63)),m=n(r(58)),d=o("round",{number:Math.round,"number, number":function(e,t){if(!a(t))throw new TypeError(u);if(0>t||t>15)throw new Error("Number of decimals in function round must be in te range of 0-15");return i(e,t)},Complex:function(e){return e.round()},"Complex, number":function(e,t){if(t%1)throw new TypeError(u);return e.round(t)},"Complex, BigNumber":function(e,t){if(!t.isInteger())throw new TypeError(u);var r=t.toNumber();return e.round(r)},"number, BigNumber":function(t,r){if(!r.isInteger())throw new TypeError(u);return new e.BigNumber(t).toDecimalPlaces(r.toNumber())},BigNumber:function(e){return e.toDecimalPlaces(0)},"BigNumber, BigNumber":function(e,t){if(!t.isInteger())throw new TypeError(u);return e.toDecimalPlaces(t.toNumber())},Fraction:function(e){return e.round()},"Fraction, number":function(e,t){if(t%1)throw new TypeError(u);return e.round(t)},"Array | Matrix":function(e){return s(e,d,!0)},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=p(e,t,d,!1);break;default:r=m(e,t,d,!1)}return r},"number | Complex | BigNumber, Matrix":function(e,t){if(!f(e,0)){var r;switch(t.storage()){case"sparse":r=h(t,e,d,!0);break;default:r=m(t,e,d,!0)}return r}return l(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return m(c(e),t,d,!1).valueOf()},"number | Complex | BigNumber, Array":function(e,t){return m(c(t),e,d,!0).valueOf()}});return d.toTex={1:"\\left\\lfloor${args[0]}\\right\\rceil",2:void 0},d}function i(e,t){return parseFloat(o(e,t))}var a=r(6).isInteger,o=r(6).toFixed,s=r(19),u="Number of decimals in function round must be an integer";t.name="round",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=u(t),i=n?new e.BigNumber(0):0;if(c(t),r){var o=f(r);return t.length>0?o.resize(t,i):o}var s=[];return t.length>0?a(s,t,i):s}function u(e){var t=!1;return e.forEach(function(e,r,n){e&&e.isBigNumber===!0&&(t=!0,n[r]=e.toNumber())}),t}function c(e){e.forEach(function(e){if("number"!=typeof e||!i(e)||0>e)throw new Error("Parameters in function zeros must be positive integers")})}var f=n(r(52)),l=o("zeros",{"":function(){return"Array"===t.matrix?s([]):s([],"default")},"...number | BigNumber | string":function(e){var r=e[e.length-1];if("string"==typeof r){var n=e.pop();return s(e,n)}return"Array"===t.matrix?s(e):s(e,"default")},Array:s,Matrix:function(e){var t=e.storage();return s(e.valueOf(),t)},"Array | Matrix, string":function(e,t){return s(e.valueOf(),t)}});return l.toTex=void 0,l}var i=r(6).isInteger,a=r(40).resize;t.name="zeros",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sign",{number:i.sign,Complex:function(e){return e.sign()},BigNumber:function(t){return new e.BigNumber(t.cmp(0))},Fraction:function(t){return new e.Fraction(t.s,1)},"Array | Matrix":function(e){return a(e,o,!0)},Unit:function(e){return o(e.value)}});return o.toTex={1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},o}var i=r(6),a=r(19);t.name="sign",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("square",{number:function(e){return e*e},Complex:function(e){return e.mul(e)},BigNumber:function(e){return e.times(e)},Fraction:function(e){return e.mul(e)},"Array | Matrix":function(e){return i(e,a,!0)},Unit:function(e){return e.pow(2)}});return a.toTex={1:"\\left(${args[0]}\\right)^2"},a}var i=r(19);t.name="square",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("unaryPlus",{number:function(e){return e},Complex:function(e){return e},BigNumber:function(e){return e},Fraction:function(e){return e},Unit:function(e){return e.clone()},"Array | Matrix":function(e){return i(e,s,!0)},"boolean | string | null":function(r){return"BigNumber"==t.number?new e.BigNumber(+r):+r}});return s.toTex={1:o.operators.unaryPlus+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="unaryPlus",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,r){var n,a,o,s=0,c=1,f=1,l=0;if(!i(e)||!i(r))throw new Error("Parameters in function xgcd must be integer numbers");for(;r;)a=Math.floor(e/r),o=e%r,n=s,s=c-a*s,c=n,n=f,f=l-a*f,l=n,e=r,r=o;var p;return p=0>e?[-e,-c,-l]:[e,e?c:0,l],"Array"===t.matrix?p:u(p)}function s(r,n){var i,a,o,s=new e.BigNumber(0),c=new e.BigNumber(1),f=s,l=c,p=c,h=s;if(!r.isInt()||!n.isInt())throw new Error("Parameters in function xgcd must be integer numbers");for(;!n.isZero();)a=r.div(n).floor(),o=r.mod(n),i=f,f=l.minus(a.times(f)),l=i,i=p,p=h.minus(a.times(p)),h=i,r=n,n=o;var m;return m=r.lt(s)?[r.neg(),l.neg(),h.neg()]:[r,r.isZero()?0:l,h],"Array"===t.matrix?m:u(m)}var u=n(r(52)),c=a("xgcd",{"number, number":o,"BigNumber, BigNumber":s});return c.toTex=void 0,c}var i=r(6).isInteger;t.name="xgcd",t.factory=n},function(e,t,r){e.exports=[r(387),r(391),r(392),r(394),r(396),r(399),r(401)]},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(360)),f=n(r(372)),l=n(r(85)),p=n(r(57)),h=n(r(58)),m=o("bitAnd",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitAnd");return e&t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitAnd+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(388);t.name="bitAnd",t.factory=n},function(e,t,r){var n=r(389);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitAnd");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);if(e.isZero()||t.eq(-1)||e.eq(t))return e;if(t.isZero()||e.eq(-1))return t;if(!e.isFinite()||!t.isFinite()){if(!e.isFinite()&&!t.isFinite())return e.isNegative()==t.isNegative()?e:new r(0);if(!e.isFinite())return t.isNegative()?e:e.isNegative()?new r(0):t;if(!t.isFinite())return e.isNegative()?t:t.isNegative()?new r(0):e}return n(e,t,function(e,t){return e&t})}},function(e,t,r){function n(e){for(var t=e.d,r=t[0]+"",n=1;n<t.length;++n){for(var i=t[n]+"",a=7-i.length;a--;)i="0"+i;r+=i}var o;for(o=r.length-1;"0"==r.charAt(o);--o);var s=e.e,u=r.slice(0,o+1||1),c=u.length;if(s>0)if(++s>c)for(s-=c;s--;u+="0");else c>s&&(u=u.slice(0,s)+"."+u.slice(s));for(var f=[0],n=0;n<u.length;){for(var l=f.length;l--;f[l]*=10);f[0]+=u.charAt(n++)<<0;for(var o=0;o<f.length;++o)f[o]>1&&(null==f[o+1]&&(f[o+1]=0),f[o+1]+=f[o]>>1,f[o]&=1)}return f.reverse()}var i=r(390);e.exports=function(e,t,r){var a,o,s=e.constructor,u=+(e.s<0),c=+(t.s<0);if(u){a=n(i(e));for(var f=0;f<a.length;++f)a[f]^=1}else a=n(e);if(c){o=n(i(t));for(var f=0;f<o.length;++f)o[f]^=1}else o=n(t);var l,p,h;a.length<=o.length?(l=a,p=o,h=u):(l=o,p=a,h=c);var m=l.length,d=p.length,g=1^r(u,c),v=new s(1^g),y=new s(1),x=new s(2),b=s.precision;for(s.config({precision:1e9});m>0;)r(l[--m],p[--d])==g&&(v=v.plus(y)),y=y.times(x);for(;d>0;)r(h,p[--d])==g&&(v=v.plus(y)),y=y.times(x);return s.config({precision:b}),0==g&&(v.s=-v.s),v}},function(e,t){e.exports=function(e){if(e.isFinite()&&!e.isInteger())throw new Error("Integer expected in function bitNot");var t=e.constructor,r=t.precision;t.config({precision:1e9});var e=e.plus(new t(1));return e.s=-e.s||null,t.config({precision:r}),e}},function(e,t,r){"use strict";function n(e,t,n,s){var u=r(32),c=s("bitNot",{number:function(e){if(!o(e))throw new Error("Integer expected in function bitNot");return~e},BigNumber:a,"Array | Matrix":function(e){return i(e,c)}});return c.toTex={1:u.operators.bitNot+"\\left(${args[0]}\\right)"},c}var i=r(19),a=r(390),o=r(6).isInteger;t.name="bitNot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(54)),f=n(r(55)),l=n(r(56)),p=n(r(57)),h=n(r(58)),m=o("bitOr",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitOr");return e|t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitOr+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(393);t.name="bitOr",t.factory=n},function(e,t,r){var n=r(389);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitOr");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);var i=new r(-1);return e.isZero()||t.eq(i)||e.eq(t)?t:t.isZero()||e.eq(i)?e:e.isFinite()&&t.isFinite()?n(e,t,function(e,t){return e|t}):!e.isFinite()&&!e.isNegative()&&t.isNegative()||e.isNegative()&&!t.isNegative()&&!t.isFinite()?i:e.isNegative()&&t.isNegative()?e.isFinite()?e:t:e.isFinite()?t:e}},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(61)),f=n(r(62)),l=n(r(63)),p=n(r(57)),h=n(r(58)),m=o("bitXor",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function bitXor");return e^t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){
return m(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return m(u(e),t)},"Matrix, Array":function(e,t){return m(e,u(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return h(u(e),t,m,!1).valueOf()},"any, Array":function(e,t){return h(u(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+s.operators.bitXor+"${args[1]}\\right)"},m}var i=r(6).isInteger,a=r(395);t.name="bitXor",t.factory=n},function(e,t,r){var n=r(389),i=r(390);e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function bitXor");var r=e.constructor;if(e.isNaN()||t.isNaN())return new r(NaN);if(e.isZero())return t;if(t.isZero())return e;if(e.eq(t))return new r(0);var a=new r(-1);return e.eq(a)?i(t):t.eq(a)?i(e):e.isFinite()&&t.isFinite()?n(e,t,function(e,t){return e^t}):e.isFinite()||t.isFinite()?new r(e.isNegative()==t.isNegative()?1/0:-(1/0)):a}},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(48)),f=n(r(381)),l=n(r(54)),p=n(r(360)),h=n(r(398)),m=n(r(56)),d=n(r(85)),g=n(r(57)),v=n(r(58)),y=o("leftShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function leftShift");return e<<t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=h(e,t,y,!1);break;default:r=p(t,e,y,!0)}break;default:switch(t.storage()){case"sparse":r=l(e,t,y,!1);break;default:r=g(e,t,y)}}return r},"Array, Array":function(e,t){return y(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return y(u(e),t)},"Matrix, Array":function(e,t){return y(e,u(t))},"Matrix, number | BigNumber":function(e,t){if(!c(t,0)){var r;switch(e.storage()){case"sparse":r=d(e,t,y,!1);break;default:r=v(e,t,y,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!c(e,0)){var r;switch(t.storage()){case"sparse":r=m(t,e,y,!0);break;default:r=v(t,e,y,!0)}return r}return f(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return y(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return y(e,u(t)).valueOf()}});return y.toTex={2:"\\left(${args[0]}"+s.operators.leftShift+"${args[1]}\\right)"},y}var i=r(6).isInteger,a=r(397);t.name="leftShift",t.factory=n},function(e,t){e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function leftShift");var r=e.constructor;return e.isNaN()||t.isNaN()||t.isNegative()&&!t.isZero()?new r(NaN):e.isZero()||t.isZero()?e:e.isFinite()||t.isFinite()?t.lt(55)?e.times(Math.pow(2,t.toNumber())+""):e.times(new r(2).pow(t)):new r(NaN)}},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(48)),s=e.SparseMatrix,u=function(e,t,r){var n=e._values,u=e._index,c=e._ptr,f=e._size,l=e._datatype,p=t._values,h=t._index,m=t._ptr,d=t._size,g=t._datatype;if(f.length!==d.length)throw new i(f.length,d.length);if(f[0]!==d[0]||f[1]!==d[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+d+")");if(!n||!p)throw new Error("Cannot perform operation on Pattern Sparse Matrices");var v,y=f[0],x=f[1],b=o,w=0,N=r;"string"==typeof l&&l===g&&(v=l,b=a.find(o,[v,v]),w=a.convert(0,v),N=a.find(r,[v,v]));for(var E,M,A,_,O=[],T=[],C=[],S=new s({values:O,index:T,ptr:C,size:[y,x],datatype:v}),z=[],B=[],k=0;x>k;k++){C[k]=T.length;var I=k+1;for(M=c[k],A=c[k+1],E=M;A>E;E++)_=u[E],B[_]=I,z[_]=n[E],T.push(_);for(M=m[k],A=m[k+1],E=M;A>E;E++)_=h[E],B[_]===I&&(z[_]=N(z[_],p[E]));for(E=C[k];E<T.length;){_=T[E];var R=z[_];b(R,w)?T.splice(E,1):(O.push(R),E++)}}return C[x]=T.length,S};return u}var i=r(42);t.name="algorithm08",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=r(32),u=n(r(52)),c=n(r(48)),f=n(r(381)),l=n(r(54)),p=n(r(360)),h=n(r(398)),m=n(r(56)),d=n(r(85)),g=n(r(57)),v=n(r(58)),y=o("rightArithShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function rightArithShift");return e>>t},"BigNumber, BigNumber":a,"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=h(e,t,y,!1);break;default:r=p(t,e,y,!0)}break;default:switch(t.storage()){case"sparse":r=l(e,t,y,!1);break;default:r=g(e,t,y)}}return r},"Array, Array":function(e,t){return y(u(e),u(t)).valueOf()},"Array, Matrix":function(e,t){return y(u(e),t)},"Matrix, Array":function(e,t){return y(e,u(t))},"Matrix, number | BigNumber":function(e,t){if(!c(t,0)){var r;switch(e.storage()){case"sparse":r=d(e,t,y,!1);break;default:r=v(e,t,y,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!c(e,0)){var r;switch(t.storage()){case"sparse":r=m(t,e,y,!0);break;default:r=v(t,e,y,!0)}return r}return f(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return y(u(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return y(e,u(t)).valueOf()}});return y.toTex={2:"\\left(${args[0]}"+s.operators.rightArithShift+"${args[1]}\\right)"},y}var i=r(6).isInteger,a=r(400);t.name="rightArithShift",t.factory=n},function(e,t){e.exports=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Integers expected in function rightArithShift");var r=e.constructor;return e.isNaN()||t.isNaN()||t.isNegative()&&!t.isZero()?new r(NaN):e.isZero()||t.isZero()?e:t.isFinite()?t.lt(55)?e.div(Math.pow(2,t.toNumber())+"").floor():e.div(new r(2).pow(t)).floor():new r(e.isNegative()?-1:e.isFinite()?0:NaN)}},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=n(r(52)),u=n(r(48)),c=n(r(381)),f=n(r(54)),l=n(r(360)),p=n(r(398)),h=n(r(56)),m=n(r(85)),d=n(r(57)),g=n(r(58)),v=a("rightLogShift",{"number, number":function(e,t){if(!i(e)||!i(t))throw new Error("Integers expected in function rightLogShift");return e>>>t},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=p(e,t,v,!1);break;default:r=l(t,e,v,!0)}break;default:switch(t.storage()){case"sparse":r=f(e,t,v,!1);break;default:r=d(e,t,v)}}return r},"Array, Array":function(e,t){return v(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return v(s(e),t)},"Matrix, Array":function(e,t){return v(e,s(t))},"Matrix, number | BigNumber":function(e,t){if(!u(t,0)){var r;switch(e.storage()){case"sparse":r=m(e,t,v,!1);break;default:r=g(e,t,v,!1)}return r}return e.clone()},"number | BigNumber, Matrix":function(e,t){if(!u(e,0)){var r;switch(t.storage()){case"sparse":r=h(t,e,v,!0);break;default:r=g(t,e,v,!0)}return r}return c(t.size(),t.storage())},"Array, number | BigNumber":function(e,t){return v(s(e),t).valueOf()},"number | BigNumber, Array":function(e,t){return v(e,s(t)).valueOf()}});return v.toTex={2:"\\left(${args[0]}"+o.operators.rightLogShift+"${args[1]}\\right)"},v}var i=r(6).isInteger;t.name="rightLogShift",t.factory=n},function(e,t,r){e.exports=[r(403),r(409),r(404),r(410)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(404)),s=n(r(356)),u=n(r(408)),c=i("bellNumbers",{"number | BigNumber":function(e){if(!u(e)||s(e))throw new TypeError("Non-negative integer value expected in function bellNumbers");for(var t=0,r=0;e>=r;r++)t=a(t,o(e,r));return t}});return c.toTex={1:"\\mathrm{B}_{${args[0]}}"},c}t.name="bellNumbers",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(77)),s=n(r(84)),u=n(r(317)),c=n(r(82)),f=n(r(405)),l=n(r(407)),p=n(r(356)),h=n(r(408)),m=n(r(64)),d=i("stirlingS2",{"number | BigNumber, number | BigNumber":function(e,t){if(!h(e)||p(e)||!h(t)||p(t))throw new TypeError("Non-negative integer value expected in function stirlingS2");if(m(t,e))throw new TypeError("k must be less than or equal to n in function stirlingS2");for(var r=f(t),n=0,i=0;t>=i;i++){var d=c(-1,o(t,i)),g=l(t,i),v=c(i,e);n=a(n,s(s(g,v),d))}return u(n,r)}});return d.toTex={2:"\\mathrm{S}\\left(${args}\\right)"},d}t.name="stirlingS2",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(406)),s=r(32),u=a("factorial",{number:function(e){if(0>e)throw new Error("Value must be non-negative");return o(e+1)},BigNumber:function(e){if(e.isNegative())throw new Error("Value must be non-negative");return o(e.plus(1))},"Array | Matrix":function(e){return i(e,u)}});return u.toTex={1:"\\left(${args[0]}\\right)"+s.operators.factorial},u}var i=r(19);t.name="factorial",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(r){if(r.isZero())return new e.BigNumber(1);for(var n=t.precision+(0|Math.log(r.toNumber())),i=e.BigNumber.clone({precision:n}),a=new i(r),o=r.toNumber()-1;o>1;)a=a.times(o),o--;return new e.BigNumber(a.toPrecision(e.BigNumber.precision))}var f=n(r(84)),l=n(r(82)),p=u("gamma",{number:function(e){var t,r;if(a(e)){if(0>=e)return isFinite(e)?1/0:NaN;if(e>171)return 1/0;for(var n=e-2,i=e-1;n>1;)i*=n,n--;return 0==i&&(i=1),i}if(.5>e)return Math.PI/(Math.sin(Math.PI*e)*p(1-e));if(e>=171.35)return 1/0;if(e>85){var u=e*e,c=u*e,f=c*e,l=f*e;return Math.sqrt(2*Math.PI/e)*Math.pow(e/Math.E,e)*(1+1/(12*e)+1/(288*u)-139/(51840*c)-571/(2488320*f)+163879/(209018880*l)+5246819/(75246796800*l*e))}--e,r=s[0];for(var h=1;h<s.length;++h)r+=s[h]/(e+h);return t=e+o+.5,Math.sqrt(2*Math.PI)*Math.pow(t,e+.5)*Math.exp(-t)*r},Complex:function(t){var r,n;if(0==t.im)return p(t.re);t=new e.Complex(t.re-1,t.im),n=new e.Complex(s[0],0);for(var i=1;i<s.length;++i){var a=t.re+i,u=a*a+t.im*t.im;0!=u?(n.re+=s[i]*a/u,n.im+=-(s[i]*t.im)/u):n.re=s[i]<0?-(1/0):1/0}r=new e.Complex(t.re+o+.5,t.im);var c=Math.sqrt(2*Math.PI);t.re+=.5;var h=l(r,t);0==h.im?h.re*=c:0==h.re?h.im*=c:(h.re*=c,h.im*=c);var m=Math.exp(-r.re);return r.re=m*Math.cos(-r.im),r.im=m*Math.sin(-r.im),f(f(h,r),n)},BigNumber:function(t){if(t.isInteger())return t.isNegative()||t.isZero()?new e.BigNumber(1/0):c(t.minus(1));if(!t.isFinite())return new e.BigNumber(t.isNegative()?NaN:1/0);throw new Error("Integer BigNumber expected")},"Array | Matrix":function(e){return i(e,p)}});return p.toTex={1:"\\Gamma\\left(${args[0]}\\right)"},p}var i=r(19),a=r(6).isInteger,o=4.7421875,s=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];t.name="gamma",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("combinations",{"number, number":function(e,t){var r,n,i;if(!a(e)||0>e)throw new TypeError("Positive integer value expected in function combinations");if(!a(t)||0>t)throw new TypeError("Positive integer value expected in function combinations");if(t>e)throw new TypeError("k must be less than or equal to n");for(r=Math.max(t,e-t),n=1,i=1;e-r>=i;i++)n=n*(r+i)/i;return n},"BigNumber, BigNumber":function(t,r){var n,a,o,s,u=new e.BigNumber(1);if(!i(t)||!i(r))throw new TypeError("Positive integer value expected in function combinations");if(r.gt(t))throw new TypeError("k must be less than n in function combinations");for(n=t.minus(r),r.lt(n)&&(n=r),a=u,o=u,s=t.minus(n);o.lte(s);o=o.plus(1))a=a.times(n.plus(o)).dividedBy(o);return a}});return o.toTex={2:"\\binom{${args[0]}}{${args[1]}}"},o}function i(e){return e.isInteger()&&e.gte(0)}var a=r(6).isInteger;t.name="combinations",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("isInteger",{number:a.isInteger,BigNumber:function(e){return e.isInt()},Fraction:function(e){return 1===e.d&&isFinite(e.n)},"Array | Matrix":function(e){return i(e,o)}});return o}var i=r(19),a=r(6);t.name="isInteger",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(407)),o=n(r(53)),s=n(r(370)),u=n(r(408)),c=n(r(64)),f=i("composition",{"number | BigNumber, number | BigNumber":function(e,t){if(!(u(e)&&s(e)&&u(t)&&s(t)))throw new TypeError("Positive integer value expected in function composition");if(c(t,e))throw new TypeError("k must be less than or equal to n in function composition");return a(o(e,-1),o(t,-1))}});return f.toTex=void 0,f}t.name="composition",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(51)),o=n(r(317)),s=n(r(84)),u=n(r(407)),c=n(r(356)),f=n(r(408)),l=i("catalan",{"number | BigNumber":function(e){if(!f(e)||c(e))throw new TypeError("Non-negative integer value expected in function catalan");return o(u(s(e,2),e),a(e,1))}});return l.toTex={1:"\\mathrm{C}_{${args[0]}}"},l}t.name="catalan",t.factory=n},function(e,t,r){e.exports=[r(412),r(413),r(414),r(415)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("arg",{number:function(e){return Math.atan2(0,e)},Complex:function(e){return e.arg()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\arg\\left(${args[0]}\\right)"},a}var i=r(19);t.name="arg",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("conj",{number:function(e){return e},BigNumber:function(e){return e},Complex:function(e){return e.conjugate()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\left(${args[0]}\\right)^*"},a}var i=r(19);t.name="conj",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("im",{number:function(e){return 0},BigNumber:function(t){return new e.BigNumber(0)},Complex:function(e){return e.im},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\Im\\left\\lbrace${args[0]}\\right\\rbrace"},a}var i=r(19);t.name="im",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("re",{number:function(e){return e},BigNumber:function(e){return e},Complex:function(e){return e.re},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\Re\\left\\lbrace${args[0]}\\right\\rbrace"},a}var i=r(19);t.name="re",t.factory=n},function(e,t,r){e.exports=[r(417),r(418)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e){return 2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]}function o(e){return 3===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]}function s(e){return 4===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]&&"number"==typeof e[3]}function u(e,r,n,i){var a=e,o=n,s=d(a,r),u=d(o,i),c=s[0]*u[1]-u[0]*s[1];if(l(c)<t.epsilon)return null;var f=(u[0]*a[1]-u[1]*a[0]-u[0]*o[1]+u[1]*o[0])/c;return p(m(s,f),a)}function c(e,t,r,n,i,a,o,s,u,c,f,l){var p=(e-o)*(c-o)+(t-s)*(f-s)+(r-u)*(l-u),h=(c-o)*(n-e)+(f-s)*(i-t)+(l-u)*(a-r),m=(e-o)*(n-e)+(t-s)*(i-t)+(r-u)*(a-r),d=(c-o)*(c-o)+(f-s)*(f-s)+(l-u)*(l-u),g=(n-e)*(n-e)+(i-t)*(i-t)+(a-r)*(a-r),v=(p*h-m*d)/(g*d-h*h),y=(p+v*h)/d,x=e+v*(n-e),b=t+v*(i-t),w=r+v*(a-r),N=o+y*(c-o),E=s+y*(f-s),M=u+y*(l-u);return x===N&&b===E&&w===M?[x,b,w]:null}function f(e,t,r,n,i,a,o,s,u,c){var f=(c-e*o-t*s-r*u)/(n*o+i*s+a*u-e-t-r),l=e+f*(n-e),p=t+f*(i-t),h=r+f*(a-r);return[l,p,h]}var l=n(r(86)),p=n(r(51)),h=n(r(52)),m=n(r(84)),d=n(r(77)),g=i("intersect",{"Array, Array, Array":function(e,t,r){if(!o(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 3 numbers expected for second argument");if(!s(r))throw new TypeError("Array with 4 numbers expected as third argument");return f(e[0],e[1],e[2],t[0],t[1],t[2],r[0],r[1],r[2],r[3])},"Array, Array, Array, Array":function(e,t,r,n){if(2===e.length){if(!a(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 2 numbers expected for second argument");if(!a(r))throw new TypeError("Array with 2 numbers expected for third argument");if(!a(n))throw new TypeError("Array with 2 numbers expected for fourth argument");return u(e,t,r,n)}if(3===e.length){if(!o(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 3 numbers expected for second argument");if(!o(r))throw new TypeError("Array with 3 numbers expected for third argument");if(!o(n))throw new TypeError("Array with 3 numbers expected for fourth argument");return c(e[0],e[1],e[2],t[0],t[1],t[2],r[0],r[1],r[2],n[0],n[1],n[2])}throw new TypeError("Arrays with two or thee dimensional points expected")},"Matrix, Matrix, Matrix":function(e,t,r){return h(g(e.valueOf(),t.valueOf(),r.valueOf()))},"Matrix, Matrix, Matrix, Matrix":function(e,t,r,n){return h(g(e.valueOf(),t.valueOf(),r.valueOf(),n.valueOf()))}});return g}t.name="intersect",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,s){var m=(n(r(52)),s("distance",{"Array, Array, Array":function(e,t,r){if(2==e.length&&2==t.length&&2==r.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!i(t))throw new TypeError("Array with 2 numbers expected for second argument");if(!i(r))throw new TypeError("Array with 2 numbers expected for third argument");var n=(r[1]-r[0])/(t[1]-t[0]),a=n*n*t[0],o=-1*(n*t[0]),s=e[1];return c(e[0],e[1],a,o,s)}throw new TypeError("Invalid Arguments: Try again")},"Object, Object, Object":function(e,t,r){if(2==Object.keys(e).length&&2==Object.keys(t).length&&2==Object.keys(r).length){if(!i(e))throw new TypeError("Values of pointX and pointY should be numbers");if(!i(t))throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers");if(!i(r))throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("lineOnePtX")&&t.hasOwnProperty("lineOnePtY")&&r.hasOwnProperty("lineTwoPtX")&&r.hasOwnProperty("lineTwoPtY")){var n=(r.lineTwoPtY-r.lineTwoPtX)/(t.lineOnePtY-t.lineOnePtX),a=n*n*t.lineOnePtX,o=-1*(n*t.lineOnePtX),s=e.pointX;return c(e.pointX,e.pointY,a,o,s)}throw new TypeError("Key names do not match")}throw new TypeError("Invalid Arguments: Try again")},"Array, Array":function(e,t){if(2==e.length&&3==t.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 3 numbers expected for second argument");return c(e[0],e[1],t[0],t[1],t[2])}if(3==e.length&&6==t.length){if(!a(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!o(t))throw new TypeError("Array with 6 numbers expected for second argument");return f(e[0],e[1],e[2],t[0],t[1],t[2],t[3],t[4],t[5])}if(2==e.length&&2==t.length){if(!i(e))throw new TypeError("Array with 2 numbers expected for first argument");if(!i(t))throw new TypeError("Array with 2 numbers expected for second argument");return l(e[0],e[1],t[0],t[1])}if(3==e.length&&3==t.length){if(!a(e))throw new TypeError("Array with 3 numbers expected for first argument");if(!a(t))throw new TypeError("Array with 3 numbers expected for second argument");return p(e[0],e[1],e[2],t[0],t[1],t[2])}throw new TypeError("Invalid Arguments: Try again")},"Object, Object":function(e,t){if(2==Object.keys(e).length&&3==Object.keys(t).length){if(!i(e))throw new TypeError("Values of pointX and pointY should be numbers");if(!a(t))throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("xCoeffLine")&&t.hasOwnProperty("yCoeffLine")&&t.hasOwnProperty("yCoeffLine"))return c(e.pointX,e.pointY,t.xCoeffLine,t.yCoeffLine,t.constant);throw new TypeError("Key names do not match")}if(3==Object.keys(e).length&&6==Object.keys(t).length){if(!a(e))throw new TypeError("Values of pointX, pointY and pointZ should be numbers");if(!o(t))throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers");if(e.hasOwnProperty("pointX")&&e.hasOwnProperty("pointY")&&t.hasOwnProperty("x0")&&t.hasOwnProperty("y0")&&t.hasOwnProperty("z0")&&t.hasOwnProperty("a")&&t.hasOwnProperty("b")&&t.hasOwnProperty("c"))return f(e.pointX,e.pointY,e.pointZ,t.x0,t.y0,t.z0,t.a,t.b,t.c);throw new TypeError("Key names do not match")}if(2==Object.keys(e).length&&2==Object.keys(t).length){if(!i(e))throw new TypeError("Values of pointOneX and pointOneY should be numbers");if(!i(t))throw new TypeError("Values of pointTwoX and pointTwoY should be numbers");if(e.hasOwnProperty("pointOneX")&&e.hasOwnProperty("pointOneY")&&t.hasOwnProperty("pointTwoX")&&t.hasOwnProperty("pointTwoY"))return l(e.pointOneX,e.pointOneY,t.pointTwoX,t.pointTwoY);throw new TypeError("Key names do not match")}if(3==Object.keys(e).length&&3==Object.keys(t).length){if(!a(e))throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers");if(!a(t))throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers");if(e.hasOwnProperty("pointOneX")&&e.hasOwnProperty("pointOneY")&&e.hasOwnProperty("pointOneZ")&&t.hasOwnProperty("pointTwoX")&&t.hasOwnProperty("pointTwoY")&&t.hasOwnProperty("pointTwoZ"))return p(e.pointOneX,e.pointOneY,e.pointOneZ,t.pointTwoX,t.pointTwoY,t.pointTwoZ);throw new TypeError("Key names do not match")}throw new TypeError("Invalid Arguments: Try again")},Array:function(e){if(!u(e))throw new TypeError("Incorrect array format entered for pairwise distance calculation");return h(e)}}));return m}function i(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]}function a(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]}function o(e){return e.constructor!==Array&&(e=s(e)),"number"==typeof e[0]&&"number"==typeof e[1]&&"number"==typeof e[2]&&"number"==typeof e[3]&&"number"==typeof e[4]&&"number"==typeof e[5]}function s(e){for(var t=Object.keys(e),r=[],n=0;n<t.length;n++)r.push(e[t[n]]);return r}function u(e){if(2==e[0].length&&"number"==typeof e[0][0]&&"number"==typeof e[0][1]){for(var t in e)if(2!=e[t].length||"number"!=typeof e[t][0]||"number"!=typeof e[t][1])return!1}else{if(3!=e[0].length||"number"!=typeof e[0][0]||"number"!=typeof e[0][1]||"number"!=typeof e[0][2])return!1;for(var t in e)if(3!=e[t].length||"number"!=typeof e[t][0]||"number"!=typeof e[t][1]||"number"!=typeof e[t][2])return!1}return!0}function c(e,t,r,n,i){var a=Math.abs(r*e+n*t+i),o=Math.pow(r*r+n*n,.5),s=a/o;return s}function f(e,t,r,n,i,a,o,s,u){var c=[(i-t)*u-(a-r)*s,(a-r)*o-(n-e)*u,(n-e)*s-(i-t)*o];c=Math.pow(c[0]*c[0]+c[1]*c[1]+c[2]*c[2],.5);var f=Math.pow(o*o+s*s+u*u,.5),l=c/f;return l}function l(e,t,r,n){var i=n-t,a=r-e,o=i*i+a*a,s=Math.pow(o,.5);return s}function p(e,t,r,n,i,a){var o=a-r,s=i-t,u=n-e,c=o*o+s*s+u*u,f=Math.pow(c,.5);return f}function h(e){for(var t=[],r=0;r<e.length-1;r++)for(var n=r+1;n<e.length;n++)2==e[0].length?t.push(l(e[r][0],e[r][1],e[n][0],e[n][1])):3==e[0].length&&t.push(p(e[r][0],e[r][1],e[r][2],e[n][0],e[n][1],e[n][2]));return t}t.name="distance",t.factory=n},function(e,t,r){e.exports=[r(420),r(421),r(423),r(424)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(381)),u=n(r(421)),c=(n(r(422)),n(r(360))),f=n(r(372)),l=n(r(85)),p=n(r(57)),h=n(r(58)),m=i("and",{"number, number":function(e,t){return!(!e||!t)},"Complex, Complex":function(e,t){return!(0===e.re&&0===e.im||0===t.re&&0===t.im)},"BigNumber, BigNumber":function(e,t){return!(e.isZero()||t.isZero()||e.isNaN()||t.isNaN())},"Unit, Unit":function(e,t){return m(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=c(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=c(e,t,m,!1);break;default:r=p(e,t,m)}}return r},"Array, Array":function(e,t){return m(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return m(o(e),t)},"Matrix, Array":function(e,t){return m(e,o(t))},"Matrix, any":function(e,t){if(u(t))return s(e.size(),e.storage());var r;switch(e.storage()){case"sparse":r=l(e,t,m,!1);break;default:r=h(e,t,m,!1)}return r},"any, Matrix":function(e,t){if(u(e))return s(e.size(),e.storage());var r;switch(t.storage()){case"sparse":r=l(t,e,m,!0);break;default:r=h(t,e,m,!0)}return r},"Array, any":function(e,t){return m(o(e),t).valueOf()},"any, Array":function(e,t){return m(e,o(t)).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+a.operators.and+"${args[1]}\\right)"},m}t.name="and",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=r(32),s=a("not",{number:function(e){return!e},Complex:function(e){return 0===e.re&&0===e.im},BigNumber:function(e){return e.isZero()||e.isNaN()},Unit:function(e){return s(e.value)},"Array | Matrix":function(e){return i(e,s)}});return s.toTex={1:o.operators.not+"\\left(${args[0]}\\right)"},s}var i=r(19);t.name="not",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("isZero",{number:function(e){return 0===e},BigNumber:function(e){return e.isZero()},Complex:function(e){return 0===e.re&&0===e.im},Fraction:function(e){return 1===e.d&&0===e.n},Unit:function(e){return a(e.value)},"Array | Matrix":function(e){return i(e,a)}});return a}var i=r(19);r(6);t.name="isZero",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(61)),u=n(r(79)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=i("or",{"number, number":function(e,t){return!(!e&&!t)},"Complex, Complex":function(e,t){return 0!==e.re||0!==e.im||0!==t.re||0!==t.im},"BigNumber, BigNumber":function(e,t){return!e.isZero()&&!e.isNaN()||!t.isZero()&&!t.isNaN()},"Unit, Unit":function(e,t){return p(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,p);break;default:r=s(t,e,p,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,p,!1);break;default:r=f(e,t,p)}}return r},"Array, Array":function(e,t){return p(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return p(o(e),t)},"Matrix, Array":function(e,t){return p(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,p,!1);break;default:r=l(e,t,p,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,p,!0);break;default:r=l(t,e,p,!0)}return r},"Array, any":function(e,t){return l(o(e),t,p,!1).valueOf()},"any, Array":function(e,t){return l(o(t),e,p,!0).valueOf()}});return p.toTex={2:"\\left(${args[0]}"+a.operators.or+"${args[1]}\\right)"},p}t.name="or",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(61)),u=n(r(62)),c=n(r(63)),f=n(r(57)),l=n(r(58)),p=i("xor",{"number, number":function(e,t){return!!(!!e^!!t)},"Complex, Complex":function(e,t){return(0!==e.re||0!==e.im)!=(0!==t.re||0!==t.im)},"BigNumber, BigNumber":function(e,t){return(!e.isZero()&&!e.isNaN())!=(!t.isZero()&&!t.isNaN())},"Unit, Unit":function(e,t){return p(e.value,t.value)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,p);break;default:r=s(t,e,p,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,p,!1);break;default:r=f(e,t,p)}}return r},"Array, Array":function(e,t){return p(o(e),o(t)).valueOf()},"Array, Matrix":function(e,t){return p(o(e),t)},"Matrix, Array":function(e,t){return p(e,o(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,p,!1);break;default:r=l(e,t,p,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=c(t,e,p,!0);break;default:r=l(t,e,p,!0)}return r},"Array, any":function(e,t){return l(o(e),t,p,!1).valueOf()},"any, Array":function(e,t){return l(o(t),e,p,!0).valueOf()}});return p.toTex={2:"\\left(${args[0]}"+a.operators.xor+"${args[1]}\\right)"},p}t.name="xor",t.factory=n},function(e,t,r){e.exports=[r(301),r(426),r(319),r(427),r(428),r(83),r(303),r(429),r(305),r(318),r(308),r(430),r(431),r(323),r(433),r(434),r(435),r(436),r(276),r(378),r(335),r(381)]},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){var r=i(e),n=i(t);if(1!=r.length||1!=n.length||3!=r[0]||3!=n[0])throw new RangeError("Vectors with length 3 expected (Size A = ["+r.join(", ")+"], B = ["+n.join(", ")+"])");return[u(c(e[1],t[2]),c(e[2],t[1])),u(c(e[2],t[0]),c(e[0],t[2])),u(c(e[0],t[1]),c(e[1],t[0]))]}var s=n(r(52)),u=n(r(77)),c=n(r(84)),f=a("cross",{"Matrix, Matrix":function(e,t){return s(o(e.toArray(),t.toArray()))},"Matrix, Array":function(e,t){return s(o(e.toArray(),t))},"Array, Matrix":function(e,t){return s(o(e,t.toArray()))},"Array, Array":o});return f.toTex={2:"\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"},f}var i=r(40).size;t.name="cross",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e,t,r,n){if(!a(t))throw new TypeError("Second parameter in function diag must be an integer");var i=t>0?t:0,o=0>t?-t:0;switch(r.length){case 1:return u(e,t,n,r[0],o,i);case 2:return c(e,t,n,r,o,i)}throw new RangeError("Matrix for function diag must be 2 dimensional")}function u(t,r,n,i,a,o){var s=[i+a,i+o],u=e.Matrix.storage(n||"dense"),c=u.diagonal(s,t,r);return null!==n?c:c.valueOf()}function c(e,t,r,n,i,a){if(e&&e.isMatrix===!0){var o=e.diagonal(t);return null!==r?r!==o.storage()?f(o,r):o:o.valueOf()}for(var s=Math.min(n[0]-i,n[1]-a),u=[],c=0;s>c;c++)u[c]=e[c+i][c+a];return null!==r?f(u):u}var f=n(r(52)),l=o("diag",{Array:function(e){return s(e,0,i.size(e),null)},"Array, number":function(e,t){return s(e,t,i.size(e),null)},"Array, BigNumber":function(e,t){return s(e,t.toNumber(),i.size(e),null)},"Array, string":function(e,t){return s(e,0,i.size(e),t)},"Array, number, string":function(e,t,r){return s(e,t,i.size(e),r)},"Array, BigNumber, string":function(e,t,r){return s(e,t.toNumber(),i.size(e),r)},Matrix:function(e){return s(e,0,e.size(),e.storage())},"Matrix, number":function(e,t){return s(e,t,e.size(),e.storage())},"Matrix, BigNumber":function(e,t){return s(e,t.toNumber(),e.size(),e.storage())},"Matrix, string":function(e,t){return s(e,0,e.size(),t)},"Matrix, number, string":function(e,t,r){return s(e,t,e.size(),r)},"Matrix, BigNumber, string":function(e,t,r){return s(e,t.toNumber(),e.size(),r)}});return l.toTex=void 0,l}var i=r(40),a=(r(3).clone,r(6).isInteger);t.name="diag",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){var r=i(e),n=i(t),a=r[0];if(1!==r.length||1!==n.length)throw new RangeError("Vector expected");if(r[0]!=n[0])throw new RangeError("Vectors must have equal length ("+r[0]+" != "+n[0]+")");if(0==a)throw new RangeError("Cannot calculate the dot product of empty vectors");for(var o=0,c=0;a>c;c++)o=s(o,u(e[c],t[c]));return o}var s=n(r(51)),u=n(r(84)),c=a("dot",{"Matrix, Matrix":function(e,t){return o(e.toArray(),t.toArray())},"Matrix, Array":function(e,t){return o(e.toArray(),t)},"Array, Matrix":function(e,t){return o(e,t.toArray())},"Array, Array":o});return c.toTex={2:"\\left(${args[0]}\\cdot${args[1]}\\right)"},c}var i=r(40).size;t.name="dot",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("flatten",{Array:function(e){return a(i(e))},Matrix:function(e){var t=a(i(e.toArray()));return s(t)}});return u.toTex=void 0,u}var i=r(3).clone,a=r(40).flatten;t.name="flatten",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=u(t),i=n?new e.BigNumber(1):1;if(c(t),r){var o=f(r);return t.length>0?o.resize(t,i):o}var s=[];return t.length>0?a(s,t,i):s}function u(e){var t=!1;return e.forEach(function(e,r,n){e&&e.isBigNumber===!0&&(t=!0,n[r]=e.toNumber())}),t}function c(e){e.forEach(function(e){if("number"!=typeof e||!i(e)||0>e)throw new Error("Parameters in function ones must be positive integers")})}var f=n(r(52)),l=o("ones",{"":function(){return"Array"===t.matrix?s([]):s([],"default")},"...number | BigNumber | string":function(e){var r=e[e.length-1];if("string"==typeof r){var n=e.pop();return s(e,n)}return"Array"===t.matrix?s(e):s(e,"default")},Array:s,Matrix:function(e){var t=e.storage();return s(e.valueOf(),t)},"Array | Matrix, string":function(e,t){return s(e.valueOf(),t)}});return l.toTex=void 0,l}var i=r(6).isInteger,a=r(40).resize;t.name="ones",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e,t){return-c(e,t)}function s(e,t,r){
if(!i(t)||0>t)throw new Error("k must be a non-negative integer");if(e&&e.isMatrix){var n=e.size();if(n.length>1)throw new Error("Only one dimensional matrices supported");return u(e.valueOf(),t,r)}return Array.isArray(e)?u(e,t,r):void 0}function u(e,t,r){if(t>=e.length)throw new Error("k out of bounds");for(var n=0,i=e.length-1;i>n;){for(var a=n,o=i,s=e[Math.floor(Math.random()*(i-n+1))+n];o>a;)if(r(e[a],s)>=0){var u=e[o];e[o]=e[a],e[a]=u,--o}else++a;r(e[a],s)>0&&--a,a>=t?i=a:n=a+1}return e[t]}var c=n(r(432));return a("partitionSelect",{"Array | Matrix, number":function(e,t){return s(e,t,c)},"Array | Matrix, number, string":function(e,t,r){if("asc"===r)return s(e,t,c);if("desc"===r)return s(e,t,o);throw new Error('Compare string must be "asc" or "desc"')},"Array | Matrix, number, function":s})}var i=r(6).isInteger;t.name="partitionSelect",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(79)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=o("compare",{"boolean, boolean":function(e,t){return e===t?0:e>t?1:-1},"number, number":function(e,r){return e===r||i(e,r,t.epsilon)?0:e>r?1:-1},"BigNumber, BigNumber":function(r,n){return r.eq(n)||a(r,n,t.epsilon)?new e.BigNumber(0):new e.BigNumber(r.cmp(n))},"Fraction, Fraction":function(t,r){return new e.Fraction(t.compare(r))},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return h(e.value,t.value)},"string, string":function(e,t){return e===t?0:e>t?1:-1},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,h);break;default:r=u(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return h(s(e),t)},"Matrix, Array":function(e,t){return h(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, any":function(e,t){return p(s(e),t,h,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,h,!0).valueOf()}});return h.toTex=void 0,h}var i=r(6).nearlyEqual,a=r(49);t.name="compare",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,f){function l(e,t,r){if(void 0!==r){if("string"!=typeof r||1!==r.length)throw new TypeError("Single character expected as defaultValue")}else r=" ";if(1!==t.length)throw new i(t.length,1);var n=t[0];if("number"!=typeof n||!o(n))throw new TypeError("Invalid size, must contain positive integers (size: "+s(t)+")");if(e.length>n)return e.substring(0,n);if(e.length<n){for(var a=e,u=0,c=n-e.length;c>u;u++)a+=r;return a}return e}var p=n(r(52)),h=function(e,r,n){if(2!=arguments.length&&3!=arguments.length)throw new a("resize",arguments.length,2,3);if(r&&r.isMatrix===!0&&(r=r.valueOf()),r.length&&r[0]&&r[0].isBigNumber===!0&&(r=r.map(function(e){return e&&e.isBigNumber===!0?e.toNumber():e})),e&&e.isMatrix===!0)return e.resize(r,n,!0);if("string"==typeof e)return l(e,r,n);var i=Array.isArray(e)?!1:"Array"!==t.matrix;if(0==r.length){for(;Array.isArray(e);)e=e[0];return u(e)}Array.isArray(e)||(e=[e]),e=u(e);var o=c.resize(e,r,n);return i?p(o):o};return h.toTex=void 0,h}var i=r(42),a=r(11),o=r(6).isInteger,s=r(23).format,u=r(3).clone,c=r(40);t.name="resize",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(52)),s=a("size",{Matrix:function(e){return o(e.size())},Array:i.size,string:function(e){return"Array"===t.matrix?[e.length]:o([e.length])},"number | Complex | BigNumber | Unit | boolean | null":function(e){return"Array"===t.matrix?[]:o([])}});return s.toTex=void 0,s}var i=r(40);t.name="size",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){if("asc"===e)return f;if("desc"===e)return l;throw new Error('String "asc" or "desc" expected')}function s(e){if(1!==i(e).length)throw new Error("One dimensional array expected")}function u(e){if(1!==e.size().length)throw new Error("One dimensional matrix expected")}var c=n(r(52)),f=n(r(432)),l=function(e,t){return-f(e,t)},p=a("sort",{Array:function(e){return s(e),e.sort(f)},Matrix:function(e){return u(e),c(e.toArray().sort(f),e.storage())},"Array, function":function(e,t){return s(e),e.sort(t)},"Matrix, function":function(e,t){return u(e),c(e.toArray().sort(t),e.storage())},"Array, string":function(e,t){return s(e),e.sort(o(t))},"Matrix, string":function(e,t){return u(e),c(e.toArray().sort(o(t)),e.storage())}});return p.toTex=void 0,p}var i=r(40).size;t.name="sort",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=o("squeeze",{Array:function(e){return a.squeeze(i.clone(e))},Matrix:function(e){var t=a.squeeze(e.toArray());return Array.isArray(t)?s(t):t},any:function(e){return i.clone(e)}});return u.toTex=void 0,u}var i=r(3),a=r(40);t.name="squeeze",t.factory=n},function(e,t,r){e.exports=[r(407),r(405),r(406),r(438),r(440),r(441),r(442),r(444),r(445)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){var r=t.size().length,n=e.size().length;if(r>1)throw new Error("first object must be one dimensional");if(n>1)throw new Error("second object must be one dimensional");if(r!==n)throw new Error("Length of two vectors must be equal");var i=u(e);if(0===i)throw new Error("Sum of elements in first object must be non zero");var a=u(t);if(0===a)throw new Error("Sum of elements in second object must be non zero");var o=s(e,u(e)),h=s(t,u(t)),m=u(c(o,l(f(o,h))));return p(m)?m:Number.NaN}var o=n(r(52)),s=n(r(317)),u=n(r(439)),c=n(r(84)),f=n(r(359)),l=n(r(374)),p=n(r(88)),h=i("kldivergence",{"Array, Array":function(e,t){return a(o(e),o(t))},"Matrix, Array":function(e,t){return a(e,o(t))},"Array, Matrix":function(e,t){return a(o(e),t)},"Matrix, Matrix":function(e,t){return a(e,t)}});return h}t.name="kldivergence",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(r){var n=void 0;if(i(r,function(e){n=void 0===n?e:s(n,e)}),void 0===n)switch(t.number){case"number":return 0;case"BigNumber":return new e.BigNumber(0);case"Fraction":return new e.Fraction(0);default:return 0}return n}var s=n(r(53)),u=a("sum",{"Array | Matrix":function(e){return o(e)},"Array | Matrix, number | BigNumber":function(){throw new Error("sum(A, dim) is not yet supported")},"...":function(e){return o(e)}});return u.toTex=void 0,u}var i=r(312);t.name="sum",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=n(r(51)),s=n(r(84)),u=n(r(317)),c=n(r(405)),f=n(r(408)),l=n(r(370));return a("multinomial",{"Array | Matrix":function(e){var t=0,r=1;return i(e,function(e){if(!f(e)||!l(e))throw new TypeError("Positive integer value expected in function multinomial");t=o(t,e),r=s(r,c(e))}),u(c(t),r)}})}var i=r(312);t.name="multinomial",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(405)),u=o("permutations",{"number | BigNumber":s,"number, number":function(e,t){var r,n;if(!a(e)||0>e)throw new TypeError("Positive integer value expected in function permutations");if(!a(t)||0>t)throw new TypeError("Positive integer value expected in function permutations");if(t>e)throw new TypeError("second argument k must be less than or equal to first argument n");for(r=1,n=e-t+1;e>=n;n++)r*=n;return r},"BigNumber, BigNumber":function(t,r){var n,a;if(!i(t)||!i(r))throw new TypeError("Positive integer value expected in function permutations");if(r.gt(t))throw new TypeError("second argument k must be less than or equal to first argument n");for(n=new e.BigNumber(1),a=t.minus(r).plus(1);a.lte(t);a=a.plus(1))n=n.times(a);return n}});return u.toTex=void 0,u}function i(e){return e.isInteger()&&e.gte(0)}var a=r(6).isInteger;t.name="permutations",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").pickRandom;return o.toTex=void 0,o}t.name="pickRandom",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){if(!f.hasOwnProperty(e))throw new Error("Unknown distribution "+e);var t=Array.prototype.slice.call(arguments,1),r=f[e].apply(this,t);return function(e){var t={random:function(e,t,n){var s,c,f;if(arguments.length>3)throw new i("random",arguments.length,0,3);if(1===arguments.length?a(e)?s=e:f=e:2===arguments.length?a(e)?(s=e,f=t):(c=e,f=t):(s=e,c=t,f=n),void 0===f&&(f=1),void 0===c&&(c=0),void 0!==s){var l=o(s.valueOf(),c,f,r);return s&&s.isMatrix===!0?u(l):l}return r(c,f)},randomInt:function(e,t,r){var s,c,f;if(arguments.length>3||arguments.length<1)throw new i("randomInt",arguments.length,1,3);if(1===arguments.length?a(e)?s=e:f=e:2===arguments.length?a(e)?(s=e,f=t):(c=e,f=t):(s=e,c=t,f=r),void 0===c&&(c=0),void 0!==s){var l=o(s.valueOf(),c,f,n);return s&&s.isMatrix===!0?u(l):l}return n(c,f)},pickRandom:function(e){if(1!==arguments.length)throw new i("pickRandom",arguments.length,1);if(e&&e.isMatrix===!0)e=e.valueOf();else if(!Array.isArray(e))throw new TypeError("Unsupported type of value in function pickRandom");if(c.size(e).length>1)throw new Error("Only one dimensional vectors supported");return e[Math.floor(Math.random()*e.length)]}},r=function(t,r){return t+e()*(r-t)},n=function(t,r){return Math.floor(t+e()*(r-t))},o=function(e,t,r,n){var i,a,s=[];if(e=e.slice(0),e.length>1)for(a=0,i=e.shift();i>a;a++)s.push(o(e,t,r,n));else for(a=0,i=e.shift();i>a;a++)s.push(n(t,r));return s};return t}(r)}var u=n(r(52)),c=r(40),f={uniform:function(){return Math.random},normal:function(){return function(){for(var e,t,r=-1;0>r||r>1;)e=Math.random(),t=Math.random(),r=1/6*Math.pow(-2*Math.log(e),.5)*Math.cos(2*Math.PI*t)+.5;return r}}};return s.toTex=void 0,s}var i=r(11),a=r(310);t.name="distribution",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").random;return o.toTex=void 0,o}t.name="random",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(443)),o=a("uniform").randomInt;return o.toTex=void 0,o}t.name="randomInt",t.factory=n},function(e,t,r){e.exports=[r(432),r(447),r(87),r(64),r(342),r(60),r(448),r(449)]},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(Array.isArray(e)){if(Array.isArray(t)){var r=e.length;if(r!==t.length)return!1;for(var n=0;r>n;n++)if(!a(e[n],t[n]))return!1;return!0}return!1}return Array.isArray(t)?!1:o(e,t)}var o=n(r(87)),s=i("deepEqual",{"any, any":function(e,t){return a(e.valueOf(),t.valueOf())}});return s.toTex=void 0,s}t.name="deepEqual",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("smallerEq",{"boolean, boolean":function(e,t){return t>=e},"number, number":function(e,r){return r>=e||i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return e.lte(r)||a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return 1!==e.compare(t)},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return t>=e},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,m);break;default:r=u(t,e,m,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,m,!1);break;default:r=l(e,t,m)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,m,!1);break;default:r=p(e,t,m,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,m,!0);break;default:r=p(t,e,m,!0)}return r},"Array, any":function(e,t){return p(s(e),t,m,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,m,!0).valueOf()}});return m.toTex={2:"\\left(${args[0]}"+h.operators.smallerEq+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="smallerEq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){var s=n(r(52)),u=n(r(61)),c=n(r(62)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=r(32),m=o("unequal",{"any, any":function(e,t){return null===e?null!==t:null===t?null!==e:void 0===e?void 0!==t:void 0===t?void 0!==e:d(e,t)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=c(e,t,d);break;default:r=u(t,e,d,!0)}break;default:switch(t.storage()){case"sparse":r=u(e,t,d,!1);break;default:r=l(e,t,d)}}return r},"Array, Array":function(e,t){return m(s(e),s(t)).valueOf()},"Array, Matrix":function(e,t){return m(s(e),t)},"Matrix, Array":function(e,t){return m(e,s(t))},"Matrix, any":function(e,t){var r;switch(e.storage()){case"sparse":r=f(e,t,d,!1);break;default:r=p(e,t,d,!1)}return r},"any, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,d,!0);break;default:r=p(t,e,d,!0)}return r},"Array, any":function(e,t){return p(s(e),t,d,!1).valueOf()},"any, Array":function(e,t){return p(s(t),e,d,!0).valueOf()}}),d=o("_unequal",{"boolean, boolean":function(e,t){return e!==t},"number, number":function(e,r){return!i(e,r,t.epsilon)},"BigNumber, BigNumber":function(e,r){return!a(e,r,t.epsilon)},"Fraction, Fraction":function(e,t){return!e.equals(t)},"Complex, Complex":function(e,t){return!e.equals(t)},"Unit, Unit":function(e,t){if(!e.equalBase(t))throw new Error("Cannot compare units with different base");return m(e.value,t.value)},"string, string":function(e,t){return e!==t}});return m.toTex={2:"\\left(${args[0]}"+h.operators.unequal+"${args[1]}\\right)"},m}var i=r(6).nearlyEqual,a=r(49);t.name="unequal",t.factory=n},function(e,t,r){e.exports=[r(311),r(316),r(451),r(321),r(452),r(453),r(454),r(455),r(439),r(456)]},function(e,t,r){"use strict";function n(e,t,n,o){function s(e){e=i(e.valueOf());var t=e.length;if(0==t)throw new Error("Cannot calculate median of an empty array");if(t%2==0){for(var r=t/2-1,n=l(e,r+1),a=e[r],o=0;r>o;++o)f(e[o],a)>0&&(a=e[o]);return m(a,n)}var s=l(e,(t-1)/2);return h(s)}var u=n(r(53)),c=n(r(81)),f=n(r(432)),l=n(r(431)),p=o("median",{"Array | Matrix":s,"Array | Matrix, number | BigNumber":function(e,t){throw new Error("median(A, dim) is not yet supported")},"...":function(e){if(a(e))throw new TypeError("Scalar values expected in function median");return s(e)}}),h=o({"number | BigNumber | Unit":function(e){return e}}),m=o({"number | BigNumber | Unit, number | BigNumber | Unit":function(e,t){return c(u(e,t),2)}});return p.toTex=void 0,p}var i=r(40).flatten,a=(r(313),r(314));t.name="median",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){function a(e){e=i(e.valueOf());var t=e.length;if(0==t)throw new Error("Cannot calculate mode of an empty array");var r={},n=[],a=0;for(var o in e)e[o]in r||(r[e[o]]=0),r[e[o]]++,r[e[o]]==a?n.push(e[o]):r[e[o]]>a&&(a=r[e[o]],n=[e[o]]);return n}var o=n("mode",{"Array | Matrix":a,"...":function(e){return a(e)}});return o}var i=r(40).flatten;t.name="mode",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){function o(e){var t=void 0;if(i(e,function(e){t=void 0===t?e:s(t,e)}),void 0===t)throw new Error("Cannot calculate prod of an empty array");return t}var s=n(r(80)),u=a("prod",{"Array | Matrix":o,"Array | Matrix, number | BigNumber":function(e,t){throw new Error("prod(A, dim) is not yet supported")},"...":function(e){return o(e)}});return u.toTex=void 0,u}var i=r(312);t.name="prod",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,u){function c(t,r,n){var o,u,c;if(arguments.length<2||arguments.length>3)throw new SyntaxError("Function quantileSeq requires two or three parameters");if(s(t)){if(n=n||!1,"boolean"==typeof n){if(u=t.valueOf(),a(r)){if(0>r)throw new Error("N/prob must be non-negative");if(1>=r)return f(u,r,n);if(r>1){if(!i(r))throw new Error("N must be a positive integer");var l=r+1;o=new Array(r);for(var p=0;r>p;)o[p]=f(u,++p/l,n);return o}}if(r&&r.isBigNumber){if(r.isNegative())throw new Error("N/prob must be non-negative");if(c=new r.constructor(1),r.lte(c))return f(u,r,n);if(r.gt(c)){if(!r.isInteger())throw new Error("N must be a positive integer");var h=r.toNumber();if(h>4294967295)throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");var l=new e.BigNumber(h+1);o=new Array(h);for(var p=0;h>p;)o[p]=f(u,new e.BigNumber(++p).div(l),n);return o}}if(Array.isArray(r)){o=new Array(r.length);for(var p=0;p<o.length;++p){var m=r[p];if(a(m)){if(0>m||m>1)throw new Error("Probability must be between 0 and 1, inclusive")}else{if(!m||!m.isBigNumber)throw new TypeError("Unexpected type of argument in function quantileSeq");if(c=new m.constructor(1),m.isNegative()||m.gt(c))throw new Error("Probability must be between 0 and 1, inclusive")}o[p]=f(u,m,n)}return o}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}function f(e,t,r){var n=o(e),i=n.length;if(0===i)throw new Error("Cannot calculate quantile of an empty sequence");if(a(t)){var s=t*(i-1),u=s%1;if(0===u){var c=r?n[s]:h(n,s);return d(c),c}var f,g,v=Math.floor(s);if(r)f=n[v],g=n[v+1];else{g=h(n,v+1),f=n[v];for(var y=0;v>y;++y)m(n[y],f)>0&&(f=n[y])}return d(f),d(g),l(p(f,1-u),p(g,u))}var s=t.times(i-1);if(s.isInteger()){s=s.toNumber();var c=r?n[s]:h(n,s);return d(c),c}var f,g,v=s.floor(),u=s.minus(v),x=v.toNumber();if(r)f=n[x],g=n[x+1];else{g=h(n,x+1),f=n[x];for(var y=0;x>y;++y)m(n[y],f)>0&&(f=n[y])}d(f),d(g);var b=new u.constructor(1);return l(p(f,b.minus(u)),p(g,u))}var l=n(r(51)),p=n(r(84)),h=n(r(431)),m=n(r(432)),d=u({"number | BigNumber | Unit":function(e){return e}});return c}var i=r(6).isInteger,a=r(6).isNumber,o=r(40).flatten,s=r(310);t.name="quantileSeq",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){function a(e,t){if(0==e.length)throw new SyntaxError("Function std requires one or more parameters (0 provided)");return o(s.apply(null,arguments))}var o=n(r(369)),s=n(r(456)),u=i("std",{"Array | Matrix":a,"Array | Matrix, string":a,"...":function(e){return a(e)}});return u.toTex=void 0,u}t.name="std",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,o){function s(t,r){var n=0,i=0;if(0==t.length)throw new SyntaxError("Function var requires one or more parameters (0 provided)");if(a(t,function(e){n=u(n,e),i++}),0===i)throw new Error("Cannot calculate var of an empty array");var o=l(n,i);switch(n=0,a(t,function(e){var t=c(e,o);n=u(n,f(t,t))}),r){case"uncorrected":return l(n,i);case"biased":return l(n,i+1);case"unbiased":var s=n&&n.isBigNumber===!0?new e.BigNumber(0):0;return 1==i?s:l(n,i-1);default:throw new Error('Unknown normalization "'+r+'". Choose "unbiased" (default), "uncorrected", or "biased".')}}var u=n(r(53)),c=n(r(77)),f=n(r(80)),l=n(r(81)),p=o("variance",{"Array | Matrix":function(e){return s(e,i)},"Array | Matrix, string":s,"...":function(e){return s(e,i)}});return p.toTex="\\mathrm{Var}\\left(${args}\\right)",p}var i="unbiased",a=r(312);t.name="var",t.factory=n},function(e,t,r){e.exports=[r(89),r(458)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("print",{"string, Object":i,"string, Object, number":i});return a.toTex=void 0,a}function i(e,t,r){return e.replace(/\$([\w\.]+)/g,function(e,n){for(var i=n.split("."),s=t[i.shift()];i.length&&void 0!==s;){var u=i.shift();s=u?s[u]:s+"."}return void 0!==s?a(s)?s:o(s,r):e})}var a=r(23).isString,o=r(23).format;t.name="print",t.factory=n},function(e,t,r){e.exports=[r(460),r(461),r(462),r(463),r(464),r(465),r(466),r(467),r(468),r(469),r(470),r(471),r(472),r(473),r(474),r(475),r(476),r(477),r(478),r(479),r(480),r(481),r(482),r(483),r(484)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acos",{number:function(r){return r>=-1&&1>=r||t.predictable?Math.acos(r):new e.Complex(r,0).acos()},Complex:function(e){return e.acos()},BigNumber:function(e){return e.acos()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cos^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acos",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("acosh",{number:function(r){return r>=1||t.predictable?a(r):-1>=r?new e.Complex(Math.log(Math.sqrt(r*r-1)-r),Math.PI):new e.Complex(r,0).acosh()},Complex:function(e){return e.acosh()},BigNumber:function(e){return e.acosh()},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\cosh^{-1}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.acosh||function(e){return Math.log(Math.sqrt(e*e-1)+e)};t.name="acosh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acot",{number:function(e){return Math.atan(1/e)},Complex:function(e){return e.acot()},BigNumber:function(t){return new e.BigNumber(1).div(t).atan()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cot^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acoth",{number:function(r){return r>=1||-1>=r||t.predictable?isFinite(r)?(Math.log((r+1)/r)+Math.log(r/(r-1)))/2:0:new e.Complex(r,0).acoth()},Complex:function(e){return e.acoth()},BigNumber:function(t){return new e.BigNumber(1).div(t).atanh()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\coth^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acoth",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acsc",{number:function(r){return-1>=r||r>=1||t.predictable?Math.asin(1/r):new e.Complex(r,0).acsc()},Complex:function(e){return e.acsc()},BigNumber:function(t){return new e.BigNumber(1).div(t).asin()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\csc^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acsc",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("acsch",{number:function(e){return e=1/e,Math.log(e+Math.sqrt(e*e+1))},Complex:function(e){return e.acsch()},BigNumber:function(t){return new e.BigNumber(1).div(t).asinh()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="acsch",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asec",{number:function(r){return-1>=r||r>=1||t.predictable?Math.acos(1/r):new e.Complex(r,0).asec()},Complex:function(e){return e.asec()},BigNumber:function(t){return new e.BigNumber(1).div(t).acos()},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\sec^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asec",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,a){var o=(a.find(n(r(461)),["Complex"]),a("asech",{number:function(r){if(1>=r&&r>=-1||t.predictable){r=1/r;var n=Math.sqrt(r*r-1);return r>0||t.predictable?Math.log(n+r):new e.Complex(Math.log(n-r),Math.PI)}return new e.Complex(r,0).asech()},Complex:function(e){return e.asech()},BigNumber:function(t){return new e.BigNumber(1).div(t).acosh()},"Array | Matrix":function(e){return i(e,o)}}));return o.toTex={1:"\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"},o}var i=r(19);t.name="asech",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asin",{number:function(r){return r>=-1&&1>=r||t.predictable?Math.asin(r):new e.Complex(r,0).asin()},Complex:function(e){return e.asin()},BigNumber:function(e){return e.asin()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sin^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asin",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("asinh",{number:Math.asinh||function(e){return Math.log(Math.sqrt(e*e+1)+e)},Complex:function(e){return e.asinh()},BigNumber:function(e){return e.asinh()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sinh^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="asinh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("atan",{number:function(e){return Math.atan(e)},Complex:function(e){return e.atan()},BigNumber:function(e){return e.atan()},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\tan^{-1}\\left(${args[0]}\\right)"},a}var i=r(19);t.name="atan",t.factory=n},function(e,t,r){"use strict";function n(e,t,n,i){var a=n(r(52)),o=n(r(360)),s=n(r(61)),u=n(r(362)),c=n(r(85)),f=n(r(63)),l=n(r(57)),p=n(r(58)),h=i("atan2",{"number, number":Math.atan2,"BigNumber, BigNumber":function(t,r){return e.BigNumber.atan2(t,r)},"Matrix, Matrix":function(e,t){var r;switch(e.storage()){case"sparse":switch(t.storage()){case"sparse":r=u(e,t,h,!1);break;default:r=o(t,e,h,!0)}break;default:switch(t.storage()){case"sparse":r=s(e,t,h,!1);break;default:r=l(e,t,h)}}return r},"Array, Array":function(e,t){return h(a(e),a(t)).valueOf()},"Array, Matrix":function(e,t){return h(a(e),t)},"Matrix, Array":function(e,t){return h(e,a(t))},"Matrix, number | BigNumber":function(e,t){var r;switch(e.storage()){case"sparse":r=c(e,t,h,!1);break;default:r=p(e,t,h,!1)}return r},"number | BigNumber, Matrix":function(e,t){var r;switch(t.storage()){case"sparse":r=f(t,e,h,!0);break;default:r=p(t,e,h,!0)}return r},"Array, number | BigNumber":function(e,t){return p(a(e),t,h,!1).valueOf()},"number | BigNumber, Array":function(e,t){return p(a(t),e,h,!0).valueOf()}});return h.toTex={2:"\\mathrm{atan2}\\left(${args}\\right)"},h}t.name="atan2",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("atanh",{number:function(r){return 1>=r&&r>=-1||t.predictable?a(r):new e.Complex(r,0).atanh()},Complex:function(e){return e.atanh()},BigNumber:function(e){return e.atanh()},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\tanh^{-1}\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.atanh||function(e){return Math.log((1+e)/(1-e))/2};t.name="atanh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cos",{number:Math.cos,Complex:function(e){return e.cos()},BigNumber:function(e){return e.cos()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cos\\left(${args[0]}\\right)"},a}var i=r(19);t.name="cos",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("cosh",{number:a,Complex:function(e){return e.cosh()},BigNumber:function(e){return e.cosh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cosh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o)}});return o.toTex={1:"\\cosh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.cosh||function(e){return(Math.exp(e)+Math.exp(-e))/2};t.name="cosh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("cot",{number:function(e){return 1/Math.tan(e)},Complex:function(e){return e.cot()},BigNumber:function(t){return new e.BigNumber(1).div(t.tan())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\cot\\left(${args[0]}\\right)"},a}var i=r(19);t.name="cot",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("coth",{number:i,Complex:function(e){return e.coth()},BigNumber:function(t){return new e.BigNumber(1).div(t.tanh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function coth is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\coth\\left(${args[0]}\\right)"},o}function i(e){var t=Math.exp(2*e);return(t+1)/(t-1)}var a=r(19);t.name="coth",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("csc",{number:function(e){return 1/Math.sin(e)},Complex:function(e){return e.csc()},BigNumber:function(t){return new e.BigNumber(1).div(t.sin())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\csc\\left(${args[0]}\\right)"},a}var i=r(19);t.name="csc",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("csch",{number:i,Complex:function(e){return e.csch()},BigNumber:function(t){return new e.BigNumber(1).div(t.sinh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csch is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\mathrm{csch}\\left(${args[0]}\\right)"},o}function i(e){return 0==e?Number.POSITIVE_INFINITY:Math.abs(2/(Math.exp(e)-Math.exp(-e)))*o(e)}var a=r(19),o=r(6).sign;t.name="csch",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("sec",{number:function(e){return 1/Math.cos(e)},Complex:function(e){return e.sec()},BigNumber:function(t){return new e.BigNumber(1).div(t.cos())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a)}});return a.toTex={1:"\\sec\\left(${args[0]}\\right)"},a}var i=r(19);t.name="sec",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sech",{number:i,Complex:function(e){return e.sech()},BigNumber:function(t){return new e.BigNumber(1).div(t.cosh())},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sech is no angle");return o(t.value)},"Array | Matrix":function(e){return a(e,o)}});return o.toTex={1:"\\mathrm{sech}\\left(${args[0]}\\right)"},o}function i(e){return 2/(Math.exp(e)+Math.exp(-e))}var a=r(19);t.name="sech",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("sin",{number:Math.sin,Complex:function(e){return e.sin()},BigNumber:function(e){return e.sin()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sin is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\sin\\left(${args[0]}\\right)"},a}var i=r(19);t.name="sin",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("sinh",{number:a,Complex:function(e){return e.sinh()},BigNumber:function(e){return e.sinh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sinh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\sinh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.sinh||function(e){return(Math.exp(e)-Math.exp(-e))/2};t.name="sinh",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("tan",{number:Math.tan,Complex:function(e){return e.tan()},BigNumber:function(e){return e.tan()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");return a(t.value)},"Array | Matrix":function(e){return i(e,a,!0)}});return a.toTex={1:"\\tan\\left(${args[0]}\\right)"},a}var i=r(19);t.name="tan",t.factory=n},function(e,t,r){"use strict";function n(e,t,r,n){var o=n("tanh",{number:a,Complex:function(e){return e.tanh()},BigNumber:function(e){return e.tanh()},Unit:function(t){if(!t.hasBase(e.Unit.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tanh is no angle");return o(t.value)},"Array | Matrix":function(e){return i(e,o,!0)}});return o.toTex={1:"\\tanh\\left(${args[0]}\\right)"},o}var i=r(19),a=Math.tanh||function(e){var t=Math.exp(2*e);return(t-1)/(t+1)};t.name="tanh",t.factory=n},function(e,t,r){e.exports=[r(486)]},function(e,t,r){"use strict";function n(e,t,n,i){var a=r(32),o=n(r(52)),s=n(r(57)),u=n(r(58)),c=i("to",{"Unit, Unit | string":function(e,t){return e.to(t)},"Matrix, Matrix":function(e,t){return s(e,t,c)},"Array, Array":function(e,t){return c(o(e),o(t)).valueOf();
},"Array, Matrix":function(e,t){return c(o(e),t)},"Matrix, Array":function(e,t){return c(e,o(t))},"Matrix, any":function(e,t){return u(e,t,c,!1)},"any, Matrix":function(e,t){return u(t,e,c,!0)},"Array, any":function(e,t){return u(o(e),t,c,!1).valueOf()},"any, Array":function(e,t){return u(o(t),e,c,!0).valueOf()}});return c.toTex={2:"\\left(${args[0]}"+a.operators.to+"${args[1]}\\right)"},c}t.name="to",t.factory=n},function(e,t,r){e.exports=[r(488),r(408),r(356),r(88),r(370),r(422),r(90)]},function(e,t,r){"use strict";function n(e,t,r,n){var a=n("clone",{any:i.clone});return a.toTex=void 0,a}var i=r(3);t.name="clone",t.factory=n},function(e,t,r){e.exports=[r(490)]},function(e,t){"use strict";function r(e,t,r,n){return function(t,r){var n=e[r&&r.mathjs];return n&&"function"==typeof n.fromJSON?n.fromJSON(r):r}}t.name="reviver",t.path="json",t.factory=r},function(e,t,r){"use strict";var n=r(11),i=r(42),a=r(43);e.exports=[{name:"ArgumentsError",path:"error",factory:function(){return n}},{name:"DimensionError",path:"error",factory:function(){return i}},{name:"IndexError",path:"error",factory:function(){return a}}]}])});

/*! =======================================================
                      VERSION  9.9.0              
========================================================= */
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},windowIsDefined="object"===("undefined"==typeof window?"undefined":_typeof(window));!function(a){if("function"==typeof define&&define.amd)define(["jquery"],a);else if("object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports){var b;try{b=require("jquery")}catch(c){b=null}module.exports=a(b)}else window&&(window.Slider=a(window.jQuery))}(function(a){var b="slider",c="bootstrapSlider";windowIsDefined&&!window.console&&(window.console={}),windowIsDefined&&!window.console.log&&(window.console.log=function(){}),windowIsDefined&&!window.console.warn&&(window.console.warn=function(){});var d;return function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l&&l!==k)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}var m=this.map(function(){var d=a.data(this,b);return d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d)),a(this)});return!m||m.length>1?m:m[0]}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;c(a)}(a),function(a){function e(b,c){function d(a,b){var c="data-slider-"+b.replace(/_/g,"-"),d=a.getAttribute(c);try{return JSON.parse(d)}catch(e){return d}}this._state={value:null,enabled:null,offset:null,size:null,percentage:null,inDrag:!1,over:!1},this.ticksCallbackMap={},this.handleCallbackMap={},"string"==typeof b?this.element=document.querySelector(b):b instanceof HTMLElement&&(this.element=b),c=c?c:{};for(var e=Object.keys(this.defaultOptions),f=0;f<e.length;f++){var h=e[f],i=c[h];i="undefined"!=typeof i?i:d(this.element,h),i=null!==i?i:this.defaultOptions[h],this.options||(this.options={}),this.options[h]=i}"auto"===this.options.rtl&&(this.options.rtl="rtl"===window.getComputedStyle(this.element).direction),"vertical"!==this.options.orientation||"top"!==this.options.tooltip_position&&"bottom"!==this.options.tooltip_position?"horizontal"!==this.options.orientation||"left"!==this.options.tooltip_position&&"right"!==this.options.tooltip_position||(this.options.tooltip_position="top"):this.options.rtl?this.options.tooltip_position="left":this.options.tooltip_position="right";var j,k,l,m,n,o=this.element.style.width,p=!1,q=this.element.parentNode;if(this.sliderElem)p=!0;else{this.sliderElem=document.createElement("div"),this.sliderElem.className="slider";var r=document.createElement("div");r.className="slider-track",k=document.createElement("div"),k.className="slider-track-low",j=document.createElement("div"),j.className="slider-selection",l=document.createElement("div"),l.className="slider-track-high",m=document.createElement("div"),m.className="slider-handle min-slider-handle",m.setAttribute("role","slider"),m.setAttribute("aria-valuemin",this.options.min),m.setAttribute("aria-valuemax",this.options.max),n=document.createElement("div"),n.className="slider-handle max-slider-handle",n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",this.options.min),n.setAttribute("aria-valuemax",this.options.max),r.appendChild(k),r.appendChild(j),r.appendChild(l),this.rangeHighlightElements=[];var s=this.options.rangeHighlights;if(Array.isArray(s)&&s.length>0)for(var t=0;t<s.length;t++){var u=document.createElement("div"),v=s[t]["class"]||"";u.className="slider-rangeHighlight slider-selection "+v,this.rangeHighlightElements.push(u),r.appendChild(u)}var w=Array.isArray(this.options.labelledby);if(w&&this.options.labelledby[0]&&m.setAttribute("aria-labelledby",this.options.labelledby[0]),w&&this.options.labelledby[1]&&n.setAttribute("aria-labelledby",this.options.labelledby[1]),!w&&this.options.labelledby&&(m.setAttribute("aria-labelledby",this.options.labelledby),n.setAttribute("aria-labelledby",this.options.labelledby)),this.ticks=[],Array.isArray(this.options.ticks)&&this.options.ticks.length>0){for(this.ticksContainer=document.createElement("div"),this.ticksContainer.className="slider-tick-container",f=0;f<this.options.ticks.length;f++){var x=document.createElement("div");if(x.className="slider-tick",this.options.ticks_tooltip){var y=this._addTickListener(),z=y.addMouseEnter(this,x,f),A=y.addMouseLeave(this,x);this.ticksCallbackMap[f]={mouseEnter:z,mouseLeave:A}}this.ticks.push(x),this.ticksContainer.appendChild(x)}j.className+=" tick-slider-selection"}if(this.tickLabels=[],Array.isArray(this.options.ticks_labels)&&this.options.ticks_labels.length>0)for(this.tickLabelContainer=document.createElement("div"),this.tickLabelContainer.className="slider-tick-label-container",f=0;f<this.options.ticks_labels.length;f++){var B=document.createElement("div"),C=0===this.options.ticks_positions.length,D=this.options.reversed&&C?this.options.ticks_labels.length-(f+1):f;B.className="slider-tick-label",B.innerHTML=this.options.ticks_labels[D],this.tickLabels.push(B),this.tickLabelContainer.appendChild(B)}var E=function(a){var b=document.createElement("div");b.className="tooltip-arrow";var c=document.createElement("div");c.className="tooltip-inner",a.appendChild(b),a.appendChild(c)},F=document.createElement("div");F.className="tooltip tooltip-main",F.setAttribute("role","presentation"),E(F);var G=document.createElement("div");G.className="tooltip tooltip-min",G.setAttribute("role","presentation"),E(G);var H=document.createElement("div");H.className="tooltip tooltip-max",H.setAttribute("role","presentation"),E(H),this.sliderElem.appendChild(r),this.sliderElem.appendChild(F),this.sliderElem.appendChild(G),this.sliderElem.appendChild(H),this.tickLabelContainer&&this.sliderElem.appendChild(this.tickLabelContainer),this.ticksContainer&&this.sliderElem.appendChild(this.ticksContainer),this.sliderElem.appendChild(m),this.sliderElem.appendChild(n),q.insertBefore(this.sliderElem,this.element),this.element.style.display="none"}if(a&&(this.$element=a(this.element),this.$sliderElem=a(this.sliderElem)),this.eventToCallbackMap={},this.sliderElem.id=this.options.id,this.touchCapable="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,this.touchX=0,this.touchY=0,this.tooltip=this.sliderElem.querySelector(".tooltip-main"),this.tooltipInner=this.tooltip.querySelector(".tooltip-inner"),this.tooltip_min=this.sliderElem.querySelector(".tooltip-min"),this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner"),this.tooltip_max=this.sliderElem.querySelector(".tooltip-max"),this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner"),g[this.options.scale]&&(this.options.scale=g[this.options.scale]),p===!0&&(this._removeClass(this.sliderElem,"slider-horizontal"),this._removeClass(this.sliderElem,"slider-vertical"),this._removeClass(this.sliderElem,"slider-rtl"),this._removeClass(this.tooltip,"hide"),this._removeClass(this.tooltip_min,"hide"),this._removeClass(this.tooltip_max,"hide"),["left","right","top","width","height"].forEach(function(a){this._removeProperty(this.trackLow,a),this._removeProperty(this.trackSelection,a),this._removeProperty(this.trackHigh,a)},this),[this.handle1,this.handle2].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"right"),this._removeProperty(a,"top")},this),[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"right"),this._removeProperty(a,"top"),this._removeProperty(a,"margin-left"),this._removeProperty(a,"margin-right"),this._removeProperty(a,"margin-top"),this._removeClass(a,"right"),this._removeClass(a,"left"),this._removeClass(a,"top")},this)),"vertical"===this.options.orientation?(this._addClass(this.sliderElem,"slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight"):(this._addClass(this.sliderElem,"slider-horizontal"),this.sliderElem.style.width=o,this.options.orientation="horizontal",this.options.rtl?this.stylePos="right":this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth"),this.options.rtl&&this._addClass(this.sliderElem,"slider-rtl"),this._setTooltipPosition(),Array.isArray(this.options.ticks)&&this.options.ticks.length>0&&(this.options.max=Math.max.apply(Math,this.options.ticks),this.options.min=Math.min.apply(Math,this.options.ticks)),Array.isArray(this.options.value)?(this.options.range=!0,this._state.value=this.options.value):this.options.range?this._state.value=[this.options.value,this.options.max]:this._state.value=this.options.value,this.trackLow=k||this.trackLow,this.trackSelection=j||this.trackSelection,this.trackHigh=l||this.trackHigh,"none"===this.options.selection?(this._addClass(this.trackLow,"hide"),this._addClass(this.trackSelection,"hide"),this._addClass(this.trackHigh,"hide")):("after"===this.options.selection||"before"===this.options.selection)&&(this._removeClass(this.trackLow,"hide"),this._removeClass(this.trackSelection,"hide"),this._removeClass(this.trackHigh,"hide")),this.handle1=m||this.handle1,this.handle2=n||this.handle2,p===!0)for(this._removeClass(this.handle1,"round triangle"),this._removeClass(this.handle2,"round triangle hide"),f=0;f<this.ticks.length;f++)this._removeClass(this.ticks[f],"round triangle hide");var I=["round","triangle","custom"],J=-1!==I.indexOf(this.options.handle);if(J)for(this._addClass(this.handle1,this.options.handle),this._addClass(this.handle2,this.options.handle),f=0;f<this.ticks.length;f++)this._addClass(this.ticks[f],this.options.handle);if(this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos],this.setValue(this._state.value),this.handle1Keydown=this._keydown.bind(this,0),this.handle1.addEventListener("keydown",this.handle1Keydown,!1),this.handle2Keydown=this._keydown.bind(this,1),this.handle2.addEventListener("keydown",this.handle2Keydown,!1),this.mousedown=this._mousedown.bind(this),this.touchstart=this._touchstart.bind(this),this.touchmove=this._touchmove.bind(this),this.touchCapable){var K=!1;try{var L=Object.defineProperty({},"passive",{get:function(){K=!0}});window.addEventListener("test",null,L)}catch(M){}var N=K?{passive:!0}:!1;this.sliderElem.addEventListener("touchstart",this.touchstart,N),this.sliderElem.addEventListener("touchmove",this.touchmove,N)}if(this.sliderElem.addEventListener("mousedown",this.mousedown,!1),this.resize=this._resize.bind(this),window.addEventListener("resize",this.resize,!1),"hide"===this.options.tooltip)this._addClass(this.tooltip,"hide"),this._addClass(this.tooltip_min,"hide"),this._addClass(this.tooltip_max,"hide");else if("always"===this.options.tooltip)this._showTooltip(),this._alwaysShowTooltip=!0;else{if(this.showTooltip=this._showTooltip.bind(this),this.hideTooltip=this._hideTooltip.bind(this),this.options.ticks_tooltip){var O=this._addTickListener(),P=O.addMouseEnter(this,this.handle1),Q=O.addMouseLeave(this,this.handle1);this.handleCallbackMap.handle1={mouseEnter:P,mouseLeave:Q},P=O.addMouseEnter(this,this.handle2),Q=O.addMouseLeave(this,this.handle2),this.handleCallbackMap.handle2={mouseEnter:P,mouseLeave:Q}}else this.sliderElem.addEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.addEventListener("mouseleave",this.hideTooltip,!1);this.handle1.addEventListener("focus",this.showTooltip,!1),this.handle1.addEventListener("blur",this.hideTooltip,!1),this.handle2.addEventListener("focus",this.showTooltip,!1),this.handle2.addEventListener("blur",this.hideTooltip,!1)}this.options.enabled?this.enable():this.disable()}var f={formatInvalidInputErrorMsg:function(a){return"Invalid input value '"+a+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"},g={linear:{toValue:function(a){var b=a/100*(this.options.max-this.options.min),c=!0;if(this.options.ticks_positions.length>0){for(var d,e,f,g=0,h=1;h<this.options.ticks_positions.length;h++)if(a<=this.options.ticks_positions[h]){d=this.options.ticks[h-1],f=this.options.ticks_positions[h-1],e=this.options.ticks[h],g=this.options.ticks_positions[h];break}var i=(a-f)/(g-f);b=d+i*(e-d),c=!1}var j=c?this.options.min:0,k=j+Math.round(b/this.options.step)*this.options.step;return k<this.options.min?this.options.min:k>this.options.max?this.options.max:k},toPercentage:function(a){if(this.options.max===this.options.min)return 0;if(this.options.ticks_positions.length>0){for(var b,c,d,e=0,f=0;f<this.options.ticks.length;f++)if(a<=this.options.ticks[f]){b=f>0?this.options.ticks[f-1]:0,d=f>0?this.options.ticks_positions[f-1]:0,c=this.options.ticks[f],e=this.options.ticks_positions[f];break}if(f>0){var g=(a-b)/(c-b);return d+g*(e-d)}}return 100*(a-this.options.min)/(this.options.max-this.options.min)}},logarithmic:{toValue:function(a){var b=0===this.options.min?0:Math.log(this.options.min),c=Math.log(this.options.max),d=Math.exp(b+(c-b)*a/100);return Math.round(d)===this.options.max?this.options.max:(d=this.options.min+Math.round((d-this.options.min)/this.options.step)*this.options.step,d<this.options.min?this.options.min:d>this.options.max?this.options.max:d)},toPercentage:function(a){if(this.options.max===this.options.min)return 0;var b=Math.log(this.options.max),c=0===this.options.min?0:Math.log(this.options.min),d=0===a?0:Math.log(a);return 100*(d-c)/(b-c)}}};if(d=function(a,b){return e.call(this,a,b),this},d.prototype={_init:function(){},constructor:d,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_split:!1,handle:"round",reversed:!1,rtl:"auto",enabled:!0,formatter:function(a){return Array.isArray(a)?a[0]+" : "+a[1]:a},natural_arrow_keys:!1,ticks:[],ticks_positions:[],ticks_labels:[],ticks_snap_bounds:0,ticks_tooltip:!1,scale:"linear",focus:!1,tooltip_position:null,labelledby:null,rangeHighlights:[]},getElement:function(){return this.sliderElem},getValue:function(){return this.options.range?this._state.value:this._state.value[0]},setValue:function(a,b,c){a||(a=0);var d=this.getValue();this._state.value=this._validateInputValue(a);var e=this._applyPrecision.bind(this);this.options.range?(this._state.value[0]=e(this._state.value[0]),this._state.value[1]=e(this._state.value[1]),this._state.value[0]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[0])),this._state.value[1]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[1]))):(this._state.value=e(this._state.value),this._state.value=[Math.max(this.options.min,Math.min(this.options.max,this._state.value))],this._addClass(this.handle2,"hide"),"after"===this.options.selection?this._state.value[1]=this.options.max:this._state.value[1]=this.options.min),this.options.max>this.options.min?this._state.percentage=[this._toPercentage(this._state.value[0]),this._toPercentage(this._state.value[1]),100*this.options.step/(this.options.max-this.options.min)]:this._state.percentage=[0,0,100],this._layout();var f=this.options.range?this._state.value:this._state.value[0];return this._setDataVal(f),b===!0&&this._trigger("slide",f),d!==f&&c===!0&&this._trigger("change",{oldValue:d,newValue:f}),this},destroy:function(){this._removeSliderEventHandlers(),this.sliderElem.parentNode.removeChild(this.sliderElem),this.element.style.display="",this._cleanUpEventCallbacksMap(),this.element.removeAttribute("data"),a&&(this._unbindJQueryEventHandlers(),this.$element.removeData("slider"))},disable:function(){return this._state.enabled=!1,this.handle1.removeAttribute("tabindex"),this.handle2.removeAttribute("tabindex"),this._addClass(this.sliderElem,"slider-disabled"),this._trigger("slideDisabled"),this},enable:function(){return this._state.enabled=!0,this.handle1.setAttribute("tabindex",0),this.handle2.setAttribute("tabindex",0),this._removeClass(this.sliderElem,"slider-disabled"),this._trigger("slideEnabled"),this},toggle:function(){return this._state.enabled?this.disable():this.enable(),this},isEnabled:function(){return this._state.enabled},on:function(a,b){return this._bindNonQueryEventHandler(a,b),this},off:function(b,c){a?(this.$element.off(b,c),this.$sliderElem.off(b,c)):this._unbindNonQueryEventHandler(b,c)},getAttribute:function(a){return a?this.options[a]:this.options},setAttribute:function(a,b){return this.options[a]=b,this},refresh:function(){return this._removeSliderEventHandlers(),e.call(this,this.element,this.options),a&&a.data(this.element,"slider",this),this},relayout:function(){return this._resize(),this._layout(),this},_removeSliderEventHandlers:function(){if(this.handle1.removeEventListener("keydown",this.handle1Keydown,!1),this.handle2.removeEventListener("keydown",this.handle2Keydown,!1),this.options.ticks_tooltip){for(var a=this.ticksContainer.getElementsByClassName("slider-tick"),b=0;b<a.length;b++)a[b].removeEventListener("mouseenter",this.ticksCallbackMap[b].mouseEnter,!1),a[b].removeEventListener("mouseleave",this.ticksCallbackMap[b].mouseLeave,!1);this.handle1.removeEventListener("mouseenter",this.handleCallbackMap.handle1.mouseEnter,!1),this.handle2.removeEventListener("mouseenter",this.handleCallbackMap.handle2.mouseEnter,!1),this.handle1.removeEventListener("mouseleave",this.handleCallbackMap.handle1.mouseLeave,!1),this.handle2.removeEventListener("mouseleave",this.handleCallbackMap.handle2.mouseLeave,!1)}this.handleCallbackMap=null,this.ticksCallbackMap=null,this.showTooltip&&(this.handle1.removeEventListener("focus",this.showTooltip,!1),this.handle2.removeEventListener("focus",this.showTooltip,!1)),this.hideTooltip&&(this.handle1.removeEventListener("blur",this.hideTooltip,!1),this.handle2.removeEventListener("blur",this.hideTooltip,!1)),this.showTooltip&&this.sliderElem.removeEventListener("mouseenter",this.showTooltip,!1),this.hideTooltip&&this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,!1),this.sliderElem.removeEventListener("touchstart",this.touchstart,!1),this.sliderElem.removeEventListener("touchmove",this.touchmove,!1),this.sliderElem.removeEventListener("mousedown",this.mousedown,!1),window.removeEventListener("resize",this.resize,!1)},_bindNonQueryEventHandler:function(a,b){void 0===this.eventToCallbackMap[a]&&(this.eventToCallbackMap[a]=[]),this.eventToCallbackMap[a].push(b)},_unbindNonQueryEventHandler:function(a,b){var c=this.eventToCallbackMap[a];if(void 0!==c)for(var d=0;d<c.length;d++)if(c[d]===b){c.splice(d,1);break}},_cleanUpEventCallbacksMap:function(){for(var a=Object.keys(this.eventToCallbackMap),b=0;b<a.length;b++){var c=a[b];delete this.eventToCallbackMap[c]}},_showTooltip:function(){this.options.tooltip_split===!1?(this._addClass(this.tooltip,"in"),this.tooltip_min.style.display="none",this.tooltip_max.style.display="none"):(this._addClass(this.tooltip_min,"in"),this._addClass(this.tooltip_max,"in"),this.tooltip.style.display="none"),this._state.over=!0},_hideTooltip:function(){this._state.inDrag===!1&&this.alwaysShowTooltip!==!0&&(this._removeClass(this.tooltip,"in"),this._removeClass(this.tooltip_min,"in"),this._removeClass(this.tooltip_max,"in")),this._state.over=!1},_setToolTipOnMouseOver:function(a){function b(a,b){return b?[100-a.percentage[0],this.options.range?100-a.percentage[1]:a.percentage[1]]:[a.percentage[0],a.percentage[1]]}var c=this.options.formatter(a?a.value[0]:this._state.value[0]),d=a?b(a,this.options.reversed):b(this._state,this.options.reversed);this._setText(this.tooltipInner,c),this.tooltip.style[this.stylePos]=d[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetWidth/2+"px")},_addTickListener:function(){return{addMouseEnter:function(a,b,c){var d=function(){var b=a._state,d=c>=0?c:this.attributes["aria-valuenow"].value,e=parseInt(d,10);b.value[0]=e,b.percentage[0]=a.options.ticks_positions[e],a._setToolTipOnMouseOver(b),a._showTooltip()};return b.addEventListener("mouseenter",d,!1),d},addMouseLeave:function(a,b){var c=function(){a._hideTooltip()};return b.addEventListener("mouseleave",c,!1),c}}},_layout:function(){var a;if(a=this.options.reversed?[100-this._state.percentage[0],this.options.range?100-this._state.percentage[1]:this._state.percentage[1]]:[this._state.percentage[0],this._state.percentage[1]],this.handle1.style[this.stylePos]=a[0]+"%",this.handle1.setAttribute("aria-valuenow",this._state.value[0]),isNaN(this.options.formatter(this._state.value[0]))&&this.handle1.setAttribute("aria-valuetext",this.options.formatter(this._state.value[0])),this.handle2.style[this.stylePos]=a[1]+"%",this.handle2.setAttribute("aria-valuenow",this._state.value[1]),isNaN(this.options.formatter(this._state.value[1]))&&this.handle2.setAttribute("aria-valuetext",this.options.formatter(this._state.value[1])),this.rangeHighlightElements.length>0&&Array.isArray(this.options.rangeHighlights)&&this.options.rangeHighlights.length>0)for(var b=0;b<this.options.rangeHighlights.length;b++){var c=this._toPercentage(this.options.rangeHighlights[b].start),d=this._toPercentage(this.options.rangeHighlights[b].end);if(this.options.reversed){var e=100-d;d=100-c,c=e}var f=this._createHighlightRange(c,d);f?"vertical"===this.options.orientation?(this.rangeHighlightElements[b].style.top=f.start+"%",this.rangeHighlightElements[b].style.height=f.size+"%"):(this.options.rtl?this.rangeHighlightElements[b].style.right=f.start+"%":this.rangeHighlightElements[b].style.left=f.start+"%",this.rangeHighlightElements[b].style.width=f.size+"%"):this.rangeHighlightElements[b].style.display="none"}if(Array.isArray(this.options.ticks)&&this.options.ticks.length>0){var g,h="vertical"===this.options.orientation?"height":"width";g="vertical"===this.options.orientation?"marginTop":this.options.rtl?"marginRight":"marginLeft";var i=this._state.size/(this.options.ticks.length-1);if(this.tickLabelContainer){var j=0;if(0===this.options.ticks_positions.length)"vertical"!==this.options.orientation&&(this.tickLabelContainer.style[g]=-i/2+"px"),j=this.tickLabelContainer.offsetHeight;else for(k=0;k<this.tickLabelContainer.childNodes.length;k++)this.tickLabelContainer.childNodes[k].offsetHeight>j&&(j=this.tickLabelContainer.childNodes[k].offsetHeight);"horizontal"===this.options.orientation&&(this.sliderElem.style.marginBottom=j+"px")}for(var k=0;k<this.options.ticks.length;k++){var l=this.options.ticks_positions[k]||this._toPercentage(this.options.ticks[k]);this.options.reversed&&(l=100-l),this.ticks[k].style[this.stylePos]=l+"%",this._removeClass(this.ticks[k],"in-selection"),this.options.range?l>=a[0]&&l<=a[1]&&this._addClass(this.ticks[k],"in-selection"):"after"===this.options.selection&&l>=a[0]?this._addClass(this.ticks[k],"in-selection"):"before"===this.options.selection&&l<=a[0]&&this._addClass(this.ticks[k],"in-selection"),this.tickLabels[k]&&(this.tickLabels[k].style[h]=i+"px","vertical"!==this.options.orientation&&void 0!==this.options.ticks_positions[k]?(this.tickLabels[k].style.position="absolute",this.tickLabels[k].style[this.stylePos]=l+"%",this.tickLabels[k].style[g]=-i/2+"px"):"vertical"===this.options.orientation&&(this.options.rtl?this.tickLabels[k].style.marginRight=this.sliderElem.offsetWidth+"px":this.tickLabels[k].style.marginLeft=this.sliderElem.offsetWidth+"px",this.tickLabelContainer.style[g]=this.sliderElem.offsetWidth/2*-1+"px"))}}var m;if(this.options.range){m=this.options.formatter(this._state.value),this._setText(this.tooltipInner,m),this.tooltip.style[this.stylePos]=(a[1]+a[0])/2+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetWidth/2+"px");var n=this.options.formatter(this._state.value[0]);this._setText(this.tooltipInner_min,n);var o=this.options.formatter(this._state.value[1]);this._setText(this.tooltipInner_max,o),this.tooltip_min.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip_min,"margin-"+this.stylePos,-this.tooltip_min.offsetHeight/2+"px"):this._css(this.tooltip_min,"margin-"+this.stylePos,-this.tooltip_min.offsetWidth/2+"px"),this.tooltip_max.style[this.stylePos]=a[1]+"%","vertical"===this.options.orientation?this._css(this.tooltip_max,"margin-"+this.stylePos,-this.tooltip_max.offsetHeight/2+"px"):this._css(this.tooltip_max,"margin-"+this.stylePos,-this.tooltip_max.offsetWidth/2+"px")}else m=this.options.formatter(this._state.value[0]),this._setText(this.tooltipInner,m),this.tooltip.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-"+this.stylePos,-this.tooltip.offsetWidth/2+"px");if("vertical"===this.options.orientation)this.trackLow.style.top="0",this.trackLow.style.height=Math.min(a[0],a[1])+"%",this.trackSelection.style.top=Math.min(a[0],a[1])+"%",this.trackSelection.style.height=Math.abs(a[0]-a[1])+"%",this.trackHigh.style.bottom="0",this.trackHigh.style.height=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";else{"right"===this.stylePos?this.trackLow.style.right="0":this.trackLow.style.left="0",this.trackLow.style.width=Math.min(a[0],a[1])+"%","right"===this.stylePos?this.trackSelection.style.right=Math.min(a[0],a[1])+"%":this.trackSelection.style.left=Math.min(a[0],a[1])+"%",this.trackSelection.style.width=Math.abs(a[0]-a[1])+"%","right"===this.stylePos?this.trackHigh.style.left="0":this.trackHigh.style.right="0",this.trackHigh.style.width=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";var p=this.tooltip_min.getBoundingClientRect(),q=this.tooltip_max.getBoundingClientRect();"bottom"===this.options.tooltip_position?p.right>q.left?(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top="",this.tooltip_max.style.bottom="22px"):(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top=this.tooltip_min.style.top,this.tooltip_max.style.bottom=""):p.right>q.left?(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top="18px"):(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=this.tooltip_min.style.top)}},_createHighlightRange:function(a,b){return this._isHighlightRange(a,b)?a>b?{start:b,size:a-b}:{start:a,size:b-a}:null},_isHighlightRange:function(a,b){return a>=0&&100>=a&&b>=0&&100>=b?!0:!1},_resize:function(a){this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos],this._layout()},_removeProperty:function(a,b){a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(b)},_mousedown:function(a){if(!this._state.enabled)return!1;this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos];var b=this._getPercentage(a);if(this.options.range){var c=Math.abs(this._state.percentage[0]-b),d=Math.abs(this._state.percentage[1]-b);this._state.dragged=d>c?0:1,this._adjustPercentageForRangeSliders(b)}else this._state.dragged=0;this._state.percentage[this._state.dragged]=b,this._layout(),this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),this.mousemove&&document.removeEventListener("mousemove",this.mousemove,!1),this.mouseup&&document.removeEventListener("mouseup",this.mouseup,!1),this.mousemove=this._mousemove.bind(this),this.mouseup=this._mouseup.bind(this),this.touchCapable&&(document.addEventListener("touchmove",this.mousemove,!1),document.addEventListener("touchend",this.mouseup,!1)),document.addEventListener("mousemove",this.mousemove,!1),document.addEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!0;var e=this._calculateValue();return this._trigger("slideStart",e),this._setDataVal(e),this.setValue(e,!1,!0),a.returnValue=!1,this.options.focus&&this._triggerFocusOnHandle(this._state.dragged),!0},_touchstart:function(a){if(void 0===a.changedTouches)return void this._mousedown(a);var b=a.changedTouches[0];this.touchX=b.pageX,this.touchY=b.pageY},_triggerFocusOnHandle:function(a){0===a&&this.handle1.focus(),1===a&&this.handle2.focus()},_keydown:function(a,b){if(!this._state.enabled)return!1;var c;switch(b.keyCode){case 37:case 40:c=-1;break;case 39:case 38:c=1}if(c){if(this.options.natural_arrow_keys){var d="vertical"===this.options.orientation&&!this.options.reversed,e="horizontal"===this.options.orientation&&this.options.reversed;(d||e)&&(c=-c)}var f=this._state.value[a]+c*this.options.step,g=f/this.options.max*100;if(this._state.keyCtrl=a,this.options.range){this._adjustPercentageForRangeSliders(g);var h=this._state.keyCtrl?this._state.value[0]:f,i=this._state.keyCtrl?f:this._state.value[1];f=[h,i]}return this._trigger("slideStart",f),this._setDataVal(f),this.setValue(f,!0,!0),this._setDataVal(f),this._trigger("slideStop",f),this._layout(),this._pauseEvent(b),delete this._state.keyCtrl,!1}},_pauseEvent:function(a){a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault(),a.cancelBubble=!0,a.returnValue=!1},_mousemove:function(a){if(!this._state.enabled)return!1;var b=this._getPercentage(a);this._adjustPercentageForRangeSliders(b),this._state.percentage[this._state.dragged]=b,this._layout();var c=this._calculateValue(!0);return this.setValue(c,!0,!0),!1},_touchmove:function(a){if(void 0!==a.changedTouches){var b=a.changedTouches[0],c=b.pageX-this.touchX,d=b.pageY-this.touchY;this._state.inDrag||("vertical"===this.options.orientation&&5>=c&&c>=-5&&(d>=15||-15>=d)?this._mousedown(a):5>=d&&d>=-5&&(c>=15||-15>=c)&&this._mousedown(a))}},_adjustPercentageForRangeSliders:function(a){if(this.options.range){var b=this._getNumDigitsAfterDecimalPlace(a);b=b?b-1:0;var c=this._applyToFixedAndParseFloat(a,b);0===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[1],b)<c?(this._state.percentage[0]=this._state.percentage[1],this._state.dragged=1):1===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[0],b)>c?(this._state.percentage[1]=this._state.percentage[0],this._state.dragged=0):0===this._state.keyCtrl&&this._state.value[1]/this.options.max*100<a?(this._state.percentage[0]=this._state.percentage[1],this._state.keyCtrl=1,this.handle2.focus()):1===this._state.keyCtrl&&this._state.value[0]/this.options.max*100>a&&(this._state.percentage[1]=this._state.percentage[0],this._state.keyCtrl=0,this.handle1.focus())}},_mouseup:function(){if(!this._state.enabled)return!1;this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),document.removeEventListener("mousemove",this.mousemove,!1),document.removeEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!1,this._state.over===!1&&this._hideTooltip();var a=this._calculateValue(!0);return this._layout(),this._setDataVal(a),this._trigger("slideStop",a),!1},_calculateValue:function(a){var b;if(this.options.range?(b=[this.options.min,this.options.max],0!==this._state.percentage[0]&&(b[0]=this._toValue(this._state.percentage[0]),b[0]=this._applyPrecision(b[0])),100!==this._state.percentage[1]&&(b[1]=this._toValue(this._state.percentage[1]),b[1]=this._applyPrecision(b[1]))):(b=this._toValue(this._state.percentage[0]),b=parseFloat(b),b=this._applyPrecision(b)),a){for(var c=[b,1/0],d=0;d<this.options.ticks.length;d++){
var e=Math.abs(this.options.ticks[d]-b);e<=c[1]&&(c=[this.options.ticks[d],e])}if(c[1]<=this.options.ticks_snap_bounds)return c[0]}return b},_applyPrecision:function(a){var b=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.options.step);return this._applyToFixedAndParseFloat(a,b)},_getNumDigitsAfterDecimalPlace:function(a){var b=(""+a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return b?Math.max(0,(b[1]?b[1].length:0)-(b[2]?+b[2]:0)):0},_applyToFixedAndParseFloat:function(a,b){var c=a.toFixed(b);return parseFloat(c)},_getPercentage:function(a){!this.touchCapable||"touchstart"!==a.type&&"touchmove"!==a.type||(a=a.touches[0]);var b=a[this.mousePos],c=this._state.offset[this.stylePos],d=b-c;"right"===this.stylePos&&(d=-d);var e=d/this._state.size*100;return e=Math.round(e/this._state.percentage[2])*this._state.percentage[2],this.options.reversed&&(e=100-e),Math.max(0,Math.min(100,e))},_validateInputValue:function(a){if(isNaN(+a)){if(Array.isArray(a))return this._validateArray(a),a;throw new Error(f.formatInvalidInputErrorMsg(a))}return+a},_validateArray:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("number"!=typeof c)throw new Error(f.formatInvalidInputErrorMsg(c))}},_setDataVal:function(a){this.element.setAttribute("data-value",a),this.element.setAttribute("value",a),this.element.value=a},_trigger:function(b,c){c=c||0===c?c:void 0;var d=this.eventToCallbackMap[b];if(d&&d.length)for(var e=0;e<d.length;e++){var f=d[e];f(c)}a&&this._triggerJQueryEvent(b,c)},_triggerJQueryEvent:function(a,b){var c={type:a,value:b};this.$element.trigger(c),this.$sliderElem.trigger(c)},_unbindJQueryEventHandlers:function(){this.$element.off(),this.$sliderElem.off()},_setText:function(a,b){"undefined"!=typeof a.textContent?a.textContent=b:"undefined"!=typeof a.innerText&&(a.innerText=b)},_removeClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)");d=d.replace(g," ")}a.className=d.trim()},_addClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)"),h=g.test(d);h||(d+=" "+f)}a.className=d.trim()},_offsetLeft:function(a){return a.getBoundingClientRect().left},_offsetRight:function(a){return a.getBoundingClientRect().right},_offsetTop:function(a){for(var b=a.offsetTop;(a=a.offsetParent)&&!isNaN(a.offsetTop);)b+=a.offsetTop,"BODY"!==a.tagName&&(b-=a.scrollTop);return b},_offset:function(a){return{left:this._offsetLeft(a),right:this._offsetRight(a),top:this._offsetTop(a)}},_css:function(b,c,d){if(a)a.style(b,c,d);else{var e=c.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(a,b){return b.toUpperCase()});b.style[e]=d}},_toValue:function(a){return this.options.scale.toValue.apply(this,[a])},_toPercentage:function(a){return this.options.scale.toPercentage.apply(this,[a])},_setTooltipPosition:function(){var a=[this.tooltip,this.tooltip_min,this.tooltip_max];if("vertical"===this.options.orientation){var b;b=this.options.tooltip_position?this.options.tooltip_position:this.options.rtl?"left":"right";var c="left"===b?"right":"left";a.forEach(function(a){this._addClass(a,b),a.style[c]="100%"}.bind(this))}else"bottom"===this.options.tooltip_position?a.forEach(function(a){this._addClass(a,"bottom"),a.style.top="22px"}.bind(this)):a.forEach(function(a){this._addClass(a,"top"),a.style.top=-this.tooltip.outerHeight-14+"px"}.bind(this))}},a&&a.fn){var h=void 0;a.fn.slider?(windowIsDefined&&window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead."),h=c):(a.bridget(b,d),h=b),a.bridget(c,d),a(function(){a("input[data-provide=slider]")[h]()})}}(a),d});
!function(a,b,c,d){"use strict";var e="treeview",f={};f.settings={injectStyle:!0,levels:2,expandIcon:"glyphicon glyphicon-plus",collapseIcon:"glyphicon glyphicon-minus",loadingIcon:"glyphicon glyphicon-hourglass",emptyIcon:"glyphicon",nodeIcon:"",selectedIcon:"",checkedIcon:"glyphicon glyphicon-check",partiallyCheckedIcon:"glyphicon glyphicon-expand",uncheckedIcon:"glyphicon glyphicon-unchecked",tagsClass:"badge",color:d,backColor:d,borderColor:d,changedNodeColor:"#39A5DC",onhoverColor:"#F5F5F5",selectedColor:"#FFFFFF",selectedBackColor:"#428bca",searchResultColor:"#D9534F",searchResultBackColor:d,highlightSelected:!0,highlightSearchResults:!0,showBorder:!0,showIcon:!0,showImage:!1,showCheckbox:!1,checkboxFirst:!1,highlightChanges:!1,showTags:!1,multiSelect:!1,preventUnselect:!1,allowReselect:!1,hierarchicalCheck:!1,propagateCheckEvent:!1,wrapNodeText:!1,onLoading:d,onLoadingFailed:d,onInitialized:d,onNodeRendered:d,onRendered:d,onDestroyed:d,onNodeChecked:d,onNodeCollapsed:d,onNodeDisabled:d,onNodeEnabled:d,onNodeExpanded:d,onNodeSelected:d,onNodeEnter:d,onNodeLeave:d,onNodeContextMenu:d,onNodeUnchecked:d,onNodeUnselected:d,onSearchComplete:d,onSearchCleared:d},f.options={silent:!1,ignoreChildren:!1},f.searchOptions={ignoreCase:!0,exactMatch:!1,revealResults:!0},f.dataUrl={method:"GET",dataType:"json",cache:!1};var g=function(b,c){return this.$element=a(b),this._elementId=b.id,this._styleId=this._elementId+"-style",this._init(c),{options:this._options,init:a.proxy(this._init,this),remove:a.proxy(this._remove,this),findNodes:a.proxy(this.findNodes,this),getTree:a.proxy(this.getTree,this),getNodes:a.proxy(this.getNodes,this),getParents:a.proxy(this.getParents,this),getSiblings:a.proxy(this.getSiblings,this),getRootNodes:a.proxy(this.getRootNodes,this),getSelected:a.proxy(this.getSelected,this),getUnselected:a.proxy(this.getUnselected,this),getExpanded:a.proxy(this.getExpanded,this),getCollapsed:a.proxy(this.getCollapsed,this),getChecked:a.proxy(this.getChecked,this),getUnchecked:a.proxy(this.getUnchecked,this),getDisabled:a.proxy(this.getDisabled,this),getEnabled:a.proxy(this.getEnabled,this),addNode:a.proxy(this.addNode,this),addNodeAfter:a.proxy(this.addNodeAfter,this),addNodeBefore:a.proxy(this.addNodeBefore,this),removeNode:a.proxy(this.removeNode,this),updateNode:a.proxy(this.updateNode,this),selectNode:a.proxy(this.selectNode,this),unselectNode:a.proxy(this.unselectNode,this),toggleNodeSelected:a.proxy(this.toggleNodeSelected,this),collapseAll:a.proxy(this.collapseAll,this),collapseNode:a.proxy(this.collapseNode,this),expandAll:a.proxy(this.expandAll,this),expandNode:a.proxy(this.expandNode,this),toggleNodeExpanded:a.proxy(this.toggleNodeExpanded,this),revealNode:a.proxy(this.revealNode,this),checkAll:a.proxy(this.checkAll,this),checkNode:a.proxy(this.checkNode,this),uncheckAll:a.proxy(this.uncheckAll,this),uncheckNode:a.proxy(this.uncheckNode,this),toggleNodeChecked:a.proxy(this.toggleNodeChecked,this),unmarkCheckboxChanges:a.proxy(this.unmarkCheckboxChanges,this),disableAll:a.proxy(this.disableAll,this),disableNode:a.proxy(this.disableNode,this),enableAll:a.proxy(this.enableAll,this),enableNode:a.proxy(this.enableNode,this),toggleNodeDisabled:a.proxy(this.toggleNodeDisabled,this),search:a.proxy(this.search,this),clearSearch:a.proxy(this.clearSearch,this)}};g.prototype._init=function(b){this._tree=[],this._initialized=!1,this._options=a.extend({},f.settings,b),this._template.icon.empty.addClass(this._options.emptyIcon),this._destroy(),this._subscribeEvents(),this._triggerEvent("loading",null,f.options),this._load(b).then(a.proxy(function(b){return this._tree=a.extend(!0,[],b)},this),a.proxy(function(a){this._triggerEvent("loadingFailed",a,f.options)},this)).then(a.proxy(function(a){return this._setInitialStates({nodes:a},0)},this)).then(a.proxy(function(){this._render()},this))},g.prototype._load=function(b){var c=new a.Deferred;return b.data?this._loadLocalData(b,c):b.dataUrl&&this._loadRemoteData(b,c),c.promise()},g.prototype._loadRemoteData=function(b,c){a.ajax(a.extend(!0,{},f.dataUrl,b.dataUrl)).done(function(a){c.resolve(a)}).fail(function(a,b,d){c.reject(d)})},g.prototype._loadLocalData=function(b,c){c.resolve("string"==typeof b.data?JSON.parse(b.data):a.extend(!0,[],b.data))},g.prototype._remove=function(){this._destroy(),a.removeData(this,e),a("#"+this._styleId).remove()},g.prototype._destroy=function(){this._initialized&&(this._initialized=!1,this._triggerEvent("destroyed",null,f.options),this._unsubscribeEvents(),this.$wrapper.remove(),this.$wrapper=null)},g.prototype._unsubscribeEvents=function(){this.$element.off("loading"),this.$element.off("loadingFailed"),this.$element.off("initialized"),this.$element.off("nodeRendered"),this.$element.off("rendered"),this.$element.off("destroyed"),this.$element.off("click"),this.$element.off("mouseover"),this.$element.off("mouseleave"),this.$element.off("nodeChecked"),this.$element.off("nodeCollapsed"),this.$element.off("nodeDisabled"),this.$element.off("nodeEnabled"),this.$element.off("nodeExpanded"),this.$element.off("nodeSelected"),this.$element.off("nodeEnter"),this.$element.off("nodeLeave"),this.$element.off("nodeContextMenu"),this.$element.off("nodeUnchecked"),this.$element.off("nodeUnselected"),this.$element.off("searchComplete"),this.$element.off("searchCleared")},g.prototype._subscribeEvents=function(){this._unsubscribeEvents(),"function"==typeof this._options.onLoading&&this.$element.on("loading",this._options.onLoading),"function"==typeof this._options.onLoadingFailed&&this.$element.on("loadingFailed",this._options.onLoadingFailed),"function"==typeof this._options.onInitialized&&this.$element.on("initialized",this._options.onInitialized),"function"==typeof this._options.onNodeRendered&&this.$element.on("nodeRendered",this._options.onNodeRendered),"function"==typeof this._options.onRendered&&this.$element.on("rendered",this._options.onRendered),"function"==typeof this._options.onDestroyed&&this.$element.on("destroyed",this._options.onDestroyed),this.$element.on("click",a.proxy(this._clickHandler,this)),this.$element.on("mouseover",a.proxy(this._mouseoverHandler,this)),this.$element.on("mouseleave",a.proxy(this._mouseleaveHandler,this)),this.$element.on("contextmenu",a.proxy(this._contextmenuHandler,this)),"function"==typeof this._options.onNodeChecked&&this.$element.on("nodeChecked",this._options.onNodeChecked),"function"==typeof this._options.onNodeCollapsed&&this.$element.on("nodeCollapsed",this._options.onNodeCollapsed),"function"==typeof this._options.onNodeDisabled&&this.$element.on("nodeDisabled",this._options.onNodeDisabled),"function"==typeof this._options.onNodeEnabled&&this.$element.on("nodeEnabled",this._options.onNodeEnabled),"function"==typeof this._options.onNodeExpanded&&this.$element.on("nodeExpanded",this._options.onNodeExpanded),"function"==typeof this._options.onNodeSelected&&this.$element.on("nodeSelected",this._options.onNodeSelected),"function"==typeof this._options.onNodeEnter&&this.$element.on("nodeEnter",this._options.onNodeEnter),"function"==typeof this._options.onNodeLeave&&this.$element.on("nodeLeave",this._options.onNodeLeave),"function"==typeof this._options.onNodeContextMenu&&this.$element.on("nodeContextMenu",this._options.onNodeContextMenu),"function"==typeof this._options.onNodeUnchecked&&this.$element.on("nodeUnchecked",this._options.onNodeUnchecked),"function"==typeof this._options.onNodeUnselected&&this.$element.on("nodeUnselected",this._options.onNodeUnselected),"function"==typeof this._options.onSearchComplete&&this.$element.on("searchComplete",this._options.onSearchComplete),"function"==typeof this._options.onSearchCleared&&this.$element.on("searchCleared",this._options.onSearchCleared)},g.prototype._triggerEvent=function(b,c,d){d&&!d.silent&&this.$element.trigger(b,a.extend(!0,{},c))},g.prototype._setInitialStates=function(b,c){return this._nodes={},a.when.apply(this,this._setInitialState(b,c)).done(a.proxy(function(){this._orderedNodes=this._sortNodes(),this._inheritCheckboxChanges(),this._triggerEvent("initialized",this._orderedNodes,f.options)},this))},g.prototype._setInitialState=function(b,c,e){if(b.nodes){c+=1,e=e||[];var f=b;return a.each(b.nodes,a.proxy(function(b,g){var h=new a.Deferred;e.push(h.promise()),g.level=c,g.index=b,g.nodeId=f&&f.nodeId?f.nodeId+"."+g.index:c-1+"."+g.index,g.parentId=f.nodeId,g.hasOwnProperty("selectable")||(g.selectable=!0),g.hasOwnProperty("checkable")||(g.checkable=!0),g.state=g.state||{},g.state.hasOwnProperty("checked")||(g.state.checked=!1),this._options.hierarchicalCheck&&"undefined"===g.state.checked&&(g.state.checked=d),g.state.hasOwnProperty("disabled")||(g.state.disabled=!1),g.state.hasOwnProperty("expanded")||(!g.state.disabled&&c<this._options.levels&&g.nodes&&g.nodes.length>0?g.state.expanded=!0:g.state.expanded=!1),g.state.hasOwnProperty("selected")||(g.state.selected=!1),f&&f.state&&f.state.expanded||c<=this._options.levels?g.state.visible=!0:g.state.visible=!1,g.nodes&&(g.nodes.length>0?this._setInitialState(g,c,e):delete g.nodes),this._nodes[g.nodeId]=g,h.resolve()},this)),e}},g.prototype._sortNodes=function(){return a.map(Object.keys(this._nodes).sort(function(a,b){if(a===b)return 0;for(var a=a.split(".").map(function(a){return parseInt(a)}),b=b.split(".").map(function(a){return parseInt(a)}),c=Math.max(a.length,b.length),e=0;e<c;e++){if(a[e]===d)return-1;if(b[e]===d)return 1;if(a[e]-b[e]>0)return 1;if(a[e]-b[e]<0)return-1}}),a.proxy(function(a,b){return this._nodes[a]},this))},g.prototype._clickHandler=function(b){var c=a(b.target),d=this.targetNode(c);if(d&&!d.state.disabled){var e=c.attr("class")?c.attr("class").split(" "):[];e.indexOf("expand-icon")!==-1?this._toggleExpanded(d,a.extend({},f.options)):e.indexOf("check-icon")!==-1?d.checkable&&this._toggleChecked(d,a.extend({},f.options)):d.selectable?this._toggleSelected(d,a.extend({},f.options)):this._toggleExpanded(d,a.extend({},f.options))}},g.prototype._mouseoverHandler=function(b){var c=a(b.target),d=this.targetNode(c);this._triggerEvent("nodeEnter",d,f.options)},g.prototype._mouseleaveHandler=function(a){this._triggerEvent("nodeLeave",null,f.options)},g.prototype._contextmenuHandler=function(b){b.preventDefault();var c=a(b.target),d=this.targetNode(c);d&&(d.clientX=b.pageX,d.clientY=b.pageY,this._triggerEvent("nodeContextMenu",d,f.options))},g.prototype.targetNode=function(a){var b=a.closest("li.list-group-item").attr("data-nodeId"),c=this._nodes[b];return c||console.log("Error: node does not exist"),c},g.prototype._toggleExpanded=function(a,b){a&&("function"==typeof this._options.lazyLoad&&a.lazyLoad?this._lazyLoad(a):this._setExpanded(a,!a.state.expanded,b))},g.prototype._lazyLoad=function(a){a.$el.children("span.expand-icon").removeClass(this._options.expandIcon).addClass(this._options.loadingIcon);var b=this;this._options.lazyLoad(a,function(c){b.addNode(c,a)}),delete a.lazyLoad},g.prototype._setExpanded=function(b,c,d){d&&c===b.state.expanded||(c&&b.nodes?(b.state.expanded=!0,b.$el&&b.$el.children("span.expand-icon").removeClass(this._options.expandIcon).removeClass(this._options.loadingIcon).addClass(this._options.collapseIcon),b.nodes&&d&&a.each(b.nodes,a.proxy(function(a,b){this._setVisible(b,!0,d)},this)),this._triggerEvent("nodeExpanded",b,d)):c||(b.state.expanded=!1,b.$el&&b.$el.children("span.expand-icon").removeClass(this._options.collapseIcon).addClass(this._options.expandIcon),b.nodes&&d&&a.each(b.nodes,a.proxy(function(a,b){this._setVisible(b,!1,d),this._setExpanded(b,!1,d)},this)),this._triggerEvent("nodeCollapsed",b,d)))},g.prototype._setVisible=function(a,b,c){c&&b===a.state.visible||(b?(a.state.visible=!0,a.$el&&a.$el.removeClass("node-hidden")):(a.state.visible=!1,a.$el&&a.$el.addClass("node-hidden")))},g.prototype._toggleSelected=function(a,b){if(a)return this._setSelected(a,!a.state.selected,b),this},g.prototype._setSelected=function(b,c,d){if(!d||c!==b.state.selected){if(c)this._options.multiSelect||a.each(this._findNodes("true","state.selected"),a.proxy(function(b,c){this._setSelected(c,!1,a.extend(d,{unselecting:!0}))},this)),b.state.selected=!0,b.$el&&(b.$el.addClass("node-selected"),(b.selectedIcon||this._options.selectedIcon)&&b.$el.children("span.node-icon").removeClass(b.icon||this._options.nodeIcon).addClass(b.selectedIcon||this._options.selectedIcon)),this._triggerEvent("nodeSelected",b,d);else{if(this._options.preventUnselect&&d&&!d.unselecting&&1===this._findNodes("true","state.selected").length)return this._options.allowReselect&&this._triggerEvent("nodeSelected",b,d),this;b.state.selected=!1,b.$el&&(b.$el.removeClass("node-selected"),(b.selectedIcon||this._options.selectedIcon)&&b.$el.children("span.node-icon").removeClass(b.selectedIcon||this._options.selectedIcon).addClass(b.icon||this._options.nodeIcon)),this._triggerEvent("nodeUnselected",b,d)}return this}},g.prototype._inheritCheckboxChanges=function(){this._options.showCheckbox&&this._options.highlightChanges&&(this._checkedNodes=a.grep(this._orderedNodes,function(a){return a.state.checked}))},g.prototype._toggleChecked=function(b,c){if(b){if(this._options.hierarchicalCheck){var e,f=a.extend({},c,{silent:c.silent||!this._options.propagateCheckEvent}),g=b;for(b.state.checked=!b.state.checked;g=this._nodes[g.parentId];)e=g.nodes.reduce(function(a,b){return a===b.state.checked?a:d},g.nodes[0].state.checked),this._setChecked(g,e,f);if(b.nodes&&b.nodes.length>0)for(var h,i=b.nodes.slice();i&&i.length>0;)h=i.pop(),this._setChecked(h,b.state.checked,f),h.nodes&&h.nodes.length>0&&(i=i.concat(h.nodes.slice()));b.state.checked=!b.state.checked}this._setChecked(b,!b.state.checked,c)}},g.prototype._setChecked=function(a,b,c){c&&b===a.state.checked||(this._options.highlightChanges&&a.$el.toggleClass("node-check-changed",this._checkedNodes.indexOf(a)==-1==b),b?(a.state.checked=!0,a.$el&&(a.$el.addClass("node-checked").removeClass("node-checked-partial"),a.$el.children("span.check-icon").removeClass(this._options.uncheckedIcon).removeClass(this._options.partiallyCheckedIcon).addClass(this._options.checkedIcon)),this._triggerEvent("nodeChecked",a,c)):b===d&&this._options.hierarchicalCheck?(a.state.checked=d,a.$el&&(a.$el.addClass("node-checked-partial").removeClass("node-checked"),a.$el.children("span.check-icon").removeClass(this._options.uncheckedIcon).removeClass(this._options.checkedIcon).addClass(this._options.partiallyCheckedIcon)),this._triggerEvent("nodeUnchecked",a,c)):(a.state.checked=!1,a.$el&&(a.$el.removeClass("node-checked node-checked-partial"),a.$el.children("span.check-icon").removeClass(this._options.checkedIcon).removeClass(this._options.partiallyCheckedIcon).addClass(this._options.uncheckedIcon)),this._triggerEvent("nodeUnchecked",a,c)))},g.prototype._setDisabled=function(a,b,c){c&&b===a.state.disabled||(b?(a.state.disabled=!0,c&&!c.keepState&&(this._setSelected(a,!1,c),this._setChecked(a,!1,c),this._setExpanded(a,!1,c)),a.$el&&a.$el.addClass("node-disabled"),this._triggerEvent("nodeDisabled",a,c)):(a.state.disabled=!1,a.$el&&a.$el.removeClass("node-disabled"),this._triggerEvent("nodeEnabled",a,c)))},g.prototype._setSearchResult=function(a,b,c){c&&b===a.searchResult||(b?(a.searchResult=!0,a.$el&&a.$el.addClass("node-result")):(a.searchResult=!1,a.$el&&a.$el.removeClass("node-result")))},g.prototype._render=function(){this._initialized||(this.$wrapper=this._template.tree.clone(),this.$element.empty().addClass(e).append(this.$wrapper),this._injectStyle(),this._initialized=!0);var b;a.each(this._orderedNodes,a.proxy(function(a,c){this._renderNode(c,b),b=c},this)),this._triggerEvent("rendered",this._orderedNodes,f.options)},g.prototype._renderNode=function(b,c){if(b){b.$el?b.$el.empty():b.$el=this._newNodeEl(b,c).addClass("node-"+this._elementId),b.$el.addClass(b["class"]),b.id&&b.$el.attr("id",b.id),b.dataAttr&&a.each(b.dataAttr,function(a,c){b.$el.attr("data-"+a,c)}),b.$el.attr("data-nodeId",b.nodeId),b.tooltip&&b.$el.attr("title",b.tooltip);for(var e=0;e<b.level-1;e++)b.$el.append(this._template.indent.clone());if(b.$el.append(b.nodes||b.lazyLoad?this._template.icon.expand.clone():this._template.icon.empty.clone()),this._options.checkboxFirst?(this._addCheckbox(b),this._addIcon(b),this._addImage(b)):(this._addIcon(b),this._addImage(b),this._addCheckbox(b)),this._options.wrapNodeText){var g=this._template.text.clone();b.$el.append(g),g.append(b.text)}else b.$el.append(b.text);this._options.showTags&&b.tags&&a.each(b.tags,a.proxy(function(a,c){b.$el.append(this._template.badge.clone().addClass(("object"==typeof c?c["class"]:d)||b.tagsClass||this._options.tagsClass).append(("object"==typeof c?c.text:d)||c))},this)),this._setSelected(b,b.state.selected),this._setChecked(b,b.state.checked),this._setSearchResult(b,b.searchResult),this._setExpanded(b,b.state.expanded),this._setDisabled(b,b.state.disabled),this._setVisible(b,b.state.visible),this._triggerEvent("nodeRendered",b,f.options)}},g.prototype._addCheckbox=function(a){!this._options.showCheckbox||a.hideCheckbox!==d&&a.hideCheckbox!==!1||a.$el.append(this._template.icon.check.clone())},g.prototype._addIcon=function(a){!this._options.showIcon||this._options.showImage&&a.image||a.$el.append(this._template.icon.node.clone().addClass(a.icon||this._options.nodeIcon))},g.prototype._addImage=function(a){this._options.showImage&&a.image&&a.$el.append(this._template.image.clone().addClass("node-image").css("background-image","url('"+a.image+"')"))},g.prototype._newNodeEl=function(a,b){var c=this._template.node.clone();return b?b.$el.after(c):this.$wrapper.prepend(c),c},g.prototype._removeNodeEl=function(b){b&&(b.nodes&&a.each(b.nodes,a.proxy(function(a,b){this._removeNodeEl(b)},this)),b.$el.remove())},g.prototype._expandNode=function(b){b.nodes&&a.each(b.nodes.slice(0).reverse(),a.proxy(function(a,c){c.level=b.level+1,this._renderNode(c,b.$el)},this))},g.prototype._injectStyle=function(){this._options.injectStyle&&!c.getElementById(this._styleId)&&a('<style type="text/css" id="'+this._styleId+'"> '+this._buildStyle()+" </style>").appendTo("head")},g.prototype._buildStyle=function(){var b=".node-"+this._elementId+"{";if(this._options.color&&(b+="color:"+this._options.color+";"),this._options.backColor&&(b+="background-color:"+this._options.backColor+";"),this._options.showBorder?this._options.borderColor&&(b+="border:1px solid "+this._options.borderColor+";"):b+="border:none;",b+="}",this._options.onhoverColor&&(b+=".node-"+this._elementId+":not(.node-disabled):hover{background-color:"+this._options.onhoverColor+";}"),this._options.highlightSearchResults&&(this._options.searchResultColor||this._options.searchResultBackColor)){var c="";this._options.searchResultColor&&(c+="color:"+this._options.searchResultColor+";"),this._options.searchResultBackColor&&(c+="background-color:"+this._options.searchResultBackColor+";"),b+=".node-"+this._elementId+".node-result{"+c+"}",b+=".node-"+this._elementId+".node-result:hover{"+c+"}"}if(this._options.highlightSelected&&(this._options.selectedColor||this._options.selectedBackColor)){var c="";this._options.selectedColor&&(c+="color:"+this._options.selectedColor+";"),this._options.selectedBackColor&&(c+="background-color:"+this._options.selectedBackColor+";"),b+=".node-"+this._elementId+".node-selected{"+c+"}",b+=".node-"+this._elementId+".node-selected:hover{"+c+"}"}if(this._options.highlightChanges){var c="color: "+this._options.changedNodeColor+";";b+=".node-"+this._elementId+".node-check-changed{"+c+"}"}return a.each(this._orderedNodes,a.proxy(function(a,c){if(c.color||c.backColor){var d="";c.color&&(d+="color:"+c.color+";"),c.backColor&&(d+="background-color:"+c.backColor+";"),b+=".node-"+this._elementId+'[data-nodeId="'+c.nodeId+'"]{'+d+"}"}if(c.iconColor){var d="color:"+c.iconColor+";";b+=".node-"+this._elementId+'[data-nodeId="'+c.nodeId+'"] .node-icon{'+d+"}"}},this)),this._css+b},g.prototype._template={tree:a('<ul class="list-group"></ul>'),node:a('<li class="list-group-item"></li>'),indent:a('<span class="indent"></span>'),icon:{node:a('<span class="icon node-icon"></span>'),expand:a('<span class="icon expand-icon"></span>'),check:a('<span class="icon check-icon"></span>'),empty:a('<span class="icon"></span>')},image:a('<span class="image"></span>'),badge:a("<span></span>"),text:a('<span class="text"></span>')},g.prototype._css=".treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}",g.prototype.findNodes=function(a,b,c){return this._findNodes(a,b,c)},g.prototype.getTree=function(){return this._tree},g.prototype.getNodes=function(){return this._orderedNodes},g.prototype.getParents=function(b){b instanceof Array||(b=[b]);var c=[];return a.each(b,a.proxy(function(a,b){var d=!!b.parentId&&this._nodes[b.parentId];d&&c.push(d)},this)),c},g.prototype.getSiblings=function(b){b instanceof Array||(b=[b]);var c=[];return a.each(b,a.proxy(function(a,b){var d=this.getParents([b]),e=d[0]?d[0].nodes:this._tree;c=e.filter(function(a){return a.nodeId!==b.nodeId})},this)),a.map(c,function(a){return a})},g.prototype.getRootNodes=function(){var b=[],c=this._tree;return a.each(c,a.proxy(function(a,d){b=c.filter(function(a){return a.nodeId!==d.nodeId})},this)),a.map(b,function(a){return a})},g.prototype.getSelected=function(){return this._findNodes("true","state.selected")},g.prototype.getUnselected=function(){return this._findNodes("false","state.selected")},g.prototype.getExpanded=function(){return this._findNodes("true","state.expanded")},g.prototype.getCollapsed=function(){return this._findNodes("false","state.expanded")},g.prototype.getChecked=function(){return this._findNodes("true","state.checked")},g.prototype.getUnchecked=function(){return this._findNodes("false","state.checked")},g.prototype.getDisabled=function(){return this._findNodes("true","state.disabled")},g.prototype.getEnabled=function(){return this._findNodes("false","state.disabled")},g.prototype.addNode=function(b,c,d,e){b instanceof Array||(b=[b]),c instanceof Array&&(c=c[0]),e=a.extend({},f.options,e);var g;g=c&&c.nodes?c.nodes:c?c.nodes=[]:this._tree,a.each(b,a.proxy(function(a,b){var c="number"==typeof d?d+a:g.length+1;g.splice(c,0,b)},this)),this._setInitialStates({nodes:this._tree},0).done(a.proxy(function(){c&&!c.state.expanded&&this._setExpanded(c,!0,e),this._render()},this))},g.prototype.addNodeAfter=function(b,c,d){b instanceof Array||(b=[b]),c instanceof Array&&(c=c[0]),d=a.extend({},f.options,d),this.addNode(b,this.getParents(c)[0],c.index+1,d)},g.prototype.addNodeBefore=function(b,c,d){b instanceof Array||(b=[b]),c instanceof Array&&(c=c[0]),d=a.extend({},f.options,d),this.addNode(b,this.getParents(c)[0],c.index,d)},g.prototype.removeNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c);var d,e;a.each(b,a.proxy(function(a,b){e=this._nodes[b.parentId],d=e?e.nodes:this._tree,d.splice(b.index,1),this._removeNodeEl(b)},this)),this._setInitialStates({nodes:this._tree},0).done(this._render.bind(this))},g.prototype.updateNode=function(b,c,d){b instanceof Array&&(b=b[0]),d=a.extend({},f.options,d);var e,g=this._nodes[b.parentId];e=g?g.nodes:this._tree,e.splice(b.index,1,c),this._removeNodeEl(b),this._setInitialStates({nodes:this._tree},0).done(this._render.bind(this))},g.prototype.selectNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setSelected(b,!0,c)},this))},g.prototype.unselectNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setSelected(b,!1,c)},this))},g.prototype.toggleNodeSelected=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._toggleSelected(b,c)},this))},g.prototype.collapseAll=function(b){b=a.extend({},f.options,b),b.levels=b.levels||999,this.collapseNode(this._tree,b)},g.prototype.collapseNode=function(b,c){c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setExpanded(b,!1,c)},this))},g.prototype.expandAll=function(b){b=a.extend({},f.options,b),b.levels=b.levels||999,this.expandNode(this._tree,b)},g.prototype.expandNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){b.state.expanded||("function"==typeof this._options.lazyLoad&&b.lazyLoad&&this._lazyLoad(b),this._setExpanded(b,!0,c),b.nodes&&this._expandLevels(b.nodes,c.levels-1,c))},this))},g.prototype._expandLevels=function(b,c,d){b instanceof Array||(b=[b]),d=a.extend({},f.options,d),a.each(b,a.proxy(function(a,b){this._setExpanded(b,c>0,d),b.nodes&&this._expandLevels(b.nodes,c-1,d)},this))},g.prototype.revealNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){for(var d,e=b;d=this.getParents([e])[0];)e=d,this._setExpanded(e,!0,c)},this))},g.prototype.toggleNodeExpanded=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._toggleExpanded(b,c)},this))},g.prototype.checkAll=function(b){b=a.extend({},f.options,b);var c=a.grep(this._orderedNodes,function(a){return!a.state.checked});a.each(c,a.proxy(function(a,c){this._setChecked(c,!0,b)},this))},g.prototype.checkNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setChecked(b,!0,c)},this))},g.prototype.uncheckAll=function(b){b=a.extend({},f.options,b);var c=a.grep(this._orderedNodes,function(a){return a.state.checked||a.state.checked===d});a.each(c,a.proxy(function(a,c){this._setChecked(c,!1,b)},this))},g.prototype.uncheckNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setChecked(b,!1,c)},this))},g.prototype.toggleNodeChecked=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._toggleChecked(b,c)},this))},g.prototype.unmarkCheckboxChanges=function(){this._inheritCheckboxChanges(),a.each(this._nodes,function(a,b){b.$el.removeClass("node-check-changed")})},g.prototype.disableAll=function(b){b=a.extend({},f.options,b);var c=this._findNodes("false","state.disabled");a.each(c,a.proxy(function(a,c){this._setDisabled(c,!0,b)},this))},g.prototype.disableNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setDisabled(b,!0,c)},this))},g.prototype.enableAll=function(b){b=a.extend({},f.options,b);var c=this._findNodes("true","state.disabled");a.each(c,a.proxy(function(a,c){this._setDisabled(c,!1,b)},this))},g.prototype.enableNode=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setDisabled(b,!1,c)},this))},g.prototype.toggleNodeDisabled=function(b,c){b instanceof Array||(b=[b]),c=a.extend({},f.options,c),a.each(b,a.proxy(function(a,b){this._setDisabled(b,!b.state.disabled,c)},this))},g.prototype.search=function(b,c){c=a.extend({},f.searchOptions,c);var d=this._getSearchResults(),e=[];if(b&&b.length>0){c.exactMatch&&(b="^"+b+"$");var g="g";c.ignoreCase&&(g+="i"),e=this._findNodes(b,"text",g)}return a.each(this._diffArray(e,d),a.proxy(function(a,b){this._setSearchResult(b,!1,c)},this)),a.each(this._diffArray(d,e),a.proxy(function(a,b){this._setSearchResult(b,!0,c)},this)),e&&c.revealResults&&this.revealNode(e),this._triggerEvent("searchComplete",e,c),e},g.prototype.clearSearch=function(b){b=a.extend({},{render:!0},b);var c=a.each(this._getSearchResults(),a.proxy(function(a,c){this._setSearchResult(c,!1,b)},this));this._triggerEvent("searchCleared",c,b)},g.prototype._getSearchResults=function(){return this._findNodes("true","searchResult")},g.prototype._diffArray=function(b,c){var d=[];return a.grep(c,function(c){a.inArray(c,b)===-1&&d.push(c)}),d},g.prototype._findNodes=function(b,c,d){return c=c||"text",d=d||"g",a.grep(this._orderedNodes,a.proxy(function(a){var e=this._getNodeValue(a,c);if("string"==typeof e)return e.match(new RegExp(b,d))},this))},g.prototype._getNodeValue=function(a,b){var c=b.indexOf(".");if(c>0){var e=a[b.substring(0,c)],f=b.substring(c+1,b.length);return this._getNodeValue(e,f)}return a.hasOwnProperty(b)&&a[b]!==d?a[b].toString():d};var h=function(a){b.console&&b.console.error(a)};a.fn[e]=function(b,c){var d;if(0==this.length)throw"No element has been found!";return this.each(function(){var f=a.data(this,e);"string"==typeof b?f?a.isFunction(f[b])&&"_"!==b.charAt(0)?(c instanceof Array||(c=[c]),d=f[b].apply(f,c)):h("No such method : "+b):h("Not initialized, can not call method : "+b):"boolean"==typeof b?d=f:a.data(this,e,new g(this,a.extend(!0,{},b)))}),d||this}}(jQuery,window,document);
/**
 * Created by jongabilondo on 04/05/2016.
 */
/**
 *   Snap marker to closest point on a line.
 *
 *   Based on Distance to line example by
 *	Marcelo, maps.forum.nu - http://maps.forum.nu/gm_mouse_dist_to_line.html
 *   Then
 *	@ work of Björn Brala - Swis BV who wrapped the algorithm in a class operating on GMap Objects
 *   And now
 *	Bill Chadwick who factored the basic algorithm out of the class (removing much intermediate storage of results)
 *   	and added distance along line to nearest point calculation
 *
 *
 *   Usage:
 *
 *   Create the class
 *       var oSnap = new cSnapToRoute();
 *
 *   Initialize the subjects
 *       oSnap.init(oMap, oMarker, oPolyline);
 *
 *   If needed change the marker or polyline subjects. use null when no update
 *       Change Both:
 *           oSnap.updateTargets(oMarker, oPolyline);
 *       Change marker:
 *           oSnap.updateTargets(oMarker, null);
 *       Change polyline:
 *           oSnap.updateTargets(null, oPolyline);
 **/

function cSnapToRoute(){

    this.routePoints    = Array();
    this.routePixels    = Array();
    this.routeOverlay   = null;
    this.normalProj     = G_NORMAL_MAP.getProjection();


    /**
     *   @desc Initialize the objects.
     *   @param Map object
     *   @param GMarker object to move along the route
     *   @param GPolyline object - the 'route'
     **/
    this.init = function(oMap, oMarker, oPolyline){
        this._oMap      = oMap;
        this._oMarker   = oMarker;
        this._oPolyline = oPolyline;

        this.loadRouteData();   // Load needed data for point calculations
        this.loadMapListener();
    }

    /**
     *   @desc Update targets
     *   @param GMarker object to move along the route
     *   @param GPolyline object - the 'route'
     **/
    this.updateTargets = function(oMarker, oPolyline) {
        this._oMarker   = oMarker   || this._oMarker;
        this._oPolyline = oPolyline || this._oPolyline;
        this.loadRouteData();
    }

    /**
     *   @desc internal use only, Load map listeners to calculate and update this.oMarker position.
     **/
    this.loadMapListener = function(){
        var self = this;
        GEvent.addListener(self._oMap, 'mousemove', GEvent.callback(self, self.updateMarkerLocation));
        GEvent.addListener(self._oMap, 'zoomend', GEvent.callback(self, self.loadRouteData));
    }

    /**
     *   @desc internal use only, Load route points into RoutePixel array for calculations, do this whenever zoom changes
     **/
    this.loadRouteData = function(){
        var zoom = this._oMap.getZoom();
        this.routePixels = new Array();
        for ( var i = 0; i < this._oPolyline.getVertexCount(); i++ ) {
            var Px = this.normalProj.fromLatLngToPixel(this._oPolyline.getVertex(i), zoom);
            this.routePixels.push(Px);
        }
    }

    /**
     *   @desc internal use only, Handle the move listeners output and move the given marker.
     *   @param GLatLng()
     **/
    this.updateMarkerLocation = function(mouseLatLng) {
        var oMarkerLatLng = this.getClosestLatLng(mouseLatLng);
        this._oMarker.setPoint(oMarkerLatLng);
    }

    /**
     *   @desc Get closest point on route to test point
     *   @param GLatLng() the test point
     *   @return new GLatLng();
     **/
    this.getClosestLatLng = function(latlng){
        var r = this.distanceToLines(latlng);
        return this.normalProj.fromPixelToLatLng(new GPoint(r.x,r.y), this._oMap.getZoom());
    }

    /**
     *   @desc Get distance along route in meters of closest point on route to test point
     *   @param GLatLng() the test point
     *   @return distance in meters;
     **/
    this.getDistAlongRoute = function(latlng){
        var r = this.distanceToLines(latlng);
        return this.getDistToLine(r.i, r.fTo);
    }

    /**
     *   @desc internal use only, gets test point xy and then calls fundamental algorithm
     **/
    this.distanceToLines = function(mouseLatLng) {
        var zoom        = this._oMap.getZoom();
        var mousePx     = this.normalProj.fromLatLngToPixel(mouseLatLng, zoom);
        var routePixels = this.routePixels;
        return getClosestPointOnLines(mousePx,routePixels);
    }

    /**
     *   @desc internal use only, find distance along route to point nearest test point
     **/
    this.getDistToLine = function(iLine, fTo){

        var routeOverlay = this._oPolyline;
        var d = 0;
        for (var n = 1 ; n < iLine ; n++ )
            d += routeOverlay.getVertex(n-1).distanceFrom(routeOverlay.getVertex(n));
        d += routeOverlay.getVertex(iLine-1).distanceFrom(routeOverlay.getVertex(iLine)) * fTo;

        return d;
    }


}

/* desc Static function. Find point on lines nearest test point
 test point pXy with properties .x and .y
 lines defined by array aXys with nodes having properties .x and .y
 return is object with .x and .y properties and property i indicating nearest segment in aXys
 and property fFrom the fractional distance of the returned point from aXy[i-1]
 and property fTo the fractional distance of the returned point from aXy[i]	*/


function getClosestPointOnLines (pXy,aXys) {

    var minDist;
    var fTo;
    var fFrom;
    var x;
    var y;
    var i;
    var dist;

    if (aXys.length > 1){

        for (var n = 1 ; n < aXys.length ; n++ ) {

            if (aXys[n].x != aXys[n-1].x) {
                var a = (aXys[n].y - aXys[n-1].y) / (aXys[n].x - aXys[n-1].x);
                var b = aXys[n].y - a * aXys[n].x;
                dist = Math.abs(a*pXy.x + b - pXy.y) / Math.sqrt(a*a+1);
            }
            else
                dist = Math.abs(pXy.x - aXys[n].x)

            // length^2 of line segment
            var rl2 = Math.pow(aXys[n].y - aXys[n-1].y,2) + Math.pow(aXys[n].x - aXys[n-1].x,2);

            // distance^2 of pt to end line segment
            var ln2 = Math.pow(aXys[n].y - pXy.y,2) + Math.pow(aXys[n].x - pXy.x,2);

            // distance^2 of pt to begin line segment
            var lnm12 = Math.pow(aXys[n-1].y - pXy.y,2) + Math.pow(aXys[n-1].x - pXy.x,2);

            // minimum distance^2 of pt to infinite line
            var dist2 = Math.pow(dist,2);

            // calculated length^2 of line segment
            var calcrl2 = ln2 - dist2 + lnm12 - dist2;

            // redefine minimum distance to line segment (not infinite line) if necessary
            if (calcrl2 > rl2)
                dist = Math.sqrt( Math.min(ln2,lnm12) );

            if ( (minDist == null) || (minDist > dist) ) {
                if(calcrl2 > rl2){
                    if(lnm12 < ln2){
                        fTo = 0;//nearer to previous point
                        fFrom = 1;
                    }
                    else{
                        fFrom = 0;//nearer to current point
                        fTo = 1;
                    }
                }
                else {
                    // perpendicular from point intersects line segment
                    fTo  = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
                    fFrom = ((Math.sqrt(ln2 - dist2))   / Math.sqrt(rl2));
                }
                minDist = dist;
                i = n;
            }
        }

        var dx = aXys[i-1].x - aXys[i].x;
        var dy = aXys[i-1].y - aXys[i].y;

        x = aXys[i-1].x - (dx * fTo);
        y = aXys[i-1].y - (dy * fTo);

    }

    return {'x':x, 'y':y, 'i':i, 'fTo':fTo, 'fFrom':fFrom};

}


/**
 * Created by jongabilondo on 14/08/2017.
 */

var ORG = ORG || {};
ORG.UI = {};
/**
 * Created by jongabilondo on 14/02/2018.
 */

// Outbound Message types
const ORGMessage = {
    REQUEST : "request",
    UPDATE : "update"
}

// Outbound Request types
const ORGRequest = {
    APP_INFO : "app-info",
    DEVICE_INFO : "device-info",
    SYSTEM_INFO : "system-info",
    SCREENSHOT : "screenshot",
    ELEMENT_TREE : "element-tree",
    CLASS_HIERARCHY : "class-hierarchy",
    ORIENTATION_UPDATES : "device-orientation-feed",
    LOCATION_UPDATES : "core-motion-feed"
}

// Inbound Message types
const ORGInboundMessage = {
    RESPONSE : "response",
    NOTIFICATION : "notification",
    CORE_MOTION_FEED: "core-motion-feed"
}

const ORGActions = {
    PRESS_HOME: "press-jome",
    LOCK_DEVICE: "lock-device",
    UNLOCK_DEVICE: "unlock-device",
    REFRESH_SCREEN: "refresh-screen",
    SET_ORIENTATION: "set-orientation",

    TAP: "tap",
    LONG_PRESS: "long-press",
    SWIPE: "swipe",
    SWIPE_LEFT: "swipe-left",
    SWIPE_RIGHT: "swipe-right",
    SWIPE_UP: "swipe-up",
    SWIPE_DOWN: "swipe-down",

    LOOK_AT: "look-at",
    LOOK_FRONT_AT: "look-front-at",

    RESET_CAMERA_POSITION: "reset-camera-position",
    RESET_DEVICE_POSITION: "reset-device-position",
    SCREEN_CLOSEUP: "device-screen-closeup",
    SHOW_CLASS_HIERARCHY: "show-class-hierarchy",

    LOOK_AT_DEVICE: "look-at-device",
    ROTATE_DEVICE: "rotate-device",
    TRANSLATE_DEVICE: "translate-device"
}
/**
 * Created by jongabilondo on 24/01/2018.
 */


ORG.DeviceMetrics = {
    iPhone5 : {
        Body : {H : "123.8 mm", W: "58.6 mm", D: "7.6 mm"},
        Display: {Diagonal:"100 mm", Ratio:"1.7777777" /* 16/9 */},
        Points: { X:320 , Y:568},
        Scale: 2,
        ProductName: "iPhone 5"
    },
    iPhone6 : {
        Body : {H : "138.1 mm", W: "67.0 mm", D: "6.9 mm"},
        Display: {Diagonal:"120 mm", Ratio:"1.7777777" /* 16/9 */},
        Points: { X:375 , Y:667},
        Scale: 2,
        ProductName: "iPhone 6"
    },
    iPhone6Plus : {
        Body : {H : "158.1 mm", W: "77.8 mm", D: "7.1 mm"},
        Display: {Diagonal:"140 mm", Ratio:"1.7777777" /* 16/9 */},
        Points: { X:414, Y:736},
        Scale: 3,
        ProductName: "iPhone 6+"
    },
    iPhoneX : {
        Body : {H : "143.6 mm", W: "70.9 mm", D: "7.7 mm"},
        Display: {Diagonal:"150 mm", Ratio:"2.1111111" /* 19/9 */},
        Points: { X:375, Y:812},
        Scale: 3,
        ProductName: "iPhone X"
    }
};

class ORGDeviceMetrics {

    /***
     * Finds the device in ORG.DeviceMetrics that matches the screen points passed in argument.
     * @param size in screen points
     * @returns {ProductName String}
     */
    static deviceWithScreenPoints(size) {
        for (let key in ORG.DeviceMetrics) {
            if (ORG.DeviceMetrics[key].Points.X == size.width && ORG.DeviceMetrics[key].Points.Y == size.height) {
                return ORG.DeviceMetrics[key].ProductName;
            }
        }
        return "unknown";
    }
}

/**
 * Created by jongabilondo on 09/02/2018.
 */


const ORGERR = {
    ERR_GENERAL: 100,
    ERR_CONNECTION_REFUSED: 1000,
    ERR_WS_CONNECTION_REFUSED: 1001,
    ERR_CONNECTION_NOT_FOUND: 1002,
    ERR_WS_CONNECTION_NOT_FOUND: 1003
}

class ORGError extends Error {

    constructor(id, message) {
        super(message);
        this.name = "ORG Error";
        this.id = id;
    }

    static generalError(message) {
        return new ORGError(ORGERR.ERR_GENERAL, message);
    }

}
/**
 * Class wrapper for a JS WebSocket to communicate with a Device.
 * It implements the methods for creation, open, close, sending and receiving.
 * It accepts a Delegate class that will be called on the following events: onOpen, onCLose, onMessage, onError.
 * @constructor
 */
class ORGWebSocket {

	constructor() {
        this._ws = null;
        this._serverURL = null;
        this._delegate = null;
	}

	get ws() {
		return this._ws;
	}

    get serverURL() {
        return this._serverURL;
    }

    get isConnected() {
        return !!this._ws && (this._ws.readyState !== this._ws.CLOSED);
    }

	/**
	 * Opens a WebSocket to a server given the URL and accepts a Delegate.
	 * @param inServerURL
	 * @param inDelegate. An object that implements the callback methods: onOpen, onClose, onMessage, onError
	 */
	open(inServerURL, inDelegate) {
		return new Promise( (resolve, reject) => {
			const _this = this;
            this._serverURL = inServerURL || null;
            this._delegate = inDelegate || null;

            const url = inServerURL;
            this._ws = new WebSocket(url);
            this._ws.onopen = function(event) {
                if (_this._delegate) {
                    _this.processMessagesWithDelegate(_this._delegate);
                }
                resolve(event)
            }
            this._ws.onclose = function(event) {
				reject(event)
            }
            this._ws.onmessage = function(event) {
				resolve(event)
            }
            this._ws.onerror = function(event)  {
                _this._ws = null;
                reject(new ORGError(ORGERR.ERR_WS_CONNECTION_REFUSED, "Error opening session."));
            }
		})
	}

	/**
	 * Close the WebSocket.
	 */
	close() {
		if (this._ws) {
            this._ws.close();
		} else {
			console.debug('CLOSE requested but there is no ws.')
		}
	}

    /***
	 * Sets the delegate that processes the web sockets callbacks.
	 * Usually to se a non linear async messaging model, where a "send" is not made with "await".
     * @param delegate
     */
	processMessagesWithDelegate(delegate) {
        this._delegate = delegate || null;

        let _this = this;
        this._ws.onopen = function(event) {
            _this._onOpen(event)
        }
        this._ws.onclose = function(event) {
            _this._onClose(event)
        }
        this._ws.onmessage = function(event) {
            _this._onMessage(event)
        }
        this._ws.onerror = function(event)  {
            _this._onError(event)
        }
    }

	/**
	 * Sends data through the websocket.
	 * @param payload. A string with the data to transfer.
	 */
	send(payload) {
		if (this._ws) {
            this._ws.send(payload);
		}
	}

	sendAsync(payload) {
		return new Promise( (resolve, reject) => {
            this._ws.onclose = (event) => {
            	this._onClose(event)
                reject(event)
            }
            this._ws.onmessage = (event) => {
                let messageJSON = JSON.parse(event.data);
                if (messageJSON) {
            		resolve(messageJSON)
				} else {
                    reject(messageJSON)
				}
            }
            this._ws.onerror = (event) => {
                reject(event)
            }
            if (this._ws) {
                this._ws.send(payload);
            }
		})
	}

	// Callbacks

	/**
	 * JS WebSocket callback when the socket has opened.
	 * It will call the Delegate "onOpen".
	 */
    _onOpen() {
		console.debug('OPENED: ' + this._serverURL);
		if (!!this._delegate && !!this._delegate.onOpen) {
            this._delegate.onOpen(this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has closed.
	 * It will call the Delegate "onClose".
	 */
	_onClose(event) {
		console.debug('CLOSED: ' + this._serverURL);
        this._ws = null;
		if (!!this._delegate && !!this._delegate.onClose) {
            this._delegate.onClose(event, this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has received a message.
	 * It will call the Delegate "onMessage".
	 */
	_onMessage(event) {
		if (!!this._delegate && !!this._delegate.onMessage) {
            this._delegate.onMessage(event, this);
		}
	}

	/**
	 * JS WebSocket callback when the socket has detected an error.
	 * It will call the Delegate "onError".
	 */
	_onError(event) {
		console.debug('WS Error: ' + JSON.stringify(event));
		if (!!this._delegate && !!this._delegate.onError) {
            this._delegate.onError(event, this);
		}
	}
}

/**
 * Created by jongabilondo on 23/09/2017.
 */

/**
 * Class to hold all the information and elements that compose a scene, devices, beacons, geo information ..
 * Does not contain any 3D information, it's not connected to any THREE js.
 */
class ORGScenario {

    constructor() {
        this._beacons = [];
    }

    addBeacon(beacon) {
        this._beacons.push(beacon);
    }

    removeBeacon(beacon) {
        for (let i=0; i<this._beacons.length; i++) {
            if (this._beacons[i] == beacon) {
                this._beacons.splice( i, 1);
                break;
            }
        }
    }

    removeAllBeacons() {
        this._beacons = [];
    }

    beaconsAtPoint(point) {
        var beacons = [];
        for (let i=0; i<this._beacons.length; i++) {
            if (this._beacons[i].intersectsPoint(point)) {
                beacons.push(this._beacons[i]);
            }
        }
        return beacons;
    }

    devicePointUpdate(point) {
        const beacons = this.beaconsAtPoint(point);
        for (let i=0; i<beacons.length; i++) {
            // broadcast to Mobile Device that is inside a beacon range
            console.log("inside beacon");
        }
    }
}
/**
 * Created by jongabilondo on 02/07/2016.
 */


const ORGTreeVisualizationMask = {
    ShowNormalWindow : 0x1,
    ShowAlertWindow : 0x2,
    ShowKeyboardWindow : 0x4,
    ShowStatusWindow : 0x8,
    ShowScreenshots : 0x10,
    ShowPrivate : 0x20,
    ShowPublic : 0x40,
    ShowHiddenViews : 0x80,
    ShowHiddenViewsOnly : 0x100,
    ShowInteractiveViews : 0x0200,
    ShowNonInteractiveViews : 0x0400,
    ShowOutOfScreen : 0x0800
};

const kORGMinimalPlaneDistance = 0.001; // m
const kORGMaxPlaneDistance = 0.02; // m
const kORGExtrudeDuration = 500.0; // ms

/**
 * This class builds and manages the expanded 3D UI model. Given a JSON UI model it creates an expanded model of THREE objects.
 * @constructor
 */
class ORG3DUITreeModel {

    constructor(visualizationFlag) {
        this._treeData = null; // json of ui elements tree as arrived from device
        this._THREEElementTreeGroup = null; // threejs group with all the ui elements.
        this._THREEScene = null;
        this._collapseTweenCount = 0; // collapse animation counter
        this._visualizationFlags = visualizationFlag;
        this._planeDistance = kORGMinimalPlaneDistance;
        this._layerCount = 0;
        this._nodeHighlighter = new ORG3DUIElementHighlight();
    }

    get treeGroup() {
        return this._THREEElementTreeGroup;
    }

    get isExpanded() {
        return this.treeGroup !== null;
    }

    set visualizationFlags(flags) {
        this._visualizationFlags = flags;
    }

    get layerCount() {
        return this._layerCount;
    }
    get _flagShowKeyboard() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowKeyboardWindow);
    }
    get _flagShowPrivate() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowPrivate);
    }
    get _flagShowHiddenViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowHiddenViews);
    }
    get _flagShowHiddenViewsOnly() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowHiddenViewsOnly);
    }
    get _flagShowOutOfScreen() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowOutOfScreen);
    }
    get _flagShowInteractiveViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowInteractiveViews);
    }
    get _flagShowNonInteractiveViews() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowNonInteractiveViews);
    }
    get _flagShowScreenshots() {
        return (this._visualizationFlags & ORGTreeVisualizationMask.ShowScreenshots);
    }

    createUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        this._layerCount = 0;
        this._collapseTweenCount = 0;
        this._treeData = treeTopLevelNodes;
        this._THREEScene = threeScene;

        this._createUITreeModel(this._treeData, this._THREEScene, screenSize, displaySize, displayScale, displayPosition);
    }

    updateUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        if (this._treeData) {
            this.removeUITreeModel(threeScene); // remove existing first
        }
        this.createUITreeModel(treeTopLevelNodes, threeScene, screenSize, displaySize, displayScale, displayPosition);
    }

    collapseWithCompletion(completion) {
        for (let i=0; i < this._treeData.length; i++) {
            const treeNode = this._treeData[i];
            this._collapseNodeAnimatedWithCompletion(treeNode, completion)
        }
    }

    removeUITreeModel(threeScene) {
        if (this._THREEElementTreeGroup) {
            threeScene.remove(this._THREEElementTreeGroup);
            this._THREEElementTreeGroup = null;
        }
    }

    hideTextures(hide) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Mesh") {
                    if (hide) {
                        child.material.map = null;
                        child.material.color = new THREE.Color(0x000000);
                        //child.material.opacity = 1.0;
                        //child.material.transparent = false;
                    } else {
                        child.material.map = child.ORGData.threeScreenshotTexture;
                        child.material.color = new THREE.Color(0xffffff);
                        //child.material.opacity = 0;
                    }
                    child.material.needsUpdate = true;
                    //child.material.visible = !hide;
                }
            })
        }
    }

    hideNonInteractiveViews(hide) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    if (hide) {
                        const nodeData = child.userData;
                        if (nodeData) {
                            if (!_nodeIsInteractive(nodeData)) {
                                _hideNodeGroup(child, true);
                            }
                        }
                    } else {
                        _hideNodeGroup(child, false);
                    }
                }
            })
        }
    }

    showConnections(show , threeScene) {
        if (this._THREEElementTreeGroup) {
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    const nodeData = child.userData;
                    if (_nodeIsInteractive(nodeData)) {
                        const mesh = child.children[0];
                        if (mesh) {
                            const arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), mesh.position, 400, 0x0000ff, 50, 25);
                            const cone = arrowHelper.cone;
                            threeScene.add(arrowHelper);
                        }
                    }
                }
            })
        }
    }

    setExpandedTreeLayersDistance(distanceUnits) {
        this._planeDistance = kORGMinimalPlaneDistance + (distanceUnits/100.0 * kORGMaxPlaneDistance); // new plane distance

        if (this._THREEElementTreeGroup) {
            const allElements = this._THREEElementTreeGroup.children;
            let firstPosition = 0;
            for (let i=0; i<allElements.length; i++) {
                let currentElementGroup = allElements[i];
                if (i === 0) {
                    firstPosition = currentElementGroup.position;
                    continue;
                }

                if (currentElementGroup.type === "Group") {
                    const layerNum = (currentElementGroup.userData.originalWorldZPosition - firstPosition.z) / kORGMinimalPlaneDistance; // layer of the element
                    currentElementGroup.position.z = firstPosition.z + (layerNum * this._planeDistance);
                } else {
                    // all should be groups !
                }
            }
        }
    }

    setExpandedTreeLayersVisibleRange(maxVisibleLayer) {
        // Traverse all Tree elements and set their visibility
        // Every element is a Group with 2 children, a Mesh and a BoxHelper.
        if (this._THREEElementTreeGroup) {
            const allElements = this._THREEElementTreeGroup.children;
            for (let currentElementGroup of allElements) {
                if (currentElementGroup.type === "Group") {
                    const nodeData = currentElementGroup.userData;
                    if (!!nodeData) {
                        currentElementGroup.visible = (nodeData.expandedTreeLayer < maxVisibleLayer);
                    }
                }
            }
        }
    }

    /***
     * Highlight the given node, unhighlight previous.
     * @param elementNode - A JSON description of the UI node. It is not a THREE object. The tree has some THREE node that represents the passed element node.
     */
    highlightUIElement(elementNode) {
        if (!this._THREEElementTreeGroup) {
            return;
        }
        if (elementNode) {
            const allElements = this._THREEElementTreeGroup.children;
            for (let currentElementGroup of allElements) {
                if (currentElementGroup.type === "Group") {
                    const nodeData = currentElementGroup.userData;
                    if (!!nodeData && !!nodeData.pointer && (nodeData.pointer === elementNode.pointer)) {
                        this._nodeHighlighter.mouseOverElement(currentElementGroup);
                        break;
                    }
                }
            }
        } else {
            this._nodeHighlighter.mouseOverElement(null);
        }
    }

    // PRIVATE

    /***
     * Creates a 3D representation of a UI tree.
     * @param treeRootNodes - The top level nodes. Usually the Windows.
     * @param threeScene - The THREE scene to add the tree to.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @private
     */
    _createUITreeModel(treeRootNodes, threeScene, screenSize, displaySize, displayScale, displayPosition) {
        this.removeUITreeModel(threeScene); // remove existing first

        this._THREEElementTreeGroup = new THREE.Group();
        threeScene.add(this._THREEElementTreeGroup);

        let nextZPos = 0;
        if (!!treeRootNodes) {
            let treeNode;
            for (let i = 0; i < treeRootNodes.length; i++) {
                treeNode = treeRootNodes[i];

                // Some full branches might be ignored
                if (!this._mustCreateTreeBranch(treeNode)) {
                    console.log("ignoring tree branch.");
                    continue;
                }

                // create the element and its subelements (full branch)
                if (this._mustCreateTreeObject(treeNode)) {
                    nextZPos = this._createTreeNode3DModel(treeNode, null, screenSize, displaySize, displayScale, displayPosition, nextZPos, nextZPos);
                }
            }
        }

        ORG.dispatcher.dispatch({
            actionType: 'uitree-expanded',
            ui_tree: this
        })
    }

    /***
     * Creates a 3D representation of a UI tree.
     * @param treeRootNodes - The top level nodes. Usually the Windows.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @param startingZPos - The Z pos for the first node.
     * @private
     */
    //_createTree3DModel(treeRootNodes, screenSize, displaySize, displayScale, displayPosition, startingZPos) {
    //    let nextZPos = startingZPos;
    //    if (!!treeRootNodes) {
    //        let treeNode;
    //        for (let i = 0; i < treeRootNodes.length; i++) {
    //            treeNode = treeRootNodes[i];
    //
    //            // Some full branches might be ignored
    //            if (!this._mustCreateTreeBranch(treeNode)) {
    //                console.log("ignoring tree branch.");
    //                continue;
    //            }
    //
    //            // create the element
    //            if (this._mustCreateTreeObject(treeNode)) {
    //                nextZPos = this._createTreeNode3DModel(treeNode, null, screenSize, displaySize, displayScale, displayPosition, nextZPos, nextZPos);
    //            }
    //        }
    //    }
    //}

    /***
     * Create the 3D tree starting from a given tree node. Recursive.
     * @param treeNode -  The root node.
     * @param treeNodeParent - The last parent node taht was created in 3D. Not necessarily the parent in the UI tree, some nodes are not represented.
     * @param screenSize - Screen size in pixels.
     * @param displaySize - Display real world size (m)
     * @param displayScale -  Scale to convert screen pixels to world coordinates.
     * @param displayPosition - Position of the display in real world. (m)
     * @param zStartingPos - Z position of the node.
     * @param highestZPosition - THe highest Z so far.
     * @returns {highestZPosition}
     * @private
     */
    _createTreeNode3DModel(treeNode, treeNodeParent, screenSize, displaySize, displayScale, displayPosition, zStartingPos, highestZPosition) {
        let lastCreatedParentNode = treeNodeParent;
        let newElemZPosition = zStartingPos;

        if (typeof(treeNode) !== "object") {
            console.log("what is this ? Tree node that is not an object ?");
            return highestZPosition;
        }

        if (this._mustCreateTreeObject(treeNode)) {
            let screenshotTexture = null;
            let elementBase64Image = treeNode.screenshot;
            if (elementBase64Image) {
                let img = new Image();
                img.src = "data:image/png;base64," + elementBase64Image;
                screenshotTexture = new THREE.Texture(img);
                screenshotTexture.minFilter = THREE.NearestFilter;
                screenshotTexture.needsUpdate = true;
            }

            const elementWorldBounds = this._elementWorldBounds(treeNode, screenSize, displaySize, displayScale, displayPosition, true); // calculate bounds of the ui element in real world (x,y), at 0,0.
            newElemZPosition = this._calculateElementZPosition(treeNode, treeNodeParent, elementWorldBounds, zStartingPos, displayPosition);

            let elementGroup = this._createUIElementObject(treeNode, elementWorldBounds, screenshotTexture, newElemZPosition);
            if (elementGroup) {
                this._THREEElementTreeGroup.add(elementGroup);
                treeNode.threeObj = elementGroup;
                elementGroup.userData = treeNode;

                if (this._mustHideTreeObject(treeNode)) {
                    elementGroup.visible = false;
                } else {
                    // Now we will animate the element to its final position.
                    // The final zPosition is in treeNode, not in the mesh object which is at 0.
                    const finalMeshPosition = {x: elementGroup.position.x, y: elementGroup.position.y, z: newElemZPosition};
                    const tween = new TWEEN.Tween(elementGroup.position)
                        .to(finalMeshPosition, kORGExtrudeDuration)
                        .start();
                }
            }

            if (newElemZPosition > highestZPosition) {
                highestZPosition = newElemZPosition;
            }
            lastCreatedParentNode = treeNode; // this is the parent of the subviews to be created bellow
        }

        // create subelements
        if (!!treeNode.subviews) {
            for (let i = 0; i < treeNode.subviews.length; i++) {
                highestZPosition = this._createTreeNode3DModel(treeNode.subviews[i], lastCreatedParentNode, screenSize, displaySize, displayScale, displayPosition, newElemZPosition, highestZPosition);
            }
        }
        return highestZPosition;
    }

    /**
     * Convert the pixel 2D coordinates of an element to world coordinates.
     * @param uiElement
     * @param screenSize - in pixels
     * @param displaySize - real world
     * @param displayScale
     * @param displayPosition - real world
     * @returns {defs.THREE.Box2|*|Box2}
     * @private
     */
    _elementWorldBounds(uiElement, screenSize, displaySize, displayScale, displayPosition, translateToDevice) {

        // device coordinates are 0,0 for top-left corner !

        let elementBox2 = new THREE.Box2(
            new THREE.Vector2(uiElement.bounds.left * displayScale.x, (screenSize.height - uiElement.bounds.bottom) * displayScale.y),
            new THREE.Vector2(uiElement.bounds.right * displayScale.x, (screenSize.height - uiElement.bounds.top) * displayScale.y));
        elementBox2.translate(new THREE.Vector2(- (displaySize.width / 2.0), - (displaySize.height / 2.0)));

        if (translateToDevice) {
            elementBox2.translate(new THREE.Vector2(displayPosition.x , displayPosition.y));
        }
        return elementBox2;
    }

    /**
     * Creates and returns THREE.Group for an UI element with a plane plus a box helper for highlight. It assigns a texture.
     * @param uiElementDescription
     * @param elementWorldBoundsBox2
     * @param THREEScreenshotTexture
     * @param zPosition - z axis position for the 3d object
     * @returns THREE.Group
     * @private
     */
    _createUIElementObject(uiElementDescription, elementWorldBoundsBox2, THREEScreenshotTexture, zPosition) {
        let THREEMaterial, THREEMesh, THREEGeometry, THREEUIElementGroup;

        if (!uiElementDescription.bounds) {
            //console.log("Object has no boundsInScreen !", uiObjectDescription, JSON.stringify(uiObjectDescription));
            return null;
        }

        // create obj at Z = 0. We will animate it to its real position later.

        let center2D = new THREE.Vector2();
        elementWorldBoundsBox2.getCenter(center2D);
        const center3D = new THREE.Vector3(center2D.x, center2D.y, 0.0);

        THREEGeometry = new THREE.PlaneBufferGeometry(elementWorldBoundsBox2.getSize().x, elementWorldBoundsBox2.getSize().y, 1, 1);
        uiElementDescription.originalWorldZPosition = zPosition; // keep it here for later use
        uiElementDescription.expandedTreeLayer = zPosition / this._planeDistance; // keep it here for later use
        if (uiElementDescription.expandedTreeLayer > this._layerCount) {
            this._layerCount = uiElementDescription.expandedTreeLayer;
        }

        if (this._flagShowScreenshots && THREEScreenshotTexture) {
            THREEMaterial = new THREE.MeshBasicMaterial({map: THREEScreenshotTexture, transparent: false, side: THREE.DoubleSide});
        } else {
            THREEMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide, transparent:false });
        }
        THREEMesh = new THREE.Mesh(THREEGeometry, THREEMaterial);
        THREEMesh.position.copy(center3D);

        THREEMesh.ORGData = { threeScreenshotTexture : THREEScreenshotTexture }; // keep a reference to make the show/hide of textures

        // Create a group with the plane a boxhelper for highlights. First add the BoxHelper and then the plane, otherwise RayCaster will not give us proper collisions on the plane !!
        THREEUIElementGroup = new THREE.Group();
        THREEUIElementGroup.add(new THREE.BoxHelper(THREEMesh, 0xffffff));
        THREEUIElementGroup.add(THREEMesh);

        return THREEUIElementGroup;
    }

    /**
     * Calculates the Z position for a given UI tree element. This element has nbot been created yet, does not have a THREE object yet.
     * @param uiTreeElement - The element to calculate the Z for.
     * @param uiTreeStartElement - The element from which to start to calculate the Z. In the first iteration would be the parent.
     * @param uiElementWorldBox2 - Box2 of the element in world coordinates (m).
     * @param currentZPosition - Current zPosition in the tree traversal.
     * @param displayPosition - The translation of the display in the 3D scene, usually it's above the floor.
     * @returns {zPosition}
     * @private
     */
    _calculateElementZPosition(uiTreeElement, uiTreeStartElement, uiElementWorldBox2, currentZPosition, displayPosition) {
        if (!uiTreeElement || !uiTreeStartElement) {
            return currentZPosition;
        }

        if (uiTreeElement === uiTreeStartElement) {
            return currentZPosition; // we have arrived to the element itself, no more to search
        }

        let zPosition = currentZPosition;
        const threeObj = uiTreeStartElement.threeObj; // THREE obj of the ui element

        if (threeObj) {
            // This element has been visualized in 3D, because it has threeObj.
            // we have to check if the new element must be in front of this one.

            const objMesh = threeObj.children[0];
            objMesh.geometry.computeBoundingBox();
            let runningElementWorldBox3 = objMesh.geometry.boundingBox; // box at 0,0,0 !
            runningElementWorldBox3.translate(objMesh.position);
            let runningElementWorldBox2 = new THREE.Box2(
                new THREE.Vector2(runningElementWorldBox3.min.x, runningElementWorldBox3.min.y),
                new THREE.Vector2(runningElementWorldBox3.max.x, runningElementWorldBox3.max.y));

            //if (uiElementWorldBox2.intersectsBox(runningElementWorldBox2)) {
            if (this._boxesIntersect(uiElementWorldBox2, runningElementWorldBox2)) {
                const meshZPos = uiTreeStartElement.originalWorldZPosition; // The real position is in the treenode.originalWorldZPosition, not in the threejs mesh, there they are all at z=0 waiting to be animated.
                if (meshZPos >= zPosition) {
                    zPosition = meshZPos + this._planeDistance;
                }
            }
        }

        // Run subviews
        const subElements = uiTreeStartElement.subviews;
        if (subElements) {
            for (let i = 0; i < subElements.length; i++) {
                if (uiTreeElement === subElements[i]) {
                    break; // we have arrived to the element itself, no more to search
                }
                zPosition = this._calculateElementZPosition(uiTreeElement, subElements[i], uiElementWorldBox2, zPosition, displayPosition); // calculate against next level in tree
            }
        }
        return zPosition;
    }

    _collapseNodeAnimatedWithCompletion(node, completionFunction) {
        let threeObj = node.threeObj; // the obj is a THREE.Group
        if (threeObj) {
            const _this = this;
            const tween = new TWEEN.Tween(threeObj.position)
                .to({x: threeObj.position.x, y: threeObj.position.y, z: 0}, kORGExtrudeDuration)
                .onStart(function() {
                    _this._collapseTweenCount++;
                })
                .onComplete(function() {
                    _this._hideNodeGroup(threeObj, true);
                    node.zPosition = 0;

                    if (--_this._collapseTweenCount <= 0) {
                        _this._collapseTweenCount = 0;

                        if (_this._THREEElementTreeGroup) {
                            _this._THREEScene.remove(_this._THREEElementTreeGroup);
                            _this._THREEElementTreeGroup = null;
                        }

                        if (completionFunction) {
                            completionFunction();
                        }
                    }
                })
                .start();
        }

        if (!!node.subviews) {
            const subNodes = node.subviews;
            for (let i = 0; i < subNodes.length; i++) {
                const treeNode = subNodes[i];
                this._collapseNodeAnimatedWithCompletion(treeNode, completionFunction);
            }
        }
    }

    _modelVisualizationChanged() {
        if (this._THREEElementTreeGroup) {
            const _this = this;
            this._THREEElementTreeGroup.traverse(function (child) {
                if (child.type === "Group") {
                    let nodeData = child.userData;
                    if (nodeData) {
                        this._hideNodeGroup(child, _this._mustHideTreeObject(nodeData));
                    }
                }
            });
        }
    }

    //function modelChangeShowHidden(treeJson, showHidden) {
    //
    //    // Show/Hide Hidden objects
    //    for (var i in treeJson) {
    //        if (typeof(treeJson[i])=="object") {
    //            if (treeJson[i].hidden) {
    //                console.log("UI Element hidden: ", treeJson[i]);
    //                var threeObj = treeJson[i].threeObj;
    //                if (threeObj) {
    //                    if (showHidden) {
    //                        threeObj.visible = true;
    //                    } else {
    //                        threeObj.visible = false;
    //                    }
    //                    threeObj.needsUpdate = true;
    //                } else {
    //                    console.log("UI Hidden Element has no THREE OBJ !!");
    //                }
    //            }
    //            modelChangeShowHidden(treeJson[i].subviews, showHidden);
    //        }
    //    }
    //}
    //
    //function modelChangeShowHiddenOnly(treeJson, showHidden, showHiddenOnly) {
    //
    //    // Show/Hide Hidden objects
    //    for (var i in treeJson) {
    //        if (!!treeJson[i]==true && typeof(treeJson[i])=="object") {
    //            var mesh = treeJson[i].threeObj;
    //            if (mesh) {
    //                if (treeJson[i].hidden) {
    //                    if (showHidden || showHiddenOnly) {
    //                        mesh.visible = true;
    //                    } else {
    //                        mesh.visible = false;
    //                    }
    //                    mesh.needsUpdate = true;
    //                } else {
    //                    // Not hidden ui obj
    //                    if (showHiddenOnly) {
    //                        mesh.visible = false;
    //                    } else {
    //                        mesh.visible = true;
    //                    }
    //                    mesh.needsUpdate = true;
    //                }
    //            }
    //            modelChangeShowHiddenOnly(treeJson[i].subviews, showHidden, showHidden);
    //        }
    //    }
    //}

    _changeOpacity(treeJson, opacity) {
        if (!!treeJson) {
            for (let i = 0; i < treeJson.length; i++) {
                const treeNode = treeJson[i];
                if (!!treeNode && typeof(treeNode)==="object") {
                    let mesh = treeNode.threeObj;
                    if (mesh) {
                        //console.log("FOUND OBJECT:",mesh, i);

                        if (treeNode.class == "UITextEffectsWindow") {
                            continue;
                        } else if (treeNode.private === true) {
                            continue;
                        } else {
                            mesh.material.opacity = opacity;
                            mesh.needsUpdate = true;
                        }
                    } else {
                        //console.log("OBJECT nas no three obj !!!!!!!!", treeJson[i], JSON.stringify(treeJson[i]));
                    }
                    this._changeOpacity(treeJson[i].subviews, opacity);
                }
            }
        }
    }

    _mustDrawTreeObjectAsCube(treeJson, inParentTreeObj) {
        // if parent has texture and the object is smaller than parent
        if (inParentTreeObj &&
            (treeJson.bounds.left > inParentTreeObj.bounds.left ||
            treeJson.bounds.top > inParentTreeObj.bounds.top ||
            treeJson.bounds.right < inParentTreeObj.bounds.right ||
            treeJson.bounds.bottom < inParentTreeObj.bounds.bottom)) {
            return true;
        }
        return false;
        //return (treeJson.nativeClass != "UIWindow" &&
        //treeJson.nativeClass != "UILayoutContainerView" &&
        //treeJson.nativeClass != "UITransitionView");
    }


    /**
     * Returns true if the given UI element must be hidden, not displayed in Expanded UI.
     * @param nodeData The UI element info as sent by the device.
     * @returns {boolean}
     */
    _mustHideTreeObject(nodeData) {
        let mustBeHidden = false;
        if (nodeData.hidden && !this._flagShowHiddenViews) {
            mustBeHidden = true;
        } else if (nodeData.hidden===false && this.flagShowHiddenViewsOnly) {
            mustBeHidden = true;
        } else if (this._nodeIsInteractive(nodeData)) {
            mustBeHidden = !this._flagShowInteractiveViews;
        } else {
            mustBeHidden = !this._flagShowNonInteractiveViews;
        }
        return mustBeHidden;
    }

    _mustCreateTreeBranch(nodeData) {
        return !(this._isKeyboardWindow(nodeData) && !this._flagShowKeyboard);
    }


    /**
     * Returns true if the ui element must be created as a 3D object.
     * This is different than '_mustHideTreeObject'. An object can be created but might be set hidden.
     * e.g the visualization flags may require not to visualize the non interactive views, but they still have to be created and shown ans invisible.
     * @param nodeData
     */
    _mustCreateTreeObject (nodeData) {
        if (!this._flagShowPrivate) {
            if (nodeData.private && nodeData.private === true) {
                return false;
            }
        }
        if (!this._flagShowOutOfScreen) {
            if (this._treeObjectIsOutOfScreen(nodeData, deviceScreenSize)) {
                return false;
            }
        }
        if (this._isStatusBarWindow(nodeData)) {
            return false;
        }
        if (this._isNoSizeElement(nodeData)) {
            return false;
        }
        return true;
    }

    _removeScreenshotFromScreen() {
        screenPlane.material.color = 0x000000;
        //screenPlane.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
    }

    _rectsIntersect(a, b) {
        return (a.left < b.right && b.left < a.right && a.top > b.bottom && b.top > a.bottom);
    }

    _boxesIntersect(a, b) {
        const precision = 0.0001;
        //return (a.min.x < b.max.x && b.min.x < a.max.x && a.max.y > b.min.y && b.max.y > a.min.y);
        return (((b.max.x - a.min.x) > precision) &&  ((a.max.x - b.min.x) > precision) && ((a.max.y - b.min.y) > precision) && ((b.max.y - a.min.y) > precision));
    }

    _treeObjectIsOutOfScreen(treeJson, deviceScreenSize) {
        return (treeJson.bounds.top > deviceScreenSize.height);
    }

    _nodeIsInteractive(treeNode) {
        if (treeNode.gestures) {
            return true;
        }
        if (treeNode.controlEvents) {
            return true;
        }
        if (treeNode.class === "UITextField" && treeNode.userInteractionEnabled) {
            return true;
        }
        if (treeNode.class === "MKMapView" && treeNode.userInteractionEnabled) {
            return true;
        }
        if (treeNode.class === "_MKUserTrackingButton" && treeNode.userInteractionEnabled) {
            return true;
        }
    }

    _hideNodeGroup(threeNodeGroup, hide) {
        let mesh = threeNodeGroup.children[0]; // the first is the mesh, second is the BoxHelper
        if (mesh) {
            mesh.visible = !hide;
        }
        let boxHelper = threeNodeGroup.children[1];
        if (boxHelper) {
            boxHelper.visible = !hide;
        }
    }

    _isStatusBarWindow(inUIElement) {
        if (inUIElement.nativeClass === "UIAWindow") {
            const child = inUIElement.subviews[0];
            if (child.nativeClass === "UIAStatusBar") {
                return true;
            }
        }
        return false;
    }

    _isKeyboardWindow(nodeData) {
        return (nodeData.class === "UITextEffectsWindow");
    }

    _isNoSizeElement(element) {
        return (element.bounds.right - element.bounds.left === 0) || (element.bounds.bottom - element.bounds.top === 0);
    }

}
/**
 * Created by jongabilondo on 01/08/2016.
 */


/**
 * Creates a mouse listener on a dom element.
 * Any object that wants to receive mouse events can add itself to this object as a delegate.
 * @param domElement where the mouse will be tracked
 * @constructor
 */
class ORGMouseListener {

    constructor( domElement ) {
        this._domElement = domElement;
        this._listeners = [];
        this._enabled = false;
    }

    /**
     * Activates the mouse events listening and informs the delegates.
     */
    enable(  ) {

        var _this = this;

        if (this._enabled) {
            return; // make sure we do binds only once
        }

        $(this._domElement).bind("mousedown", function (event) {
            for (let i=0; i<_this._listeners.length; i++) {
                if (_this._listeners[i].onMouseDown) {
                    _this._listeners[i].onMouseDown( event );
                }
            }
        });

        $(this._domElement).bind("mouseup", function (event) {
            for (let i=0; i<_this._listeners.length; i++) {
                if (_this._listeners[i].onMouseUp) {
                    _this._listeners[i].onMouseUp( event );
                }
            }
        });

        $(this._domElement).bind("mousemove", function (event) {
            for (let i=0; i<_this._listeners.length; i++) {
                if (_this._listeners[i].onMouseMove) {
                    _this._listeners[i].onMouseMove( event );
                }
            }
        });

        $(this._domElement).bind("contextmenu",function(event){
            event.preventDefault();
            for (let i=0; i<_this._listeners.length; i++) {
                if (_this._listeners[i].onContextMenu) {
                    _this._listeners[i].onContextMenu( event );
                }
            }
        });

        this._enabled = true;
    }

    /**
     * Stops listening to mouse events.
     */
    disable() {
        $(this._domElement).unbind();
    }

    /**
     * Add a delegate to the list of objects to be notified of mouse events.
     * The delegate must implement onMouseDown, onMouseUp, onMouseMove
     * @param delegate
     */
    addDelegate( delegate ) {
        this._listeners.push( delegate );
    }

    /**
     * Remove the delegate from the list.
     * @param delegate
     */
    removeDelegate( delegate ) {
        for (let i=0; i<this._listeners.length; i++) {
            if ( this._listeners[i] == delegate) {
                this._listeners.splice( i, 0);
            }
        }
    }

}
/**
 * Created by jongabilondo on 01/08/2016.
 */

/**
 * A helper class to highlight the edges of the 3d UI elements when the UI is expanded.
 * When attached to a Raycaster as a delegate it will start to receive the "mouseOverElement" call and it will produce the highlight visual effect.
 * It implements the ORGRayscaster delegate method "mouseOverElement".
 * It is based in the usage of the THREE.BoxHelper object that is grouped with the 3D UI object.
 */
class ORG3DUIElementHighlight {

    constructor() {
        this._hilitedObj = null;
    }

    /**
     * Implementation of the Raycaster method to receive the UI element the mouse in on.
     * This method will manage the show and hide the highlights of the 3d objects.
     * @param THREEElement
     */
    mouseOverElement( THREEElement ) {
        if ( !!THREEElement ) {
            // Mouse is over some UI element

            let mustHilite = false;
            if ( !this._hilitedObj) {
                mustHilite = true;
            } else if ( this._hilitedObj.id !== THREEElement.id ) {
                this._highlightUIElement( this._hilitedObj, false);
                mustHilite = true;
            }

            if ( mustHilite ) {
                this._highlightUIElement( THREEElement, true);
            }

        } else  {
            // Mouse is NOT over any UI element
            if (this._hilitedObj) {
                this._highlightUIElement( this._hilitedObj, false);
            }
        }
    }


    /**
     * Private function to highlight a 3D object.
     * The highlight is performed using the THREE.BoxHelper which is the sibling of the 3D UI object. To access the BoxHelper we need to go the parent (which is a Group) and descend.
     * @param THREEElement
     * @param hilite
     */
    _highlightUIElement( THREEElement, hilite) {
        if ( !!THREEElement ) {
            let boxHelper = null;
            if (THREEElement.type === "Group") {
                boxHelper = THREEElement.children[0];
            } else if ( THREEElement.geometry.type === "PlaneBufferGeometry" || THREEElement.geometry.type === "BoxGeometry" ) {
                const parent = THREEElement.parent; // parent must be a group, holds edgesHelper and the uiobject plane
                if ( parent ) {
                    boxHelper = parent.children[0];
                }
            }
            if ( boxHelper instanceof THREE.BoxHelper ) {
                boxHelper.material.color.set( (hilite ?0xff0000 :0xffffff) );
                boxHelper.material.linewidth = (hilite ?10 :1);
                boxHelper.material.needsUpdate = true;
                this._hilitedObj = (hilite ?THREEElement :null); // keep the hilited obj
            }
        }
    }
}
/**
 * Created by jongabilondo on 27/07/2016.
 */

class ORGTooltip {

    constructor( canvasDomElement ) {
        this._threeCanvasDomElement = canvasDomElement;
        this._hilitedObj = null;
        this._tooltipOpen = false;

        $(this._threeCanvasDomElement).uitooltip({
            items: $(this._threeCanvasDomElement),
            content: "Roll over element",
            track: true,
            open: function( event, ui ) {
                console.log( ui );
            },
            create: function( event, ui ) {
                console.log( ui );
            }
        });
        //$( this._threeCanvasDomElement ).uitooltip( "open" );
        //$( this._threeCanvasDomElement ).uitooltip( "disable" );
        this._tooltipOpen = true;
    }

    destroy() {
        if (this._threeCanvasDomElement) {
            $( this._threeCanvasDomElement ).uitooltip( "destroy" );
        }
    }

    // DELEGATE METHOD Gets called when hilite must change
    mouseOverElement( threeElement ) {
        if ( !!threeElement ) {
            // Mouse is over some UI element

            // if (this._tooltipOpen) {
            //     $( this._threeCanvasDomElement ).uitooltip( "enable" );
            // }

            var mustShowTip = false;
            if ( !this._hilitedObj) {
                mustShowTip = true;
            } else if ( this._hilitedObj.id != threeElement.id ) {
                mustShowTip = true;
            }

            if ( mustShowTip ) {
                console.log(threeElement.parent.userData.class);
                this._show( threeElement.parent.userData );
            }

            //updatePosition();
        } else  {
            //this._hide(); // Mouse is NOT over any UI element
            if (this._tooltipOpen) {
               //$( this._threeCanvasDomElement ).uitooltip( "disable" );
               $( this._threeCanvasDomElement ).uitooltip( "option", "content", "<span class='ui-tooltip-value'>Roll over element</span>" );
            }
        }
    }

    // PRIVATE

    _show( elementInfo ) {
        if (this._tooltipOpen) {
            $( this._threeCanvasDomElement ).uitooltip( "option", "content", this._createTooltipContent(elementInfo) );
            $( this._threeCanvasDomElement ).uitooltip( "enable" );
            //$( this._threeCanvasDomElement ).uitooltip( "option", "track", true );
            // $( this._threeCanvasDomElement ).uitooltip( "option", "position", { using: function(pos,b) {
            //     console.log(pos);
            //     console.log(b);
            //     pos.left = 300;
            //     pos.top = 300;
            //     $(this).css(pos);
            // } } );
        } else {
            // $(this._threeCanvasDomElement).uitooltip({
            //     items: $(this._threeCanvasDomElement),
            //     content: this._createTooltipContent(elementInfo),
            //     track: true,
            //     open: function( event, ui ) {
            //         console.log( ui );
            //     },
            //     create: function( event, ui ) {
            //         console.log( ui );
            //     }
            // });
            //$( _threeCanvasDomElement ).uitooltip( "option", "content", createTooltipContent(elementInfo) );
            //$( this._threeCanvasDomElement ).uitooltip( "open" );
            //this._tooltipOpen = true;
        }
    }

    _hide() {
        if ( this._tooltipOpen) {
            //$( _threeCanvasDomElement ).uitooltip( "close" );
            //$( _threeCanvasDomElement ).uitooltip( "option", "content", null );
            $( this._threeCanvasDomElement ).uitooltip( "destroy" );
            this._tooltipOpen = false;
        }
    }

    _createTooltipContent( elementInfo) {

        if (!elementInfo) {
            return "";
        }

        var content = "<div>" + elementInfo.class;
        for (let key in elementInfo){
            if ( key == "screenshot" || key == "class" || key == "subviews" || key == "threeObj" || key == "originalWorldZPosition" || key == "zPosition") {
                continue;
            }

            if ( key == "accessibility") {
                content += this._serializeDictionary( elementInfo[key] );
                continue;
            }

            if ( key == "bounds" ) {
                content += "<br><span class='ui-tooltip-key'>bounds: </span>" + "<span class='ui-tooltip-value'>" + this._serializeBounds( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "gestures") {
                content += "<br><span class='ui-tooltip-key'>gestures: </span>" + "<span class='ui-tooltip-value'>" + this._serializeGestures( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "segues") {
                content += "<br><span class='ui-tooltip-key'>segues: </span>" + "<span class='ui-tooltip-value'>" + this._serializeSegues( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "controlEvents") {
                content += "<br><span class='ui-tooltip-key'>controlEvents: </span>" + "<span class='ui-tooltip-value'>" + this._serializeStrings( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "targets") {
                content += "<br><span class='ui-tooltip-key'>targets: </span>" + "<span class='ui-tooltip-value'>" + this._serializeStrings( elementInfo[key] ) + "</span>";
                continue;
            }


            content += "<br><span class='ui-tooltip-key'>" + key + ": </span>" + "<span class='ui-tooltip-value'>" + elementInfo[key] + "</span>";
        }
        return content += "</div>";
    }

    _serializeDictionary( dictionary ) {
        var content = "";
        for (let key in dictionary){
            content += "<br><span class='ui-tooltip-key'>" + key + ": </span>" + "<span class='ui-tooltip-value'>" + dictionary[key] + "</span>";
        }
        return content;
    }

    _serializeBounds( dictionary ) {
        var content = "x:" + dictionary.left + " y:" + dictionary.top.toString() + " w:" + (dictionary.right-dictionary.left).toString() + " h:" + (dictionary.bottom-dictionary.top).toString();
        return content;
    }

    _serializeGestures( gestures ) {
        var content = "";
        for ( var i=0; i<gestures.length; i++ ) {
            content += this._serializeGesture( gestures[i] );
        }
        return content;
    }

    _serializeGesture( gesture ) {
        var content = "";
        for (var key in gesture) {
            if ( content.length) {
                content += ", ";
            }
            content += key + ":" + gesture[key];
        }
        return "[" + content + "]";
    }

    _serializeSegues( segues ) {
        var content = "";
        for ( let i=0; i<segues.length; i++ ) {
            content += this._serializeSegue( segues[i] );
        }
        return content;
    }

    _serializeSegue( segue ) {
        var content = "";
        for (let key in segue) {
            if ( content.length) {
                content += ", ";
            }
            content += key + ":" + segue[key];
        }
        return "[" + content + "]";
    }

    _serializeStrings( strings ) {
        var content = "";
        for ( var i=0; i<strings.length; i++ ) {
            content += (content.length ?", " :"") + strings[i];
        }
        return content;
    }

}
/**
 * Created by jongabilondo on 02/07/2016.
 */

const ORGSceneVisualizationMask = {
    ShowFloor : 0x1,
    ShowDevice : 0x2,
    ShowTooltips : 0x4,
    ShowLocation : 0x8,
    ContinuousUpdate : 0x10
}
const kORGCameraTWEENDuration = 2000.0; // ms
const kORGFloorPositionY = 0.0; // m
const kORGDevicePositionY = 1.5; // m
const kORGCameraPositionZ = 0.2; // m

/**
 * The class that holds the THREE.Scene with the GLRenderer.
 * It provides all the methods to handle the operations on the Scene.
 *
 * @param domContainer The dom element where to create the 3D scene.
 * @param screenSize An initial size for the 3D scene. It will be updated to the real size of the container once the scene has been created.
 * @constructor
 */
class ORG3DScene {

    constructor(domContainer, screenSize) {

        this._sceneFloor = null; // a ORG3DSceneFloor
        this._device = null; // a ORG3DDevice
        this._uiTreeModelRaycaster = null; // a ORG3DUITreeRaycaster
        this._sceneRaycaster = null; // a ORG3DSceneRaycaster
        this._screenRaycaster = null; // a ORG3DUITreeRaycaster
        this._mouseListener = null; // a ORGMouseListener
        this._tooltiper = null; // a ORGTooltip
        this._beaconTransformControl = null; // ORG3DBeaconTransformControl
        this._THREEScene = null;
        this._THREECamera = null;
        this._THREERenderer = null;
        this._THREEOrbitControls = null;
        this._keyboardState = null;
        this._threeClock = null;
        this._uiExpanded = false;
        this._canvasDomElement = null; // the table cell where the renderer will be created, it contains _rendererDOMElement
        this._rendererDOMElement = null; // threejs scene is displayed in this DOM element
        this._contextMenuManager = null;
        this._locationMarker = null;
        this._lastLocationName = "?";
        this._sceneVisualFlags = ORGSceneVisualizationMask.ShowFloor |
            ORGSceneVisualizationMask.ShowDevice |
            ORGSceneVisualizationMask.ShowLocation |
            ORGSceneVisualizationMask.ContinuousUpdate;
        this._treeVisualizationFlags = ORGTreeVisualizationMask.ShowNormalWindow |
            ORGTreeVisualizationMask.ShowAlertWindow |
            ORGTreeVisualizationMask.ShowKeyboardWindow |
            ORGTreeVisualizationMask.ShowOutOfScreen |
            ORGTreeVisualizationMask.ShowInteractiveViews |
            ORGTreeVisualizationMask.ShowNonInteractiveViews |
            ORGTreeVisualizationMask.ShowPrivate |
            ORGTreeVisualizationMask.ShowScreenshots;

        this._uiTreeModel = new ORG3DUITreeModel(this._treeVisualizationFlags);
        //this.expanding = false;
        this._initialize(domContainer, this.flagShowFloor);
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------
    get sceneSize() {
        return this._THREERenderer.getSize();
    }

    get THREEScene() {
        return this._THREEScene;
    }

    get THREERenderer() {
        return this._THREERenderer;
    }

    get deviceScreen() {
        //return this._deviceScreen;
        return this._device.deviceScreen;
    }

    get device3DModel() {
        //return this._device3DModel;
        return this._device.deviceBody;
    }

    get deviceScreenBoundingBox() {
        return this._device.deviceScreen.boundingBox;
    }

    get THREECamera() {
        return this._THREECamera;
    }

    get THREEDeviceAndScreenGroup() {
        //return this._THREEDeviceAndScreenGroup;
        return this._device.bodyAndScreenGroup;
    }

    get rendererDOMElement() {
        return this._rendererDOMElement;
    }

    get isExpanded() {
        return this._uiExpanded;
    }

    set isExpanded(expanded) {
        this._uiExpanded = expanded;
    }

    get expanding() {
        return this._expanding;
    }

    set expanding(expanding) {
        this._expanding = expanding;
    }

    get contextMenuManager() {
        return this._contextMenuManager;
    }
    /**
     * Scene flags
     */
    get flagContinuousScreenshot() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ContinuousUpdate;
    }

    set flagContinuousScreenshot(flag) {
        if (flag) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ContinuousUpdate;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ContinuousUpdate;
        }
    }

    get flagShowTooltips() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowTooltips;
    }

    set flagShowTooltips(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowTooltips;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowTooltips;
        }
    }

    get flagShowDevice3DModel() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowDevice;
    }

    set flagShowDevice3DModel(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowDevice;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowDevice;
        }    }

    get flagShowFloor() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowFloor;
    }

    set flagShowFloor(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowFloor;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowFloor;
        }
    }

    get flagShowLocation() {
        return this._sceneVisualFlags & ORGSceneVisualizationMask.ShowLocation;
    }

    set flagShowLocation(show) {
        if (show) {
            this._sceneVisualFlags |= ORGSceneVisualizationMask.ShowLocation;
        } else {
            this._sceneVisualFlags &= ~ORGSceneVisualizationMask.ShowLocation;
        }
    }

    /**
     * Tree flags
     */
    get flagShowPrivateClasses() {
        return (this._treeVisualizationFlags & ORGTreeVisualizationMask.ShowPrivate);
    }

    set flagShowPrivateClasses(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowPrivate;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowPrivate;
        }
    }

    set flagShowKeyboardWindow(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowKeyboardWindow;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowKeyboardWindow;
        }
    }

    set flagShowHiddenViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowHiddenViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowHiddenViews;
        }
    }

    set flagShowNonInteractiveViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowNonInteractiveViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowNonInteractiveViews;
        }
    }

    set flagShowInteractiveViews(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowInteractiveViews;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowInteractiveViews;
        }
    }

    set flagShowScreenshots(flag) {
        if (flag) {
            this._treeVisualizationFlags |= ORGTreeVisualizationMask.ShowScreenshots;
        } else {
            this._treeVisualizationFlags &= ~ORGTreeVisualizationMask.ShowScreenshots;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Remove the Device from the scene. After device disconnection all models and data of device must be removed.
     */
    handleDeviceDisconnection() {
        this.removeDeviceScreen();
        this.removeUITreeModel();
        this.hideDevice3DModel();
        this._removeDeviceAndScreenGroup();
    }

    /**
     * Sets the Image that will be used to create the texture to set it to the device screen.
     * It sets the image in a variable to be used in the next render cycle.
     * @param image.
     */
    setScreenshotImage(image) {
       /* if (this._deviceScreen) {
            this._deviceScreen.nextScreenshotImage = image;
        }*/
       this._device.deviceScreen.nextScreenshotImage = image;
    }

    updateUITreeModel(treeJson) {

        // First destroy the raycaster for the screen
        this.removeRaycasterForDeviceScreen();
        this.hideDeviceScreen();

        if (this.flagShowTooltips) {
            this.disableTooltips();
        }

        this.destroyRaycasterFor3DTreeModel(); // Destroy Raycaster for the 3D UI Model object

        // Create the 3D UI model
        this.isExpanded = true;
        //this.expanding = false;
        this._uiTreeModel.visualizationFlags = this._treeVisualizationFlags; // update the flags
        this._uiTreeModel.updateUITreeModel(treeJson, this._THREEScene, ORG.device.screenSize, ORG.device.displaySize, ORG.device.displayScale, this.THREEDeviceAndScreenGroup.position);

        this.createRaycasterFor3DTreeModel(); // Create Raycaster for the 3D UI Model object

        if (this.flagShowTooltips) {
            this.enableTooltips();
        }
    }

    removeUITreeModel() {
        this._uiTreeModel.removeUITreeModel(this._THREEScene);
    }

    //--
    //  DEVICE
    //--

    addDeviceToScene(screenSize, deviceBodyModel, orientation) {
        this._device.createDeviceScreen(screenSize, new THREE.Vector3(0, 0, 0), this._THREEScene);
        if (deviceBodyModel) {
            this._device.addDeviceBody(deviceBodyModel);
        }
        this._device.resetDevicePosition(new THREE.Vector3(0, kORGDevicePositionY, 0)); // translate to default Y
        //this._device.bodyAndScreenGroup.translateY(kORGDevicePositionY); // translate to default Y
        this.setDeviceOrientation(orientation);
        this._device.addToScene(this._THREEScene);
        this.devicePositionHasChanged();
        this.createRaycasterForDeviceScreen();
    }

    removeDeviceScreen() {
        this._device.removeDeviceScreen();
    }

    hideDeviceScreen() {
        this._device.hideDeviceScreen();
    }

    showDeviceScreen() {
        this._device.showDeviceScreen();
    }

    addDevice3DModel(device3DModel) {
        this._device.addDeviceBody(device3DModel);
        this.devicePositionHasChanged();
    }

/*    showDevice3DModel() {
        return new Promise((resolve, reject) => {
            this.hideDevice3DModel();

            if (!this.flagShowDevice3DModel) {
                reject();
            }

            ORG3DDeviceModelLoader.loadDevice3DModel(ORG.device, this, kORGDevicePositionY).then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                })
        })
    }*/

    hideDevice3DModel() {
        this._device.removeDeviceBody();
        this.devicePositionHasChanged();
    }

    setDeviceOrientation(orientation) {
        this._device.setDeviceOrientation(orientation);
    }

    createRaycasterFor3DTreeModel() {
        this._uiTreeModelRaycaster = new ORG3DUITreeRaycaster(this._rendererDOMElement, this._THREECamera, this._uiTreeModel.treeGroup);
        this._uiTreeModelRaycaster.addDelegate(new ORG3DUIElementHighlight()); // attach a hiliter
        this._uiTreeModelRaycaster.addDelegate(this._contextMenuManager); // attach a context menu manager, needs to know what three obj is the mouse on

        // Activate mouse listener to feed the raycaster
        if (this._mouseListener) {
            this._mouseListener.addDelegate(this._uiTreeModelRaycaster); // send the mouse events to the Raycaster
            this._mouseListener.enable();
        }
    }

    destroyRaycasterFor3DTreeModel() {
        if (this._uiTreeModelRaycaster) {
            if (this._tooltiper) {
                this._uiTreeModelRaycaster.removeDelegate(this._tooltiper); // Detach tooltiper from the raycaster
            }
            if (this._mouseListener) {
                this._mouseListener.removeDelegate(this._uiTreeModelRaycaster); // send the mouse events to the Raycaster
            }
            this._uiTreeModelRaycaster = null;
        }
    }

    createRaycasterForScene() {
        this._sceneRaycaster = new ORG3DSceneRaycaster(this._rendererDOMElement, this._THREECamera, this._THREEScene);

        // Activate mouse listener
        this._mouseListener.addDelegate(this._sceneRaycaster); // send the mouse events to the Raycaster
        this._mouseListener.enable();
    }

    createRaycasterForDeviceScreen() {
        this._screenRaycaster = new ORG3DUITreeRaycaster(this._rendererDOMElement, this._THREECamera, this._device.deviceScreen.screenPlane);
        this._screenRaycaster.addDelegate(this._contextMenuManager); // attach a context menu manager

        // Activate mouse listener
        this._mouseListener.addDelegate(this._screenRaycaster); // send the mouse events to the Raycaster
        this._mouseListener.enable();
    }

    removeRaycasterForDeviceScreen() {
        if (this._screenRaycaster) {
            this._mouseListener.removeDelegate(this._screenRaycaster);
            this._screenRaycaster = null;
        }
    }

    setLiveScreen(live) {
        this.flagContinuousScreenshot = live;
        if (this._device.deviceScreen && ORG.deviceController.hasContinuousUpdate) {
            if ((this._sceneVisualFlags & ORGSceneVisualizationMask.ContinuousUpdate) && !this._uiExpanded) {
                ORG.deviceController.requestScreenshot();
                //ORGActionsCenter.refreshScreen();
            }
        }
    }

    showTooltips(show) {
        this.flagShowTooltips = show;
        if (show) {
            this.enableTooltips();
        } else {
            this.disableTooltips();
        }
    }

    enableTooltips() {
        if (!this._tooltiper) {
            this._tooltiper = new ORGTooltip(this._rendererDOMElement);
            if (this._uiTreeModelRaycaster) {
                this._uiTreeModelRaycaster.addDelegate(this._tooltiper); // Attach it to the raycaster
            }
        }
    }

    disableTooltips() {
        if (this._tooltiper) {
            if (this._uiTreeModelRaycaster) {
                this._uiTreeModelRaycaster.removeDelegate(this._tooltiper); // Detach it from the raycaster
            }
            this._tooltiper.destroy();
            this._tooltiper = null;
        }
    }

    createFloor() {
        if (!this._sceneFloor) {
            this._sceneFloor = this._createFloor(this._THREEScene);
            this.devicePositionHasChanged();
        }
    };

    removeFloor() {
        if (this._sceneFloor) {
            this._removeFloor();
        }
    };

    /*expand() {
        if (!this._uiExpanded) {
            bootbox.dialog({ message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Expanding UI elements...</h4></div>' }); // Progress alert

            ORG.deviceController.getElementTree({
                "status-bar": true,
                "keyboard": true,
                "alert": true,
                "normal": true
            });
            //this.expanding = true;
        }
    }

    collapseAndExpandAnimated() {
        const _this = this;
        this.collapse(() => {
            _this.expand();
        })
    }*/

    collapse(completionCallback) {
        if (this.isExpanded) {
            return;
        }
        // we dont need the mouse listener and the raycaster anymore
        //this._mouseListener.disable();

        this.disableTooltips();

        const _this = this;
        const requestScreenshot = this.flagContinuousScreenshot;

        this._uiTreeModel.collapseWithCompletion(() => {
            /*if (_this._deviceScreen) {
                _this._deviceScreen.show();
            }*/
            this._device.showDeviceScreen();
            if (requestScreenshot) {
                ORG.deviceController.requestScreenshot(); // keep updating screenshot
            }
            _this.createRaycasterForDeviceScreen();
            _this._uiExpanded = false;

            if (!!completionCallback) {
                completionCallback();
            }
        })
    }

    showHideDeviceTransformControls(mode) {
        this._device.showHideDeviceTransformControls(this, mode);
/*
        if (this._transformControl) {
            this._transformControl.destroy();
            this._transformControl = null;
        } else {
            this._transformControl = new ORG3DDeviceTransformControl(this, mode);
        }
*/
    }

    showHideBeaconTransformControls(THREEBeacon) {
        if (this._beaconTransformControl) {
            this._beaconTransformControl.destroy();
            this._beaconTransformControl = null;
        } else {
            this._beaconTransformControl = new ORG3DBeaconTransformControl(this, "translate", THREEBeacon);
        }
    }

    addBeacon() {
        const range = 50;
        let newBeacon = new ORGBeacon("name", range, {x:0,y:0,z:0});
        let new3DBeacon = new ORG3DBeacon(newBeacon);
        ORG.scenario.addBeacon(newBeacon);

        this._THREEScene.add(new3DBeacon.model);
        new3DBeacon.animateCore();
    }

    /**
     * Locate the camera at default position and looking a t 0,0,0.
     */
    resetCameraPosition() {
        // Avoid flickering by stopping screen updates
        const liveScreen = this.flagContinuousScreenshot;
        if (liveScreen) {
            this.setLiveScreen(false);
        }

        const _this = this;
        new TWEEN.Tween(this._THREECamera.position).to({
            x: 0,
            y: kORGDevicePositionY,
            z: kORGCameraPositionZ}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => {
                if (liveScreen) {
                    _this.setLiveScreen(true);
                }
            }).start();

        // TWEEN camera lookAt. But we can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        new TWEEN.Tween(_this._THREEOrbitControls.target).to({
            x: 0,
            y: kORGDevicePositionY,
            z: 0}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    /**
     * Function to reset the rotation and position of the Device to the default values.
     */
    resetDevicePosition() {
        this._device.resetDevicePosition(new THREE.Vector3(0, kORGDevicePositionY, 0));
        this.devicePositionHasChanged();
    }


    /***
     * Move the camera to the position that the device screen will fit on the scene.
     */
    deviceScreenCloseup() {
        if (!this._device.deviceScreen) {
            return;
        }

        const maxDim = Math.max(this._device.deviceScreen.screenSize.width, this._device.deviceScreen.screenSize.height);
        const fov = this._THREECamera.fov * (Math.PI / 180);
        const distance = Math.abs(maxDim/2 / Math.tan(fov / 2)) * 1.01;

        // Avoid flickering by stopping screen updates
        const liveScreen = this.flagContinuousScreenshot;
        if (liveScreen) {
            this.setLiveScreen(false);
        }

        const devicePosition = this._device.deviceScreen.screenWorldPosition;

        // Camera Look At
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z}, kORGCameraTWEENDuration/2)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        // Camera position
        const _this = this;
        new TWEEN.Tween(this._THREECamera.position).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z + distance}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quintic.InOut)
            .onComplete(() => {
                if (liveScreen) {
                    _this.setLiveScreen(true);
                }
            }).start();
    }

    /**
     * Set the camera looking at the given THREE object.
     * @param threeObject
     */
    lookAtObject(threeObject) {
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: threeObject.position.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

    }

    lookFrontAtObject(threeObject) {
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.

        new TWEEN.Tween(this._THREECamera.position).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: 900}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: threeObject.position.x,
            y: threeObject.position.y,
            z: threeObject.position.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

    }

    lookAtDevice() {
        if (!this._device.deviceScreen) {
            return;
        }
        // We can't do it setting camera.lookAt ! Due to collision with OrbitControls !
        // We must use the OrbitControl.target instead.
        const devicePosition = this._device.deviceScreen.screenWorldPosition;
        new TWEEN.Tween(this._THREEOrbitControls.target).to({
            x: devicePosition.x,
            y: devicePosition.y,
            z: devicePosition.z}, kORGCameraTWEENDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    enableShowLocation() {
        this.flagShowLocation = true;

        if (!this._locationMarker) {
            const position = this._calculateLocationMarkerPosition();
            this._locationMarker = new ORG3DLocationMarker(position, this._lastLocationName, this._THREEScene);
        }
    }

    disableShowLocation() {
        this.flagShowLocation = false;
        if (this._locationMarker) {
            this._locationMarker.destructor();
            this._locationMarker = null;
        }
    }

    setShowNormalWindow(flag) {
    }

    setShowAlertWindow(flag) {
    }

    devicePositionHasChanged() {
        this._adjustLocationMarkerPosition();
    }

    resize(newSize) {
        this._THREERenderer.setSize(newSize.width, this._THREERenderer.getSize().height);
        this._THREECamera.aspect	= newSize.width / this._THREERenderer.getSize().height;
        this._THREECamera.updateProjectionMatrix();
    }

    setExpandedTreeLayersDistance(distanceUnits) {
        if (this._uiTreeModel) {
            this._uiTreeModel.setExpandedTreeLayersDistance(distanceUnits);
        }
    }

    setExpandedTreeLayersVisibleRange(maxVisibleLayer) {
        if (this._uiTreeModel) {
            this._uiTreeModel.setExpandedTreeLayersVisibleRange(maxVisibleLayer);
        }
    }

    /***
     * Call the 3D tree or the Sreen to highlight the given UI elment
     * @param element ORG3DUIElement, can be WDA, Org ...
     */
    highlightUIElement(element) {
        if (this._uiTreeModel.isExpanded) {
            this._uiTreeModel.highlightUIElement(element.elementJSON);
        } else if (this._device.deviceScreen) {
            this._device.deviceScreen.highlightUIElement(element);
        }
    }


    //------------------------------------------------------------------------------------------------------------------
    //  DELEGATES
    //------------------------------------------------------------------------------------------------------------------

    locationUpdate(location, locationName, elevation) {
        if (locationName) {
            this._lastLocationName = locationName;
        } else {
            this._lastLocationName = location.lat() + "  " + location.lng();
        }

        if (this.flagShowLocation) {
            if (!this._locationMarker) {
                const floorPosition = this._calculateLocationMarkerPosition();
                this._locationMarker = new ORG3DLocationMarker(floorPosition, this._lastLocationName, this._THREEScene);
            } else {
                this._locationMarker.updateDescriptor(this._lastLocationName);
            }
        }
     }


    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _initialize(domContainer, showFloor) {

        this._canvasDomElement = domContainer;
        const rendererCanvasWidth = this._canvasDomElement.clientWidth;
        const rendererCanvasHeight = this._canvasDomElement.clientHeight;

        this._THREEScene = new THREE.Scene();
        //this._THREEScene.add(this._THREEDeviceAndScreenGroup);

        this._THREECamera = new THREE.PerspectiveCamera(65, (rendererCanvasWidth / rendererCanvasHeight), 0.001, 10000);
        this._THREERenderer = new THREE.WebGLRenderer({antialias: true /*, alpha:true (if transparency wanted)*/});
        this._THREERenderer.domElement.style.position = 'absolute';
        this._THREERenderer.domElement.style.top = 0;
        //_THREERenderer.domElement.style.zIndex = 0;
        //_THREERenderer.setClearColor(0x000000);

        this._THREERenderer.setSize(rendererCanvasWidth, rendererCanvasHeight);
        this._canvasDomElement.appendChild(this._THREERenderer.domElement);
        this._rendererDOMElement = this._THREERenderer.domElement; // the DOM element for the renderer

        this._THREEOrbitControls = new THREE.OrbitControls(this._THREECamera, this._THREERenderer.domElement);//this._canvasDomElement);
        this._keyboardState = new KeyboardState();

        if (showFloor) {
            this._sceneFloor = this._createFloor(this._THREEScene);
        }

        this._createLights();

        this._THREECamera.position.set(0, kORGDevicePositionY, kORGCameraPositionZ);
        this._THREEOrbitControls.target.set(0, kORGDevicePositionY, 0);
        //this._THREECamera.lookAt(new THREE.Vector3(0, kORGDevicePositionY, 0)); // not working, must use this._THREEOrbitControls.target

        this._threeClock = new THREE.Clock();

        // Create the rightMouse click manager
        this._contextMenuManager = new ORGContextMenuManager(this, '#threejs-canvas');

        // Create a mouse event listener and associate delegates
        this._mouseListener = new ORGMouseListener(this._rendererDOMElement);
        this._mouseListener.addDelegate(this._contextMenuManager);
        this._mouseListener.enable();

        this._render();
        //ORG.WindowResize(this._THREERenderer, this._THREECamera, this._canvasDomElement);

        this.createRaycasterForScene();

        this._device = new ORG3DDevice();
    }

    _calculateFloorPosition() {
        if (this._sceneFloor) {
            return this._sceneFloor.position;
        } else {
            return new THREE.Vector3(0, kORGFloorPositionY, 0);
        }
    }

    _createFloor(threeScene) {
        const floorSize = 1000;
        const tileSize = 100;
        return new ORG3DSceneFloor(floorSize, tileSize, true, threeScene, kORGFloorPositionY);
    }

    _removeFloor() {
        if (this._sceneFloor) {
            this._sceneFloor.remove();
        }
        this._sceneFloor = null;
    }

    _createLights() {
        let light;

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(500,-500,500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(500,500,500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(-500,-500,-500);
        this._THREEScene.add(light);

        light = new THREE.SpotLight(0xaaaaaa);
        light.position.set(-500,500,-500);
        this._THREEScene.add(light);

        //light = new THREE.DirectionalLight(0xaaaaaa, 0.5 );
        //light.position.copy( new THREE.Vector3(0.0, 1.0, -1.0));
        //this._THREEScene.add(light);
        //
        //light = new THREE.DirectionalLight(0xaaaaaa, 0.5 );
        //light.position.copy( new THREE.Vector3(1.0, 1.0, 1.0));
        //this._THREEScene.add(light);

        //light = new THREE.HemisphereLight( );
        //this._THREEScene.add(light);
        //
        //light = new THREE.AmbientLight(0xffffff, 0.9);
        //this._THREEScene.add(light);
    }

    _adjustLocationMarkerPosition() {
        if (this._locationMarker) {
            this._locationMarker.setPosition(this._calculateLocationMarkerPosition());
        }
    }

    _calculateLocationMarkerPosition() {
        const kOffsetFromDeviceBottom = 0.02;
        let position = (this._sceneFloor ?this._sceneFloor.position :new THREE.Vector3(0, 0, 0));
        if (this._device) {
            let deviceBoundingBox = this._device.deviceBoundingBox;
            if (deviceBoundingBox) {
                let center = new THREE.Vector3();
                deviceBoundingBox.getCenter(center);
                let size = deviceBoundingBox.getSize();
                position = new THREE.Vector3(center.x, center.y - size.y/2 - kOffsetFromDeviceBottom, center.z);
            }
        }
        return position;
    }

    _removeDeviceAndScreenGroup() {
        this._device.removeFromScene(this._THREEScene);
    }

    _render() {
        const _this = this;

        requestAnimationFrame(() => {
            _this._THREERenderer.render(_this._THREEScene, _this._THREECamera);
            _this._THREEOrbitControls.update();
            _this._updateScene();
            TWEEN.update();
            _this._render();
        })
    }

    _updateScene()
    {
       /* if (this._deviceScreen) {
            this._deviceScreen.renderUpdate();
        }*/
        this._device.renderUpdate();

        /*if (this._transformControl) {
            this._transformControl.update(); // important to update the controls size while changing POV
        }*/
        if (this._beaconTransformControl) {
            this._beaconTransformControl.update(); // important to update the controls size while changing POV
        }
        if (ORG.systemInfoManager) {
            ORG.systemInfoManager.update();
        }
/*
        _keyboardState.update();

        // Expand/Collapse UI
        if (_keyboardState.down("E")) {
            ORG.scene.expandCollapse();
        }
        else if (_keyboardState.down("F")) {
            checkButtonShowFloor.click();
            ORG.scene.setShowFloor(checkButtonShowFloor.is(':checked'));
        }
        else if (_keyboardState.down("P")) {
            checkButtonShowPrivate.click();
            ORG.scene.setShowPrivate(checkButtonShowPrivate.is(':checked'));
        }
        else if (_keyboardState.down("L")) {
            checkButtonLiveScreen.click();
            ORG.scene.setLiveScreen(checkButtonLiveScreen.is(':checked'));
         }
        else if (_keyboardState.down("T")) {
            checkButtonShowTooltips.click();
            ORG.scene.setShowTooltips(checkButtonShowTooltips.is(':checked'));
         }
*/
        // rotate left/right/up/down

        //if (keyboard.down("left")) {
        //    //iPhone5Object.translateX(-50);
        //    threeScreenPlane.translateX(-50);
        //}
        //if (keyboard.down("right")) {
        //    //iPhone5Object.translateX( 50);
        //    threeScreenPlane.translateX(50);
        //}
        //if (keyboard.pressed("up")) {
        //    //iPhone5Object.translateZ(-50);
        //    threeScreenPlane.translateZ(-50);
        //}
        //if (keyboard.pressed("down")) {
        //    //iPhone5Object.translateZ( 50);
        //    threeScreenPlane.translateZ(50);
        //}

        //var rotation_matrix = new THREE.Matrix4().identity();
        /*
        if (_keyboardState.pressed("A")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
            if (!!threeScreenPlane) {
                threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
            }
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("D")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("R")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("F")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("Q")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,0,1), rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,0,1), rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("W")) {
            //iPhone5Object.rotateOnAxis(new THREE.Vector3(0,0,1), -rotateAngle);
            threeScreenPlane.rotateOnAxis(new THREE.Vector3(0,0,1), -rotateAngle);
            deviceMotionChanged = true;
        }
        if (keyboard.pressed("Z")) {
            //iPhone5Object.position.set(0,0,0);
            //iPhone5Object.rotation.set(0,0,0);
            threeScreenPlane.position.set(0,0,0);
            threeScreenPlane.rotation.set(0,0,0);
            deviceMotionChanged = true;
        }*/

        //if (motionActive==true && deviceMotionChanged==true) {
        //    //alert("1");
        //    if (motionMode == "send") {
        //        //alert("2");
        //        // send motion data to device
        //        var rotation = iPhone5Object.rotation;
        //        var quaternion = iPhone5Object.quaternion;
        //
        //        var message = {
        //            "command" : "SimulatorMotionUpdate",
        //            "content" : {"q" : { "x" : quaternion.x, "y":quaternion.z, "z":quaternion.y, "w":quaternion.w}}
        //        };
        //
        //        sendSimulatorMotionUpdate(message);
        //    }
        //}

        //var timeOffset = uniforms.time.value + attributes.customOffset.value[ v ];
        //particleGeometry.vertices[v] = position(timeOffset);
        //iPhone5Object.setPosition(position(timeOffset));
    }

}
/**
 * Created by jongabilondo on 01/07/2016.
 */

/**
 * ORGMessageBuilder. Utilities class to create JSON requests to Organismo driver.
 */
class ORGMessageBuilder {

    static deviceInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.DEVICE_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static systemInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.SYSTEM_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static appInfo() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.APP_INFO
            }
        };
        return JSON.stringify(msg);
    }

    static takeScreenshot() {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.SCREENSHOT
            }
        };
        return JSON.stringify(msg);
    }

    static requestOrientationUpdates(enable) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.ORIENTATION_UPDATES,
                parameters: {'enable': enable}
            }
        };
        return JSON.stringify(msg);
    }

    static requestLocationUpdates(enable) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.LOCATION_UPDATES,
                parameters: {'enable': enable}
            }
        };
        return JSON.stringify(msg);
    }

    static elementTree(parameters) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.ELEMENT_TREE,
                parameters: parameters
            }
        };
        return JSON.stringify(msg);
    }

    static gesture(gesture, parameters) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: gesture,
                parameters:parameters
            }
        };
        return JSON.stringify(msg);
    }

    static locationUpdate(location, elevation) {
        let msg = {
            type: ORGMessage.UPDATE,
            data: {
            }
        };
        if (location) {
            msg.data.location = { lat: location.lat(), lng : location.lng() };
        }
        if (elevation) {
            msg.data.altimeter = { altitude: elevation, pressure: 1000.0 }; // 100 kilopascal is 1 bar
        }
        return JSON.stringify(msg);
    }

    static attitudeUpdate(quaternion) {
        let msg = {
            type: ORGMessage.UPDATE,
            data: {
            }
        };
        if (quaternion) {
            msg.data.deviceAttitude = { qx:quaternion.x, qy:quaternion.z, qz:quaternion.y, qw:quaternion.w };
        }
        return JSON.stringify(msg);
    }

    static classHierarchy(className) {
        const msg = {
            type: ORGMessage.REQUEST,
            data: {
                request: ORGRequest.CLASS_HIERARCHY,
                parameters:{className: className}
            }
        };
        return JSON.stringify(msg);
    }
}
/**
 * Created by jongabilondo on 15/09/2016.
 */


/**
 * Class to create context menus in the 3D scene.
 * It implements the delegate call for ORGMouseListener in order to get the right mouse click.
 * It implements the delegate call for ORG3DRaycaster which informs what is the selected three obj.
 * @param domElement
 * @constructor
 */
class ORGContextMenuManager {

    /**
     *
     * @param scene The ORG scene.
     * @param contextElement the element where the context menu shows up.
     */
    constructor(scene, contextElement) {
        this._selectedThreeObject = null; // the three obj where the mouse is on.
        this._intersectionPoint = null;
        this._scene = scene; // We will need to get information from some objects in the scene
        this._contextElement = contextElement;

        /**
         * Instantiate the context menu
         */
        $.contextMenu({
            selector: this._contextElement,
            trigger: 'none',
            build: ($trigger, e) => {
                if (this._selectedThreeObject) {
                    return {
                        items: this._menuItemsForScreen()
                    }
                } else {
                    return {
                        items: this._menuItemsForOutOfScreen()
                    }
                }
            },
            callback: (key, options) => {
                this._processMenuSelection(key, this._selectedThreeObject, this._scene);
            }
        });
    }


    /**
     * ORGMouseListener calls this method on right click
     * @param event
     */
    onContextMenu(event) {
        if (!ORG.deviceController || ORG.deviceController.isConnected === false) {
            return;
        }
        $(this._contextElement).contextMenu({x:event.clientX, y:event.clientY});
    }

    /**
     * ORG3DRaycaster calls this method to inform of the three obj the mouse is hoovering on.
     * @param threeElement
     */
    mouseOverElement(threeElement, point) {
        this._selectedThreeObject = threeElement;
        this._intersectionPoint = point;
    }


    /**
     * The user has selected a menu option. This function will respond to the selection.
     * @param menuOptionKey The string that represents the selected menu option.
     * @param threeObj The 3D object where the click happened.
     * @param scene The ORG scene.
     */
    _processMenuSelection(menuOptionKey, threeObj, scene) {

        if (!threeObj) {
            this._processMenuSelectionOnVoid(menuOptionKey, scene); // in screen raycaster we get no three obj
            return;
        }

        // Calculate the App coordinates where the mouse was clicked.

        const screenBbox = scene.deviceScreenBoundingBox;
        const appX = this._intersectionPoint.x - screenBbox.min.x;
        const appY = screenBbox.max.y - this._intersectionPoint.y;

        const parameters = {location:{x:appX, y:appY}};

        switch (menuOptionKey) {
            case ORGActions.PRESS_HOME : {
                ORGActionsCenter.pressHome();
            } break;
            case ORGActions.LOCK_DEVICE : {
                ORGActionsCenter.lockDevice();
            } break;
            case ORGActions.UNLOCK_DEVICE : {
                ORGActionsCenter.unlockDevice();
            } break;
            case ORGActions.REFRESH_SCREEN : {
                ORGActionsCenter.refreshScreen();
            } break;
            case ORGActions.TRANSLATE_DEVICE : {
                ORGActionsCenter.translateDevice();
            } break;
            case ORGActions.ROTATE_DEVICE : {
                ORGActionsCenter.rotateDevice();
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT:
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN:
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                ORGActionsCenter.setOrientation(menuOptionKey);
            } break;
            case ORGActions.TAP : {
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.LONG_PRESS : {
                parameters.duration = 0.5;
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_LEFT : {
                parameters.direction = "left";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_RIGHT : {
                parameters.direction = "right";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_UP : {
                parameters.direction = "up";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.SWIPE_DOWN : {
                parameters.direction = "down";
                ORG.deviceController.send(ORGMessageBuilder.gesture(menuOptionKey, parameters));
            } break;
            case ORGActions.LOOK_AT : {
                scene.lookAtObject( threeObj );
            } break;
            case ORGActions.LOOK_FRONT_AT : {
                scene.lookFrontAtObject( threeObj );
            } break;
        }
    }

    /**
     * This function will respond to the selected option of the menu in the scene open area.
     * @param menuOptionKey
     * @param scene
     * @private
     */
    _processMenuSelectionOnVoid(menuOptionKey, scene) {

        switch (menuOptionKey) {
            case ORGActions.RESET_CAMERA_POSITION : {
                scene.resetCameraPosition();
            } break;
            case ORGActions.RESET_DEVICE_POSITION : {
                scene.resetDevicePosition();
            } break;
            case ORGActions.SCREEN_CLOSEUP : {
                scene.deviceScreenCloseup();
            } break;
            case ORGActions.LOOK_AT_DEVICE : {
                ORGActionsCenter.lookAtDevice();
            } break;
        }
    }

    _menuItemsForScreen() {
        let controller = ORG.deviceController;
        var items = {};
        if (controller.type === 'ORG') {
            items[ORGActions.TAP] = {name: "Tap"};
            items[ORGActions.LONG_PRESS] = {name: "Long Press"};
            items[ORGActions.SWIPE] = {
                name: "Swipe",
                items: {
                    [ORGActions.SWIPE_LEFT]: {name: "Left"},
                    [ORGActions.SWIPE_RIGHT]: {name: "Right"},
                    [ORGActions.SWIPE_UP]: {name: "Up"},
                    [ORGActions.SWIPE_DOWN]: {name: "Down"},
                }
            }
        }

        if (controller.type === 'WDA') {
            if (Object.keys(items).length) {
                items["separator-press"] = { "type": "cm_separator" };
            }
            items[ORGActions.PRESS_HOME] = {name: "Press Home"};
            items[ORGActions.LOCK_DEVICE] = {name: "Lock"};
            items[ORGActions.UNLOCK_DEVICE] = {name: "Unlock"};
            items[ORGActions.SET_ORIENTATION] = {
                name: "Set Orientation",
                items: {
                    [ORGDevice.ORIENTATION_PORTRAIT]: {name: "Portrait"},
                    [ORGDevice.ORIENTATION_LANDSCAPE_LEFT]: {name: "Landscape Left"},
                    [ORGDevice.ORIENTATION_LANDSCAPE_RIGHT]: {name: "Landscape Right"},
                    [ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN]: {name: "Upside Down"}
                }
            }
        }

        if (controller.type === 'ORG') {
            if (Object.keys(items).length) {
                items["separator-look"] = { "type": "cm_separator" };
            }
            items[ORGActions.TRANSLATE_DEVICE] = {name: "Translate Device [ON/OFF]"};
            items[ORGActions.ROTATE_DEVICE] = {name: "Rotate Device [ON/OFF]"};
/*
            items[ORGActions.LOOK_AT] = {name: "Look at"};
            items[ORGActions.LOOK_FRONT_AT] = {name: "Look Front at"};
*/
        }

        if (controller.type === 'WDA') {
            if (Object.keys(items).length) {
                items["separator-refresh"] = { "type": "cm_separator" };
            }
            items[ORGActions.REFRESH_SCREEN] = {name: "Refresh Screen"};
        }

        return items;
    }

    _menuItemsForOutOfScreen() {
        return {
            [ORGActions.RESET_CAMERA_POSITION]: {name: "Reset Camera Position"},
            [ORGActions.RESET_DEVICE_POSITION]: {name: "Reset Device Position"},
            [ORGActions.SCREEN_CLOSEUP]: {name: "Device Screen Closeup"},
            [ORGActions.LOOK_AT_DEVICE]: {name: "Look At Device"}
        }
    }
}
/**
 * Created by jongabilondo on 13/02/2018.
 */

/***
 * Class to wrapp the functionality of the UITree context menu
 */
class ORGUITreeContextMenuManager {

    /**
     *
     * @param contextElement the element where the context menu shows up.
     */
    constructor(contextElement) {
        this._node = null; // the tree component node
        this._contextElement = contextElement;

        // Instantiate the context menu
        $.contextMenu({
            selector: this._contextElement,
            trigger: 'none',
            build: ($trigger, e) => {
                return {items: this._menuItemsForNode()}
            },
            callback: (key, options) => {
                this._processMenuSelection(key);
            }
        })
    }


    /**
     * Shows the context menu at the point of event.
     * @param event
     */
    onContextMenu(event, node) {
        if (!ORG.deviceController || ORG.deviceController.isConnected === false) {
            return;
        }
        this._node = node;
        $(this._contextElement).contextMenu({x:node.clientX, y:node.clientY});
    }

    /**
     * The user has selected a menu option. This function will respond to the selection.
     * @param menuOptionKey The string that represents the selected menu option.
     */
    _processMenuSelection(menuOptionKey) {

        switch (menuOptionKey) {
            case ORGActions.TAP:
            case ORGActions.LONG_PRESS:
            case ORGActions.SWIPE_LEFT:
            case ORGActions.SWIPE_RIGHT:
            case ORGActions.SWIPE_UP:
            case ORGActions.SWIPE_DOWN:
            {
                ORGActionsCenter.playGesture(menuOptionKey, this._getElementXPath(this._node));
            } break;
            case ORGActions.LOOK_AT : {
                alert('Not implemented.');
            } break;
            case ORGActions.LOOK_FRONT_AT: {
                alert('Not implemented.');
            } break;
            case ORGActions.SHOW_CLASS_HIERARCHY: {
                if (this._node && this._node.representedNode && (typeof this._node.representedNode.class !== undefined)) {
                    ORGActionsCenter.getElementClassHierarchy(this._node.representedNode.class);
                }
            } break;
        }
    }

    _menuItemsForNode() {
        let controller = ORG.deviceController;
        var items = {};

        if (controller.type === "WDA") {
            items[ORGActions.TAP] = {name: "Tap"};
            items[ORGActions.LONG_PRESS] = {name: "Long Press"};
            items[ORGActions.SWIPE] = {
                name: "Swipe",
                items: {
                    [ORGActions.SWIPE_LEFT]: {name: "Left"},
                    [ORGActions.SWIPE_RIGHT]: {name: "Right"},
                    [ORGActions.SWIPE_UP]: {name: "Up"},
                    [ORGActions.SWIPE_DOWN]: {name: "Down"},
                }
            }
        }

        if (controller.type === "ORG") {
            items[ORGActions.SHOW_CLASS_HIERARCHY] = {name: "Class Hierarchy"}
            items["separator-look"] = { "type": "cm_separator" };
            items[ORGActions.LOOK_AT] = {name: "Look at"}
            items[ORGActions.LOOK_FRONT_AT] = {name: "Look Front at"}
        }
        return items;
    }

    _getElementXPath(node) {
        if (!node) {
            return '//XCUIElementTypeApplication[1]'
        }
        let parent = ORG.UIJSONTreeManager.nodeParent(node)
        let idx = 0;
        if (parent) {
            for (let child of parent.nodes) {
                if (child.representedNode.type === node.representedNode.type) {
                    idx++;
                }
                if (child.nodeId === node.nodeId) {
                    break;
                }
            }
        } else {
            let nodes = ORG.UIJSONTreeManager.rootNodes()
            for (let treeNode of nodes) {
                if (treeNode.representedNode.type === node.representedNode.type) {
                    idx++;
                }
                if (treeNode.nodeId === node.nodeId) {
                    break;
                }
            }
        }
        return this._getElementXPath(parent) +  '/' + 'XCUIElementType' + node.representedNode.type + '[' + idx + ']'
    }
}
/**
 * Created by jongabilondo on 04/10/2016.
 */

/**
 * This was a tryout to display a google map in the floor of the 3D scene.
 * The combination of CSS3DRenderer with a WebGLRenderer is not fully integrated.
 * They both work separately, WebGLRenderer has to be marked as transparent to be able to see the CSS3DRenderer scene.
 * The original attempt was to set the map as a texture into the floor mesh, but it's not possible to get the map image from an 'offscreen' buffer.
 * A google map can't be displayed on a canvas in order to create a texture from it. Therefore the tryout here is to use the CSS3DRenderer which can
 * display a iframe, in which the map has been created.
 * There is a good thing about CSS3DRenderer and an iFrame, it's possible to create a google map in a 3D scene and even to control it, zoom, pan.
 * But it is not useful for Organismo. It needs a better integration into a WebGLRenderer renderer.
 * There is some interesting code in https://www.npmjs.com/package/iframe2image which it might create an image from an iframe (?). Could it generate an
 * image from the google map and use it as a texture into the WebGLRenderer ?.
 * @param floorMesh
 * @param rendererGL
 * @param camera
 * @param canvasDomElement
 * @constructor
 */
function ORGFloorMap(floorMesh, rendererGL, camera, canvasDomElement) {

    var _threeCamera = camera;
    var _cssScene = null;

    _cssScene = new THREE.Scene();

    // create the iframe to contain webpage
    var element	= document.createElement('iframe')
    element.src	= "simple-map.html";
    var elementWidth = 2000; // pixels
    var aspectRatio = 1.0;//planeHeight / planeWidth;
    var elementHeight = elementWidth * aspectRatio;
    element.style.width  = elementWidth + "px";
    element.style.height = elementHeight + "px";

    // create a CSS3DObject to display element
    var cssObject = new THREE.CSS3DObject( element );
    // synchronize cssObject position/rotation with planeMesh position/rotation
    cssObject.position.x = floorMesh.position.x;
    cssObject.position.y = floorMesh.position.y;
    cssObject.position.z = floorMesh.position.z;
    cssObject.rotation.x = -Math.PI / 2;
    cssObject.rotation.y = floorMesh.rotation.y;
    cssObject.rotation.z = floorMesh.rotation.z;
    // resize cssObject to same size as floorMesh
    cssObject.scale.x = 2;//= (1 + percentBorder) * (elementWidth / 2000);
    cssObject.scale.y = 2;//= (1 + percentBorder) * (elementWidth / 2000);
    _cssScene.add(cssObject);

    // create a renderer for CSS
    var rendererCSS	= new THREE.CSS3DRenderer();
    rendererCSS.setSize( rendererGL.getSize().width, rendererGL.getSize().height);
    rendererCSS.domElement.style.position = 'absolute';
    rendererCSS.domElement.style.top = 0;
    rendererCSS.domElement.style.margin = 0;
    rendererCSS.domElement.style.padding = 0;
    rendererCSS.domElement.style.zIndex = 0;

    canvasDomElement.appendChild(rendererCSS.domElement);
    rendererCSS.domElement.appendChild(rendererGL.domElement);
    //renderer.domElement.appendChild(rendererCSS.domElement);

    // when window resizes, also resize this renderer
    THREEx.WindowResize(rendererCSS, _threeCamera, canvasDomElement);

    //renderer.domElement.style.position = 'absolute';
    //renderer.domElement.style.top      = 0;
    // make sure original renderer appears on top of CSS renderer
    //renderer.domElement.style.zIndex   = 1;
    //rendererCSS.domElement.appendChild( renderer.domElement );

    this.render = function() {
        rendererCSS.render(_cssScene, _threeCamera);
    }

}

/**
 * Created by jongabilondo on 21/05/2017.
 */

/**
 * Base class for the Objects that are capable of generating location data. Like a Map.
 * It provides a Broadcasting capabilities to inform listeners of location updates.
 */
class ORGLocationProvider {

    constructor() {
        this._listeners = [];
    }

    addListener(delegate ) {
        this._listeners.push( delegate );
    }

    removeListeners(delegate ) {
        for (let i=0; i<this._listeners.length; i++) {
            if ( this._listeners[i] == delegate) {
                this._listeners.splice( i, 1);
                break;
            }
        }
    }

    removeListerners() {
        this._listeners = [];
    }

    _broadcastLocation(location, address, elevation) {
        for (let i=0; i<this._listeners.length; i++) {
            if (this._listeners[i].locationUpdate) {
                this._listeners[i].locationUpdate( location, address, elevation );
            }
        }
    }
}
/**
 * Created by jongabilondo on 10/12/2016.
 */


/**
 * Class to visualize and operate a Google Map.
 * It is a Location provider. Holds a list of location listeners that will get notified the location.
 */
class ORGMap extends ORGLocationProvider {

    constructor() {
        super();

        this._map = this._createMap(document.getElementById('map'), true);
        this._elevationService = new google.maps.ElevationService();
        this._geocoder = new google.maps.Geocoder();
        this._directionsService = new google.maps.DirectionsService();
        this._directionsDisplay = this._createDirectionsRenderer(this._map);
        this._directions = null;
        this._elevations = null;
        this._itineraryRunner = null;
        this._startLocationMarker = null;
        this._itineraryLocationMarker = null;
        this._startLocation = null;
        this._endLocation = null;

        this._initSearchBoxAutocomplete();
        this._initAutocompleteStartLocation();
        this._initAutocompleteEndLocation();

        // Load the Visualization API and the piechart package.
        //var _this = this;
        //google.load("visualization", "1.0", {packages: ["columnchart"], "callback" : function() {_this._googlePackagesLoaded}});

        this._chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    get isCreated() {
        return !!this._map;
    }

    get travelMode() {
        return ORG.UI.dropdownTravelMode.val();
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    run() {
        if (this._directions) {
            let itinerary = new ORGItinerary(this._directions.routes[0], this._elevations, this._startLocation, this._endLocation);
            this._itineraryRunner = new ORGItineraryRunner(itinerary);
            this._itineraryRunner.addListener(ORG.locationManager); // The locationManager will receive location updates
            this._itineraryRunner.start();
        }
    }

    pause() {
        if (this._itineraryRunner) {
            this._itineraryRunner.pause();
        }
    }

    resume() {
        if (this._itineraryRunner) {
            this._itineraryRunner.resume();
        }
    }

    stop() {
        if (this._itineraryRunner) {
            this._itineraryRunner.stop();
        }
    }

    updateItineraryLocation(lat, lng) {

        if (!this._itineraryLocationMarker) {
            this._itineraryLocationMarker = new google.maps.Marker({
                map: this._map,
                icon: "img/map_loc_20.png",
                anchorPoint: new google.maps.Point(10, 10)
            });
        }
        if (lat && lng) {
            const loc = new google.maps.LatLng(lat, lng);
            this._itineraryLocationMarker.setOptions({"position":loc, "anchorPoint":new google.maps.Point(10, 10)});
            this._map.setCenter(loc);
            //this._itineraryLocationMarker.setPosition(new google.maps.LatLng(lat, lng));

        } else {
            this._itineraryLocationMarker.setMap(null);
            this._itineraryLocationMarker = null;
        }
    }

    /**
     * Reset the itinerary. Remove the markers of start end points. Clean all structures and UI related to the itenerary.
     */
    resetItinerary() {
        if (this._startLocationMarker) {
            this._startLocationMarker.setMap(null);
            this._startLocationMarker = null;
        }

        this._directionsDisplay.setMap(null);
        this._directionsDisplay = null;
        this._directionsDisplay = this._createDirectionsRenderer(this._map);

        this._startLocation = null;
        this._endLocation = null;

        try {
            this._chart.clearChart(); // not working !
        } catch (e) {
            // TO DO, such a simple thing
        }

        ORG.dispatcher.dispatch({
            actionType: 'reset-itinerary'
        });
    }

    sendStartLocationToDevice() {
        if (this._startLocation) {
            this._broadcastLocation(this._startLocation, null, null);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Create a Google map on the given DOM element and set the curret location provided by the browser.
     * @param DOM element placeholder
     * @param onCurrentLocation
     * @returns {google.maps.Map}
     * @private
     */
    _createMap(onElement, onCurrentLocation) {
        const _this = this;
        let map = new google.maps.Map(onElement, {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13,
            mapTypeId: 'roadmap'
        })

        google.maps.event.addListenerOnce(map, /*'google-map-ready'*/'tilesloaded', () => {
            if (onCurrentLocation) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition( (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map.setCenter(pos);
                    }, () => {
                        _this._handleLocationError(true, null)
                    });
                } else {
                    _this._handleLocationError(false, null) // Browser doesn't support Geolocation
                }
            }
        })

        return map
    }

    _createDirectionsRenderer(map) {

        const _this = this;

        let directionsDisplay = new google.maps.DirectionsRenderer({
            'map': map,
            'preserveViewport': true,
            'draggable': true
        });

        google.maps.event.addListener(directionsDisplay, 'directions_changed',
            function () {

                // get new itinerary data
                _this._updateItineraryValues(directionsDisplay.getDirections());
                //const distance = _this._calculateDistance(directionsDisplay.getDirections());
                //const duration = _this._calculateDuration(directionsDisplay.getDirections());
                //
                //ORG.dispatcher.dispatch({
                //    actionType: 'itinerary-changed',
                //    distance: distance,
                //    duration: duration
                //});

                // get new elevations
                _this._elevationService.getElevationAlongPath({
                    path: directionsDisplay.getDirections().routes[0].overview_path,
                    samples: 256
                }, function (results) {
                    _this._plotElevation(results)
                });
            });
        return directionsDisplay;
    }


    _initSearchBoxAutocomplete() {
        // Create the search box and link it to the UI element.
        const input = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(input);
        this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        const _this = this;
        // Bias the SearchBox results towards current map's viewport.
        this._map.addListener('bounds_changed', function () {
            searchBox.setBounds(_this._map.getBounds());
        });

        this._map.addListener('rightclick', function (event) {
            _this._onRightClick(event, _this);
        });

        this._map.addListener('click', function (event) {
            _this._onClick(event);
        });


        //var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            //_this._removeMarker();

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                //const icon = {
                //    url: place.icon,
                //    size: new google.maps.Size(71, 71),
                //    origin: new google.maps.Point(0, 0),
                //    anchor: new google.maps.Point(17, 34),
                //    scaledSize: new google.maps.Size(25, 25)
                //};
                //
                //// Create a marker for each place.
                //markers.push(new google.maps.Marker({
                //    map: _this._map,
                //    icon: icon,
                //    title: place.name,
                //    position: place.geometry.location
                //}));
                //_this._createMarker(place.geometry.location);

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport); // Only geocodes have viewport.
                } else {
                    bounds.extend(place.geometry.location);
                }


            });
            _this._map.fitBounds(bounds);
        });
    }

    _initAutocompleteStartLocation() {
        const _this = this;
        const options = null;
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('start-point'), options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this._autompleteSelectedStartPoint(autocomplete, _this._map);
        });
    }

    _initAutocompleteEndLocation() {
        const _this = this;
        const options = null;
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('end-point'), options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this._autompleteSelectedEndPoint(autocomplete, _this._map);
        });

    }

    _autompleteSelectedStartPoint(autocomplete, map) {
        let place = autocomplete.getPlace();
        const location = place.geometry.location;
        map.panTo(location);
        this._setStartLocationWithAddress(location, place.formatted_address);
    }


    _autompleteSelectedEndPoint(autocomplete, map) {
        let place = autocomplete.getPlace();
        const location = place.geometry.location;
        this._setEndLocationWithAddress(location, place.formatted_address);
    }

    _onClick(event) {
        if (this._startLocation == null) {
            this._setStartLocation(event.latLng);
        } else {
            this._setEndLocation(event.latLng);
        }
    }

    _onRightClick(event, ORGMap) {

    }

    _setStartLocation(location) {
        const _this = this;
        this._getLocationAddress(location, function (address) {
            _this._setStartLocationWithAddress(location, address);
        });
    }

    _setStartLocationWithAddress(location, address) {
        this._startLocation = location;
        this._startLocationMarker = this._createMarker(location, "A");
        const _this = this;
        google.maps.event.addListener(this._startLocationMarker, 'dragend', function () {
            _this._startLocation = _this._startLocationMarker.getPosition();
            //_this._getLocationInfoAndBroadcast(_this._startLocation);

            _this._getLocationAddress( _this._startLocation, function(address) {
                _this._broadcastLocation(_this._startLocation, address, null);
                ORG.dispatcher.dispatch({
                    actionType: 'start-location-update',
                    lat: _this._startLocation.lat(),
                    lng: _this._startLocation.lng(),
                    elevation: null,
                    address: address
                });
            });
        });
        this._getLocationInfoAndBroadcast(location);


        if (this._endLocation) {
            this._removeMarker(); // Remove A, it's going to be created by the DirectionsRenderer
            this._calcRoute();
        }

        ORG.dispatcher.dispatch({
            actionType: 'start-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: null,
            address: address
        });
    }

    _setEndLocation(location) {
        const _this = this;
        this._getLocationAddress(location, function (address) {
            _this._setEndLocationWithAddress(location, address);
        });
    }

    _setEndLocationWithAddress(location, address) {
        this._endLocation = location;

        if (this._startLocation) {
            this._removeMarker(); // Remove A, it's going to be created by the DirectionsRenderer
            this._calcRoute();
        }

        ORG.dispatcher.dispatch({
            actionType: 'end-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: null,
            address: address
        });
    }

    _createMarker(location, label) {
        let marker = new google.maps.Marker({
            position: location,
            map: this._map,
            animation: google.maps.Animation.DROP,
            draggable: true,
            label: label
        });
        return marker;

    }

    _removeMarker() {
        if (this._startLocationMarker) {
            this._startLocationMarker.setMap(null);
            this._startLocationMarker = null;
        }
    }

    _getLocationAddress(location, completion) {
        const _this = this;
        this._geocodePosition(location, function (location, address, elevation) {
            if (completion) {
                completion(address);
            }
        });
    }

    _getLocationInfoAndBroadcast(location) {
        const _this = this;
        this._geocodePosition(location, function (location, address, elevation) {
            _this._broadcastLocation(location, address, elevation);
        });
    }

    _geocodePosition(location, onCompletion) {
        const _this = this;

        this._geocoder.geocode({
            latLng: location
        }, function (responses) {
            if (responses && responses.length > 0) {
                _this._elevationPosition(location, responses[0].formatted_address, onCompletion);
            } else {
                _this._elevationPosition(location, null, onCompletion);
            }
        });
    }

    _elevationPosition(location, address, onCompletion) {
        const _this = this;

        this._elevationService.getElevationForLocations({
            'locations': [location]
        }, function (results, status) {

            if (status === 'OK') {
                if (results[0] && onCompletion) {
                    onCompletion(location, address, results[0].elevation);
                }
            }
        });
    }

    _calcRoute() {
        const request = {
            origin: this._startLocation,
            destination: this._endLocation,
            travelMode: this.travelMode//google.maps.DirectionsTravelMode.DRIVING
        };

        let _this = this;
        this._directionsService.route(request, function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                const SAMPLES = 256;
                _this._directions = response;
                _this._directionsDisplay.setDirections(response);
                _this._elevationService.getElevationAlongPath({
                        path: response.routes[0].overview_path,
                        samples: SAMPLES
                    }, function (results) {
                        _this._elevations = results;
                        _this._plotElevation(results)
                    }
                );
            }
        });
    }

    // Takes an array of ElevationResult objects, draws the path on the map
    // and plots the elevation profile on a GViz ColumnChart
    _plotElevation(results) {
        const elevations = results;

        let path = [];
        for (let i = 0; i < results.length; i++) {
            path.push(elevations[i].location);
            //console.log("elevation:",i,"value:",elevations[i]);
            //console.log(elevations[i].location);
        }

        //if (this._polyline) {
        //    this._polyline.setMap(null);
        //}
        //
        //this._polyline = new google.maps.Polyline({
        //    path: path,
        //    strokeColor: "#000000",
        //    map: this.map});

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (let i = 0; i < results.length; i++) {
            data.addRow(['', elevations[i].elevation]);
        }

        document.getElementById('chart_div').style.display = 'block';
        this._chart.draw(data, {
            //width: 200,
            height: 160,
            legend: 'none',
            titleY: 'Elevation (m)',
            focusBorderColor: '#00ff00'
        });
    }

    _removeElevationChart() {
        document.getElementById('chart_div').style.display = 'none';
    }


    _handleLocationError(browserHasGeolocation, pos) {
        bootbox.alert({ closeButton: false, message: browserHasGeolocation ? 'The Geolocation service failed to provide the current location.' :'The browser doesn\'t support Geolocation.' })
        /*let infoWindow = new google.maps.InfoWindow;
        if (pos) {
            infoWindow.setPosition(pos);
        }
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);*/
    }

    _calculateDistance(directions) {
        let distance = 0;
        const nlegs = directions.routes[0].legs.length;
        for (let i = 0; i < nlegs; i++) {
            distance += directions.routes[0].legs[i].distance.value;
        }
        return distance;
    }

    _calculateDuration(directions) {
        let duration = 0;
        const nlegs = directions.routes[0].legs.length;
        for (let i = 0; i < nlegs; i++) {
            duration += directions.routes[0].legs[i].duration.value;
        }
        return duration;
    }

    _updateItineraryValues(directions) {
        const nlegs = directions.routes[0].legs.length;

        this._startLocation = directions.routes[0].legs[0].start_location;
        this._endLocation = directions.routes[0].legs[nlegs-1].end_location;
        const startAddress = directions.routes[0].legs[0].start_address;
        const endAddress = directions.routes[0].legs[nlegs-1].end_address;

        const distance = this._calculateDistance(directions);
        const duration = this._calculateDuration(directions);

        ORG.dispatcher.dispatch({
            actionType: 'itinerary-changed',
            distance: distance,
            duration: duration,
            start_address: startAddress,
            end_address: endAddress,
            start_location: this._startLocation,
            end_location: this._endLocation,
        });
    }
}
/**
 * Created by jongabilondo on 11/12/2016.
 */


/**
 * Class that represents a connected device. Holds device's basic information.
 */
class ORGDevice {

    constructor( deviceInfo ) {
        this.name = deviceInfo.name;
        this.model = deviceInfo.model;
        this.systemVersion = deviceInfo.systemVersion;
        this.productName = deviceInfo.productName;
        this.screenSize = deviceInfo.screenSize;
        this._orientation = deviceInfo.orientation;
        this._bodySize = this._bodySizeOfModel();
        this._displaySize = this._displaySizeOfModel();
    }

    static screenSizeInPortrait(size) {
        if (size.width > size.height) {
            return {width: size.height, height: size.width};
        } else {
            return size;
        }
    }

    set orientation(orientation) {
        this._orientation = orientation;
    }
    get orientation() {
        return this._orientation;
    }
    get isLikeiPhone5() {
        return this.productName.startsWith('iPhone 5');
    }
    get isLikeiPhone6() {
        return this.productName == 'iPhone 6' || this.productName == 'iPhone 7' || this.productName == 'iPhone 8';
    }
    get isLikeiPhone6Plus() {
        return this.productName == 'iPhone 6+' || this.productName == 'iPhone 7+' || this.productName == 'iPhone 8+';
    }
    get isLikeiPhoneX() {
        return this.productName == 'iPhone X';
    }

    /**
     * Get device physical size. Gets the values from ORG.DeviceMetrics global.
     * @returns {{width: *, height: *}} in meters.
     */
    get bodySize() {
        return Object.assign({}, this._bodySize);
    }

    /***
     * Returns the size considering the orientation. If landascape, it will swap the portrait mode width and height.
     * @returns {size}
     */
    get screenSizeWithOrientation() {
        var screenSize = Object.assign({}, this.screenSize);
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                screenSize = { width: screenSize.height, height: screenSize.width};
            } break;
        }
        return screenSize;
    }

    /***
     * Return the rotation in Z axis for the current orientation.
     * @returns {number}
     */
    get orientationRotation() {
        var rotation = 0;
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT: {
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                rotation = THREE.Math.degToRad(180);
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                rotation = THREE.Math.degToRad(-90);
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
                rotation = THREE.Math.degToRad(90);
            break;
        }
        return rotation;
    }


    /**
     * Get displays' physical size. Gets the values from ORG.DeviceMetrics global.
     * @returns {{width, height}|*} in meters.
     */
    get displaySize() {
        return Object.assign({}, this._displaySize);
    }

    /***
     * Returns the size considering the orientation. If landascape, it will swap the portrait mode width and height.
     * @returns {size}
     */
    get displaySizeWithOrientation() {
        var displaySize = Object.assign({}, this._displaySize);
        switch (this._orientation) {
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                displaySize = { width: displaySize.height, height: displaySize.width};
            } break;
        }
        return displaySize;
    }

    /**
     * Scale from screen points to real device units. Considers orientation.
     * @returns {{x: number, y: number}}
     */
    get displayScale() {
        const displaySize = this.displaySizeWithOrientation;
        const screenSize = this.screenSizeWithOrientation;
        return {x:displaySize.width/screenSize.width, y:displaySize.height/screenSize.height};
    }

    // PRIVATE

    _bodySizeOfModel() {
        var body = null;
        if (this.isLikeiPhone5) {
            body = ORG.DeviceMetrics.iPhone5.Body;
        } else if (this.isLikeiPhone6) {
            body = ORG.DeviceMetrics.iPhone6.Body;
        } else if (this.isLikeiPhone6Plus) {
            body = ORG.DeviceMetrics.iPhone6Plus.Body;
        } else if (this.isLikeiPhoneX) {
            body = ORG.DeviceMetrics.iPhoneX.Body;
        } else {
            body = ORG.DeviceMetrics.iPhone6.Body;
        }
        return {"width": math.unit( body.W ).toNumber('m'), "height": math.unit( body.H ).toNumber('m')};
    }

    _displaySizeOfModel() {
        var display = null;
        if (this.isLikeiPhone5) {
            display = ORG.DeviceMetrics.iPhone5.Display;
        } else if (this.isLikeiPhone6) {
            display = ORG.DeviceMetrics.iPhone6.Display;
        } else if (this.isLikeiPhone6Plus) {
            display = ORG.DeviceMetrics.iPhone6Plus.Display;
        } else if (this.isLikeiPhoneX) {
            display = ORG.DeviceMetrics.iPhoneX.Display;
        } else {
            display = ORG.DeviceMetrics.iPhone6.Display;
        }
        return this._calculateDisplaySize( math.unit( display.Diagonal).toNumber('m'), display.Ratio );
    }

    _calculateDisplaySize( diagonal, ratio ) {
        const w = Math.sqrt( Math.pow( diagonal, 2) / (1.0 +  Math.pow( ratio, 2)));
        const h = w * ratio;
        return { width:w, height:h };
    }
}

ORGDevice.ORIENTATION_PORTRAIT = "portrait";
ORGDevice.ORIENTATION_LANDSCAPE_LEFT = "landscape-left";
ORGDevice.ORIENTATION_LANDSCAPE_RIGHT = "landscape-right";
ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN = "upside-down";
ORGDevice.ORIENTATION_FACE_UP = "face-up";
ORGDevice.ORIENTATION_FACE_DOWN = "face-down";

/**
 * Created by jongabilondo on 19/03/2018.
 */


/***
 * Handles the 3D representation and manipulation of the device in the 3D Scene.
 * The device is composed of a 3D body model and the screen plane.
 * This class handles the 3D translate/rotate transform control as well.
 */
class ORG3DDevice {

    constructor() {
        this._deviceScreen = null; // a ORG3DDeviceScreen
        this._deviceBody = null; // a ORG3DDeviceModel
        this._bodyAndScreenGroup = null; // a THREE.Group to hold the screen and the device model
        this._transformControl = null; // a RG3DDeviceTransformControl
    }

    get deviceScreen() {
        return this._deviceScreen
    }

    get deviceBody() {
        return this._deviceBody
    }

    get bodyAndScreenGroup() {
        if (!this._bodyAndScreenGroup) {
            this._bodyAndScreenGroup = new THREE.Group();
        }
        return this._bodyAndScreenGroup;
    }

    get deviceBoundingBox() {
        let bBox = null;
        if (this._deviceBody) {
            bBox = this._deviceBody.boundingBox;
        }
        if (!bBox && this._deviceScreen) {
            bBox = this._deviceScreen.boundingBox;
        }
        return bBox;
    }

    addToScene(scene) {
        if (scene) {
            scene.add(this.bodyAndScreenGroup);
        }
    }

    removeFromScene(scene) {
        this.removeDeviceBody();
        this.removeDeviceScreen();
        scene.remove(this._bodyAndScreenGroup);
        this._bodyAndScreenGroup = null;
    }

    addDeviceBody(device3DModel) {
        if (device3DModel) {
            this._deviceBody = device3DModel;
            this.bodyAndScreenGroup.add(this._deviceBody.THREEObject);
        }
    }

    removeDeviceBody() {
        if (this._deviceBody) {
            this.bodyAndScreenGroup.remove(this._deviceBody.THREEObject);
            this._deviceBody.destroy();
            this._deviceBody = null;
        }
     }

    hideDeviceBody() {
        if (this._deviceBody) {
            this._deviceBody.hide();
        }
    }

    showDeviceBody() {
        if (this._deviceBody) {
            this._deviceBody.show();
        }
    }

    createDeviceScreen(size, position, scene) {
        this._deviceScreen = new ORG3DDeviceScreen(size, position, scene);
        this.bodyAndScreenGroup.add(this._deviceScreen.screenPlane);
    }

    removeDeviceScreen() {
        if (this._deviceScreen) {
            this.bodyAndScreenGroup.remove(this._deviceScreen.screenPlane);
            this._deviceScreen.destroy();
            this._deviceScreen = null;
        }
    }

    hideDeviceScreen() {
        if (this._deviceScreen) {
            this._deviceScreen.hide();
        }
    }

    showDeviceScreen() {
        if (this._deviceScreen) {
            this._deviceScreen.show();
        }
    }

    setDeviceOrientation(orientation) {
        if (!this._bodyAndScreenGroup) {
            return;
        }

        if (this._deviceScreen) {
            this._deviceScreen.setOrientation(orientation);
        }

        if (this._deviceBody) {
            this._deviceBody.setOrientation(orientation);
        }

        // It would be nicer to just rotate the device group object but we have a problem with the screen plane and the bitmap, but we have to recreate plane again.
        //const position = this.bodyAndScreenGroup.position.clone();
        //
        //// reset position
        //this.bodyAndScreenGroup.rotation.set(0, 0, 0);
        //this.bodyAndScreenGroup.position.set(0, 0, 0);
        //
        //switch (orientation) {
        //    case ORGDevice.ORIENTATION_PORTRAIT: {
        //    } break;
        //    case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
        //    } break;
        //    case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
        //    } break;
        //    case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
        //        this._bodyAndScreenGroup.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
        //        break;
        //}
        //
        //this.bodyAndScreenGroup.position.copy(position);
    }

    showHideDeviceTransformControls(scene, mode) {
        if (this._transformControl) {
            this._transformControl.destroy();
            this._transformControl = null;
        } else {
            this._transformControl = new ORG3DDeviceTransformControl(scene, mode);
        }
    }

    resetDevicePosition(position) {
        this.bodyAndScreenGroup.rotation.set(0, 0, 0);
        this.bodyAndScreenGroup.position.copy(position);

/*
        This is not helping to solve the problem of relocating location after this operation, the bbox of the body is not updated yet
        if (this._deviceScreen) {
            this._deviceScreen.screenPlane.updateMatrix();
            this._deviceScreen.screenPlane.computeBoundingBox();
        }
        if (this._deviceBody) {
            this._deviceBody.THREEObject.updateMatrix();
            this._deviceBody.THREEObject.computeBoundingBox();
        }
        this.bodyAndScreenGroup.updateMatrix();
*/
    }

    renderUpdate() {
        if (this._deviceScreen) {
            this._deviceScreen.renderUpdate();
        }
        if (this._transformControl) {
            this._transformControl.update(); // important to update the controls size while changing POV
        }
    }
}
/**
 * Created by jongabilondo on 22/09/2017.
 */

/**
 * Represents a beacon.
 */
class ORGBeacon {

    /**
     * Constructor
     * @param name - Name for the beacon
     * @param range - Range in meters
     * @param location - X,Y,Z in meters.
     */
    constructor(name, range, location) {
        this._name = name;
        this._range = range;
        this._minor = 0;
        this._major = 0;
        this._location = location;
        this._geoLocation = null;
    }

    get name() { return this._name;};
    get range() { return this._range;};
    get location() { return this._location;};
    get minor() { return this._minor;};
    get major() { return this._major;};

    set location(loc) { this._location = loc;};

    intersectsPoint(point) {
        const dist = this._dist(point.x, point.y, point.z, this._location.x, this._location.y, this._location.z);
        return (dist < this._range);
    }

    // PRIVATE

    _dist(x0,y0,z0,x1,y1,z1){
        const deltaX = x1 - x0;
        const deltaY = y1 - y0;
        const deltaZ = z1 - z0;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    }

}
/**
 * Created by jongabilondo on 24/09/2017.
 */


/**
 * Class to wrap the functionality of THREE.TransformControls on a beacon.
 */
class ORG3DBeaconTransformControl {

    /**
     * Constructor
     * @param scene - the ORG3DScene
     * @param mode - should be "translate"
     * @param THREEBeacon - the THREE obj that represents the beacon to enable THREE.TransformControls onto.
     */
    constructor(scene, mode, THREEBeacon) {
        const _this = this;
        this._scene = scene;
        this._THREEScene = scene.THREEScene;

        this._THREETransformControl = new THREE.TransformControls( scene.THREECamera, scene.rendererDOMElement);
        this._THREETransformControl.setMode( mode );
        this._THREETransformControl.addEventListener( 'change', function() {
            _this._transformControlChanged();
        } );

        // add it all to the scene
        this._THREETransformControl.attach( THREEBeacon );
        this._THREEScene.add( this._THREETransformControl );
    }

    /**
     * Call this method to destroy the transform control.
     */
    destroy() {
        if (this._THREETransformControl) {
            this._THREETransformControl.detach();
            this._THREETransformControl = null;
            this._THREEScene.remove( this._THREETransformControl );
        }
    }

    /**
     * Updates the proportions of the transform control according to camera position.
     * To be called from render loop.
     */
    update() {
        this._THREETransformControl.update();
    }

    // PRIVATE

    /**
     * When the transformation control has changed we get a call here.
     * Beacons can only be translated.
     * @private
     */
    _transformControlChanged() {
        if (this._THREETransformControl) {
            const THREETransformedObject = this._THREETransformControl.object;
            if (THREETransformedObject) {
                if (this._THREETransformControl.getMode() == "translate") {
                    // handle beacons intersection
                    //ORG.scenario.devicePointUpdate(THREETransformedObject.position);
                }
            }
        }
    }
}
/**
 * Created by jongabilondo on 24/09/2017.
 */


/**
 * Class to wrap the functionality of THREE.TransformControls on the 3D device.
 */
class ORG3DDeviceTransformControl {

    /**
     * Constructor
     * @param scene - The ORG3DScene
     * @param mode - "translate" | "rotate"
     */
    constructor(scene, mode) {
        this._scene = scene;
        this._THREEScene = scene.THREEScene;
        this._sprite = null;
        this._controlMoving = false;

        this._THREETransformControl = this._createTransformControl(scene, mode);
        this._THREETransformControl.attach(this._scene.THREEDeviceAndScreenGroup);
        this._THREEScene.add(this._THREETransformControl);
    }

    /**
     * Call this method to destroy the transform control.
     */
    destroy() {
        this._removeTextSprite();
        if (this._THREETransformControl) {
            this._THREETransformControl.detach();
            this._THREETransformControl = null;
            this._THREEScene.remove(this._THREETransformControl);
        }
    }

    /**
     * Updates the proportions of the transform control according to camera position.
     * To be called from render loop.
     */
    update() {
        this._THREETransformControl.update();
    }

    // PRIVATE

    _createTransformControl(scene, mode) {
        let transformControl = new THREE.TransformControls( scene.THREECamera, scene.rendererDOMElement);
        transformControl.setMode( mode );
        transformControl.setSpace('local');
        transformControl.addEventListener('change', () => {
            this._transformControlChange();
        });
        transformControl.addEventListener('mouseUp', () => {
            this._transformControlEnd();
        });
        transformControl.addEventListener('mouseDown', () => {
            this._transformControlBegin();
        });
        return transformControl;
    }

    _transformControlBegin() {
        this._controlMoving = true;
    }

    _transformControlEnd() {
        this._removeTextSprite();
        this._controlMoving = false;
    }

    /**
     * When the transformation control has changed we get a call here.
     * In case of rotation this function will broadcast the new device attitude to the connected device.
     * @private
     */
    _transformControlChange() {
        if (!this._controlMoving) {
            return;
        }
        if (!this._THREETransformControl) {
            return;
        }
        const THREETransformedObject = this._THREETransformControl.object;
        if (THREETransformedObject) {
            if (this._THREETransformControl.getMode() === "rotate") {
                if (ORG.deviceController) {
                    ORG.deviceController.sendDeviceAttitudeUpdate(ORGMessageBuilder.attitudeUpdate(THREETransformedObject.quaternion)); // Broadcast Attitude
                }
            } else if (this._THREETransformControl.getMode() === "translate") {
                ORG.scenario.devicePointUpdate(THREETransformedObject.position);
                ORG.scene.devicePositionHasChanged();
                this._showPositionSprite(THREETransformedObject.position);
            }
        }
    }

    _showPositionSprite(position) {
        this._removeTextSprite();
        this._sprite = this._createTextSprite("X: " + position.x.toFixed(2) + "m\nY: " + position.y.toFixed(2) + "m\nZ: " + position.z.toFixed(2) + "m", position);
        this._THREEScene.add(this._sprite);
    }

    _createTextSprite(text, position) {
        let texture = new THREE.TextTexture({
            text: text,
            fontStyle: 'italic',
            textAlign: 'left',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
        let sprite = new THREE.Sprite(material);
        sprite.position.set(position.x + 0.06, position.y + 0.07, position.z);
        sprite.scale.setX(texture.aspect).multiplyScalar(0.05);
        return sprite;
    }

    _removeTextSprite() {
        if (this._sprite && this._THREEScene) {
            this._THREEScene.remove(this._sprite);
            this._sprite = null;
        }
    }
}
/**
 * Created by jongabilondo on 13/12/2016.
 */


function ORGTestApp( appInfo ) {

    this.version = null;
    this.bundleIdentifier = null;
    this.name = null;

    if ( appInfo ) {
        this.name = appInfo.name;
        this.version = appInfo.version;
        this.bundleIdentifier = appInfo.bundleIdentifier;
    }
}

ORG.testApp = null;

/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Base class to communicate with mobile devices via web sockets/REST.
 * Provides the base virtual functions for subclasses to implement.
 * It's not a class to be used directly, but to inherit from it.
 */
class ORGDeviceBaseController {

    constructor(ip, port) {
        this._ip = ip;
        this._port = port;
    }
    get type() {
        _throwError();
    }
    get isConnected() {
        _throwError();
    }
    get IPandPort() {
        return this._ip + ":" + this._port;
    }
    get hasContinuousUpdate() {
        return false;
    }
    get hasOrientationUpdate() {
        return false;
    }
    get hasLocationUpdate() {
        return false;
    }
    get hasSystemInfo() {
        return false;
    }

    requestSystemInfo() {
        this._throwError();
    }

    openSession() {
        this._throwError();
    }
    closeSession() {
        this._throwError();
    }
    screenshot() {
        this._throwError();
    }
    elementTree() {
        this._throwError();
    }
    refreshUITree() {
        this._throwError();
    }
    _throwError() {
        throw new Error("Executing base class method. Subclass must implement this method.");
    }
}
/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Base class to communicate with mobile devices via web sockets.
 */
class ORGWebSocketDeviceController extends ORGDeviceBaseController {

    /**
     * Constructor
     * @param ip
     * @param port
     * @param webSocket delegate
     */
    constructor(ip, port, delegate) {
        super(ip,port);
        this._webSocketDelegate = delegate;
    }

    get webSocketDelegate() {
        return this._webSocketDelegate;
    }

}
/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Class to perform the communication with an external device using the Organismo protocol.
 * It performs the Organismo commands on a mobile device.
 * It uses websockets (ORGWebSocket).
 */
class ORGDeviceController extends ORGWebSocketDeviceController {

    constructor(ip, port, delegate) {
        super(ip, port, delegate);
        this._webSocket = null; // For async await calls
        this._secondWebSocket = null; // For async non await calls. Delegate processes responses.
    }

    get type() {
        return "ORG";
    }

    get hasContinuousUpdate() {
        return true;
    }

    get hasOrientationUpdate() {
        return true;
    }

    get hasLocationUpdate() {
        return true;
    }

    get hasSystemInfo() {
        return true;
    }

    get isConnected() {
        if (!this._webSocket || !this._webSocket.isConnected) {
            return false
        }
        if (!this._secondWebSocket || !this._secondWebSocket.isConnected) {
            return false
        }
        return true
    }

    openSession() {
        return new Promise( async (resolve, reject) => {
            try {
                this._webSocket = await this._openMainSocket()
                this._secondWebSocket = await this._openSecondSocket()
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    closeSession() {
        if (this._webSocket) {
            this._webSocket.close()
        }
        if (this._secondWebSocket) {
            this._secondWebSocket.close()
        }
    }

    // SECOND SOCKET MESSAGES
    requestScreenshot() {
        this._secondWebSocket.send(ORGMessageBuilder.takeScreenshot())
    }

    requestOrientationUpdates(enable) {
        this._secondWebSocket.send(ORGMessageBuilder.requestOrientationUpdates(enable))
    }

    requestLocationUpdates(enable) {
        this._secondWebSocket.send(ORGMessageBuilder.requestLocationUpdates(enable))
    }

    requestSystemInfo() {
        this._secondWebSocket.send(ORGMessageBuilder.systemInfo( ))
    }

    sendLocationUpdate(lat, lng) {
        this._secondWebSocket.send(ORGMessageBuilder.locationUpdate( new google.maps.LatLng(lat, lng), null))
    }

    sendDeviceAttitudeUpdate(msg) {
        this._secondWebSocket.send(msg)
    }

    // ASYNC MAIN SOCKET CALLS
    getDeviceOrientation() {
        return new Promise(async (resolve, reject) => {
            resolve(ORG.device.orientation)
        })
    }

    getDeviceInformation() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.deviceInfo());
                const device = new ORGDevice(this._convertDeviceInfo(response.data));
                resolve(device);
            } catch (err) {
                reject(err)
            }
        })
    }

    getAppInformation() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.appInfo());
                const appInfo = new ORGTestApp(response.data);
                resolve(appInfo);
            } catch (err) {
                reject(err)
            }
        })
    }

    getScreenshot() {
        return new Promise( async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.takeScreenshot());
                let base64Img = response.data.screenshot;
                if (base64Img) {
                    let img = new Image();
                    img.src = "data:image/jpg;base64," + base64Img;
                    img.onload = () => {
                        resolve(img);
                    }
                } else {
                    reject("Missing image in screenshot.");
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    getElementTree(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.elementTree(parameters))
                resolve(response.data)
            } catch (err) {
                reject(err)
            }
        })
    }

    getClassHierarchy(className) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await this._webSocket.sendAsync(ORGMessageBuilder.classHierarchy(className))
                resolve(response)
            } catch (err) {
                reject(err)
            }
        })
    }

    send(message) {
        this._webSocket.send(message);
    }

    convertInterfaceOrientation(iOSOrientation) {
        let orientation
        switch(iOSOrientation) {
            case "UIInterfaceOrientationPortrait": orientation = ORGDevice.ORIENTATION_PORTRAIT; break;
            case "UIInterfaceOrientationPortraitUpsideDown": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
            case "UIInterfaceOrientationLandscapeRight": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
            case "UIInterfaceOrientationLandscapeLeft": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
            case "UIInterfaceOrientationFaceUp": orientation = ORGDevice.ORIENTATION_FACE_UP; break;
            case "UIInterfaceOrientationFaceDown": orientation = ORGDevice.ORIENTATION_FACE_DOWN; break;
        }
        return orientation;
    }

    _openMainSocket() {
        return new Promise( async (resolve, reject) => {
            try {
                this._webSocket = new ORGWebSocket();
                const url = "ws://" + this.IPandPort + "/main";
                let openResult = await this._webSocket.open(url);
                if (!!openResult) {
                    resolve(this._webSocket)
                } else {
                    reject()
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    _openSecondSocket() {
        return new Promise( async (resolve, reject) => {
            try {
                this._secondWebSocket = new ORGWebSocket();
                const url = "ws://" + this.IPandPort + "/second";
                let openResult = await this._secondWebSocket.open(url, this.webSocketDelegate); // Process messages in delegate. Do not use async calls with "await". Not used in a REST async style.
                if (!!openResult) {
                    resolve(this._secondWebSocket)
                } else {
                    reject()
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    _convertDeviceInfo(data) {
        let deviceInfo = {}
        deviceInfo.name = data.name;
        deviceInfo.model = data.model;
        deviceInfo.systemVersion = data.systemVersion;
        deviceInfo.productName = data.productName;
        deviceInfo.screenSize = data.screenSize;
        deviceInfo.orientation = this._convertOrientation(data.orientation);
        return deviceInfo;
    }

    _convertOrientation(iOSOrientation) {
        let orientation
        switch(iOSOrientation) {
            case "UIDeviceOrientationPortrait": orientation = ORGDevice.ORIENTATION_PORTRAIT; break;
            case "UIDeviceOrientationPortraitUpsideDown": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
            case "UIDeviceOrientationLandscapeRight": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
            case "UIDeviceOrientationLandscapeLeft": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
            case "UIDeviceOrientationFaceUp": orientation = ORGDevice.ORIENTATION_FACE_UP; break;
            case "UIDeviceOrientationFaceDown": orientation = ORGDevice.ORIENTATION_FACE_DOWN; break;
        }
        return orientation;
    }
}
/**
 * Created by jongabilondo on 26/02/2017.
 */

/***
 * Class to communicate with the WebDriverAgent running on the device.
 */
class ORGDeviceWDAController extends ORGDeviceBaseController {

    constructor(ip, port) {
        super(ip,port);
        this.xhr = new XMLHttpRequest();
        this._sessionInfo = null;
    }

    get type() {
        return "WDA";
    }

    get isConnected() {
        return (this._sessionInfo !== null);
    }

    get RESTPrefix() {
        return "http://" + this.IPandPort + "/";
    }

    get RESTPrefixWithSession() {
        return this.RESTPrefix + "session/" + this._sessionInfo.sessionId + "/";
    }

    openSession() {
        return new Promise((resolve, reject) => {
            var endpointURL = this.RESTPrefix + "session";
            this.xhr.open("POST", endpointURL, true);
            this.xhr.onload = () => {
                switch (this.xhr.status) {
                    case 200: {
                        const response = JSON.parse(this.xhr.responseText);
                        if (response.status === 0) {
                            this._sessionInfo = JSON.parse(this.xhr.responseText);
                            resolve(this._sessionInfo);
                        } else {
                            reject(this.xhr.responseText);
                        }
                    } break;
                    case 404: {
                        reject(new ORGError(ORGERR.ERR_CONNECTION_NOT_FOUND, "No connection found at given IP & PORT."));
                    } break;
                    default: {
                        reject(this.xhr.statusText);
                    }
                }
                if (this.xhr.status === 200) {

                } else {
                    reject(this.xhr.statusText);
                }
            }
            this.xhr.onerror = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onreadystatechange = () => {
                // Solution to get connection errors. Pitty there is no proper way to something so basic.
                if (this.xhr.readyState === 4 && this.xhr.status === 0) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_REFUSED, "Error opening session."));
                } else if (this.xhr.readyState === 2 && this.xhr.status === 404) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_NOT_FOUND, "No connection found at given IP & PORT."));
                }
            }
            this.xhr.send(JSON.stringify({desiredCapabilities:{bundleId:'com.apple.mobilephone'}}));
        })
    }

    closeSession() {
        ORG.dispatcher.dispatch({
            actionType: 'wda-session-closed'
        });

        /* DOESNT WORK !
         const endpointURL = this.RESTPrefix + "";
         this.xhr.open("DELETE", endpointURL, true);
         this.xhr.onreadystatechange = () => {
         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
         this._sessionInfo = null;
         }
         }
         this.xhr.send();*/
    }

    getDeviceInformation() {
        return new Promise((resolve, reject) => {

            // Get orientation
            this.getDeviceOrientation().then(
                (result) => {
                    const orientaton = result;

                    // Get device screen size.
                    this.getWindowSize().then(
                        (result) => {
                            const screenSizePortrait = ORGDevice.screenSizeInPortrait(result);
                            let device = this._deviceInfoFromWindowSize(screenSizePortrait);
                            device.orientation = orientaton;
                            resolve(device);
                        },
                        (err) => {
                            reject(err);
                        }
                    ). catch(
                        (err) => {
                            reject(err);
                        }
                    )
                },
                (err) => {
                    reject(err);
                }
            ).catch(
                (err) => {
                    reject(err);
                }
            )
        })
    }

    getAppInformation() {
        return new Promise((resolve, reject) => {
            resolve(new ORGTestApp( {name: "", version: "", bundleIdentifier: ""} ));
        });
    }

    getDeviceOrientation() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "orientation", "GET");
                let orientation = ORGDevice.ORIENTATION_PORTRAIT;
                switch (result) {
                    case "PORTRAIT": break;
                    case "LANDSCAPE": orientation = ORGDevice.ORIENTATION_LANDSCAPE_LEFT; break;
                    case "UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT": orientation = ORGDevice.ORIENTATION_LANDSCAPE_RIGHT; break;
                    case "UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN": orientation = ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN; break;
                }
                resolve(orientation);
            } catch (err) {
                reject(err);
            }
        })
    }

    getScreenshot() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "screenshot", "GET");
                const base64Img = result;
                if (base64Img && Object.keys(base64Img).length) {
                    let img = new Image();
                    img.src = "data:image/jpg;base64," + base64Img;
                    img.onload = () => {
                        resolve(img);
                    }
                } else {
                    reject(new ORGError(ORGERR.ERR_GENERAL, "Could not get screenshot."));
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    getElementTree() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "source?format=json", "GET");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    getWindowSize() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "window/size", "GET");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendPressHome() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/homescreen", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendLock() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/lock", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    sendUnlock() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefix + "wda/unlock", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    elementUsing(using, value) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "element", "POST", JSON.stringify({using: using, value: value}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    tapElementWithId(elementId) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "element/" + elementId + "/click", "POST");
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    longPressElementWithId(elementId) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "wda/element/" + elementId + "/touchAndHold", "POST", JSON.stringify({duration: 1.0}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    swipeElementWithId(elementId, direction) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this._sendCommand(this.RESTPrefixWithSession + "wda/element/" + elementId + "/swipe", "POST", JSON.stringify({direction: direction}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    setOrientation(orientation) {
        return new Promise(async (resolve, reject) => {
            try {
                let wdaOrientation = "PORTRAIT";
                switch (orientation) {
                    case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {wdaOrientation = "UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN"} break;
                    case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {wdaOrientation = "LANDSCAPE"} break;
                    case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {wdaOrientation = "UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT"} break;
                }
                let result = await this._sendCommand(this.RESTPrefixWithSession + "orientation" , "POST", JSON.stringify({orientation: wdaOrientation}));
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    getSystemInfo() {
        // not implemented
    }

    sendLocationUpdate(lat, lng) {
        // not implemented
    }
    _sendCommand(command, method, parameters) {
        return new Promise((resolve, reject) => {
            this.xhr.open(method, command, true);
            this.xhr.onload = () => {
                let response = JSON.parse(this.xhr.responseText);
                if (response.status === 0) {
                    resolve(response.value);
                } else {
                    reject(response.value);
                }
            }
            this.xhr.onerror = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onabort = () => {
                reject(this.xhr.statusText);
            }
            this.xhr.onreadystatechange = () => {
                // Solution to get connection errors. Pitty there is no proper way to something so important.
                if (this.xhr.readyState === 4 && this.xhr.status === 0) {
                    reject(new ORGError(ORGERR.ERR_CONNECTION_REFUSED, "Error requesting orientation."));
                }
            }
            this.xhr.send(!!parameters ?parameters :null);
        })
    }

    _deviceInfoFromTree(tree) {
        // Root of tree contains Application info (very poor info)
        const screenPoints = {width: tree.rect.width, height: tree.rect.height};
        const deviceProductName = ORGDeviceMetrics.deviceWithScreenPoints(screenPoints);
        return new ORGDevice( {name:'', systemVersion: "", productName: deviceProductName, screenSize: screenPoints} );
    }

    _deviceInfoFromWindowSize(size) {
        const screenPoints = size;
        const deviceProductName = ORGDeviceMetrics.deviceWithScreenPoints(screenPoints);
        return new ORGDevice( {name:'', systemVersion: "", productName: deviceProductName, screenSize: screenPoints} );
    }
}
/**
 * Created by jongabilondo on 26/02/2017.
 */

/**
 * Class to communicate with mobile devices using idevicecontrolproxy server.
 */
class ORGiMobileDeviceController extends ORGWebSocketDeviceController {

    //constructor(ip, port, delegate) {
    //    super(ip,port,delegate);
    //    //this.webSocketDelegate = new ORGiControlProxyWSDelegate();
    //}

    get type() {
        return "iDeviceControlProxy";
    }

    requestDeviceInfo() {
        this.webSocket.send( "{ \"cmd\" : \"ideviceinfo\" }");
    }

    requestAppInfo() {
    }

    requestScreenshot() {
        this.webSocket.send( "{ \"cmd\" : \"idevicescreenshot\" }");
    }

    requestElementTree( parameters ) {
    }

    sendLocationUpdate( lat, lng) {
        this.webSocket.send( "{ \"cmd\" : \"idevicelocation\" , \"args\" : \"-- " + lat + " " + lng + "\"}");
    }

}
/**
 * Created by jongabilondo on 22/03/2017.
 */


const kORGFloorLabelFontSize = 20;
const kORGArrowOffset = 10;
const kORGArrowToTextOffset = 5;
const kORGFloorLabelHeight = 5;

/**
 * Class to represent the floor the THREE scene model.
 */
class ORG3DSceneFloor {

    constructor( size, step, showAxis, THREEScene, defaultYPos) {

        this._THREEScene = THREEScene;
        this._yPos = defaultYPos;

        if ( showAxis ) {
            this._THREEAxis = new THREE.AxesHelper(10);
            this._THREEAxis.position.set(-size/2, this._yPos,-size/2);
            this._THREEScene.add(this._THREEAxis);
        }

        this._THREEFloor = new THREE.GridHelper(size, step, new THREE.Color(0x666666), new THREE.Color(0x666666));
        this._THREEFloor.position.set( 0, this._yPos, 0 );
        this._THREEScene.add(this._THREEFloor);

        this._createXArrow(size);
        this._createXLabel(size);
    }

    get position() {
        return this._THREEFloor.position;
    }

    remove() {
        if (this._THREEFloor) {
            this._THREEScene.remove(this._THREEFloor);
            this._THREEFloor = null;
        }

        if (this._THREEAxis) {
            this._THREEScene.remove(this._THREEAxis);
            this._THREEAxis = null;
        }
    }

    setPosition( x, y, z) {
        if (this._THREEFloor) {
            this._THREEFloor.position.setY(y);
        }
        if (this._THREEAxis) {
            this._THREEAxis.position.setY(y);
        }
    }

    // PRIVATE

    _createXArrow( floorSize ) {
        const zOffset = kORGArrowOffset;
        const origin = new THREE.Vector3( -floorSize/2, 0, floorSize/2 + zOffset);
        const length = floorSize;
        const color = 0xffff00;
        let arrowHelper = new THREE.ArrowHelper( new THREE.Vector3( 1, 0, 0 ), origin, length, color, length*0.03 );
        arrowHelper.position.setY(this._yPos);
        this._THREEScene.add( arrowHelper );
    }

    _createXLabel( floorSize ) {

        const addressGeom = new THREE.TextGeometry( floorSize.toString() + " m", {
            font: ORG.font_helvetiker_regular,
            size: kORGFloorLabelFontSize,
            height: kORGFloorLabelHeight,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: kORGFloorLabelHeight / 5.0,
            bevelSize: kORGFloorLabelHeight / 5.0,
            bevelSegments: 5
        });

        const material = new THREE.MeshPhongMaterial({color: 0xeeeeee});
        let textMesh = new THREE.Mesh(addressGeom, material);
        textMesh.position.set( 0, 0, 0 );
        textMesh.rotation.set( THREE.Math.degToRad( -90 ), 0, 0 );
        textMesh.updateMatrix();
        textMesh.geometry.computeBoundingBox();
        let centerPoint = new THREE.Vector3();
        textMesh.geometry.boundingBox.getCenter(centerPoint);
        textMesh.position.set( -centerPoint.x, this._yPos, floorSize/2 + kORGFloorLabelFontSize + kORGArrowOffset + kORGArrowToTextOffset );

        this._THREEScene.add( textMesh );
    }
}
/**
 * Created by jongabilondo on 22/03/2017.
 */

/**
 * Utilities class to load and show THREE models of different devices.
 */
class ORG3DDeviceModelLoader {

    /**
     * Asynchronous load of a 3D model object for the corresponding device.
     * When load is finished it will call to the organismo scene to add the model to the three.js scene.
     * @param scene the ORG.scene to add the 3D model to.
     */
    static loadDevice3DModel(device, scene, yPosition) {
        return new Promise((resolve, reject) => {
            if (device.productName.startsWith('iPhone 5')) {
                this._load_iPhone_5(scene,device).then(
                    (result) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
            } else { //if ( device.productName.startsWith('iPhone 6')) {
                this._load_iPhone_6(scene,device).then(
                    (result) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
            }
        });
    }

// PRIVATE

    static _load_iPhone_5(scene, device) {
        return new Promise((resolve, reject) => {
            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('3DModels/iPhone_5/');
            mtlLoader.load('iPhone_5.mtl',
                (materials) => {
                    materials.preload();

                    let objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath( '3DModels/iPhone_5/' );
                    objLoader.load( "iPhone_5.obj",
                        (object) => {
                            // model loaded, scale and translate
                            let deviceBox =  new THREE.Box3().setFromObject(object);
                            const scale = device.bodySize.height / deviceBox.getSize().y;
                            object.scale.set( scale, scale, scale );
                            deviceBox =  new THREE.Box3().setFromObject(object);
                            object.position.set( 0, - deviceBox.getSize().y/2.0, - ((deviceBox.getSize().z/2.0) + 0.0005) ); // Place device 0.5mm behind the screen
                            let deviceModel = new ORG3DDeviceModel(scene.THREEScene, object)
                            resolve(deviceModel);
                        },
                        null, //on progress
                        (error) => {
                            reject(error);
                        }
                    );
                },
                null, // on progress
                (error) => {
                    reject(error);
                });
        });
    }

    static _load_iPhone_6(scene, device) {
        return new Promise((resolve, reject) => {
            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('3DModels/iPhone_6/');
            mtlLoader.load('iPhone_6.mtl',
                (materials) => {
                    materials.preload();

                    let objLoader = new THREE.OBJLoader();
                    objLoader.setPath('3DModels/iPhone_6/');
                    objLoader.setMaterials(materials);
                    objLoader.load("iPhone_6.obj",
                        (object) => {
                            // model loaded, scale and translate
                            let deviceBox =  new THREE.Box3().setFromObject(object);
                            const scale = device.bodySize.height / deviceBox.getSize().y;
                            object.scale.set(scale, scale, scale);
                            deviceBox =  new THREE.Box3().setFromObject(object);
                            object.position.set(0, - deviceBox.getSize().y/2.0, - ((deviceBox.getSize().z/2.0) + 0.0005) ); // Place device 0.5mm behind the screen
                            let deviceModel = new ORG3DDeviceModel(scene.THREEScene, object)
                            resolve(deviceModel);
                        },
                        null, /*on progress*/
                        (error) => {
                            reject(error);
                        }
                    );
                },
                null, // on progress
                (error) => {
                    reject(error);
                })
        })
    }
}

/**
 * Created by jongabilondo on 22/03/2017.
 */


/**
 * Class to keep the THREE model of the device and to wrap the actions on it.
 * It contains only the body of the device, not the display.
 */
class ORG3DDeviceModel {

    /**
     * Constructor
     * @param threeObj - A THREE.Group representing the Device.
     */
    constructor(scene, threeObj) {
        this.threeObj = threeObj; // It is a THREE.Group. Don't have geometry to compute bbox.
        this.threeScene = scene;
    }

    destroy() {
        this.removeFromScene();
        this.threeObj = null;
    }

    get THREEObject() {
        return this.threeObj;
    }


    get boundingBox() {
        return new THREE.Box3().setFromObject(this.threeObj);
    }

    removeFromScene() {
        if (this.threeScene && this.threeObj) {
            this.threeScene.remove(this.threeObj);
        }
    }

    setOrientation(orientation) {
        if (!this.threeObj) {
            return;
        }

        // reset position
        let bbox = this.boundingBox;
        let currentPosition = new THREE.Vector3();
        bbox.getCenter(currentPosition);
        //this.threeObj.applyMatrix(new THREE.Matrix4().makeTranslation(-currentPosition.x, -currentPosition.y, -currentPosition.z));

        // rotate
        let rotation = this.threeObj.rotation;
        this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(-rotation.z));

        switch (orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT: {
            } break;
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT:
                this.threeObj.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
                break;
        }
        // return to position
        //this.threeObj.applyMatrix(new THREE.Matrix4().makeTranslation(currentPosition.x, currentPosition.y, currentPosition.z));
    }
}
/**
 * Created by jongabilondo on 25/03/2017.
 */


/**
 * Class to create and handle the THREE object of the device screen.
 */
class ORG3DDeviceScreen {

    constructor(size, position, threeScene) {
        this._removeHighlight = false;
        this._nextHighlightPlane = null;
        this._currentHighlightPlane = null;
        this._threeScreenPlane = null;
        this._nextScreenshotImage = null;

        this._deviceScreenSize = size;
        this._THREEScene = threeScene;

        this.create(this._deviceScreenSize, position)
    }

    get screenPlane() {
        return this._threeScreenPlane;
    }

    get boundingBox() {
        return this._threeScreenPlane.geometry.boundingBox;
    }

    get screenSize() {
        return this._deviceScreenSize;
    }

    get screenPosition() {
        return this._threeScreenPlane.position; // The screen is created at 0,0 then applied a transformation matrix. This position is not the world position.
    }

    get screenWorldPosition() {
        let position = this.screenPosition.clone();
        position.setFromMatrixPosition(this._threeScreenPlane.matrixWorld);
        return position;
    }

    set nextScreenshotImage(image) {
        this._nextScreenshotImage = image;
    }

   /* set rotationZ(degrees) {
        this._threeScreenPlane.rotation.set(0,0,degrees);
    }*/

    destroy() {
        if (!this._THREEScene) {
            return;
        }
        if (this._threeScreenPlane) {
            this._THREEScene.remove(this._threeScreenPlane);
        }
        if (this._currentHighlightPlane) {
            this._THREEScene.remove(this._currentHighlightPlane);
        }
        this._threeScreenPlane = null;
        this._nextHighlightPlane = null;
        this._currentHighlightPlane = null;
    }

    create(size, position) {
        this._threeScreenPlane = this._createScreenPlane(size, position);
        this._THREEScene.add(this._threeScreenPlane);
    }

    hide() {
        if (this._threeScreenPlane) {
            this._threeScreenPlane.visible = false;
        }
    }

    show() {
        if (this._threeScreenPlane) {
            this._threeScreenPlane.visible = true;
        }
    }

    setScreenshot(image) {
        let screenshotTexture = new THREE.Texture(image);
        screenshotTexture.minFilter = THREE.NearestFilter;

        // the image should be loaded by now
        screenshotTexture.needsUpdate = true;
        this._threeScreenPlane.material.map = screenshotTexture;
        this._threeScreenPlane.material.needsUpdate = true;
        this._threeScreenPlane.needsUpdate = true;
    }

    setOrientation(orientation) {
        if (!this._threeScreenPlane) {
            return;
        }

        // There are different experiences with the screenshot when rotating, sometimes they come portrait sometimes landscape.
        // When portrait better use the  lower rotation code.
        // Lately are coming landscape so we have to recreate the plane not to ratate.

        // Recreate the screen with new size
        if (true) {
            const backupPosition = this.screenPosition;
            const newScreenSize = this._displaySizeWithOrientation(orientation);
            if (this._deviceScreenSize.width != newScreenSize.width) {
                this._deviceScreenSize = newScreenSize;
                // changing geometry on the fly is not straight forward
                this._threeScreenPlane.geometry.dispose();
                this._threeScreenPlane.geometry = new THREE.PlaneBufferGeometry(this._deviceScreenSize.width, this._deviceScreenSize.height, 1, 1);
                this._threeScreenPlane.geometry.dynamic = true;
                this._threeScreenPlane.geometry.computeBoundingBox();
                this._threeScreenPlane.needsUpdate = true;
            }
        } else {
            let rotation = this._threeScreenPlane.rotation;
            this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(-rotation.z));

            switch (orientation) {
                case ORGDevice.ORIENTATION_PORTRAIT: {
                } break;
                case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(180)));
                } break;
                case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-90)));
                } break;
                case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {
                    this._threeScreenPlane.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
                } break;
            }
        }
    }

    _displaySizeWithOrientation(orientation) {
        const portraitSize = {width: Math.min(this._deviceScreenSize.width, this._deviceScreenSize.height), height:Math.max(this._deviceScreenSize.width, this._deviceScreenSize.height)};
        let orientedSize = portraitSize;
        switch (orientation) {
            case ORGDevice.ORIENTATION_PORTRAIT:
            case ORGDevice.ORIENTATION_PORTRAIT_UPSIDE_DOWN: {
            } break;
            case ORGDevice.ORIENTATION_LANDSCAPE_RIGHT:
            case ORGDevice.ORIENTATION_LANDSCAPE_LEFT: {
                orientedSize = {width: portraitSize.height, height: portraitSize.width};
            } break;
        }
        return orientedSize;
    }

    /***
     * Create a highlight plane covering the area of the given element. It will be shown in the next renderUpdate.
     * @param element3D - A ORG3DUIElement that can be WDA/Org ...
     */
    highlightUIElement(element3D) {
        if (element3D && element3D.hasSize) {
            // Calculate element bounds in device screen in 3D world
            const kZOffsetFromScreen = 0.0005;
            const elementBox2InScreen = element3D.getBoundsInDeviceScreen(ORG.device, this);
            const elementSize = elementBox2InScreen.getSize();
            const elementBox2Center = new THREE.Vector2();
            elementBox2InScreen.getCenter(elementBox2Center);
            const position = new THREE.Vector3(elementBox2Center.x, elementBox2Center.y, this.screenPosition.z + kZOffsetFromScreen);

            // Create the plane
            this._nextHighlightPlane = this._createHighlightPlane(elementSize, position);
            this._removeHighlight = false;
        } else {
            this._removeHighlight = true;
        }
    }

    /***
     * Time to update the 3D model. Called by the render loop.
     */
    renderUpdate() {
        // update screenshot
        if (this._nextScreenshotImage) {
            this.setScreenshot(this._nextScreenshotImage);
            this._nextScreenshotImage = null;
        }

        // update highlight
        if (this._removeHighlight) {
            if (this._currentHighlightPlane) {
                this._THREEScene.remove(this._currentHighlightPlane);
            }
            this._currentHighlightPlane = null;
            this._nextHighlightPlane = null;
            this._removeHighlight = false;
        }

        if (this._nextHighlightPlane) {
            if (this._currentHighlightPlane) {
                this._THREEScene.remove(this._currentHighlightPlane);
            }
            this._THREEScene.add(this._nextHighlightPlane);
            this._currentHighlightPlane = this._nextHighlightPlane
            this._nextHighlightPlane = null;
        }
    }

    _createScreenPlane(size, position) {
        let geometry = new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1);
        geometry.dynamic = true;
        let material = new THREE.MeshBasicMaterial({ map : null , color: 0xffffff, side: THREE.DoubleSide});
        let screenPlane = new THREE.Mesh(geometry, material);
        screenPlane.position.copy(position);
        screenPlane.name = "screen";
        screenPlane.geometry.computeBoundingBox();
        return screenPlane;
    }

    /***
     * Create a THREE plane that will be used as a highlight on top of the screen.
     * @param size. Vector2
     * @param position. Vector3
     * @returns {THREE.Mesh of plane}
     * @private
     */
    _createHighlightPlane(size, position) {
        const kOpacity = 0.5;
        const kColor = 0xee82ee; // FFC0CB FFE4E1 FB6C1 FF69B4

        let geometry = new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1);
        let material = new THREE.MeshBasicMaterial({ map : null , color: kColor, side: THREE.DoubleSide, transparent: true, opacity: kOpacity});
        let highlightPlane = new THREE.Mesh(geometry, material);
        highlightPlane.position.copy(position);

        return highlightPlane;
    }

}
/**
 * Delegate class for the WebSocket to the Device.
 * Implements the callbacks for all the events on the WebSocket.
 * @constructor
 */
class ORGWebSocketDelegate {

	constructor() {
		this.connected = false;
	}

	/**
	 * Callback for the websocket opening.
	 * @param ws
	 */
	onOpen(ws) {
		console.log('Delegate onOpen');
		this.connected = true;
		// UI updates
        ORG.dispatcher.dispatch({
            actionType: 'websocket-open'
        });
    }

	/**
	 * Callback for the closing of the websocket.
	 * @param ws
	 */
	onClose(event, ws) {
		console.log('Delegate onClose.');
		//ORG.scene.handleDeviceDisconnection();

		// UI updates
        ORG.dispatcher.dispatch({
            actionType: 'websocket-closed',
            code: event.code,
            reason: event.reason,
            deviceController: ORG.deviceController.constructor.name
        });
        ORG.dispatcher.dispatch({
            actionType: 'device-disconnect',
			code: event.code,
			reason: event.reason,
			deviceController: ORG.deviceController.constructor.name
        });
		/*
        switch(e.code) {
            case 1000:
                reason = 'Normal closure';
                break;
            case 1001:
                reason = 'An endpoint is going away';
                break;
            case 1002:
                reason = 'An endpoint is terminating the connection due to a protocol error.';
                break;
            case 1003:
                reason = 'An endpoint is terminating the connection because it has received a type of data it cannot accept';
                break;
            case 1004:
                reason = 'Reserved. The specific meaning might be defined in the future.';
                break;
            case 1005:
                reason = 'No status code was actually present';
                break;
            case 1006:
                reason = 'The connection was closed abnormally';
                break;
            case 1007:
                reason = 'The endpoint is terminating the connection because a message was received that contained inconsistent data';
                break;
            case 1008:
                reason = 'The endpoint is terminating the connection because it received a message that violates its policy';
                break;
            case 1009:
                reason = 'The endpoint is terminating the connection because a data frame was received that is too large';
                break;
            case 1010:
                reason = 'The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn\'t.';
                break;
            case 1011:
                reason = 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
                break;
            case 1012:
                reason = 'The server is terminating the connection because it is restarting';
                break;
            case 1013:
                reason = 'The server is terminating the connection due to a temporary condition';
                break;
            case 1015:
                reason = 'The connection was closed due to a failure to perform a TLS handshake';
                break;
        }*/
	}

	/**
	 * Callback for when the websocket has received a message from the Device.
	 * Here the message is processed.
	 * @param event
	 * @param ws
	 */
	onMessage(event, ws) {

		let messageJSON = JSON.parse(event.data);
		if (messageJSON) {
			//console.log("onMessage. parse OK");
		} else {
			console.log("onMessage. parse NOT OK");
			return;
		}
		if (messageJSON) {
			if (messageJSON.type.toLowerCase() === ORGInboundMessage.RESPONSE) {
				this._processResponse(messageJSON);
			} else if (messageJSON.type.toLowerCase() === ORGInboundMessage.NOTIFICATION) {
				this._processNotification(messageJSON.body);
			} else if (messageJSON.command.toLowerCase() === ORGInboundMessage.CORE_MOTION_FEED) {
				this._processMotionFeedMessage(messageJSON.content);
			}
		}
	}

	/**
	 * Callback for when an error has been occurred in the websocket.
	 * @param event
	 * @param ws
	 */
	onError(event, ws) {
		console.log('WS Error: ' + event.data);
	}

	// Private

	/**
	 * Method to process a message of type "response" that arrived from the Device.
	 * @param messageJSON
	 */
	_processResponse(messageJSON) {
		switch (messageJSON.request) {
			case ORGRequest.DEVICE_INFO: {
                this._processResponseDeviceInfo(messageJSON.data);
            } break;
			case ORGRequest.APP_INFO: {
                this._processResponseAppInfo(messageJSON);
            } break;
			case ORGRequest.SCREENSHOT: {
                this._processReportScreenshot(messageJSON);
            } break;
			case ORGRequest.ELEMENT_TREE: {
                this._processReportElementTree(messageJSON);
            }break;
			case ORGRequest.SYSTEM_INFO: {
                this._processReportSystemInfo(messageJSON);
            } break;
            case ORGRequest.CLASS_HIERARCHY: {
                this._processResponseClassHierarchy(messageJSON);
            } break;
			default: {
				console.debug('Unknown response from Device.');
			}
		}
	}

	/**
	 * Method to process a message of type "notification" that arrived from the Device.
	 * @param messageBody
	 */
	_processNotification(messageBody) {
		if (messageBody.notification === "orientation-change") {
            this._processNotificationOrientationChanged(messageBody.parameters);
		}
	}

	/**
	 * Method to process the a device orientation change notification message coming from the Device.
	 * @param notificationParameters
	 */
	_processNotificationOrientationChanged(notificationParameters) {
		if (notificationParameters) {
			const newSize = notificationParameters.screenSize;
            let newOrientation = ORG.deviceController.convertInterfaceOrientation(notificationParameters.orientation);
			if (newSize && newOrientation) {
                if (newOrientation !== ORG.device.orientation) {
                    ORG.dispatcher.dispatch({
                        actionType: 'device-orientation-changed',
                        orientation: newOrientation
                    })
                }
				//ORG.scene.setDeviceOrientation(newOrientation, newSize.width, newSize.height);
			}
		}
	}

	/**
	 * Method to process a response with device info coming from the Device.
	 * @param messageJSON
	 */
	_processResponseDeviceInfo(deviceInfo) {

		// The connection to the device its on place. We got information about the device.
		ORG.device = new ORGDevice(deviceInfo);

		// UI
        ORG.dispatcher.dispatch({
            actionType: 'device-info-update',
            device: ORG.device
        });

        if (ORG.scene.flagShowDevice3DModel) {
            ORG.scene.showDevice3DModel().then(
                (result) => {
                    this._createDeviceScreenWithSnapshot(ORG.device);
                }
           );
        } else {
            this._createDeviceScreenWithSnapshot(ORG.device);
		}
    }

	/**
	 * Method to process a response with app info coming from the Device.
	 * @param messageJSON
	 */
	_processResponseAppInfo(messageJSON) {
		ORG.testApp = new ORGTestApp(messageJSON.data);

        // UI updates
        ORG.dispatcher.dispatch({
            actionType: 'app-info-update',
            app: ORG.testApp
        })
	}

    /***
     * Method to process a response with class hierarchy info coming from the Device.
     * @param messageJSON
     * @private
     */
	_processResponseClassHierarchy(messageJSON) {
        ORG.UIJSONTreeManager.showClassHierarchy(messageJSON.data);
    }

	/**
	 * Method to process a message response with screenshot information.
	 * @param messageJSON
	 */
	_processReportScreenshot(messageJSON) {
		let base64Img = messageJSON.data.screenshot;
		if (base64Img) {
			var img = new Image();
			img.src = "data:image/jpg;base64," + base64Img;

            // UI updates
            ORG.dispatcher.dispatch({
                actionType: 'screenshot-update',
                image: img
            });

			// Ask for next screenshot
			if (ORG.scene.flagContinuousScreenshot && !ORG.scene.isExpanded && ORG.deviceController && ORG.deviceController.isConnected) {
				ORG.deviceController.requestScreenshot();
			}
		}
	}

	/**
	 * Method to process a message response with information of the UI Element Tree.
	 * @param reportData
	 */
	_processReportElementTree(reportData) {
		let jsonTree = reportData.data;
		if (!!jsonTree) {
            ORG.UIJSONTreeManager.update(jsonTree, ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO);
            if (ORG.scene.expanding || ORG.scene.isExpanded) {
                ORG.scene.updateUITreeModel(jsonTree);
			}
            bootbox.hideAll();
        }
	}

    /**
     * Method to process a message response with the system information of the iDevice.
     * @param reportData
     */
    _processReportSystemInfo(reportData) {
        let systemInfoData = reportData.data;
        if (!!systemInfoData) {
			if (ORG.systemInfoManager) {
				ORG.systemInfoManager.dataUpdate(systemInfoData);
            }
        }
    }

    _createDeviceScreenWithSnapshot(device) {
        ORG.scene.createDeviceScreen(device.displaySize.width, device.displaySize.height, 0);
        ORG.scene.positionDeviceAndScreenInRealWorld(); // 1.5 m in Y
        ORG.scene.devicePositionHasChanged();
        ORG.deviceController.requestScreenshot(); // ask for the first screenshot
    }

}
/**
 * Created by jongabilondo on 14/08/2017.
 */


class ORGiControlProxyWSDelegate extends ORGWebSocketDelegate {

    constructor() {
        super();
    }

    /**
     * Callback for the websocket opening.
     * @param ws
     */
    onOpen(ws) {
        super.onOpen(ws);
        ORG.deviceController.requestDeviceInfo();
    };


    /**
     * Callback for when the websocket has received a message from the Device.
     * Here the message is processed.
     * @param event
     * @param ws
     */
    onMessage(event, ws) {

        var resultStr = event.data.replace(/\n/g , "\\r"); // mac sends LF in responses

        var messageJSON = JSON.parse(resultStr);
        if (messageJSON) {
            //console.log("onMessage. parse OK");
        } else {
            console.log("onMessage. parse NOT OK");
            return;
        }

        if (messageJSON.status == 'success') {
            this._processResponse(messageJSON);
        } else {
            console.log("onMessage. cmd response failure. cmd:" + messageJSON.cmd);
        }
    };

    /**
     * Method to process a response to a cmd, arrived from the Device.
     * @param messageJSON
     */
    _processResponse(messageJSON) {
        switch (messageJSON.cmd) {
            case "ideviceinfo": {
                const deviceInfo = this._deviceInfoFromResponse(messageJSON.response);//{"name" : "name", "model":"model", "systemVersion" : "sv", "productName" : "iPhone 5", "screenSize" : {"height":568, "width":320}};
                this._processResponseDeviceInfo(deviceInfo); // super
            } break;
            case "idevicescreenshot" : {
                this._processReportScreenshot({"data":{"screenshot":messageJSON.response}});

            }
        }
    }

    _deviceInfoFromResponse(reponse) {

        var name;
        var version;
        var matches = /DeviceName: (.*)(\r)(.*)/.exec(reponse);
        if (matches && matches.length >= 2) {
            name = matches[1];
        }
        matches = /ProductVersion: (.*)(\r)(.*)/.exec(reponse);
        if (matches && matches.length >= 2) {
            version = matches[1];
        }

        return {"name" : name, "model":"model", "systemVersion" : version, "productName" : "iPhone 5", "screenSize" : {"height":568, "width":320}};

    }
}
/**
 * Created by jongabilondo on 15/08/2017.
 */


class ORGOrganismoWSDelegate extends ORGWebSocketDelegate {

    constructor() {
        super();
    }

    /**
     * Callback for the websocket opening.
     * @param ws
     */
    onOpen(ws) {
        super.onOpen(ws);
        ORG.deviceController.requestDeviceInfo();
        ORG.deviceController.requestAppInfo();
    };


}
/**
 * Created by jongabilondo on 6/21/15.
 */

/**
 * Class to detect the THREE object of the expanded UI tree the mouse is on.
 * It calls its delegates to inform the THREE obj the mouse is onto.
 * If the mouse is not over any obj it passes a null.
 * The Delegate must implement mouseOverElement.
 *
 * This class itself it's a delegate for ORGMouseListener.
 * It implements onMouseDown, onMouseUp, onMouseMove to receive the mouse events from ORGMouseListener.
 * @constructor
 */
class ORG3DUITreeRaycaster {

    constructor( rendererDomElement, THREECamera, THREETargetObject ) {
        this._raycaster = new THREE.Raycaster();
        this._raycaster.linePrecision = 0.0001;
        this._rcmouse = new THREE.Vector2();
        this._THREETargetObject = THREETargetObject; // The threejs object to raycast on.
        this._THREECamera = THREECamera;
        this._rendererDomElement = rendererDomElement;
        this._listeners = [];
        this._hilitedObj = null;
        this._isMouseDown = false; // It will help us to ignore the mouse moves while mouse down.
        this._enabled = true;
    }

    addDelegate( delegate ) {
        this._listeners.push( delegate );
    }

    removeDelegate( delegate ) {
        for (let i=0; i<this._listeners.length; i++) {
            if ( this._listeners[i] === delegate) {
                this._listeners.splice( i, 1);
                break;
            }
        }
    }

    // ORGMouseListener DELEGATE METHODS

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseDown(event) {
        this._isMouseDown = true;
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseUp( event ) {
        this._isMouseDown = false;
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseMove( event ) {

        if ( this._isMouseDown ) {
            return;
        }
        if ( !this._THREETargetObject ) {
            return;
        }
        const canvasW = $(this._rendererDomElement).width();
        const canvasH = $(this._rendererDomElement).height();
        const canvasOffset = $(this._rendererDomElement).offset();

        // calculate mouse position in normalized device coordinates. (-1 to +1) for both components
        this._rcmouse.x = ( (event.clientX - canvasOffset.left) / canvasW ) * 2 - 1;
        this._rcmouse.y = - ( (event.clientY - canvasOffset.top) / canvasH ) * 2 + 1;

        this._raycaster.setFromCamera( this._rcmouse, this._THREECamera );
        var intersects = this._raycaster.intersectObject( this._THREETargetObject, true /*recursive*/ ); // returns always an array. The first one is the closest object.

        var elementToHilite = null;
        var intersectionPoint = null;
        if ( intersects && intersects.length ) {
            elementToHilite = intersects[0].object;
            intersectionPoint = intersects[0].point;

            // Make sure the object is the uiobj plane and not the edges helper
            if ( elementToHilite.type === "LineSegments" /*BoxHelper*/) {
                const parent = elementToHilite.parent; // parent must be a group, holds edgesHelper and the uiobject plane
                elementToHilite = null;
                if ( parent ) {
                    for ( let child of parent.children ) {
                        if ( child.type === "Mesh" ) {
                            elementToHilite = child;
                            break;
                        }
                    }
                }
            }
        }

        // Inform delegates about the intersected element, null is sent as well.
        for ( let i=0; i<this._listeners.length; i++ ) {
            if (this._listeners[i].mouseOverElement) {
                this._listeners[i].mouseOverElement( elementToHilite, intersectionPoint );
            }
        }
    }
}

/**
 * Created by jongabilondo on 6/21/15.
 */

/**
 * Class to detect the Scene THREE object the mouse is on. Not for 3D UITree, only for objects in the screen such as beacons.
 * It calls its delegates to inform the THREE obj the mouse is onto.
 * If the mouse is not over any obj it passes a null.
 * The Delegate must implement mouseOverElement.
 *
 * This class itself it's a delegate for ORGMouseListener.
 * It implements onMouseDown, onMouseUp, onMouseMove to receive the mouse events from ORGMouseListener.
 * @constructor
 */
class ORG3DSceneRaycaster {

    constructor( rendererDomElement, THREECamera, THREETargetObject ) {
        this._raycaster = new THREE.Raycaster();
        this._raycaster.linePrecision = 0.0001;
        this._rcmouse = new THREE.Vector2();
        this._THREETargetObject = THREETargetObject; // The threejs object to raycast on
        this._THREECamera = THREECamera;
        this._rendererDomElement = rendererDomElement;
        this._listeners = [];
        this._hilitedObj = null;
        this._isMouseDown = false; // It will help us to ignore the mousemoves while mousedown.
        this._enabled = true;
    }

    addDelegate( delegate ) {
        this._listeners.push( delegate );
    }

    removeDelegate( delegate ) {
        for (let i=0; i<this._listeners.length; i++) {
            if ( this._listeners[i] === delegate) {
                this._listeners.splice( i, 1);
                break;
            }
        }
    }

    // ORGMouseListener DELEGATE METHODS

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseDown(event) {
        this._isMouseDown = true;
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseUp( event ) {
        this._isMouseDown = false;

        const canvasW = $(this._rendererDomElement).width();
        const canvasH = $(this._rendererDomElement).height();
        const canvasOffset = $(this._rendererDomElement).offset();

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this._rcmouse.x = ( (event.clientX - canvasOffset.left) / canvasW ) * 2 - 1;
        this._rcmouse.y = - ( (event.clientY - canvasOffset.top) / canvasH ) * 2 + 1;

        this._raycaster.setFromCamera( this._rcmouse, this._THREECamera );
        var intersects = this._raycaster.intersectObject( this._THREETargetObject, true ); // returns always an array. The first one is the closest object.
        if ( intersects && intersects.length ) {
            const intersected = intersects[0];
            if ( intersected.object.type === "Mesh" ) {
                if ( (intersected.object.parent.type === "Group") && (intersected.object.parent.name === "ORG.Beacon.Group")) {
                    ORG.dispatcher.dispatch({
                        actionType: 'beacon-selected',
                        beacon : intersected.object.parent
                    });
                }
            }
        }
    }

    /**
     * ORGMouseListener informs of event
     * @param event
     */
    onMouseMove( event ) {

        var elementToTooltip = null;

        const canvasW = $(this._rendererDomElement).width();
        const canvasH = $(this._rendererDomElement).height();
        const canvasOffset = $(this._rendererDomElement).offset();

        // calculate mouse position in normalized device coordinates. (-1 to +1) for both components
        this._rcmouse.x = ( (event.clientX - canvasOffset.left) / canvasW ) * 2 - 1;
        this._rcmouse.y = - ( (event.clientY - canvasOffset.top) / canvasH ) * 2 + 1;

        this._raycaster.setFromCamera( this._rcmouse, this._THREECamera );
        var intersects = this._raycaster.intersectObject( this._THREETargetObject, true /*recursive*/ ); // returns always an array. The first one is the closest object.

        if ( intersects && intersects.length ) {
            elementToTooltip = intersects[0];
        }

        // Inform delegates about the intersected element, null is sent as well.
        for ( let i=0; i<this._listeners.length; i++ ) {
            if (this._listeners[i].mouseOverElement) {
                this._listeners[i].mouseOverElement( elementToTooltip );
            }
        }
    }
}

/**
 * Created by jongabilondo on 22/09/2017.
 */

/**
 * Class to create and manipulate a beacon in the THREE scene.
 */
class ORG3DBeacon {

    /**
     * Constructor
     * @param beacon -  A ORGBeacon
     */
    constructor(beacon) {
        this._kCoreAnimationScale = 4;
        this._kCoreAnimationTime = 1000; //ms

        this._coreMesh = null;
        this._beacon = beacon;
        this._beaconModel = this._createaModel(beacon.range);
        this._coreTWEEN = null;
    }

    /**
     *
     * @returns a THREE.Group
     */
    get model() {
        return this._beaconModel;
    }

    /**
     * Location of the Beacon in the scene in meters.
     * @returns {{x: number, y: number, z: number}}
     */
    get location() {
        return {x:0, y:0, z:0};
    }

    /**
     * Starts animating the beacon core.
     */
    animateCore() {
        this._scaleUp().start();
    }

    // PRIVATE

    /**
     * Creates a THREE.Group with the beacon THREE objects.
     * @param radius
     * @returns {*|Group}
     * @private
     */
    _createaModel(radius) {
        const wSegments = 10;
        const hSegments = 10;
        var geometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        var material = new THREE.MeshBasicMaterial({
            color: 0x7788FF,
            wireframe: true
        });
        var coverMesh = new THREE.Mesh(geometry, material);
        coverMesh.name = "ORG.Beacon.Cover.Mesh";

        var coreGeometry = new THREE.SphereGeometry(2, 16, 16);
        var coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x771122
        });
        this._coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this._coreMesh.name = "ORG.Beacon.Core.Mesh"

        var beaconGroup = new THREE.Group();
        beaconGroup.name = "ORG.Beacon.Group";
        beaconGroup.add(this._coreMesh);
        beaconGroup.add(coverMesh);

        return beaconGroup;
    }


    /**
     * Animates the Scale up of the beacon core, it launches the scale down on completion.
     * @returns {*}
     * @private
     */
    _scaleUp () {
        const _this = this;
        return new TWEEN.Tween(this._coreMesh.scale).to ({
            x : this._kCoreAnimationScale,
            y : this._kCoreAnimationScale,
            z : this._kCoreAnimationScale
        }, this._kCoreAnimationTime).onUpdate(function () {
            //
        }).onComplete(function () {
            _this._scaleDown().start();
        });
    }

    /**
     * Animates the Scale down of the beacon core, it launches the scale up on completion.
     * @returns {*}
     * @private
     */
    _scaleDown () {
        const _this = this;
        return new TWEEN.Tween(this._coreMesh.scale).to ({
            x : 1, y : 1, z: 1
        }, this._kCoreAnimationTime).onUpdate(function () {
            //
        }).onComplete(function () {
            _this._scaleUp().start();
        });
    }

}
/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DBattery {

    constructor(radius, height, percent) {
        this._THREEModel = this._createModel( radius, height, percent );
    }

    get THREEModel() {
        return this._THREEModel;
    }

    set position(position) {
        if ( this._THREEModel ) {
            this._THREEModel.position.copy( position );
        }
    }

    // PRIVATE

    _createModel(radius, batteryHeight, percent) {

        const kSegments = 24;
        const kGreenHeight = batteryHeight * percent;
        const kRedHeight = batteryHeight * (1 - percent);
        const kOpacity = 0.75;
        const kFontSize = 0.005;
        const kFontHeight = 0.002;
        const kCurveSegments = 16;
        const kMetalness = 0.7;

        // Group
        var group = new THREE.Group();
        group.name = "ORG.Battery.Group";

        // Bottom green
        var geometry = new THREE.CylinderGeometry( radius, radius, kGreenHeight, kSegments);
        var material = new THREE.MeshStandardMaterial({ color: 0x00FF00, transparent: true, opacity: kOpacity, metalness: kMetalness });
        var greenMesh = new THREE.Mesh( geometry, material );
        greenMesh.name = "ORG.Battery.Green.Mesh";
        group.add( greenMesh );

        // Upper red
        if ( percent < 1.0 ) {
            geometry = new THREE.CylinderGeometry( radius, radius, kRedHeight, kSegments);
            material = new THREE.MeshStandardMaterial({  color: 0xFF0000, transparent: true, opacity: kOpacity, metalness: kMetalness });
            var redMesh = new THREE.Mesh( geometry, material );
            redMesh.name = "ORG.Battery.Red.Mesh";
            redMesh.translateY( (kGreenHeight + kRedHeight) / 2.0 + 0.0001 );
            group.add( redMesh );
        }

        // Label
        var textGeometry = new THREE.TextGeometry(Math.floor(percent * 100) + "%", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        var textMesh = new THREE.Mesh(textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness }));
        const labelPosition = this._calculatePositionForLabel(textMesh, batteryHeight, kFontSize);
        textMesh.position.copy(labelPosition);
        group.add( textMesh );

        return group;
    }

    _calculatePositionForLabel(textMesh, batteryHeight, fontSize) {

        textMesh.geometry.computeBoundingBox();
        const bbox = textMesh.geometry.boundingBox;
        return new THREE.Vector3( -bbox.getSize().x / 2.0, batteryHeight / 2.0 + fontSize, 0);

    }
}
/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DPieChart {

    constructor( radius, height, sectorsDescription ) {

        this._THREEModel = this._createModel( radius, height, sectorsDescription);

    }

    get THREEModel() {

        return this._THREEModel;

    }

    set position( position ) {

        if ( this._THREEModel ) {
            this._THREEModel.position.copy( position );
        }

    }

    // PRIVATE

    _createModel( radius, height, sectorsDescription) {

        const kSegments = 24;

        // Group
        var group = new THREE.Group();
        group.name = "ORG.Chart.Group";

        // build every sector
        var startAngle = 0;
        var sectorDesc;
        var rotationAngle;
        var sectorMesh;

        for (let sectorDesc of sectorsDescription) {
            rotationAngle = sectorDesc.percent * 2 * Math.PI;
            sectorMesh = this._createSector( radius, height, kSegments, startAngle, rotationAngle, sectorDesc.color);
            sectorMesh.name = "ORG.Chart.Sector";
            sectorMesh.ORGData = { "tooltip": sectorDesc.tooltip };
            group.add( sectorMesh );
            startAngle += rotationAngle;
        }

        group.rotateX( 1.15 * Math.PI ); // some rotation for better visuals
        return group;
    }

    _createSector( radius, height, segments, startAngle, endAngle, color) {

        var geometry = new THREE.CylinderGeometry( radius, radius, height, segments, 1, false, startAngle, endAngle );
        var material = new THREE.MeshStandardMaterial({ color: color, metalness: 0.5 });
        return new THREE.Mesh( geometry, material );

    }
}
/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DMemoryChart extends ORG3DPieChart {

    constructor( data ) {

        const kRadius = 0.02;
        const kThickness = 0.002;
        const kMetalness = 0.7;
        const kLabelLeftOffset = 0.025;
        const kFontSize = 0.006;
        const kFontHeight = 0.002;
        const kCurveSegments = 16;
        const kLabelsGap = 0.01;

        const kTotalMemory =  parseInt( data["TotalMemory"] );
        var kFreeMemoryPercent =  parseFloat( data["FreeMemory (Formatted)"] ) / 100.0;
        const kFreeMemoryRaw =  parseFloat( data["FreeMemory (Not Formatted)"] );
        var kUsedMemoryPercent =  parseFloat( data["UsedMemory (Formatted)"] ) / 100.0;
        const kUsedMemoryRaw =  parseFloat( data["UsedMemory (Not Formatted)"] );
        var kActiveMemoryPercent =  parseFloat( data["ActiveMemory (Formatted)"] ) / 100.0;
        const kActiveMemoryRaw =  parseFloat( data["ActiveMemory (Not Formatted)"] );
        var kInactiveMemoryPercent =  parseFloat( data["InactiveMemory (Formatted)"] ) / 100.0;
        const kInactiveMemoryRaw =  parseFloat( data["InactiveMemory (Not Formatted)"] );
        var kWiredMemoryPercent =  parseFloat( data["WiredMemory (Formatted)"] ) / 100.0;
        const kWiredMemoryRaw =  parseFloat( data["WiredMemory (Not Formatted)"] );
        var kPurgableMemoryPercent =  parseFloat( data["PurgableMemory (Formatted)"] ) / 100.0;
        const kPurgableMemoryRaw =  parseFloat( data["PurgableMemory (Not Formatted)"] );

        const totalPercent = kFreeMemoryPercent + kUsedMemoryPercent + kActiveMemoryPercent + kInactiveMemoryPercent +  kWiredMemoryPercent + kPurgableMemoryPercent;
        const overshootCorrection = 1.0 / totalPercent;
        kFreeMemoryPercent *= overshootCorrection;
        kUsedMemoryPercent *= overshootCorrection;
        kActiveMemoryPercent *= overshootCorrection;
        kInactiveMemoryPercent *= overshootCorrection;
        kWiredMemoryPercent *= overshootCorrection;
        kPurgableMemoryPercent *= overshootCorrection;

        super( kRadius, kThickness, [
            {"percent": kFreeMemoryPercent, "color": 0x0099CC, "tooltip": "Free Memory \r" +  kFreeMemoryRaw / 1024 + " MB\r" + kFreeMemoryPercent + " %"},
            {"percent": kUsedMemoryPercent, "color": 0xFFDC00, "tooltip": "Free Memory \r" +  kUsedMemoryRaw / 1024 + " MB\r" + kUsedMemoryPercent + " %" },
            {"percent": kActiveMemoryPercent, "color": 0xFF9933, "tooltip": "Free Memory \r" +  kActiveMemoryRaw / 1024 + " MB\r" + kActiveMemoryPercent + " %" },
            {"percent": kInactiveMemoryPercent, "color": 0xFF3333, "tooltip": "Free Memory \r" +  kInactiveMemoryRaw / 1024 + " MB\r" + kInactiveMemoryPercent + " %" },
            {"percent": kWiredMemoryPercent, "color": 0x99CC33, "tooltip": "Free Memory \r" +  kWiredMemoryRaw / 1024 + " MB\r" + kWiredMemoryPercent + " %" },
            {"percent": kPurgableMemoryPercent, "color": 0x1767676, "tooltip": "Free Memory \r" +  kPurgableMemoryRaw / 1024 + " MB\r" + kPurgableMemoryPercent + " %" }
            ]);

        // Labels
        var textGeometry = new THREE.TextGeometry( "RAM: " + kTotalMemory + "MB", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness}));
        textMesh.translateX( kLabelLeftOffset );
        textMesh.rotateX( 0.8 * Math.PI );
        this.THREEModel.add( textMesh );

        const percentFixed = kFreeMemoryPercent * 100;
        textGeometry = new THREE.TextGeometry( "Free: " + percentFixed.toFixed( 2 ) + "%", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness}));
        textMesh.translateX( kLabelLeftOffset );
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateY( -kLabelsGap );
        this.THREEModel.add( textMesh );


    }
}
/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DDiskChart extends ORG3DPieChart {

    constructor( data ) {

        const radius = 0.02;
        const thickness = 0.002;
        const fontSize = 0.006;
        const fontHeight = 0.002;
        const curveSegments = 16;
        const labelLeftOffset = 0.025;
        const labelsGap = 0.01;
        const freeSpacePercentString = data["FreeDiskSpace (Formatted)"]; //  format : "50%"
        const freePercent = parseFloat( freeSpacePercentString.substring( 0, freeSpacePercentString.length - 1 )) / 100.0;
        const usedPercent = 1.0 - freePercent;

        super( radius, thickness, [
            {"percent": usedPercent, "color": 0xFF0011, "tooltip": "Used " +  data.usedDiskSpaceinPercent },
            {"percent": freePercent, "color": 0x22FF11, "tooltip": "Free: " +  freeSpacePercentString +  data["FreeDiskSpace (Not Formatted)"] }
            ]);


        // Labels
        var textGeometry = new THREE.TextGeometry( "Disk: " + data["DiskSpace"], {
            font: ORG.font_helvetiker_regular,
            size: fontSize,
            height: fontHeight,
            curveSegments: curveSegments
        });
        textGeometry.computeFaceNormals();
        var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: 0.7}));
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateX( labelLeftOffset );
        this.THREEModel.add( textMesh );

        textGeometry = new THREE.TextGeometry( "Free: " + freeSpacePercentString + " " +  data["FreeDiskSpace (Not Formatted)"], {
            font: ORG.font_helvetiker_regular,
            size: fontSize,
            height: fontHeight,
            curveSegments: curveSegments
        });
        textGeometry.computeFaceNormals();
        textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: 0.7 }));
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateX( labelLeftOffset );
        textMesh.translateY( -labelsGap );
        this.THREEModel.add( textMesh );
    }
}
/**
 * Created by jongabilondo on 14/11/2017.
 */

class ORG3DCPUUsageBarChart {

    constructor( barSize ) {

        this._barSize = barSize;
        this._barCount = 0;
        this._THREEGroup = new THREE.Group();

    }

    get THREEModel() {

        return this._THREEGroup;

    }

    set position( position ) {

        if ( this._THREEGroup ) {
            this._THREEGroup.position.copy( position );
        }

    }

    usageUpdate( usageData ) {

        const usagePercent = parseFloat( usageData["CPUUsage"] ) / 100;
        this._createBar( usagePercent );

    }

    _createBar( usagePercent ) {

        const kColor = 0xFFEEFF;
        const kMetalness = 0.7;
        const kBarHeight = this._barSize.y * usagePercent;
        const kBarGap = 0.0005;

        var geometry = new THREE.CubeGeometry( this._barSize.x, kBarHeight ,this._barSize.z );
        var material = new THREE.MeshStandardMaterial( {color: kColor, metalness: kMetalness} );
        var bar = new THREE.Mesh( geometry, material );
        bar.translateX( - ( (this._barCount * this._barSize.x) + ( kBarGap * (this._barCount - 1))) );
        bar.translateY( kBarHeight / 2.0 );
        this._THREEGroup.add( bar );
        this._THREEGroup.translateX( this._barSize.x + kBarGap);
        this._barCount++;

    }
}
/**
 * Created by jongabilondo on 18/05/2017.
 */

/**
 * Class to simulate a location+altitude sensor. It does not generate the data by itself, other services like Map (LocationProvider) feed this class with the location data.
 * This class is in charge of passing the location data to the connected devices.
 */
class ORGLocationManager extends ORGLocationProvider {

    constructor() {
        super();

        this._location = null;
        this._address = null;
        this._elevation = null;
    }

    get location() {
        return this._location;
    }
    get address() {
        return this._address;
    }
    get elevation() {
        return this._elevation;
    }

    /**
     * Delegate function to be called to inform the manager of his new location data.
     * It backs up the data and passes the information the connected device.
     * @param location
     * @param address
     * @param elevation
     */
    locationUpdate(location, address, elevation) {
        this._location = location;
        this._address = address;
        this._elevation = elevation;

        if (ORG.deviceController) {
            ORG.deviceController.sendLocationUpdate( location.lat(), location.lng());

            //const msg = ORGMessageBuilder.locationUpdate( location, elevation );
            //ORG.deviceController.sendMessage(msg);
        }

        this._broadcastLocation(location, address, elevation);
    }
}
/**
 * Created by jongabilondo on 20/07/2017.
 */

class ORGFluxStore extends FluxUtils.Store {

    __onDispatch(payload) {
        switch (payload.actionType) {

            case 'screenshot-update': {
                ORG.scene.setScreenshotImage(payload.image);
            } break;

            case 'beacon-selected' : {
                ORG.scene.showHideBeaconTransformControls(payload.beacon);
            } break;

            case 'device-info-update': {
                ORG.UI.deviceNameLabel.text(payload.device.name);
                ORG.UI.deviceSystemVersionLabel.text(payload.device.systemVersion);
                ORG.UI.deviceModelLabel.text(payload.device.productName);
            } break;

            case 'app-info-update': {
                ORG.UI.testAppNameLabel.text(payload.app.name );
                ORG.UI.testAppVersionLabel.text(payload.app.version );
                ORG.UI.testAppBundleIdLabel.text(payload.app.bundleIdentifier );
            } break;

            case 'device-orientation-changed': {
                if (ORG.device) {
                    ORG.device.orientation = payload.orientation;
                }
                if (ORG.scene) {
                    ORG.scene.setDeviceOrientation(payload.orientation);
                }
            } break;

            //************************************************************
            // JSON UI TREE
            //************************************************************

            case 'ui-json-tree-update': {
                ORG.UIJSONTreeManager.update(payload.tree, payload.treeType);
            } break;
            //case 'ui-tree-refresh': {
            //    bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Getting UI tree information...</div>' }); // Progress alert
            //    ORG.deviceController.refreshUITree();
            //} break;
            case 'uitree-node-selected': {
                $('#ui-json-tree-node').html(payload.html);
            } break;
            case 'uitree-node-enter': {
                ORG.scene.highlightUIElement(payload.node);
            } break;
            case 'uitree-node-leave': {
                ORG.scene.highlightUIElement(null);
            } break;


            //************************************************************
            // 3D UI TREE
            //************************************************************
            case 'uitree-expanded': {
                ORG.UI.sliderTreeLayersRange.bootstrapSlider('setAttribute', 'min', 0);
                ORG.UI.sliderTreeLayersRange.bootstrapSlider('setAttribute', 'max', payload.ui_tree.layerCount);
                ORG.UI.sliderTreeLayersRange.bootstrapSlider('setValue', payload.ui_tree.layerCount);
            } break;
            case 'uitree-layer-range-change': {
                ORG.scene.setExpandedTreeLayersVisibleRange(payload.value );
            } break;
            case 'uitree-layer-spacing-change': {
                ORG.scene.setExpandedTreeLayersDistance(payload.value );
            } break;


            //************************************************************
            // LOCATION
            //************************************************************
            case 'itinerary-location-update': {
                ORG.map.updateItineraryLocation(payload.lat, payload.lng);
            } break;
            case 'start-location-update': {
                $('#label-lat').text(payload.lat);
                $('#label-lng').text(payload.lng);
                if (payload.elevation) {
                    $('#label-altitude').text(payload.elevation + "m");
                }
                if (payload.address) {
                    ORG.UI.startPoint.val(payload.address);
                }
            } break;
            case 'end-location-update': {
                $('#label-lat-end').text(payload.lat);
                $('#label-lng-end').text(payload.lng);
                if (payload.elevation) {
                    $('#label-altitude-end').text(payload.elevation + "m");
                }
                ORG.UI.endPoint.val(payload.address);
            } break;
            case 'reset-itinerary' : {
                $('#label-lat').text("");
                $('#label-lng').text("");
                $('#label-lat-end').text("");
                $('#label-lng-end').text("");
                $('#label-altitude').text("");
                $('#label-distance').text("");
                $('#label-duration').text("");
                ORG.UI.startPoint.val("");
                ORG.UI.endPoint.val("");
            } break;
            case 'itinerary-changed' : {
                $('#label-distance').text(payload.distance + "m");
                $('#label-duration').text(payload.duration + "s");
                ORG.UI.startPoint.val(payload.start_address);
                ORG.UI.endPoint.val(payload.end_address);
                $('#label-lat').text(payload.start_location.lat());
                $('#label-lng').text(payload.start_location.lng());
                $('#label-lat-end').text(payload.end_location.lat());
                $('#label-lng-end').text(payload.end_location.lng());
            } break;

            //************************************************************
            // DEVICE CONNECTIONS
            //************************************************************
            case 'device-disconnect': {
                ORG.scene.handleDeviceDisconnection();  // ORGWebSocketDelegate is not getting called onClose, at least within a reasonable time. Let's update the UI here.
                if ( ORG.systemInfoManager ) {
                    ORG.systemInfoManager.stop();
                }
                ORG.deviceController = null;
                ORG.device = null;
                ORG.testApp = null;

                ORG.UI.connectButton.text("Connect");
                ORG.UI.buttonExpand.text("Expand");
                ORG.UI.deviceNameLabel.text('');
                ORG.UI.deviceSystemVersionLabel.text('');
                ORG.UI.deviceModelLabel.text('');
                ORG.UI.testAppBundleIdLabel.text('');
                ORG.UI.testAppNameLabel.text('');
                ORG.UI.testAppVersionLabel.text('');
                ORG.UIJSONTreeManager.remove();
            } break;
            case 'session-open' :
            case 'websocket-open' : {
                ORG.UI.connectButton.text("Disconnect");
            } break;
            case 'wda-session-open-error' : {
                bootbox.alert({
                    title: "Could not connect to device.",
                    message: "1. Connect the device.<br/>2. The WebDriverAgent must be running on your device.<br/>3. On USB connection, a localport at 8100 must be opened (iproxy 8100 8100)."
                });
            } break;
            case 'ws-session-open-error' : {
                bootbox.alert({
                    title: "Could not connect to device.",
                    message: "1. Connect the device.<br/>2. The iOS application enabled for Organismo must be front.<br/>3. On USB connection, a localport at 5567 must be opened (iproxy 5567 5567)."
                });
            } break;
            case 'wda-session-closed' :
            case 'websocket-closed' : {
                ORG.UI.connectButton.text("Connect");
                ORG.UI.buttonExpand.text("Expand");
                ORG.UI.deviceNameLabel.text('');
                ORG.UI.deviceSystemVersionLabel.text('');

                if (payload.code == 1006) {
                    if (payload.deviceController == "ORGDeviceController") {
                        bootbox.alert({
                            title: "Could not connect to device.",
                            message: "1. Connect the device.<br/>2. The iOS application enabled for Organismo must be front.<br/>3. On USB connection, a localport at 5567 must be opened (iproxy 5567 5567)."
                        })
                    } else {
                        bootbox.alert("Error connecting to idevicecontrolproxy.\nMake sure the proxy is running.\nRead about it @ https://github.com/JonGabilondoAngulo/idevicecontrolproxy");
                    }
                }
            }
        }

    }
}
/**
 * Created by jongabilondo on 14/08/2017.
 */

ORG.SplitterResize	= function(paneSep, contentPanel, leftPane, rightPane, scene) {

    const kSplitterWidth = paneSep.offsetWidth;

    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    const kLeftLimit = 10;
    const kRightLimit = 90;


    paneSep.sdrag( (el, pageX, startX, pageY, startY, fix) => {

        fix.skipX = true;

        if (pageX < window.innerWidth * kLeftLimit / 100) {
            pageX = window.innerWidth * kLeftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * kRightLimit / 100) {
            pageX = window.innerWidth * kRightLimit / 100;
            fix.pageX = pageX;
        }

        //const xOffset = pageX-startX;

        //var cur = pageX / window.innerWidth * 100;
        //if (cur < 0) {
        //    cur = 0;
        //}
        //if (cur > window.innerWidth) {
        //    cur = window.innerWidth;
        //}

        const contentRect = contentPanel.getBoundingClientRect();
        const leftPanelWidth = pageX + kSplitterWidth/2.0;
        const rightPanelWidth = contentRect.width - leftPanelWidth - 20;
        const sceneWidth = leftPanelWidth - kSplitterWidth/2.0 - 15 - 11;
        leftPane.style.width = leftPanelWidth + 'px';
        rightPane.style.width = rightPanelWidth + 'px';

        scene.resize({width:sceneWidth, height:scene.sceneSize.height});

    }, null, 'horizontal');

}

// This helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//

ORG.WindowResize	= function(renderer, camera, canvas, contentPanel, leftPanel, rightPanel) {

	let callback	= function() {

		// Canvas
        const rect = canvas.getBoundingClientRect();
		const canvasTopOffset = rect.top;
		const canvasBottomOffset = 6;
		const canvasHeight = window.innerHeight - canvasTopOffset - canvasBottomOffset;
        canvas.style.height = canvasHeight  + 'px'; //otherwise the canvas is not adapting to the renderer area

		// Right Panel
        const contentRect = contentPanel.getBoundingClientRect();
        const leftPanelRect = leftPanel.getBoundingClientRect();
        const rightPanelWidth = contentRect.width - leftPanelRect.width - 20;
        rightPanel.style.width = rightPanelWidth + 'px';

        //// Renderer & Camera
        renderer.setSize( canvas.offsetWidth, canvasHeight);
        camera.aspect = canvas.offsetWidth / canvasHeight;
		camera.updateProjectionMatrix();

		// UI Tree
        document.getElementById('ui-json-tree').style.height = canvasHeight-115 + 'px';
        document.getElementById('ui-json-tree-node').style.height = canvasHeight-60 + 'px';
	}

	//callback(); // ugly to provoke resize now

	// bind the resize event
	window.addEventListener('resize', callback, false);

	// return .stop() the function to stop watching window resize
	return {
        resize	: function(){
            callback();
        }
        //stop	: function(){
        //    window.removeEventListener('resize', callback);
        //}
	};
}



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

    //google.charts.load('current', {'packages' : ['columnchart']});
    //google.charts.setOnLoadCallback(function() { sendAndDraw('') });

    // System Info manager
    ORG.systemInfoManager = new ORGSystemInfoManager(ORG.scene);

    // UI JSON Tree
    ORG.UIJSONTreeManager = new ORGUIJSONTreeManager(document.getElementById('ui-json-tree'), document.getElementById('ui-json-tree-node'));
    ORG.UIJSONTreeContextMenuManager = new ORGUITreeContextMenuManager('#ui-json-tree');

    // Install handler for Window Resize
    let resizer = ORG.WindowResize( ORG.scene.THREERenderer, ORG.scene.THREECamera, ORG.canvasDomElem, ORG.contentWrapper, ORG.leftSection, ORG.rightSection);
    resizer.resize();

} );




/**
 * Created by jongabilondo on 20/09/2016.
 */

ORG.UI.connectButton = $('#connect-button');
//ORG.UI.connectDriversMenu = $('#connect-drivers-menu');
ORG.UI.deviceNameLabel = $('#device-name-label');
ORG.UI.deviceSystemVersionLabel = $('#device-system-version-label');
ORG.UI.deviceModelLabel = $('#device-model-label');
ORG.UI.testAppNameLabel = $('#testapp-name-label');
ORG.UI.testAppVersionLabel = $('#testapp-version-label');
ORG.UI.testAppBundleIdLabel = $('#testapp-bundleid-label');
ORG.UI.dropdownDriver = $('#selected'); // the button that holds the text

$(".dropdown-menu a").click(function () {
        $(this).parents(".btn-group").children(":first").text($(this).text())
        $(this).parents(".btn-group").children(":first").val($(this).data("value"))

        switch ($(this).text()) {
            case "WDA": {
                $('#device-port').val('8100')
            } break
            case "Organismo": {
                $('#device-port').val('5567')
            } break
        }
    }
)

ORG.UI.connectButton.click(function() {
    ORGActionsCenter.connect($('#device-url').val(), $('#device-port').val());
});


// Settings UI Controls

ORG.UI.checkButtonShowFloor = $('#show-floor');
ORG.UI.checkButtonShowDevice = $('#show-device');
ORG.UI.checkButtonShowLocation = $('#show-location');
ORG.UI.checkButtonShowSystemInfo = $('#show-system-info');
ORG.UI.checkButtonShowTextures = $('#show-textures');
ORG.UI.checkButtonShowInteractive = $('#show-interactive');
ORG.UI.checkButtonShowNonInteractive = $('#show-non-interactive');
ORG.UI.checkButtonShowPrivate = $('#show-private');
ORG.UI.checkButtonShowTooltips = $('#show-tooltips');
ORG.UI.checkButtonLiveScreen = $('#live-screen');
ORG.UI.checkButtonShowHiddenViews = $('#show-hidden-views');
ORG.UI.checkButtonShowNormalWindow = $('#show-normal-window');
ORG.UI.checkButtonShowKeyboardWindow = $('#show-keyboard-window');
ORG.UI.checkButtonShowAlertWindow = $('#show-alert-window');
ORG.UI.buttonExpand = $('#expand-button');
ORG.UI.buttonResetCamera = $('#reset-camera-button');
ORG.UI.buttonRotateDevice = $('#rotate-device-button');
ORG.UI.buttonTranslateDevice = $('#translate-device-button');
ORG.UI.buttonItineraryStart = $('#itinerary-run');
ORG.UI.buttonItineraryStop = $('#itinerary-stop');
ORG.UI.buttonItineraryPause = $('#itinerary-pause');
ORG.UI.buttonItineraryResume = $('#itinerary-resume');
ORG.UI.buttonSendLocation = $('#button-send-location');
ORG.UI.buttonAddBeacon = $('#button-add-beacon');
ORG.UI.startPoint = $('#start-point');
ORG.UI.endPoint = $('#end-point');
ORG.UI.dropdownTravelMode = $('#travel-mode-dropdown');
ORG.UI.sliderTreeLayersDistance = $('#ex1');
ORG.UI.sliderTreeLayersRange = $('#ex2');
ORG.UI.refreshUITree = $('#ui-tree-refresh');

// UI Tree
ORG.UI.refreshUITree.click( () => {
    ORGActionsCenter.refreshUITree()
})

// Sliders
ORG.UI.sliderTreeLayersDistance.bootstrapSlider();
ORG.UI.sliderTreeLayersRange.bootstrapSlider();

ORG.UI.sliderTreeLayersDistance.on("slide", function(slideEvt) {
    ORG.dispatcher.dispatch({
        actionType: 'uitree-layer-spacing-change',
        value: slideEvt.value
    });
});

ORG.UI.sliderTreeLayersRange.on("slide", function(slideEvt) {
    ORG.dispatcher.dispatch({
        actionType: 'uitree-layer-range-change',
        value: slideEvt.value
    });
});

// Map
ORG.UI.buttonResetItinerary = $('#reset-itinerary');


ORG.UI.checkButtonShowDevice.change(function () {
    ORG.scene.flagShowDevice3DModel = $(this).is(':checked');
    if (ORG.scene.flagShowDevice3DModel) {
        ORGActionsCenter.showDevice3DModel();
    } else {
        ORGActionsCenter.hideDevice3DModel();
    }
});

ORG.UI.checkButtonShowSystemInfo.change(function () {
    if ($(this).is(':checked') === true) {
        ORG.systemInfoManager.start();
    } else {
        ORG.systemInfoManager.stop();
    }
});

ORG.UI.checkButtonShowFloor.change(function () {
    if ($(this).is(':checked') === true) {
        ORG.scene.createFloor();
    } else {
        ORG.scene.removeFloor();
    }
});

ORG.UI.checkButtonShowLocation.change(function () {
    if ($(this).is(':checked') === true) {
        ORG.scene.enableShowLocation();
    } else {
        ORG.scene.disableShowLocation();
    }
});

ORG.UI.checkButtonShowTextures.change(function () {
    ORG.scene.flagShowScreenshots = $(this).is(':checked');
});

ORG.UI.checkButtonShowInteractive.change(function () {
    ORG.scene.flagShowInteractiveViews = $(this).is(':checked');
});

ORG.UI.checkButtonShowNonInteractive.change(function () {
    ORG.scene.flagShowNonInteractiveViews = $(this).is(':checked');
});

ORG.UI.checkButtonShowPrivate.change(function () {
    ORG.scene.flagShowPrivateClasses = $(this).is(':checked');
});

ORG.UI.checkButtonShowTooltips.change(function () {
    ORG.scene.showTooltips($(this).is(':checked'));
});

ORG.UI.checkButtonShowHiddenViews.change(function () {
    ORG.scene.flagShowHiddenViews = $(this).is(':checked');
});

ORG.UI.checkButtonLiveScreen.change(function () {
    ORG.scene.setLiveScreen($(this).is(':checked'));
});

ORG.UI.checkButtonShowNormalWindow.change(function () {
    ORG.scene.setShowNormalWindow($(this).is(':checked'));
});
ORG.UI.checkButtonShowKeyboardWindow.change(function () {
    ORG.scene.flagShowKeyboardWindow = $(this).is(':checked');
});
ORG.UI.checkButtonShowAlertWindow.change(function () {
    ORG.scene.setShowAlertWindow($(this).is(':checked'));
});

ORG.UI.buttonResetCamera.click(function () {
    ORG.scene.resetCameraPosition();
});

ORG.UI.buttonRotateDevice.click(function () {
    ORG.scene.showHideDeviceTransformControls("rotate");
});

ORG.UI.buttonTranslateDevice.click(function () {
    ORG.scene.showHideDeviceTransformControls("translate");
});

ORG.UI.buttonAddBeacon.click(function () {
    ORG.scene.addBeacon();
});

ORG.UI.buttonExpand.click(function () {
    if (!ORG.deviceController.isConnected) {
        return;
    }
    if (ORG.deviceController.type === "WDA") {
        alert("Not implemented for WDA driver.")
        return;
    }
    if (ORG.scene.isExpanded) {
        ORG.UI.buttonExpand.text("Expand");
        ORGActionsCenter.collapseScreenUI();
    } else {
        ORG.UI.buttonExpand.text("Collapse");
        ORGActionsCenter.expandScreenUI();
    }
});

ORG.UI.buttonResetItinerary.click(function () {
    ORG.map.resetItinerary();
});
ORG.UI.buttonItineraryStart.click(function () {
    ORG.map.run();
});
ORG.UI.buttonItineraryStop.click(function () {
    ORG.map.stop();
});
ORG.UI.buttonItineraryPause.click(function () {
    ORG.map.pause();
});
ORG.UI.buttonItineraryResume.click(function () {
    ORG.map.resume();
});

ORG.UI.buttonSendLocation.click(function() {
    ORG.map.sendStartLocationToDevice();
});
/**
 * Created by jongabilondo on 15/05/2017.
 */

/**
 * Wrapper class to create and handle the 3D location marker and the 3D description text in the 3D scene.
 */
class ORG3DLocationMarker {

    constructor(anchorPoint, text, threeScene) {
        this._kCoreAnimationScale = 0.3;
        this._kCoreAnimationTime = 1000; //ms
        this._descriptor = null;
        this._marker = null;

        this._anchorPoint = anchorPoint;
        this._THREEScene = threeScene;

        this._marker = this._createMarker(this._anchorPoint);
        this._THREEScene.add(this._marker);

        this.updateDescriptor(text);

        this._scaleDown().start();
    }

    destructor() {
        this._removeMarker();
        this._removeDescriptor();
    }

    updateDescriptor(text) {
        if (!this._THREEScene) {
            return;
        }
        this._removeDescriptor();
        this._descriptor = this._createDescriptor(text);
        this._THREEScene.add(this._descriptor);
    }

    setPosition(position) {
        if (this._marker) {
            this._marker.position.copy(position);
        }
        this._placeDescriptor(this._descriptor);
    }


    //------------
    // PRIVATE
    //-------------

    _createMarker(anchorPoint) {
        const kRadiusTop = 0.01;
        const kRadiusBottom = kRadiusTop;
        const kHeight = kRadiusTop * 0.3;
        const kRadialSegments = 30;
        const kHeightSegments = 1;
        const kOpenEnded = false;
        const cylinderGeo = new THREE.CylinderGeometry(kRadiusTop, kRadiusBottom, kHeight, kRadialSegments, kHeightSegments, kOpenEnded);
        let material = new THREE.MeshPhongMaterial({ color: 0x0000ee });
        material.side = THREE.DoubleSide;
        //let marker = THREE.SceneUtils.createMultiMaterialObject(cylinderGeo, [meshMaterial]);
        let marker = new THREE.Mesh(cylinderGeo, material);
        marker.position.copy(anchorPoint);
        return marker;
    }

    _createDescriptor(address) {
        const kFontSize = 0.01;
        const kFontHeight = kFontSize * 0.2;
        const kBevelThickness = kFontSize * 0.1;
        const kBevelSize = kFontSize * 0.1;
        const addressGeom = new THREE.TextGeometry(address, {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: kBevelThickness,
            bevelSize: kBevelSize,
            bevelSegments: 5
        });

        const material = new THREE.MeshPhongMaterial({color: 0xeeeeee});
        const textMesh = new THREE.Mesh(addressGeom, material);
        this._placeDescriptor(textMesh);
        return textMesh;
    }

    _removeMarker() {
        if (this._THREEScene && this._marker) {
            this._THREEScene.remove(this._marker);
            this._marker = null;
        }
    }

    _removeDescriptor() {
        if (this._THREEScene && this._descriptor) {
            this._THREEScene.remove(this._descriptor);
            this._descriptor = null;
        }
    }

    _placeDescriptor(textMesh) {
        if (this._marker && textMesh) {
            this._marker.geometry.computeBoundingBox();
            const markerRadius = this._marker.geometry.boundingBox.getSize().z;

            //textMesh.position.set( 0, 0, 0 );
            textMesh.updateMatrix();
            textMesh.geometry.computeBoundingBox();
            const textSizeX = textMesh.geometry.boundingBox.getSize().x;
            textMesh.position.set(
                this._marker.position.x - textSizeX/2,
                this._marker.position.y,
                this._marker.position.z + markerRadius + textMesh.geometry.boundingBox.getSize().y);
            textMesh.rotation.set(THREE.Math.degToRad( -90 ), 0, 0);
        }
    }

    _scaleUp() {
        if (!this._marker) {
            return null;
        }
        const _this = this;
        return new TWEEN.Tween(this._marker.scale).to ({
            x : 1,
            y : 1,
            z : 1
        }, this._kCoreAnimationTime).onUpdate( () => {
            //
        }).onComplete( () => {
            let tween = _this._scaleDown();
            if (tween) {
                tween.start();
            }
        })
    }

    _scaleDown() {
        if (!this._marker) {
            return null;
        }
        const _this = this;
        return new TWEEN.Tween(this._marker.scale).to ({
            x : this._kCoreAnimationScale,
            y : 1,
            z : this._kCoreAnimationScale
        }, this._kCoreAnimationTime).onUpdate( function()  {
            //
        }).onComplete( function()  {
            let tween = _this._scaleUp();
            if (tween) {
                tween.start();
            }
        })
    }
}
/**
 * Created by jongabilondo on 20/07/2017.
 */


class ORGItinerary {

    constructor(route, elevations, startLocation, endLocation) {
        this._startLocation = startLocation;
        this._endLocation = endLocation;
        //this._startLocationAddress = null;
        //this._endLocationAddress = null;
        this._duration = 0;
        this._polyline = this._calculateRoutePolyline(route);
        this._length = google.maps.geometry.spherical.computeLength(this._polyline.getPath().getArray());
        this._elevations = elevations;
        this._startDate = null;
        this._mode = null;
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    get startlocation() {
        return this._startLocation;
    }

    get endLocation() {
        return this._endLocation;
    }

    //get startLocationAddress() {
    //    return this._startLocationAddress;
    //}
    //
    //get endLocationAddress() {
    //    return this._endLocationAddress;
    //}

    get duration() {
        return this._duration;
    }

    get length() {
        return this._length;
    }

    get polyline() {
        return this._polyline;
    }

    get elevations() {
        return this._elevations;
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _calculateRoutePolyline(route) {

        var totalDistance = 0;
        var totalDuration = 0;
        const legs = route.legs;

        var routePoly = new google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
        });
        for (let i = 0; i < legs.length; ++i) {
            totalDistance += legs[i].distance.value;
            totalDuration += legs[i].duration.value;

            const steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
                let nextSegment = steps[j].path;
                for (let k = 0; k < nextSegment.length; k++) {
                    routePoly.getPath().push(nextSegment[k]);
                }
            }
        }
        return routePoly;
    }
}
/**
 * Created by jongabilondo on 23/07/2017.
 */

class ORGItineraryLocation {

    constructor(routePolyline, elevations, routeLength) {
        this._routePolyline = routePolyline;
        this._elevations = elevations;
        this._routeTotalDistance = routeLength;
        this._lastLocation = null;
        this._lastLocationTime = 0;
        this._currentLocation = null;
        this._distance = 0;
        this._speed = 0;
    }

    //------------------------------------------------------------------------------------------------------------------
    // GET/SET
    //------------------------------------------------------------------------------------------------------------------

    set distance(distance) {
        const nowTime = new Date().getTime()/1000; // seconds

        if (this._lastLocationTime > 0) {
            const timeDelta = nowTime - this._lastLocationTime;
            const distanceDelta = distance - this._distance;
            this._speed = distanceDelta/timeDelta;
        }

        this._distance = distance;
        this._lastLocation = this._currentLocation;
        this._currentLocation = this._routePolyline.GetPointAtDistance(this._distance);
        this._lastLocationTime = nowTime;
    }

    get distance() {
        return this._distance;
    }

    get location() {
        return this._currentLocation;
    }

    get course() {
        return this._bearing( this._lastLocation, this._currentLocation);
    }

    get speed() {
        return this._speed;
    }

    get elevation() {
        var elevation = 0;

        if (this._elevations) {
            var intervalDistance = this._routeTotalDistance / this._elevations.length;
            const intervalIndexLeft = Math.floor(  this._distance / intervalDistance);
            const intervalIndexRight = Math.ceil(  this._distance / intervalDistance);
            if (intervalIndexRight >= this._elevations.length) {
                elevation = this._elevations[intervalIndexLeft].elevation;
            } else {
                const elevationLeft = this._elevations[intervalIndexLeft].elevation;
                const elevationRight = this._elevations[intervalIndexRight].elevation;
                const locationLeft = this._elevations[intervalIndexLeft].location;
                const locationRight = this._elevations[intervalIndexLeft].location;
                intervalDistance = locationRight.distanceFrom(locationLeft);
                if (intervalDistance > 0) {
                    const intervalRunnedDistance = this._currentLocation.distanceFrom(locationLeft);
                    elevation = elevationLeft + ((elevationRight - elevationLeft) * (intervalRunnedDistance/intervalDistance));
                } else {
                    elevation = elevationLeft;
                }
            }
        }
        return elevation;
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _bearing(fro, to) {
        if (from == null || to == null) {
            return 0;
        }

        // to rad
        const lat1 = from.lat()* Math.PI / 180;
        const lon1 = from.lng()* Math.PI / 180;
        const lat2 = to.lat()* Math.PI / 180;
        const lon2 = to.lng()* Math.PI / 180;

        // Compute the angle.
        let angle = - Math.atan2( Math.sin( lon1 - lon2 ) * Math.cos( lat2 ), Math.cos( lat1 ) * Math.sin( lat2 ) - Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( lon1 - lon2 ) );
        if ( angle < 0.0 )
            angle  += Math.PI * 2.0;

        //if (angle == 0) {crash;}
        //console.log("angle :" + angle);
        return angle * (180/Math.PI); // to deg.
    }
}

/**
 * Created by jongabilondo on 20/07/2017.
 */

ORG.RunnerState = {
    IDLE : "idle",
    RUNNING : "running",
    PAUSED : "paused"};

class ORGItineraryRunner extends ORGLocationProvider {

    constructor(itinerary) {
        super();

        this._itinerary = itinerary;
        this._state = ORG.RunnerState.IDLE;
        this._stepDelta = 5; // m
        this._nextStepDistance = 0;
        this._itineraryLocation = new ORGItineraryLocation(this._itinerary.polyline, this._itinerary.elevations, this._itinerary._length);
    }

    //------------------------------------------------------------------------------------------------------------------
    // PUBLIC
    //------------------------------------------------------------------------------------------------------------------

    start() {
        const distance = 0;
        const startDelay = 2*1000;
        this._nextStepDistance = 0;
        this._state = ORG.RunnerState.RUNNING;
        this._executeRunSimulationWithDelay(distance, this._stepDelta, startDelay);
    }

    stop() {
        this._state = ORG.RunnerState.IDLE;

    }

    pause() {
        this._state = ORG.RunnerState.PAUSED;

    }

    resume() {
        this._state = ORG.RunnerState.RUNNING;
        this._executeRunSimulationWithDelay(this._nextStepDistance, this._stepDelta, 50);
    }

    //------------------------------------------------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------------------------------------------------

    _executeRunSimulationWithDelay(distance, stepDelta, delay) {
        const self = this;
        var runSimulationFunction = function() {
            self._runSimulation(distance, stepDelta);
        }
        setTimeout( runSimulationFunction, delay);
    }

    _runSimulation(distance, stepDelta) {

        if (distance > this._itinerary.length) {
            return;
        }
        if (this._state == ORG.RunnerState.IDLE) {
            return;
        }
        if (this._state == ORG.RunnerState.PAUSED) {
            return;
        }

        this._itineraryLocation.distance = distance;
        const location = this._itineraryLocation.location;
        const elevation = this._itineraryLocation.elevation;

        this._broadcastLocation(location, null, elevation); // inform whoever is interested

        // dispatch to update UI
        ORG.dispatcher.dispatch({
            actionType: 'itinerary-location-update',
            lat: location.lat(),
            lng: location.lng(),
            elevation: elevation
        });


        // continue to next step unless reached the end
        this._nextStepDistance = distance + stepDelta;
        if (this._nextStepDistance <= this._itinerary.length) {
            this._executeRunSimulationWithDelay(this._nextStepDistance, stepDelta, 100);
        }
    }


}
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
/**
 * Created by jongabilondo on 19/01/2018.
 */


/***
 * A wrapper base class to a UI tree element. Gives a 3D context functionalities to a UI tree element node.
 * Do not instance this class, use subclasses.
 */
class ORG3DUIElement {

    /***
     *
     * @param elementNode. The JSON object describing the UI element, the one in the UI tree. Could be WDA/Org...
     */
    constructor(elementNode) {
        this._element = elementNode;
    }

    get elementJSON() {
        return this._element;
    }

    get bounds() {
        throw new Error("Subclasses must override this method.");
    }

    get hasSize() {
        throw new Error("Subclasses must override this method.");
    }

    /***
     * Calculates the Box2 of the element in the given device screen.
     * @param device. The ORGDevice of the connected device.
     * @param deviceScreen. ORG3DDeviceScreen.
     * @return THREE.Box2 with the bounds of the element in the screen.
     */
    getBoundsInDeviceScreen(device, deviceScreen) {
        const deviceDisplaySize = device.displaySizeWithOrientation;
        const deviceDisplayScale = device.displayScale;
        const deviceScreenSize = device.screenSizeWithOrientation; // In points
        const screenPlanePosition = deviceScreen.screenWorldPosition; // in world coordinates
        const elementBounds = this.bounds; // In points

        // Attention. In iOS the 0,0 is at top left of screen

        var elementBox2 = new THREE.Box2(
            new THREE.Vector2( elementBounds.left * deviceDisplayScale.x, (deviceScreenSize.height - elementBounds.bottom) * deviceDisplayScale.y),
            new THREE.Vector2( elementBounds.right * deviceDisplayScale.x, (deviceScreenSize.height - elementBounds.top) * deviceDisplayScale.y));
        elementBox2.translate( new THREE.Vector2( - ( deviceDisplaySize.width / 2.0 ), - ( deviceDisplaySize.height / 2.0 ))); // translate relative to center 0,0
        elementBox2.translate( new THREE.Vector2( screenPlanePosition.x , screenPlanePosition.y )); // translate to device location

        return elementBox2;
    }

}
/**
 * Created by jongabilondo on 25/01/2018.
 */


class ORG3DWDAUIElement extends ORG3DUIElement {

    get bounds() {
        return {
            left: this.elementJSON.rect.x,
            top: this.elementJSON.rect.y ,
            bottom: this.elementJSON.rect.y + this.elementJSON.rect.height,
            right: this.elementJSON.rect.x + this.elementJSON.rect.width};
    }

    get hasSize() {
        const bounds = this.bounds;
        return (bounds.right - bounds.left) > 0 && (bounds.bottom - bounds.top) > 0;
    }

}
/**
 * Created by jongabilondo on 25/01/2018.
 */


class ORG3DORGUIElement extends ORG3DUIElement {

    get bounds() {
        return this.elementJSON.bounds;
    }

    get hasSize() {
        const bounds = this.bounds;
        return (bounds.right - bounds.left) > 0 && (bounds.bottom - bounds.top) > 0;
    }

}
/**
 * Created by jongabilondo on 02/12/2017.
 */

class ORGUIJSONTreeManager {

    constructor(placeholder, nodePlaceholder) {
        this._treePlaceholder = placeholder;
        this._nodePlaceholder = nodePlaceholder;
        this._treeAdaptor = null;
        this._treeType = null;
    }

    update(jsonTree, treeType) {
        if (treeType === undefined) {
            console.debug('Tree update requested but type undefined.');
            return;
        }

        this._treeType = treeType;
        switch (treeType) {
            case ORGUIJSONTreeManager.TREE_TYPE_WDA : {
                this._treeAdaptor =  ORGUIJSONWDATreeAdaptor;
            } break;
            case ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO : {
                this._treeAdaptor = ORGUIJSONOrganismoTreeAdaptor;
            } break;
            default : {
                return;
            }
        }

        if (jsonTree == null) {
            this.remove();
            return;
        }

        let adaptedTree = this._treeAdaptor.adaptTree(jsonTree);
        let _this = this;
        $(this._treePlaceholder).treeview({
            data: adaptedTree,
            levels: 15,
            showBorder:false,
            expandIcon:'glyphicon glyphicon-triangle-right',
            collapseIcon:'glyphicon glyphicon-triangle-bottom',
            onNodeSelected: (event, node) => { _this._nodeSelected(event, node);},
            onNodeEnter: (event, node) => { _this._nodeEnter(event, node);},
            onNodeLeave: (event, node) => { _this._nodeLeave(event, node);},
            onNodeContextMenu: (event, node) => { _this._nodeContextMenu(event, node);}
        } );
    }

    remove() {
        $(this._treePlaceholder).treeview('remove');
        $(this._nodePlaceholder).html("");
    }

    nodeParent(node) {
        let parents = $(this._treePlaceholder).treeview('getParents', [node]);
        return (parents.length ?parents[0] :null);
    }

    nodeSiblings(node) {
        let siblings = $(this._treePlaceholder).treeview('getSiblings', node);
        return siblings;
    }

    tree() {
        return $(this._treePlaceholder).treeview('getTree');
    }

    rootNodes() {
        return $(this._treePlaceholder).treeview('getRootNodes');
    }

    showClassHierarchy(classHierarchy) {
        var html = "<h4><b>" + "Hierarchy" + "</b></h4>";

        for (let className of classHierarchy) {
            html += '<div style="text-align: center;"><h4><span class="label label-primary text-center">' + className + '</span></h4></div>';
        }
        $(this._nodePlaceholder).html(html);
    }

    _nodeSelected(event, node) {
        const nodeHTMLData = this._treeAdaptor.nodeToHTML(node.representedNode);
        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-selected',
            node:node.representedNode,
            html:nodeHTMLData
        });
    }

    _nodeEnter(event, node) {
        var node3DElement = null;

        if (node  && !node.representedNode) {
            console.debug("The mouseover tree node has no data !");
            return;
        }

        switch (this._treeType) {
            case ORGUIJSONTreeManager.TREE_TYPE_WDA : {
                node3DElement = new ORG3DWDAUIElement(node.representedNode);
            } break;
            case ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO : {
                node3DElement = new ORG3DORGUIElement(node.representedNode);
            } break;
            default : {
                return;
            }
        }

        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-enter',
            node:node3DElement
        });
    }

    _nodeLeave(event, node) {
        ORG.dispatcher.dispatch({
            actionType: 'uitree-node-leave'
        });
    }

    _nodeContextMenu(event, node) {
        //event.clientX = node.clientX;
        //event.clientY = node.clientY;
        ORG.UIJSONTreeContextMenuManager.onContextMenu(event, node);
        //$('#content-wrapper').contextMenu({x:event.clientX, y:event.clientY});
    }
}

ORGUIJSONTreeManager.TREE_TYPE_WDA = 0;
ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO = 1;

/**
 * Created by jongabilondo on 23/01/2018.
 */


/***
 * Functions to adapt a WDA JSON tree to a patternfly-bootstrap-treeview.
 */
class ORGUIJSONWDATreeAdaptor {

    static adaptTree(jsonTree) {
        var newTree = [];
        if (!jsonTree) {
            return null;
        }
        for (let node of jsonTree) {
            var newNode = { representedNode:node};
            newTree.push(newNode);
            newNode.nodes = node.children;

            // Compose text for node
            newNode.text = node.type;
            if (node.label) {
                newNode.text += " - " + node.label;
            } else if (node.name) {
                newNode.text += " - " + node.name;
            } else if (node.value) {
                newNode.value += " - " + node.value;
            }

            // hidden icon
            if (node.isVisible == "0") {
                newNode.icon = 'glyphicon glyphicon-eye-close';
            }

            // subnodes
            var subTree = this.adaptTree(node.children);
            if (subTree) {
                newNode.nodes = subTree;
            }
        }
        return newTree;
    }

    static nodeToHTML(node) {
        var description = "";

        const className = node.type;
        if (className) {
            description += "<h4><b>" + className + "</b></h4>";
        }

        for (let key in node) {
            if (this.ignoreNodeKey(key)) {
                continue;
            }
            if (key == "rect") {
                description += "<b>" + key + "</b>:&nbsp" + JSON.stringify(node.rect) + "<br>";
            } else {
                description += "<b>" + key + "</b>:&nbsp" + node[key] + "<br>";
            }
        }
        description += "<br>";

        return description;
    }

    static ignoreNodeKey(key) {
        return (key == "text" || key == "state" || key == "children" || key == "nodes" || key == "$el" || key == "screenshot" || key == "nodeId" || key == "parentId");
    }
}
/**
 * Created by jongabilondo on 23/01/2018.
 */


/***
 * Functions to adapt an Organismo UI tree to a patternfly-bootstrap-treeview.
 */
class ORGUIJSONOrganismoTreeAdaptor {

    static adaptTree(jsonTree) {
        var newTree = [];
        if (!jsonTree) {
            return null;
        }
        for (let node of jsonTree) {
            var newNode = { representedNode:node};
            newTree.push(newNode);
            newNode.nodes = node.subviews;

            // Compose text for node
            newNode.text = node.class;
            if (node.accessibilityLabel) {
                newNode.text += " - " + node.accessibilityLabel;
            } else if (node.currentTitle) {
                newNode.text += " - " + node.currentTitle;
            } else if (node.text) {
                newNode.text += " - " + node.text;
            }

            // hidden icon
            if (node.hidden) {
                newNode.icon = 'glyphicon glyphicon-eye-close';
            }

            // subnodes
            var subTree = this.adaptTree(node.subviews);
            if (subTree) {
                newNode.nodes = subTree;
            }
        }
        return newTree;
    }

    static nodeToHTML(node) {
        var description = "";

        const className = node.class;
        if (className) {
            description += "<h4><b>" + className + "</b></h4>";
        }

        for (let key in node) {
            if (this.ignoreNodeKey(key)) {
                continue;
            }
            if (key == "bounds") {
                description += "<b>" + key + "</b>:&nbsp" + JSON.stringify(node.bounds) + "<br>";
            } else {
                description += "<b>" + key + "</b>:&nbsp" + node[key] + "<br>";
            }
        }
        description += "<br>";

        return description;
    }

    static ignoreNodeKey(key) {
        return (key == "text" || key == "state" || key == "subviews" || key == "nodes" || key == "$el" || key == "screenshot" || key == "nodeId" || key == "parentId");
    }

}
/**
 * Created by jongabilondo on 05/02/2018.
 */

class ORGActionsCenter {

    static connect(deviceIP, devicePORT) {

        // Disconnect if connected
        if (ORG.deviceController && ORG.deviceController.isConnected) {
            this.disconnect();
            ORG.deviceController = null;
            return;
        }

        if (deviceIP === "") {
            deviceIP = "localhost";
        }

        // Create the controller for the selected protocol.
        const driverName = ORG.UI.dropdownDriver.text().split(' ');
        if (driverName[0] === "Organismo") {
            if (! (ORG.deviceController instanceof ORGDeviceController)) {
                ORG.deviceController = new ORGDeviceController(deviceIP, devicePORT, new ORGOrganismoWSDelegate());
            }
        } else if (driverName[0] === "iDeviceControlProxy") {
            ORG.deviceController = new ORGiMobileDeviceController(deviceIP, devicePORT, new ORGiControlProxyWSDelegate());
        } else if (driverName[0] === "WDA") {
            ORG.deviceController = new ORGDeviceWDAController(deviceIP, devicePORT);
        }

        // Connect
        switch (ORG.deviceController.type) {
            case "ORG":
            case "WDA": {
                this.connectWithController(ORG.deviceController)
            }
                break
        }
    }

    static disconnect() {
        ORG.deviceController.closeSession(); // It's not equivalent to disconnecting the device. On Disconnection the device disappears. Closing session the Device stays.
        ORG.dispatcher.dispatch({
            actionType: 'device-disconnect'
        });
    }

    static async connectWithController(controller) {
        try {
            bootbox.dialog({ closeButton: false, message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Connecting to device ...</h4></div>' }); // Progress alert
            // 1. Open session
            let session = await controller.openSession();
            ORG.dispatcher.dispatch({
                actionType: 'session-open'
            });

            bootbox.hideAll();
            bootbox.dialog({ closeButton: false, message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Getting device information...</h4></div>' }); // Progress alert

            // 2. Get device info
            ORG.device = await controller.getDeviceInformation();
            ORG.dispatcher.dispatch({
                actionType: 'device-info-update',
                device: ORG.device
            })

            // 3. Get App info
            ORG.testApp = await controller.getAppInformation();
            ORG.dispatcher.dispatch({
                actionType: 'app-info-update',
                app: ORG.testApp
            });

            // 4. Get screenshot
            let screenshot = await controller.getScreenshot();

            // 5. Get device 3D model
            let model = null;
            if (ORG.scene.flagShowDevice3DModel) {
                model = await ORG3DDeviceModelLoader.loadDevice3DModel(ORG.device, ORG.scene, kORGDevicePositionY);
            }

            // 6. Add device with screenshot to scene
            ORG.scene.addDeviceToScene(ORG.device.displaySize, model, ORG.device.orientation)
            ORG.dispatcher.dispatch({
                actionType: 'screenshot-update',
                image: screenshot
            });

            bootbox.hideAll();

            // 7. Start getting screenshots
            if (controller.hasContinuousUpdate && ORG.scene.flagContinuousScreenshot) {
                controller.requestScreenshot();
            }

            // 8. Start getting orientation updates
            if (controller.hasOrientationUpdate) {
                controller.requestOrientationUpdates(true);
            }

            // 9. Enable location updates (location related updates coming from the device)
            if (controller.hasLocationUpdate) {
                controller.requestLocationUpdates(true);
            }

        } catch(err) {
            bootbox.hideAll();
            this._handleError(err);
        }
    }

    static async refreshUITree() {
        bootbox.dialog({ message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Getting device information...</h4></div>' });
        try {
            let controller = ORG.deviceController;

            // 1. Orientation
            let orientation = await controller.getDeviceOrientation();

            // 2. Tree
            let treeRequestFlags = null;
            switch (ORG.deviceController.type) {
                case "ORG" : treeRequestFlags = { "status-bar": true, "keyboard": true, "alert": true, "normal": true }; break;
            }
            let treeResponse = await controller.getElementTree(treeRequestFlags);
            let tree = treeResponse;
            switch (ORG.deviceController.type) {
                case "WDA" : tree = treeResponse.children; break; // in WDA mode we need the children array
            }
            // 3. Screenshot
            let screenshot = await controller.getScreenshot();

            ORG.dispatcher.dispatch({
                actionType: 'ui-json-tree-update',
                tree: tree,
                treeType: (ORG.deviceController.type === "WDA") ?ORGUIJSONTreeManager.TREE_TYPE_WDA :ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO
            });
            if (orientation !== ORG.device.orientation) {
                ORG.dispatcher.dispatch({
                    actionType: 'device-orientation-changed',
                    orientation: orientation
                });
            }
            ORG.dispatcher.dispatch({
                actionType: 'screenshot-update',
                image: screenshot
            });
            bootbox.hideAll();
        } catch(err) {
            bootbox.hideAll()
            this._handleError(err)
        }
    }

    static async pressHome() {
        try {
            await ORG.deviceController.sendPressHome();
        } catch(err) {
            this._handleError(err);
        }
    }
    static async lockDevice() {
        try {
            await ORG.deviceController.sendLock();
        } catch(err) {
            this._handleError(err);
        }
    }
    static async unlockDevice() {
        try {
            await ORG.deviceController.sendUnlock();
        } catch(err) {
            this._handleError(err);
        }
    }
    static async refreshScreen() {
        try {
            let screenshot = await ORG.deviceController.getScreenshot();
            if (screenshot) {
                ORG.dispatcher.dispatch({
                    actionType: 'screenshot-update',
                    image: screenshot
                });
            }
        } catch(err) {
            this._handleError(err);
        }
    }

    static async playGesture(gesture, xpath) {
        try {
            let result = await ORG.deviceController.elementUsing("xpath", xpath);
            if (typeof result === 'object' && result["ELEMENT"] !== undefined) {
                let elementID = result["ELEMENT"];
                switch (gesture) {
                    case ORGActions.TAP: await ORG.deviceController.tapElementWithId(elementID); break;
                    case ORGActions.LONG_PRESS: await ORG.deviceController.longPressElementWithId(elementID); break;
                    case ORGActions.SWIPE_LEFT: await ORG.deviceController.swipeElementWithId(elementID, "left"); break;
                    case ORGActions.SWIPE_RIGHT: await ORG.deviceController.swipeElementWithId(elementID, "right"); break;
                    case ORGActions.SWIPE_UP: await ORG.deviceController.swipeElementWithId(elementID, "up"); break;
                    case ORGActions.SWIPE_DOWN: await ORG.deviceController.swipeElementWithId(elementID, "down"); break;
                }
            }
        } catch(err) {
            this._handleError(err);
        }
    }

    static async showDevice3DModel() {
        try {
            let model = await ORG3DDeviceModelLoader.loadDevice3DModel(ORG.device, ORG.scene, kORGDevicePositionY);
            if (model) {
                ORG.scene.addDevice3DModel(model);
                ORG.scene.setDeviceOrientation(ORG.device.orientation);
            }
        } catch(err) {
            this._handleError(err);
        }
    }

    static async setOrientation(orientation) {
        try {
            let result = await ORG.deviceController.setOrientation(orientation);
            ORG.device.orientation = orientation;
            const screenshot = await ORG.deviceController.getScreenshot();
            ORG.scene.setDeviceOrientation(orientation);
            ORG.dispatcher.dispatch({
                actionType: 'screenshot-update',
                image: screenshot
            });
        } catch(err) {
            this._handleError(err);
        }
    }

    static hideDevice3DModel() {
        ORG.scene.hideDevice3DModel();
    }

    static async getElementClassHierarchy(className) {
        if (ORG.deviceController.type === "ORG") {
            try {
                let classHierarchy = await ORG.deviceController.getClassHierarchy(className);
                ORG.UIJSONTreeManager.showClassHierarchy(classHierarchy.data);
            } catch(err) {
                this._handleError(err);
            }
        }
    }

    static async expandScreenUI() {
        bootbox.dialog({message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;Expanding UI elements...</h4></div>'}) // Progress alert
        try {
            let tree = await ORG.deviceController.getElementTree({
                "status-bar": true,
                "keyboard": true,
                "alert": true,
                "normal": true
            })
            ORG.UIJSONTreeManager.update(tree, ORGUIJSONTreeManager.TREE_TYPE_ORGANISMO)
            ORG.scene.updateUITreeModel(tree)
        } catch (err) {

        }
        bootbox.hideAll()
    }

    static async collapseScreenUI() {
        ORG.scene.collapse();
    }

    static rotateDevice() {
        ORG.scene.showHideDeviceTransformControls("rotate");
    }

    static translateDevice() {
        ORG.scene.showHideDeviceTransformControls("translate");
    }

    static lookAtDevice() {
        ORG.scene.lookAtDevice();
    }

    static _handleError(err) {
        if (err instanceof ORGError) {
            switch (err.id) {
                case ORGERR.ERR_CONNECTION_REFUSED: {
                    ORG.dispatcher.dispatch({
                        actionType: 'wda-session-open-error',
                        error: err.message
                    })
                } break;
                case ORGERR.ERR_WS_CONNECTION_REFUSED: {
                    ORG.dispatcher.dispatch({
                        actionType: 'ws-session-open-error',
                        error: err.message
                    })
                } break;
                default: {
                    bootbox.alert({
                        title: "Error",
                        message: err.message
                    });
                }
            }
        } else if (err instanceof DOMException) {
            bootbox.alert({
                title: err.name,
                message: err.message
            });
        } else if (typeof err === "string") {
            const safeErrorText = (err.length < 2000 ? ((err.length === 0) ? "Unknown error" : err) : err.substring(0, 2000));
            bootbox.alert({
                title: "Error",
                message: safeErrorText
            });
        } else if (typeof err === "object") {
            bootbox.alert({
                title: "Error",
                message: JSON.stringify(err, null, 2)
            });
        } else {
            bootbox.alert({
                title: "Error",
                message: "Unknown error."
            });
        }
    }
}
/**
 * Created by jongabilondo on 15/03/2018.
 */

class ORG3DNetPoint {

    constructor(text, position) {
        // sphere
        // tube
        // billboard
        this._sphere = this._createaSphere(0.2, position);
        const textPosition = new THREE.Vector3(position.x, position.y + 0.2, position.z);
        this._descriptor = this._createDescriptor(text, position);

        this._netPointGroup = new THREE.Group();
        this._netPointGroup.name = "ORG.NetPoint.Group";
        this._netPointGroup.add(this._sphere);
        this._netPointGroup.add(this._descriptor);
    }

    get model() {
        return this._netPointGroup;
    }

    get position() {
        return {x: 0, y: 0, z: 0};
    }

    // PRIVATE

    _createaSphere(radius, position) {
        let sphere;
        const wSegments = 22;
        const hSegments = 22;

        let geometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        let material = new THREE.MeshPhongMaterial({ color: 0x771122 });
        sphere = new THREE.Mesh(geometry, material);
        sphere.name = "ORG.NetPoint.Sphere";
        sphere.position.copy(position);
        return sphere;
    }

    _createDescriptor(text, position) {
        const kMetalness = 0.7;
        const billboardPosition = position || new THREE.Vector3(0, 0, 0);
        let texture = new THREE.TextTexture({
            text: text,
            fontStyle: 'italic',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb, metalness: kMetalness});
        let sprite = new THREE.Sprite(material);
        sprite.scale.setX(texture.aspect).multiplyScalar(0.2);

        const pos = new THREE.Vector3(position.x, sprite.getWorldScale().y / 2 + position.y, position.z);

        sprite.position.copy(pos);
        return sprite;
    }


    /*_createaModel(radius) {
        const wSegments = 22;
        const hSegments = 22;

        let coreGeometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        let coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x771122
        });
        this._coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this._coreMesh.name = "ORG.NetPoint.Mesh"

        let netPointGroup = new THREE.Group();
        netPointGroup.name = "ORG.NetPoint.Group";
        netPointGroup.add(this._coreMesh);

        return netPointGroup;
    }*/
}
/**
 * Created by jongabilondo on 15/03/2018.
 */


class ORG3DNetPointDescriptor {

    constructor() {
        this._model = this._createaModel(0);
    }

    get model() {
        return this._model;
    }

    get location() {
        return (this._model ?this._model.position :null)
    }

    set position(position) {
        if (this._model) {
            this._model.position.copy(position);
        }
    }

    // PRIVATE

    _createaModel() {
        //let spritey = this._makeTextSprite( "www.google.com" , { fontsize: 12, backgroundColor: {r:0, g:0, b:0, a:1}, fontColor: {r:255, g:255, b:255, a:1} } );
        //return spritey;

        let texture = new THREE.TextTexture({
            text: 'www.google.com\nRequests: 134\n2356K Bytes',
            fontStyle: 'italic',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
        let sprite = new THREE.Sprite(material);
        sprite.scale.setX(texture.aspect).multiplyScalar(10);
        return sprite;
    }

    /*_makeTextSprite( message, parameters ) {
        if ( parameters === undefined ) parameters = {};

        var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 10;

        var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 1;

        var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r:200, g:200, b:200, a:1.0 };

        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r:25, g:25, b:25, a:1.0 };

        var fontColor = parameters.hasOwnProperty("fontColor") ?
            parameters["fontColor"] : { r:255, g:255, b:255, a:1.0 };

        //var spriteAlignment = parameters.hasOwnProperty("alignment") ?
        //	parameters["alignment"] : THREE.SpriteAlignment.topLeft;

        //var spriteAlignment = THREE.SpriteAlignment.topLeft;


        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        //var textHeight = metrics.height;

        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        this._roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = "rgba(" + fontColor.r + "," + fontColor.g + ","
            + fontColor.b + "," + fontColor.a + ")";

        context.fillText(message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        //sprite.scale.set(50,25,1.0);
        return sprite;
    }

    _roundRect(ctx, x, y, w, h, r)
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }*/

}