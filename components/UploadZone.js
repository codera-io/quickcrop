function UploadZone({ onImageUpload, currentImage, onReset }) {
  try {
    const [isDragging, setIsDragging] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState(null);
    const [imageInfo, setImageInfo] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const handleFile = (file) => {
      if (!file) return;
      
      if (!file.type.match('image/(jpeg|png|webp)')) {
        alert('Please upload a JPG, PNG, or WebP image');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setImageInfo({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB'
        });
      };
      reader.readAsDataURL(file);
      
      onImageUpload(file);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleChangeImage = () => {
      setImagePreview(null);
      setImageInfo(null);
      onReset();
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileInput = (e) => {
      const file = e.target.files[0];
      handleFile(file);
      // Reset input to allow re-uploading the same file
      e.target.value = '';
    };

    return (
      <div className="card" data-name="upload-zone" data-file="components/UploadZone.js">
        {!imagePreview ? (
          <div
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
          >
            <div className="icon-upload text-4xl text-[var(--primary-color)] mb-4 mx-auto w-16 h-16 flex items-center justify-center"></div>
            <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
            <p className="text-[var(--text-secondary)] mb-4">Drag & drop or click to browse</p>
            <p className="text-sm text-[var(--text-secondary)]">Supports JPG, PNG, WebP (max 10MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex gap-6">
            <img src={imagePreview} alt="Uploaded" className="w-48 h-48 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Uploaded Image</h3>
              <p className="text-[var(--text-secondary)] mb-1">{imageInfo?.name}</p>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{imageInfo?.size}</p>
              <button onClick={handleChangeImage} className="btn-secondary">
                Change Image
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('UploadZone component error:', error);
    return null;
  }
}