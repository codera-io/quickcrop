function Header() {
  try {
    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-crop text-xl text-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">QuickCrop</h1>
                <p className="text-sm text-[var(--text-secondary)]">Instant image resizer for social media</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}