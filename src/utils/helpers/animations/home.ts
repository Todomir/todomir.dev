export default {
  // container variants
  container: {
    hidden: {},
    show: {},
    exit: {}
  },

  shape: {
    hidden: { opacity: 0, marginTop: -30 },
    show: {
      opacity: 1,
      marginTop: 0,
      transition: { ease: [0.625, 0.545, 0.0, 1.005], duration: 2 }
    },
    exit: {
      opacity: 0,
      marginTop: -30,
      transition: {
        delay: 0.25,
        duration: 1.4,
        ease: [0.625, 0.545, 0.0, 1.005]
      }
    }
  },

  image: {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.25,
        duration: 1.55,
        ease: [0.625, 0.545, 0.0, 1.005]
      }
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: {
        delay: 0.25,
        duration: 1,
        ease: [0.625, 0.545, 0.0, 1.005]
      }
    }
  },

  header: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 1.75
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    item: {
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
  },
  title: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    item: {
      hidden: { opacity: 0, y: 10 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ease: [0.625, 0.545, 0.0, 1.005],
          duration: 0.45
        }
      },
      exit: {
        opacity: 0,
        y: 10,
        transition: {
          ease: [0.625, 0.545, 0.0, 1.005],
          duration: 0.45
        }
      }
    }
  },
  footer: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 1.75
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    item: {
      hidden: { opacity: 0, y: 30 },
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
        y: 30,
        transition: {
          ease: [0.625, 0.545, 0.0, 1.005],
          duration: 0.95
        }
      }
    }
  }
}
