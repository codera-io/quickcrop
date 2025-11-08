class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const [selectedPresets, setSelectedPresets] = React.useState([]);
    const [processedImages, setProcessedImages] = React.useState([]);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [downloadQuality, setDownloadQuality] = React.useState('jpeg-0.92');

    const handleImageUpload = (file) => {
      setUploadedImage(file);
      setProcessedImages([]);
    };

    const handleReset = () => {
      setUploadedImage(null);
      setSelectedPresets([]);
      setProcessedImages([]);
    };

    const handlePresetSelection = (presets) => {
      setSelectedPresets(presets);
    };

    const handleProcess = async () => {
      if (!uploadedImage || selectedPresets.length === 0) return;
      
      setIsProcessing(true);
      const results = await processImage(uploadedImage, selectedPresets, 1.0, downloadQuality);
      setProcessedImages(results);
      setIsProcessing(false);
    };

    React.useEffect(() => {
      if (uploadedImage && selectedPresets.length > 0) {
        handleProcess();
      }
    }, [uploadedImage, selectedPresets]);

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <UploadZone onImageUpload={handleImageUpload} currentImage={uploadedImage} onReset={handleReset} />
          
          {uploadedImage && (
            <div className="mt-8">
              <PlatformSelector 
                onSelectionChange={handlePresetSelection}
                selectedPresets={selectedPresets}
              />
            </div>
          )}
          
          {processedImages.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Download Quality</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDownloadQuality('jpeg-0.92')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      downloadQuality === 'jpeg-0.92'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white'
                    }`}
                  >
                    Standard (92%)
                  </button>
                  <button
                    onClick={() => setDownloadQuality('jpeg-1.0')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      downloadQuality === 'jpeg-1.0'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white'
                    }`}
                  >
                    High (100%)
                  </button>
                  <button
                    onClick={() => setDownloadQuality('png')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      downloadQuality === 'png'
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white'
                    }`}
                  >
                    Lossless (PNG)
                  </button>
                </div>
              </div>
              <PreviewGrid
                images={processedImages}
                isProcessing={isProcessing}
                downloadQuality={downloadQuality}
              />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);