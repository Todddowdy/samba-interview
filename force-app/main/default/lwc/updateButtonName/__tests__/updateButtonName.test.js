import { createElement } from "@lwc/engine-dom";
import UpdateButtonName from "c/updateButtonName";

// Mock lightning/modal
jest.mock(
  "lightning/modal",
  () => {
    const { LightningElement } = require("lwc");
    return class MockLightningModal extends LightningElement {
      close(result) {
        return result;
      }
    };
  },
  { virtual: true }
);

describe("c-update-button-name", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("button name changed", async () => {
    // Arrange
    const element = createElement("c-update-button-name", {
      is: UpdateButtonName
    });
    document.body.appendChild(element);

    // Find input element
    const input = element.shadowRoot.querySelector("lightning-input");
    input.value = "New Button Name";

    // Change event
    input.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: "New Button Name" }
      })
    );

    await Promise.resolve();

    // Assert new button value
    expect(input.value).toBe("New Button Name");
    // Save button is enabled
    const saveButton = element.shadowRoot.querySelector("lightning-button");
    expect(saveButton.disabled).toBe(false);
  });
});
