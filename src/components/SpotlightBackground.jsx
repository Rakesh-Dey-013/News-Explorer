import { motion } from 'framer-motion'

const SpotlightBackground = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </motion.div>
    </>
  )
}

export default SpotlightBackground