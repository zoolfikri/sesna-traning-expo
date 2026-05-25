# Sesna API Documentation

Base URL: `http://localhost:8000`

---

## Auth

### POST /auth/register
Daftarkan user baru.

**Request Body**
```json
{
  "name": "Budi Santoso",
  "email": "budi@sesna.com",
  "password": "password123",
  "phone": "08123456789",
  "avatar": "https://..."
}
```
> `phone` dan `avatar` opsional.

**Response 201**
```json
{
  "success": true,
  "message": "Register success",
  "data": {
    "token": "<jwt_token>",
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@sesna.com",
      "phone": "08123456789",
      "avatar": "https://..."
    }
  }
}
```

**Error**
| Status | Pesan |
|--------|-------|
| 400 | `name/email/password required` |
| 409 | `Email already registered` |

---

### POST /auth/login
Login user.

**Request Body**
```json
{
  "email": "budi@sesna.com",
  "password": "password123"
}
```

**Response 200**
```json
{
  "success": true,
  "message": "Login success",
  "data": {
    "token": "<jwt_token>",
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@sesna.com",
      "phone": "08123456789",
      "avatar": "https://..."
    }
  }
}
```

**Error**
| Status | Pesan |
|--------|-------|
| 400 | `Email and password required` |
| 401 | `Invalid credentials` |

---

## Profile

> Semua endpoint profile butuh header: `Authorization: Bearer <token>`

### GET /profile
Ambil data profil user yang sedang login.

**Response 200**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@sesna.com",
    "phone": "08123456789",
    "avatar": "https://..."
  }
}
```

**Error**
| Status | Pesan |
|--------|-------|
| 401 | Token tidak valid / tidak ada |
| 404 | `User not found` |

---

### PUT /profile
Update data profil.

**Request Body**
```json
{
  "name": "Budi Updated",
  "phone": "08199999999",
  "avatar": "https://..."
}
```
> Semua field opsional. Hanya field yang dikirim yang diupdate.

**Response 200**
```json
{
  "success": true,
  "message": "Profile updated",
  "data": { ... }
}
```

---

## News

### GET /news
Ambil semua berita. Bisa filter by kategori.

**Query Params**
| Param | Tipe | Keterangan |
|-------|------|------------|
| `category` | string | Opsional. Filter by kategori |

**Contoh:** `GET /news?category=Technology`

**Response 200**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "React Native 0.76 Rilis",
      "content": "...",
      "image": "https://...",
      "category": "Technology",
      "created_at": "2025-01-15"
    }
  ]
}
```

---

### GET /news/:id
Ambil detail satu berita.

**Response 200**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "React Native 0.76 Rilis",
    "content": "...",
    "image": "https://...",
    "category": "Technology",
    "created_at": "2025-01-15"
  }
}
```

**Error**
| Status | Pesan |
|--------|-------|
| 404 | `News not found` |

---

## Banners

### GET /banners
Ambil semua banner, urut by `order`.

**Response 200**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Selamat Datang di Sesna",
      "image": "https://...",
      "link": "https://sesna.com/welcome",
      "order": 1
    }
  ]
}
```

---

## Test Credentials

| Email | Password |
|-------|----------|
| `admin@sesna.com` | `password123` |
| `budi@sesna.com` | `password123` |
