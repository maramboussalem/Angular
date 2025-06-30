import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- Importez Router

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.css']

})
export class QuizBuilderComponent {
  selectedCategory: string = '';
  quizCode: string = '';

  // Injectez Router via le constructeur
  constructor(private router: Router) {}

  generateQuiz() {
    const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
    this.quizCode = hex;
  }

  startQuiz() {
    if (!this.quizCode) return;

    // Utilisation du router injecté pour naviguer
    this.router.navigate(['/quiz'], { queryParams: { code: this.quizCode } });
  }
}
