async function processImage(file, presets, previewQuality = 1.0, downloadQuality = 'jpeg-0.92') {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const results = presets.map(preset => {
          const canvas = document.createElement('canvas');
          canvas.width = preset.width;
          canvas.height = preset.height;
          const ctx = canvas.getContext('2d');
          
          const targetRatio = preset.width / preset.height;
          const imgRatio = img.width / img.height;
          
          let sx, sy, sWidth, sHeight;
          
          if (imgRatio > targetRatio) {
            sHeight = img.height;
            sWidth = img.height * targetRatio;
            sx = (img.width - sWidth) / 2;
            sy = 0;
          } else {
            sWidth = img.width;
            sHeight = img.width / targetRatio;
            sx = 0;
            sy = (img.height - sHeight) / 2;
          }
          
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, preset.width, preset.height);
          
          return {
            preset: preset,
            canvas: canvas,
            dataUrl: canvas.toDataURL('image/jpeg', previewQuality),
            downloadFormat: downloadQuality
          };
        });
        
        resolve(results);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function downloadAllAsZip(processedImages, downloadQuality = 'jpeg-0.92') {
  const JSZip = window.JSZip;
  const zip = new JSZip();
  
  for (const img of processedImages) {
    let mimeType, quality, extension;

    if (downloadQuality === 'png') {
      mimeType = 'image/png';
      quality = undefined; // PNG doesn't use quality parameter
      extension = 'png';
    } else if (downloadQuality === 'jpeg-1.0') {
      mimeType = 'image/jpeg';
      quality = 1.0;
      extension = 'jpg';
    } else {
      mimeType = 'image/jpeg';
      quality = 0.92;
      extension = 'jpg';
    }

    const blob = await new Promise(resolve => img.canvas.toBlob(resolve, mimeType, quality));
    const filename = `${img.preset.id}_${img.preset.width}x${img.preset.height}.${extension}`;
    zip.file(filename, blob);
  }
  
  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quickcrop_images.zip';
  a.click();
  URL.revokeObjectURL(url);
}