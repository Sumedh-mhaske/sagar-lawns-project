<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Database connection
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "sagarlawns";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Get form data safely
  $name = $_POST['name'] ?? '';
  $phone = $_POST['phone'] ?? '';
  $enquiry = $_POST['enquiry'] ?? '';
  $message = $_POST['message'] ?? '';

  // Insert into database
  $sql = "INSERT INTO contacts (name, phone, enquiry, message)
          VALUES ('$name', '$phone', '$enquiry', '$message')";

if ($conn->query($sql) === TRUE) {
    echo '
    <div style="
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 12px;
      background: #f0fdf4;
      border: 1px solid #c6f6d5;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      text-align: center;
      font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;
      color: #22543d;
    ">
      <h2 style="font-size: 24px; margin-bottom: 10px;">✅ Thank You for Reaching Out!</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
        Your enquiry has been successfully received. Our team will get back to you shortly to assist you with your event needs.
      </p>
      <p style="font-size: 15px; color: #2f855a;">
        We appreciate your interest in <strong>Sagar Lawns</strong> — where every celebration becomes a memory.
      </p>
      <a href="home.html" style="
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background: #38a169;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 8px;
      transition: background 0.3s ease;
    " onmouseover="this.style.background=\'#2f855a\'" onmouseout="this.style.background=\'#38a169\'">
      ⬅ Back to Home
    </a>
    </div>';
  } else {
    echo '
    <div style="
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 12px;
      background: #fff5f5;
      border: 1px solid #feb2b2;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      text-align: center;
      font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;
      color: #742a2a;
    ">
      <h2 style="font-size: 24px; margin-bottom: 10px;">❗ Something Went Wrong</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
        We encountered an error while processing your request.
      </p>
      <p style="font-size: 15px;">
        Please try again later, or feel free to contact us directly for immediate assistance.
      </p>
    </div>';
  }
  
  

  $conn->close();
}
?>
