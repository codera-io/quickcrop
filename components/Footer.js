function Footer() {
  try {
    return (
      <footer className="bg-white border-t border-[var(--border-color)] mt-16" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4 py-8 max-w-7xl text-center">
          <p className="text-[var(--text-secondary)]">
            Made with <span className="text-red-500">❤️</span> by Codera
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            © 2025 Codera. All images processed locally in your browser.
          </p>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}