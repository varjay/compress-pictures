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
  targetW = Math.round(targetW)
  targetH = Math.round(targetH)
  return {width: targetW, height: targetH}
}
export default autoQuality
