function CanvasGenerateImagePicture(w, h) {
  // Buat elemen canvas di memori
  const canvas = document.createElement("canvas")
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")

  const colors = [
    "#ffffff",
    "#00a6ff"
  ]
  const blockSize = 50
  const numBlocksX = Math.ceil(w / blockSize)
  const numBlocksY = Math.ceil(h / blockSize)

  for (let y = 0; y < numBlocksY; y++) {
    for (let x = 0; x < numBlocksX; x++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillStyle = randomColor
      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
    }
  }
  return canvas.toDataURL()
}

export default CanvasGenerateImagePicture