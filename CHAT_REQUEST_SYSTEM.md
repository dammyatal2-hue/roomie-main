# Chat Request System

## Overview
Users must send and receive approval for chat requests before they can message each other.

## How It Works

### 1. Sending a Chat Request
- User A wants to message User B
- User A clicks on User B's profile or property
- User A clicks "Message" button
- System checks if chat is allowed
- If not allowed, User A sees a "Send Chat Request" screen
- User A can write a custom message and send the request

### 2. Receiving a Chat Request
- User B receives a notification
- User B can view pending requests in Messages page (bell icon with badge)
- User B navigates to Chat Requests page
- User B sees all pending requests with sender info

### 3. Accepting/Denying Requests
- User B can click "Accept" or "Deny" for each request
- If accepted: Both users can now message each other
- If denied: User A cannot send messages
- Sender gets notified of the decision

### 4. Chatting
- Once accepted, both users can send messages freely
- Messages are only delivered if chat request is accepted
- Chat history is preserved

## API Endpoints

### Chat Requests
- `POST /api/chat-requests` - Send a chat request
- `GET /api/chat-requests/pending/:userId` - Get pending requests
- `PATCH /api/chat-requests/:id/accepted` - Accept request
- `PATCH /api/chat-requests/:id/denied` - Deny request
- `GET /api/chat-requests/check/:userId1/:userId2` - Check if chat is allowed

### Messages (Updated)
- `POST /api/messages` - Send message (requires accepted chat request)
- All other message endpoints remain the same

## Database Models

### ChatRequest
```javascript
{
  senderId: ObjectId (User),
  receiverId: ObjectId (User),
  status: 'pending' | 'accepted' | 'denied',
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Pages

1. **Chat.js** - Shows request screen if not approved, chat interface if approved
2. **ChatRequests.js** - View and manage incoming chat requests
3. **Messages.js** - Shows badge with pending request count

## Usage Flow

```
User A → Clicks Message on User B's profile
         ↓
    Check chat status
         ↓
    Not approved? → Show "Send Request" screen
         ↓
    User A sends request
         ↓
    User B gets notification
         ↓
    User B views in Chat Requests page
         ↓
    User B accepts/denies
         ↓
    If accepted → Both can chat
```

## Features
✅ Request approval system
✅ Pending request notifications
✅ Accept/Deny functionality
✅ Custom request messages
✅ Automatic notifications
✅ Chat protection (can't message without approval)
