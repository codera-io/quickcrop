function PreviewGrid({ images, isProcessing, downloadQuality = 'jpeg-0.92' }) {
  try {
    const downloadSingle = (img) => {
      let mimeType, quality, extension;

      if (downloadQuality === 'png') {
        mimeType = 'image/png';
        quality = undefined;
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

      img.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${img.preset.id}_${img.preset.width}x${img.preset.height}.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
      }, mimeType, quality);
    };

    const handleDownloadAll = () => {
      downloadAllAsZip(images, downloadQuality);
    };

    if (isProcessing) {
      return (
        <div className="card text-center">
          <div className="icon-loader text-3xl text-[var(--primary-color)] animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Processing images...</p>
        </div>
      );
    }

    return (
      <div className="card" data-name="preview-grid" data-file="components/PreviewGrid.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Preview & Download</h2>
          <button onClick={handleDownloadAll} className="btn-primary flex items-center gap-2">
            <div className="icon-download text-lg"></div>
            Download All (ZIP)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="border border-[var(--border-color)] rounded-lg p-4">
              <img
                src={img.dataUrl}
                alt={img.preset.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <div className="space-y-2">
                <h3 className="font-medium text-sm">{img.preset.name}</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {img.preset.width} × {img.preset.height}
                  {' · '}
                  {(img.preset.width / img.preset.height).toFixed(2)}:1
                </p>
                <button
                  onClick={() => downloadSingle(img)}
                  className="w-full px-4 py-2 bg-[var(--bg-secondary)] rounded-lg text-sm hover:bg-[var(--primary-color)] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <div className="icon-download text-base"></div>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('PreviewGrid component error:', error);
    return null;
  }
}