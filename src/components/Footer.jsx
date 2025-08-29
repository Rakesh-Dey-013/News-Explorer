import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">NewsHub</h3>
            <p className="text-gray-400">
              Your trusted source for the latest news and updates from around the world.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Explore</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Entertainment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://x.com/RD_Gaming796974" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rakeshdey007" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/rakesh._._007/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://github.com/Rakesh-Dey-013" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer