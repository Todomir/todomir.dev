export default {
  container: {
    hidden: {},
    show: {},
    exit: {}
  },

  cards: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 1
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        delayChildren: 0.2
      }
    },
    item: {
      hidden: { opacity: 0, x: 10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.75 } },
      exit: { opacity: 0, y: 10, transition: { duration: 0.7 } }
    }
  },

  title: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 0.25 } },
    exit: { opacity: 0, y: 30, transition: { duration: 1.2, delay: 0.75 } }
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
