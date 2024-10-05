import "../assets/tailwind.css"
function injectTailwindIntoDocument() {
  try {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = chrome.runtime.getURL("content-scripts/content.css");

    linkElement.onload = () => {
      console.log("Tailwind CSS injected and loaded into the main document.");
    };

    linkElement.onerror = () => {
      console.error("Failed to load Tailwind CSS for the main document.");
    };

    document.head.appendChild(linkElement);
  } catch (error) {
    console.error("Error injecting Tailwind CSS into the document:", error);
  }
}

function injectTailwindIntoShadowRoot(shadowRoot: ShadowRoot) {
  try {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = chrome.runtime.getURL("content-scripts/content.css");

    linkElement.onload = () => {
      console.log("Tailwind CSS injected and loaded into shadow DOM.");
    };

    linkElement.onerror = () => {
      console.error("Failed to load Tailwind CSS for shadow DOM.");
    };

    shadowRoot.appendChild(linkElement);
  } catch (error) {
    console.error("Error injecting Tailwind CSS into shadow DOM:", error);
  }
}

// Main function to define the content script
export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui", // Make sure this option is supported in your environment

  async main(ctx) {
    try {
      console.log("Injecting content script...");

      // Inject any custom scripts if necessary
      await injectScript("/injected.js", {
        keepInDom: true, // Keep the script in DOM after execution
      });

      console.log("Script injected successfully!");

      // Now, create the UI within the shadow DOM
      const ui = await createUi(ctx);
      ui.mount();
    } catch (error) {
      console.error("Error in the main function execution:", error);
    }
  },
});

function createUi(ctx: any) {
  return createShadowRootUi(ctx, {
    name: "tailwind-shadow-root-example",
    position: "inline",
    anchor: "body", // Attach the shadow DOM to the body
    append: "first", // Ensure the element is inserted as the first child
    onMount: (uiContainer, shadowRoot) => {
      try {
        // Inject Tailwind CSS into shadow root
        injectTailwindIntoShadowRoot(shadowRoot);
        injectTailwindIntoDocument();

        // Add a paragraph element with Tailwind classes
        const p = document.createElement("p");
        p.classList.add("text-lg", "text-red-500", "font-bold", "p-8");
        p.textContent = "Hello from shadow root with Tailwind CSS applied!";
        uiContainer.append(p);
      } catch (error) {
        console.error("Error during UI mount:", error);
      }
    },
  });
}
