import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FolderOpen, Users, Award, ArrowRight } from "lucide-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Reusable Tailwind button styles
  const primaryBtn =
    "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-md bg-blue-600 text-white hover:bg-blue-500";
  const secondaryBtn =
    "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-md bg-white text-blue-600 hover:bg-gray-100";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to ProjectPool
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-blue-100">
            Discover, submit, and manage student projects with ease
          </p>

          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg">
                Welcome back,{" "}
                <span className="font-semibold">{user?.firstName}</span>! Ready
                to explore projects?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects" className={secondaryBtn}>
                  Browse Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/my-submissions" className={primaryBtn}>
                  My Submissions
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className={secondaryBtn}>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className={primaryBtn}>
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose ProjectPool?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Projects</h3>
              <p className="text-gray-600">
                Explore a wide range of projects from web development to AI and
                machine learning.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Submit projects as a team and collaborate with fellow students.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600">
                Track your submissions and get feedback from administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Browse Projects",
                desc: "Explore our curated list of exciting projects across different domains.",
              },
              {
                step: 2,
                title: "Submit Your Choice",
                desc: "Choose a project and submit your team details and contact information.",
              },
              {
                step: 3,
                title: "Get Approved",
                desc: "Wait for admin approval and start working on your selected project.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Join thousands of students already using ProjectPool
            </p>
            <Link to="/signup" className={secondaryBtn}>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

