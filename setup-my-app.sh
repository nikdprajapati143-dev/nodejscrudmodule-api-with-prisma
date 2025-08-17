#!/bin/bash

# Define project name
PROJECT_NAME="my-app"

echo "📁 Creating project: $PROJECT_NAME"
mkdir -p $PROJECT_NAME/{config,controllers,middlewares,models,routes}

# Create files
touch $PROJECT_NAME/{.env,package.json,app.js,server.js}
touch $PROJECT_NAME/config/db.js
touch $PROJECT_NAME/controllers/{authController.js,userController.js}
touch $PROJECT_NAME/middlewares/authMiddleware.js
touch $PROJECT_NAME/models/User.js
touch $PROJECT_NAME/routes/{authRoutes.js,userRoutes.js}

echo "📦 Initializing Node.js project..."
cd $PROJECT_NAME
npm init -y > /dev/null
npm install express mongoose dotenv jsonwebtoken bcrypt express-validator > /dev/null
npm install --save-dev nodemon > /dev/null

# Modify package.json for ESModules and scripts
npx json -I -f package.json -e '
this.type="module";
this.scripts = {
  "start": "node server.js",
  "dev": "nodemon server.js"
}' > /dev/null

# Write .env content
cat <<EOF > .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mydb
JWT_SECRET=your_jwt_secret
EOF

echo "✅ Project $PROJECT_NAME structure is ready."
echo "➡️  Run the project using: cd $PROJECT_NAME && npm run dev"
