
# Property Rental Platform (LAND ME)

This project is a property rental platform developed using Next.js. It allows users to browse property listings, add properties to their cart, and manage bookings. The application combines coding, UI design, logical thinking, user interaction, and critical problem-solving skills.

## Features

- **Dynamic Property Listings**: Users can view detailed information about properties on dynamic pages.
- **User Management**: Each user has a unique account to manage their bookings and cart.
- **Shopping Cart**: Users can add properties to their cart for later booking.
- **Order Management**: Upon booking, properties are moved from the cart to the orders model.

## Models

The application uses the following models:

1. **Property**: Contains information about the properties, including:
   - Property ID
   - Name
   - Description
   - Price
   - Location
   - Images

2. **User**: Represents a user in the system, with fields like:
   - User ID
   - Name
   - Email
   - Password (hashed)

3. **Cart**: Maintains the list of properties that a user has added to their cart:
   - Cart ID
   - User ID (foreign key)
   - List of Product IDs (references to Property)

4. **Orders**: Keeps track of the properties that have been booked:
   - Order ID
   - User ID (foreign key)
   - List of Product IDs (references to Property)

## How It Works

1. **Viewing Properties**: When a user clicks on a property, they are directed to a dynamic page that displays all relevant information about that property.
   
2. **Adding to Cart**: Users can add properties to their cart. This action creates an entry in the Cart model associated with the user ID and the list of product IDs.

3. **Booking Properties**: When a user decides to book a property from their cart, the application deletes the properties from the Cart model and creates an entry in the Orders model, reflecting the completed transaction.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MridulTi/totality-frontend-challenge.git
   cd property-rental-platform
   ```

2. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```plaintext
   MONGODB_URI=mongodb://your_username:your_password@your_host:your_port/
   your_database
   ```

4. **Run the Development Server**:
   Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Visit the Application**: Open your web browser and navigate to `http://localhost:3000` to start using the property rental platform.

## Conclusion

This project not only demonstrates the capabilities of Next.js for building dynamic web applications but also provides an excellent foundation for anyone interested in creating a property rental platform. Feel free to customize and extend the features as per your requirements!