import { motion } from "framer-motion";

const Motion = ({children}) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: "-50px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
          {children}
    </motion.div>
  )
}

export default Motion
