import { Bell, BookOpen, UserCheck, Users } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Teachers
            </h3>
            <Users className="h-4 w-4 text-gray-500" />
          </div>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Students
            </h3>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">156</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Active Projects
            </h3>
            <BookOpen className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">18</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Groups</h3>
            <UserCheck className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">System Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Max Projects Per Teacher</span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Max Group Size</span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Max Applications Per Student</span>
              <span className="font-bold">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-blue-500" />
                <span className="text-sm">
                  New teacher registration request
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
