from sqlalchemy import UniqueConstraint

from app.extensions import db


class City(db.Model):
    __tablename__ = "city"
    __table_args__ = (UniqueConstraint("city_en", "country_en", name="uq_city_en_country_en"),)

    id = db.Column(db.Integer, primary_key=True)
    city_en = db.Column(db.String(256), nullable=False)
    country_en = db.Column(db.String(256), nullable=False)
    city_zh = db.Column(db.String(256))
    country_zh = db.Column(db.String(256))
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    visits = db.relationship(
        "Visit",
        back_populates="city",
        cascade="all, delete-orphan",
        passive_deletes=False,
        order_by="Visit.id",
    )


class Visit(db.Model):
    __tablename__ = "visit"

    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey("city.id", ondelete="CASCADE"), nullable=False)
    visit_date = db.Column(db.Date)
    filename = db.Column(db.String(512), nullable=False)
    smugmug_image_key = db.Column(db.String(256))
    runner_name_en = db.Column(db.Text)
    runner_name_zh = db.Column(db.Text)
    place_note_en = db.Column(db.Text)
    place_note_zh = db.Column(db.Text)

    city = db.relationship("City", back_populates="visits")

    __table_args__ = (UniqueConstraint("city_id", "filename", name="uq_visit_city_filename"),)
