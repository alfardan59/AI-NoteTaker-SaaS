function StatsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-20 pb-16">
          <div className="text-center group">
            <div className="text-4xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent mb-2">
              5+
            </div>
            <p className="text-gray-400">Happy Users</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent mb-2">
              96.69%
            </div>
            <p className="text-gray-400">Uptime</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent mb-2">
              5min
            </div>
            <p className="text-gray-400">Setup Time</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent mb-2">
              38hrs
            </div>
            <p className="text-gray-400">Saved Per Month</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
