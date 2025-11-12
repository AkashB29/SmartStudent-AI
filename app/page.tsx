"use client";

import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Users,
  ArrowRight,
  Sparkles,
  BarChart3,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SmartStudent AI
            </span>
          </div>
          <Link
            href="/predict"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Powered by Advanced Machine Learning
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              Predict Academic{" "}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Success
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Harness the power of AI to predict exam scores and identify
              learning patterns. Get personalized insights and recommendations
              for academic excellence.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/predict"
                className="group px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-semibold"
              >
                Start Prediction
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all font-semibold"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { value: "95%", label: "Prediction Accuracy", icon: TrendingUp },
              { value: "1000+", label: "Students Analyzed", icon: Users },
              { value: "2", label: "ML Models", icon: Brain },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
              >
                <stat.icon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Two Powerful{" "}
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Models
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Supervised and unsupervised learning working together for
              comprehensive insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Supervised Learning Card */}
            <div className="group bg-linear-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl hover:shadow-2xl transition-all border-2 border-indigo-100 hover:border-indigo-300">
              <div className="w-14 h-14 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Score Prediction
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our Random Forest Regressor analyzes 14 key features including
                study habits, attendance, and past performance to predict your
                final exam score with high accuracy.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time predictions",
                  "Personalized recommendations",
                  "Feature importance analysis",
                  "Grade classification",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Unsupervised Learning Card */}
            <div className="group bg-linear-to-br from-pink-50 to-orange-50 p-8 rounded-3xl hover:shadow-2xl transition-all border-2 border-pink-100 hover:border-pink-300">
              <div className="w-14 h-14 bg-linear-to-r from-pink-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Student Clustering
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                K-Means clustering identifies your learning pattern group among
                High Performers, Average Performers, or At-Risk Students based
                on behavior analysis.
              </p>
              <ul className="space-y-3">
                {[
                  "Pattern recognition",
                  "Peer group insights",
                  "Targeted advice",
                  "Behavioral analysis",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Data",
                desc: "Provide your academic information including study hours, attendance, and past scores",
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our ML models process your data using advanced algorithms and trained patterns",
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Get Insights",
                desc: "Receive predictions, recommendations, and actionable insights for improvement",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200">
                  <div
                    className={`text-6xl font-black bg-linear-to-r ${item.color} bg-clip-text text-transparent mb-4`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-linear-to-r from-indigo-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Predict Your Success?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join students using AI to improve their academic performance
            </p>
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl hover:shadow-2xl transition-all hover:scale-105 font-bold text-lg"
            >
              Start Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold">SmartStudent AI</span>
          </div>
          <p className="text-sm">
            © 2024 AI/ML Academic Performance Predictor. Built with Next.js &
            Python.
          </p>
        </div>
      </footer>
    </div>
  );
}
