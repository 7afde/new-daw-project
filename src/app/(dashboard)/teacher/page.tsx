import { BookOpen, Users, Clock, CheckCircle } from "lucide-react";

const TeacherPage = () => {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Teacher Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">My Projects</h3>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">4</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Groups</h3>
            <Users className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Pending Applications
            </h3>
            <Clock className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">7</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Students
            </h3>
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Applications and Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Group Application #{i + 1}</span>
                </div>
                <span className="text-sm text-yellow-500">Pending</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Project Status</h2>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span>Project #{i + 1}</span>
                </div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
