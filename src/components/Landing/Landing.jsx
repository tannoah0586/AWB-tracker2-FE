import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <main>
      <section className="bg-blue-100">
        <div className="max-w-4xl">
          <h1>Automate Your Freight Tracking and Risk Management</h1>
          <p>
            AWB-Tracker2 simplifies OTM freight data monitoring, automating risk assessment, and providing timely notifications to ensure your shipments are delivered on time.
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
        <h2>How It Works</h2>
        <div className="grid">
          <div>
            <h3>Simulated OTM Data & Lane Management</h3>
            <p>
              Import simulated OTM freight data and easily save your assigned lanes for focused tracking.
            </p>
          </div>
          <div>
            <h3>Automated Risk Assessment</h3>
            <p>
              Our system automatically assesses the risk of each AWB, specifically monitoring the "Proof of Delivery" (POD) field.
            </p>
          </div>
          <div>
            <h3>Scheduled Tracking with Timeouts/Cron Jobs</h3>
            <p>
              AWB-Tracker2 uses scheduled tasks (timeouts or cron jobs) to periodically check the POD status of your saved freight.
            </p>
          </div>
          <div>
            <h3>Real-Time Updates & Notifications</h3>
            <p>
              Receive immediate email notifications if the POD field remains empty, indicating a potential delivery risk.
            </p>
          </div>
          <div>
            <h3>Dashboard & Filtering</h3>
            <p>
              Utilize our comprehensive dashboard with advanced filtering options to monitor and manage your shipments efficiently.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <h2>Why AWB-Tracker2?</h2>
        <p>
          AWB-Tracker2 goes beyond basic tracking. It provides proactive risk management through automated monitoring and real-time notifications, ensuring you're always ahead of potential issues.
        </p>
        <ul>
          <li>Automated monitoring of critical data fields like POD.</li>
          <li>Real-time email alerts for at-risk shipments.</li>
          <li>Scheduled checks to ensure timely updates.</li>
          <li>User-friendly dashboard with detailed shipment information.</li>
          <li>Improved efficiency and reduced manual tracking.</li>
        </ul>
      </section>

      <section className="py-16">
        <h2>Ready to Streamline Your Freight Tracking?</h2>
        <p>Sign up now and experience the power of automated risk management with AWB-Tracker2.</p>
        <Link to="/sign-up" className="bg-green-500">
          Sign Up Today
        </Link>
      </section>
    </main>
  );
};

export default Landing;