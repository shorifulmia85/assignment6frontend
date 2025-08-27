import { roleCards } from "@/data/productFetaures";
import type { Feature, RoleCard } from "@/types/home";
import {
  motion,
  useReducedMotion,
  type Variants,
  MotionConfig,
} from "framer-motion";
import { Link } from "react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

const ProductFeatured = () => {
  const prefersReducedMotion = useReducedMotion();

  // Common transitions
  const container: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: 0.02,
        ease: EASE,
      },
    },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const badge: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0.35, ease: EASE }
        : { type: "spring", stiffness: 220, damping: 20 },
    },
  };

  const lineItem: Variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: prefersReducedMotion
        ? { duration: 0.3, ease: EASE }
        : { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "never"}
      transition={{ ease: EASE }}
    >
      <div className="bg-card px-4">
        <div className="max-w-7xl mx-auto py-16">
          {/* Heading */}
          <motion.h1
            className="text-2xl lg:text-3xl font-bold mb-2 text-foreground"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Products Features
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            A modular platform engineered for scale with role-based
            capabilities.
          </motion.p>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {roleCards?.map((item: RoleCard) => (
              <motion.div
                key={item?.id}
                className="rounded-xl p-5 bg-card shadow-lg hover:shadow-md will-change-transform transition-shadow"
                variants={card}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.01,
                        transition: {
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        },
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              >
                {/* Badge */}
                <motion.p
                  variants={badge}
                  className="rounded-xl bg-muted px-3 py-1 text-sm text-muted-foreground border border-border mb-5 w-fit"
                >
                  {item?.role}
                </motion.p>

                {/* Features */}
                <div className="mb-3 space-y-2">
                  {item?.features?.map((feature: Feature, idx: number) => (
                    <motion.div
                      key={feature?.id ?? idx}
                      variants={lineItem}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-foreground">{feature?.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <Link
                    className="text-foreground underline-offset-4 hover:underline"
                    to={item?.cta?.href}
                  >
                    {item?.cta?.label}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default ProductFeatured;
