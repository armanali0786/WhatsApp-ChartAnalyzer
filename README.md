# WhatsApp-ChartAnalyzer
This project analyzes WhatsApp group chat data to visualize user engagement. It shows daily activity trends, identifies active and consistent users, highlights peak activity days, and provides insights through interactive charts and stats to understand participation patterns over time.


## 🚀 Features

- **📁 Drag & Drop Upload** - Intuitive file upload interface for chat exports
- **📊 Interactive Visualizations** - Dual bar charts showing daily messaging and joining user activity
- **📈 Stats Card** - Summary statistics including total messages, averages, and peak activity
- **👥 Active User Tracking** - Highlights most engaged users (4+ active days)

## Project Screenshots 
- Upload whatsapp txt file
  
<img width="1791" height="990" alt="Screenshot from 2026-01-21 22-33-25" src="https://github.com/user-attachments/assets/9efddb85-36bc-4b23-90ab-f7289915e42f" />

- Chart View and also stats card
  
<img width="1791" height="990" alt="Screenshot from 2026-01-21 22-34-48" src="https://github.com/user-attachments/assets/7371f43e-a1b9-4b00-ae9f-6414d089a871" />

- All Users Active for 4 days in last 7 days
<img width="1791" height="990" alt="Screenshot from 2026-01-21 22-34-56" src="https://github.com/user-attachments/assets/9dc3e7b5-2eea-47db-8c89-2522ca7067eb" />


## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Data Format](#data-format)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/armanali0786/WhatsApp-ChartAnalyzer.git
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 💻 Usage

### Basic Workflow

1. **Upload Chat File** - Drag and drop or browse to select your chat export file
2. **View Analytics** - The dashboard automatically processes and displays:
   - Daily message and user activity charts
   - Summary statistics
   - Most active users list
3. **Navigate** - Use the "Back to Dashboard" button to upload a new file

### Supported File Formats

- `.txt` - Plain text chat exports

## 🔌 API Integration

### Current Implementation

The dashboard expects a REST API endpoint that accepts a file upload and returns analytics data:

```javascript
// api/analyzeChat.js
export const analyzeChat = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('YOUR_API_ENDPOINT/analyze', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};
```

### Expected API Response Format

```json
{
  "graph": [
    {
      "date": "2021-04-01",
      "messages": 30
    },
    {
      "date": "2021-04-02",
      "messages": 9
    }
  ],
  "users": [
    {
      "name": "+91 16 91994",
      "activeDays": 7
    }
  ],
  "active4DaysUsers": [
    {
      "name": "+91 16 91994",
      "activeDays": 7
    }
  ]
}
```


## 📁 Frontned Project Structure

```
chat-analytics-dashboard/
├── src/
│   ├── components/
│   │   ├── ChatUpload.jsx       # File upload interface
│   │   ├── ChartOverview.jsx    # Main analytics chart
│   │   └── ActiveUsers.jsx      # Active users list
│   ├── api/
│   │   └── analyzeChat.js       # API integration
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point
├── public/
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Recharts** - Data visualization library
- **Vite** - Build tool and dev server

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.263.1"
  }
}
```

## 📊 Data Format

### Input Data Structure

The application processes chat data with the following structure:

#### Graph Data (Daily Activity)
```javascript
{
  date: "YYYY-MM-DD",    // ISO date string
  messages: number       // Total messages sent that day
}
```

#### User Data
```javascript
{
  name: string,          // User identifier (phone, username, etc.)
  activeDays: number     // Number of days user was active
}
```

**For accurate metrics**, modify your backend to return:
```json
{
  "graph": [
    {
      "date": "2021-04-01",
      "messages": 30,
      "activeUsers": 12,    
      "newUsers": 3         
    }
  ]
}
```

Then update the chart data mapping in `ChartOverview.jsx`:

```javascript
const chartData = graph.map(item => ({
  date: formatDate(item.date),
  messagingUsers: item.activeUsers,    // Use actual data
  joiningUsers: item.newUsers,         // Use actual data
  messages: item.messages
}));
```

## 🎨 Customization

### Changing Colors

Update the bar colors in `ChartOverview.jsx`:

```javascript
<Bar 
  dataKey="messagingUsers" 
  fill="#3b82f6"  // Change this hex color
  name="Users Messaging"
/>
<Bar 
  dataKey="joiningUsers" 
  fill="#f97316"  // Change this hex color
  name="Users Joining"
/>
```

### Modifying Chart Height

Adjust the `ResponsiveContainer` height:

```javascript
<ResponsiveContainer width="100%" height={400}>
  {/* Change 400 to your desired height */}
</ResponsiveContainer>
```

### Adding More Metrics

To add additional statistics cards, update the stats section:

```javascript
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
  {/* Existing cards */}
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <p className="text-sm text-gray-600 mb-1">Your Metric</p>
    <p className="text-3xl font-bold text-gray-900">{yourValue}</p>
  </div>
</div>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/armanali0786)

## 🙏 Acknowledgments

- Recharts team for the excellent charting library

## 📞 Support

For support, email armanali.shaikh77@gmail.com or open an issue in the GitHub repository.

Linkedin: - https://www.linkedin.com/in/arman-ali-8383081ab

github:- https://github.com/armanali0786

MyPortfolio :- https://portfolio-armanali.netlify.app


---

**Made with ❤️ by Arman Ali**
