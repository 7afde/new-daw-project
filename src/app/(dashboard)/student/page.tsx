import React from "react";
import { Bell, Send, CheckCircle, Clock } from "lucide-react";

const StudentPage = () => {
  // Sample data - in a real app, this would come from an API or props
  const stats = {
    sent: 12,
    accepted: 5,
    waiting: 7,
  };

  const notifications = [
    {
      id: 1,
      title: "Project Accepted",
      message: "You have been accepted to Project 2.",
      timestamp: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Project Rejected",
      message: "You have been rejected from Project 3.",
      timestamp: "1 day ago",
      type: "error",
    },
    {
      id: 3,
      title: "Upcoming Deadline",
      message: "The deadline for the next project phase is in 3 days.",
      timestamp: "2 days ago",
      type: "warning",
    },
  ];

  return (
    <div className="p-6 max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold mb-8">Student Dashboard</h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications Sent Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Applications Sent
            </h3>
            <Send className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.sent}</div>
        </div>

        {/* Applications Accepted Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Applications Accepted
            </h3>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.accepted}
          </div>
        </div>

        {/* Applications Waiting Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Applications Waiting
            </h3>
            <Clock className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.waiting}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-md mt-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 block mt-2">
                    {notification.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
