from config import db
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import String, Integer, Boolean, ForeignKey, Text, DateTime
from datetime import datetime
# from werkzeug.security import 
from typing import List


class Learner(db.Model):
    __tablename__ = "learner"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(80), nullable=True, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    image: Mapped[str] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(Text)

    # relationship to mentor
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=False)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="learner")


class Mentor(db.Model):
    __tablename__="mentor"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    profile_link: Mapped[str] = mapped_column(String(80), nullable=True, unique=True)
    role: Mapped[str]= mapped_column(String(50), nullable=True)
    rating: Mapped[int] = mapped_column(Integer)
    image: Mapped[str] = mapped_column(String(100))

    # relationship to learner
    learner: Mapped[List["Learner"]] = relationship("Learner", back_populates="mentor", cascade="all, delete-orphan")

    # relationship to project
    project: Mapped[List["Project"]] = relationship("Project", back_populates="mentor", cascade="all, delete-orphan")

class Project(db.Model):
    __tablename__= "project"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    
    # relationship to mentor
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=False)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="project")
