import { motion } from 'framer-motion'
import { FaNewspaper, FaHeart, FaMobile, FaBookmark, FaPalette, FaRocket, FaUsers, FaGlobe, FaCode, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcDataProtection } from "react-icons/fc";
import { SiReact, SiReactrouter, SiVitepress} from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { CgFramer } from "react-icons/cg";
import { TbApi } from "react-icons/tb";

const About = () => {
  const features = [
    {
      icon: <FaNewspaper className="text-blue-400" />,
      title: "Latest News",
      description: "Real-time updates from trusted global sources"
    },
    {
      icon: <FaGlobe className="text-green-400" />,
      title: "Global Coverage",
      description: "News from around the world in multiple categories"
    },
    {
      icon: <FaBookmark className="text-yellow-400" />,
      title: "Save Favorites",
      description: "Bookmark articles to read later offline"
    },
    {
      icon: <FaMobile className="text-purple-400" />,
      title: "Responsive Design",
      description: "Perfect experience across all devices and screens"
    },
    {
      icon: <FaPalette className="text-pink-400" />,
      title: "Dark Mode",
      description: "Eye-friendly reading experience day or night"
    },
    {
      icon: <FcDataProtection className="text-red-400" />,
      title: "Ad-Free",
      description: "Clean, distraction-free news consumption"
    }
  ]

  const techStack = [
    { name: "React", color: "bg-blue-500", icon:  <SiReact />},
    { name: "Tailwind CSS", color: "bg-cyan-500", icon: <RiTailwindCssFill /> },
    { name: "Framer Motion", color: "bg-purple-500", icon: <CgFramer /> },
    { name: "NewsAPI", color: "bg-orange-500", icon: <TbApi /> },
    { name: "React Router", color: "bg-red-500", icon: <SiReactrouter /> },
    { name: "Vite", color: "bg-yellow-500", icon: <SiVitepress /> }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-8 lg:py-12"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <FaNewspaper className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text ">
            About NewsHub
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Your gateway to the world's most important stories, delivered with modern design and cutting-edge technology.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-linear-to-br from-zinc-800/60 to-zinc-800/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-zinc-700/50 shadow-2xl">
            <div className="flex items-center mb-6">
              <FaHeart className="text-red-400 text-2xl mr-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              NewsHub was created with a simple yet powerful vision: to democratize access to quality journalism and make staying informed both effortless and enjoyable. In today's fast-paced world, we believe everyone deserves access to reliable, unbiased news without the clutter of ads or distracting pop-ups.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              We're passionate about connecting readers with the stories that matter most, from breaking news to in-depth analysis, all presented in a clean, modern interface that respects your time and attention.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose NewsHub?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Discover the features that make NewsHub the perfect choice for modern news consumption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-linear-to-br from-zinc-800/70 to-zinc-800/30 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-zinc-700/50 shadow-xl hover:border-zinc-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-linear-to-br from-zinc-800/60 to-zinc-800/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-zinc-700/50 shadow-2xl">
            <div className="flex items-center mb-8">
              <FaCode className="text-green-400 text-2xl mr-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Built with Modern Technology</h2>
            </div>
            
            <p className="text-lg text-zinc-300 leading-relaxed mb-8">
              NewsHub leverages the latest web technologies to deliver lightning-fast performance, smooth animations, and an exceptional user experience across all devices.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className={`${tech.color} rounded-xl p-4 mb-3 shadow-lg`}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg mx-auto text-black text-2xl p-1">{tech.icon}</div>
                    
                  </div>
                  <p className="text-sm font-medium text-zinc-300">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { number: "10K+", label: "Articles Delivered", icon: <FaNewspaper /> },
            { number: "500+", label: "Active Users", icon: <FaUsers /> },
            { number: "50+", label: "News Sources", icon: <FaGlobe /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-linear-to-br from-zinc-800/40 to-zinc-800/20 backdrop-blur-lg rounded-2xl p-8 border border-zinc-700/30 shadow-xl"
            >
              <div className="text-3xl text-blue-400 mb-4">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 lg:p-12 border border-blue-500/20 shadow-2xl text-center">
            <FaRocket className="text-4xl text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Let's Stay Connected
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have feedback, suggestions, or just want to say hello? We'd love to hear from you! 
              Your input helps us make NewsHub better for everyone.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:rakesh.coding.007@gmail.com"
                className="flex items-center gap-3 bg-zinc-800/60 hover:bg-zinc-700/60 text-white px-6 py-3 rounded-xl transition-all duration-200 border border-zinc-700/50"
              >
                <FaEnvelope />
                <span>rakesh.coding.007@gmail.com</span>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Rakesh-Dey-013" target='_blank'
                className="flex items-center gap-3 bg-zinc-800/60 hover:bg-zinc-700/60 text-white px-6 py-3 rounded-xl transition-all duration-200 border border-zinc-700/50"
              >
                <FaGithub />
                <span>GitHub</span>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/rakeshdey007" target='_blank'
                className="flex items-center gap-3 bg-zinc-800/60 hover:bg-zinc-700/60 text-white px-6 py-3 rounded-xl transition-all duration-200 border border-zinc-700/50"
              >
                <FaLinkedin />
                <span>Linkedin</span>
              </motion.a>
            </div>
            
            <p className="text-zinc-400 text-sm">
              Built Rakesh with ❤️ for the news community
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About