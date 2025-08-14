import { createElement } from "@lwc/engine-dom";
import PleaseClickButton from "c/pleaseClickButton";

// Modal Mock
jest.mock(
  "c/updateButtonName",
  () => ({
    open: jest.fn()
  }),
  { virtual: true }
);

describe("c-please-click-button", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("opens modal when button is clicked", async () => {
    // Import the mocked component
    const UpdateButtonName = require("c/updateButtonName");

    // Set up the mock
    UpdateButtonName.open.mockResolvedValue({ value: "Test Name" });

    // Create and mount component
    const element = createElement("c-please-click-button", {
      is: PleaseClickButton
    });
    document.body.appendChild(element);

    // Find and click button
    const button = element.shadowRoot.querySelector("lightning-button");
    button.click();

    await Promise.resolve();

    // Assert modal was called
    expect(UpdateButtonName.open).toHaveBeenCalledWith({
      size: "large"
    });
  });
});
