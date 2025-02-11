import { motion } from "framer-motion";

const reviews = [
  {
    name: "John Doe",
    text: "This platform changed my life! Highly recommended.",
  },
  {
    name: "Jane Smith",
    text: "Fantastic courses with real-world applications.",
  },
  {
    name: "Alex Johnson",
    text: "Great user experience and knowledgeable instructors.",
  },
];

const Reviews = () => {
  return (
    <section className="py-16 bg-gray-100 text-gray-900">
      <h2 className="text-center text-4xl font-bold mb-8">
        What Our Students Say
      </h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 shadow-lg rounded-lg w-80"
          >
            <p className="italic">"{review.text}"</p>
            <h4 className="mt-4 font-bold text-lg">- {review.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
