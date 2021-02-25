export default {
  container: {
    hidden: {
      y: 0
    },
    show: {
      y: 0
    }
  },
  shape: {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: [0.51, 0.57, 0.2, 1.105]
      }
    }
  },
  header: {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1.8,
        staggerChildren: 0.06
      }
    },

    item: {
      hidden: {
        opacity: 0,
        y: -30
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.51, 0.57, 0.2, 1.105]
        }
      },
      hover: {
        y: -10,
        transition: {
          duration: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  },
  title: {
    hidden: {
      y: 0
    },
    show: {
      y: 0,
      transition: {
        delayChildren: 0.67,
        staggerChildren: 0.07
      }
    },

    item: {
      hidden: {
        opacity: 0,
        y: 10
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.51, 0.57, 0.2, 1.105]
        }
      }
    }
  },
  footer: {
    hidden: {
      y: 0
    },
    show: {
      y: 0,
      transition: {
        delayChildren: 1.8,
        staggerChildren: 0.09
      }
    },

    item: {
      hidden: {
        opacity: 0,
        y: 10
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.51, 0.57, 0.2, 1.105]
        }
      }
    }
  }
}
