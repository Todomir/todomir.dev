export default {
  container: {
    hidden: {},
    show: {},
    exit: {}
  },

  link: {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.94 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.88 } }
  },

  title: {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.94, delay: 0.15 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.88, delay: 0.15 } }
  },

  header: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.35
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        delayChildren: 0.35
      }
    }
  },

  headerItem: {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.625, 0.545, 0.0, 1.005],
        duration: 1.25
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        ease: [0.625, 0.545, 0.0, 1.005],
        duration: 0.8
      }
    }
  },

  content: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.65
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        delayChildren: 0.65
      }
    }
  },
  contentParagraph: {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.625, 0.545, 0.0, 1.005],
        duration: 1.25
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        ease: [0.625, 0.545, 0.0, 1.005],
        duration: 0.8
      }
    }
  }
}
