import { test, expect } from "@playwright/test";

test.describe("Edit Navigation", () => {
  test("should navigate to edit page with single click on dot menu", async ({
    page,
  }) => {
    // Navigate to the tasks page
    await page.goto("/tasks");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check if there are any tasks in the table
    const tableRows = page.locator("table tbody tr");
    const rowCount = await tableRows.count();

    if (rowCount === 0) {
      // If no tasks exist, create one first
      await page.click("text=Add Task");
      await page.waitForURL("/tasks/add");

      // Fill out the form
      await page.fill('input[name="task"]', "Test Task");
      await page.fill('input[name="description"]', "Test Description");
      await page.selectOption('select[name="frequency"]', "D");
      await page.fill('input[name="displayDay"]', "[1]");
      await page.fill('input[name="deadline"]', "[1]");

      // Submit the form
      await page.click('button[type="submit"]');
      await page.waitForURL("/tasks");
    }

    // Wait for the table to be visible
    await expect(page.locator("table")).toBeVisible();

    // Find the first row with a dot menu (actions column)
    const firstRow = page.locator("table tbody tr").first();
    const dotMenuButton = firstRow
      .locator('button[aria-label="Open menu"], button:has-text("Open menu")')
      .first();

    // Click the dot menu button
    await dotMenuButton.click();

    // Wait for the dropdown menu to appear
    await expect(page.locator('[role="menu"]')).toBeVisible();

    // Click the "Edit Task" option
    const editMenuItem = page.locator(
      '[role="menuitem"]:has-text("Edit Task")'
    );
    await expect(editMenuItem).toBeVisible();
    await editMenuItem.click();

    // Verify we're on the edit page
    await page.waitForURL(/\/tasks\/.*\/edit/);

    // Verify the edit form is visible
    await expect(page.locator('h4:has-text("Edit Task:")')).toBeVisible();
    await expect(page.locator("form")).toBeVisible();

    // Verify the form has the expected fields
    await expect(page.locator('input[name="task"]')).toBeVisible();
    await expect(page.locator('input[name="description"]')).toBeVisible();
    await expect(page.locator('select[name="frequency"]')).toBeVisible();
  });

  test("should work on mobile devices", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the tasks page
    await page.goto("/tasks");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check if there are any tasks in the table
    const tableRows = page.locator("table tbody tr");
    const rowCount = await tableRows.count();

    if (rowCount === 0) {
      // If no tasks exist, create one first
      await page.click("text=Add Task");
      await page.waitForURL("/tasks/add");

      // Fill out the form
      await page.fill('input[name="task"]', "Mobile Test Task");
      await page.fill('input[name="description"]', "Mobile Test Description");
      await page.selectOption('select[name="frequency"]', "D");
      await page.fill('input[name="displayDay"]', "[1]");
      await page.fill('input[name="deadline"]', "[1]");

      // Submit the form
      await page.click('button[type="submit"]');
      await page.waitForURL("/tasks");
    }

    // Wait for the table to be visible
    await expect(page.locator("table")).toBeVisible();

    // Find the first row with a dot menu (actions column)
    const firstRow = page.locator("table tbody tr").first();
    const dotMenuButton = firstRow
      .locator('button[aria-label="Open menu"], button:has-text("Open menu")')
      .first();

    // Verify the button is large enough for touch (44px minimum)
    const buttonBox = await dotMenuButton.boundingBox();
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44);

    // Click the dot menu button
    await dotMenuButton.click();

    // Wait for the dropdown menu to appear
    await expect(page.locator('[role="menu"]')).toBeVisible();

    // Click the "Edit Task" option
    const editMenuItem = page.locator(
      '[role="menuitem"]:has-text("Edit Task")'
    );
    await expect(editMenuItem).toBeVisible();
    await editMenuItem.click();

    // Verify we're on the edit page
    await page.waitForURL(/\/tasks\/.*\/edit/);

    // Verify the edit form is visible and responsive
    await expect(page.locator('h4:has-text("Edit Task:")')).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });
});
