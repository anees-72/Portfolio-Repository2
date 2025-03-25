import os
#importing necessary functions
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from decouple import config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from helper import apology, login_required

# Configure application
app = Flask(__name__)

DATABASE_URL = config("DATABASE_URL")

# Configure session to use filesystem (instead of signed cookies)
app.secret_key=config("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL


# Configure SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    hash = db.Column(db.String(255), nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), default='pending')
    priority = db.Column(db.String(50), default='medium')

    user = db.relationship('User', backref=db.backref('tasks', lazy=True))

# handling the requests for the register route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not username:
            return apology("must provide username", 400)
        if not password:
            return apology("must provide password", 400)
        if not confirmation or confirmation != password:
            return apology("must confirm password", 400)

        user = User.query.filter_by(username=username).first()
        if user:
            return apology("username already taken", 400)

        hash_password = generate_password_hash(password)

        new_user = User(username=username, hash=hash_password)
        db.session.add(new_user)
        db.session.commit()

        flash("Registration Successful! Please Log In.")
        return redirect("/login")
    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username:
            return apology("must provide username", 400)

        if not password:
            return apology("must provide password", 400)

        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.hash, password):
            return apology("Invalid Username and/or Password!", 400)

        session["user_id"] = user.id

        flash("Login Successful!")
        return redirect("/")
    else:
        return render_template("login.html")

# logs the user out by clearing the session
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

@app.route("/")
@login_required
def dashboard():
    search_query = request.args.get("search", "")
    filter_by = request.args.get("filter")
    filter_priority = request.args.get("priority")
    sort_order = request.args.get("sort_by")
    user_id = session["user_id"]

    tasks_query = Task.query.filter(Task.user_id == user_id, Task.status != 'completed')

    if search_query:
        tasks_query = tasks_query.filter(Task.title.like(f"%{search_query}%"))
    if filter_by:
        tasks_query = tasks_query.filter(Task.status == filter_by)
    if filter_priority:
        tasks_query = tasks_query.filter(Task.priority == filter_priority)
    if sort_order:
        tasks_query = tasks_query.order_by(Task.due_date.desc() if sort_order == 'desc' else Task.due_date.asc())

    tasks = tasks_query.all()

    completed_tasks = len([task for task in tasks if task.status == 'completed'])
    pending_tasks = len([task for task in tasks if task.status == 'pending'])
    overdue_tasks = len([task for task in tasks if datetime.strptime(task.due_date, '%Y-%m-%d') < datetime.now() and task.status != 'completed'])

    return render_template("index.html", filter_by=filter_by, filter_priority=filter_priority, sort_order=sort_order,
                           tasks=tasks, completed=completed_tasks, pending=pending_tasks, overdue=overdue_tasks)

# Route for handling the creation of the task
@app.route("/create", methods=["GET", "POST"])
@login_required
def create():
    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        due_date = request.form.get("due_date")
        priority = request.form.get("priority", "medium")

        if not title:
            return apology("must provide task title", 400)
        if not description:
            return apology("must provide task description", 400)
        if not due_date:
            return apology("must provide due date", 400)

        new_task = Task(title=title, description=description, due_date=due_date, priority=priority, user_id=session["user_id"])
        db.session.add(new_task)
        db.session.commit()

        flash("Task Created Successfully!")

        return redirect("/")

    else:
        return render_template("create_task.html")

# Route for editing the task
@app.route("/edit/<int:task_id>", methods=["GET", "POST"])
@login_required
def edit(task_id):
    task = Task.query.filter_by(id=task_id, user_id=session["user_id"]).first()

    if not task:
        return apology("Invalid Task", 400)

    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        due_date = request.form.get("due_date")
        priority = request.form.get("priority", "medium")

        task.title = title
        task.description = description
        task.due_date = due_date
        task.priority = priority

        db.session.commit()

        flash("Task Updated Successfully!")
        return redirect("/")

    else:
        return render_template("edit_task.html", task=task)

# Route for deleting the task
@app.route("/delete/<int:task_id>", methods=["GET", "POST"])
@login_required
def delete(task_id):
    task = Task.query.filter_by(id=task_id, user_id=session["user_id"]).first()

    if not task:
        return apology("Invalid Task or you are not authorized to delete this task", 400)

    db.session.delete(task)
    db.session.commit()

    flash("Task Deleted Successfully!")
    return redirect("/")

# For marking the task as completed
@app.route("/mark_completed/<int:task_id>", methods=["GET"])
@login_required
def mark_completed(task_id):
    task = Task.query.filter_by(id=task_id, user_id=session["user_id"]).first()

    if not task:
        return apology("Invalid Operation", 400)

    task.status = 'completed'
    db.session.commit()

    flash("Marked Completed Successfully!")
    return redirect("/")

# This route would display a table of all the tasks completed successfully by fetching them from the database
@app.route("/history")
@login_required
def history():
    user_id = session["user_id"]

    tasks = Task.query.filter_by(user_id=user_id, status='completed').all()
    return render_template("history.html", tasks=tasks)

# This route would provide the calendar with the data of the due date and title of the task
@app.route("/get_tasks_calendar_data")
@login_required
def get_tasks():
    tasks = Task.query.filter(Task.user_id == session["user_id"], Task.status != 'completed').all()

    events = []
    for task in tasks:
        due_date = task.due_date
        if datetime.strptime(due_date, '%Y-%m-%d') >= datetime.now():
            event = {
                "title": task.title,
                "start": due_date,
                "end": due_date,
                "allDay": True
            }
            events.append(event)
    return jsonify(events)

# Renders the calendar.html template
@app.route("/get_tasks_calendar")
@login_required
def get_tasks_calendar():
    return render_template("calender.html")

#if __name__ == "__main__":
   # app.run(debug=True)
