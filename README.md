# Professional CSV Data Viewer and Filter

A powerful application for uploading, viewing, and filtering CSV data with support for various formats, structured table displays, and multi-field filtering capabilities. Highlights errors in malformed rows to ensure data integrity.

## 🚀 Features

- **CSV Upload**: Easily upload and parse CSV files of any size
- **Structured Data Display**: View data in a clean, interactive table format
- **Advanced Filtering**: Apply complex multi-field filters to your dataset
- **Error Highlighting**: Instantly see malformed or invalid rows
- **TypeScript Support**: Built with TypeScript for type safety and better development experience
- **Modular Components**: Clean separation of concerns with reusable components

## 📦 Technologies Used

- React (with Vite)
- TypeScript
- CSV Parsing utilities
- Modern CSS practices

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- A Gemini API key (for advanced features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammad-parvizi-dev/Professional-CSV-Data-Viewer-and-Filter.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env.local` file with your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Usage

1. Open your browser to `http://localhost:3000`
2. Use the file upload component to select a CSV file
3. View your data in the structured table
4. Apply filters using the filter controls
5. See error highlights for any malformed rows

## 📁 Project Structure

```
├── components/
│   ├── DataTable.tsx       # Main data display component
│   ├── FileUpload.tsx      # CSV file upload interface
│   └── FilterControls.tsx  # Filtering UI controls
├── utils/
│   └── csvParser.ts        # CSV parsing and validation logic
├── App.tsx                 # Main application component
├── index.html              # Entry point for the web app
├── index.tsx               # React entry point
├── metadata.json           # Application metadata
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration file
```

## 📌 Contributing

1. Fork the project
2. Create your feature/bugfix branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧠 Credits

- Developed by Mohammad Parvizi
- Inspired by modern React/TypeScript best practices
