const sharp = require('sharp')

/**
 * @returns {Promise<sharp.Metadata>} Image metadata
 */
async function getImageMetadata(buffer) {
    return new Promise((resolve, reject) => {
        try {
            sharp(buffer)
                .metadata()
                .then(metadata => resolve(metadata))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * @returns {Promise<Buffer>} Result buffer
 */
async function cropAndResize(buffer, width, extension, x, y, w, h) {
    const metadata = await sharp(buffer).metadata()
    const cropX = Math.round(x * metadata.width)
    const cropY = Math.round(y * metadata.height)
    const cropW = Math.round(w * metadata.width)
    const cropH = Math.round(h * metadata.height)
    return sharp(buffer)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .resize(width)
        .toFormat(extension)
        .toBuffer()
}

module.exports = { getImageMetadata, cropAndResize }
