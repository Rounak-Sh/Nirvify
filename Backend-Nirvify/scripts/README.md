# Nirvify Admin Scripts

This folder contains utility scripts for managing the Nirvify application.

## Create Admin User

The `createAdmin.js` script creates an admin user in the database with the following credentials:

- **Email**: admin@nirvify.com
- **Password**: admin123
- **Role**: admin

### How to Run

To create the admin user, run:

```bash
npm run create-admin
```

This will:

1. Connect to your MongoDB Atlas database (using the connection string from your .env file)
2. Check if an admin with the email "admin@nirvify.com" already exists
3. If not, create a new admin user with the specified credentials
4. The password will be securely hashed using bcrypt with a salt factor of 12

### When to Use

Use this script:

- After initial deployment to set up your admin user
- When switching from local MongoDB to MongoDB Atlas
- If you need to reset the admin credentials

### Notes

- This script will not create duplicate admin users if one already exists with the same email
- The script automatically exits after completion
- You can modify this script to create different types of users or batch operations
