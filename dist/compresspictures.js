/*!
 * compress-pictures
 * @version 1.0.0
 * @see https://github.com/varjay/
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TinyPic"] = factory();
	else
		root["TinyPic"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function resetOrientation(srcBase64, srcOrientation, imgType) {
  return new Promise(resolve => {
    let img = new Image()
    img.onload = function() {
      let newsize = autoQuality(img.width, img.height)
      let width = newsize.width
      let height = newsize.height
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext("2d")

      if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
        canvas.width = height
        canvas.height = width
      } else {
        canvas.width = width
        canvas.height = height
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, width, 0)
          break
        case 3:
          ctx.transform(-1, 0, 0, -1, width, height)
          break
        case 4:
          ctx.transform(1, 0, 0, -1, 0, height)
          break
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0)
          break
        case 6:
          ctx.transform(0, 1, -1, 0, height, 0)
          break
        case 7:
          ctx.transform(0, -1, -1, 0, height, width)
          break
        case 8:
          ctx.transform(0, -1, 1, 0, 0, width)
          break
        default:
          ctx.transform(1, 0, 0, 1, 0, 0)
      }

      // draw image
      if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
        ctx.drawImage(img, 0, 0, canvas.height, canvas.width)
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      resolve({img: canvas.toDataURL(imgType, 0.7), width: canvas.width, height: canvas.height})
    }
    img.src = srcBase64
  })
}

async function getOrientation(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.onload = function(e) {
      let view = new DataView(this.result)
      if (view.getUint16(0, false) != 0xFFD8) resolve({ orientation: -2, arraybuffer: this.result })
      let length = view.byteLength,
        offset = 2
      while (offset < length) {
        let marker = view.getUint16(offset, false)
        offset += 2
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) resolve({ orientation: -1, arraybuffer: this.result })
          let little = view.getUint16(offset += 6, false) == 0x4949
          offset += view.getUint32(offset + 4, little)
          let tags = view.getUint16(offset, little)
          offset += 2
          for (let i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              resolve({ orientation: view.getUint16(offset + (i * 12) + 8, little), arraybuffer: this.result })
        } else if ((marker & 0xFF00) != 0xFF00) break
        else offset += view.getUint16(offset, false)
      }
      resolve({ orientation: -1, arraybuffer: this.result })
    }
    reader.readAsArrayBuffer(file)
  })
}

function arrayBufferToBase64(buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  for (let len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function autoQuality(width, height) {
  // console.log('初始宽高', width, height)
  // 宽高比
  let ratio = width / height
  // 目标大小
  let targetW = 1280
  let targetH = 1280

  // 宽高均 <= 1280，图片尺寸大小保持不变
  if (width < 1280 && height < 1280) {
    return { width, height }
  }

  if (width > 1280 && height > 1280) {
    // 宽高均 > 1280 && 宽高比 > 2，
    if (ratio > 2) {
      // 宽大于高 取较小值(高)等于1280，较大值等比例压缩
      targetH = 1280
      targetW = targetH * ratio
    } else {
      // 高大于宽 取较小值(宽)等于1280，较大值等比例压缩 (宽高比在0.5到2之间 )
      targetW = 1280
      targetH = targetW / ratio
    }
  } else {
    // 宽或高 > 1280
    if (ratio > 2) {
      // 宽图 图片尺寸大小保持不变
      targetW = width
      targetH = height
    } else if (ratio < 0.5) {
      // 长图 图片尺寸大小保持不变
      targetW = width
      targetH = height
    } else if (ratio > 1) {
      // 宽大于高 取较大值(宽)等于1280，较小值等比例压缩
      targetW = 1280
      targetH = targetW / ratio
    } else {
      // 高大于宽 取较大值(高)等于1280，较小值等比例压缩
      targetH = 1280
      targetW = targetH * ratio
    }
  }
  targetW = Math.round(targetW)
  targetH = Math.round(targetH)
  return { width: targetW, height: targetH }
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
async function start(inputFile) {
  let img = inputFile.files[0]
  let imgType = img.type
  console.log(imgType)

  // 照片方向
  let r = await getOrientation(img)

  // 转换为base64
  let base64 = `data:${imgType};base64,` + arrayBufferToBase64(r.arraybuffer)

  // 方向校正并压缩
  let afterimg = await resetOrientation(base64, r.orientation, imgType)

  // 转换为blob
  let blob = dataURLtoBlob(afterimg.img)
  let url = URL.createObjectURL(blob)

  return {img: blob, url, info: {width: afterimg.width, height: afterimg.height}}
}

/* harmony default export */ __webpack_exports__["default"] = (start);


/***/ })
/******/ ])["default"];
});