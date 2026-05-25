from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sesna.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "sesna-secret-key-change-in-prod"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

db = SQLAlchemy(app)
jwt = JWTManager(app)


# ── Models ──────────────────────────────────────────────────────────────────

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    avatar = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "avatar": self.avatar,
        }


class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "image": self.image,
            "category": self.category,
            "created_at": self.created_at,
        }


class Banner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=True)
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "link": self.link,
            "order": self.order,
        }


# ── Auth Routes ──────────────────────────────────────────────────────────────

@app.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    required = ["name", "email", "password"]
    for field in required:
        if not data.get(field):
            return jsonify({"success": False, "message": f"{field} required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"success": False, "message": "Email already registered"}), 409

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"]),
        phone=data.get("phone"),
        avatar=data.get("avatar"),
    )
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "success": True,
        "message": "Register success",
        "data": {
            "token": token,
            "user": user.to_dict(),
        }
    }), 201


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"success": False, "message": "Email and password required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "success": True,
        "message": "Login success",
        "data": {
            "token": token,
            "user": user.to_dict(),
        }
    })


# ── Profile Routes ───────────────────────────────────────────────────────────

@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    return jsonify({"success": True, "data": user.to_dict()})


@app.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    data = request.get_json()
    if data.get("name"):
        user.name = data["name"]
    if data.get("phone"):
        user.phone = data["phone"]
    if data.get("avatar"):
        user.avatar = data["avatar"]

    db.session.commit()
    return jsonify({"success": True, "message": "Profile updated", "data": user.to_dict()})


# ── News Routes ──────────────────────────────────────────────────────────────

@app.route("/news", methods=["GET"])
def get_news():
    category = request.args.get("category")
    query = News.query
    if category:
        query = query.filter_by(category=category)
    news_list = query.order_by(News.id.desc()).all()
    return jsonify({
        "success": True,
        "data": [n.to_dict() for n in news_list]
    })


@app.route("/news/<int:news_id>", methods=["GET"])
def get_news_detail(news_id):
    news = db.session.get(News, news_id)
    if not news:
        return jsonify({"success": False, "message": "News not found"}), 404
    return jsonify({"success": True, "data": news.to_dict()})


# ── Banner Routes ────────────────────────────────────────────────────────────

@app.route("/banners", methods=["GET"])
def get_banners():
    banners = Banner.query.order_by(Banner.order).all()
    return jsonify({
        "success": True,
        "data": [b.to_dict() for b in banners]
    })


# ── Init ─────────────────────────────────────────────────────────────────────

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
