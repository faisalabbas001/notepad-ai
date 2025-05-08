# Notepad Web App

A modern, SEO-optimized online notepad built with Next.js, designed for productivity, accessibility, and user personalization. This application offers both basic and advanced text editing capabilities in a sleek, modern interface.

## Features

### Basic Editor Tools
- **Create** – Start a new document.
- **Edit** – Modify existing text with standard text-editing capabilities.
- **Open File** – Upload and open `.txt`, `.docx`, `.pdf` files from local computer.
- **Save As** – Save your document in multiple formats:
  - `.txt`
  - `.pdf`
  - `.docx` (Word)

### Clipboard and Formatting
- **Cut**
- **Copy**
- **Paste**
- **Select All**
- **Insert Special Characters** – Insert symbols, emojis, and Unicode characters.
- **Find and Replace** – Powerful search with match case and replace options.

### View Options
- **Zoom In/Out** – Adjust text size for better readability.
- **Full-Screen Mode** – Toggle full screen for distraction-free writing.

### Account and File Management
- **User Accounts** – Login, logout, and manage user profile.
- **Cloud Save** – Save documents securely in user account.
- **Access Saved Files** – View and open previously saved files.

### Output and Export
- **Print** – Directly print documents from the editor.
- **Save As PDF** – Export documents as PDF.
- **Save As Word/DOCX** – Export as Word-compatible format.

### SEO Features
- **Server-Side Rendering (SSR)** – Enhanced performance and SEO
- **Static Site Generation (SSG)** – Fast page loads and better indexing
- **Meta Tags** – Dynamic meta descriptions and titles
- **Open Graph Protocol** – Rich social media sharing
- **Structured Data** – Enhanced search engine understanding
- **Sitemap Generation** – Automatic sitemap creation
- **Robots.txt** – Search engine crawling instructions

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React.js
- **Styling**: Tailwind CSS
- **Editor**: Quill.js
- **State Management**: React Context API / Redux Toolkit

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **File Storage**: AWS S3
- **PDF/Word Export**: jsPDF, html-docx-js

### SEO & Performance
- **SEO Tools**: next-seo
- **Analytics**: Google Analytics
- **Performance**: Lighthouse optimization
- **Caching**: Redis

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- MongoDB instance
- AWS S3 bucket (for file storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notepad-web-app.git
cd notepad-web-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
notepad-web-app/
├── app/                 # Next.js 14 app directory
├── components/         # React components
├── lib/               # Utility functions
├── public/            # Static assets
├── styles/            # Global styles
├── types/             # TypeScript types
└── prisma/            # Database schema
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Quill.js for the rich text editor
- All contributors who have helped shape this project 