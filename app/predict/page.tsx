"use client";
import { useState } from "react";
import {
  Brain,
  TrendingUp,
  Users,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  BarChart3,
  Award,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

type ModelType = "supervised" | "unsupervised";

interface FormData {
  hours_studied_per_day: string;
  attendance_percentage: string;
  previous_semester_gpa: string;
  programming_assignment_score: string;
  project_completion_rate: string;
  hackathon_participation: string;
  debugging_skill_level: string;
  logic_reasoning_score: string;
  sleep_hours: string;
  screen_time_hours: string;
  internet_usage_study_ratio: string;
  extracurricular_involvement: string;
  class_participation_level: string;
  backlog_history_count: string;
}

export default function PredictPage() {
  const [modelType, setModelType] = useState<ModelType>("unsupervised");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    hours_studied_per_day: "4",
    attendance_percentage: "62",
    previous_semester_gpa: "8.38",
    programming_assignment_score: "75",
    project_completion_rate: "44",
    hackathon_participation: "1",
    debugging_skill_level: "4",
    logic_reasoning_score: "99",
    sleep_hours: "6",
    screen_time_hours: "9",
    internet_usage_study_ratio: "0.46",
    extracurricular_involvement: "0",
    class_participation_level: "3",
    backlog_history_count: "2",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_type: modelType,
          ...Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
              key,
              parseFloat(value) || parseInt(value),
            ])
          ),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError(
        "Failed to connect to API. Make sure Flask server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const getComparisonColor = (status: string) => {
    if (status.includes("above")) return "text-green-600 bg-green-50";
    if (status.includes("below")) return "text-red-600 bg-red-50";
    return "text-blue-600 bg-blue-50";
  };

  const getComparisonIcon = (status: string) => {
    if (status.includes("above")) return "↑";
    if (status.includes("below")) return "↓";
    return "=";
  };

  const inputFields = [
    {
      name: "hours_studied_per_day",
      label: "Study Hours per Day",
      min: 0,
      max: 12,
      step: 0.5,
      icon: "📚",
      required: true,
    },
    {
      name: "attendance_percentage",
      label: "Attendance %",
      min: 0,
      max: 100,
      step: 1,
      icon: "✅",
      required: true,
    },
    {
      name: "previous_semester_gpa",
      label: "Previous Semester GPA",
      min: 0,
      max: 10,
      step: 0.1,
      icon: "🎓",
      required: true,
    },
    {
      name: "programming_assignment_score",
      label: "Programming Assignment Score",
      min: 0,
      max: 100,
      step: 1,
      icon: "💻",
      required: modelType === "supervised",
    },
    {
      name: "project_completion_rate",
      label: "Project Completion Rate %",
      min: 0,
      max: 100,
      step: 1,
      icon: "📊",
      required: modelType === "supervised",
    },
    {
      name: "sleep_hours",
      label: "Sleep Hours per Day",
      min: 3,
      max: 12,
      step: 0.5,
      icon: "😴",
      required: modelType === "supervised",
    },
    {
      name: "screen_time_hours",
      label: "Screen Time Hours",
      min: 1,
      max: 14,
      step: 0.5,
      icon: "📱",
      required: true,
    },
    {
      name: "internet_usage_study_ratio",
      label: "Internet Study Ratio (0-1)",
      min: 0,
      max: 1,
      step: 0.1,
      icon: "🌐",
      required: true,
    },
    {
      name: "logic_reasoning_score",
      label: "Logic Reasoning Score",
      min: 0,
      max: 100,
      step: 1,
      icon: "🧠",
      required: modelType === "supervised",
    },
  ];

  const selectFields = [
    {
      name: "hackathon_participation",
      label: "Hackathon Participation",
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
      icon: "🏆",
      required: modelType === "supervised",
    },
    {
      name: "debugging_skill_level",
      label: "Debugging Skill (1-5)",
      options: Array.from({ length: 5 }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
      icon: "🐛",
      required: modelType === "supervised",
    },
    {
      name: "extracurricular_involvement",
      label: "Extracurricular Involvement",
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
      icon: "⚽",
      required: modelType === "supervised",
    },
    {
      name: "class_participation_level",
      label: "Class Participation (1-5)",
      options: Array.from({ length: 5 }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
      icon: "🙋",
      required: modelType === "supervised",
    },
    {
      name: "backlog_history_count",
      label: "Backlog Count",
      options: Array.from({ length: 11 }, (_, i) => ({
        value: String(i),
        label: String(i),
      })),
      icon: "📝",
      required: modelType === "supervised",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <Link href={"/"}> SmartStudent AI</Link>
            </span>
          </div>
          <div className="text-sm text-gray-600">AI Prediction System</div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Model Selection */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              AI-Powered Student Analysis
            </h1>
            <p className="text-gray-600 mb-6">Choose your analysis type</p>

            <div className="inline-flex gap-4 p-2 bg-white rounded-2xl shadow-lg border border-gray-200">
              <button
                onClick={() => {
                  setModelType("supervised");
                  setResult(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  modelType === "supervised"
                    ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                Score Prediction
              </button>
              <button
                onClick={() => {
                  setModelType("unsupervised");
                  setResult(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  modelType === "unsupervised"
                    ? "bg-linear-to-r from-pink-600 to-orange-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="w-5 h-5" />
                Student Clustering
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                {modelType === "supervised" ? (
                  <div className="w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-linear-to-r from-pink-600 to-orange-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modelType === "supervised"
                      ? "Exam Score Predictor"
                      : "Learning Pattern Analyzer"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {modelType === "supervised"
                      ? "Predict your final exam score"
                      : "Discover your student profile"}
                  </p>
                </div>
              </div>

              <div className="space-y-4  overflow-y-auto pr-2">
                {inputFields
                  .filter((field) => !field.required || field.required)
                  .map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.icon} {field.label}
                      </label>
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required={field.required}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      />
                    </div>
                  ))}

                {selectFields
                  .filter((field) => !field.required || field.required)
                  .map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.icon} {field.label}
                      </label>
                      <select
                        name={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-4 py-3 border-2 border-gray-200 text-gray-800 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                    modelType === "supervised"
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-[1.02]"
                      : "bg-linear-to-r from-pink-600 to-orange-600 hover:shadow-lg hover:scale-[1.02]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      {modelType === "supervised"
                        ? "🎯 Predict Score"
                        : "🔍 Analyze Profile"}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-red-900 mb-1">Error</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && result.model_type === "supervised" && (
                <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Prediction Results
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-6xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {result.prediction}
                      </div>
                      <div className="text-2xl font-bold text-gray-700 mb-1">
                        Predicted Score
                      </div>
                      <div className="inline-block px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold">
                        Grade: {result.grade}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            Assessment
                          </h4>
                          <p className="text-gray-700">{result.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            Recommendation
                          </h4>
                          <p className="text-gray-700">
                            {result.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Top Influential Factors
                      </h4>
                      <div className="space-y-2">
                        {result.top_influential_factors?.map(
                          (factor: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center"
                            >
                              <span className="text-gray-700">
                                {factor.feature}
                              </span>
                              <span className="font-bold text-indigo-600">
                                {factor.importance}%
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result && result.model_type === "unsupervised" && (
                <div className="bg-linear-to-br from-pink-50 to-orange-50 rounded-3xl p-8 border-2 border-pink-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Your Student Profile
                    </h3>
                  </div>

                  {/* Cluster Badge */}
                  <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg text-center">
                    <div className="text-6xl mb-3">{result.cluster_emoji}</div>
                    <div className="text-4xl font-black bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      {result.cluster_name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Cluster #{result.cluster}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-2xl p-5 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-pink-600" />
                      Profile Description
                    </h4>
                    <p className="text-gray-700">{result.description}</p>
                  </div>

                  {/* Cluster Characteristics */}
                  <div className="bg-white rounded-2xl p-5 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-pink-600" />
                      Cluster Characteristics
                    </h4>
                    <ul className="space-y-2">
                      {result.characteristics?.map(
                        (char: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 shrink-0"></div>
                            <span className="text-gray-700">{char}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Detailed Comparison */}
                  {result.detailed_comparison && (
                    <div className="bg-white rounded-2xl p-5 mb-4">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-pink-600" />
                        How You Compare to Your Group
                      </h4>
                      <div className="space-y-3">
                        {result.detailed_comparison.map(
                          (comp: any, idx: number) => (
                            <div
                              key={idx}
                              className="border border-gray-200 rounded-xl p-3"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">
                                  {comp.metric}
                                </span>
                                <span
                                  className={`text-xs font-bold px-2 py-1 rounded-full ${getComparisonColor(
                                    comp.status
                                  )}`}
                                >
                                  {getComparisonIcon(comp.status)}{" "}
                                  {comp.status
                                    .replace("average for", "")
                                    .trim()}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div>
                                  <span className="text-gray-500">You: </span>
                                  <span className="font-bold text-gray-900">
                                    {comp.your_value}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">
                                    Group Avg:{" "}
                                  </span>
                                  <span className="font-bold text-gray-700">
                                    {comp.cluster_average}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Advice */}
                  <div className="bg-linear-to-r from-pink-600 to-orange-600 rounded-2xl p-5 text-white">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Personalized Advice
                    </h4>
                    <p>{result.advice}</p>
                  </div>
                </div>
              )}

              {!result && !error && (
                <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-500">
                    Fill in your details and click analyze to see your profile
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
