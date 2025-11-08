function PlatformSelector({ onSelectionChange, selectedPresets }) {
  try {
    const [expandedPlatforms, setExpandedPlatforms] = React.useState({});

    const togglePlatform = (platform) => {
      setExpandedPlatforms(prev => ({
        ...prev,
        [platform]: !prev[platform]
      }));
    };

    const togglePreset = (preset) => {
      const isSelected = selectedPresets.some(p => p.id === preset.id);
      if (isSelected) {
        onSelectionChange(selectedPresets.filter(p => p.id !== preset.id));
      } else {
        onSelectionChange([...selectedPresets, preset]);
      }
    };

    const selectAllPopular = () => {
      const popular = [
        ...PLATFORM_PRESETS["Instagram"].slice(0, 2),
        PLATFORM_PRESETS["YouTube"][0],
        PLATFORM_PRESETS["Facebook"][0],
        PLATFORM_PRESETS["X (Twitter)"][0]
      ];
      onSelectionChange(popular);
    };

    return (
      <div className="card" data-name="platform-selector" data-file="components/PlatformSelector.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Select Platforms</h2>
          <button onClick={selectAllPopular} className="text-sm text-[var(--primary-color)] hover:underline">
            Select All Popular Sizes
          </button>
        </div>

        <div className="space-y-4">
          {Object.keys(PLATFORM_PRESETS).map(platform => (
            <div key={platform}>
              <button
                onClick={() => togglePlatform(platform)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <span className="font-medium">{platform}</span>
                <div className={`icon-chevron-down text-lg transition-transform ${expandedPlatforms[platform] ? 'rotate-180' : ''}`}></div>
              </button>
              
              {expandedPlatforms[platform] && (
                <div className="ml-4 mt-2 space-y-2">
                  {PLATFORM_PRESETS[platform].map(preset => (
                    <label key={preset.id} className="flex items-center gap-3 p-2 rounded hover:bg-[var(--bg-secondary)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPresets.some(p => p.id === preset.id)}
                        onChange={() => togglePreset(preset)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{preset.name}</span>
                      <span className="text-xs text-[var(--text-secondary)] ml-auto">{preset.width} × {preset.height}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {selectedPresets.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedPresets.length} size{selectedPresets.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('PlatformSelector component error:', error);
    return null;
  }
}