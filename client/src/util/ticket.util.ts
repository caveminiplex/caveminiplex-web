import type { Booking } from "../types/booking.type";
import type { Movie } from "../types/movie.type";

export const downloadTicketAsImage = async (
  booking: Booking,
  movies: Movie[],
  userName: string,
  userEmail: string
): Promise<void> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  // Set canvas dimensions
  canvas.width = 800;
  canvas.height = 900;

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add border
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Header text (no background)
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("MINIPLEX CINEMA", canvas.width / 2, 80);

  ctx.font = "16px Arial";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("Your Digital Ticket", canvas.width / 2, 110);

  // Load and draw movie posters
  let yOffset = 140;
  const posterPromises = movies.map((movie, index) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      // Add a timeout to handle slow loading images
      const timeout = setTimeout(() => {
        drawFallback();
      }, 5000);

      const drawFallback = () => {
        // Fallback rectangle if image fails to load
        ctx.fillStyle = "#f3f4f6";
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;
        const posterWidth = 120;
        const posterHeight = 180;
        const xPos = 80 + index * (posterWidth + 20);
        ctx.fillRect(xPos, yOffset, posterWidth, posterHeight);
        ctx.strokeRect(xPos, yOffset, posterWidth, posterHeight);

        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Movie Poster",
          xPos + posterWidth / 2,
          yOffset + posterHeight / 2
        );

        // Movie title below poster
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        const title =
          movie.title.length > 15
            ? movie.title.substring(0, 15) + "..."
            : movie.title;
        ctx.fillText(
          title,
          xPos + posterWidth / 2,
          yOffset + posterHeight + 20
        );

        ctx.font = "12px Arial";
        ctx.fillStyle = "#6b7280";
        ctx.fillText(
          movie.duration,
          xPos + posterWidth / 2,
          yOffset + posterHeight + 40
        );

        resolve();
      };

      img.onload = () => {
        clearTimeout(timeout);
        const posterWidth = 120;
        const posterHeight = 180;
        const xPos = 80 + index * (posterWidth + 20);

        ctx.drawImage(img, xPos, yOffset, posterWidth, posterHeight);

        // Movie title below poster
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        const title =
          movie.title.length > 15
            ? movie.title.substring(0, 15) + "..."
            : movie.title;
        ctx.fillText(
          title,
          xPos + posterWidth / 2,
          yOffset + posterHeight + 20
        );

        ctx.font = "12px Arial";
        ctx.fillStyle = "#6b7280";
        ctx.fillText(
          movie.duration,
          xPos + posterWidth / 2,
          yOffset + posterHeight + 40
        );

        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeout);
        drawFallback();
      };

      // Use a proxy service to avoid CORS issues
      img.src = `https://images.weserv.nl/?url=${encodeURIComponent(
        movie.poster_url
      )}&w=120&h=180&fit=cover`;
    });
  });

  await Promise.all(posterPromises);

  // Booking details section
  yOffset = 390;
  ctx.textAlign = "left";

  // Transaction ID
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Transaction ID:", 80, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  ctx.fillText(booking.transactionId, 200, yOffset);

  yOffset += 40;

  // Date and Time
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Date & Time:", 80, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  const dateStr = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  ctx.fillText(`${dateStr}`, 80, yOffset + 20);
  ctx.fillText(
    `${booking.slot.startTime} - ${booking.slot.endTime}`,
    80,
    yOffset + 40
  );

  yOffset += 80;

  // Location and Auditorium
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Location:", 80, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  ctx.fillText(booking.location, 80, yOffset + 20);

  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Auditorium:", 400, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  ctx.fillText(`Hall ${booking.auditorium}`, 400, yOffset + 20);

  yOffset += 60;

  // Number of persons and Amount
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Persons:", 80, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  ctx.fillText(booking.noOfPersons.toString(), 80, yOffset + 20);

  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Amount Paid:", 400, yOffset);
  ctx.fillStyle = "#16a34a";
  ctx.font = "bold 18px Arial";
  ctx.fillText(`₹${booking.amountPaid}`, 400, yOffset + 20);

  yOffset += 80;

  // Customer details
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Customer Details:", 80, yOffset);
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 14px Arial";
  ctx.fillText(userName, 80, yOffset + 20);
  ctx.font = "12px Arial";
  ctx.fillText(userEmail, 80, yOffset + 40);

  yOffset += 80;

  // Footer
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Thank you for choosing Miniplex Cinema!",
    canvas.width / 2,
    yOffset + 20
  );
  ctx.fillText(
    "Present this ticket at the cinema entrance",
    canvas.width / 2,
    yOffset + 40
  );

  // Download the image
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `miniplex-ticket-${booking.transactionId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, "image/png");
};
