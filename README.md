# AWB Tracker 2 - Frontend MVP

## Live Site
https://awb-tracker2.vercel.app/ 

## Background

AWB (Air Waybill) tracking is crucial for logistics and supply chain management. Users often need a centralized platform to monitor their shipments' status efficiently. This project aims to provide a user-friendly web interface for tracking and managing AWBs.

## Project Brief

Develop a React-based frontend application that allows users to:

* Authenticate securely.
* Save and manage a list of AWBs.
* View real-time shipment status updates.
* Receive visual cues for at-risk shipments (e.g., empty POD status).
* Search for AWBs using provided filters.

## Wireframes (Conceptual)

* **Login/Signup Page:** Simple form for user authentication.
* **Dashboard:**
    * Displays a list of saved AWBs with key information (HAWB/HBL, status, etc.).
    * Visual indicators for at-risk shipments.
    * Search/filter bar.
    * "Add AWB" button.
* **AWB Details Page:**
    * Displays detailed shipment information.
    * Status history.

## User Stories (MVP)

* **Authentication:**
    * As a user, I want to create an account so I can save my AWBs.
    * As a user, I want to log in so I can access my saved AWBs.
* **AWB Management:**
    * As a user, I want to save an AWB to my tracking list.
    * As a user, I want to view a list of my saved AWBs.
    * As a user, I want to delete AWBs from my list.
    * As a user, I want to edit the saved AWBs.
* **Status Tracking:**
    * As a user, I want to see the real-time status of my saved AWBs.
    * As a user, I want to easily identify AWBs with potential issues (e.g., empty POD).
* **Search/Filtering:**
    * As a user I want to be able to search for AWBs using specific parameters.

## Technologies Used

* **Frontend:**
    * React.js: For building the user interface.
    * Build in fetch: For making fetch API requests to the backend.
    * React Router: For client side routing.
    * CSS/Styled-components: For styling.
* **API Communication:**
    * JSON over HTTP.

## Models (Data Structures)

* **User:**
    * `username` (string)
    * `email` (string)
    * `token` (string, after login)
* **SavedAWB:**
    * `_id` (string)
    * `awbId` (string, reference to FreightData)
* **FreightData:**
    * `HAWB/HBL` (string)
    * `Departure Port` (string)
    * `Destination Port` (string)
    * `Proof Of Delivery (POD)` (string)
    * ... (other relevant shipment data) - see github for more

## MVP Scope

* Basic user authentication (signup/login).
* Display of saved AWBs with essential information.
* Visual indicators for at-risk shipments.
* Basic search functionality.
* Ability to add, delete, and edit saved AWBs.
* Display of detailed shipment information.
* No advanced UI/UX features (maps, charts).
* No real time updates, using polling.

## Reflections

Pros - implemented a full Mern Stack 
Cons - time mgmt 
