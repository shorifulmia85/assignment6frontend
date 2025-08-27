import { Button } from "@/components/ui/button";
import heroImages from "@/assets/images/Home/heroImage.png";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";

const EASE = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.02,
        ease: EASE,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  const badgeItem: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: EASE },
    },
  };

  const imageWrap: Variants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
      rotate: prefersReducedMotion ? 0 : -1.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: prefersReducedMotion
        ? { duration: 0.5, ease: EASE }
        : {
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.8,
            delay: 0.1,
          },
    },
  };

  return (
    <BackgroundMeteors>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="
            grid grid-cols-12 gap-6
            lg:items-center lg:py-24
            min-h-[60vh]
          "
        >
          {/* Left: copy */}
          <motion.div
            className="col-span-12 lg:col-span-6 order-2 lg:order-1 space-y-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div>
              <motion.h1
                variants={item}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight"
              >
                Get there faster with
              </motion.h1>
              <motion.h2
                variants={item}
                className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary)]"
              >
                SwiftRide
              </motion.h2>
            </div>

            <motion.p
              variants={item}
              className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-prose"
            >
              Seamless pickups, transparent pricing, and safety-first
              rides—built with industry-grade engineering and UX.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ y: prefersReducedMotion ? 0 : -1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full text-base px-6 bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90"
                >
                  Get started
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ y: prefersReducedMotion ? 0 : -1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base sm:text-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                >
                  How it works
                </Button>
              </motion.div>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-5 pt-2"
              aria-label="Highlights"
            >
              <motion.span
                variants={badgeItem}
                className="flex items-center gap-2 text-sm sm:text-base text-green-600"
              >
                <span className="bg-green-600 rounded-full w-3 h-3" />
                24/7 support
              </motion.span>
              <motion.span
                variants={badgeItem}
                className="flex items-center gap-2 text-sm sm:text-base text-amber-500"
              >
                <span className="bg-amber-500 rounded-full w-3 h-3" />
                Cashless & cash
              </motion.span>
              <motion.span
                variants={badgeItem}
                className="flex items-center gap-2 text-sm sm:text-base text-blue-600"
              >
                <span className="bg-blue-600 rounded-full w-3 h-3" />
                Safety certified
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            className="col-span-12 lg:col-span-6 order-1 lg:order-2"
            variants={imageWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="relative">
              <motion.img
                src={heroImages}
                alt="SwiftRide app preview"
                className="relative z-10 w-full h-[60vh] object-contain drop-shadow-2xl"
                loading="eager"
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundMeteors>
  );
};

export default Hero;
