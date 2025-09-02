
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    >
    {children}
    </motion.div>

  );
}
