const companies = [
  'ANTHROPIC',
  'SEATGEEK',
  'ClickUp',
  'AllTrails',
  'MODERN TREASURY',
  'ramp'
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-600 mb-12 font-medium">
          Trusted by the world's leading innovators
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {companies.map((company, i) => (
            <div key={i} className="text-gray-400 font-semibold text-lg">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
