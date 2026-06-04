# NetChat - Connect. Chat. Share Moments.

A production-ready React Native Expo application for real-time messaging, group chats, and status sharing.

## Features

### Core Modules

- **Authentication**: Comprehensive auth flow with email verification and password management
- **Private Chat**: One-to-one messaging with multiple media types and rich features
- **Groups**: Create and manage group conversations with role-based permissions
- **Status**: Share moments with auto-delete after 24 hours
- **Notifications**: Real-time push notifications via Firebase Cloud Messaging
- **Privacy**: Block users, mute chats, and control visibility settings
- **Premium**: Subscription-based features for enhanced experience

### Message Types

- Text
- Images
- Videos
- Voice Notes
- Documents
- GIFs
- Stickers

### Message Features

- Reply
- Forward
- Copy
- Edit
- Delete (for me or everyone)
- Pin
- Star
- Reactions
- Read receipts
- Typing indicators

## Tech Stack

### Frontend

- React Native with Expo SDK
- TypeScript for type safety
- Expo Router for navigation
- Zustand for state management
- TanStack React Query for server state
- React Hook Form + Zod for forms and validation
- React Native Reanimated for animations
- Material Design 3

### Backend

- Firebase Authentication
- Firestore for real-time database
- Firebase Storage for media
- Firebase Cloud Messaging for push notifications
- Firebase Functions for backend logic

## Architecture

- Clean Architecture with clear separation of concerns
- Feature-based folder structure
- Repository Pattern for data access
- Type-safe models throughout
- Offline-first approach with local caching

## Project Structure

```
netchat/
├── src/
│   ├── config/              # Firebase and app configuration
│   ├── data/
│   │   ├── repositories/    # Data access layer
│   │   └── local/           # Local database/cache
│   ├── domain/
│   │   ├── models/          # TypeScript models and types
│   │   ├── services/        # Business logic
│   │   └── repositories/    # Repository interfaces
│   ├── presentation/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # Feature screens
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand stores
│   │   ├── themes/          # Material Design 3 theme
│   │   └── navigation/      # Navigation configuration
│   └── utils/               # Utility functions
├── app/                      # Expo Router app directory
├── assets/                   # Images, fonts, etc.
└── firebase/                 # Firebase config files
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI
- iOS or Android development environment

### Installation

```bash
# Clone the repository
git clone https://github.com/devinhamsdra/netchat.git
cd netchat

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local

# Configure Firebase
# Add your google-services.json (Android) and GoogleService-Info.plist (iOS)
```

### Running the App

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable required services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Cloud Messaging
   - Cloud Functions
3. Download configuration files and place in appropriate locations
4. Initialize Firestore collections using provided seed scripts

## Database Schema

### Collections

- `users` - User profiles and settings
- `chats` - Private chat metadata
- `messages` - Individual messages
- `groups` - Group information
- `group_members` - Group membership and roles
- `statuses` - Status posts
- `status_views` - Status view tracking
- `notifications` - User notifications
- `blocked_users` - Block list
- `reports` - User reports
- `premium_subscriptions` - Premium status

## Security

- Firebase Security Rules for data protection
- Role-based access control
- End-to-end encryption for sensitive data
- Input validation and sanitization
- Secure storage of sensitive credentials

## Performance

- Lazy loading and pagination
- Image optimization
- Firestore indexing
- Query optimization
- Offline support with sync
- Infinite scroll implementation

## Theme System

Supports Material Design 3 with:

- Light and Dark themes
- Dynamic colors (Android 12+)
- Customizable color system
- Consistent typography
- Proper elevation and spacing

## Contributing

Contributions are welcome! Please follow our coding standards and submit pull requests for review.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub or contact support.

## Roadmap

- [ ] Voice calls
- [ ] Video calls
- [ ] Message encryption
- [ ] Custom stickers
- [ ] Disappearing messages
- [ ] Reactions improvements
- [ ] Desktop apps
- [ ] Web version
