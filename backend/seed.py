"""Run once to populate sample data: python seed.py"""
from app import app, db, User, News, Banner
from werkzeug.security import generate_password_hash

USERS = [
    {
        "name": "Admin Sesna",
        "email": "admin@sesna.com",
        "password": "password123",
        "phone": "08123456789",
        "avatar": "https://i.pravatar.cc/150?img=1",
    },
    {
        "name": "Budi Santoso",
        "email": "budi@sesna.com",
        "password": "password123",
        "phone": "08129876543",
        "avatar": "https://i.pravatar.cc/150?img=2",
    },
]

NEWS = [
    {
        "title": "React Native 0.76 Rilis dengan New Architecture",
        "content": "React Native 0.76 membawa New Architecture sebagai default, meningkatkan performa rendering dan interoperabilitas dengan kode native secara signifikan.",
        "image": "https://picsum.photos/seed/rn76/800/400",
        "category": "Technology",
        "created_at": "2025-01-15",
    },
    {
        "title": "Expo SDK 52 Hadirkan Fitur Baru",
        "content": "Expo SDK 52 memperkenalkan dukungan DOM Components, peningkatan expo-camera, dan banyak improvement untuk developer experience.",
        "image": "https://picsum.photos/seed/expo52/800/400",
        "category": "Technology",
        "created_at": "2025-01-10",
    },
    {
        "title": "Tips Optimasi Performa React Native",
        "content": "Pelajari cara mengoptimalkan aplikasi React Native menggunakan FlatList, memo, useCallback, dan teknik lainnya untuk pengalaman pengguna yang lebih baik.",
        "image": "https://picsum.photos/seed/perf/800/400",
        "category": "Tutorial",
        "created_at": "2025-01-05",
    },
    {
        "title": "State Management: Redux vs Zustand",
        "content": "Perbandingan mendalam antara Redux dan Zustand untuk state management di aplikasi React Native. Mana yang lebih cocok untuk proyekmu?",
        "image": "https://picsum.photos/seed/state/800/400",
        "category": "Tutorial",
        "created_at": "2024-12-28",
    },
    {
        "title": "Membangun Aplikasi Chat Real-time",
        "content": "Panduan lengkap membangun aplikasi chat menggunakan React Native dan WebSocket, dari setup hingga deployment.",
        "image": "https://picsum.photos/seed/chat/800/400",
        "category": "Project",
        "created_at": "2024-12-20",
    },
]

BANNERS = [
    {
        "title": "Selamat Datang di Sesna",
        "image": "https://picsum.photos/seed/banner1/1200/400",
        "link": "https://sesna.com/welcome",
        "order": 1,
    },
    {
        "title": "Kursus React Native Terbaru",
        "image": "https://picsum.photos/seed/banner2/1200/400",
        "link": "https://sesna.com/courses",
        "order": 2,
    },
    {
        "title": "Komunitas Developer Indonesia",
        "image": "https://picsum.photos/seed/banner3/1200/400",
        "link": "https://sesna.com/community",
        "order": 3,
    },
]


def seed():
    with app.app_context():
        db.create_all()

        if User.query.count() == 0:
            for u in USERS:
                user = User(
                    name=u["name"],
                    email=u["email"],
                    password=generate_password_hash(u["password"]),
                    phone=u["phone"],
                    avatar=u["avatar"],
                )
                db.session.add(user)
            print(f"Seeded {len(USERS)} users")

        if News.query.count() == 0:
            for n in NEWS:
                news = News(**n)
                db.session.add(news)
            print(f"Seeded {len(NEWS)} news")

        if Banner.query.count() == 0:
            for b in BANNERS:
                banner = Banner(**b)
                db.session.add(banner)
            print(f"Seeded {len(BANNERS)} banners")

        db.session.commit()
        print("Done.")


if __name__ == "__main__":
    seed()
