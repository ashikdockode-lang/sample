from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Students(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(100), nullable=False)
    place = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Student {self.student_name}>"


with app.app_context():
    db.create_all()


@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})


@app.route("/add_student", methods=["POST"])
def add_student():
    data = request.get_json()
    new_student = Students(
        student_name=data["student_name"], place=data["place"]
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Student added successfully."})


@app.route("/students")
def get_students():
    students = Students.query.all()
    student_names = [student.student_name for student in students]
    return jsonify({"students": student_names})


if __name__ == "__main__":
    app.run(debug=True)
