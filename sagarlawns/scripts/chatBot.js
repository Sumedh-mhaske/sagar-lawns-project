// chatBot.js
document.addEventListener("DOMContentLoaded", function () {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotWindow = document.getElementById("chatbot-window");
  const closeButton = document.getElementById("close-chat");
  const chatContent = document.getElementById("chat-content");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-btn");

  // Position settings for the chatbot icon (can be changed)
  let currentPosition = "bottom-right"; // default position

  // Function to set the position of the chatbot icon
  function setIconPosition(position) {
    // Remove all position classes first
    chatbotIcon.className =
      "fixed cursor-pointer rounded-full bg-green-600 p-4 shadow-lg transition-transform hover:scale-110 z-50";
    chatbotWindow.className =
      "fixed hidden w-80 rounded-lg bg-white p-4 shadow-lg z-[99999]";

    switch (position) {
      case "top-right":
        chatbotIcon.classList.add("top-5", "right-5");
        chatbotWindow.classList.add("top-16", "right-5");
        break;
      case "top-left":
        chatbotIcon.classList.add("top-5", "left-5");
        chatbotWindow.classList.add("top-16", "left-5");
        break;
      case "bottom-left":
        chatbotIcon.classList.add("bottom-5", "left-5");
        chatbotWindow.classList.add("bottom-16", "left-5");
        break;
      case "bottom-right":
      default:
        chatbotIcon.classList.add("bottom-5", "right-5");
        chatbotWindow.classList.add("bottom-16", "right-5");
        break;
    }

    currentPosition = position;
  }

  // Initialize with default position
  setIconPosition(currentPosition);

  // Add pulse animation to the chatbot icon instead of bounce (tailwind has pulse built-in)
  chatbotIcon.classList.add("animate-pulse");

  // Toggle chatbot window
  chatbotIcon.addEventListener("click", function () {
    chatbotWindow.classList.toggle("hidden");
    if (!chatbotWindow.classList.contains("hidden")) {
      // Add welcome message if chat is empty
      if (chatContent.innerHTML === "") {
        addBotMessage(
          "Hello! I'm the Sagar Lawns Chat Bot. How can I help you today?",
        );
      }
      chatInput.focus();
    }
  });

  // Close chatbot window
  closeButton.addEventListener("click", function () {
    chatbotWindow.classList.add("hidden");
  });

  // Send message on button click
  sendButton.addEventListener("click", sendMessage);

  // Send message on Enter key
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Function to add a message to the chat window
  function addMessage(content, isUser) {
    const messageDiv = document.createElement("div");

    // Using only Tailwind classes
    if (isUser) {
      messageDiv.className =
        "mb-2 p-2 rounded-lg bg-green-100 ml-auto max-w-[80%] break-words";
    } else {
      messageDiv.className =
        "mb-2 p-2 rounded-lg bg-gray-100 mr-auto max-w-[80%] break-words";
    }

    messageDiv.textContent = content;
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  // Function to add a user message
  function addUserMessage(message) {
    addMessage(message, true);
  }

  // Function to add a bot message
  function addBotMessage(message) {
    addMessage(message, false);
  }

  // Function to simulate typing with Tailwind classes only
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className =
      "mb-2 p-2 rounded-lg bg-gray-100 mr-auto flex space-x-1";

    // Create three dots using Tailwind
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.className = "h-2 w-2 bg-gray-500 rounded-full";
      typingDiv.appendChild(dot);
    }

    chatContent.appendChild(typingDiv);
    return typingDiv;
  }

  // Function to send a message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addUserMessage(message);
      chatInput.value = "";

      // Show typing indicator
      const typingIndicator = showTypingIndicator();

      // Process after a short delay to simulate "thinking"
      setTimeout(() => {
        chatContent.removeChild(typingIndicator);
        const response = getBotResponse(message);
        addBotMessage(response);
      }, 1000);
    }
  }

  // Knowledge base about Sagar Lawns
  const knowledgeBase = {
    location:
      "Sagar Lawns is located beside Sanya Motors, MIDC Industrial Area, Mukundwadi, Chh. Sambhajinagar, Maharashtra 431003.",
    contact:
      "You can contact Sagar Lawns at +91-9325221593 or via email at contact@business.com.",
    services:
      "We offer Lawn & Banquet Hall, Catering Services, Decoration & Lighting, Changing Rooms, Seating & Parking Facilities, and Multi-Event Hosting.",
    events:
      "Sagar Lawns can host weddings, receptions, corporate events, birthdays, and more. Night events are also allowed.",
    capacity: "We have a seating capacity of over 2000 people.",
    experience:
      "Sagar Lawns has over 20 years of experience in hosting events.",
    catering:
      "Both vegetarian and non-vegetarian catering is allowed. We provide a separate designated area for food preparation, but we don't offer in-house food service.",
    decoration:
      "We provide in-house decoration and lighting services. No outside decorators are allowed to maintain quality and consistency.",
    facilities:
      "We provide well-furnished changing rooms, spacious seating arrangements, and secure parking areas.",
    timing:
      "Please contact us at +91-9325221593 for specific timing information.",
    booking:
      "To book Sagar Lawns for your event, please contact us at +91-9325221593 or visit our contact page.",
    photos:
      "You can view our photo gallery on our website to see the venue and past events.",
    success:
      "We have hosted over 500 successful events with more than 10,000 happy clients over our 20+ years of experience.",
  };

  // Function to get bot response based on user input
  function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();

    // Check for greetings
    if (
      userInput.includes("hi") ||
      userInput.includes("hello") ||
      userInput.includes("hey")
    ) {
      return "Hello! I'm the Sagar Lawns Chat Bot. How can I help you with information about our venue?";
    }

    // Check for thanks
    if (userInput.includes("thank") || userInput.includes("thanks")) {
      return "You're welcome! Feel free to ask if you need any more information about Sagar Lawns.";
    }

    // Check for goodbye
    if (userInput.includes("bye") || userInput.includes("goodbye")) {
      return "Thank you for your interest in Sagar Lawns. Have a great day!";
    }

    // Check for location related queries
    if (
      userInput.includes("where") ||
      userInput.includes("location") ||
      userInput.includes("address")
    ) {
      return knowledgeBase.location;
    }

    // Check for contact related queries
    if (
      userInput.includes("contact") ||
      userInput.includes("phone") ||
      userInput.includes("call") ||
      userInput.includes("email")
    ) {
      return knowledgeBase.contact;
    }

    // Check for service related queries
    if (
      userInput.includes("service") ||
      userInput.includes("offer") ||
      userInput.includes("provide")
    ) {
      return knowledgeBase.services;
    }

    // Check for event related queries
    if (
      userInput.includes("event") ||
      userInput.includes("wedding") ||
      userInput.includes("birthday") ||
      userInput.includes("corporate")
    ) {
      return knowledgeBase.events;
    }

    // Check for capacity related queries
    if (
      userInput.includes("capacity") ||
      userInput.includes("how many") ||
      userInput.includes("people") ||
      userInput.includes("guests")
    ) {
      return knowledgeBase.capacity;
    }

    // Check for experience related queries
    if (
      userInput.includes("experience") ||
      userInput.includes("how long") ||
      userInput.includes("years")
    ) {
      return knowledgeBase.experience;
    }

    // Check for catering related queries
    if (
      userInput.includes("food") ||
      userInput.includes("catering") ||
      userInput.includes("eat")
    ) {
      return knowledgeBase.catering;
    }

    // Check for decoration related queries
    if (
      userInput.includes("decoration") ||
      userInput.includes("decor") ||
      userInput.includes("lighting")
    ) {
      return knowledgeBase.decoration;
    }

    // Check for facilities related queries
    if (
      userInput.includes("facilities") ||
      userInput.includes("amenities") ||
      userInput.includes("parking") ||
      userInput.includes("changing room")
    ) {
      return knowledgeBase.facilities;
    }

    // Check for timing related queries
    if (
      userInput.includes("time") ||
      userInput.includes("hour") ||
      userInput.includes("when")
    ) {
      return knowledgeBase.timing;
    }

    // Check for booking related queries
    if (
      userInput.includes("book") ||
      userInput.includes("reserve") ||
      userInput.includes("availability")
    ) {
      return knowledgeBase.booking;
    }

    // Check for photo related queries
    if (
      userInput.includes("photo") ||
      userInput.includes("picture") ||
      userInput.includes("gallery") ||
      userInput.includes("image")
    ) {
      return knowledgeBase.photos;
    }

    // Check for success/track record related queries
    if (
      userInput.includes("success") ||
      userInput.includes("track record") ||
      userInput.includes("how many events")
    ) {
      return knowledgeBase.success;
    }

    // Default response for unrecognized queries
    return "I'm sorry, I don't have information about that. I can help with questions about Sagar Lawns' location, services, facilities, booking, and more. Please feel free to ask about these topics.";
  }

  // API to change the position of the chatbot
  window.changeChatbotPosition = function (position) {
    setIconPosition(position);
  };
});
