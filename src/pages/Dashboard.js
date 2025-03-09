import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MESSAGES_PER_PAGE = 5;

// Generate a list of distinct colors for the chart bars
const getRandomColor = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(`hsl(${(i * 360) / numColors}, 70%, 60%)`); // Generates distinct colors using HSL
  }
  return colors;
};

const Dashboard = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const messages = [
    { user: "Alice", message: "Hello!", timestamp: "2025-03-06 10:00 AM" },
    { user: "Bob", message: "How are you?", timestamp: "2025-03-06 10:05 AM" },
    { user: "Charlie", message: "Good morning!", timestamp: "2025-03-06 10:10 AM" },
    { user: "Alice", message: "Let's meet at 3 PM.", timestamp: "2025-03-06 10:15 AM" },
    { user: "Bob", message: "Sounds good.", timestamp: "2025-03-06 10:20 AM" },
    { user: "Charlie", message: "See you later!", timestamp: "2025-03-06 10:25 AM" },
    { user: "Alice", message: "Reminder about the meeting.", timestamp: "2025-03-06 10:30 AM" },
    { user: "Bob", message: "Got it!", timestamp: "2025-03-06 10:35 AM" },
    { user: "Charlie", message: "Thanks!", timestamp: "2025-03-06 10:40 AM" },
    { user: "Alice", message: "Final confirmation.", timestamp: "2025-03-06 10:45 AM" },
    { user: "David", message: "Let's schedule another call.", timestamp: "2025-03-06 10:50 AM" },
    { user: "Emma", message: "That works for me!", timestamp: "2025-03-06 10:55 AM" },
    { user: "Frank", message: "I'll prepare the agenda.", timestamp: "2025-03-06 11:00 AM" },
    { user: "George", message: "Looking forward to it.", timestamp: "2025-03-06 11:05 AM" },
    { user: "Hannah", message: "I'll send the invite.", timestamp: "2025-03-06 11:10 AM" },
    { user: "Alice", message: "Reminder about the deadline.", timestamp: "2025-03-06 11:15 AM" },
    { user: "Bob", message: "I'm reviewing it now.", timestamp: "2025-03-06 11:20 AM" },
    { user: "Charlie", message: "We should discuss this.", timestamp: "2025-03-06 11:25 AM" },
    { user: "David", message: "Let's set up a meeting.", timestamp: "2025-03-06 11:30 AM" },
    { user: "Emma", message: "Good idea, I'll arrange it.", timestamp: "2025-03-06 11:35 AM" },
  ];

  const userFrequency = messages.reduce((acc, { user }) => {
    acc[user] = (acc[user] || 0) + 1;
    return acc;
  }, {});

  const frequentUsers = Object.entries(userFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([user, count]) => `${user}: ${count} messages`);

  // Generate colors for chart bars
  const userNames = Object.keys(userFrequency);
  const colors = getRandomColor(userNames.length);

  const chartData = {
    labels: userNames,
    datasets: [
      {
        label: "Total Messages",
        data: Object.values(userFrequency),
        backgroundColor: colors,
      },
    ],
  };

  // Pagination Logic
  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const displayedMessages = messages.slice(
    (page - 1) * MESSAGES_PER_PAGE,
    page * MESSAGES_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: "flex", marginTop: 8 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        {/* Two-column layout for Messages & Most Frequent Users */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Last Messages with Pagination */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{t("last_ten_messages")}</Typography>
            <Paper sx={{ p: 2, height: "100%" }}>
              <List>
                {displayedMessages.map((msg, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={msg.user}
                      secondary={`${msg.message} - ${msg.timestamp}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Paper>
          </Box>

          {/* Most Frequent Users */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{t("most_frequent")}</Typography>
            <Paper sx={{ p: 2, height: "100%" }}>
              {frequentUsers.map((text, index) => (
                <Typography key={index} variant="body1">
                  {text}
                </Typography>
              ))}
            </Paper>
          </Box>
        </Box>

        {/* Chart below */}
        <Box sx={{ mt: 2, paddingTop: 6 }}>
          <Typography variant="h6">{t("message_distribution")}</Typography>
          <Paper sx={{ p: 2 }}>
            <Bar data={chartData} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
