const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 mt-10">
      <h1 className="text-3xl font-bold text-white mb-6">About NewsHub</h1>
      
      <div className="prose prose-invert">
        <p className="text-gray-300 mb-4">
          NewsHub is a modern news aggregator that brings you the latest stories from around the world. 
          Our mission is to provide a clean, ad-free experience for staying informed about current events.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Our Features</h2>
        <ul className="text-gray-300 space-y-2 mb-6">
          <li>• Latest news from trusted sources</li>
          <li>• Customizable categories and filters</li>
          <li>• Dark mode for comfortable reading</li>
          <li>• Save your favorite articles</li>
          <li>• Responsive design for all devices</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Technology</h2>
        <p className="text-gray-300 mb-4">
          NewsHub is built with React and powered by NewsAPI. We use Tailwind CSS for styling and 
          Framer Motion for smooth animations. The app is fully responsive and works on all devices.
        </p>
        
        <p className="text-gray-300">
          Have feedback or suggestions? We'd love to hear from you! Contact us at support@newshub.example.com
        </p>
      </div>
    </div>
  )
}

export default About