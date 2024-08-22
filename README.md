# Mentor-Student Assignment Application

## Overview
This is a Node.js-based RESTful API application that manages the assignment of students to mentors. The application allows creating mentors, creating students, assigning students to mentors, reassigning students to different mentors, and retrieving information about students and their mentor histories.

## Features
- **Create Mentor**: Add a new mentor to the system.
- **Create Student**: Add a new student to the system.
- **Assign Students to Mentor**: Assign one or more students to a mentor, ensuring a student without a mentor is not shown in the list.
- **Change Mentor for Student**: Reassign a student to a different mentor.
- **List Students for a Mentor**: Retrieve a list of all students assigned to a specific mentor.
- **Show Previous Mentors for a Student**: Display all previous mentors that a particular student has been assigned to.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
