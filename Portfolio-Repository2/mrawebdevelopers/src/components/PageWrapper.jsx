import {motion,useReducedMotion} from 'framer-motion';

const variants = {
    initial: {opacity:0, rotateY:90, transformOrigin: "right center"},
    animate: {opacity:1, rotateY:0, transformOrigin:"right center"},
    exit: {opacity:0, rotateY:-90, transformOrigin:"left center"}
}

export default function PageWrapper({children}) {
    const prefersReducedMotion = useReducedMotion();
    const transition = prefersReducedMotion ?
        {duration: 0} : {duration: 0.45, ease:"easeInOut"};
    return (
        <motion.div 
        initial ="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
        className="min-h-screen [transform-style:preserve-3d]" >
        {children} 
        </motion.div>
    )

}