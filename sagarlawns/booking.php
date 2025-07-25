<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "sagarlawns";

// Connect to DB
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form data safely
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$event_type = $_POST['event_type'] ?? '';
$guest_count = $_POST['guest_count'] ?? '';
$decoration = $_POST['decoration'] ?? '';
$food = $_POST['food'] ?? '';
$checkin = $_POST['checkin'] ?? '';
$checkout = $_POST['checkout'] ?? '';

// Insert data
$sql = "INSERT INTO bookings (name, email, phone, event_type, guest_count, decoration, food, checkin, checkout)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $name, $email, $phone, $event_type, $guest_count, $decoration, $food, $checkin, $checkout);

if ($stmt->execute()) {
    echo "
    <div style='
      max-width: 600px;
      margin: 100px auto;
      padding: 40px;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      text-align: center;
      font-family: Arial, sans-serif;
    '>
      <h2 style='color: #4CAF50; font-size: 28px;'>✅ Booking Submitted Successfully!</h2>
      <p style='font-size: 18px; color: #333; margin-top: 10px;'>
        Thank you <strong>$name</strong> for choosing Sagar Lawns.
      </p>
      <p style='font-size: 16px; color: #555;'>We have received your booking for a <strong>$event_type</strong> with <strong>$guest_count</strong> guests.</p>
      <p style='font-size: 16px; color: #555;'>We'll contact you shortly at <strong>$email</strong> or <strong>$phone</strong>.</p>
      <a href='index.html' style='
        display: inline-block;
        margin-top: 25px;
        padding: 12px 25px;
        background-color: #6A0DAD;
        color: white;
        font-size: 16px;
        text-decoration: none;
        border-radius: 8px;
        transition: background-color 0.3s ease;
      '>Back to Home</a>
    </div>
    ";
  } else {
    echo "<p style='color: red;'>❌ Error: " . $stmt->error . "</p>";
  }
  

$stmt->close();
$conn->close();
?>
