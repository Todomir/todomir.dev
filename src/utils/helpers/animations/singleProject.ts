export default {
  container: {
    hidden: {},
    show: {},
    exit: {}
  },

  bg: {
    hidden: { y: -478, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.3,
        when: 'beforeChildren',
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: {
      y: -478,
      opacity: 0,
      transition: {
        duration: 1.5,
        when: 'afterChildren',
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  },

  header: {
    hidden: { opacity: 1 },
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        delayChildren: 1
      }
    }
  },

  headerItem: {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.7 } }
  },

  description: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.45 } },
    exit: { opacity: 0, y: 30, transition: { duration: 1, delay: 0.45 } }
  },

  logo: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.75 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.75, delay: 0.25 } }
  }
}
