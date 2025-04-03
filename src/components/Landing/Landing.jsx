import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Import the CSS file

const Landing = () => {
  return (
    <main>
      <section className="bg-blue-100">
        <div className="max-w-4xl">
          <h1>Track Your Shipments with Confidence</h1>
          <p>
            AWB-Tracker2 provides a streamlined solution for monitoring and managing your AWBs, automating risk assessment, and delivering timely notifications to keep you informed.
          </p>
          <div className="flex">
            <Link to="/sign-up" className="bg-blue-500">
              Sign Up
            </Link>
            <Link to="/sign-in" className="bg-gray-200">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2>Key Features</h2>
        <div className="grid">
          <div>
            <h3>Simulated OTM Data</h3>
            <p>Real-time simulated updates to mimic OTM reports.</p>
          </div>
          <div>
            <h3>Lane Management</h3>
            <p>Easily select and save your assigned lanes.</p>
          </div>
          <div>
            <h3>Automated Risk Assessment</h3>
            <p>Automatically flag at-risk AWBs.</p>
          </div>
          <div>
            <h3>Email Notifications</h3>
            <p>Receive timely email notifications.</p>
          </div>
          <div>
            <h3>Dashboard & Filtering</h3>
            <p>Comprehensive dashboard with filtering.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <h2>Why Choose AWB-Tracker2?</h2>
        <p>
          Say goodbye to manual tracking and missed deadlines. AWB-Tracker2 provides the tools you need to stay on top of your shipments, improve efficiency, and reduce risks.
        </p>
        <ul>
          <li>Real-time visibility into your AWBs.</li>
          <li>Proactive alerts for at-risk shipments.</li>
          <li>Simplified lane management.</li>
          <li>Customizable notification preferences.</li>
          <li>User-friendly dashboard for easy tracking.</li>
        </ul>
      </section>

      <section className="py-16">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today and experience the benefits of AWB-Tracker2.</p>
        <Link to="/sign-up" className="bg-green-500">
          Sign Up Now
        </Link>
      </section>
    </main>
  );
};

export default Landing;