# AI Customer Support Agent

An intelligent, strict-yet-polite customer support assistant built with Next.js and the Vercel AI SDK, powered by Google's Gemini model. This application automates the refund process by strictly adhering to company policies, fetching order details, and recording its decision-making process before responding to the customer.

## 🚀 Features

- **Real-Time Chat Interface**: A responsive chat UI built with React and Tailwind CSS, utilizing the AI SDK's `useChat` hook for seamless streaming.
- **Automated Refund Processing**: The AI agent evaluates refund requests based on predefined company rules (e.g., 7-day window for electronics, non-refundable food items).
- **Multi-Step Tool Calling**: 
  - `lookupOrder`: The AI automatically queries a mock database to retrieve customer and order details using an Order ID.
  - `recordDecision`: The AI is required to officially log its final decision (Approved/Denied) along with step-by-step reasoning *before* replying to the user.
- **Admin Dashboard**: A dedicated view (`/admin`) for human supervisors to monitor the AI's reasoning, tool executions, and final decisions in real-time.
- **Robust AI Integration**: Uses `@ai-sdk/google` with Gemini Flash Lite for fast, cost-effective streaming responses and Zod for strict tool input validation.

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI/Styling**: React, Tailwind CSS
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Validation**: [Zod](https://zod.dev/)

## 📋 Prerequisites

To run this project locally, you need:
- Node.js (v18 or higher recommended)
- A Google Gemini API Key

## 🚦 Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd ai-customer-support
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Set up Environment Variables:**
   
   Create a `.env.local` file in the root of the project and add your Google Generative AI API key:
   
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```

5. **Open the application:**
   - **Customer Chat**: Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the AI assistant.
   - **Admin Dashboard**: Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the agent's decision logs.

## 🧠 How the AI Works

The AI is configured via a comprehensive system prompt in `src/app/api/chat/route.ts`. It follows a strict workflow:
1. **Understand** the customer's request.
2. **Fetch** the relevant data using the `lookupOrder` tool.
3. **Evaluate** the data against 9 strict refund rules.
4. **Log** the outcome and reasoning using the `recordDecision` tool.
5. **Respond** to the user with the final outcome.

*Note: Order data is simulated using `src/data/mockData.json`.*

## 📚 References

- [Generating Text with AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core/generating-text)
- [useChat Hook in AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
- [Chatbot Tool Usage with streamText](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)
