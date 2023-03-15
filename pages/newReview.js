import { useRouter } from 'next/router'
import { MdStar } from 'react-icons/md'
import Link from 'next/link';
// import courses from '../data/courses.json'
// import Image from 'next/image'
import { motion } from 'framer-motion'

const newReview = () => {

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


  return (
    
    <motion.div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8"
      initial="hidden"
      animate="visible"
      variants={variants}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mt-4 lg:mt-0">
          <p className="text-white-700 mt-4">{'a'}</p>
        </div>
      </div>
      <br></br>
      <Link href="/newReview">
          <p className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out mb-4">
            Add Rating
          </p>
      </Link>
    </motion.div>
  )
}

export default newReview;