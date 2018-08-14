import autoQuality from './autoQuality'

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
        let target = autoQuality(p.width, p.height)
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

export default compressImg
