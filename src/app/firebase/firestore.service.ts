import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Reservation } from '../models/reservation.models';
import { addDoc, collection, query, where, getDocs } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

    // Método para crear un nuevo usuario en Firestore
    createUser(uid: string, userData: User) {
      // 1. Obtener la referencia al documento en la colección 'users' con el UID del usuario
      const userDocRef = doc(this.firestore, `users/${uid}`);

      // 2. Usar setDoc para almacenar los datos del usuario en el documento
      return setDoc(userDocRef, userData);
    }

    // Método para obtener los datos de un usuario por su UID
    async getUser(uid: string) {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists() ? userDoc.data() : null;
    }

    // Crear una nueva reserva
  async createReservation(reservation: Reservation) {
    const reservationsCollectionRef = collection(this.firestore, 'reservas');
    return addDoc(reservationsCollectionRef, reservation);
  }

  // Obtener reservas de un usuario por su UID
  async getReservationsByUser(uid: string) {
    const reservationsCollectionRef = collection(this.firestore, 'reservas');
    const q = query(reservationsCollectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

}
