import type { CSSProperties } from "react";

export const typography = {
  h1: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1.625)",
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1.5)",
    lineHeight: 1.25,
  },
  h3: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1.25)",
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1.125)",
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1)",
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 0.875)",
    lineHeight: 1.45,
  },
  subtitle1: {
    fontFamily: "var(--font-family-base-variant)",
    fontWeight: "var(--font-weight-bold)",
    fontSize: "calc(var(--font-size-base) * 1)",
    lineHeight: 1.4,
  },
  subtitle2: {
    fontFamily: "var(--font-family-base-variant)",
    fontWeight: "var(--font-weight-medium)",
    fontSize: "calc(var(--font-size-base) * 0.875)",
    lineHeight: 1.4,
  },
  body1: {
    fontFamily: "var(--font-family-base-variant)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1)",
    lineHeight: 1.5,
  },
  body2: {
    fontFamily: "var(--font-family-base-variant)",
    fontWeight: "var(--font-weight-medium)",
    fontSize: "calc(var(--font-size-base) * 0.875)",
    lineHeight: 1.5,
  },
  menu: {
    fontFamily: "var(--font-family-base)",
    fontWeight: "var(--font-weight-normal)",
    fontSize: "calc(var(--font-size-base) * 1)",
    lineHeight: 1.4,
  },
  dialogTitle: {
    fontFamily: "var(--font-family-base-variant)",
    fontWeight: "var(--font-weight-medium)",
    fontSize: "calc(var(--font-size-base) * 1.25)",
    lineHeight: 1.6,
  },
} as const satisfies Record<string, CSSProperties>;
