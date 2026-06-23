# 🎬 Full-Stack Developer Coding Challenge: Movie Ticket Booking System

![Homepage](public/image/homepage-withoutloging.png)

Frontend application สำหรับระบบจองตั๋วภาพยนตร์ พัฒนาด้วย Angular และเชื่อมต่อกับ REST API Backend

## Features

- Authentication (Login / Register)
- Browse Movies
- View Movie Details
- Select Showtime
- Seat Reservation
- Ticket History
- Responsive Design
- QR Code Ticket

## Tech Stack

- Angular 21
- TypeScript
- RxJS
- Angular Signals
- Angular Router
- Tailwind CSS
- Docker
- Nginx

## Project Structure

```text
├── src/
│    ├── app/
│    │   ├── layouts/
│    │   │   ├── auth-layout/
│    │   │   ├── main-layout/
│    │   ├── pages/
│    │   │   ├── admin-dashboard/
│    │   │   ├── booking
│    │   │   ├── home/
│    │   │   ├── login/
│    │   │   └── register/
│    │   │   ├── ticket
│    │   │   ├── tecketdetail
│    │   ├── services/
│    │   │   ├── auth/
│    │   │   ├── booking/
│    │   │   ├── movies
│    │   │   ├── user
│    │   │   ├── login/
│    │   │   └── register/
│    ├── environments/
│    │   └── environment.ts
│    │
│    ├── assets/
│    ├── environments/
│    └── styles.css
│    ├── docker-compose.yml
│    ├── Dockerfile
│    ├── nginx.conf
```

## Requirements

- Node.js >= 22
- npm >= 11

## Installation

Clone repository

```bash
git clone https://github.com/codeBrewer216/AIS-test-FE.git
cd AIS-test-FE
```

Install dependencies

```bash
npm install
```

## Environment Variables

Edit environment file
Path: src/environments/environment.ts

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
};
```

Production

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api',
};
```

## Run Development

```bash
npm start
```

or

```bash
ng serve
```

Application runs at:

```text
http://localhost:4200
```

## Build Production

Recommended (client-only, skips SSR/prerender):

```bash
npm run build:client
```

Build files will be generated in:

```text
dist/browser/
```

## Docker

Build image

```bash
docker build -t movie-booking-frontend .
```

Run container (map host 4200 to container 4200)

```bash
docker run -p 4200:4200 movie-booking-frontend
```

Open browser

```text
http://localhost:4200
```

## Docker Compose

```bash
docker compose up --build -d
```

## API Integration

Example API endpoints:

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /auth/login           | Login             |
| POST   | /auth/logout          | Logout.           |
| POST   | /bookings             | Create Booking    |
| GET    | /bookings/:id         | Find Booking Data |
| GET    | /bookings/printTicket | User Tickets      |
| GET    | /movies               | Get Movies        |
| PUT    | /movies/:id           | Edit Movies       |
| DELETE | /movies/:id           | Delete Movie      |
| GET    | /movies/:id/showtimes | Movies Detail     |
| POST   | /storage/upload       | Upload Image      |

## Performance Optimization

- Lazy Loading Routes
- Angular Signals
- Standalone Components
- OnPush Change Detection
- HTTP Interceptors

## Implement Plan

1. จองตั๋วล่วงหน้า
2. ยกเลิกตั๋วที่จองแล้ว
3. Payment Gateway
4. SSL Verification
5. CI/CD Deployment Pipeline
6. SEO

## Snapshot

### Homepage (Not Login Yet)

![HomepageWithoutLogin](public/image/homepage.png)

### Homepage (Already Login )

![Homepage](public/image/homepage.png)

### Admin

![Admin](public/image/admin.png)

#### Add Movie

![AdminAddMovie](public/image/admin-add.png)

#### Edit Movie

![AdminEditMovie](public/image/admin-edit1.png)
![AdminEditMovie](public/image/admin-edit2.png)

#### Delete Movie

![AdminDeleteMovie](public/image/admin-delete-dialog.png)

### Booking

![Booking](public/image/booking.png)

#### Select Movie

![Booking](public/image/booking.png)

#### Select Showtime

![BookingSelectMovie](public/image/booking-selectshowtime.png)

#### Select Seats

![BookingSelectSeats](public/image/booking-selectseats.png)

#### Confirm Reservation

![BookingConfirmReservation](public/image/booking-confirm.png)

#### Already Booked

![BookingAllreadyBooked](public/image/booking-alreadybooked.png)

### Ticket

![Ticket](public/image/ticket.png)

#### Detail

![TicketDetail](public/image/ticket-detail.png)

#### Ticket

[📄 View Ticket PDF](public/pdf/ac5f85c0-7f1c-4357-95c8-5c79eb9c909a.pdf)

## Author

Pongsapuk Sawaroj

Full Stack Developer

GitHub: https://github.com/your-github
