import hmac
import hashlib
import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

load_dotenv()

EMAIL_HASH_KEY = os.getenv("EMAIL_HASH_KEY").encode()
bcrypt = Bcrypt()

def hash_email(email):
    """Returns a hashed email as a string (HMAC-SHA256)."""
    return hmac.new(EMAIL_HASH_KEY, email.encode(), hashlib.sha256).hexdigest()

def hash_password(password):
    """Returns a securely hashed password (bcrypt)."""
    return bcrypt.generate_password_hash(password).decode('utf-8')
