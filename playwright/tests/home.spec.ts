import { test, expect } from "@playwright/test";

test("home page renders heading and social links", async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId("home-heading")).toContainText("Samuel Bush");
  await expect(
    page.getByText(
      "Senior IT Engineer at SecurityMetrics, Master of Computer Science",
    ),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/samuelbush92/",
  );
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/sbush92",
  );
});