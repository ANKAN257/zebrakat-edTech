import React, { useState } from "react";


function DSAHome({ mydsaproblems }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statuses, setStatuses] = useState(
    mydsaproblems.map(() => 'Not Done') // Default all rows to "In Progress"
  );

  // Ensure mydsaproblems array exists and is not empty
  if (!mydsaproblems || mydsaproblems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No DSA problems available
      </div>
    );
  }

  const filteredProblems = mydsaproblems.filter((problem) => {
    const matchesTopic = !selectedTopic || problem.topicTitle === selectedTopic;
    const matchesProblem =
      !selectedProblem || problem.problemName === selectedProblem;
    const matchesSearch = problem.problemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTopic && matchesProblem && matchesSearch;
  });

 
  const handleStatusChange = (index, status) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = status;
    setStatuses(updatedStatuses);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-pink-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">
            <a href="/dsa-problems">All Problems</a>
          </h1>
          <div className="space-x-4">
            <a href="/">
              <button className="bg-pink-700 hover:bg-pink-600 py-2 px-6 rounded-md transition-all">
                Home
              </button>
            </a>
            <a href="/blog">
              <button className="bg-pink-700 hover:bg-pink-600 py-2 px-6 rounded-md transition-all">
                Blogs
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-8 px-4 flex gap-6">
        {/* Sidebar */}
        <div className="bg-white w-1/4 min-h-screen p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Topics</h2>
          {Array.from(
            new Set(mydsaproblems.map((item) => item.topicTitle))
          ).map((topic) => (
            <div
              key={topic}
              role="button"
              aria-selected={selectedTopic === topic}
              className={`cursor-pointer text-lg p-3 rounded-md mb-2 transition-all hover:bg-pink-700 hover:text-white 
                ${
                  selectedTopic === topic
                    ? "bg-pink-900 text-white shadow-md"
                    : "bg-gray-100"
                }`}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedProblem(null);
              }}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Problem List */}
        <div className="flex-grow bg-white p-6 rounded-lg shadow-lg">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Search by problem title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Problem Name
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    First Question Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Article
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    YouTube Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Leetcode Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem, index) => (
                  <tr
                    key={index}
                    className={`${
                      statuses[index] === 'Done'
                        ? 'bg-green-200'
                        : statuses[index] === 'In Progress'
                        ? 'bg-yellow-200'
                        : ''
                    } hover:bg-gray-100 transition-transform duration-300`}
                  >
                    {/* Problem Name */}
                    <td className="px-4 py-2">{problem.problemName}</td>

                    {/* First Question Link */}
                    <td className="px-4 py-2">
                      <a
                        href={problem.questionLinkFirst}
                        className="text-pink-600 hover:underline"
                      >
                        {problem.questionLinkFirst}
                      </a>
                    </td>

                    {/* Article Link */}
                    <td className="px-4 py-2">
                      <a
                        href={problem.articleLink}
                        className="text-pink-600 hover:underline"
                      >
                        {problem.articleLink}
                      </a>
                    </td>

                    {/* YouTube Link */}
                    <td className="px-4 py-2">
                      <a
                        href={problem.youtubeLink}
                        className="text-pink-600 hover:underline"
                      >
                        {problem.youtubeLink}
                      </a>
                    </td>

                    {/* Second Question Link */}
                    <td className="px-4 py-2">
                      <a
                        href={problem.questionLinkSecond}
                        className="text-pink-600 hover:underline"
                      >
                        {problem.questionLinkSecond}
                      </a>
                    </td>

                    <td className="px-4 py-2">
                      <div>
                        <select
                          value={statuses[index]}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                          defaultValue="Not Done"
                          className="border p-2 rounded-md"
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                          <option value="Not Done">Not Done</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DSAHome;
