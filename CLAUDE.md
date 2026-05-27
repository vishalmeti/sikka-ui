# Sikka — UPI Loyalty Points App

## Stack
- React Native 0.85 + Expo SDK 56 (bare workflow via `expo prebuild`)
- TypeScript with strict mode
- Expo Router v3 (file-based routing in `app/`)
- Zustand for state management (JWT token + user info)
- Axios with auth interceptor — backend API only, no direct DB access
- react-native-razorpay, react-native-vision-camera, expo-location, @react-native-firebase/messaging

## Architecture
```
App → Backend API → Supabase/Database
```
- Frontend never talks to database directly
- Backend handles all auth, business logic, and data access
- Auth uses JWT tokens stored in AsyncStorage
- All requests include Bearer token in Authorization header

## Project Structure
```
app/             # Expo Router screens
  (auth)/        # Unauthenticated routes (login, signup)
  (tabs)/        # Main tab navigator (home, scan, profile)
  _layout.tsx    # Root layout with auth guard
lib/             # Shared utilities (axios with interceptor)
stores/          # Zustand stores (auth token + user)
types/           # TypeScript type definitions
assets/          # Images, fonts
docs/            # Design docs
```

## Commands
- `npm run start` — start dev client
- `npm run android` — build + run on Android
- `npm run prebuild` — generate native projects
- `npm run lint` — TypeScript type check
- `npm run clean` — clean prebuild

## Environment
```
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000  # Your backend API
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_...
```

## Conventions
- Path alias `@/` maps to project root
- Auth state: JWT token stored in AsyncStorage
- All API requests auto-inject Bearer token
- Backend must implement: POST /auth/login, POST /auth/signup, etc.
