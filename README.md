

---

# Delicipes

Delicipes is a modern recipe-sharing platform that allows users to discover, share, and create delicious recipes. Whether you're looking for breakfast ideas, dinner inspiration, or a unique dessert, Delicipes has you covered with a rich collection of recipes from various cuisines.

## Features

- **Recipe Collection**: Browse a wide range of recipes with detailed ingredients, cooking steps, and nutritional information.
- **User Accounts**: Sign up and create your own recipe collection, save your favorite recipes, and share them with others.
- **Search Functionality**: Find recipes quickly by name, ingredients, or cuisine.
- **Responsive Design**: Enjoy a seamless experience across desktops, tablets, and mobile devices.
- **Recipe Submission**: Share your favorite homemade recipes with the world by submitting them through the user interface.
- **Interactive Features**: Rate and comment on recipes to help other users discover the best dishes.
- **SSO Authentication**: Log in and sign up using single sign-on (SSO) for a smoother experience.

## Getting Started

To start using Delicipes, follow the steps below:

### 1. Create an Account
Sign up using the **Sign Up** button on the homepage. You can log in via your preferred Single Sign-On (SSO) provider or create a new account directly.

### 2. Browse Recipes
Explore a collection of recipes categorized created by other users
### 3. Save and Share Recipes
Once you've signed up, you can start saving your favorite recipes to your profile. You can also submit your own recipes and share them with the community.

### 4. Rate and Comment
After trying a recipe, leave a rating or comment to help others discover the best recipes and cooking tips.

## Technologies Used

- **Frontend**: React.js, HTML5, CSS3
- **Backend**: nextJs
- **Authentication**: Clerk
- **Database**: MongoDB 
- **Deployment**: Hosted on a linux base server whit caprover

## How to Run Locally

If you want to run the project locally, follow these steps:

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/delicipes.git
cd delicipes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add any necessary API keys or environment-specific variables (e.g., database URI, SSO credentials).

```bash
REACT_APP_API_URL=http://localhost:5000
DATABASE_URL=mongodb://localhost:27017/delicipes
```

### 4. Start the Development Server

Run the following command to start the frontend and backend servers:

```bash
npm start
```

### 5. Visit the Site

Open your browser and go to `http://localhost:3000` to see the application in action.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or suggestions, feel free to contact us at [contact@jsescobar.pro](mailto:contact@jsescobar.pro).


