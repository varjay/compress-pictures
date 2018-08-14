/*!
 * compress-pictures
 * @version 0.0.1
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
/* harmony import */ var _autoQuality__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


function compressImg(inputFile, afterWidth = 0) {
  inputFile = inputFile.files[0]
  let imgType = inputFile.type
  let hidCtx
  let hidCanvas = document.createElement('canvas')

  // 生成隐藏画布
  if (hidCanvas.getContext) {
    hidCtx = hidCanvas.getContext('2d')
  } else {
    return 0
  }
  // 通过 this.files 取到 FileList ，这里只有一个
  let p = new Image()
  let reader = new FileReader()
  return new Promise(function(resolve, reject) {
    reader.onload = function(evt) {
      p.src = evt.target.result
      p.onload = function() {
        let upImgWidth = p.width
        let upImgHeight = p.height
        // 压缩换算后的图片高度
        // let afterHeight = afterWidth * upImgHeight / upImgWidth
        if (upImgWidth < 10 || upImgWidth < 10) {
          return false
        }
        // 设置压缩canvas区域高度及宽度
        let target = Object(_autoQuality__WEBPACK_IMPORTED_MODULE_0__["default"])(p.width, p.height)
        hidCanvas.setAttribute('width', target.width)
        hidCanvas.setAttribute('height', target.height)

        // canvas绘制压缩后图片
        drawImageIOSFix(hidCtx, p, 0, 0, upImgWidth, upImgHeight, 0, 0, target.width, target.height)
        // 获取压缩后生成的img对象
        resolve(convertBase64UrlToBlob(convertCanvasToImage(hidCanvas, imgType).src, imgType))
      }
    }
    reader.readAsDataURL(inputFile)
  })
}

// canvas转图像
function convertCanvasToImage(canvas, imgType) {
  let image = new Image()
  image.src = canvas.toDataURL(imgType, 0.7)
  return image
}

// 以下代码是修复canvas在ios中显示压缩的问题。
function detectVerticalSquash(img) {
  let ih = img.naturalHeight
  let canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = ih
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  let data = ctx.getImageData(0, 0, 1, ih).data
  // search image edge pixel position in case it is squashed vertically.
  let sy = 0
  let ey = ih
  let py = ih
  while (py > sy) {
    let alpha = data[(py - 1) * 4 + 3]
    if (alpha === 0) {
      ey = py
    } else {
      sy = py
    }
    py = (ey + sy) >> 1
  }
  let ratio = (py / ih)
  return (ratio === 0) ? 1 : ratio
}

/**
 * A replacement for context.drawImage
 * (args are for source and destination).
 */
function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
  let vertSquashRatio = detectVerticalSquash(img)
  ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
    sw * vertSquashRatio, sh * vertSquashRatio,
    dx, dy, dw, dh)
}

function convertBase64UrlToBlob(urlData, imgType) {
  let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte

  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  console.log(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {type: imgType})
}

/* harmony default export */ __webpack_exports__["default"] = (compressImg);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function autoQuality (width, height) {
  // console.log('初始宽高', width, height)
  // 宽高比
  let ratio = width / height
  // 目标大小
  let targetW = 1280
  let targetH = 1280

  // 宽高均 <= 1280，图片尺寸大小保持不变
  if (width < 1280 && height < 1280) {
    return {width, height}
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

  return {width: targetW, height: targetH}
}
/* harmony default export */ __webpack_exports__["default"] = (autoQuality);


/***/ })
/******/ ])["default"];
});