// import { Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { FolderOpen, Users, Award, ArrowRight } from "lucide-react";

// const Home = () => {
//   const { isAuthenticated, user } = useAuth();

//   // Reusable Tailwind button styles
//   const primaryBtn =
//     "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-md bg-blue-600 text-white hover:bg-blue-500";
//   const secondaryBtn =
//     "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-md bg-white text-blue-600 hover:bg-gray-100";

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="max-w-5xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Welcome to ProjectPool
//           </h1>
//           <p className="text-lg md:text-2xl mb-8 text-blue-100">
//             Discover, submit, and manage student projects with ease
//           </p>

//           {isAuthenticated ? (
//             <div className="space-y-4">
//               <p className="text-lg">
//                 Welcome back,{" "}
//                 <span className="font-semibold">{user?.firstName}</span>! Ready
//                 to explore projects?
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link to="/projects" className={secondaryBtn}>
//                   Browse Projects
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>
//                 <Link to="/my-submissions" className={primaryBtn}>
//                   My Submissions
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/signup" className={secondaryBtn}>
//                 Get Started
//                 <ArrowRight className="h-4 w-4" />
//               </Link>
//               <Link to="/login" className={primaryBtn}>
//                 Login
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//             Why Choose ProjectPool?
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FolderOpen className="h-8 w-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Diverse Projects</h3>
//               <p className="text-gray-600">
//                 Explore a wide range of projects from web development to AI and
//                 machine learning.
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="h-8 w-8 text-green-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
//               <p className="text-gray-600">
//                 Submit projects as a team and collaborate with fellow students.
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Award className="h-8 w-8 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
//               <p className="text-gray-600">
//                 Track your submissions and get feedback from administrators.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How it Works Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//             How It Works
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: 1,
//                 title: "Browse Projects",
//                 desc: "Explore our curated list of exciting projects across different domains.",
//               },
//               {
//                 step: 2,
//                 title: "Submit Your Choice",
//                 desc: "Choose a project and submit your team details and contact information.",
//               },
//               {
//                 step: 3,
//                 title: "Get Approved",
//                 desc: "Wait for admin approval and start working on your selected project.",
//               },
//             ].map((item) => (
//               <div key={item.step} className="text-center">
//                 <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       {!isAuthenticated && (
//         <section className="py-16 bg-blue-600 text-white">
//           <div className="max-w-5xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
//             <p className="text-lg mb-8 text-blue-100">
//               Join thousands of students already using ProjectPool
//             </p>
//             <Link to="/signup" className={secondaryBtn}>
//               Create Account
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { FolderOpen, Users, Award, ArrowRight, Zap, Target, CheckCircle, Sparkles, BookOpen, Clock, TrendingUp } from "lucide-react";


const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ firstName: "Alex" });
  const [isVisible, setIsVisible] = useState(false);
  const [statsCounter, setStatsCounter] = useState({ projects: 0, students: 0, success: 0 });

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setStatsCounter({ projects: 150, students: 500, success: 95 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const primaryBtn = "group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden";
  
  const secondaryBtn = "group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm text-blue-700 shadow-xl hover:shadow-2xl border border-white/50 hover:bg-white overflow-hidden";

  const features = [
    {
      icon: FolderOpen,
      title: "Smart Project Discovery",
      description: "AI-powered recommendations match you with perfect projects based on your skills and interests",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: "100ms"
    },
    {
      icon: Users,
      title: "Seamless Team Formation",
      description: "Connect with like-minded students and form dream teams with our intelligent matching system",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      delay: "200ms"
    },
    {
      icon: Award,
      title: "Zero-Conflict Allocation",
      description: "Revolutionary algorithm ensures fair project distribution with transparent, real-time approval tracking",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      delay: "300ms"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Discover & Explore",
      description: "Browse curated projects with detailed requirements, tech stacks, and difficulty levels",
      icon: BookOpen,
      color: "from-orange-400 to-red-500"
    },
    {
      step: 2,
      title: "Apply Instantly",
      description: "Submit your team application with one-click forms and automatic validation",
      icon: Zap,
      color: "from-blue-400 to-indigo-500"
    },
    {
      step: 3,
      title: "Track Progress",
      description: "Monitor approval status in real-time with notifications and timeline updates",
      icon: TrendingUp,
      color: "from-emerald-400 to-green-500"
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium mb-6 border border-blue-200/50">
              <Sparkles className="w-4 h-4" />
              <span>ProjectPool V1 • Now Live</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              End the Chaos of
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Project Selection
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The revolutionary platform that brings clarity, fairness, and transparency to final year project allocation. 
              <span className="font-semibold text-blue-600"> No more conflicts. No more confusion.</span>
            </p>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{statsCounter.projects}+</div>
                <div className="text-gray-600 text-sm md:text-base">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{statsCounter.students}+</div>
                <div className="text-gray-600 text-sm md:text-base">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{statsCounter.success}%</div>
                <div className="text-gray-600 text-sm md:text-base">Success Rate</div>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  Welcome back, <span className="font-bold text-blue-600">{user?.firstName}</span>! 
                  Ready to explore amazing projects? 🚀
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className={secondaryBtn}>
                    <span>Browse Projects</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  <button className={primaryBtn}>
                    <span>My Dashboard</span>
                    <Target className="h-5 w-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className={secondaryBtn}
                  onClick={() => setIsAuthenticated(true)}
                >
                  <span>Get Started Free</span>
                  <Zap className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className={primaryBtn}>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>Why Students Love ProjectPool</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Built for the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Student</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of academic project management with features designed to eliminate stress and maximize success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-3xl ${feature.bgColor} border border-white/60 hover:border-white/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Simple. Fast. <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Effective.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get from confusion to clarity in just three simple steps. No more endless emails or manual processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                We Solved the <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Nightmare</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Multiple teams fighting for the same project",
                  "Endless confusion & manual approvals", 
                  "Zero clarity on \"who gets what\"",
                  "Conflicts that waste time & energy"
                ].map((problem, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{problem}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Our Solution</span>
              </h3>
              <div className="space-y-4">
                {[
                  "One Team = One Project • Zero conflicts",
                  "Instant approval system • No more waiting",
                  "Complete transparency • Know your status",
                  "Streamlined process • Save time & energy"
                ].map((solution, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-emerald-100/70 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <span className="text-gray-700 font-medium">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
       <section className="py-24 bg-gradient-to-b from-blue-50 to-blue-100 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-4">
              <Clock className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about using ProjectPool.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Is ProjectPool free to use for students?",
                answer: "Yes! ProjectPool is completely free for students. Our mission is to remove barriers and make final year project allocation stress-free."
              },
              {
                question: "Can I use my existing university credentials to log in?",
                answer: "You can sign in using your university email, and we support institutional SSO for partnered colleges."
              },
              {
                question: "How do team applications work?",
                answer: "Teams apply for projects collaboratively, and our system ensures no duplicate claims. Once a project is claimed and approved, it’s instantly locked to that team."
              },
              {
                question: "Is there an admin panel for faculty?",
                answer: "Yes, we offer a robust admin dashboard for faculty to manage approvals, view applications, and monitor project progress."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-xl shadow-md group open:shadow-lg transition-all">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 group-open:text-blue-700">
                  {faq.question}
                  <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

       <footer className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-t border-orange-100 py-8">
  <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
    
    {/* Branding Icon */}
    <div className="flex justify-center">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l6 6-6 6M9 7h12M9 17h12" />
        </svg>
      </div>
    </div>

    {/* Copyright */}
    <p className="text-sm text-gray-600">
      © {new Date().getFullYear()} <span className="font-semibold text-orange-600">ProjectPool</span>. All rights reserved.
    </p>

    {/* Tagline */}
    <p className="text-sm italic text-gray-500">
      “Empowering students to build, collaborate, and innovate without barriers.”
    </p>

  </div>
</footer>


     
    </div>
   
      
    </>
  );
};

export default Home;



