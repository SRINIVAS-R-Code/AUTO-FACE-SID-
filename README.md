# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Running Locally in VS Code

To run this project on your local machine using Visual Studio Code, follow these steps:

1.  **Install Dependencies:**
    Open a terminal in VS Code and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    This project uses Genkit for its AI features, which requires a Gemini API key.
    -   A file named `.env.local` has been created for you in the root of the project.
    -   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Add the following line to your `.env.local` file, replacing `"YOUR_API_KEY_HERE"` with your actual key:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

3.  **Run the Development Server:**
    Once the dependencies are installed and your environment variables are set, you can start the Next.js development server:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:3000`.
