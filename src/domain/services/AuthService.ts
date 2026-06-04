import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@config/firebase';
import { RegisterInput, LoginInput, PasswordResetInput } from '@models/Auth';

export class AuthService {
  static async register(input: RegisterInput) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: input.fullName,
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      return {
        success: true,
        user: userCredential.user,
        message: 'Registration successful. Please verify your email.',
      };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async login(input: LoginInput) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async sendEmailVerification() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { success: true };
      }
      return { success: false, error: 'No user logged in' };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async sendPasswordReset(input: PasswordResetInput) {
    try {
      await sendPasswordResetEmail(auth, input.email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async resetPassword(code: string, newPassword: string) {
    try {
      await confirmPasswordReset(auth, code, newPassword);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static async updateUserPassword(currentPassword: string, newPassword: string) {
    try {
      if (!auth.currentUser) {
        return { success: false, error: 'No user logged in' };
      }

      await updatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.parseAuthError(error),
      };
    }
  }

  static getCurrentUser() {
    return auth.currentUser;
  }

  private static parseAuthError(error: any): string {
    const errorCode = error.code || '';

    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Invalid password',
      'auth/email-already-in-use': 'Email already in use',
      'auth/weak-password': 'Password is too weak',
      'auth/invalid-email': 'Invalid email address',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/user-disabled': 'User account has been disabled',
      'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    };

    return errorMessages[errorCode] || error.message || 'An error occurred';
  }
}
