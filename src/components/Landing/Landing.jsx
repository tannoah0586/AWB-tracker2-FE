import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="font-sans">
      <section className="bg-blue-100 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Track Your Shipments with Confidence</h1>
          <p className="text-lg mb-8">
            AWB-Tracker2 provides a streamlined solution for monitoring and managing your AWBs, automating risk assessment, and delivering timely notifications to keep you informed.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
            <Link to="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <div className="p-6 border rounded">
            <h3 className="font-semibold mb-2">Simulated OTM Data</h3>
            <p className="text-sm">Real-time simulated updates to mimic OTM reports.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold mb-2">Lane Management</h3>
            <p className="text-sm">Easily select and save your assigned lanes.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold mb-2">Automated Risk Assessment</h3>
            <p className="text-sm">Automatically flag at-risk AWBs.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold mb-2">Email Notifications</h3>
            <p className="text-sm">Receive timely email notifications.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold mb-2">Dashboard & Filtering</h3>
            <p className="text-sm">Comprehensive dashboard with filtering.</p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">Why Choose AWB-Tracker2?</h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Say goodbye to manual tracking and missed deadlines. AWB-Tracker2 provides the tools you need to stay on top of your shipments, improve efficiency, and reduce risks.
        </p>
        <ul className="list-none space-y-2 max-w-md mx-auto">
          <li>Real-time visibility into your AWBs.</li>
          <li>Proactive alerts for at-risk shipments.</li>
          <li>Simplified lane management.</li>
          <li>Customizable notification preferences.</li>
          <li>User-friendly dashboard for easy tracking.</li>
        </ul>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">Ready to Get Started?</h2>
        <p className="text-lg mb-6">Sign up today and experience the benefits of AWB-Tracker2.</p>
        <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-lg">
          Sign Up Now
        </Link>
      </section>
    </main>
  );
};

export default Landing;