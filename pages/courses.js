import { useState } from "react";
import { FaSearch, FaSortAlphaDown, FaFilter } from "react-icons/fa";
import courses from "../data/courses.json";
import { motion } from "framer-motion";

function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterTerm, setFilterTerm] = useState("");

  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      course.subject.toLowerCase().includes(filterTerm.toLowerCase())
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-black"
          >
            Courses
          </motion.h1>
          <div className="flex items-center mb-8">
            <div className="relative mr-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaSearch className="text-gray-500" />
              </span>
              <input
                type="text"
                className="w-64 rounded-full pl-10 pr-4 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex items-center text-gray-500 text-sm focus:outline-none"
              onClick={handleSortOrderToggle}
            >
              <FaSortAlphaDown
                className={`mr-1 ${sortOrder === "asc" ? "text-indigo-500" : ""}`}
              />
              Sort A-Z
            </button>
            <div className="relative ml-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaFilter className="text-gray-500" />
              </span>
              <select
                className="rounded-full pl-10 pr-4 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:shadow-outline-indigo"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
              >
                <option value="">All Subjects</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{sortedCourses.map((course) => (
<motion.div
key={course.id}
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
>
<div className="h-40 bg-gray-400 relative">
<img
                 src={course.image}
                 alt={course.name}
                 className="absolute inset-0 object-cover w-full h-full"
               />
</div>
<div className="p-4">
<h2 className="text-lg font-bold mb-2 text-gray-700">{course.name}</h2>
<p className="text-gray-600 mb-4">{course.description}</p>
<div className="flex items-center justify-between">
<span className="text-indigo-500 font-bold">
{course.rating.toFixed(1)} 
</span>
<span className="text-gray-500 text-sm">
{course.reviews.length} Reviews
</span>
</div>
</div>
</motion.div>
))}
</div>
</div>
</div>
</div>
);
}

export default CourseList;
