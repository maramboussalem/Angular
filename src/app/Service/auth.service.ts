import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();

  constructor(private router: Router) {
    initializeApp(environment.firebaseConfig); // initialise Firebase avec tes config
  }
  

  // 🔐 Login avec email/mot de passe
  loginWithEmail(email: string, password: string): Promise<void> {
    const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('Connexion réussie');
    });
  }

  
  // 🔐 Connexion via Google
  loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(() => {
        console.log('Connecté avec Google');
      });
  }

  // ✅ Déconnexion
  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  // 👤 Obtenir l'utilisateur connecté
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
