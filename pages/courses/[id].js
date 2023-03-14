import { useRouter } from 'next/router'
import { MdStar } from 'react-icons/md'
import Link from 'next/link';
import courses from '../../data/courses.json'
// import Image from 'next/image'
import { motion } from 'framer-motion'

const CourseDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const course = courses.find((course) => course.id === parseInt(id))

  const variants = {
    hidden: {
      opacity: 0,
      y: -50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  if (!course) {
    return <div>Course not found.</div>
  }

  return (
    <motion.div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8"
      initial="hidden"
      animate="visible"
      variants={variants}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-none lg:w-1/2 mr-4">
          <img src={course.image} alt={course.name} width={400} height={250} className="rounded-lg shadow-md" />
        </div>
        <div className="flex-1 mt-4 lg:mt-0">
          <h1 className="text-3xl font-bold text-white-900">{course.name}</h1>
          <div className="flex items-center mt-2">
            <MdStar className="text-yellow-500 w-6 h-6 mr-1" />
            <span className="text-white-600">{course.rating.toFixed(1)}</span>
            <span className="text-sm text-white-500 ml-1">({course.reviews.length} reviews)</span>
          </div>
          <p className="text-white-700 mt-4">{course.description}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white-900">Reviews</h2>
        {course.reviews.length === 0 ? (
          <p className="mt-2 text-white-700">No reviews yet.</p>
        ) : (
          course.reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg px-4 py-2 mt-4">
              <b><p className="text-gray-700 mt-2">{"Teacher: " + review.teacher}</p></b>
              <div className="flex items-center">
                <MdStar className="text-yellow-500 w-6 h-6 mr-1" />
                <span className="text-gray-600">{review.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <p className="text-gray-700 mt-2 text-xs">{review.date}</p>
            </div>
          ))
        )}
      </div>
      <br></br>
      <Link href="/courses">
          <p className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out mb-4">
            Add Rating
          </p>
      </Link>
    </motion.div>
  )
}

export default CourseDetail;