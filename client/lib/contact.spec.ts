import { describe, it, expect } from "vitest";
import { contactSchema } from "@/components/sections/ContactSection";
import { PROJECTS, PROFILE_INFO } from "@/data/portfolio";

describe("Contact Form Validation Schema", () => {
  it("should accept valid form data", () => {
    const validData = {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      message: "I would love to discuss a software engineering opportunity with you.",
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject names shorter than 2 characters", () => {
    const invalidData = {
      name: "A",
      email: "alex@example.com",
      message: "Hello, this is a message with sufficient length.",
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 2 characters");
    }
  });

  it("should reject names longer than 50 characters", () => {
    const invalidData = {
      name: "A".repeat(51),
      email: "alex@example.com",
      message: "Hello, this is a message with sufficient length.",
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("cannot exceed 50 characters");
    }
  });

  it("should reject invalid email addresses", () => {
    const invalidEmails = [
      "not-an-email",
      "user@",
      "@example.com",
      "user@example",
    ];

    for (const email of invalidEmails) {
      const result = contactSchema.safeParse({
        name: "Valid Name",
        email,
        message: "This is a valid message for testing purposes.",
      });
      expect(result.success).toBe(false);
    }
  });

  it("should reject messages shorter than 10 characters", () => {
    const invalidData = {
      name: "Valid Name",
      email: "valid@example.com",
      message: "Too short",
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 10 characters");
    }
  });

  it("should reject messages longer than 1000 characters", () => {
    const invalidData = {
      name: "Valid Name",
      email: "valid@example.com",
      message: "A".repeat(1001),
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("cannot exceed 1000 characters");
    }
  });
});

describe("Portfolio Data Integrity", () => {
  it("should contain profile info with valid email and links", () => {
    expect(PROFILE_INFO.name).toBe("Tejas Kadam");
    expect(PROFILE_INFO.socials.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(PROFILE_INFO.socials.github).toContain("github.com");
    expect(PROFILE_INFO.socials.linkedin).toContain("linkedin.com");
    expect(PROFILE_INFO.resumePath).toBe("/Tejas-Kadam-Resume.pdf");
  });

  it("should contain valid projects with required properties", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    for (const project of PROJECTS) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech.length).toBeGreaterThan(0);
      expect(project.image).toBeTruthy();
    }
  });
});
