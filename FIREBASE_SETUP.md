# Firebase Configuration

## Setup Instructions

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Firestore Database
- Enable Firebase Storage
- Enable Authentication (Email/Password)

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

### 3. Firestore Security Rules

Deploy the security rules from `firestore.rules` to your Firestore database.

### 4. Create Firestore Indexes

Go to Firestore → Indexes and create the following composite indexes:

#### Chats Collection
- Fields: `participants` (Ascending), `updatedAt` (Descending)
- Collection: `chats`

#### Messages Collection
- Fields: `chatId` (Ascending), `createdAt` (Descending)
- Collection: `messages`

#### Groups Collection
- Fields: `members` (Ascending), `createdAt` (Descending)
- Collection: `groups`

#### Statuses Collection
- Fields: `userId` (Ascending), `createdAt` (Descending)
- Collection: `statuses`
- Fields: `privacy` (Ascending), `createdAt` (Descending)
- Collection: `statuses`

### 5. Storage Security Rules

Update your Firebase Storage rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId;
    }
    match /chats/{chatId}/{allPaths=**} {
      allow read, write: if request.auth.uid != null;
    }
    match /groups/{groupId}/{allPaths=**} {
      allow read, write: if request.auth.uid != null;
    }
    match /statuses/{userId}/{allPaths=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### 6. Enable Authentication Methods

- Email/Password authentication
- (Optional) Google Sign-in
- (Optional) Phone authentication

### 7. Set Up Emulator (Development)

```bash
firebase emulators:start
```

Update `firebase.ts` to connect to emulators:

```typescript
if (process.env.EXPO_PUBLIC_ENVIRONMENT === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
```
