/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon, ChevronDownIcon, Layers2Icon } from "lucide-react";
import { useLogOutMutation, authApi } from "@/redux/features/authApi/authApi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";

export default function UserProfileDropdown() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const { data } = useGetMeQuery(undefined);
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
    } catch (error: any) {
      if (!error?.data?.success) {
        toast.error(error?.data?.message);
      }
    }
  };

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first menu item when opening
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => firstItemRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full p-0.5 text-sm hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          {/* AvatarImage */}
          <img
            src="./avatar.jpg"
            alt="Profile image"
            className="h-full w-full object-cover"
            onError={(e) => {
              // fallback background if image fails
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* AvatarFallback (shown if img hidden) */}
          <span className="pointer-events-none absolute inset-0 hidden items-center justify-center text-xs font-medium text-foreground [img[alt='Profile image']:hidden_+_&]:flex">
            SH
          </span>
        </span>
        <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
      </button>

      {/* Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="menu"
            aria-label="User menu"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl border border-border bg-popover p-2 shadow-lg backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex flex-col gap-0.5 px-2 py-1.5">
              <span className="truncate text-sm font-medium text-foreground">
                {data?.data?.name || data?.data?.userId?.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {data?.data?.email || data?.data?.userId?.email}
              </span>
            </div>

            <div className="my-2 h-px w-full bg-border/70" />

            {/* Items */}
            <div className="flex flex-col">
              <button
                ref={firstItemRef}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <BoltIcon size={16} className="opacity-70" aria-hidden="true" />
                <Link
                  to="/"
                  className="flex-1"
                  onClick={(_e) => {
                    // allow Link navigation and also close menu
                    setOpen(false);
                  }}
                >
                  Profile
                </Link>
              </button>

              <button
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <Layers2Icon
                  size={16}
                  className="opacity-70"
                  aria-hidden="true"
                />
                <Link to="/" className="flex-1" onClick={() => setOpen(false)}>
                  Setting
                </Link>
              </button>

              <button
                role="menuitem"
                onClick={async () => {
                  await handleLogOut();
                  setOpen(false);
                }}
                className="mt-1 inline-flex items-center justify-center rounded-md border border-muted bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
