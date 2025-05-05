export function Footer() {
  return (
    <div className="container mx-auto px-4 py-8 text-center text-gray-300">
      <div className="flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <div className="flex gap-8">
          <a href="/learn-more" className="hover:text-white transition-colors">
            Learn More
          </a>
          <a href="/get-involved" className="hover:text-white transition-colors">
            Get Involved
          </a>
          <a href="/donate" className="hover:text-white transition-colors">
            Donate
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © 2025 The Lost Pet Project. All rights reserved.
        </div>
      </div>
    </div>
  );
} 