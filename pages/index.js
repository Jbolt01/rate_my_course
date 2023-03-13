import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import courses from '../data/courses.json';

const HomePage = () => {
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API and update the state
  }, []);
  

  return (
    <>
      <Head>
        <title>Montgomery Blair High School Course Reviews</title>
        <meta
          name="description"
          content="Find and review courses at Montgomery Blair High School."
        />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
          Montgomery Blair High School Course Reviews
        </h1>
        <Link href="/courses">
          <p className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out mb-4">
            View All Courses
          </p>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`}>
              <motion.div
                key={course.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md rounded-md p-6 flex flex-col items-center"
              >
                <div className="bg-gray-200 w-12 h-12 rounded-full flex justify-center items-center mb-4">
                  <HiOutlineClipboardList className="text-gray-500 w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-black">{course.name}</h2>
                <div className="flex items-center">
                  <AiFillStar className="text-yellow-500 w-4 h-4 mr-1" />
                  <span className="text-black">{course.rating}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;