package com.example.studentbackend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(
            StudentRepository studentRepository) {

        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getStudents() {

        return studentRepository.findAll();
    }

    @PostMapping
    public Student addStudent(
            @RequestBody Student student) {

        return studentRepository.save(student);
    }
}