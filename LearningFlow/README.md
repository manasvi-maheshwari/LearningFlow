# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying Your Application

This project is a modern Next.js application that includes server-side features for AI functionality. Because of this, it cannot be deployed to a static hosting service like GitHub Pages.

Instead, it is pre-configured for deployment on **Firebase App Hosting**, a service designed to run full-stack web apps like this one.

### Deployment with Firebase App Hosting

Firebase App Hosting connects directly to a GitHub repository to build and deploy your application automatically.

1.  **Create a GitHub Repository:**
    *   Create a new repository on your GitHub account.
    *   Push this project's code to your new repository.

2.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Click "Add project" and follow the steps to create a new Firebase project.

3.  **Set up App Hosting:**
    *   In your new Firebase project, navigate to the **Build** section in the left-hand menu and select **App Hosting**.
    *   Click "Get started" and follow the on-screen prompts to connect your GitHub account and select the repository you just created.
    *   Firebase will automatically detect the `apphosting.yaml` file and configure the deployment settings.

4.  **Deploy:**
    *   Once connected, Firebase App Hosting will automatically build and deploy your application. Every subsequent push to your main branch will trigger a new deployment.

Your application will be live at the URL provided by Firebase App Hosting.
