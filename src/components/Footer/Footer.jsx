import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold mb-5 tracking-wide text-white">MyApp</h2>
          <p className="text-gray-400 leading-relaxed">
            Innovating your digital experience with top-notch products and services.
            Join us to build a brighter future.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-8">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 bg-white/10 rounded-full hover:bg-cyan-500 hover:text-white transition-colors shadow-md"
                aria-label="Social Link"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-3">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            {['Home', 'About Us', 'Services', 'Contact'].map((text, idx) => (
              <li key={idx}>
                <a href={`/${text.toLowerCase().replace(/\s/g, '')}`} className="hover:text-cyan-400 transition-colors">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-3">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li>
              <span className="font-medium">Email:</span>{' '}
              <a href="mailto:support@myapp.com" className="hover:text-cyan-400 transition-colors">
                haneenmahmoud342@gmail.com
              </a>
            </li>
            <li>
              <span className="font-medium">Phone:</span>{' '}
              <a href="tel:+1234567890" className="hover:text-cyan-400 transition-colors">
                +20 01145008806
              </a>
            </li>
            <li>
              <span className="font-medium">Address:</span> Egypt, Tanta
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/20 pb-3">Newsletter</h3>
          <p className="text-gray-400 mb-5">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-xl px-5 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-500 text-sm select-none">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
