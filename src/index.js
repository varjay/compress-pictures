function execCmd(cmd, d) {
  let result = null
  if (cmd.includes('square')) {
    // 输出图片为正方形
    let newsize
    result = {}
    if (d.width > d.height) {
      newsize = d.height
      result['sx'] = -(d.width - d.height) / 2
      result['sy'] = 0
      result['width'] = d.height
      result['height'] = d.height
    } else if(d.height > d.width){
      result['sx'] = 0
      result['sy'] = -(d.height - d.width) / 2
      result['width'] = d.width
      result['height'] = d.width
    } else {
      return false
    }
  }
  return result
}

async function resetOrientation(srcBase64, srcOrientation, imgType, cmd) {
  return new Promise(resolve => {
    let img = new Image()
    img.onload = function() {
      let newsize = autoQuality(img.width, img.height)
      let width = newsize.width
      let height = newsize.height
      let sx = 0
      let sy = 0
      if (cmd) {
        let result = execCmd(cmd, newsize)
        if (result) {
          sx = result.sx
          sy = result.sy
          width = result.width
          height = result.height
        }
      }
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
      ctx.drawImage(img, sx, sy, newsize.width, newsize.height)

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
      if (view.getUint16(0, false) != 0xFFD8) resolve({ orientation: -2 })
      let length = view.byteLength,
        offset = 2
      while (offset < length) {
        let marker = view.getUint16(offset, false)
        offset += 2
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) resolve({ orientation: -1 })
          let little = view.getUint16(offset += 6, false) == 0x4949
          offset += view.getUint32(offset + 4, little)
          let tags = view.getUint16(offset, little)
          offset += 2
          for (let i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              resolve({ orientation: view.getUint16(offset + (i * 12) + 8, little) })
        } else if ((marker & 0xFF00) != 0xFF00) break
        else offset += view.getUint16(offset, false)
      }
      resolve({ orientation: -1 })
    }
    reader.readAsArrayBuffer(file)
  })
}

function fileToBase64(img) {
  return new Promise(resolve => {
    let ready = new FileReader()
    ready.readAsDataURL(img)
    ready.onload = function(){
      resolve(this.result)
    }
  })
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
async function start(inputFile, cmd) {
  let img = inputFile.files[0]
  let imgType = img.type
  // console.log(imgType)
  if (imgType.indexOf('gif') === -1) {
    // 照片方向
    // console.time()
    let r = await getOrientation(img)
    // console.timeEnd()

    // 转换为base64
    // console.time()
    let base64 = await fileToBase64(img)
    // console.timeEnd()

    // 方向校正并压缩
    // console.time()
    let afterimg = await resetOrientation(base64, r.orientation, imgType, cmd)
    // console.timeEnd()

    // 转换为blob
    // console.time()
    let blob = dataURLtoBlob(afterimg.img)
    let url = URL.createObjectURL(blob)
    // console.timeEnd()

    return {img: blob, url, info: {width: afterimg.width, height: afterimg.height}}
  } else {
    let getSize = async function(f) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        reader.onload = function(e) {
          let data = e.target.result
          let image = new Image()
          image.onload=function() {
            let width = image.width
            let height = image.height
            resolve({
              width,
              height,
              size: f.size,
            })
          }
          image.src = data
        }
        reader.readAsDataURL(f)
      })
    }
    let info = await getSize(img)
    let base64 = await fileToBase64(img)
    let blob = dataURLtoBlob(base64)
    let url = URL.createObjectURL(blob)
    return {img, url, info}
  }
}

export default start
