interface Feature {
  title: string
  description: string
  icon?: string
}

interface FeaturesProps {
  title: string
  items: Feature[]
}

export default function Features({ title, items }: FeaturesProps) {
  return (
    <section className="features-section py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="features-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="feature-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
